import {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faStarHalfAlt,
    faHeart,
    faChevronRight,
    faChevronLeft,
    faEye,
    faChevronDown,
    faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import '../css/profile.css';
import '../css/profileWatched.css';

function PerfilAssistidos() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedSort, setSelectedSort] = useState('recent');

    // Cards data
    const allCards = [
        { id: 1, type: 'movie', title: 'Interestelar', year: '2014', duration: '169 min', rating: 4.8, date: '15/10/2023', userRating: 4.5, poster: '../src/img/poster1.jpg' },
        { id: 2, type: 'series', title: 'Breaking Bad', year: '2008-2013', duration: '5 temporadas', rating: 4.9, date: '22/09/2023', userRating: 5, poster: '../src/img/poster11.jpg' },
        { id: 3, type: 'movie', title: 'O Poderoso Chefão', year: '1972', duration: '175 min', rating: 4.7, date: '05/08/2023', userRating: 5, poster: '../src/img/poster15.jpeg' }
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
                return new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-'));
            case 'oldest':
                return new Date(a.date.split('/').reverse().join('-')) - new Date(b.date.split('/').reverse().join('-'));
            case 'rating':
                return b.rating - a.rating;
            case 'title':
                return a.title.localeCompare(b.title);
            case 'duration':
                const getDuration = (dur) => parseInt(dur);
                return getDuration(b.duration) - getDuration(a.duration);
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
    //     // watched.js não é necessário com React
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
            'recent': 'Recentes',
            'oldest': 'Antigos',
            'rating': 'Avaliação',
            'title': 'Título (A-Z)',
            'duration': 'Duração'
        };
        return labels[sort] || 'Recentes';
    };

        return (
            <section className="watchedContent container">
                <div className="contentHeader">
                    <h2 className="sectionTitle">Conteúdos Assistidos</h2>
                    <div className="contentStats">
                        <div className="statBubble">
                            <span className="statNumber">{allCards.length}</span>
                            <span className="statLabel">Total</span>
                        </div>
                        <div className="statBubble">
                            <span className="statNumber">{allCards.filter(c => c.type === 'movie').length}</span>
                            <span className="statLabel">Filmes</span>
                        </div>
                        <div className="statBubble">
                            <span className="statNumber">{allCards.filter(c => c.type === 'series').length}</span>
                            <span className="statLabel">Séries</span>
                        </div>
                    </div>
                </div>

                <div className="contentFilters">
                    <div className="filterGroup">
                        <label>Filtrar:</label>
                        <div className="filter-type-dropdown">
                            <button 
                                className="filter-type-btn"
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
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
                            <button 
                                className="sort-btn"
                                onClick={() => setIsSortOpen(!isSortOpen)}
                            >
                                <span>{getSortLabel(selectedSort)}</span>
                                <FontAwesomeIcon icon={isSortOpen ? faChevronUp : faChevronDown} />
                            </button>
                            {isSortOpen && (
                                <div className="filter-type-dropdown-content">
                                    {[
                                        { value: 'recent', label: 'Recentes' },
                                        { value: 'oldest', label: 'Antigos' },
                                        { value: 'rating', label: 'Avaliação' },
                                        { value: 'title', label: 'Título (A-Z)' },
                                        { value: 'duration', label: 'Duração' }
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
                                <img src={card.poster} alt={card.title}/>
                                    <div className="cardOverlay">
                                        {/* <div className="cardRating">
                                            <FontAwesomeIcon icon={faStar} />
                                            <span>{card.rating}</span>
                                        </div> */}
                                        <div className="cardActions">
                                            <button className="actionButton watched active">
                                                <FontAwesomeIcon icon={faEye} />
                                            </button>
                                            <button className="actionButton like">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </button>
                                        </div>
                                    </div>
                            </div>
                            <div className="cardInfo">
                                <h3 className="cardTitle">{card.title}</h3>
                                <div className="cardMeta">
                                    {/* <span className="cardYear">{card.year}</span> */}
                                    {/* <span className="cardDuration">{card.duration}</span> */}
                                    <span className="cardDate">{card.date}</span>
                                </div>
                                <div className="cardFooter">
                                    <div className="userRating">
                                        <div className="stars">
                                            {[...Array(Math.floor(card.userRating))].map((_, i) => (
                                                <FontAwesomeIcon key={i} icon={faStar} />
                                            ))}
                                            {card.userRating % 1 !== 0 && <FontAwesomeIcon icon={faStarHalfAlt} />}
                                        </div>
                                    </div>
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


export default PerfilAssistidos;