import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCommentDots,
    faUser,
    faAward,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import BackButton from '../components/BackButton';

const henri = '/img/henri.webp';
const giovanna = '/img/giovanna.webp';
const emily = '/img/emily.webp';
const lucas = '/img/lucas.webp';
const aboutMain = '/img/about-us-main.jpg';
const about1 = '/img/about1.webp';
const about2 = '/img/about2.jpg';

class About extends React.Component {
    render() {
        return (
            <>
                <BackButton />
                <main className="home-page">
                    <section className="hero-section-about">
                        <div className="hero-background-about">
                            <div className="hero-overlay-about"></div>
                        </div>
                        <div className="container-about">
                            <div className="hero-content-about">
                                <div className="hero-text-about">
                                    <h1 style={{ lineHeight: "75px" }}>ABOUT US</h1>
                                    <p>Meet the team behind Rescene.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="about-section">
                        {/* CONTAINER ABOUT 1 */}
                        <div className="about-container">
                            {/* Lado Esquerdo */}
                            <div className="about-left">
                                {/* Slogan */}
                                <div className="slogan">
                                    <span className="slogan-line"></span>
                                    <h2>
                                        <span className="slogan-yellow">
                                            Discover, review, share.
                                        </span>{" "}
                                        <br />Expand your cinematic universe.
                                    </h2>
                                </div>

                                {/* Imagem grande */}
                                <div>
                                    <img
                                        src={aboutMain}
                                        alt="Office Space"
                                    />
                                    <p>Office Space (1999)</p>
                                </div>
                            </div>

                            {/* Lado Direito */}
                            <div className="about-right">
                                {/* Imagens pequenas */}
                                <div className="about-cards">
                                    <div className="about-card">
                                        <img
                                            src={about1}
                                            alt="Severance"
                                        />
                                        <p>Severance (2022)</p>
                                    </div>
                                    <div className="about-card">
                                        <img
                                            src={about2}
                                            alt="Ruby Sparks"
                                        />
                                        <p>Ruby Sparks (2012)</p>
                                    </div>
                                </div>

                                <div className="desc-stats">
                                    {/* Parágrafo */}
                                    <div className="about-description">
                                        <p>
                                            Our objective is create a dinamic and welcoming space for every movie and TV show lover, encouraging the discovery of new works, the exchange of sincere opinions, and the building of a community united by the passion for the seventh art.
                                        </p>
                                    </div>

                                    {/* Estatísticas */}
                                    <div className="about-stats">
                                        <div className="stat-about">
                                            <div className="icon-stat">
                                                <FontAwesomeIcon icon={faUser} />
                                            </div>
                                            <h3>+5k</h3>
                                            <p>Active users</p>
                                        </div>

                                        <div className="stat-about">
                                            <div className="icon-stat">
                                                <FontAwesomeIcon icon={faCommentDots} />
                                            </div>
                                            <h3>+10k</h3>
                                            <p>Reviews shared</p>
                                        </div>

                                        <div className="stat-about">
                                            <div className="icon-stat">
                                                <FontAwesomeIcon icon={faAward} />
                                            </div>
                                            <h3>+45</h3>
                                            <p>Received awards</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CONTAINER ABOUT 2 */}
                        <div className="about-container2">
                            <div className="about-header">
                                <div className="title-team">
                                    <FontAwesomeIcon icon={faUsers} />
                                    <h2>
                                        Our team
                                    </h2>
                                </div>
                                <h3>Meet our amazing devs</h3>
                            </div>

                            <div className="about-team">
                                <div className="team-row-1">
                                    <div className="employee1">
                                        <div className="employee-card highlighted">
                                            <img src={henri} alt="Henri" />
                                        </div>
                                        <div className="employee-name">
                                            <h4>Henri</h4>
                                            <p>P.O.</p>
                                        </div>
                                    </div>

                                    <div className="employee3">
                                        <div className="employee-card">
                                            <img src={emily} alt="Emily" />
                                        </div>
                                        <div className="employee-name">
                                            <h4>Emily</h4>
                                            <p>Frontend Developer</p>
                                        </div>
                                    </div>

                                    <div className="employee4">
                                        <div className="employee-card">
                                            <img src={giovanna} alt="Giovanna" />
                                        </div>
                                        <div className="employee-name">
                                            <h4>Giovanna</h4>
                                            <p>Backend Developer</p>
                                        </div>
                                    </div>

                                    <div className="employee5">
                                        <div className="employee-card">
                                            <img src={lucas} alt="Lucas" />
                                        </div>
                                        <div className="employee-name">
                                            <h4>Lucas</h4>
                                            <p>Frontend Developer</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </main >
            </>
        );
    }
}

export default About;