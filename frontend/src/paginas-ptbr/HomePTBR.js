import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFilm,
    faTv,
    faChartLine,
    faHeart,
    faChevronLeft,
    faChevronRight,
    faMagic,
    faClapperboard,
    faTheaterMasks,
    faStar,
    faStarHalf,
    faExplosion,
    faFaceGrinSquintTears,
    faComment,
    faGhost,
    faRocket,
    faTrophy,
    faFire,
    faGift,
    faComments
} from "@fortawesome/free-solid-svg-icons";
import tmdbService from "../services/tmdbService";
import communityReviewService from "../services/communityReviewService";
import AvatarPTBR from "../componentes-ptbr/AvatarPTBR";

// Featured movies and series for homepage
const FEATURED_MOVIES = [
    { id: 550, type: "movie" },      // Fight Club
    { id: 278, type: "movie" },      // The Shawshank Redemption
    { id: 238, type: "movie" },      // The Godfather
    { id: 240, type: "movie" },      // The Godfather Part II
    { id: 680, type: "movie" },      // Pulp Fiction
    { id: 109, type: "movie" },      // Interstellar
    { id: 603, type: "movie" },      // The Matrix
    { id: 500, type: "movie" },      // Reservoir Dogs
];

const FEATURED_MOVIES_EXTENDED = [
    { id: 550, type: "movie" },      // Fight Club
    { id: 1399, type: "tv" },        // Breaking Bad
    { id: 278, type: "movie" },      // The Shawshank Redemption
    { id: 1396, type: "tv" },        // The Office
    { id: 238, type: "movie" },      // The Godfather
    { id: 1438, type: "tv" },        // Game of Thrones
    { id: 240, type: "movie" },      // The Godfather Part II
    { id: 2739, type: "tv" },        // Sherlock
    { id: 680, type: "movie" },      // Pulp Fiction
    { id: 1668, type: "tv" },        // Friends
    { id: 109, type: "movie" },      // Interstellar
    { id: 1100, type: "tv" },        // The Sopranos
    { id: 603, type: "movie" },      // The Matrix
    { id: 2316, type: "tv" },        // The Crown
];

const FEATURED_SERIES = [
    { id: 1399, type: "tv" },        
    { id: 1396, type: "tv" },        
    { id: 1438, type: "tv" },        
    { id: 2739, type: "tv" },        
    { id: 1668, type: "tv" },        
    { id: 1100, type: "tv" },        
    { id: 2316, type: "tv" },        
    { id: 66732, type: "tv" }
];

// Function to render stars based on TMDB rating (0-10 scale)
const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2); // Convert to 5-star scale
    const hasHalfStar = rating % 2 >= 1;

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: "#ffd700" }} />);
        } else if (i === fullStars && hasHalfStar) {
            stars.push(<FontAwesomeIcon key={i} icon={faStarHalf} style={{ color: "#ffd700" }} />);
        } else {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: "#666" }} />);
        }
    }
    return stars;
};

