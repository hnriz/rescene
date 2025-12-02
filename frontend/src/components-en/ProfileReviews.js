import React, { useState, useEffect, useCallback } from 'react';
import Avatar from './Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faHeart,
    faStarHalfAlt,
    faComment,
    faShareAlt,
    faReply,
    faPaperPlane,
    faPlus,
    faChevronDown,
    faChevronUp,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import reviewService from '../services/reviewService';
import { useAuth } from '../context/AuthContext';
import '../css/profile.css';

function ProfileReviews({ userId, isOwnProfile = true }) {
    const { user } = useAuth();
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('recent');
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [likedReviews, setLikedReviews] = useState({});
    const [likingReviewId, setLikingReviewId] = useState(null);

    const LIMIT = 10;

    console.log('📋 ProfileReviews Props:', { userId, isOwnProfile });

    // Function to load reviews (defined first to be used in useEffect)
    const loadReviews = useCallback(async (newOffset) => {
        try {
            setLoading(true);
            setError(null);
            
            console.log('🔄 Loading reviews with:', { isOwnProfile, userId, selectedSort, newOffset });
            
            let result;
            if (isOwnProfile) {
                // Reviews do próprio usuário (requer autenticação)
                console.log('📌 Using authenticated endpoint');
                result = await reviewService.getUserReviews(selectedSort, LIMIT, newOffset);
            } else {
                // Reviews públicas de outro usuário
                console.log('🌐 Using public endpoint for userId:', userId);
                result = await reviewService.getUserPublicReviews(userId, selectedSort, LIMIT, newOffset);
            }
            
            if (newOffset === 0) {
                setReviews(result.reviews || []);
            } else {
                setReviews(prevReviews => [...prevReviews, ...(result.reviews || [])]);
            }
            
            setOffset(newOffset + LIMIT);
            setHasMore(result.reviews && result.reviews.length === LIMIT);
        } catch (err) {
            console.error('Error loading reviews:', err);
            setError('Error loading reviews. Please try again.');
            if (newOffset === 0) {
                setReviews([]);
            }
        } finally {
            setLoading(false);
        }
    }, [isOwnProfile, userId, selectedSort]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const dropdown = document.querySelector('.sort-dropdown');
            if (dropdown && !dropdown.contains(event.target)) {
                setIsSortOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Load reviews when props change (userId, isOwnProfile, selectedSort)
    useEffect(() => {
        setOffset(0);
        setHasMore(true);
        loadReviews(0);
    }, [userId, isOwnProfile, selectedSort, loadReviews]);

    // Load like status when reviews change
    useEffect(() => {
        const loadLikeStatus = async () => {
            const likeStatusMap = {};
            for (const review of reviews) {
                try {
                    const result = await reviewService.checkIfLiked(review.id);
                    if (result.success) {
                        likeStatusMap[review.id] = result.liked;
                    }
                } catch (err) {
                    console.error(`Error checking like status for review ${review.id}:`, err);
                }
            }
            setLikedReviews(likeStatusMap);
        };

        if (reviews.length > 0) {
            loadLikeStatus();
        }
    }, [reviews]);

    // Function to load more reviews
    const handleLoadMore = () => {
        loadReviews(offset);
    };

    // Format date function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        
        return date.toLocaleDateString('en-US');
    };

    // Render starsReviewProfile function
    const renderstarsReviewProfile = (rating) => {
        const starsReviewProfile = [];
        const fullstarsReviewProfile = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullstarsReviewProfile; i++) {
            starsReviewProfile.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} />);
        }

        if (hasHalfStar) {
            starsReviewProfile.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} />);
        }

        return starsReviewProfile;
    };

    const showPopupNotification = (message, type = 'info') => {
        const existingNotification = document.querySelector('.profile-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `profile-notification profile-notification-${type}`;
        notification.innerHTML = `<div class="profile-notification-content"><span>${message}</span></div>`;

        notification.style.position = 'fixed';
        notification.style.top = '95px';
        notification.style.right = '20px';
        notification.style.zIndex = '1001';
        notification.style.padding = '15px 30px';
        notification.style.borderRadius = '8px';
        notification.style.color = '#fff';
        notification.style.fontWeight = '500';
        notification.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        notification.style.animation = 'slideInInfo 0.3s ease';

        switch (type) {
            case 'success':
                notification.style.background = '#27ae60';
                break;
            case 'error':
                notification.style.background = '#e74c3c';
                break;
            default:
                notification.style.background = '#3498db';
        }

        document.body.appendChild(notification);

        if (!document.getElementById('profile-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'profile-notification-styles';
            style.textContent = `
                @keyframes slideInInfo {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideOutInfo {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutInfo 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    };

    const handleLikeReview = async (reviewId, isCurrentlyLiked) => {
        if (!user) {
            showPopupNotification('Please login to like a review', 'info');
            return;
        }

        if (likingReviewId) {
            return;
        }

        try {
            setLikingReviewId(reviewId);
            const result = await reviewService.likeReview(reviewId);
            if (result.success) {
                setLikedReviews(prev => ({
                    ...prev,
                    [reviewId]: result.liked
                }));

                setReviews(prev =>
                    prev.map(review =>
                        review.id === reviewId
                            ? {
                                ...review,
                                likes_count: result.liked
                                    ? review.likes_count + 1
                                    : review.likes_count - 1
                            }
                            : review
                    )
                );
                console.log(`✅ Like ${result.liked ? 'added' : 'removed'} from review ${reviewId}`);
            }
        } catch (err) {
            console.error('Error liking review:', err);
        } finally {
            setLikingReviewId(null);
        }
    };

    const getSortLabel = () => {
        const options = {
            'recent': 'Latest',
            'popular': 'Most Popular',
            'highest': 'Highest Ratings',
            'lowest': 'Lowest Ratings'
        };
        return options[selectedSort] || 'Latest';
    };

    const showDeleteConfirmation = (reviewId) => {
        return new Promise((resolve) => {
            // Remove existing modal
            const existingModal = document.querySelector('.delete-confirmation-modal');
            if (existingModal) {
                existingModal.parentNode.remove();
            }

            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'delete-confirmation-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.right = '0';
            overlay.style.bottom = '0';
            overlay.style.background = 'rgba(0, 0, 0, 0.7)';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.zIndex = '2000';
            overlay.style.animation = 'fadeInOverlay 0.3s ease';

            // Create modal
            const modal = document.createElement('div');
            modal.className = 'delete-confirmation-modal';
            modal.style.background = '#25252F';
            modal.style.borderRadius = '12px';
            modal.style.padding = '30px';
            modal.style.minWidth = '320px';
            modal.style.maxWidth = '400px';
            modal.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.5)';
            modal.style.animation = 'scaleInModal 0.3s ease';
            modal.style.color = '#fff';
            modal.innerHTML = `
                <h3 style="margin: 0 0 15px 0; font-size: 1.3rem; font-weight: 600;">
                    Delete Review?
                </h3>
                <p style="margin: 0 0 25px 0; color: #A0A0B0; font-size: 0.95rem; line-height: 1.5;">
                    Are you sure you want to delete this review? This action cannot be undone.
                </p>
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button class="confirm-cancel-btn" style="
                        padding: 10px 20px;
                        border: 1px solid #555;
                        background: transparent;
                        color: #A0A0B0;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 500;
                        transition: all 0.2s ease;
                    ">
                        Cancel
                    </button>
                    <button class="confirm-delete-btn" style="
                        padding: 10px 20px;
                        border: none;
                        background: #e74c3c;
                        color: #fff;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 500;
                        transition: all 0.2s ease;
                    ">
                        Delete
                    </button>
                </div>
            `;

            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            // Add animation styles if they don't exist
            if (!document.getElementById('delete-confirmation-styles')) {
                const style = document.createElement('style');
                style.id = 'delete-confirmation-styles';
                style.textContent = `
                    @keyframes fadeInOverlay {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    
                    @keyframes scaleInModal {
                        from { 
                            opacity: 0;
                            transform: scale(0.9);
                        }
                        to { 
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                    
                    .confirm-cancel-btn:hover {
                        background: rgba(255, 255, 255, 0.1) !important;
                        color: #fff !important;
                    }
                    
                    .confirm-delete-btn:hover {
                        background: #c0392b !important;
                        transform: translateY(-2px);
                    }
                `;
                document.head.appendChild(style);
            }

            // Event listeners
            const cancelBtn = modal.querySelector('.confirm-cancel-btn');
            const deleteBtn = modal.querySelector('.confirm-delete-btn');

            const closeModal = () => {
                overlay.style.animation = 'fadeOutOverlay 0.3s ease';
                modal.style.animation = 'scaleOutModal 0.3s ease';
                setTimeout(() => {
                    overlay.remove();
                }, 300);
            };

            cancelBtn.addEventListener('click', () => {
                closeModal();
                resolve(false);
            });

            deleteBtn.addEventListener('click', () => {
                closeModal();
                resolve(true);
            });

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    closeModal();
                    resolve(false);
                }
            });
        });
    };

    const handleDeleteReview = async (reviewId) => {
        const confirmed = await showDeleteConfirmation(reviewId);
        if (!confirmed) return;

        try {
            await reviewService.deleteReview(reviewId);
            setReviews(prev => prev.filter(review => review.id !== reviewId));
            console.log('✅ Review deleted successfully');
        } catch (err) {
            console.error('Error deleting review:', err);
            setError('Error deleting review');
        }
    };

    return (
    <section className="reviewsContainer container">
        <div className="reviewsHeader">
            <h2 className="sectionTitle">Last Reviews</h2>
            <div className="sortOptions">
                <span className="sortLabel">Order by:</span>
                <div className="sort-dropdown">
                    <button
                        className="sort-btn"
                        onClick={() => setIsSortOpen(!isSortOpen)}
                    >
                        <span>{getSortLabel()}</span>
                        <FontAwesomeIcon icon={isSortOpen ? faChevronUp : faChevronDown} />
                    </button>
                    {isSortOpen && (
                        <div className="filter-type-dropdown-content" id='reviewsDropdown'>
                            <button className="filter-option" onClick={() => { setSelectedSort('recent'); setIsSortOpen(false); }}>
                                Latest
                            </button>
                            <button className="filter-option" onClick={() => { setSelectedSort('popular'); setIsSortOpen(false); }}>
                                Most Popular
                            </button>
                            <button className="filter-option" onClick={() => { setSelectedSort('highest'); setIsSortOpen(false); }}>
                                Highest Ratings
                            </button>
                            <button className="filter-option" onClick={() => { setSelectedSort('lowest'); setIsSortOpen(false); }}>
                                Lowest Ratings
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {error && (
            <div className="reviewErrorMessage">
                {error}
            </div>
        )}

        {loading && offset === 0 ? (
            <div className="reviewLoadingContainer">
                <FontAwesomeIcon icon={faPlus} />
                Loading reviews...
            </div>
        ) : reviews.length === 0 ? (
            <div className="reviewEmptyContainer">
                <p>No reviews yet.</p>
                <p>Start rating movies and series!</p>
            </div>
        ) : (
            <>
                <div className="reviewList">
                    {reviews.map((review) => (
                        <article className="reviewCard" key={review.id}>
                            <div className="reviewMovie">
                                <a href={`/info/${review.media_id}`} className="moviePoster">
                                    <img 
                                        src={review.moviePoster || "../src/img/poster-default.jpg"} 
                                        alt="Movie Poster" 
                                        onError={(e) => {
                                            e.target.src = "../src/img/poster-default.jpg";
                                        }}
                                    />
                                    {/* <div className="movieRating">
                                        <FontAwesomeIcon icon={faStar} />
                                        <span>{review.rating}</span>
                                    </div> */}
                                </a>
                            </div>

                                    <div className="reviewContent">
                                        <div className="reviewHeader">
                                            <div className="reviewHeaderInfo">
                                                <div className="reviewTitleRow">
                                                    <h3 className="movieTitle">{review.movieTitle || 'Title not available'}</h3>
                                                    <span className="movieYear">{review.movieYear || 'Unknown year'}</span>
                                                </div>
                                                <div className="reviewstarsReviewProfileRow">
                                                    <div className="starsReviewProfile" aria-label={`${review.rating} out of 5 starsReviewProfile`}>
                                                        {renderstarsReviewProfile(review.rating)}
                                                    </div>
                                                    <div className="reviewDate">
                                                        {formatDate(review.created_at)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="reviewText">
                                            <p>{review.text}</p>
                                        </div>

                                        <div className="reviewButtonsContainer">
                                            <button
                                                className={`like-btn likeButton ${likedReviews[review.id] ? 'liked' : ''}`}
                                                onClick={() => handleLikeReview(review.id, likedReviews[review.id])}
                                                disabled={likingReviewId === review.id}
                                                style={{
                                                    color: likedReviews[review.id] ? '#e05252' : '#A0A0B0',
                                                    opacity: likingReviewId === review.id ? 0.6 : 1,
                                                    cursor: likingReviewId === review.id ? 'wait' : 'pointer'
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faHeart} />
                                                <span>{review.likes_count || 0}</span>
                                            </button>
                                            {user && review.user_id === user.id && (
                                                <button
                                                    onClick={() => handleDeleteReview(review.id)}
                                                    className="deleteButton"
                                                    title="Delete review"
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                        </article>
                    ))}
                </div>

                {hasMore && (
                    <div className="loadMoreContainer">
                        <button 
                            className="loadMoreButton"
                            onClick={handleLoadMore}
                            disabled={loading}
                        >
                            <FontAwesomeIcon icon={faPlus} /> 
                            {loading ? 'Loading...' : 'Load More Reviews'}
                        </button>
                    </div>
                )}
            </>
        )}
    </section>
    );
}

export default ProfileReviews;