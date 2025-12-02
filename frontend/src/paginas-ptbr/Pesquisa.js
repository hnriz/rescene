import React from 'react';
import BackButtonPTBR from '../componentes-ptbr/BackButtonPTBR';

class Pesquisa extends React.Component {
    render() {
        return (
            <>
                <BackButtonPTBR />
                <main>
                    <div className="searchResultsContainer">
                    <div className="resultsTitle">
                        <h2>Mostrando correspondências para "nome"</h2>
                    </div>

                    <div className="resultsContent">
                        <div className="resultsLeft">
                            <a href="list/lists.html" className="resultCard">
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
                            <h3>Mostrar resultados para</h3>
                            <ul className="filterList">
                                <li>Todos</li>
                                <li>Filmes</li>
                                <li>Séries</li>
                                <li>Avaliações</li>
                                <li>Listas</li>
                                <li>Elenco, equipe ou estúdios</li>
                            </ul>
                        </aside>
                    </div>
                </div>
                </main>
            </>
        );
    }
}

export default Pesquisa;