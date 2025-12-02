// ✅ IIFE - Função que executa automaticamente e expõe window.initSeries
(function () {
  'use strict';

  // ✅ Função principal que será exposta globalmente
  window.initSeries = function () {
    console.log('📺 Inicializando Series Page...');

    // ===== VARIÁVEIS GLOBAIS =====
    let currentView = 'grid';
    let currentPage = 1;
    const seriesPerPage = 12;
    let allSeries = [];
    let filteredSeries = [];

    // ===== VERIFICAÇÃO DE ELEMENTOS =====
    const seriesContainer = document.getElementById('movies-container'); // Mantém o ID do HTML
    const searchInput = document.getElementById('movie-search'); // Mantém o ID do HTML
    const filterSelects = document.querySelectorAll('.filter-select');
    const viewButtons = document.querySelectorAll('.view-btn');
    const loadMoreBtn = document.querySelector('.load-more-btn');

    if (!seriesContainer) {
      console.error('❌ Container de séries não encontrado!');
      return;
    }

    console.log('✅ Elementos encontrados, iniciando carregamento...');

    // ===== INICIALIZAÇÃO =====
    loadSeries();
    setupEventListeners();
    setupFilterTags();
    // initializeViewOptions();
    setupSearchFunctionality();
    setupMockNotifications();

    // ===== CARREGAMENTO DE SÉRIES =====
    function loadSeries() {
      console.log('📺 Carregando catálogo de séries...');

      allSeries = [
        { id: 1, title: "Breaking Bad", year: 2008, seasons: 5, episodes: 62, genre: "Drama", rating: 4.9, views: "5.2M", likes: "156K", description: "Um professor de química com câncer se torna um fabricante de metanfetamina para garantir o futuro de sua família.", image: "../src/img/poster1.jpg", featured: true, status: "Finalizada" },
        { id: 2, title: "Game of Thrones", year: 2011, seasons: 8, episodes: 73, genre: "Fantasia", rating: 4.6, views: "8.1M", likes: "198K", description: "Nove famílias nobres lutam pelo controle das terras míticas de Westeros, enquanto um antigo inimigo retorna.", image: "../src/img/poster1.jpg", trending: true, status: "Finalizada" },
        { id: 3, title: "Stranger Things", year: 2016, seasons: 4, episodes: 42, genre: "Ficção Científica", rating: 4.7, views: "6.8M", likes: "187K", description: "Quando um garoto desaparece, sua mãe, o xerife e seus amigos enfrentam forças sobrenaturais extraordinárias.", image: "../src/img/poster1.jpg", trending: true, status: "Em Produção" },
        { id: 4, title: "The Office", year: 2005, seasons: 9, episodes: 201, genre: "Comédia", rating: 4.5, views: "4.3M", likes: "142K", description: "Um olhar mockumentário sobre o cotidiano de funcionários de escritório em uma empresa de papel.", image: "../src/img/poster1.jpg", status: "Finalizada" },
        { id: 5, title: "The Crown", year: 2016, seasons: 6, episodes: 60, genre: "Drama", rating: 4.4, views: "3.9M", likes: "128K", description: "A história política e pessoal da Rainha Elizabeth II e dos eventos que moldaram a segunda metade do século 20.", image: "../src/img/poster1.jpg", status: "Finalizada" },
        { id: 6, title: "Dark", year: 2017, seasons: 3, episodes: 26, genre: "Suspense", rating: 4.8, views: "3.2M", likes: "119K", description: "Uma família fraturada enfrenta mistérios que envolvem viagem no tempo em uma cidade alemã.", image: "../src/img/poster1.jpg", status: "Finalizada" },
        { id: 7, title: "The Mandalorian", year: 2019, seasons: 3, episodes: 24, genre: "Ficção Científica", rating: 4.6, views: "5.7M", likes: "165K", description: "As aventuras de um caçador de recompensas solitário nos confins da galáxia, longe da autoridade da Nova República.", image: "../src/img/poster1.jpg", trending: true, status: "Em Produção" },
        { id: 8, title: "The Last of Us", year: 2023, seasons: 1, episodes: 9, genre: "Drama", rating: 4.8, views: "4.8M", likes: "152K", description: "20 anos após a civilização moderna ser destruída, Joel deve contrabandear Ellie para fora de uma zona de quarentena opressiva.", image: "../src/img/poster1.jpg", trending: true, status: "Em Produção" },
        { id: 9, title: "Friends", year: 1994, seasons: 10, episodes: 236, genre: "Comédia", rating: 4.3, views: "7.2M", likes: "195K", description: "Seis amigos navegam pelas armadilhas da vida e do amor em Manhattan.", image: "../src/img/poster1.jpg", status: "Finalizada" },
        { id: 10, title: "The Witcher", year: 2019, seasons: 3, episodes: 24, genre: "Fantasia", rating: 4.2, views: "5.1M", likes: "148K", description: "Geralt de Rívia, um caçador de monstros solitário, luta para encontrar seu lugar em um mundo onde as pessoas são mais perversas que as bestas.", image: "../src/img/poster1.jpg", status: "Em Produção" },
        { id: 11, title: "Black Mirror", year: 2011, seasons: 6, episodes: 27, genre: "Ficção Científica", rating: 4.5, views: "4.6M", likes: "139K", description: "Uma antologia que explora uma reviravolta de alta tecnologia e de ficção científica em nossas vidas modernas.", image: "../src/img/poster1.jpg", status: "Em Produção" },
        { id: 12, title: "The Boys", year: 2019, seasons: 4, episodes: 32, genre: "Ação", rating: 4.6, views: "5.4M", likes: "161K", description: "Um grupo de vigilantes decide enfrentar super-heróis corruptos que abusam de seus poderes.", image: "../src/img/poster1.jpg", trending: true, status: "Em Produção" },
        { id: 13, title: "House of the Dragon", year: 2022, seasons: 2, episodes: 18, genre: "Fantasia", rating: 4.7, views: "6.3M", likes: "174K", description: "Baseada no livro 'Fogo & Sangue', conta a história da Casa Targaryen 200 anos antes dos eventos de Game of Thrones.", image: "../src/img/poster1.jpg", trending: true, status: "Em Produção" },
        { id: 14, title: "Wednesday", year: 2022, seasons: 1, episodes: 8, genre: "Comédia", rating: 4.4, views: "5.9M", likes: "168K", description: "Wednesday Addams investiga uma onda de assassinatos enquanto faz novos amigos (e inimigos) na Academia Nevermore.", image: "../src/img/poster1.jpg", trending: true, status: "Em Produção" },
        { id: 15, title: "The Bear", year: 2022, seasons: 2, episodes: 18, genre: "Drama", rating: 4.8, views: "3.7M", likes: "126K", description: "Um jovem chef de alta gastronomia retorna a Chicago para administrar o restaurante sanduíche de sua família.", image: "../src/img/poster1.jpg", trending: true, status: "Em Produção" },
        { id: 16, title: "Succession", year: 2018, seasons: 4, episodes: 39, genre: "Drama", rating: 4.9, views: "4.1M", likes: "134K", description: "A família Roy controla um dos maiores conglomerados de mídia do mundo, mas sua lealdade é testada quando o patriarca adoece.", image: "../src/img/poster1.jpg", status: "Finalizada" }
      ];

      filteredSeries = [...allSeries];
      renderSeries();
      // setupSeriesInteractions();
      console.log('✅ ' + allSeries.length + ' séries carregadas!');
    }

    // ===== RENDERIZAÇÃO DE SÉRIES =====
    function renderSeries() {
      const startIndex = (currentPage - 1) * seriesPerPage;
      const endIndex = startIndex + seriesPerPage;
      const seriesToRender = filteredSeries.slice(startIndex, endIndex);

      if (seriesToRender.length === 0) {
        seriesContainer.innerHTML = '<div class="no-results"><svg class="svg-inline--fa fa-tv" style="width: 48px; height: 48px;" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M64 64V352H576V64H64zM0 64C0 28.7 28.7 0 64 0H576c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM128 448H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path></svg><h3>Nenhuma série encontrada</h3><p>Tente ajustar os filtros ou termos de busca</p><button class="cta-btn primary" id="reset-filters">Limpar Filtros</button></div>';

        const resetBtn = document.getElementById('reset-filters');
        if (resetBtn) {
          resetBtn.addEventListener('click', resetFilters);
        }
        return;
      }

      seriesContainer.innerHTML = seriesToRender.map(function (series) {
        return '<div class="movie-card" data-series-id="' + series.id + '"><div class="movie-poster"><img src="' + series.image + '" alt="' + series.title + '" onerror="this.src=\'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22280%22%20height%3D%22350%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20280%20350%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17adec85189%20text%20%7B%20fill%3A%23e5bf00%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A18pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17adec85189%22%3E%3Crect%20width%3D%22280%22%20height%3D%22350%22%20fill%3D%22%23252a33%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22130%22%20y%3D%22180%22%3E' + encodeURIComponent(series.title) + '%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E\'"><div class="movie-overlay"><button class="play-btn" data-series-id="' + series.id + '"><svg class="svg-inline--fa fa-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path></svg></button><div class="movie-actions"><button class="action-btn" data-action="like" data-series-id="' + series.id + '"><svg class="svg-inline--fa fa-heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"></path></svg></button><button class="action-btn" data-action="watchlist" data-series-id="' + series.id + '"><svg class="svg-inline--fa fa-bookmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path></svg></button><button class="action-btn" data-action="watched" data-series-id="' + series.id + '"><svg class="svg-inline--fa fa-eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"></path></svg></button></div></div>' + (series.trending ? '<div class="trending-badge">#' + (series.id === 13 ? '1' : series.id === 8 ? '2' : series.id === 3 ? '3' : 'Em Alta') + '</div>' : '') + '<div class="movie-rating-badge">' + series.rating + '</div></div><div class="movie-info"><h3 class="movie-title">' + series.title + '</h3><div class="movie-meta"><span>' + series.year + '</span><span>' + series.seasons + ' temp.</span><span>' + series.genre + '</span></div><p class="movie-description">' + series.description + '</p><div class="movie-stats"><span class="stat"><svg class="svg-inline--fa fa-eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>' + series.views + '</span><span class="stat"><svg class="svg-inline--fa fa-heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path></svg>' + series.likes + '</span></div></div></div>';
      }).join('');

      updateSeriesCount();
      // setupSeriesInteractions();
    }

    function updateSeriesCount() {
      const catalogHeader = document.querySelector('.catalog-header h2');
      if (catalogHeader && filteredSeries.length > 0) {
        catalogHeader.textContent = 'Catálogo de Séries (' + filteredSeries.length + ')';
      }
    }

    // ===== CONFIGURAÇÃO DE EVENT LISTENERS =====
    function setupEventListeners() {
      console.log('🎯 Configurando event listeners...');

      // if (loadMoreBtn) {
      //   loadMoreBtn.addEventListener('click', loadMoreSeries);
      // }

      filterSelects.forEach(function (select) {
        select.addEventListener('change', applyFilters);
      });

      viewButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          switchView(this.dataset.view);
        });
      });

      // document.querySelectorAll('.mascote-btn').forEach(function (btn) {
      //   btn.addEventListener('click', handleMascoteAction);
      // });

      console.log('✅ Event listeners configurados!');
    }

    function setupFilterTags() {
      const filterTags = document.querySelectorAll('.filter-tag');
      filterTags.forEach(function (tag) {
        tag.addEventListener('click', function () {
          filterTags.forEach(function (t) {
            t.classList.remove('active');
          });
          this.classList.add('active');

          const genre = this.textContent;
          if (genre === 'Todos') {
            filteredSeries = [...allSeries];
          } else if (genre === 'Ver Todos') {
            showAllGenresModal();
            return;
          } else {
            filteredSeries = allSeries.filter(function (series) {
              return series.genre.toLowerCase().includes(genre.toLowerCase());
            });
          }

          currentPage = 1;
          renderSeries();
        });
      });
    }

    function showAllGenresModal() {
      const genres = ["Ação", "Drama", "Comédia", "Ficção Científica", "Terror", "Romance", "Aventura", "Animação", "Fantasia", "Crime", "Suspense", "Documentário"];

      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = '<div class="modal-content"><div class="modal-header"><h3>Todos os Gêneros</h3><button class="close-modal"><svg class="svg-inline--fa fa-times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg></button></div><div class="modal-body"><div class="genres-grid">' + genres.map(function (genre) {
        return '<button class="genre-tag" data-genre="' + genre + '">' + genre + '</button>';
      }).join('') + '</div></div></div>';

      document.body.appendChild(modal);

      modal.querySelector('.close-modal').addEventListener('click', function () {
        document.body.removeChild(modal);
      });

      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });

      modal.querySelectorAll('.genre-tag').forEach(function (tag) {
        tag.addEventListener('click', function () {
          const genre = this.dataset.genre;
          filteredSeries = allSeries.filter(function (series) {
            return series.genre.toLowerCase().includes(genre.toLowerCase());
          });
          currentPage = 1;
          renderSeries();
          document.body.removeChild(modal);
        });
      });
    }

    function setupMockNotifications() {
      const notificationCount = document.querySelector('.notification-count');
      if (notificationCount) {
        notificationCount.textContent = '3';
      }
    }


    // function initializeViewOptions() {
    //   const savedView = localStorage.getItem('seriesView') || 'grid';
    //   switchView(savedView);

    //   viewButtons.forEach(function (btn) {
    //     if (btn.dataset.view === savedView) {
    //       btn.classList.add('active');
    //     } else {
    //       btn.classList.remove('active');
    //     }
    //   });
    // }

    // ===== FUNCIONALIDADES DE FILTRO E BUSCA =====
    function setupSearchFunctionality() {
      if (!searchInput) return;

      const searchBtn = document.querySelector('.search-btn');

      let searchTimeout;
      searchInput.addEventListener('input', function () {
        clearTimeout(searchTimeout);
        const value = this.value;
        searchTimeout = setTimeout(function () {
          performSearch(value);
        }, 300);
      });

      if (searchBtn) {
        searchBtn.addEventListener('click', function () {
          performSearch(searchInput.value);
        });
      }

      searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          performSearch(searchInput.value);
        }
      });
    }

    function performSearch(query) {
      if (!query.trim()) {
        filteredSeries = [...allSeries];
      } else {
        filteredSeries = allSeries.filter(function (series) {
          return series.title.toLowerCase().includes(query.toLowerCase()) ||
            series.genre.toLowerCase().includes(query.toLowerCase()) ||
            series.description.toLowerCase().includes(query.toLowerCase());
        });
      }

      currentPage = 1;
      renderSeries();
      console.log('🔍 Busca: "' + query + '" - ' + filteredSeries.length + ' resultados');
    }

    function applyFilters() {
      const sortBy = filterSelects[0] ? filterSelects[0].value : '';
      const yearFilter = filterSelects[1] ? filterSelects[1].value : '';
      const ratingFilter = filterSelects[2] ? filterSelects[2].value : '';

      let sortedSeries = [...filteredSeries];

      switch (sortBy) {
        case 'popularity':
          sortedSeries.sort(function (a, b) {
            const aViews = parseFloat(a.views);
            const bViews = parseFloat(b.views);
            return bViews - aViews;
          });
          break;
        case 'rating':
          sortedSeries.sort(function (a, b) {
            return b.rating - a.rating;
          });
          break;
        case 'newest':
          sortedSeries.sort(function (a, b) {
            return b.year - a.year;
          });
          break;
        case 'oldest':
          sortedSeries.sort(function (a, b) {
            return a.year - b.year;
          });
          break;
      }

      if (yearFilter) {
        if (yearFilter.includes('-')) {
          const parts = yearFilter.split('-');
          const start = Number(parts[0]);
          const end = Number(parts[1]);
          sortedSeries = sortedSeries.filter(function (series) {
            return series.year >= start && series.year <= end;
          });
        } else {
          sortedSeries = sortedSeries.filter(function (series) {
            return series.year == yearFilter;
          });
        }
      }
    }
  }
})();