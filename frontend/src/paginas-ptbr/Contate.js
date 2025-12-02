import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faComments,
    faHandshake,
    faPaperPlane,
    faMessage,
    faHeadset
} from '@fortawesome/free-solid-svg-icons';
import BackButtonPTBR from '../componentes-ptbr/BackButtonPTBR';
import tmdbService from '../services/tmdbService';
import '../css/contact.css';

function Contate() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('feedback');
    const [moviePoster, setMoviePoster] = useState('');
    const [movieId, setMovieId] = useState(null);
    const [contactFormData, setContactFormData] = useState({
        contactName: '',
        contactEmail: '',
        contactSubject: '',
        contactMessage: ''
    });

    // Set Contact movie poster using movie ID
    useEffect(() => {
        const loadContactMovie = async () => {
            try {
                // Contact (1997) TMDB ID
                const contactId = 686;
                setMovieId(contactId);

                // Fetch movie details from TMDB API
                const movieData = await tmdbService.getMovieDetails(contactId, 'pt-BR');
                if (movieData && movieData.poster_path) {
                    const posterUrl = tmdbService.getImageUrl(movieData.poster_path);
                    setMoviePoster(posterUrl);
                    console.log('✅ Poster carregado para Contact (1997):', posterUrl);
                } else {
                    console.warn('⚠️ Sem poster encontrado para Contact');
                }
            } catch (err) {
                console.error('❌ Erro ao carregar filme Contact:', err);
            }
        };

        loadContactMovie();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e, type) => {
        e.preventDefault();

        const typeLabels = {
            feedback: 'Feedback',
            email: 'Contato',
            partnership: 'Parceria',
            other: 'Outros'
        };

        const mailtoLink = `mailto:escola.pji2@gmail.com?subject=${encodeURIComponent(
            `${typeLabels[type]} - ${contactFormData.contactSubject}`
        )}&body=${encodeURIComponent(
            `Nome: ${contactFormData.contactName}\nEmail: ${contactFormData.contactEmail}\n\nMensagem:\n${contactFormData.contactMessage}`
        )}`;

        window.location.href = mailtoLink;

        // Reset form
        setContactFormData({
            contactName: '',
            contactEmail: '',
            contactSubject: '',
            contactMessage: ''
        });
    };

    const tabContent = {
        feedback: {
            title: 'Enviar Feedback',
            description: 'Compartilhe suas sugestões e nos ajude a melhorar',
            icon: faComments,
            subjectPlaceholder: 'Sobre o que é seu feedback?',
            color: '#FF6B6B'
        },
        email: {
            title: 'Dúvidas Gerais',
            description: 'Tem uma pergunta? Adoraríamos ouvir você',
            icon: faEnvelope,
            subjectPlaceholder: 'Como podemos ajudá-lo?',
            color: '#4ECDC4'
        },
        partnership: {
            title: 'Oportunidades de Parcerias',
            description: 'Interessado em colaborar conosco? Vamos conversar!',
            icon: faHandshake,
            subjectPlaceholder: 'Conte-nos sobre sua ideia de parceria',
            color: '#95E1D3'
        },
        other: {
            title: 'Outros Assuntos',
            description: 'Algo que não se encaixa nos anteriores? Conte-nos!',
            icon: faMessage,
            subjectPlaceholder: 'Qual é o assunto?',
            color: '#A8E6CF'
        }
    };

    return (
        <>
            <BackButtonPTBR />
            <main className="contact-page">
                {/* Contact Header */}
                <div className="contact-header">
                <h1><FontAwesomeIcon icon={faHeadset} /> Contato</h1>
                <p>Entre em contato conosco. Adoraríamos ouvir você!</p>
            </div>

            {/* Contact Section with Movie Poster */}
            <section className="contact-section">
                <div className="container">
                    <div className="contact-container">
                        {/* Movie Poster Card */}
                        <div className="contact-poster">
                            <div
                                className="poster-card"
                                onClick={() => navigate(`/info/movie/686`)}
                                role="button"
                                tabIndex="0"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        navigate(`/info/movie/686`);
                                    }
                                }}
                            >
                                {moviePoster ? (
                                    <img
                                        src={moviePoster}
                                        alt="Contact Movie Poster"
                                        className="poster-image"
                                        onError={(e) => {
                                            console.error('Image failed to load:', e);
                                            e.target.style.display = 'none';
                                        }}
                                        onLoad={(e) => {
                                            console.log('Image loaded successfully');
                                        }}
                                    />
                                ) : (
                                    <div style={{
                                        width: '100%',
                                        aspectRatio: '2/3',
                                        backgroundColor: '#333',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#666',
                                        fontSize: '0.9rem',
                                        borderRadius: '12px'
                                    }}>
                                        Carregando poster...
                                    </div>
                                )}
                                <div className="poster-overlay">
                                    <p>Clique para ver mais detalhes</p>
                                </div>
                            </div>
                            <div className="poster-info">
                                <p>Entre em contato conosco sobre seus filmes e séries favoritos!</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-container">
                            {/* Tab Navigation */}
                            <div className="contact-tabs">
                                <button
                                    className={`tab-button ${activeTab === 'feedback' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('feedback')}
                                    style={{ '--tab-color': tabContent.feedback.color }}
                                >
                                    <FontAwesomeIcon icon={faComments} />
                                    Feedback
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'email' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('email')}
                                    style={{ '--tab-color': tabContent.email.color }}
                                >
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    Contato
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'partnership' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('partnership')}
                                    style={{ '--tab-color': tabContent.partnership.color }}
                                >
                                    <FontAwesomeIcon icon={faHandshake} />
                                    Parceria
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'other' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('other')}
                                    style={{ '--tab-color': tabContent.other.color }}
                                >
                                    <FontAwesomeIcon icon={faMessage} />
                                    Outros
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className="tab-content">
                                <div className="tab-header">
                                    <FontAwesomeIcon icon={tabContent[activeTab].icon} className="tab-icon" />
                                    <div>
                                        <h2>{tabContent[activeTab].title}</h2>
                                        <p>{tabContent[activeTab].description}</p>
                                    </div>
                                </div>

                                {/* Form */}
                                <form onSubmit={(e) => handleSubmit(e, activeTab)} className="contact-form">
                                    <div className="form-group">
                                        <label htmlFor="contactName">Seu Nome</label>
                                        <input
                                            type="text"
                                            id="contactName"
                                            name="contactName"
                                            value={contactFormData.contactName}
                                            onChange={handleInputChange}
                                            placeholder="Digite seu nome completo"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="contactEmail">Seu Email</label>
                                        <input
                                            type="email"
                                            id="contactEmail"
                                            name="contactEmail"
                                            value={contactFormData.contactEmail}
                                            onChange={handleInputChange}
                                            placeholder="seu.email@exemplo.com"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="contactSubject">Assunto</label>
                                        <input
                                            type="text"
                                            id="contactSubject"
                                            name="contactSubject"
                                            value={contactFormData.contactSubject}
                                            onChange={handleInputChange}
                                            placeholder={tabContent[activeTab].subjectPlaceholder}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="contactMessage">Mensagem</label>
                                        <textarea
                                            id="contactMessage"
                                            name="contactMessage"
                                            value={contactFormData.contactMessage}
                                            onChange={handleInputChange}
                                            placeholder="Escreva sua mensagem aqui..."
                                            rows="6"
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="submit-btn">
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        Enviar Mensagem
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </main>
        </>
    );
}

export default Contate;