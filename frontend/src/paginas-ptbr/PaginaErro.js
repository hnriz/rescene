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

function PaginaErro() {
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
                    
                    <h1 className="error-title">Cena Não Encontrada</h1>
                    <p className="error-subtitle">
                        A página que você procura parece ter sido cortada da versão final.
                    </p>

                    {/* Movie Poster Style Card */}
                    <div className="error-card">
                        <div className="card-icon">
                            <FontAwesomeIcon icon={faCircleExclamation}/>
                        </div>
                        <p className="card-text">
                            Esse não é o filme que você procura. Vamos colocá-lo de volta no caminho certo!
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="error-actions">
                        <button 
                            className="btn btn-primary error-btn"
                            onClick={() => navigate('/')}
                        >
                            <FontAwesomeIcon icon={faHome} />
                            Ir para Home
                        </button>
                        
                        <button 
                            className="btn btn-secondary error-btn"
                            onClick={() => navigate(-1)}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Voltar
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div className="quick-links">
                        <h3>Navegação Rápida</h3>
                        <div className="links-grid">
                            <button 
                                className="quick-link"
                                onClick={() => navigate('/filmes')}
                            >
                                <FontAwesomeIcon icon={faFilm} />
                                <span>Filmes</span>
                            </button>
                            
                            <button 
                                className="quick-link"
                                onClick={() => navigate('/series')}
                            >
                                <FontAwesomeIcon icon={faCompass} />
                                <span>Séries</span>
                            </button>
                            
                            
                            <button 
                                className="quick-link"
                                onClick={() => navigate('/top-filmes')}
                            >
                                <FontAwesomeIcon icon={faTrophy} />
                                <span>Ranking</span>
                            </button>
                        </div>
                    </div>

                    {/* Fun Message */}
                    <div className="error-message">
                        <p>
                            <FontAwesomeIcon icon={faLightbulb}/> <strong>Dica:</strong> Esse erro é mais raro que um filme com nota 5 perfeita. 
                            Se continuar vendo, contate nosso time de suporte.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default PaginaErro;
