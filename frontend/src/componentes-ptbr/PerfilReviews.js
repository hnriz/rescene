import React, { useState, useEffect, useCallback } from 'react';
import AvatarPTBR from './AvatarPTBR';
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

function PerfilReviews({ userId, isOwnProfile = true }) {
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

    console.log('📋 PerfilReviews Props:', { userId, isOwnProfile });

    // Função para carregar reviews (definida primeiro para ser usada no useEffect)
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
            console.error('Erro ao carregar reviews:', err);
            setError('Erro ao carregar reviews. Por favor, tente novamente.');
            if (newOffset === 0) {
                setReviews([]);
            }
        } finally {
            setLoading(false);
        }
    }, [isOwnProfile, userId, selectedSort]);

    // Fechar dropdown ao clicar fora
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

    // Carregar reviews quando props mudam (userId, isOwnProfile, selectedSort)
    useEffect(() => {
        setOffset(0);
        setHasMore(true);
        loadReviews(0);
    }, [userId, isOwnProfile, selectedSort, loadReviews]);

    // Carregar status de likes quando reviews mudam
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
                    console.error(`Erro ao verificar like da review ${review.id}:`, err);
                }
            }
            setLikedReviews(likeStatusMap);
        };

        if (reviews.length > 0) {
            loadLikeStatus();
        }
    }, [reviews]);

    // Função para carregar mais reviews
    const handleLoadMore = () => {
        loadReviews(offset);
    };

    // Função para formatar data
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Agora mesmo';
        if (diffMins < 60) return `${diffMins} minuto${diffMins > 1 ? 's' : ''} atrás`;
        if (diffHours < 24) return `${diffHours} hora${diffHours > 1 ? 's' : ''} atrás`;
        if (diffDays < 7) return `${diffDays} dia${diffDays > 1 ? 's' : ''} atrás`;
        
        return date.toLocaleDateString('pt-BR');
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
            showPopupNotification('Faça login para curtir uma avaliação', 'info');
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
                console.log(`✅ Like ${result.liked ? 'adicionado' : 'removido'} da avaliação ${reviewId}`);
            }
        } catch (err) {
            console.error('Erro ao curtir avaliação:', err);
        } finally {
            setLikingReviewId(null);
        }
    };

    // Função para renderizar estrelas
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} />);
        }

        if (hasHalfStar) {
            stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} />);
        }

        return stars;
    };

    const getSortLabel = () => {
        const options = {
            'recent': 'Mais recentes',
            'popular': 'Mais populares',
            'highest': 'Maiores notas',
            'lowest': 'Menores notas'
        };
        return options[selectedSort] || 'Mais recentes';
    };

    const showDeleteConfirmation = (reviewId) => {
        return new Promise((resolve) => {
            // Remover modal existente
            const existingModal = document.querySelector('.delete-confirmation-modal');
            if (existingModal) {
                existingModal.parentNode.remove();
            }

            // Criar overlay
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

            // Criar modal
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
                    Deletar Avaliação?
                </h3>
                <p style="margin: 0 0 25px 0; color: #A0A0B0; font-size: 0.95rem; line-height: 1.5;">
                    Tem certeza que deseja deletar esta avaliação? Esta ação não pode ser desfeita.
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
                        Cancelar
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
                        Deletar
                    </button>
                </div>
            `;

            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            // Adicionar estilos de animação se não existirem
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
            console.log('✅ Review deletada com sucesso');
        } catch (err) {
            console.error('Erro ao deletar review:', err);
            setError('Erro ao deletar avaliação');
        }
    };

    return (
        <>
            <section className="reviewsContainer container">
                <div className="reviewsHeader">
                    <h2 className="sectionTitle">Últimas Avaliações</h2>
                    <div className="sortOptions">
                        <span className="sortLabel">Ordenar por:</span>
                        <div className="sort-dropdown">
                            <button 
                                className="sort-btn"
                                onClick={() => setIsSortOpen(!isSortOpen)}
                            >
                                <span>{getSortLabel()}</span>
                                <FontAwesomeIcon icon={isSortOpen ? faChevronUp : faChevronDown} />
                            </button>
                            {isSortOpen && (
                                <div className="filter-type-dropdown-content">
                                    {[
                                        { value: 'recent', label: 'Mais recentes' },
                                        { value: 'popular', label: 'Mais populares' },
                                        { value: 'highest', label: 'Maiores notas' },
                                        { value: 'lowest', label: 'Menores notas' }
                                    ].map(option => (
                                        <button
                                            key={option.value}
                                            className="filter-option"
                                            onClick={() => { setSelectedSort(option.value); setIsSortOpen(false); }}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
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
                        Carregando avaliações...
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="reviewEmptyContainer">
                        <p>Nenhuma avaliação realizada ainda.</p>
                        <p>Comece a avaliar filmes e séries!</p>
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
                                                alt="Pôster do filme" 
                                                onError={(e) => {
                                                    e.target.src = "../src/img/poster-default.jpg";
                                                }}
                                            />
                                            <div className="movieRating">
                                                <FontAwesomeIcon icon={faStar} />
                                                <span>{review.rating}</span>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="reviewContent">
                                        <div className="reviewHeader">
                                            <div className="reviewHeaderInfo">
                                                <div className="reviewTitleRow">
                                                    <h3 className="movieTitle">{review.movieTitle || 'Título não disponível'}</h3>
                                                    <span className="movieYear">{review.movieYear || 'Ano desconhecido'}</span>
                                                </div>
                                                <div className="reviewStarsRow">
                                                    <div className="stars" aria-label={`${review.rating} de 5 estrelas`}>
                                                        {renderStars(review.rating)}
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
                                                    title="Deletar avaliação"
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
                                    {loading ? 'Carregando...' : 'Carregar mais avaliações'}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>
        </>
    );
}

export default PerfilReviews;