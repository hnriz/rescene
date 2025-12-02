import { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilm,
    faTv,
    faStar,
    faUsers,
    faFilter,
    faUserGroup,
    faComment,
    faBolt,
    faTrophy,
    faPlus,
    faHeart
} from '@fortawesome/free-solid-svg-icons';

function RankComments() {
    useEffect(() => {
        const scripts = [
            '/js/ranks.js',
            '/js/rankComments.js'
        ];

        const scriptElements = scripts.map(src => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
            return script;
        });

        // Cleanup
        return () => {
            scriptElements.forEach(script => {
                document.body.removeChild(script);
            });
        };
    }, []);


    return (
        <main class="rankingPage rank-comments">
            {/* <!-- Cabeçalho inspirado no profile --> */}
            <section class="rankingHeader">
                <div class="rankingBackground"></div>

                <div class="rankingContent containerRanks">
                    <div class="rankingMainInfo">
                        <div class="rankingIconcontainerRanks">
                            <div class="rankingIcon">
                                <FontAwesomeIcon icon={faComment} />
                            </div>
                        </div>

                        <div class="rankingDetails">
                            <h1 class="rankingDisplayName">Top 10 Comments</h1>

                            <span class="rankingSubtitle">The most liked comments by Rescene community</span>

                           
                        </div>
                    </div>
                </div>
            </section>

            <div class="rankingContainer">

                {/* <!-- Navegação entre rankings --> */}
                <nav class="rankingNav container">
                    <a href="/rankMovies" class="navItem ">
                        <FontAwesomeIcon icon={faFilm} />
                        <span>Top Movies</span>
                    </a>
                    <a href="/rankTVShows" class="navItem ">
                        <FontAwesomeIcon icon={faTv} />
                        <span>Top TV Shows</span>
                    </a>
                    <a href="/rankUsers" class="navItem ">
                        <FontAwesomeIcon icon={faUserGroup} />
                        <span>Top Users</span>
                    </a>
                    <a href="/rankComments" class="navItem active">
                        <FontAwesomeIcon icon={faComment} />
                        <span>Top Comments</span>
                    </a>
                </nav>

                {/* <!-- Conteúdo principal do ranking --> */}
                <section className="rankingcontainerRanks containerRanks">
                    <div className="ranking-table-container">
                        <table className="ranking-table">
                            <thead>
                                <tr>
                                    <th>Ranking</th>
                                    <th>Comment</th>
                                    <th>Likes</th>
                                </tr>
                            </thead>
                            <tbody id="ranking-body">
                                {/* Itens serão inseridos via JavaScript */}
                            </tbody>
                        </table>
                    </div>

                    <div className="loadMorecontainerRanks">
                        <button className="loadMoreButton" id="see-more-btn">
                            <FontAwesomeIcon icon={faPlus} /> Load more
                        </button>
                    </div>

                    {/* Botão Ver Menos (oculto inicialmente) */}
                    <div className="loadMorecontainerRanks" style={{ display: 'none' }} id="see-less-container">
                        <button className="loadMoreButton" id="see-less-btn">
                            See less
                        </button>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default RankComments;