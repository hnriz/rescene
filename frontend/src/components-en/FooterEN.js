import React from "react";
import {NavLink} from "react-router-dom";
import logo from '../img/logo-branco.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faShieldAlt,
    faAward,
    faArrowUp,
    faLock
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faThreads, faXTwitter } from '@fortawesome/free-brands-svg-icons';

class FooterEN extends React.Component {
    render() {
        return (
            <footer className="main-footer">
                {/* <div className="footer-wave">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                    </svg>
                </div> */}

                <div className="footer-container">
                    <div className="footer-main">
                        <div className="footer-brand">
                            <div className="footer-logo">
                                <NavLink to="/"><img src={logo} alt="Rescene" /></NavLink>
                            </div>
                            <p className="footer-description">
                                Your platform for discover, review and share movies and TV shows. Connect to another movie lovers and expand your cinematographic universe.
                            </p>
                        </div>

                        <div className="footer-links">
                            <div className="links-column">
                                <h3>Navigation</h3>
                                <ul>
                                    <li><NavLink to="/">Home</NavLink></li>
                                    <li><a href="/movies">Movies</a></li>
                                    <li><a href="/series">TV Shows</a></li>
                                    <li><a href="/rankMovies">Populars</a></li>
                                    <li><a href="/profile">My Profile</a></li>
                                </ul>
                            </div>

                            <div className="links-column">
                                <h3>Recursos</h3>
                                <ul>
                                    <li><a href="/profile">Watched</a></li>
                                    <li><a href="/profile">Favorite</a></li>
                                    <li><a href="/profile">Lists</a></li>
                                    <li><a href="/settings">Settings</a></li>
                                </ul>
                            </div>

                            <div className="links-column">
                                <h3>Support</h3>
                                <ul>
                                    <li><a href="/contact">Contact</a></li>
                                    <li><a href="/about">About</a></li>
                                    <li><a href="/privacy">Privacy</a></li>
                                    <li><a href="/terms">Terms of Use</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="footer-divider"></div>

                    <div className="footer-bottom">
                        <div className="footer-social">
                            <h3>Follow us</h3>
                            <div className="social-icons">
                                <a href="https://www.threads.com/@resceneoficial" target="_blank" className="social-icon" rel="noreferrer">
                                   <FontAwesomeIcon icon={faThreads} />
                                </a>
                                <a href="https://www.instagram.com/resceneoficial/" target="_blank" className="social-icon" rel="noreferrer">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                                <a href="https://x.com/resceneoficial" target="_blank" className="social-icon" rel="noreferrer">
                                    <FontAwesomeIcon icon={faXTwitter} />
                                </a>
                            </div>
                        </div>

                        <div className="footer-copyright">
                            <p>&copy; 2025 Rescene. All rights reserved.</p>
                            <p>Made by IFSP-CAR students</p>
                            <p>Data by <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB</a></p>
                        </div>

                        <div className="footer-badges">
                            <div className="badge-footer">
                                <FontAwesomeIcon icon={faShieldAlt} />
                                <span>Secure Site</span>
                            </div>
                            <div className="badge-footer">
                                <FontAwesomeIcon icon={faLock} />
                                <span>Privacy</span>
                            </div>
                            <div className="badge-footer">
                                <FontAwesomeIcon icon={faAward} />
                                <span>2025 Best Platform</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="back-to-top" id="backToTop">
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            </footer>
        );
    }
}

export default FooterEN;