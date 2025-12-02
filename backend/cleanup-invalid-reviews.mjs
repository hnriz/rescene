import 'dotenv/config';
import mysql2 from 'mysql2/promise';

const conn = mysql2.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'rescene',
    port: process.env.DB_PORT || 3306,
});

const checkMovieExists = async (movieId, isTV = false) => {
    try {
        const apiKey = process.env.TMDB_API_KEY || '75e676add70640aadafcda354ca23a4c';
        const endpoint = isTV ? 'tv' : 'movie';
        
        const response = await fetch(
            `https://api.themoviedb.org/3/${endpoint}/${movieId}?api_key=${apiKey}`,
            { timeout: 5000 }
        );
        
        return response.status === 200;
    } catch (error) {
        return false;
    }
};

try {
    console.log('🔍 Buscando reviews com ID inválido 200875...');
    
    // Buscar reviews com o ID inválido
    const [reviews] = await conn.execute(
        'SELECT id FROM review WHERE media_id = 200875'
    );
    
    if (reviews.length === 0) {
        console.log('✅ Nenhuma review com ID 200875 encontrada.');
        process.exit(0);
    }
    
    console.log(`❌ Encontradas ${reviews.length} reviews com ID inválido 200875`);
    
    // Deletar likes associados
    console.log('🗑️  Deletando likes associados...');
    await conn.execute(
        'DELETE FROM review_like WHERE review_id IN (SELECT id FROM review WHERE media_id = 200875)'
    );
    
    // Deletar reviews
    console.log('🗑️  Deletando reviews...');
    const result = await conn.execute(
        'DELETE FROM review WHERE media_id = 200875'
    );
    
    console.log(`✅ ${result[0].affectedRows} reviews foram deletadas com sucesso!`);
    process.exit(0);
} catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
} finally {
    await conn.end();
}
