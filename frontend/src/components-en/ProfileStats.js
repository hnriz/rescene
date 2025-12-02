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

function ProfileStats() {
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
              <h3>General Stats</h3>
            </div>
            <div className="statsContent">
              <div className="statItem">
                <span className="statLabel">Reviewed Movies</span>
                <span className="statValue" id="moviesRated">0</span>
              </div>
              <div className="statItem">
                <span className="statLabel">Reviewed TV Shows</span>
                <span className="statValue" id="seriesRated">0</span>
              </div>
              <div className="statItem">
                <span className="statLabel">Average Rating</span>
                <span className="statValue" id="avgRating">0.0</span>
              </div>
              <div className="statItem">
                <span className="statLabel">Favorite Movie</span>
                <span className="statValue" id="favMovie">Interestelar</span>
              </div>
              <div className="statItem">
                <span className="statLabel">Favorite TV Show</span>
                <span className="statValue" id="favSeries">Breaking Bad</span>
              </div>
              <div className="statItem">
                <span className="statLabel">Active Days</span>
                <span className="statValue" id="activeDays">0</span>
              </div>
            </div>
          </div>

          <div className="statsCard glow-card">
            <div className="statsHeader">
              <FontAwesomeIcon icon={faCalendarCheck} className="stats-icon" />
              <h3>Year Progress</h3>
            </div>
            <div className="yearProgress">
              <div className="progressBar">
                <div className="progressFill" style={{ width: "65%" }}></div>
              </div>
              <div className="progressStats">
                <div>
                  <span className="progressNumber">65%</span>
                  <span className="progressLabel">Year Goal</span>
                </div>
                <div>
                  <span className="progressNumber">83/128</span>
                  <span className="progressLabel">Movies</span>
                </div>
              </div>
            </div>
            <div className="milestones">
              <div className="milestone">
                <FontAwesomeIcon icon={faFilm} />
                <span>50 movies</span>
                <FontAwesomeIcon icon={faCheck} className="completed" />
              </div>
              <div className="milestone">
                <FontAwesomeIcon icon={faTheaterMasks} />
                <span>5 genres</span>
                <FontAwesomeIcon icon={faCheck} className="completed" />
              </div>
              <div className="milestone">
                <FontAwesomeIcon icon={faStar} />
                <span>10 reviews 5★</span>
                <FontAwesomeIcon icon={faSpinner} />
              </div>
            </div>
          </div>

          <div className="statsCard glow-card">
            <div className="statsHeader">
              <FontAwesomeIcon icon={faTags} className="stats-icon" />
              <h3>Favorite Genres</h3>
            </div>
            <div className="chart-container">
              <canvas id="genreChart"></canvas>
            </div>
          </div>

          <div className="statsCard glow-card">
            <div className="statsHeader">
              <FontAwesomeIcon icon={faCalendarAlt} className="stats-icon" />
              <h3>Month Activity</h3>
            </div>
            <div className="chart-container">
              <canvas id="activityChart"></canvas>
            </div>
          </div>

          <div className="statsCard glow-card">
            <div className="statsHeader">
              <FontAwesomeIcon icon={faStarHalfAlt} className="stats-icon" />
              <h3>Rating Distribution</h3>
            </div>
            <div className="chart-container">
              <canvas id="ratingDistributionChart"></canvas>
            </div>
          </div>

          {/* <div className="statsCard glow-card">
            {/* <div className="statsHeader">
              <FontAwesomeIcon icon={faTrophy} className="stats-icon" />
              <h3>Achievements</h3>
            </div> 
             <div className="badgesContainer">
              <div className="badge diamond" data-tooltip="Diamond Reviewer - 50+ Reviews">
                <div className="badge-inner">
                  <FontAwesomeIcon icon={faGem} />
                  <span className="badge-level">50</span>
                </div>
              </div>
              <div className="badge gold" data-tooltip="Gold Marathon Runner - 25+ Movies in a day">
                <div className="badge-inner">
                  <FontAwesomeIcon icon={faRunning} />
                  <span className="badge-level">25</span>
                </div>
              </div>
              <div className="badge silver" data-tooltip="Silver Diversified - 10+ genres">
                <div className="badge-inner">
                  <FontAwesomeIcon icon={faGlobeAmericas} />
                  <span className="badge-level">10</span>
                </div>
              </div>
              <div className="badge bronze" data-tooltip="Accurate Bronze - 5+ accurate reviews">
                <div className="badge-inner">
                  <FontAwesomeIcon icon={faBullseye} />
                  <span className="badge-level">5</span>
                </div>
              </div>
            </div> 
            <button className="seeAllBadges" id="showAllBadges">See All (12/20)</button>
          </div> */}
        </div>
      </section>

      {/* <div className="badges-modal" id="badgesModal">
        <div className="modal-overlay"></div>
        <div className="modal-content">
          <button className="close-modal">&times;</button>

          <div className="modal-header">
            <h2><FontAwesomeIcon icon={faTrophy} /> All Mdals</h2>
            <div className="progress-summary">
              <span>Progresso: <span id="progress-count">0</span>/<span id="total-medals">0</span></span>
              <div className="progress-bar">
                <div className="progress-fill" id="global-progress" style={{ width: "0%" }}></div>
              </div>
            </div>
          </div>

          <div className="modal-filters">
            <button className="filter-btn active" data-filter="all">All</button>
            <button className="filter-btn" data-filter="unlocked">Unlocked</button>
            <button className="filter-btn" data-filter="locked">Locked</button>
            <div className="search-box">
              <input type="text" placeholder="Find medals..." id="medal-search" />
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

export default ProfileStats;