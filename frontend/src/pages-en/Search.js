import React from 'react';
import BackButton from '../components/BackButton';

class Search extends React.Component {
    render() {
        return (
            <>
                <BackButton />
                <main>
                    <div className="searchResultsContainer">
                    <div className="resultsTitle">
                        <h2>Showing results for "name"</h2>
                    </div>

                    <div className="resultsContent">
                        <div className="resultsLeft">
                            <a href="list/lists.html" className="resultCard">
                                <div className="thumbnail"></div>
                                <div className="resultInfo">
                                    <h3>
                                        <strong>Name</strong> year
                                    </h3>
                                    <p>
                                        <strong>Alternative titles:</strong> Lorem ipsum dolor sit
                                        amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                        incididunt ut labore et.
                                    </p>
                                    <p>
                                        <strong>Directed by</strong>{" "}
                                        <span className="badge-search">fulano</span>
                                    </p>
                                </div>
                            </a>

                            <a href="#" className="resultCard">
                                <div className="thumbnail"></div>
                                <div className="resultInfo">
                                    <h3>
                                        <strong>Name</strong> year
                                    </h3>
                                    <p>
                                        <strong>Alternative titles:</strong> Lorem ipsum dolor sit
                                        amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                        incididunt ut labore et.
                                    </p>
                                    <p>
                                        <strong>Directed by</strong>{" "}
                                        <span className="badge-search">fulano</span>
                                    </p>
                                </div>
                            </a>

                            <a href="#" className="resultCard">
                                <div className="thumbnail"></div>
                                <div className="resultInfo">
                                    <h3>
                                        <strong>Nome</strong> ano
                                    </h3>
                                    <p>
                                        <strong>Títulos alternativos:</strong> Lorem ipsum dolor sit
                                        amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                        incididunt ut labore et.
                                    </p>
                                    <p>
                                        <strong>Dirigido por</strong>{" "}
                                        <span className="badge-search">fulano</span>
                                    </p>
                                </div>
                            </a>

                            <a href="#" className="resultCard">
                                <div className="thumbnail"></div>
                                <div className="resultInfo">
                                    <h3>
                                        <strong>Nome</strong> ano
                                    </h3>
                                    <p>
                                        <strong>Títulos alternativos:</strong> Lorem ipsum dolor sit
                                        amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                        incididunt ut labore et.
                                    </p>
                                    <p>
                                        <strong>Dirigido por</strong>{" "}
                                        <span className="badge-search">fulano</span>
                                    </p>
                                </div>
                            </a>

                            <a href="#" className="resultCard">
                                <div className="thumbnail"></div>
                                <div className="resultInfo">
                                    <h3>
                                        <strong>Nome</strong> ano
                                    </h3>
                                    <p>
                                        <strong>Títulos alternativos:</strong> Lorem ipsum dolor sit
                                        amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                        incididunt ut labore et.
                                    </p>
                                    <p>
                                        <strong>Dirigido por</strong>{" "}
                                        <span className="badge-search">fulano</span>
                                    </p>
                                </div>
                            </a>

                            <button type="button" className="btn">
                                See More
                            </button>
                        </div>

                        <aside className="resultsSidebar">
                            <h3>Show results for</h3>
                            <ul className="filterList">
                                <li>All</li>
                                <li>Movies</li>
                                <li>TV Shows</li>
                                <li>Reviews</li>
                                <li>Lists</li>
                                <li>Cast or studios</li>
                            </ul>
                        </aside>
                    </div>
                </div>
                </main>
            </>
        );
    }
}

export default Search;
