import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilm,
    faHeart,
    faPlay,
    faStar,
    faBookmark,
    faSearch,
    faTh,
    faEye,
    faList,
    faPlus,
    faChevronDown,
    faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import BackButtonPTBR from '../componentes-ptbr/BackButtonPTBR';
import * as tmdbService from '../services/tmdbService';
import '../css/movies.css';

function CatalogoSeries() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(() => searchParams.get('genre') || '');
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);

    // Fechar dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            const genreDropdown = document.querySelector('.genre-dropdown');

            if (genreDropdown && !genreDropdown.contains(event.target)) {
                setIsGenreDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Update genre when URL parameter changes
    useEffect(() => {
        const genreParam = searchParams.get('genre');
        if (genreParam) {
            setSelectedGenre(genreParam);
            setPage(1);
            setIsInitialLoad(true);
        }
    }, [searchParams]);

    // Resetar página quando gênero muda (além da URL)
    useEffect(() => {
        setPage(1);
        setIsInitialLoad(true);
        setSeries([]); // Limpar séries quando gênero muda
    }, [selectedGenre]);

    // Mapeamento de gêneros (IDs TMDB)
    const genres = [
        { id: '', label: 'Todos os Gêneros' },
        { id: 10759, label: 'Ação & Aventura' },
        { id: 16, label: 'Animação' },
        { id: 35, label: 'Comédia' },
        { id: 80, label: 'Crime' },
        { id: 99, label: 'Documentário' },
        { id: 18, label: 'Drama' },
        { id: 10751, label: 'Família' },
        { id: 10762, label: 'Infantil' },
        { id: 9648, label: 'Mistério' },
        { id: 10763, label: 'Notícias' },
        { id: 10764, label: 'Reality' },
        { id: 10765, label: 'Ficção Científica & Fantasia' },
        { id: 10766, label: 'Soap' },
        { id: 10767, label: 'Talk' },
        { id: 10768, label: 'Guerra & Política' },
        { id: 37, label: 'Faroeste' }
    ];

    // Carregar séries da API TMDB
    useEffect(() => {
        const loadSeries = async () => {
            try {
                if (isInitialLoad) {
                    setLoading(true);
                }
                console.log('📺 Carregando séries do TMDB (página ' + page + ', gênero: ' + selectedGenre + ')...');
                let seriesData;
                
                if (selectedGenre) {
                    // Carregar séries por gênero
                    seriesData = await tmdbService.getTVShowsByGenre(selectedGenre, page, 'pt-BR');
                } else {
                    // Carregar séries populares
                    seriesData = await tmdbService.getPopularTVShows(page, 'pt-BR');
                }
                
                const formattedSeries = seriesData.map(show => 
                    tmdbService.formatTMDBItem(show, 'tv')
                );

                if (isInitialLoad) {
                    // Primeira carga - substituir séries
                    setSeries(formattedSeries);
                    setIsInitialLoad(false);
                } else {
                    // Cargas subsequentes - adicionar séries
                    setSeries(prevSeries => [...prevSeries, ...formattedSeries]);
                }
                
                setError(null);
                console.log('✅ Séries carregadas:', formattedSeries.length);
            } catch (err) {
                console.error('❌ Erro ao carregar séries:', err);
                setError('Erro ao carregar séries. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        loadSeries();
    }, [page, selectedGenre]);

    // Buscar séries com debounce
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setIsSearching(false);
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        setSearchLoading(true);

        const searchTimeout = setTimeout(async () => {
            try {
                console.log('🔍 Buscando séries:', searchQuery);
                const results = await tmdbService.searchTVShows(searchQuery, 'pt-BR');
                const formattedResults = results.map(show =>
                    tmdbService.formatTMDBItem(show, 'tv')
                );
                setSearchResults(formattedResults);
                console.log('✅ Resultados encontrados:', formattedResults.length);
            } catch (err) {
                console.error('❌ Erro ao buscar séries:', err);
                setSearchResults([]);
            } finally {
                setSearchLoading(false);
            }
        }, 500); // Debounce de 500ms

        return () => clearTimeout(searchTimeout);
    }, [searchQuery]);

    const handleSeriesClick = (seriesId) => {
        console.log('📺 Clicou na série:', seriesId);
        navigate(`/info-ptbr/tv/${seriesId}`);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleGenreDropdownToggle = () => {
        setIsGenreDropdownOpen(!isGenreDropdownOpen);
    };

    const getGenreLabel = () => {
        if (!selectedGenre) return 'Todos os Gêneros';
        const genre = genres.find(g => g.id == selectedGenre);
        return genre ? genre.label : 'Todos os Gêneros';
    };

    return (
        <>
            <BackButtonPTBR />
            <main className="movies-page">
                {/* Seção Herói com Série em Destaque */}
                <section className="hero-section-movies hero-tvshows">
                <div className="hero-background-movies" />
                <div className="hero-overlay-movies" />

                <div className="hero-content-main">
                    <div className="hero-text-catalog">
                        <h1>PESQUISE SÉRIES</h1>
                        {/* <p>
                            Explore nosso catálogo com milhares de séries, avaliações da
                            comunidade e recomendações personalizadas.
                        </p> */}
                        {/* <div className="hero-cta">
                            <button className="cta-btn primary">Explorar Catálogo</button>
                            <button className="cta-btn secondary">Ver Tendências</button>
                        </div> */}
                    </div>
                </div>
            </section>

            {/* Filtros e Busca */}
            <section className="filters-section">
                <div className="container">
                    <div className="filters-container">
                        <div className="filters-grid">
                            <div className="filter-group">
                                <div className="search-box">
                                    <FontAwesomeIcon icon={faSearch} />
                                    <input
                                        type="text"
                                        placeholder="Buscar séries..."
                                        id="series-search"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </div>
                            <div className="genre-dropdown">
                                <button className="genre-dropdown-btn" onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}>
                                    <span>{getGenreLabel()}</span>
                                    <FontAwesomeIcon icon={isGenreDropdownOpen ? faChevronUp : faChevronDown} />
                                </button>
                                <div 
                                    className="genre-dropdown-content" 
                                    style={{
                                        display: isGenreDropdownOpen ? 'block' : 'none',
                                        visibility: isGenreDropdownOpen ? 'visible' : 'hidden',
                                        opacity: isGenreDropdownOpen ? 1 : 0
                                    }}
                                >
                                    {genres.map(genre => (
                                        <button
                                            key={genre.id}
                                            className={`genre-option ${selectedGenre == genre.id ? 'selected' : ''}`}
                                            onClick={() => {
                                                setSelectedGenre(genre.id);
                                                setPage(1);
                                                setIsGenreDropdownOpen(false);
                                            }}
                                        >
                                            {genre.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Catálogo de Séries */}
            <section className="catalog-section">
                <div className="container">
                    <div className="catalog-header">
                        {/* <h2>Catálogo de Séries</h2> */}
                        {/* <div className="view-options">
                            <button className="view-btn active" data-view="grid">
                                <FontAwesomeIcon icon={faTh} />
                            </button>
                            <button className="view-btn" data-view="list">
                                <FontAwesomeIcon icon={faList} />
                            </button>
                        </div> */}
                    </div>
                    <div className="movies-grid" id="series-container">
                        {isSearching && searchLoading && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                                <p style={{ color: '#fff', fontSize: '1.1rem' }}>Buscando séries...</p>
                            </div>
                        )}

                        {isSearching && !searchLoading && searchResults.length === 0 && searchQuery.trim() !== '' && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                                <p style={{ color: '#fff' }}>Nenhuma série encontrada para "{searchQuery}"</p>
                            </div>
                        )}

                        {isSearching && searchResults.length > 0 && !searchLoading && searchResults.map((show) => (
                            <div key={show.id} className="movie-card" onClick={() => handleSeriesClick(show.id)} style={{ cursor: 'pointer' }}>
                                <div className="movie-poster">
                                    <img src={show.poster || '../src/img/poster1.jpg'} alt={show.title} />
                                    <div className="movie-rating-badge">{(show.rating / 2).toFixed(1)}</div>
                                </div>
                            </div>
                        ))}

                        {!isSearching && loading && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                                <p style={{ color: '#fff', fontSize: '1.1rem' }}>Carregando séries...</p>
                            </div>
                        )}
                        
                        {!isSearching && error && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#e74c3c' }}>
                                <p>{error}</p>
                            </div>
                        )}
                        
                        {!isSearching && !loading && !error && series.length === 0 && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                                <p style={{ color: '#fff' }}>Nenhuma série encontrada</p>
                            </div>
                        )}

                        {!isSearching && !loading && series.map((show) => (
                            <div key={show.id} className="movie-card" onClick={() => handleSeriesClick(show.id)} style={{ cursor: 'pointer' }}>
                                <div className="movie-poster">
                                    <img src={show.poster || '../src/img/poster1.jpg'} alt={show.title} />
                                    <div className="movie-rating-badge">{(show.rating / 2).toFixed(1)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="load-more">
                        {!isSearching && (
                            <button className="load-more-btn" onClick={() => setPage(page + 1)}>
                                <FontAwesomeIcon icon={faPlus} />
                                Carregar Mais Séries
                            </button>
                        )}
                    </div>
                </div>
            </section>
            </main>
        </>
    );
}

export default CatalogoSeries;
