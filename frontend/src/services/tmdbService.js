import axios from 'axios';

// Configuração da API TMDB
const TMDB_API_KEY = '75e676add70640aadafcda354ca23a4c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

// Criar instância do axios para TMDB
const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY
  }
});

/**
 * Buscar filmes populares
 * @param {number} page - Página de resultados
 * @param {string} language - Idioma dos resultados (pt-BR ou en-US)
 * @returns {Promise<Array>} - Array de filmes
 */
export const getPopularMovies = async (page = 1, language = 'pt-BR') => {
  try {
    const response = await tmdbClient.get('/movie/popular', {
      params: {
        page,
        language
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes populares:', error);
    throw error;
  }
};

/**
 * Buscar séries populares
 * @param {number} page - Página de resultados
 * @param {string} language - Idioma dos resultados (pt-BR ou en-US)
 * @returns {Promise<Array>} - Array de séries
 */
export const getPopularTVShows = async (page = 1, language = 'pt-BR') => {
  try {
    const response = await tmdbClient.get('/tv/popular', {
      params: {
        page,
        language
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar séries populares:', error);
    throw error;
  }
};

/**
 * Buscar detalhes de um filme específico
 * @param {number} movieId - ID do filme
 * @param {string} language - Idioma dos resultados (pt-BR ou en-US)
 * @returns {Promise<Object>} - Dados detalhados do filme
 */
export const getMovieDetails = async (movieId, language = 'pt-BR') => {
  try {
    const response = await tmdbClient.get(`/movie/${movieId}`, {
      params: {
        language,
        append_to_response: 'credits,reviews,videos,similar,watch/providers'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar detalhes do filme ${movieId}:`, error);
    throw error;
  }
};

/**
 * Buscar detalhes de uma série específica
 * @param {number} tvId - ID da série
 * @param {string} language - Idioma dos resultados (pt-BR ou en-US)
 * @returns {Promise<Object>} - Dados detalhados da série
 */
export const getTVShowDetails = async (tvId, language = 'pt-BR') => {
  try {
    const response = await tmdbClient.get(`/tv/${tvId}`, {
      params: {
        language,
        append_to_response: 'credits,reviews,videos,similar,watch/providers'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar detalhes da série ${tvId}:`, error);
    throw error;
  }
};

/**
 * Buscar filmes lançados recentemente
 * @param {string} language - Idioma dos resultados (pt-BR ou en-US)
 * @returns {Promise<Array>} - Array de filmes lançados recentemente
 */
export const getRecentlyReleasedMovies = async (language = 'pt-BR') => {
  try {
    const today = new Date();
    const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
    
    const formatDate = (date) => date.toISOString().split('T')[0];
    
    const response = await tmdbClient.get('/discover/movie', {
      params: {
        language,
        sort_by: 'release_date.desc',
        'primary_release_date.gte': formatDate(threeMonthsAgo),
        'primary_release_date.lte': formatDate(today),
        'vote_count.gte': 100
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes recentes:', error);
    throw error;
  }
};

/**
 * Buscar filmes populares no momento
 * @param {string} language - Idioma dos resultados (pt-BR ou en-US)
 * @returns {Promise<Array>} - Array de filmes populares
 */
export const getTrendingMovies = async (language = 'pt-BR') => {
  try {
    const response = await tmdbClient.get('/trending/movie/week', {
      params: {
        language
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes em alta:', error);
    throw error;
  }
};

/**
 * Buscar filmes por intervalo de datas de lançamento
 * @param {string} dateFrom - Data inicial (YYYY-MM-DD)
 * @param {string} dateTo - Data final (YYYY-MM-DD)
 * @param {string} language - Idioma dos resultados
 * @returns {Promise<Array>} - Array de filmes
 */
export const getMoviesByReleaseDate = async (dateFrom, dateTo, language = 'pt-BR') => {
  try {
    const response = await tmdbClient.get('/discover/movie', {
      params: {
        language,
        sort_by: 'release_date.desc',
        'primary_release_date.gte': dateFrom,
        'primary_release_date.lte': dateTo,
        'vote_count.gte': 50
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes por data:', error);
    throw error;
  }
};

/**
 * Buscar filmes por intervalo de datas de lançamento
 * @param {string} query - Termo de busca
 * @param {number} page - Página de resultados
 * @param {string} language - Idioma dos resultados (pt-BR ou en-US)
 * @returns {Promise<Array>} - Array de filmes encontrados
 */
export const searchMovies = async (query, page = 1, language = 'pt-BR') => {
  try {
    const response = await tmdbClient.get('/search/movie', {
      params: {
        query,
        page,
        language
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    throw error;
  }
};

/**
 * Buscar séries por palavra-chave
 * @param {string} query - Termo de busca
 * @param {number} page - Página de resultados
 * @param {string} language - Idioma dos resultados (pt-BR ou en-US)
 * @returns {Promise<Array>} - Array de séries encontradas
 */
export const searchTVShows = async (query, page = 1, language = 'pt-BR') => {
  try {
    const response = await tmdbClient.get('/search/tv', {
      params: {
        query,
        page,
        language
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar séries:', error);
    throw error;
  }
};

/**
 * Obter URL da imagem TMDB
 * @param {string} posterPath - Caminho do poster
 * @returns {string} - URL completa da imagem
 */
export const getImageUrl = (posterPath) => {
  if (!posterPath) return null;
  return `${TMDB_IMAGE_BASE}${posterPath}`;
};

/**
 * Formatar dados para exibição padrão
 * @param {Object} item - Item do TMDB (filme ou série)
 * @param {string} type - Tipo ('movie' ou 'tv')
 * @returns {Object} - Item formatado
 */
export const formatTMDBItem = (item, type = 'movie') => {
  const title = type === 'movie' ? item.title : item.name;
  const releaseDate = type === 'movie' ? item.release_date : item.first_air_date;
  
  // Converter genre_ids para nomes de gêneros se disponível
  let genreNames = [];
  if (item.genres && Array.isArray(item.genres)) {
    genreNames = item.genres.map(g => g.name);
  } else if (item.genre_ids && Array.isArray(item.genre_ids)) {
    genreNames = item.genre_ids;
  }
  
  return {
    id: item.id,
    title: title || 'Sem título',
    description: item.overview || 'Sem descrição',
    poster: getImageUrl(item.poster_path),
    backdrop: getImageUrl(item.backdrop_path),
    rating: item.vote_average || 0,
    releaseDate: releaseDate || 'Data desconhecida',
    type: type,
    genreIds: genreNames,
    popularity: item.popularity || 0,
    // Adicionais para detalhes
    credits: item.credits,
    reviews: item.reviews,
    videos: item.videos,
    similar: item.similar
  };
};

/**
 * Buscar recomendações para um filme
 * @param {number} movieId - ID do filme
 * @param {string} language - Idioma dos resultados (pt-BR ou en-US)
 * @returns {Promise<Array>} - Array de filmes recomendados
 */
export const getMovieRecommendations = async (movieId, language = 'pt-BR') => {
  try {
    // Passo 1: Tentar recomendações
    const response = await tmdbClient.get(`/movie/${movieId}/recommendations`, {
      params: { language }
    });
    let results = response.data.results || [];
    
    // Passo 2: Se vazio, tenta sem filtro de idioma
    if (results.length === 0) {
      const response2 = await tmdbClient.get(`/movie/${movieId}/recommendations`);
      results = response2.data.results || [];
    }
    
    // Passo 3: Se vazio, tenta filmes similares
    if (results.length === 0) {
      const response3 = await tmdbClient.get(`/movie/${movieId}/similar`, {
        params: { language }
      });
      results = response3.data.results || [];
    }
    
    // Passo 4: Se ainda vazio, tenta buscar dados do filme e usar gênero como base
    if (results.length === 0) {
      try {
        const movieData = await tmdbClient.get(`/movie/${movieId}`, {
          params: { language }
        });
        const genres = movieData.data.genres || [];
        if (genres.length > 0) {
          const genreId = genres[0].id;
          const genreResponse = await tmdbClient.get('/discover/movie', {
            params: {
              language,
              with_genres: genreId,
              sort_by: 'popularity.desc'
            }
          });
          results = genreResponse.data.results?.filter(m => m.id !== movieId) || [];
        }
      } catch (e) {
        console.error('❌ Erro ao buscar por gênero:', e);
      }
    }
    
    // Passo 5: Se ainda vazio, retorna filmes populares como último recurso
    if (results.length === 0) {
      const popularResponse = await tmdbClient.get('/movie/popular', {
        params: { language }
      });
      results = popularResponse.data.results || [];
    }
    
    return results.slice(0, 12); // Limita a 12 recomendações
  } catch (error) {
    console.error('❌ Erro ao buscar recomendações de filme:', error);
    return []; // Retorna array vazio em vez de lançar erro
  }
};

/**
 * Buscar recomendações para uma série
 * @param {number} tvId - ID da série
 * @param {string} language - Idioma dos resultados (pt-BR ou en-US)
 * @returns {Promise<Array>} - Array de séries recomendadas
 */
export const getTVRecommendations = async (tvId, language = 'pt-BR') => {
  try {
    // Passo 1: Tentar recomendações
    const response = await tmdbClient.get(`/tv/${tvId}/recommendations`, {
      params: { language }
    });
    let results = response.data.results || [];
    
    // Passo 2: Se vazio, tenta sem filtro de idioma
    if (results.length === 0) {
      const response2 = await tmdbClient.get(`/tv/${tvId}/recommendations`);
      results = response2.data.results || [];
    }
    
    // Passo 3: Se vazio, tenta séries similares
    if (results.length === 0) {
      const response3 = await tmdbClient.get(`/tv/${tvId}/similar`, {
        params: { language }
      });
      results = response3.data.results || [];
    }
    
    // Passo 4: Se ainda vazio, tenta buscar dados da série e usar gênero como base
    if (results.length === 0) {
      try {
        const tvData = await tmdbClient.get(`/tv/${tvId}`, {
          params: { language }
        });
        const genres = tvData.data.genres || [];
        if (genres.length > 0) {
          const genreId = genres[0].id;
          const genreResponse = await tmdbClient.get('/discover/tv', {
            params: {
              language,
              with_genres: genreId,
              sort_by: 'popularity.desc'
            }
          });
          results = genreResponse.data.results?.filter(s => s.id !== tvId) || [];
        }
      } catch (e) {
        console.error('❌ Erro ao buscar por gênero:', e);
      }
    }
    
    // Passo 5: Se ainda vazio, retorna séries populares como último recurso
    if (results.length === 0) {
      const popularResponse = await tmdbClient.get('/tv/popular', {
        params: { language }
      });
      results = popularResponse.data.results || [];
    }
    
    return results.slice(0, 12); // Limita a 12 recomendações
  } catch (error) {
    console.error('❌ Erro ao buscar recomendações de série:', error);
    return []; // Retorna array vazio em vez de lançar erro
  }
};

/**
 * Buscar filmes melhores avaliados
 * @param {number} page - Página de resultados
 * @param {string} language - Idioma dos resultados (pt-BR ou en-US)
 * @returns {Promise<Array>} - Array de filmes melhor avaliados
 */
export const getTopRatedMovies = async (page = 1, language = 'pt-BR') => {
  try {
    const response = await tmdbClient.get('/movie/top_rated', {
      params: {
        page,
        language
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes melhor avaliados:', error);
    throw error;
  }
};

/**
 * Buscar séries melhores avaliadas
 * @param {number} page - Página de resultados
 * @param {string} language - Idioma dos resultados (pt-BR ou en-US)
 * @returns {Promise<Array>} - Array de séries melhor avaliadas
 */
export const getTopRatedTVShows = async (page = 1, language = 'pt-BR') => {
  try {
    const response = await tmdbClient.get('/tv/top_rated', {
      params: {
        page,
        language
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar séries melhor avaliadas:', error);
    throw error;
  }
};

/**
 * Buscar filmes por gênero
 * @param {number} genreId - ID do gênero
 * @param {number} page - Página de resultados
 * @param {string} language - Idioma dos resultados (pt-BR ou en-US)
 * @returns {Promise<Array>} - Array de filmes do gênero
 */
export const getMoviesByGenre = async (genreId, page = 1, language = 'pt-BR') => {
  try {
    const response = await tmdbClient.get('/discover/movie', {
      params: {
        language,
        page,
        with_genres: genreId,
        sort_by: 'popularity.desc'
      }
    });
    return response.data.results;
  } catch (error) {
    console.error(`Erro ao buscar filmes do gênero ${genreId}:`, error);
    throw error;
  }
};

/**
 * Buscar séries por gênero
 * @param {number} genreId - ID do gênero
 * @param {number} page - Página de resultados
 * @param {string} language - Idioma dos resultados (pt-BR ou en-US)
 * @returns {Promise<Array>} - Array de séries do gênero
 */
export const getTVShowsByGenre = async (genreId, page = 1, language = 'pt-BR') => {
  try {
    const response = await tmdbClient.get('/discover/tv', {
      params: {
        language,
        page,
        with_genres: genreId,
        sort_by: 'popularity.desc'
      }
    });
    return response.data.results;
  } catch (error) {
    console.error(`Erro ao buscar séries do gênero ${genreId}:`, error);
    throw error;
  }
};

const tmdbService = {
  getPopularMovies,
  getPopularTVShows,
  getMovieDetails,
  getTVShowDetails,
  searchMovies,
  searchTVShows,
  getImageUrl,
  formatTMDBItem,
  getRecentlyReleasedMovies,
  getTrendingMovies,
  getMoviesByReleaseDate,
  getMovieRecommendations,
  getTVRecommendations,
  getTopRatedMovies,
  getTopRatedTVShows,
  getMoviesByGenre,
  getTVShowsByGenre,
  TMDB_IMAGE_BASE
};

// eslint-disable-next-line import/no-anonymous-default-export
export default tmdbService;
