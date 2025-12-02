import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faHeart,
    faChevronDown,
    faChevronUp,
    faChevronLeft,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import '../css/profile.css';
import '../css/profileFavorites.css';

function PerfilFavoritos() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedSort, setSelectedSort] = useState('recent');

    // Cards data
    const allCards = [
        { id: 1, type: 'movie', title: 'Interestelar', year: '2014', duration: '169 min', rating: 4.8, poster: '../src/img/poster14.jpg' },
        { id: 2, type: 'series', title: 'Breaking Bad', year: '2008-2013', duration: '5 temporadas', rating: 4.9, poster: '../src/img/poster5.jpg' },
        { id: 3, type: 'movie', title: 'O Poderoso Chefão', year: '1972', duration: '175 min', rating: 4.7, poster: '../src/img/poster10.webp' },
        { id: 4, type: 'series', title: 'Stranger Things', year: '2016-', duration: '4 temporadas', rating: 4.6, poster: '../src/img/poster13.jpg' },
        { id: 5, type: 'movie', title: 'Parasita', year: '2019', duration: '132 min', rating: 4.5, poster: '../src/img/poster3.jpg' },
        { id: 6, type: 'series', title: 'The Last of Us', year: '2023-', duration: '1 temporada', rating: 4.8, poster: '../src/img/poster1.jpg' }
    ];

    // Filter cards based on selectedFilter
    const filteredCards = allCards.filter(card => {
        if (selectedFilter === 'all') return true;
        if (selectedFilter === 'movies') return card.type === 'movie';
        if (selectedFilter === 'series') return card.type === 'series';
        return true;
    });

    // Sort cards based on selectedSort
    const sortedCards = [...filteredCards].sort((a, b) => {
        switch(selectedSort) {
            case 'recent':
                return 0; // Keep original order for favorites
            case 'oldest':
                return 0;
            case 'rating':
                return b.rating - a.rating;
            case 'title':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            const filterDropdown = document.querySelector('.filter-type-dropdown');
            const sortDropdown = document.querySelector('.sort-dropdown');
            if (filterDropdown && !filterDropdown.contains(event.target)) {
                setIsFilterOpen(false);
            }
            if (sortDropdown && !sortDropdown.contains(event.target)) {
                setIsSortOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Script antigo não é necessário - funcionalidade está no React
    // useEffect(() => {
    //     // liked.js não é necessário com React
    // }, []);

    const getFilterLabel = (filter) => {
        const labels = {
            'all': 'Todos',
            'movies': 'Filmes',
            'series': 'Séries'
        };
        return labels[filter] || 'Todos';
    };

    const getSortLabel = (sort) => {
        const labels = {
            'recent': 'Mais recentes',
            'oldest': 'Mais antigos',
            'rating': 'Melhor avaliados',
            'title': 'Título (A-Z)'
        };
        return labels[sort] || 'Mais recentes';
    };

    return (
        <section className="likedContent container" display="none">
            <div className="contentHeader">
                <h2 className="sectionTitle">Favoritos</h2>
            </div>

            <div className="contentFilters">
                <div className="filterGroup">
                    <label>Tipo:</label>
                    <div className="filter-type-dropdown">
                        <button className="filter-type-btn" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                            <span>{getFilterLabel(selectedFilter)}</span>
                            <FontAwesomeIcon icon={isFilterOpen ? faChevronUp : faChevronDown} />
                        </button>
                        {isFilterOpen && (
                            <div className="filter-type-dropdown-content">
                                {[
                                    { value: 'all', label: 'Todos' },
                                    { value: 'movies', label: 'Filmes' },
                                    { value: 'series', label: 'Séries' }
                                ].map(option => (
                                    <button
                                        key={option.value}
                                        className={`filter-option ${selectedFilter === option.value ? 'selected' : ''}`}
                                        onClick={() => {
                                            setSelectedFilter(option.value);
                                            setIsFilterOpen(false);
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="filterGroup">
                    <label>Ordenar por:</label>
                    <div className="sort-dropdown">
                        <button className="sort-btn" onClick={() => setIsSortOpen(!isSortOpen)}>
                            <span>{getSortLabel(selectedSort)}</span>
                            <FontAwesomeIcon icon={isSortOpen ? faChevronUp : faChevronDown} />
                        </button>
                        {isSortOpen && (
                            <div className="filter-type-dropdown-content">
                                {[
                                    { value: 'recent', label: 'Mais recentes' },
                                    { value: 'oldest', label: 'Mais antigos' },
                                    { value: 'rating', label: 'Melhor avaliados' },
                                    { value: 'title', label: 'Título (A-Z)' }
                                ].map(option => (
                                    <button
                                        key={option.value}
                                        className={`filter-option ${selectedSort === option.value ? 'selected' : ''}`}
                                        onClick={() => {
                                            setSelectedSort(option.value);
                                            setIsSortOpen(false);
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="contentGrid">
                {sortedCards.map(card => (
                    <div key={card.id} className={`contentCard ${card.type}`}>
                        <div className="cardImage">
                            <img src={card.poster} alt={card.title} />
                            <div className="cardOverlay">
                                {/* <div className="cardRating">
                                    <FontAwesomeIcon icon={faStar} />
                                    <span>{card.rating}</span>
                                </div> */}
                                <button className="likeButton liked">
                                    <FontAwesomeIcon icon={faHeart} />
                                </button>
                            </div>
                        </div>
                        <div className="cardInfo">
                            <h3 className="cardTitle">{card.title}</h3>
                            <div className="cardMeta">
                                <span className="cardYear">{card.year}</span>
                                <span className="cardDuration">{card.duration}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* <div className="pagination">
                <button className="paginationButton" disabled>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button className="paginationButton active">1</button>
                <button className="paginationButton">2</button>
                <button className="paginationButton">3</button>
                <button className="paginationButton">
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div> */}
        </section>
    );
}

export default PerfilFavoritos;