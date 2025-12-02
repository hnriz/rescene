import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilm,
    faHome,
    faArrowLeft,
    faSearch,
    faTrophy,
    faCompass,
    faCircleExclamation,
    faLightbulb
} from '@fortawesome/free-solid-svg-icons';
import '../css/errorPage.css';

function ErrorPage() {
    const navigate = useNavigate();

    return (
        <main className="error-page">
            <div className="error-container">
                {/* Animated Background Elements */}
                <div className="error-background">
                    {/* <div className="floating-film-reel"></div> */}
                    {/* <div className="floating-popcorn"></div> */}
                    {/* <div className="floating-clapboard"></div> */}
                    <div className="stars-bg"></div>
                </div>

                {/* Error Content */}
                <div className="error-content">
                    <div className="error-code">404</div>
                    
                    <h1 className="error-title">Scene Not Found</h1>
                    <p className="error-subtitle">
                        The page you're looking for seems to have been cut from the final edit.
                    </p>

                    {/* Movie Poster Style Card */}
                    <div className="error-card">
                        <div className="card-icon">
                            <FontAwesomeIcon icon={faCircleExclamation}/>
                        </div>
                        <p className="card-text">
                            This isn't the film you're looking for. Let's get you back on track!
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="error-actions">
                        <button 
                            className="btn btn-primary error-btn"
                            onClick={() => navigate('/')}
                        >
                            <FontAwesomeIcon icon={faHome} />
                            Go to Home
                        </button>
                        
                        <button 
                            className="btn btn-secondary error-btn"
                            onClick={() => navigate(-1)}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Go Back
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div className="quick-links">
                        <h3>Quick Navigation</h3>
                        <div className="links-grid">
                            <button 
                                className="quick-link"
                                onClick={() => navigate('/movies')}
                            >
                                <FontAwesomeIcon icon={faFilm} />
                                <span>Movies</span>
                            </button>
                            
                            <button 
                                className="quick-link"
                                onClick={() => navigate('/tv-shows')}
                            >
                                <FontAwesomeIcon icon={faCompass} />
                                <span>TV Shows</span>
                            </button>
                            
                            <button 
                                className="quick-link"
                                onClick={() => navigate('/rankings')}
                            >
                                <FontAwesomeIcon icon={faTrophy} />
                                <span>Rankings</span>
                            </button>
                        </div>
                    </div>

                    {/* Fun Message */}
                    <div className="error-message">
                        <p>
                            <FontAwesomeIcon icon={faLightbulb}/> <strong>Tip:</strong> This error is rarer than a perfect 5-star movie. 
                            If you keep seeing it, contact our support team.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ErrorPage;
