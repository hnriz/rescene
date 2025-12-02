import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faFilm,
  faChartLine,
  faCalendarCheck,
  faTags,
  faCalendarAlt,
  faStarHalfAlt,
  faTrophy,
  faGem,
  faRunning,
  faGlobeAmericas,
  faBullseye,
  faCheck,
  faSpinner,
  faTheaterMasks,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import "../css/profileStats.css";

function PerfilEstatisticas() {
  const scriptsLoaded = useRef({ chartjs: false, stats: false, initialized: false });

  useEffect(() => {
    // ✅ Prevenir execução dupla
    if (scriptsLoaded.current.initialized) {
      console.log('⚠️ Scripts já foram inicializados');
      return;
    }

    scriptsLoaded.current.initialized = true;
    console.log('🔍 Iniciando carregamento de scripts...');

    // Limpar flag global se existir
    if (window._statsInitialized) {
      window._statsInitialized = false;
    }

    // Função para carregar script
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        // Verificar se já existe
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          console.log(`✅ Script já existe: ${src}`);
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;

        script.onload = () => {
          console.log(`✅ Script carregado: ${src}`);
          resolve();
        };

        script.onerror = (error) => {
          console.error(`❌ Erro ao carregar: ${src}`, error);
          reject(new Error(`Failed to load script: ${src}`));
        };

        document.body.appendChild(script);
      });
    };

    // Carregar scripts em sequência
    const loadScripts = async () => {
      try {
        // 1. Carregar Chart.js
        await loadScript('https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js');
        scriptsLoaded.current.chartjs = true;

        // Verificar se Chart está disponível
        if (typeof Chart === 'undefined') {
          console.error('❌ Chart.js não está disponível após o carregamento');
          return;
        }
        console.log('✅ Chart.js está disponível:', typeof Chart);

        // 2. Carregar stats.js
        await loadScript('/js/stats.js');
        scriptsLoaded.current.stats = true;

        // 3. Inicializar
        if (typeof window.initStats === 'function') {
          console.log('🚀 Inicializando stats...');
          window.initStats();
        } else {
          console.error('❌ window.initStats não está disponível');
        }

      } catch (error) {
        console.error('❌ Erro durante carregamento de scripts:', error);
      }
    };

    loadScripts();

    // Cleanup
    return () => {
      console.log('🧹 Limpando scripts...');
    };
  }, []);

  return (
    <>
      <section className="profileStatsSection container">
        <div className="statsGrid">
          <div className="statsCard glow-card">
            <div className="statsHeader">
              <FontAwesomeIcon icon={faChartLine} className="stats-icon" />
              <h3>Estatísticas Gerais</h3>
            </div>
            <div className="statsContent">
              <div className="statItem">
                <span className="statLabel">Filmes Avaliados</span>
                <span className="statValue" id="moviesRated">0</span>
              </div>
              <div className="statItem">
                <span className="statLabel">Séries Avaliadas</span>
                <span className="statValue" id="seriesRated">0</span>
              </div>
              <div className="statItem">
                <span className="statLabel">Nota Média</span>
                <span className="statValue" id="avgRating">0.0</span>
              </div>
              <div className="statItem">
                <span className="statLabel">Filme Favorito</span>
                <span className="statValue" id="favMovie">Interestelar</span>
              </div>
              <div className="statItem">
                <span className="statLabel">Série Favorita</span>
                <span className="statValue" id="favSeries">Breaking Bad</span>
              </div>
              <div className="statItem">
                <span className="statLabel">Dias Ativo</span>
                <span className="statValue" id="activeDays">0</span>
              </div>
            </div>
          </div>

          <div className="statsCard glow-card">
            <div className="statsHeader">
              <FontAwesomeIcon icon={faCalendarCheck} className="stats-icon" />
              <h3>Progresso Anual</h3>
            </div>
            <div className="yearProgress">
              <div className="progressBar">
                <div className="progressFill" style={{ width: "65%" }}></div>
              </div>
              <div className="progressStats">
                <div>
                  <span className="progressNumber">65%</span>
                  <span className="progressLabel">Meta Anual</span>
                </div>
                <div>
                  <span className="progressNumber">83/128</span>
                  <span className="progressLabel">Filmes</span>
                </div>
              </div>
            </div>
            <div className="milestones">
              <div className="milestone">
                <FontAwesomeIcon icon={faFilm} />
                <span>50 filmes</span>
                <FontAwesomeIcon icon={faCheck} className="completed" />
              </div>
              <div className="milestone">
                <FontAwesomeIcon icon={faTheaterMasks} />
                <span>5 gêneros</span>
                <FontAwesomeIcon icon={faCheck} className="completed" />
              </div>
              <div className="milestone">
                <FontAwesomeIcon icon={faStar} />
                <span>10 avaliações 5★</span>
                <FontAwesomeIcon icon={faSpinner} />
              </div>
            </div>
          </div>

          <div className="statsCard glow-card">
            <div className="statsHeader">
              <FontAwesomeIcon icon={faTags} className="stats-icon" />
              <h3>Gêneros Favoritos</h3>
            </div>
            <div className="chart-container">
              <canvas id="genreChart"></canvas>
            </div>
          </div>

          <div className="statsCard glow-card">
            <div className="statsHeader">
              <FontAwesomeIcon icon={faCalendarAlt} className="stats-icon" />
              <h3>Atividade Mensal</h3>
            </div>
            <div className="chart-container">
              <canvas id="activityChart"></canvas>
            </div>
          </div>

          <div className="statsCard glow-card">
            <div className="statsHeader">
              <FontAwesomeIcon icon={faStarHalfAlt} className="stats-icon" />
              <h3>Distribuição de Notas</h3>
            </div>
            <div className="chart-container">
              <canvas id="ratingDistributionChart"></canvas>
            </div>
          </div>

          <div className="statsCard glow-card">
            <div className="statsHeader">
              <FontAwesomeIcon icon={faTrophy} className="stats-icon" />
              <h3>Conquistas</h3>
            </div>
            <div className="badgesContainer">
              <div className="badge diamond" data-tooltip="Crítico Diamante - 50+ avaliações">
                <div className="badge-inner">
                  <FontAwesomeIcon icon={faGem} />
                  <span className="badge-level">50</span>
                </div>
              </div>
              <div className="badge gold" data-tooltip="Maratonista Ouro - 25+ filmes em um dia">
                <div className="badge-inner">
                  <FontAwesomeIcon icon={faRunning} />
                  <span className="badge-level">25</span>
                </div>
              </div>
              <div className="badge silver" data-tooltip="Diversificado Prata - 10+ gêneros">
                <div className="badge-inner">
                  <FontAwesomeIcon icon={faGlobeAmericas} />
                  <span className="badge-level">10</span>
                </div>
              </div>
              <div className="badge bronze" data-tooltip="Preciso Bronze - 5+ avaliações precisas">
                <div className="badge-inner">
                  <FontAwesomeIcon icon={faBullseye} />
                  <span className="badge-level">5</span>
                </div>
              </div>
            </div>
            <button className="seeAllBadges" id="showAllBadges">Ver Todas (12/20)</button>
          </div>
        </div>
      </section>

      {/* <div className="badges-modal" id="badgesModal">
        <div className="modal-overlay"></div>
        <div className="modal-content">
          <button className="close-modal">&times;</button>

          <div className="modal-header">
            <h2><FontAwesomeIcon icon={faTrophy} /> Todas as Medalhas</h2>
            <div className="progress-summary">
              <span>Progresso: <span id="progress-count">0</span>/<span id="total-medals">0</span></span>
              <div className="progress-bar">
                <div className="progress-fill" id="global-progress" style={{ width: "0%" }}></div>
              </div>
            </div>
          </div>

          <div className="modal-filters">
            <button className="filter-btn active" data-filter="all">Todas</button>
            <button className="filter-btn" data-filter="unlocked">Desbloqueadas</button>
            <button className="filter-btn" data-filter="locked">Bloqueadas</button>
            <div className="search-box">
              <input type="text" placeholder="Buscar medalhas..." id="medal-search" />
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>

          <div className="badges-container" id="badgesContainer">
          </div>
        </div>
      </div> */}
    </>
  );
}

export default PerfilEstatisticas;