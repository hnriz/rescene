import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faHeart,
    faSearch,
    faEllipsisH,
    faChevronRight,
    faChevronLeft,
    faChevronDown,
    faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import '../css/profile.css';
import '../css/profileFavorites.css';

function ProfileFavorites() {
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
            'rating': 'Highest rating',
            'title': 'Title (A-Z)'
        };
        return options[selectedSort] || 'Latest';
    };

    // Script antigo não é necessário - funcionalidade está no React
    // useEffect(() => {
    //     // liked.js não é necessário com React
    // }, []);

    return (
        <section class="likedContent container" display="none">
            <div class="contentHeader">
                <h2 class="sectionTitle">Favorites</h2>

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
                                    Highest rating
                                </div>
                                <div class="filter-option" onClick={() => { setSelectedSort('title'); setIsSortOpen(false); }}>
                                    Title (A-Z)
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* <div class="searchBox">
                    <input type="text" placeholder="Search..." />
                    <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                </div> */}
            </div>

            <div class="contentGrid">
                {sortedCards.map((card) => (
                    <div key={card.id} class={`contentCard ${card.type}`}>
                        <div class="cardImage">
                            <img src={card.poster} alt={card.title} />
                            <div class="cardOverlay">
                                {/* <div class="cardRating">
                                    <FontAwesomeIcon icon={faStar} />
                                    <span>{card.rating}</span>
                                </div> */}
                                <button class="likeButton liked">
                                    <FontAwesomeIcon icon={faHeart} />
                                </button>
                            </div>
                        </div>
                        <div class="cardInfo">
                            <h3 class="cardTitle">{card.title}</h3>
                            <div class="cardMeta">
                                <span class="cardYear">{card.year}</span>
                                <span class="cardDuration">{card.duration}</span>
                            </div>
                            <div class="cardActions">
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

export default ProfileFavorites;