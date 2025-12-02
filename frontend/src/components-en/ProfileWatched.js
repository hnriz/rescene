import {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faStarHalfAlt,
    faHeart,
    faChevronRight,
    faChevronLeft,
    faTh,
    faList,
    faEye,
    faEdit,
    faChevronDown,
    faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import '../css/profile.css';
import '../css/profileWatched.css';

function ProfileWatched() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedSort, setSelectedSort] = useState('recent');

    // Cards data
    const allCards = [
        { id: 1, type: 'movie', title: 'Interestelar', year: '2014', duration: '169 min', date: '2023-10-15', rating: 4.8, poster: '../src/img/poster1.jpg' },
        { id: 2, type: 'series', title: 'Breaking Bad', year: '2008-2013', duration: '5 temporadas', date: '2023-09-22', rating: 4.9, poster: '../src/img/poster11.jpg' },
        { id: 3, type: 'movie', title: 'O Poderoso Chefão', year: '1972', duration: '175 min', date: '2023-08-05', rating: 4.7, poster: '../src/img/poster15.jpeg' }
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
                return new Date(b.date) - new Date(a.date);
            case 'oldest':
                return new Date(a.date) - new Date(b.date);
            case 'rating':
                return b.rating - a.rating;
            case 'title':
                return a.title.localeCompare(b.title);
            case 'duration':
                return parseInt(b.duration) - parseInt(a.duration);
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

    const getFilterLabel = () => {
        const options = {
            'all': 'All',
            'movies': 'Movies',
            'series': 'TV Shows'
        };
        return options[selectedFilter] || 'All';
    };

    const getSortLabel = () => {
        const options = {
            'recent': 'Latest',
            'oldest': 'Oldest',
            'rating': 'Rating',
            'title': 'Title (A-Z)',
            'duration': 'Duration'
        };
        return options[selectedSort] || 'Latest';
    };

    // Script antigo não é necessário - funcionalidade está no React
    // useEffect(() => {
    //     // watched.js não é necessário com React
    // }, []);
        return (
            <section class="watchedContent container">
                <div class="contentHeader">
                    <h2 class="sectionTitle">Watched Content</h2>
                    <div class="contentStats">
                        <div class="statBubble">
                            <span class="statNumber">{allCards.length}</span>
                            <span class="statLabel">Total</span>
                        </div>
                        <div class="statBubble">
                            <span class="statNumber">{allCards.filter(c => c.type === 'movie').length}</span>
                            <span class="statLabel">Movies</span>
                        </div>
                        <div class="statBubble">
                            <span class="statNumber">{allCards.filter(c => c.type === 'series').length}</span>
                            <span class="statLabel">TV Shows</span>
                        </div>
                    </div>
                </div>

                <div class="contentFilters">
                    <div class="filterGroup">
                        <label>Filter:</label>
                        <div class="filter-type-dropdown">
                            <button 
                                class="filter-type-btn"
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                {getFilterLabel()}
                                <FontAwesomeIcon icon={isFilterOpen ? faChevronUp : faChevronDown} />
                            </button>
                            {isFilterOpen && (
                                <div class="filter-type-dropdown-content">
                                    <div class="filter-option" onClick={() => { setSelectedFilter('all'); setIsFilterOpen(false); }}>
                                        All
                                    </div>
                                    <div class="filter-option" onClick={() => { setSelectedFilter('movies'); setIsFilterOpen(false); }}>
                                        Movies
                                    </div>
                                    <div class="filter-option" onClick={() => { setSelectedFilter('series'); setIsFilterOpen(false); }}>
                                        TV Shows
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div class="filterGroup">
                        <label>Order by:</label>
                        <div class="sort-dropdown">
                            <button 
                                class="sort-btn"
                                onClick={() => setIsSortOpen(!isSortOpen)}
                            >
                                {getSortLabel()}
                                <FontAwesomeIcon icon={isSortOpen ? faChevronUp : faChevronDown} />
                            </button>
                            {isSortOpen && (
                                <div class="filter-type-dropdown-content">
                                    <div class="filter-option" onClick={() => { setSelectedSort('recent'); setIsSortOpen(false); }}>
                                        Latest
                                    </div>
                                    <div class="filter-option" onClick={() => { setSelectedSort('oldest'); setIsSortOpen(false); }}>
                                        Oldest
                                    </div>
                                    <div class="filter-option" onClick={() => { setSelectedSort('rating'); setIsSortOpen(false); }}>
                                        Rating
                                    </div>
                                    <div class="filter-option" onClick={() => { setSelectedSort('title'); setIsSortOpen(false); }}>
                                        Title (A-Z)
                                    </div>
                                    <div class="filter-option" onClick={() => { setSelectedSort('duration'); setIsSortOpen(false); }}>
                                        Duration
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* <div class="viewOptions">
                        <button class="viewButton active" data-view="grid">
                            <FontAwesomeIcon icon={faTh} />
                        </button>
                        <button class="viewButton" data-view="list">
                            <FontAwesomeIcon icon={faList} />
                        </button>
                    </div> */}
                </div>

                <div class="contentGrid">
                    {sortedCards.map((card) => (
                        <div key={card.id} class={`contentCard ${card.type}`} data-rating={card.rating} data-date={card.date} data-duration={card.duration}>
                            <div class="cardImage">
                                <img src={card.poster} alt={card.title}/>
                                    <div class="cardOverlay">
                                        {/* <div class="cardRating">
                                            <FontAwesomeIcon icon={faStar} />
                                            <span>{card.rating}</span>
                                        </div> */}
                                        <div class="cardActions">
                                            <button class="actionButton watched active">
                                                <FontAwesomeIcon icon={faEye} />
                                            </button>
                                            <button class="actionButton like">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </button>
                                        </div>
                                    </div>
                            </div>
                            <div class="cardInfo">
                                <h3 class="cardTitle">{card.title}</h3>
                                <div class="cardMeta">
                                    {/* <span class="cardYear">{card.year}</span> */}
                                    {/* <span class="cardDuration">{card.duration}</span> */}
                                    <span class="cardDate">{new Date(card.date).toLocaleDateString('en-GB').replace(/\//g, '/')}</span>
                                </div>
                                <div class="cardFooter">
                                    <div class="userRating">
                                        <div class="stars">
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStarHalfAlt} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div class="pagination">
                    <button class="paginationButton" disabled>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button class="paginationButton active">1</button>
                    <button class="paginationButton">2</button>
                    <button class="paginationButton">3</button>
                    <button class="paginationButton">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div> */}
            </section>
        );
    }


export default ProfileWatched;