function HomePTBR() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [popularItems, setPopularItems] = useState([]);
    const [series, setSeries] = useState([]);
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [communityReviews, setCommunityReviews] = useState([]);
    const [loadingMovies, setLoadingMovies] = useState(true);
    const [loadingPopular, setLoadingPopular] = useState(true);
    const [loadingSeries, setLoadingSeries] = useState(true);
    const [loadingFeaturedMovies, setLoadingFeaturedMovies] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [topRatedMovie, setTopRatedMovie] = useState(null);
    const [hotTopicMovie, setHotTopicMovie] = useState(null);
    const [newMovie, setNewMovie] = useState(null);

    // Scroll to top on component mount with delay to override other scroll operations
    useEffect(() => {
        const scrollTimer = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
        return () => clearTimeout(scrollTimer);
    }, []);

    // Load featured movies
    useEffect(() => {
        const loadMovies = async () => {
            try {
                setLoadingMovies(true);
                const moviesData = await Promise.all(
                    FEATURED_MOVIES.map(item =>
                        tmdbService.getMovieDetails(item.id, "pt-BR")
                    )
                );
                const formatted = moviesData.map(movie =>
                    tmdbService.formatTMDBItem(movie, "movie")
                );

                // Use only the first 6 movies in the carousel
                setMovies(formatted.slice(0, 6));

                // Set floating posters based on topics
                if (formatted.length >= 3) {
                    // Best rated - movie with highest rating
                    const bestRated = formatted.reduce((prev, current) =>
                        (prev.rating || 0) > (current.rating || 0) ? prev : current
                    );
                    setTopRatedMovie(bestRated);

                    // Hot topic - get trending movie
                    let hotMovie = formatted[3];
                    try {
                        const trendingMovies = await tmdbService.getTrendingMovies("pt-BR");
                        if (trendingMovies.length > 0) {
                            // Find trending movie not in carousel and not the best
                            const carouselIds = new Set(formatted.slice(0, 6).map(m => m.id));
                            let foundTrending = trendingMovies.find(m => !carouselIds.has(m.id) && m.id !== bestRated.id);
                            if (foundTrending) {
                                hotMovie = tmdbService.formatTMDBItem(foundTrending, "movie");
                            }
                        }
                    } catch (err) {
                        console.error("Error fetching trending:", err);
                    }
                    setHotTopicMovie(hotMovie);

                    // New - get recently released movie
                    let newMovieData = null;
                    try {
                        const recentMovies = await tmdbService.getRecentlyReleasedMovies("pt-BR");
                        if (recentMovies.length > 0) {
                            // Find recent movie not in carousel, not best rated, not hot topic
                            const carouselIds = new Set(formatted.slice(0, 6).map(m => m.id));
                            let foundRecent = recentMovies.find(m =>
                                !carouselIds.has(m.id) && m.id !== bestRated.id && m.id !== hotMovie.id
                            );
                            if (foundRecent) {
                                newMovieData = tmdbService.formatTMDBItem(foundRecent, "movie");
                            }
                        }
                    } catch (err) {
                        console.error("Error fetching recent movies:", err);
                    }

                    // Fallback
                    if (!newMovieData) {
                        const carouselIds = new Set(formatted.slice(0, 6).map(m => m.id));
                        newMovieData = formatted.find(f => !carouselIds.has(f.id) && f.id !== bestRated.id && f.id !== hotMovie.id);
                    }
                    setNewMovie(newMovieData);
                }
            } catch (err) {
                console.error("Error loading movies:", err);
            } finally {
                setLoadingMovies(false);
            }
        };
        loadMovies();
    }, []);

    // Load featured series
    useEffect(() => {
        const loadSeries = async () => {
            try {
                setLoadingSeries(true);
                const tvData = await Promise.all(
                    FEATURED_SERIES.map(item =>
                        tmdbService.getTVShowDetails(item.id, "pt-BR")
                    )
                );
                const formatted = tvData.map(show =>
                    tmdbService.formatTMDBItem(show, "tv")
                );
                setSeries(formatted);
            } catch (err) {
                console.error("Error loading series:", err);
            } finally {
                setLoadingSeries(false);
            }
        };
        loadSeries();
    }, []);

    // Load featured movies (for Featured Movies section)
    useEffect(() => {
        const loadFeaturedMovies = async () => {
            try {
                setLoadingFeaturedMovies(true);
                const moviesData = await Promise.all(
                    FEATURED_MOVIES.map(item =>
                        tmdbService.getMovieDetails(item.id, "pt-BR")
                    )
                );
                const formatted = moviesData.map(movie =>
                    tmdbService.formatTMDBItem(movie, "movie")
                );
                setFeaturedMovies(formatted);
            } catch (err) {
                console.error("Error loading featured movies:", err);
            } finally {
                setLoadingFeaturedMovies(false);
            }
        };
        loadFeaturedMovies();
    }, []);

    // Load community reviews
    useEffect(() => {
        const loadReviews = async () => {
            try {
                setLoadingReviews(true);
                const reviews = await communityReviewService.getCommunityReviews(4);
                setCommunityReviews(reviews);
            } catch (err) {
                console.error("Error loading community reviews:", err);
            } finally {
                setLoadingReviews(false);
            }
        };
        loadReviews();
    }, []);

    // Função para renderizar estrelas baseado na nota
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating || 0);
        const hasHalf = (rating || 0) % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <FontAwesomeIcon key={`full-${i}`} icon={faStar} />
            );
        }
        if (hasHalf) {
            stars.push(
                <FontAwesomeIcon key="half" icon={faStarHalf} />
            );
        }

        return stars;
    };

    // Função para calcular tempo relativo (ex: "3 horas atrás")
    const getTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) return interval + (interval === 1 ? ' ano atrás' : ' anos atrás');

        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) return interval + (interval === 1 ? ' mês atrás' : ' meses atrás');

        interval = Math.floor(seconds / 86400);
        if (interval >= 1) return interval + (interval === 1 ? ' dia atrás' : ' dias atrás');

        interval = Math.floor(seconds / 3600);
        if (interval >= 1) return interval + (interval === 1 ? ' hora atrás' : ' horas atrás');

        interval = Math.floor(seconds / 60);
        if (interval >= 1) return interval + (interval === 1 ? ' minuto atrás' : ' minutos atrás');

        return 'agora mesmo';
    };

    // Load popular items (mix of movies and series for the carousel)
    useEffect(() => {
        const loadPopularItems = async () => {
            try {
                setLoadingPopular(true);
                
                // Get IDs from featured sections to exclude them
                const featuredMovieIds = new Set(FEATURED_MOVIES.map(m => m.id));
                const featuredSeriesIds = new Set(FEATURED_SERIES.map(s => s.id));
                
                // Fetch popular movies and TV shows from TMDB
                const [popularMovies, popularSeries] = await Promise.all([
                    tmdbService.getPopularMovies(1, "pt-BR"),
                    tmdbService.getPopularTVShows(1, "pt-BR")
                ]);
                
                console.log("Popular Movies:", popularMovies);
                console.log("Popular Series:", popularSeries);
                console.log("Featured Movie IDs:", Array.from(featuredMovieIds));
                console.log("Featured Series IDs:", Array.from(featuredSeriesIds));
                
                // Filter out items that are already in featured sections
                const filteredMovies = popularMovies.filter(m => !featuredMovieIds.has(m.id));
                const filteredSeries = popularSeries.filter(s => !featuredSeriesIds.has(s.id));
                
                console.log("Filtered Movies:", filteredMovies);
                console.log("Filtered Series:", filteredSeries);
                
                // Interleave movies and series (alternating)
                const mixed = [];
                const maxLength = Math.max(filteredMovies.length, filteredSeries.length);
                
                for (let i = 0; i < maxLength; i++) {
                    if (i < filteredMovies.length) {
                        mixed.push({
                            ...filteredMovies[i],
                            type: "movie"
                        });
                    }
                    if (i < filteredSeries.length) {
                        mixed.push({
                            ...filteredSeries[i],
                            type: "tv"
                        });
                    }
                }
                
                // Format and limit to reasonable number (14 items for the carousel)
                const formatted = mixed.slice(0, 14).map(item =>
                    tmdbService.formatTMDBItem(item, item.type)
                );
                
                console.log("Final Popular Items:", formatted);
                setPopularItems(formatted);
            } catch (err) {
                console.error("Error loading popular items:", err);
                // Fallback to featured movies extended if API fails
                try {
                    const moviesData = await Promise.all(
                        FEATURED_MOVIES_EXTENDED.map(item => {
                            if (item.type === "movie") {
                                return tmdbService.getMovieDetails(item.id, "pt-BR");
                            } else {
                                return tmdbService.getTVShowDetails(item.id, "pt-BR");
                            }
                        })
                    );
                    const formatted = moviesData.map((item, index) => {
                        const itemType = FEATURED_MOVIES_EXTENDED[index].type;
                        return tmdbService.formatTMDBItem(item, itemType);
                    });
                    setPopularItems(formatted);
                } catch (fallbackErr) {
                    console.error("Error loading fallback items:", fallbackErr);
                }
            } finally {
                setLoadingPopular(false);
            }
        };
        loadPopularItems();
    }, []);

    // Initialize carousel after render
    useEffect(() => {
        if (!loadingPopular && popularItems.length > 0) {
            initializeCarousel();
        }
    }, [loadingPopular, popularItems]);

    // Function to initialize carousel
    const initializeCarousel = () => {
        setTimeout(() => {
            const carousel = document.getElementById("popular-carousel");
            const prevBtn = document.getElementById("carousel-prev");
            const nextBtn = document.getElementById("carousel-next");
            const dotsContainer = document.getElementById("carousel-dots");

            if (!carousel) return;

            const CAROUSEL_ITEMS_PER_PAGE = 4;
            let currentPage = 0;

            // Create dots
            const totalItems = carousel.children.length;
            const maxPage = Math.ceil(totalItems / CAROUSEL_ITEMS_PER_PAGE) - 1;

            if (dotsContainer) {
                dotsContainer.innerHTML = "";
                for (let i = 0; i <= maxPage; i++) {
                    const dot = document.createElement("div");
                    dot.className = `carousel-dot ${i === 0 ? "active" : ""}`;
                    dot.onclick = () => {
                        currentPage = i;
                        updateCarousel(currentPage);
                        updateDots();
                    };
                    dotsContainer.appendChild(dot);
                }
            }

            const updateDots = () => {
                const dots = document.querySelectorAll(".carousel-dot");
                dots.forEach((dot, index) => {
                    dot.classList.toggle("active", index === currentPage);
                });
            };

            const updateCarousel = (page) => {
                const itemWidth = carousel.querySelector(".carousel-item")?.offsetWidth || 280;
                carousel.scrollLeft = page * itemWidth * CAROUSEL_ITEMS_PER_PAGE;
                updateDots();
                updateButtonVisibility();
            };

            const updateButtonVisibility = () => {
                if (prevBtn) {
                    prevBtn.style.visibility = currentPage === 0 ? "hidden" : "visible";
                }
                if (nextBtn) {
                    nextBtn.style.visibility = currentPage === maxPage ? "hidden" : "visible";
                }
            };

            if (prevBtn) {
                prevBtn.onclick = (e) => {
                    e.preventDefault();
                    currentPage = Math.max(0, currentPage - 1);
                    updateCarousel(currentPage);
                };
            }

            if (nextBtn) {
                nextBtn.onclick = (e) => {
                    e.preventDefault();
                    currentPage = Math.min(maxPage, currentPage + 1);
                    updateCarousel(currentPage);
                };
            }

            updateButtonVisibility();
        }, 100);
    };

    return (
        <main className="home-page">
            <section className="hero-section">
                <div className="hero-background">
                    <div className="hero-overlay"></div>
                </div>
                <div className="container-header">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 style={{ lineHeight: '75px' }}>Boas-vindas ao Rescene</h1>
                            <p>
                                Sua casa para descobrir, avaliar e compartilhar suas experiências cinematográficas.
                                Conecte-se com outros cinéfilos e expanda seu universo cinematográfico.
                            </p>
                            <div className="hero-cta-index">
                                <button
                                    className="cta-btn primary"
                                    onClick={() => navigate('/filmes')}
                                >
                                    <FontAwesomeIcon icon={faFilm} />
                                    Explorar Filmes
                                </button>
                                <button
                                    className="cta-btn secondary"
                                    onClick={() => navigate('/series')}
                                >
                                    <FontAwesomeIcon icon={faTv} />
                                    Descobrir Séries
                                </button>
                            </div>
                        </div>

                        <div className="hero-visual">
                            <div className="floating-elements">
                                <div 
                                    className="floating-element element-1" 
                                    id="top-rated-poster"
                                    onClick={() => {
                                        if (topRatedMovie) {
                                            navigate(`/info-ptbr/movie/${topRatedMovie.id}`);
                                        }
                                    }}
                                    style={{ cursor: topRatedMovie ? "pointer" : "default" }}
                                >
                                    {topRatedMovie ? (
                                        <>
                                            <img src={topRatedMovie.poster} alt={topRatedMovie.title} />
                                            <div className="floating-badge">
                                                <FontAwesomeIcon icon={faTrophy} /> {(topRatedMovie.rating / 2).toFixed(1)}
                                            </div>
                                        </>
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Carregando...</div>
                                    )}
                                </div>
                                <div 
                                    className="floating-element element-2" 
                                    id="hot-topic-poster"
                                    onClick={() => {
                                        if (hotTopicMovie) {
                                            navigate(`/info-ptbr/movie/${hotTopicMovie.id}`);
                                        }
                                    }}
                                    style={{ cursor: hotTopicMovie ? "pointer" : "default" }}
                                >
                                    {hotTopicMovie ? (
                                        <>
                                            <img src={hotTopicMovie.poster} alt={hotTopicMovie.title} />
                                            <div className="floating-badge">
                                                <FontAwesomeIcon icon={faFire} /> Em Alta
                                            </div>
                                        </>
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Carregando...</div>
                                    )}
                                </div>
                                <div 
                                    className="floating-element element-3" 
                                    id="new-poster"
                                    onClick={() => {
                                        if (newMovie) {
                                            navigate(`/info-ptbr/movie/${newMovie.id}`);
                                        }
                                    }}
                                    style={{ cursor: newMovie ? "pointer" : "default" }}
                                >
                                    {newMovie ? (
                                        <>
                                            <img src={newMovie.poster} alt={newMovie.title} />
                                            <div className="floating-badge">
                                                <FontAwesomeIcon icon={faGift} /> Novo
                                            </div>
                                        </>
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Carregando...</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Movies Carousel */}
            <section className="carousel-section">
                <div className="container">
                    <div className="section-header-home">
                        <h2><FontAwesomeIcon icon={faFire}/> Populares na Rescene</h2>
                        <p>O que a comunidade está assistindo e avaliando</p>
                    </div>

                    <div className="carousel-container">
                        <button className="carousel-arrow prev" id="carousel-prev">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>

                        <div className="carousel" id="popular-carousel">
                            {loadingPopular ? (
                                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#fff" }}>
                                    <p>Carregando itens populares...</p>
                                </div>
                            ) : (
                                popularItems.map(item => (
                                    <div key={item.id} className="carousel-item">
                                        <div
                                            className="movie-card"
                                            onClick={() => {
                                                const route = item.type === 'tv' ? 'tv' : 'movie';
                                                console.log(`${item.type === 'tv' ? '📺' : '🎬'} Navegando para ${route} ID:`, item.id, "Título:", item.title);
                                                navigate(`/info-ptbr/${route}/${item.id}`);
                                            }}
                                        >
                                            <div className="movie-poster">
                                                <img src={item.poster} alt={item.title} />
                                                <div className="movie-rating-badge">
                                                    <FontAwesomeIcon icon={faStar} style={{fontSize: "13"}} /> {(item.rating / 2).toFixed(1)}
                                                    <FontAwesomeIcon icon={item.type === 'tv' ? faTv : faFilm} style={{fontSize: "13", marginLeft: "6px"}} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <button className="carousel-arrow next" id="carousel-next">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>

                    <div className="carousel-dots" id="carousel-dots"></div>
                </div>
            </section>

            {/* Mascote Call-to-Action */}
            {/* <section className="mascote-cta">
                <div className="mascote-content">
                    <div className="mascote-character">
                        <div className="star-mascot">
                            <div className="star-body"></div>
                            <div className="shine"></div>

                            <div className="star-face">
                                <div className="star-eyes">
                                    <div className="eye">
                                        <div className="pupil"></div>
                                        <div className="eye-shine"></div>
                                    </div>
                                    <div className="eye">
                                        <div className="pupil"></div>
                                        <div className="eye-shine"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="director-bowtie"></div>

                            <div className="film-roll"></div>
                            <div className="film-strip"></div>

                            <div className="clapboard">
                                <div className="clapboard-top"></div>
                                <div className="clapboard-detail"></div>
                                <div className="clapboard-detail"></div>
                                <div className="clapboard-detail"></div>
                            </div>

                            <div className="camera">
                                <div className="camera-lens"></div>
                            </div>

                            <div className="movie-tape"></div>
                        </div>

                        <div className="mascote-decoration decoration-1"></div>
                        <div className="mascote-decoration decoration-2"></div>
                        <div className="mascote-decoration decoration-3"></div>

                        <div className="sparkle sparkle-1"></div>
                        <div className="sparkle sparkle-2"></div>
                        <div className="sparkle sparkle-3"></div>

                        {/* <div className="speech-bubble">
                            <p>Ei! Pronto para descobrir seu próximo filme favorito? 🎬</p>
                            <div className="typing-indicator">
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                            </div>
                        </div> 
                    </div>

                    <div className="mascote-info">
                        <h2>Estrela Cinéfila ao Seu Dispor!</h2>
                        <p>
                            Nosso diretor estrela está aqui para guiá-lo pelas melhores recomendações de filmes baseadas nos seus gostos!
                        </p>

                        <div className="mascote-actions">
                            <button
                                className="mascote-btn primary"
                                onClick={() => navigate("/filmes")}
                            >
                                <FontAwesomeIcon icon={faFilm} />
                                Explorar Filmes
                            </button>
                            <button
                                className="mascote-btn primary"
                                onClick={() => navigate("/series")}
                            >
                                <FontAwesomeIcon icon={faFilm} />
                                Explorar Séries
                            </button>
                            {/* <button className="mascote-btn secondary" id="personalized-recommendations">
                                <FontAwesomeIcon icon={faMagic} />
                                Personalized Recommendations
                            </button> 
                        </div>

                         <div className="mascote-features">
                            <div className="feature">
                                <div className="feature-icon">
                                    <FontAwesomeIcon icon={faStar} />
                                </div>
                                <span className="feature-text">Estrela da Calçada da Fama</span>
                            </div>
                            <div className="feature">
                                <div className="feature-icon">
                                    <FontAwesomeIcon icon={faClapperboard} />
                                </div>
                                <span className="feature-text">Diretor Cinematográfico</span>
                            </div>
                            <div className="feature">
                                <div className="feature-icon">
                                    <FontAwesomeIcon icon={faTheaterMasks} />
                                </div>
                                <span className="feature-text">Especialista em Gêneros</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Featured TV Shows */}
            <section className="new-releases">
                <div className="container">
                    <div className="section-header-home">
                        <h2><FontAwesomeIcon icon={faTv}/> Séries em Destaque</h2>
                        <p>As melhores séries para acompanhar</p>
                    </div>

                    <div className="releases-grid">
                        {loadingSeries ? (
                            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#fff" }}>
                                <p>Carregando séries...</p>
                            </div>
                        ) : (
                            series.map(show => (
                                <div key={show.id} className="release-card">
                                    <div
                                        className="release-poster"
                                        onClick={() => {
                                            console.log("📺 Navegando para série ID:", show.id, "Título:", show.title);
                                            navigate(`/info-ptbr/tv/${show.id}`);
                                        }}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <img src={show.poster} alt={show.title} />
                                        <div className="movie-rating-badge"><FontAwesomeIcon icon={faStar} style={{fontSize: "13px"}} /> {(show.rating / 2).toFixed(1)}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="loadMoreContainer">
                        <button className="cta-btn outline" onClick={() => navigate("/series")}>Ver mais Séries</button>
                    </div>
                    
                </div>
            </section>

            {/* Featured Movies */}
            <section className="new-releases">
                <div className="container">
                    <div className="section-header-home">
                        <h2><FontAwesomeIcon icon={faFilm}/> Filmes em Destaque</h2>
                        <p>Os melhores filmes para assistir</p>
                    </div>

                    <div className="releases-grid">
                        {loadingFeaturedMovies ? (
                            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#fff" }}>
                                <p>Carregando filmes...</p>
                            </div>
                        ) : (
                            featuredMovies.map(movie => (
                                <div key={movie.id} className="release-card">
                                    <div
                                        className="release-poster"
                                        onClick={() => {
                                            console.log("🎬 Navegando para filme ID:", movie.id, "Título:", movie.title);
                                            navigate(`/info-ptbr/movie/${movie.id}`);
                                        }}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <img src={movie.poster} alt={movie.title} />
                                        <div className="movie-rating-badge"><FontAwesomeIcon icon={faStar} style={{fontSize: "13px"}} /> {(movie.rating / 2).toFixed(1)}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="loadMoreContainer">
                        <button className="cta-btn outline" onClick={() => navigate("/filmes")}>Ver mais Filmes</button>
                    </div>
                    
                </div>
            </section>

            {/* Featured Reviews */}
            <section className="featured-reviews">
                <div className="container">
                    <div className="section-header-home">
                        <h2><FontAwesomeIcon icon={faComments}/> Reviews da Comunidade</h2>
                        <p>Veja o que outros cinéfilos estão dizendo</p>
                    </div>

                    <div className="reviews-grid">
                        {loadingReviews ? (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#fff' }}>
                                Carregando reviews...
                            </div>
                        ) : communityReviews.length === 0 ? (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#fff' }}>
                                Nenhuma review disponível no momento.
                            </div>
                        ) : (
                            communityReviews.map((review) => (
                                <div 
                                    key={review.id} 
                                    className="review-card-index"
                                    onClick={() => navigate(`/info-ptbr/movie/${review.media_id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="review-header-index">
                                        <div className="reviewer">
                                            <AvatarPTBR 
                                                src={review.avatar} 
                                                alt={review.displayName} 
                                                className="reviewer-avatar" 
                                                size="medium"
                                            />
                                            <div className="reviewer-info">
                                                <h4>{review.displayName || review.username}</h4>
                                                <span>@{review.username}</span>
                                            </div>
                                        </div>
                                        <div className="review-rating">
                                            <div className="stars">
                                                {renderStars(review.rating)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="review-content">
                                        <h3>{review.movie_title || 'Sem título'}</h3>
                                        <p>
                                            {review.review_text}
                                        </p>
                                    </div>
                                    <div className="review-footer">
                                        <span className="review-date">{getTimeAgo(review.created_at)}</span>
                                        <div className="review-actions">
                                            <button className="like-btn">
                                                <FontAwesomeIcon icon={faHeart} />
                                                <span>{review.likes_count || 0}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Promo Banner */}
            {/* <section className="promo-banner">
                <div className="container"></div>
            </section> */}

            {/* Popular Categories */}
            <section className="categories-section">
                <div className="container">
                    <div className="section-header-home">
                        <h2>Explore por Categoria</h2>
                        <p>Descubra filmes e séries por gênero</p>
                    </div>

                    <div className="categories-grid">
                        <a href="/filmes?genre=28" className="category-card">
                            <div className="category-icon">
                                <FontAwesomeIcon icon={faExplosion} />
                            </div>
                            <h3>Ação</h3>
                            <p>1,245 títulos</p>
                        </a>

                        <a href="/filmes?genre=35" className="category-card">
                            <div className="category-icon">
                                <FontAwesomeIcon icon={faFaceGrinSquintTears} />
                            </div>
                            <h3>Comédia</h3>
                            <p>987 títulos</p>
                        </a>

                        <a href="/filmes?genre=18" className="category-card">
                            <div className="category-icon">
                                <FontAwesomeIcon icon={faTheaterMasks} />
                            </div>
                            <h3>Drama</h3>
                            <p>1,532 títulos</p>
                        </a>

                        <a href="/filmes?genre=878" className="category-card">
                            <div className="category-icon">
                                <FontAwesomeIcon icon={faRocket} />
                            </div>
                            <h3>Ficção Científica</h3>
                            <p>654 títulos</p>
                        </a>

                        <a href="/filmes?genre=27" className="category-card">
                            <div className="category-icon">
                                <FontAwesomeIcon icon={faGhost} />
                            </div>
                            <h3>Terror</h3>
                            <p>432 títulos</p>
                        </a>

                        <a href="/filmes?genre=10749" className="category-card">
                            <div className="category-icon">
                                <FontAwesomeIcon icon={faHeart} />
                            </div>
                            <h3>Romance</h3>
                            <p>765 títulos</p>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default HomePTBR;
