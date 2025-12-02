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
import BackButton from '../components/BackButton';
import tmdbService from '../services/tmdbService';
import '../css/contact.css';

function Contact() {
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
                const movieData = await tmdbService.getMovieDetails(contactId, 'en-US');
                if (movieData && movieData.poster_path) {
                    const posterUrl = tmdbService.getImageUrl(movieData.poster_path);
                    setMoviePoster(posterUrl);
                    console.log('✅ Poster loaded for Contact (1997):', posterUrl);
                } else {
                    console.warn('⚠️ No poster found for Contact');
                }
            } catch (err) {
                console.error('❌ Error loading Contact movie:', err);
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

        const mailtoLink = `mailto:escola.pji2@gmail.com?subject=${encodeURIComponent(
            `${type.charAt(0).toUpperCase() + type.slice(1)} - ${contactFormData.contactSubject}`
        )}&body=${encodeURIComponent(
            `Name: ${contactFormData.contactName}\nEmail: ${contactFormData.contactEmail}\n\nMessage:\n${contactFormData.contactMessage}`
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
            title: 'Share Your Feedback',
            description: 'Help us improve with your suggestions and ideas',
            icon: faComments,
            subjectPlaceholder: 'What would you like to suggest?',
            color: '#FF6B6B'
        },
        email: {
            title: 'Ask a Question',
            description: 'We are here to help with any questions you have',
            icon: faEnvelope,
            subjectPlaceholder: 'What do you need help with?',
            color: '#4ECDC4'
        },
        partnership: {
            title: 'Business Partnership',
            description: 'Let\'s explore collaboration opportunities together',
            icon: faHandshake,
            subjectPlaceholder: 'Tell us about your partnership proposal',
            color: '#95E1D3'
        },
        other: {
            title: 'Something Else',
            description: 'Send us any message outside these categories',
            icon: faMessage,
            subjectPlaceholder: 'What would you like to tell us?',
            color: '#A8E6CF'
        }
    };

    return (
        <>
            <BackButton />
            <main className="contact-page">
                {/* Contact Header */}


            {/* Contact Section with Movie Poster */}
            <section className="contact-section">
                <div className="contact-header">
                    <h1><FontAwesomeIcon icon={faHeadset} /> Contact</h1>
                    <p>Get in touch with us. We'd love to hear from you!</p>
                </div>
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
                                        Loading poster...
                                    </div>
                                )}
                                <div className="poster-overlay">
                                    <p>Click to see more details</p>
                                </div>
                            </div>
                            <div className="poster-info">
                                {/* <h3>Contact (1997)</h3> */}
                                <p>Get in touch with us about your favorite movies and shows!</p>
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
                                    Inquiries
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'partnership' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('partnership')}
                                    style={{ '--tab-color': tabContent.partnership.color }}
                                >
                                    <FontAwesomeIcon icon={faHandshake} />
                                    Partnership
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'other' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('other')}
                                    style={{ '--tab-color': tabContent.other.color }}
                                >
                                    <FontAwesomeIcon icon={faMessage} />
                                    Other
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
                                        <label htmlFor="contactName">Your Name</label>
                                        <input
                                            type="text"
                                            id="contactName"
                                            name="contactName"
                                            value={contactFormData.contactName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="contactEmail">Your Email</label>
                                        <input
                                            type="email"
                                            id="contactEmail"
                                            name="contactEmail"
                                            value={contactFormData.contactEmail}
                                            onChange={handleInputChange}
                                            placeholder="your.email@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="contactSubject">Subject</label>
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
                                        <label htmlFor="contactMessage">Message</label>
                                        <textarea
                                            id="contactMessage"
                                            name="contactMessage"
                                            value={contactFormData.contactMessage}
                                            onChange={handleInputChange}
                                            placeholder="Write your message here..."
                                            rows="6"
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="submit-btn">
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        Send Message
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

export default Contact;