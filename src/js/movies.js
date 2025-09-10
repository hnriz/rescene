// movies.js - Funcionalidades para o site Rescene
document.addEventListener('DOMContentLoaded', function() {
  // ===== VARIÁVEIS GLOBAIS =====
  let currentView = 'grid';
  let currentPage = 1;
  const moviesPerPage = 12;
  let allMovies = [];
  let filteredMovies = [];

  // ===== INICIALIZAÇÃO =====
  init();

  function init() {
      loadMovies();
      setupEventListeners();
      setupFilterTags();
      initializeViewOptions();
      setupSearchFunctionality();
      setupMockNotifications();
      setupMockUserData();
  }

  // ===== CARREGAMENTO DE FILMES =====
  function loadMovies() {
      // Simulação de carregamento de filmes de uma API
      console.log('Carregando filmes...');
      
      // Mock data - na implementação real, isso viria de uma API
      allMovies = [
          { id: 1, title: "Interestelar", year: 2014, duration: "2h 49m", genre: "Ficção Científica", rating: 4.5, views: "2.4M", likes: "98K", description: "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço na tentativa de garantir a sobrevivência da humanidade.", image: "../src/img/poster1.jpg", featured: true },
          { id: 2, title: "O Poderoso Chefão", year: 1972, duration: "2h 55m", genre: "Drama", rating: 4.8, views: "1.8M", likes: "87K", description: "A saga da família Corleone, uma das mais poderosas famílias da máfia italiana em Nova York.", image: "../src/img/poster1.jpg", trending: true },
          { id: 3, title: "O Senhor dos Anéis", year: 2001, duration: "2h 58m", genre: "Fantasia", rating: 4.7, views: "2.1M", likes: "92K", description: "Um humilde hobbit da Terra-média assume a tarefa de destruir o Um Anel para salvar a Terra-média das trevas.", image: "../src/img/poster1.jpg" },
          { id: 4, title: "Clube da Luta", year: 1999, duration: "2h 19m", genre: "Drama", rating: 4.3, views: "1.6M", likes: "78K", description: "Um homem insatisfeito forma um clube de luta clandestino como forma de terapia alternativa.", image: "../src/img/poster1.jpg" },
          { id: 5, title: "Pulp Fiction", year: 1994, duration: "2h 34m", genre: "Crime", rating: 4.6, views: "1.9M", likes: "85K", description: "As vidas de dois assassinos da máfia, um boxeador e um par de bandidos se entrelaçam em quatro histórias de violência.", image: "../src/img/poster1.jpg" },
          { id: 6, title: "Forrest Gump", year: 1994, duration: "2h 22m", genre: "Drama", rating: 4.4, views: "2.2M", likes: "95K", description: "A presença de Forrest Gump em importantes eventos históricos dos EUA, enquanto ele persegue seu amor de infância.", image: "../src/img/poster1.jpg" },
          { id: 7, title: "O Rei Leão", year: 1994, duration: "1h 28m", genre: "Animação", rating: 4.2, views: "2.0M", likes: "88K", description: "Um jovem leão príncipe luta para reclaimar seu trono depois que seu tio malvado assassina seu pai.", image: "../src/img/poster1.jpg" },
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
  }

  // ===== RENDERIZAÇÃO DE FILMES =====
  function renderMovies() {
      const moviesContainer = document.getElementById('movies-container');
      if (!moviesContainer) return;

      const startIndex = (currentPage - 1) * moviesPerPage;
      const endIndex = startIndex + moviesPerPage;
      const moviesToRender = filteredMovies.slice(startIndex, endIndex);

      if (moviesToRender.length === 0) {
          moviesContainer.innerHTML = `
              <div class="no-results">
                  <i class="fas fa-film"></i>
                  <h3>Nenhum filme encontrado</h3>
                  <p>Tente ajustar os filtros ou termos de busca</p>
                  <button class="cta-btn primary" id="reset-filters">Limpar Filtros</button>
              </div>
          `;
          
          document.getElementById('reset-filters')?.addEventListener('click', resetFilters);
          return;
      }

      moviesContainer.innerHTML = moviesToRender.map(movie => `
          <div class="movie-card" data-movie-id="${movie.id}">
              <div class="movie-poster">
                  <img src="${movie.image}" alt="${movie.title}" onerror="this.src='data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22280%22%20height%3D%22350%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20280%20350%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17adec85189%20text%20%7B%20fill%3A%23e5bf00%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A18pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17adec85189%22%3E%3Crect%20width%3D%22280%22%20height%3D%22350%22%20fill%3D%22%23252a33%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22130%22%20y%3D%22180%22%3E${encodeURIComponent(movie.title)}%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'">
                  <div class="movie-overlay">
                      <button class="play-btn" data-movie-id="${movie.id}">
                          <i class="fas fa-play"></i>
                      </button>
                      <div class="movie-actions">
                          <button class="action-btn" data-action="like" data-movie-id="${movie.id}">
                              <i class="far fa-heart"></i>
                          </button>
                          <button class="action-btn" data-action="watchlist" data-movie-id="${movie.id}">
                              <i class="far fa-bookmark"></i>
                          </button>
                          <button class="action-btn" data-action="watched" data-movie-id="${movie.id}">
                              <i class="far fa-eye"></i>
                          </button>
                      </div>
                  </div>
                  ${movie.trending ? `<div class="trending-badge">#${movie.id === 13 ? '1' : movie.id === 14 ? '2' : movie.id === 15 ? '3' : 'Em Alta'}</div>` : ''}
                  <div class="movie-rating-badge">${movie.rating}</div>
              </div>
              <div class="movie-info">
                  <h3 class="movie-title">${movie.title}</h3>
                  <div class="movie-meta">
                      <span>${movie.year}</span>
                      <span>${movie.duration}</span>
                      <span>${movie.genre}</span>
                  </div>
                  <p class="movie-description">${movie.description}</p>
                  <div class="movie-stats">
                      <span class="stat">
                          <i class="fas fa-eye"></i>
                          ${movie.views}
                      </span>
                      <span class="stat">
                          <i class="fas fa-heart"></i>
                          ${movie.likes}
                      </span>
                  </div>
              </div>
          </div>
      `).join('');

      // Atualizar contador de filmes
      updateMovieCount();
  }

  function updateMovieCount() {
      const catalogHeader = document.querySelector('.catalog-header h2');
      if (catalogHeader && filteredMovies.length > 0) {
          catalogHeader.textContent = `Catálogo de Filmes (${filteredMovies.length})`;
      }
  }

  // ===== CONFIGURAÇÃO DE EVENT LISTENERS =====
  function setupEventListeners() {
      // Botão de carregar mais filmes
      document.querySelector('.load-more-btn')?.addEventListener('click', loadMoreMovies);

      // Filtros de ordenação
      document.querySelectorAll('.filter-select').forEach(select => {
          select.addEventListener('change', applyFilters);
      });

      // Visualização (grade/lista)
      document.querySelectorAll('.view-btn').forEach(btn => {
          btn.addEventListener('click', function() {
              switchView(this.dataset.view);
          });
      });

      // Botões de ação do mascote
      document.querySelectorAll('.mascote-btn').forEach(btn => {
          btn.addEventListener('click', handleMascoteAction);
      });

      // Contador regressivo
      startCountdown();

      // Botão de newsletter
      document.querySelector('.newsletter-btn')?.addEventListener('click', handleNewsletterSignup);
  }

  function setupFilterTags() {
      const filterTags = document.querySelectorAll('.filter-tag');
      filterTags.forEach(tag => {
          tag.addEventListener('click', function() {
              // Remover active de todas as tags
              filterTags.forEach(t => t.classList.remove('active'));
              // Adicionar active à tag clicada
              this.classList.add('active');
              
              // Aplicar filtro de gênero
              const genre = this.textContent;
              if (genre === 'Todos') {
                  filteredMovies = [...allMovies];
              } else if (genre === 'Ver Todos') {
                  // Aqui poderia abrir um modal com todos os gêneros
                  showAllGenresModal();
              } else {
                  filteredMovies = allMovies.filter(movie => 
                      movie.genre.toLowerCase().includes(genre.toLowerCase())
                  );
              }
              
              currentPage = 1;
              renderMovies();
          });
      });
  }

  function showAllGenresModal() {
      // Implementação simplificada de modal de gêneros
      const genres = ["Ação", "Drama", "Comédia", "Ficção Científica", "Terror", "Romance", "Aventura", "Animação", "Fantasia", "Crime", "Suspense", "Documentário"];
      
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = `
          <div class="modal-content">
              <div class="modal-header">
                  <h3>Todos os Gêneros</h3>
                  <button class="close-modal"><i class="fas fa-times"></i></button>
              </div>
              <div class="modal-body">
                  <div class="genres-grid">
                      ${genres.map(genre => `
                          <button class="genre-tag" data-genre="${genre}">${genre}</button>
                      `).join('')}
                  </div>
              </div>
          </div>
      `;
      
      document.body.appendChild(modal);
      
      // Fechar modal
      modal.querySelector('.close-modal').addEventListener('click', () => {
          document.body.removeChild(modal);
      });
      
      // Clicar fora para fechar
      modal.addEventListener('click', (e) => {
          if (e.target === modal) {
              document.body.removeChild(modal);
          }
      });
      
      // Selecionar gênero
      modal.querySelectorAll('.genre-tag').forEach(tag => {
          tag.addEventListener('click', function() {
              const genre = this.dataset.genre;
              filteredMovies = allMovies.filter(movie => 
                  movie.genre.toLowerCase().includes(genre.toLowerCase())
              );
              currentPage = 1;
              renderMovies();
              document.body.removeChild(modal);
          });
      });
  }

  function initializeViewOptions() {
      // Verificar preferência salva ou usar padrão (grid)
      const savedView = localStorage.getItem('movieView') || 'grid';
      switchView(savedView);
      
      // Ativar o botão correto
      document.querySelectorAll('.view-btn').forEach(btn => {
          if (btn.dataset.view === savedView) {
              btn.classList.add('active');
          } else {
              btn.classList.remove('active');
          }
      });
  }

  // ===== FUNCIONALIDADES DE FILTRO E BUSCA =====
  function setupSearchFunctionality() {
      const searchInput = document.getElementById('movie-search');
      const searchBtn = document.querySelector('.search-btn');
      
      if (searchInput) {
          // Busca ao digitar (com debounce)
          let searchTimeout;
          searchInput.addEventListener('input', function() {
              clearTimeout(searchTimeout);
              searchTimeout = setTimeout(() => {
                  performSearch(this.value);
              }, 300);
          });
          
          // Busca ao clicar no botão
          searchBtn.addEventListener('click', () => {
              performSearch(searchInput.value);
          });
          
          // Busca ao pressionar Enter
          searchInput.addEventListener('keypress', (e) => {
              if (e.key === 'Enter') {
                  performSearch(searchInput.value);
              }
          });
      }
  }

  function performSearch(query) {
      if (!query.trim()) {
          filteredMovies = [...allMovies];
      } else {
          filteredMovies = allMovies.filter(movie => 
              movie.title.toLowerCase().includes(query.toLowerCase()) ||
              movie.genre.toLowerCase().includes(query.toLowerCase()) ||
              movie.description.toLowerCase().includes(query.toLowerCase())
          );
      }
      
      currentPage = 1;
      renderMovies();
  }

  function applyFilters() {
      const sortBy = document.querySelector('.filter-select').value;
      const yearFilter = document.querySelectorAll('.filter-select')[1].value;
      const ratingFilter = document.querySelectorAll('.filter-select')[2].value;
      
      let sortedMovies = [...filteredMovies];
      
      // Ordenação
      switch(sortBy) {
          case 'popularity':
              // Simulação de popularidade baseada em visualizações
              sortedMovies.sort((a, b) => {
                  const aViews = parseFloat(a.views);
                  const bViews = parseFloat(b.views);
                  return bViews - aViews;
              });
              break;
          case 'rating':
              sortedMovies.sort((a, b) => b.rating - a.rating);
              break;
          case 'newest':
              sortedMovies.sort((a, b) => b.year - a.year);
              break;
          case 'oldest':
              sortedMovies.sort((a, b) => a.year - b.year);
              break;
      }
      
      // Filtro por ano
      if (yearFilter) {
          if (yearFilter.includes('-')) {
              const [start, end] = yearFilter.split('-').map(Number);
              sortedMovies = sortedMovies.filter(movie => movie.year >= start && movie.year <= end);
          } else {
              sortedMovies = sortedMovies.filter(movie => movie.year == yearFilter);
          }
      }
      
      // Filtro por avaliação
      if (ratingFilter) {
          const minRating = parseInt(ratingFilter);
          sortedMovies = sortedMovies.filter(movie => movie.rating >= minRating);
      }
      
      filteredMovies = sortedMovies;
      currentPage = 1;
      renderMovies();
  }

  function resetFilters() {
      filteredMovies = [...allMovies];
      currentPage = 1;
      
      // Resetar selects
      document.querySelectorAll('.filter-select').forEach(select => {
          select.selectedIndex = 0;
      });
      
      // Resetar tags
      document.querySelectorAll('.filter-tag').forEach(tag => {
          tag.classList.remove('active');
      });
      
      // Ativar tag "Todos"
      document.querySelector('.filter-tag')?.classList.add('active');
      
      // Limpar busca
      const searchInput = document.getElementById('movie-search');
      if (searchInput) searchInput.value = '';
      
      renderMovies();
  }

  // ===== ALTERNÂNCIA DE VISUALIZAÇÃO =====
  function switchView(viewType) {
      const moviesContainer = document.getElementById('movies-container');
      if (!moviesContainer) return;
      
      currentView = viewType;
      localStorage.setItem('movieView', viewType);
      
      // Atualizar botões
      document.querySelectorAll('.view-btn').forEach(btn => {
          btn.classList.remove('active');
          if (btn.dataset.view === viewType) {
              btn.classList.add('active');
          }
      });
      
      // Aplicar classe de visualização
      if (viewType === 'list') {
          moviesContainer.classList.add('list-view');
      } else {
          moviesContainer.classList.remove('list-view');
      }
      
      // Renderizar filmes com a visualização selecionada
      renderMovies();
  }

  // ===== CARREGAR MAIS FILMES =====
  function loadMoreMovies() {
      const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
      
      if (currentPage < totalPages) {
          currentPage++;
          renderMovies();
          
          // Scroll suave para os novos filmes
          const newMovies = document.querySelectorAll('.movie-card');
          if (newMovies.length > 0) {
              const lastMovie = newMovies[newMovies.length - 1];
              lastMovie.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
      } else {
          // Todas as páginas foram carregadas
          const loadMoreBtn = document.querySelector('.load-more-btn');
          if (loadMoreBtn) {
              loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> Todos os filmes carregados';
              loadMoreBtn.disabled = true;
              
              setTimeout(() => {
                  loadMoreBtn.style.opacity = '0.5';
              }, 2000);
          }
      }
  }

  // ===== INTERAÇÕES COM FILMES =====
  function setupMovieInteractions() {
      // Botões de like, watchlist e assistido
      document.querySelectorAll('.action-btn').forEach(btn => {
          btn.addEventListener('click', function() {
              const movieId = this.dataset.movieId;
              const action = this.dataset.action;
              handleMovieAction(movieId, action, this);
          });
      });
      
      // Botão de play
      document.querySelectorAll('.play-btn').forEach(btn => {
          btn.addEventListener('click', function() {
              const movieId = this.dataset.movieId;
              playMovieTrailer(movieId);
          });
      });
      
      // Click no card do filme
      document.querySelectorAll('.movie-card').forEach(card => {
          card.addEventListener('click', function(e) {
              // Só redireciona se não foi clicado em um botão de ação
              if (!e.target.closest('.movie-actions') && !e.target.closest('.play-btn')) {
                  const movieId = this.dataset.movieId;
                  viewMovieDetails(movieId);
              }
          });
      });
  }

  function handleMovieAction(movieId, action, button) {
      const movie = allMovies.find(m => m.id == movieId);
      if (!movie) return;
      
      const icon = button.querySelector('i');
      
      // Alternar estado
      if (action === 'like') {
          if (icon.classList.contains('far')) {
              icon.classList.replace('far', 'fas');
              button.style.color = '#ff4757';
              movie.likes = (parseFloat(movie.likes) + 1).toFixed(1) + 'K';
              showToast(`"${movie.title}" adicionado aos favoritos!`);
          } else {
              icon.classList.replace('fas', 'far');
              button.style.color = '';
              movie.likes = (parseFloat(movie.likes) - 1).toFixed(1) + 'K';
              showToast(`"${movie.title}" removido dos favoritos!`);
          }
      } 
      else if (action === 'watchlist') {
          if (icon.classList.contains('far')) {
              icon.classList.replace('far', 'fas');
              button.style.color = '#fada5e';
              showToast(`"${movie.title}" adicionado à watchlist!`);
          } else {
              icon.classList.replace('fas', 'far');
              button.style.color = '';
              showToast(`"${movie.title}" removido da watchlist!`);
          }
      }
      else if (action === 'watched') {
          if (icon.classList.contains('far')) {
              icon.classList.replace('far', 'fas');
              button.style.color = '#2ecc71';
              movie.views = (parseFloat(movie.views) + 0.1).toFixed(1) + 'M';
              showToast(`"${movie.title}" marcado como assistido!`);
          } else {
              icon.classList.replace('fas', 'far');
              button.style.color = '';
              movie.views = (parseFloat(movie.views) - 0.1).toFixed(1) + 'M';
              showToast(`"${movie.title}" marcado como não assistido!`);
          }
      }
      
      // Atualizar estatísticas
      const stats = button.closest('.movie-card').querySelector('.movie-stats');
      if (stats) {
          stats.innerHTML = `
              <span class="stat">
                  <i class="fas fa-eye"></i>
                  ${movie.views}
              </span>
              <span class="stat">
                  <i class="fas fa-heart"></i>
                  ${movie.likes}
              </span>
          `;
      }
  }

  function playMovieTrailer(movieId) {
      const movie = allMovies.find(m => m.id == movieId);
      if (!movie) return;
      
      showToast(`Reproduzindo trailer de "${movie.title}"...`);
      
      // Em uma implementação real, isso abriria um modal com o trailer
      console.log(`Abrindo trailer para: ${movie.title}`);
  }

  function viewMovieDetails(movieId) {
      const movie = allMovies.find(m => m.id == movieId);
      if (!movie) return;
      
      // Em uma implementação real, isso redirecionaria para a página de detalhes
      console.log(`Visualizando detalhes de: ${movie.title}`);
      showToast(`Redirecionando para ${movie.title}...`);
      
      // Simulação de redirecionamento
      setTimeout(() => {
          // window.location.href = `movie-details.html?id=${movieId}`;
      }, 1000);
  }

  // ===== FUNCIONALIDADES DO MASCOTE =====
  function handleMascoteAction(e) {
      e.preventDefault();
      const button = e.currentTarget;
      
      if (button.classList.contains('primary')) {
          showToast("Gerando recomendações personalizadas...");
          // Simular tempo de processamento
          setTimeout(() => {
              // Filtrar filmes com alta avaliação para simular recomendações
              filteredMovies = allMovies.filter(movie => movie.rating >= 4.5);
              currentPage = 1;
              renderMovies();
              showToast("Recomendações personalizadas prontas!");
          }, 1500);
      } else {
          showToast("Explicando como funciona o sistema...");
          // Aqui poderia abrir um modal ou tutorial
      }
  }

  // ===== CONTADOR REGRESSIVO =====
  function startCountdown() {
      const countdownElement = document.querySelector('.countdown');
      if (!countdownElement) return;
      
      // Definir data de término (2 dias a partir de agora)
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 2);
      endDate.setHours(14, 32, 0, 0); // 14:32
      
      function updateCountdown() {
          const now = new Date();
          const difference = endDate - now;
          
          if (difference <= 0) {
              countdownElement.innerHTML = "Oferta expirada!";
              return;
          }
          
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          
          const daysElement = countdownElement.querySelector('.countdown-item:nth-child(1)');
          const hoursElement = countdownElement.querySelector('.countdown-item:nth-child(3)');
          const minutesElement = countdownElement.querySelector('.countdown-item:nth-child(5)');
          
          if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
          if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
          if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
      }
      
      // Atualizar a cada minuto
      updateCountdown();
      setInterval(updateCountdown, 60000);
  }

  // ===== NEWSLETTER =====
  function handleNewsletterSignup(e) {
      e.preventDefault();
      const emailInput = document.querySelector('.newsletter-input');
      const email = emailInput.value.trim();
      
      if (!email) {
          showToast("Por favor, insira um email válido.", "error");
          emailInput.focus();
          return;
      }
      
      if (!isValidEmail(email)) {
          showToast("Por favor, insira um email válido.", "error");
          emailInput.focus();
          return;
      }
      
      // Simular cadastro
      showToast("Inscrevendo na newsletter...");
      
      setTimeout(() => {
          showToast("Inscrição realizada com sucesso! Obrigado.", "success");
          emailInput.value = "";
      }, 1500);
  }

  function isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
  }

  // ===== NOTIFICAÇÕES E FEEDBACK =====
  function setupMockNotifications() {
      // Simular notificações não lidas
      const notificationCount = document.querySelector('.notification-count');
      if (notificationCount) {
          // Manter apenas as 3 notificações iniciais como não lidas
          notificationCount.textContent = '3';
      }
  }

  function setupMockUserData() {
      // Simular dados do usuário
      const usernameElements = document.querySelectorAll('.username, .user-details h3');
      const userEmailElements = document.querySelectorAll('.user-email');
      
      usernameElements.forEach(el => {
          el.textContent = 'Cinéfilo';
      });
      
      userEmailElements.forEach(el => {
          el.textContent = 'cinefilo@rescene.com';
      });
  }

  function showToast(message, type = "default") {
      // Remover toasts existentes
      const existingToasts = document.querySelectorAll('.toast');
      existingToasts.forEach(toast => toast.remove());
      
      // Criar novo toast
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.innerHTML = `
          <div class="toast-content">
              <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
              <span>${message}</span>
          </div>
      `;
      
      document.body.appendChild(toast);
      
      // Mostrar toast
      setTimeout(() => {
          toast.classList.add('show');
      }, 10);
      
      // Remover toast após 3 segundos
      setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => {
              if (toast.parentNode) {
                  toast.parentNode.removeChild(toast);
              }
          }, 300);
      }, 3000);
  }

  // ===== UTILITÁRIOS =====
  function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
          const later = () => {
              clearTimeout(timeout);
              func(...args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
      };
  }

  // ===== HANDLERS DE ERRO =====
  window.addEventListener('error', function(e) {
      console.error('Erro capturado:', e.error);
      showToast("Ocorreu um erro inesperado. Por favor, recarregue a página.", "error");
  });

  // Expor funções globais se necessário
  window.moviesApp = {
      loadMoreMovies,
      switchView,
      performSearch,
      resetFilters
  };
});