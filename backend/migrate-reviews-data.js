import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'rescene',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Função para buscar dados do filme na TMDB
const getMovieDataFromTMDB = async (movieId) => {
    try {
        const apiKey = process.env.TMDB_API_KEY || '75e676add70640aadafcda354ca23a4c';
        
        console.log(`🔍 Buscando dados do filme/série ${movieId} na TMDB...`);
        
        // Primeiro tenta com o ID direto como filme
        let response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`);
        
        if (response.ok) {
            const data = await response.json();
            console.log(`✅ Filme encontrado: ${data.title}`);
            return {
                movieTitle: data.title || 'Título não disponível',
                movieYear: data.release_date ? new Date(data.release_date).getFullYear() : 'Ano desconhecido',
                moviePoster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null
            };
        }
        
        // Se não encontrou como filme, tenta como série
        console.log(`⚠️ Não encontrou como filme, tentando como série...`);
        response = await fetch(`https://api.themoviedb.org/3/tv/${movieId}?api_key=${apiKey}&language=pt-BR`);
        
        if (response.ok) {
            const data = await response.json();
            console.log(`✅ Série encontrada: ${data.name}`);
            return {
                movieTitle: data.name || 'Título não disponível',
                movieYear: data.first_air_date ? new Date(data.first_air_date).getFullYear() : 'Ano desconhecido',
                moviePoster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null
            };
        }
        
        // Se ainda não encontrou, tenta search genérico
        console.warn(`⚠️ Filme/Série ${movieId} não encontrado. Tentando com search...`);
        
        response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${movieId}&language=pt-BR`);
        
        if (!response.ok) {
            console.warn(`⚠️ TMDB API retornou status ${response.status} para search do filme ${movieId}`);
            return null;
        }
        
        const searchData = await response.json();
        
        // Se encontrou resultados no search, usar o primeiro
        if (searchData.results && searchData.results.length > 0) {
            const data = searchData.results[0];
            const title = data.title || data.name || 'Título não disponível';
            const year = (data.release_date || data.first_air_date) ? new Date(data.release_date || data.first_air_date).getFullYear() : 'Ano desconhecido';
            
            console.log(`✅ Conteúdo encontrado via search: ${title}`);
            return {
                movieTitle: title,
                movieYear: year,
                moviePoster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null
            };
        }
        
        console.warn(`❌ Nenhum resultado encontrado para ${movieId}`);
        return null;
    } catch (err) {
        console.error(`❌ Erro ao buscar dados do filme ${movieId} na TMDB:`, err.message);
        return null;
    }
};

// Função principal de migração
const migrateReviews = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        
        // Buscar todas as reviews que não têm movie_title
        console.log('\n📋 Buscando reviews sem dados de filme...');
        const [reviews] = await conn.execute(
            'SELECT id, media_id, movie_title FROM review WHERE movie_title IS NULL OR movie_title = "" LIMIT 100'
        );
        
        console.log(`\n📊 Encontradas ${reviews.length} reviews para atualizar`);
        
        if (reviews.length === 0) {
            console.log('✅ Todas as reviews já têm dados!');
            return;
        }
        
        // Para cada review, buscar dados e atualizar
        for (const review of reviews) {
            console.log(`\n📝 Processando review #${review.id} (media_id: ${review.media_id})...`);
            
            const movieData = await getMovieDataFromTMDB(review.media_id);
            
            if (movieData) {
                const [result] = await conn.execute(
                    'UPDATE review SET movie_title = ?, movie_year = ?, movie_poster = ? WHERE id = ?',
                    [movieData.movieTitle, movieData.movieYear, movieData.moviePoster, review.id]
                );
                
                console.log(`✅ Atualizada: ${movieData.movieTitle} (${movieData.movieYear})`);
            } else {
                console.log(`⚠️ Não foi possível buscar dados para media_id ${review.media_id}`);
            }
            
            // Aguardar um pouco para não sobrecarregar a TMDB
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        console.log('\n✅ Migração concluída!');
    } catch (err) {
        console.error('❌ Erro na migração:', err.message);
    } finally {
        if (conn) conn.release();
        process.exit(0);
    }
};


// Executar migração
migrateReviews();
