// ✅ IIFE - Função que executa automaticamente e expõe window.initMovies
(function() {
  'use strict';

  // ✅ Função principal que será exposta globalmente
  window.initMovies = function() {
    console.log('🎬 Inicializando Movies Page...');

    // ===== VARIÁVEIS GLOBAIS =====
    let currentView = 'grid';
    let currentPage = 1;
    const moviesPerPage = 12;
    let allMovies = [];
    let filteredMovies = [];

    // ===== VERIFICAÇÃO DE ELEMENTOS =====
    const moviesContainer = document.getElementById('movies-container');
    const searchInput = document.getElementById('movie-search');
    const filterSelects = document.querySelectorAll('.filter-select');
    const viewButtons = document.querySelectorAll('.view-btn');
    const loadMoreBtn = document.querySelector('.load-more-btn');

    if (!moviesContainer) {
      console.error('❌ Container de filmes não encontrado!');
      return;
    }

    console.log('✅ Elementos encontrados, iniciando carregamento...');

    // ===== INICIALIZAÇÃO =====
    loadMovies();
    setupEventListeners();
    setupFilterTags();
    initializeViewOptions();
    setupSearchFunctionality();
    setupMockNotifications();

    // ===== CARREGAMENTO DE FILMES =====
    function loadMovies() {
      console.log('📽️ Carregando catálogo de filmes...');
      
      allMovies = [
        { id: 1, title: "Interestelar", year: 2014, duration: "2h 49m", genre: "Ficção Científica", rating: 4.5, views: "2.4M", likes: "98K", description: "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço na tentativa de garantir a sobrevivência da humanidade.", image: "../src/img/poster1.jpg", featured: true },
        { id: 2, title: "O Poderoso Chefão", year: 1972, duration: "2h 55m", genre: "Drama", rating: 4.8, views: "1.8M", likes: "87K", description: "A saga da família Corleone, uma das mais poderosas famílias da máfia italiana em Nova York.", image: "../src/img/poster1.jpg", trending: true },
        { id: 3, title: "O Senhor dos Anéis", year: 2001, duration: "2h 58m", genre: "Fantasia", rating: 4.7, views: "2.1M", likes: "92K", description: "Um humilde hobbit da Terra-média assume a tarefa de destruir o Um Anel para salvar a Terra-média das trevas.", image: "../src/img/poster1.jpg" },
        { id: 4, title: "Clube da Luta", year: 1999, duration: "2h 19m", genre: "Drama", rating: 4.3, views: "1.6M", likes: "78K", description: "Um homem insatisfeito forma um clube de luta clandestino como forma de terapia alternativa.", image: "../src/img/poster1.jpg" },
        { id: 5, title: "Pulp Fiction", year: 1994, duration: "2h 34m", genre: "Crime", rating: 4.6, views: "1.9M", likes: "85K", description: "As vidas de dois assassinos da máfia, um boxeador e um par de bandidos se entrelaçam em quatro histórias de violência.", image: "../src/img/poster1.jpg" },
        { id: 6, title: "Forrest Gump", year: 1994, duration: "2h 22m", genre: "Drama", rating: 4.4, views: "2.2M", likes: "95K", description: "A presença de Forrest Gump em importantes eventos históricos dos EUA, enquanto ele persegue seu amor de infância.", image: "../src/img/poster1.jpg" },
        { id: 7, title: "O Rei Leão", year: 1994, duration: "1h 28m", genre: "Animação", rating: 4.2, views: "2.0M", likes: "88K", description: "Um jovem leão príncipe luta para reclamar seu trono depois que seu tio malvado assassina seu pai.", image: "../src/img/poster1.jpg" },
        { id: 8, title: "Matrix", year: 1999, duration: "2h 16m", genre: "Ficção Científica", rating: 4.3, views: "1.7M", likes: "82K", description: "Um hacker descobre a verdade sobre sua realidade e sua função na guerra contra os controladores.", image: "../src/img/poster1.jpg" },
        { id: 9, title: "Gladiador", year: 2000, duration: "2h 35m", genre: "Ação", rating: 4.5, views: "1.5M", likes: "76K", description: "Um general romano traído busca vingança contra o corrupto imperador que matou sua família.", image: "../src/img/poster1.jpg" },
        { id: 10, title: "Titanic", year: 1997, duration: "3h 14m", genre: "Romance", rating: 4.1, views: "2.3M", likes: "96K", description: "Um romance épico entre um artista pobre e uma jovem rica a bordo do fatídico RMS Titanic.", image: "../src/img/poster1.jpg" },
        { id: 11, title: "Jurassic Park", year: 1993, duration: "2h 7m", genre: "Aventura", rating: 4.0, views: "1.8M", likes: "84K", description: "Um parque temático com dinossauros clonados se torna uma luta pela sobrevivência quando os animais escapam.", image: "../src/img/poster1.jpg" },
        { id: 12, title: "Avatar", year: 2009, duration: "2h 42m", genre: "Ficção Científica", rating: 4.2, views: "2.5M", likes: "99K", description: "Um marine paraplégico é enviado à lua Pandora em uma missão única, tornando-se dividido entre dois mundos.", image: "../src/img/poster1.jpg", trending: true },
        { id: 13, title: "Duna: Parte Dois", year: 2024, duration: "2h 46m", genre: "Ficção Científica", rating: 4.8, views: "1.2M", likes: "86K", description: "A jornada de Paul Atreides continua enquanto ele se une a Chani e aos Fremen em uma guerra de vingança.", image: "../src/img/poster1.jpg", trending: true },
        { id: 14, title: "Devil", year: 2024, duration: "2h 12m", genre: "Terror", rating: 4.6, views: "980K", likes: "74K", description: "Um thriller sobrenatural que explora possessões demoníacas em uma pequena cidade.", image: "../src/img/poster1.jpg", trending: true },
        { id: 15, title: "Furiosa", year: 2024, duration: "2h 28m", genre: "Ação", rating: 4.7, views: "890K", likes: "68K", description: "A história de origem da Imperatriz Furiosa, antes de encontrar Max Rockatansky.", image: "../src/img/poster1.jpg", trending: true },
        { id: 16, title: "Challengers", year: 2024, duration: "2h 11m", genre: "Drama", rating: 4.3, views: "760K", likes: "59K", description: "Um triângulo amoroso entre três tenistas que se conhecem desde jovens.", image: "../src/img/poster1.jpg", trending: true }
      ];

      filteredMovies = [...allMovies];
      renderMovies();
      setupMovieInteractions();
      console.log('✅ ' + allMovies.length + ' filmes carregados!');
    }

    // ===== RENDERIZAÇÃO DE FILMES =====
    function renderMovies() {
      const startIndex = (currentPage - 1) * moviesPerPage;
      const endIndex = startIndex + moviesPerPage;
      const moviesToRender = filteredMovies.slice(startIndex, endIndex);

      if (moviesToRender.length === 0) {
        moviesContainer.innerHTML = '<div class="no-results"><svg class="svg-inline--fa fa-film" style="width: 48px; height: 48px;" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z"></path></svg><h3>Nenhum filme encontrado</h3><p>Tente ajustar os filtros ou termos de busca</p><button class="cta-btn primary" id="reset-filters">Limpar Filtros</button></div>';
        
        const resetBtn = document.getElementById('reset-filters');
        if (resetBtn) {
          resetBtn.addEventListener('click', resetFilters);
        }
        return;
      }

      moviesContainer.innerHTML = moviesToRender.map(function(movie) {
        return '<div class="movie-card" data-movie-id="' + movie.id + '"><div class="movie-poster"><img src="' + movie.image + '" alt="' + movie.title + '" onerror="this.src=\'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22280%22%20height%3D%22350%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20280%20350%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17adec85189%20text%20%7B%20fill%3A%23e5bf00%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A18pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17adec85189%22%3E%3Crect%20width%3D%22280%22%20height%3D%22350%22%20fill%3D%22%23252a33%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22130%22%20y%3D%22180%22%3E' + encodeURIComponent(movie.title) + '%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E\'"><div class="movie-overlay"><button class="play-btn" data-movie-id="' + movie.id + '"><svg class="svg-inline--fa fa-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path></svg></button><div class="movie-actions"><button class="action-btn" data-action="like" data-movie-id="' + movie.id + '"><svg class="svg-inline--fa fa-heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"></path></svg></button><button class="action-btn" data-action="watchlist" data-movie-id="' + movie.id + '"><svg class="svg-inline--fa fa-bookmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path></svg></button><button class="action-btn" data-action="watched" data-movie-id="' + movie.id + '"><svg class="svg-inline--fa fa-eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"></path></svg></button></div></div>' + (movie.trending ? '<div class="trending-badge">#' + (movie.id === 13 ? '1' : movie.id === 14 ? '2' : movie.id === 15 ? '3' : 'Em Alta') + '</div>' : '') + '<div class="movie-rating-badge">' + movie.rating + '</div></div><div class="movie-info"><h3 class="movie-title">' + movie.title + '</h3><div class="movie-meta"><span>' + movie.year + '</span><span>' + movie.duration + '</span><span>' + movie.genre + '</span></div><p class="movie-description">' + movie.description + '</p><div class="movie-stats"><span class="stat"><svg class="svg-inline--fa fa-eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>' + movie.views + '</span><span class="stat"><svg class="svg-inline--fa fa-heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path></svg>' + movie.likes + '</span></div></div></div>';
      }).join('');

      updateMovieCount();
      setupMovieInteractions();
    }

    function updateMovieCount() {
      const catalogHeader = document.querySelector('.catalog-header h2');
      if (catalogHeader && filteredMovies.length > 0) {
        catalogHeader.textContent = 'Catálogo de Filmes (' + filteredMovies.length + ')';
      }
    }

    // ===== CONFIGURAÇÃO DE EVENT LISTENERS =====
    function setupEventListeners() {
      console.log('🎯 Configurando event listeners...');

      if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreMovies);
      }

      filterSelects.forEach(function(select) {
        select.addEventListener('change', applyFilters);
      });

      viewButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
          switchView(this.dataset.view);
        });
      });

      document.querySelectorAll('.mascote-btn').forEach(function(btn) {
        btn.addEventListener('click', handleMascoteAction);
      });

      const newsletterBtn = document.querySelector('.newsletter-btn');
      if (newsletterBtn) {
        newsletterBtn.addEventListener('click', handleNewsletterSignup);
      }

      console.log('✅ Event listeners configurados!');
    }

    function setupFilterTags() {
      const filterTags = document.querySelectorAll('.filter-tag');
      filterTags.forEach(function(tag) {
        tag.addEventListener('click', function() {
          filterTags.forEach(function(t) {
            t.classList.remove('active');
          });
          this.classList.add('active');
          
          const genre = this.textContent;
          if (genre === 'Todos') {
            filteredMovies = [...allMovies];
          } else if (genre === 'Ver Todos') {
            showAllGenresModal();
            return;
          } else {
            filteredMovies = allMovies.filter(function(movie) {
              return movie.genre.toLowerCase().includes(genre.toLowerCase());
            });
          }
          
          currentPage = 1;
          renderMovies();
        });
      });
    }

    function showAllGenresModal() {
      const genres = ["Ação", "Drama", "Comédia", "Ficção Científica", "Terror", "Romance", "Aventura", "Animação", "Fantasia", "Crime", "Suspense", "Documentário"];
      
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = '<div class="modal-content"><div class="modal-header"><h3>Todos os Gêneros</h3><button class="close-modal"><svg class="svg-inline--fa fa-times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg></button></div><div class="modal-body"><div class="genres-grid">' + genres.map(function(genre) {
        return '<button class="genre-tag" data-genre="' + genre + '">' + genre + '</button>';
      }).join('') + '</div></div></div>';
      
      document.body.appendChild(modal);
      
      modal.querySelector('.close-modal').addEventListener('click', function() {
        document.body.removeChild(modal);
      });
      
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });
      
      modal.querySelectorAll('.genre-tag').forEach(function(tag) {
        tag.addEventListener('click', function() {
          const genre = this.dataset.genre;
          filteredMovies = allMovies.filter(function(movie) {
            return movie.genre.toLowerCase().includes(genre.toLowerCase());
          });
          currentPage = 1;
          renderMovies();
          document.body.removeChild(modal);
        });
      });
    }

    function initializeViewOptions() {
      const savedView = localStorage.getItem('movieView') || 'grid';
      switchView(savedView);
      
      viewButtons.forEach(function(btn) {
        if (btn.dataset.view === savedView) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    // ===== FUNCIONALIDADES DE FILTRO E BUSCA =====
    function setupSearchFunctionality() {
      if (!searchInput) return;

      const searchBtn = document.querySelector('.search-btn');
      
      let searchTimeout;
      searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const value = this.value;
        searchTimeout = setTimeout(function() {
          performSearch(value);
        }, 300);
      });
      
      if (searchBtn) {
        searchBtn.addEventListener('click', function() {
          performSearch(searchInput.value);
        });
      }
      
      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          performSearch(searchInput.value);
        }
      });
    }

    function performSearch(query) {
      if (!query.trim()) {
        filteredMovies = [...allMovies];
      } else {
        filteredMovies = allMovies.filter(function(movie) {
          return movie.title.toLowerCase().includes(query.toLowerCase()) ||
                 movie.genre.toLowerCase().includes(query.toLowerCase()) ||
                 movie.description.toLowerCase().includes(query.toLowerCase());
        });
      }
      
      currentPage = 1;
      renderMovies();
      console.log('🔍 Busca: "' + query + '" - ' + filteredMovies.length + ' resultados');
    }

    function applyFilters() {
      const sortBy = filterSelects[0] ? filterSelects[0].value : '';
      const yearFilter = filterSelects[1] ? filterSelects[1].value : '';
      const ratingFilter = filterSelects[2] ? filterSelects[2].value : '';
      
      let sortedMovies = [...filteredMovies];
      
      switch(sortBy) {
        case 'popularity':
          sortedMovies.sort(function(a, b) {
            const aViews = parseFloat(a.views);
            const bViews = parseFloat(b.views);
            return bViews - aViews;
          });
          break;
        case 'rating':
          sortedMovies.sort(function(a, b) {
            return b.rating - a.rating;
          });
          break;
        case 'newest':
          sortedMovies.sort(function(a, b) {
            return b.year - a.year;
          });
          break;
        case 'oldest':
          sortedMovies.sort(function(a, b) {
            return a.year - b.year;
          });
          break;
      }
      
      if (yearFilter) {
        if (yearFilter.includes('-')) {
          const parts = yearFilter.split('-');
          const start = Number(parts[0]);
          const end = Number(parts[1]);
          sortedMovies = sortedMovies.filter(function(movie) {
            return movie.year >= start && movie.year <= end;
          });
        } else {
          sortedMovies = sortedMovies.filter(function(movie) {
            return movie.year == yearFilter;
          });
        }
      }
      
      if (ratingFilter) {
        const minRating = parseInt(ratingFilter);
        sortedMovies = sortedMovies.filter(function(movie) {
          return movie.rating >= minRating;
        });
      }
      
      filteredMovies = sortedMovies;
      currentPage = 1;
      renderMovies();
    }

    function resetFilters() {
      filteredMovies = [...allMovies];
      currentPage = 1;
      
      filterSelects.forEach(function(select) {
        select.selectedIndex = 0;
      });
      
      document.querySelectorAll('.filter-tag').forEach(function(tag) {
        tag.classList.remove('active');
      });
      
      const firstTag = document.querySelector('.filter-tag');
      if (firstTag) {
        firstTag.classList.add('active');
      }
      
      if (searchInput) searchInput.value = '';
      
      renderMovies();
      showToast('Filtros limpos!', 'success');
    }

    // ===== ALTERNÂNCIA DE VISUALIZAÇÃO =====
    function switchView(viewType) {
      if (!moviesContainer) return;
      
      currentView = viewType;
      localStorage.setItem('movieView', viewType);
      
      viewButtons.forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.dataset.view === viewType) {
          btn.classList.add('active');
        }
      });
      
      if (viewType === 'list') {
        moviesContainer.classList.add('list-view');
      } else {
        moviesContainer.classList.remove('list-view');
      }
      
      renderMovies();
    }

    // ===== CARREGAR MAIS FILMES =====
    function loadMoreMovies() {
      const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
      
      if (currentPage < totalPages) {
        currentPage++;
        renderMovies();
        
        const newMovies = document.querySelectorAll('.movie-card');
        if (newMovies.length > 0) {
          const lastMovie = newMovies[newMovies.length - 1];
          lastMovie.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        if (loadMoreBtn) {
          loadMoreBtn.innerHTML = '<svg class="svg-inline--fa fa-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg> Todos os filmes carregados';
          loadMoreBtn.disabled = true;
          
          setTimeout(function() {
            loadMoreBtn.style.opacity = '0.5';
          }, 2000);
        }
      }
    }

    // ===== INTERAÇÕES COM FILMES =====
    function setupMovieInteractions() {
      document.querySelectorAll('.action-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          const movieId = this.dataset.movieId;
          const action = this.dataset.action;
          handleMovieAction(movieId, action, this);
        });
      });
      
      // document.querySelectorAll('.play-btn').forEach(function(btn) {
      //   btn.addEventListener('click', function(e) {
      //     e.stopPropagation();
      //     const movieId = this.dataset.movieId;
      //     playMovieTrailer(movieId);
      //   });
      // });
      
      // document.querySelectorAll('.movie-card').forEach(function(card) {
      //   card.addEventListener('click', function(e) {
      //     if (!e.target.closest('.movie-actions') && !e.target.closest('.play-btn')) {
      //       const movieId = this.dataset.movieId;
      //       viewMovieDetails(movieId);
      //     }
      //   });
      // });
    }

    function handleMovieAction(movieId, action, button) {
      const movie = allMovies.find(function(m) {
        return m.id == movieId;
      });
      if (!movie) return;
      
      const svg = button.querySelector('svg');
      
      if (action === 'like') {
        if (svg.innerHTML.includes('M225.8')) {
          svg.innerHTML = '<path fill="currentColor" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>';
          button.style.color = '#ff4757';
          movie.likes = (parseFloat(movie.likes) + 1).toFixed(1) + 'K';
          showToast('"' + movie.title + '" adicionado aos favoritos!');
        } else {
          svg.innerHTML = '<path fill="currentColor" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"></path>';
          button.style.color = '';
          movie.likes = (parseFloat(movie.likes) - 1).toFixed(1) + 'K';
          showToast('"' + movie.title + '" removido dos favoritos!');
        }
      } 
      else if (action === 'watchlist') {
        if (svg.innerHTML.includes('M0 48C0')) {
          svg.innerHTML = '<path fill="currentColor" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>';
          button.style.color = '#fada5e';
          showToast('"' + movie.title + '" adicionado à watchlist!');
        } else {
          svg.innerHTML = '<path fill="currentColor" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path>';
          button.style.color = '';
          showToast('"' + movie.title + '" removido da watchlist!');
        }
      }
      else if (action === 'watched') {
        if (svg.innerHTML.includes('M288 80c')) {
          svg.innerHTML = '<path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>';
          button.style.color = '#2ecc71';
          movie.views = (parseFloat(movie.views) + 0.1).toFixed(1) + 'M';
          showToast('"' + movie.title + '" marcado como assistido!');
        } else {
          svg.innerHTML = '<path fill="currentColor" d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"></path>';
          button.style.color = '';
          movie.views = (parseFloat(movie.views) - 0.1).toFixed(1) + 'M';
          showToast('"' + movie.title + '" marcado como não assistido!');
        }
      }
      
      const stats = button.closest('.movie-card').querySelector('.movie-stats');
      if (stats) {
        stats.innerHTML = '<span class="stat"><svg class="svg-inline--fa fa-eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>' + movie.views + '</span><span class="stat"><svg class="svg-inline--fa fa-heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path></svg>' + movie.likes + '</span>';
      }
    }

    // function playMovieTrailer(movieId) {
    //   const movie = allMovies.find(function(m) {
    //     return m.id == movieId;
    //   });
    //   if (!movie) return;
      
    //   showToast('Reproduzindo trailer de "' + movie.title + '"...');
    //   console.log('▶️ Abrindo trailer: ' + movie.title);
    // }

    function viewMovieDetails(movieId) {
      const movie = allMovies.find(function(m) {
        return m.id == movieId;
      });
      if (!movie) return;
      
      console.log('📖 Visualizando detalhes: ' + movie.title);
      showToast('Redirecionando para ' + movie.title + '...');
    }

    // ===== FUNCIONALIDADES DO MASCOTE =====
    function handleMascoteAction(e) {
      e.preventDefault();
      const button = e.currentTarget;
      
      if (button.classList.contains('primary')) {
        showToast("Gerando recomendações personalizadas...");
        setTimeout(function() {
          filteredMovies = allMovies.filter(function(movie) {
            return movie.rating >= 4.5;
          });
          currentPage = 1;
          renderMovies();
          showToast("Recomendações personalizadas prontas!");
        }, 1500);
      } else {
        showToast("Explicando como funciona o sistema...");
      }
    }

    // ===== NEWSLETTER =====
    // function handleNewsletterSignup(e) {
    //   e.preventDefault();
    //   const emailInput = document.querySelector('.newsletter-input');
    //   if (!emailInput) return;

    //   const email = emailInput.value.trim();
      
    //   if (!email) {
    //     showToast("Por favor, insira um email válido.", "error");
    //     emailInput.focus();
    //     return;
    //   }
      
    //   if (!isValidEmail(email)) {
    //     showToast("Por favor, insira um email válido.", "error");
    //     emailInput.focus();
    //     return;
    //   }
      
    //   showToast("Inscrevendo na newsletter...");
      
    //   setTimeout(function() {
    //     showToast("Inscrição realizada com sucesso! Obrigado.", "success");
    //     emailInput.value = "";
    //   }, 1500);
    // }

    // function isValidEmail(email) {
    //   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   return re.test(email);
    // }

    // ===== NOTIFICAÇÕES E FEEDBACK =====
    function setupMockNotifications() {
      const notificationCount = document.querySelector('.notification-count');
      if (notificationCount) {
        notificationCount.textContent = '3';
      }
    }

    function showToast(message, type) {
      if (typeof type === 'undefined') type = 'default';
      
      const existingToasts = document.querySelectorAll('.toast');
      existingToasts.forEach(function(toast) {
        toast.remove();
      });
      
      const iconMap = {
        success: '<svg class="svg-inline--fa fa-check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg>',
        error: '<svg class="svg-inline--fa fa-exclamation-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"></path></svg>',
        default: '<svg class="svg-inline--fa fa-info-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg>'
      };
      
      const toast = document.createElement('div');
      toast.className = 'toast toast-' + type;
      toast.innerHTML = '<div class="toast-content">' + (iconMap[type] || iconMap.default) + '<span>' + message + '</span></div>';
      
      document.body.appendChild(toast);
      
      setTimeout(function() {
        toast.classList.add('show');
      }, 10);
      
      setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 300);
      }, 3000);
    }

    // ===== HANDLERS DE ERRO =====
    window.addEventListener('error', function(e) {
      console.error('❌ Erro capturado:', e.error);
      showToast("Ocorreu um erro inesperado. Por favor, recarregue a página.", "error");
    });

    // Expor funções globais
    window.moviesApp = {
      loadMoreMovies: loadMoreMovies,
      switchView: switchView,
      performSearch: performSearch,
      resetFilters: resetFilters
    };

    console.log('✅ Movies Page inicializada com sucesso!');
  };

  // ✅ Garantir que a função está disponível globalmente
  if (typeof window !== 'undefined') {
    window.initMovies = window.initMovies || window.initMovies;
    console.log('🌐 window.initMovies definida:', typeof window.initMovies);
  }

})();

// ✅ Executar automaticamente se o DOM já estiver pronto
if (typeof document !== 'undefined') {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('📄 DOM já pronto, executando initMovies...');
    setTimeout(function() {
      if (typeof window.initMovies === 'function') {
        window.initMovies();
      }
    }, 100);
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      console.log('📄 DOMContentLoaded disparado');
      if (typeof window.initMovies === 'function') {
        window.initMovies();
      }
    });
  }
}