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
import BackButton from '../components/BackButton';
import * as tmdbService from '../services/tmdbService';
import '../css/movies.css';

function TVShows() {
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

    // Update genre when URL parameter changes
    useEffect(() => {
        const genreParam = searchParams.get('genre');
        if (genreParam) {
            setSelectedGenre(genreParam);
            setPage(1);
            setIsInitialLoad(true);
        }
    }, [searchParams]);

    // Close dropdown when clicking outside
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

    // Reset page when genre changes (beyond URL)
    useEffect(() => {
        setPage(1);
        setIsInitialLoad(true);
        setSeries([]); // Clear series when genre changes
    }, [selectedGenre]);

    // Genre mapping (TMDB IDs)
    const genres = [
        { id: '', label: 'All Genres' },
        { id: 10759, label: 'Action & Adventure' },
        { id: 16, label: 'Animation' },
        { id: 35, label: 'Comedy' },
        { id: 80, label: 'Crime' },
        { id: 99, label: 'Documentary' },
        { id: 18, label: 'Drama' },
        { id: 10751, label: 'Family' },
        { id: 10762, label: 'Kids' },
        { id: 9648, label: 'Mystery' },
        { id: 10763, label: 'News' },
        { id: 10764, label: 'Reality' },
        { id: 10765, label: 'Sci-Fi & Fantasy' },
        { id: 10766, label: 'Soap' },
        { id: 10767, label: 'Talk' },
        { id: 10768, label: 'War & Politics' },
        { id: 37, label: 'Western' }
    ];

    // Load TV shows from TMDB API
    useEffect(() => {
        const loadSeries = async () => {
            try {
                if (isInitialLoad) {
                    setLoading(true);
                }
                console.log('📺 Loading TV shows from TMDB (page ' + page + ', genre: ' + selectedGenre + ')...');
                let seriesData;
                
                if (selectedGenre) {
                    // Load TV shows by genre
                    seriesData = await tmdbService.getTVShowsByGenre(selectedGenre, page, 'en-US');
                } else {
                    // Load popular TV shows
                    seriesData = await tmdbService.getPopularTVShows(page, 'en-US');
                }
                
                const formattedSeries = seriesData.map(show => 
                    tmdbService.formatTMDBItem(show, 'tv')
                );

                if (isInitialLoad) {
                    // First load - replace series
                    setSeries(formattedSeries);
                    setIsInitialLoad(false);
                } else {
                    // Subsequent loads - append series
                    setSeries(prevSeries => [...prevSeries, ...formattedSeries]);
                }
                
                setError(null);
                console.log('✅ TV shows loaded:', formattedSeries.length);
            } catch (err) {
                console.error('❌ Error loading TV shows:', err);
                setError('Error loading TV shows. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        loadSeries();
    }, [page, selectedGenre]);

    // Search TV shows with debounce
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
                console.log('🔍 Searching TV shows:', searchQuery);
                const results = await tmdbService.searchTVShows(searchQuery, 1, 'en-US');
                const formattedResults = results.map(show =>
                    tmdbService.formatTMDBItem(show, 'tv')
                );
                setSearchResults(formattedResults);
                console.log('✅ Results found:', formattedResults.length);
            } catch (err) {
                console.error('❌ Error searching TV shows:', err);
                setSearchResults([]);
            } finally {
                setSearchLoading(false);
            }
        }, 500); // Debounce 500ms

        return () => clearTimeout(searchTimeout);
    }, [searchQuery]);

    const handleSeriesClick = (seriesId) => {
        console.log('📺 Clicked on series:', seriesId);
        navigate(`/info/tv/${seriesId}`);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const getGenreLabel = () => {
        if (!selectedGenre) return 'All Genres';
        const genre = genres.find(g => g.id == selectedGenre);
        return genre ? genre.label : 'All Genres';
    };

    return (
        <>
            <BackButton />
            <main className="movies-page">
                {/* Hero Section with Featured TV Show */}
                <section className="hero-section-movies hero-tvshows">
                <div className="hero-background-movies" />
                <div className="hero-overlay-movies" />

                <div className="hero-content-main">
                    <div className="hero-text-catalog">
                        <h1>SEARCH TV SHOWS</h1>
                        {/* <p>
                            Explore our catalog with thousands of TV shows, community reviews
                            and personalized recommendations.
                        </p> */}
                        {/* <div className="hero-cta">
                            <button className="cta-btn primary">Explore Catalog</button>
                            <button className="cta-btn secondary">View Trending</button>
                        </div> */}
                    </div>
                </div>
            </section>

            {/* Filters and Search */}
            <section className="filters-section">
                <div className="container">
                    <div className="filters-container">
                        {/* <div className="filters-header">
                            <h2>Find Your Next Series</h2>
                            <p>Filter by genre, year, rating and more</p>
                        </div> */}
                        <div className="filters-grid">
                            <div className="filter-group">
                                <div className="search-box">
                                    <FontAwesomeIcon icon={faSearch} />
                                    <input
                                        type="text"
                                        placeholder="Search TV shows..."
                                        id="series-search"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </div>
                            <div className="filter-group">
                                <div className="genre-dropdown">
                                    <button 
                                        className="genre-dropdown-btn"
                                        onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
                                    >
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
                </div>
            </section>

            {/* TV Shows Catalog */}
            <section className="catalog-section">
                <div className="container">
                    <div className="catalog-header">
                        {/* <h2>TV Shows Catalog</h2> */}
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
                                <p style={{ color: '#fff', fontSize: '1.1rem' }}>Searching TV shows...</p>
                            </div>
                        )}

                        {isSearching && !searchLoading && searchResults.length === 0 && searchQuery.trim() !== '' && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                                <p style={{ color: '#fff' }}>No TV shows found for "{searchQuery}"</p>
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
                                <p style={{ color: '#fff', fontSize: '1.1rem' }}>Loading TV shows...</p>
                            </div>
                        )}
                        
                        {!isSearching && error && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#e74c3c' }}>
                                <p>{error}</p>
                            </div>
                        )}
                        
                        {!isSearching && !loading && !error && series.length === 0 && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                                <p style={{ color: '#fff' }}>No TV shows found</p>
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
                                Load More TV Shows
                            </button>
                        )}
                    </div>
                </div>
            </section>
            </main>
        </>
    );
}

export default TVShows;
