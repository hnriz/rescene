// main-page.js - Funcionalidades para a página principal do Rescene
document.addEventListener('DOMContentLoaded', function() {
  // ===== VARIÁVEIS GLOBAIS =====
  let currentUser = null;
  let popularMovies = [];
  let newReleases = [];
  let currentCarouselPage = 0;
  const CAROUSEL_ITEMS_PER_PAGE = 4;

  // ===== INICIALIZAÇÃO =====
  init();

  function init() {
      loadMockData();
      setupEventListeners();
      initializeCarousels();
      setupMascoteInteractions();
      setupMockUserData();
      startAnimations();
  }

  // ===== CARREGAMENTO DE DADOS =====
  function loadMockData() {
      // Dados simulados - em produção viriam de uma API
      popularMovies = [
          { id: 1, title: "Interestelar", year: 2014, genre: "Ficção Científica", rating: 4.5, image: "src/img/poster1.jpg" },
          { id: 2, title: "Pulp Fiction", year: 1994, genre: "Crime", rating: 4.6, image: "src/img/poster2.jfif" },
          { id: 3, title: "O Senhor dos Anéis", year: 2001, genre: "Fantasia", rating: 4.7, image: "src/img/poster3.jpg" },
          { id: 4, title: "Clube da Luta", year: 1999, genre: "Drama", rating: 4.3, image: "src/img/poster4.jfif" },
          { id: 5, title: "Forrest Gump", year: 1994, genre: "Drama", rating: 4.4, image: "src/img/poster5.jpg" },
          { id: 6, title: "Matrix", year: 1999, genre: "Ficção Científica", rating: 4.3, image: "src/img/poster6.jpg" },
          { id: 7, title: "O Poderoso Chefão", year: 1972, genre: "Drama", rating: 4.8, image: "src/img/poster7.jfif" },
          { id: 8, title: "Gladiador", year: 2000, genre: "Ação", rating: 4.5, image: "src/img/poster8.jfif" }
      ];

      newReleases = [
          { id: 13, title: "Duna: Parte Dois", year: 2024, genre: "Ficção Científica", rating: 4.8, image: "src/img/poster9.png", badge: "Novo" },
          { id: 14, title: "Devil", year: 2024, genre: "Terror", rating: 4.6, image: "src/img/poster10.webp", badge: "Novo" },
          { id: 15, title: "Furiosa", year: 2024, genre: "Ação", rating: 4.7, image: "src/img/poster11.jpg", badge: "Novo" },
          { id: 16, title: "Challengers", year: 2024, genre: "Drama", image: "src/img/poster12.jpg", badge: "Em Breve" }
      ];

      // Renderizar os dados
      renderPopularCarousel();
      renderNewReleases();
  }

  // ===== CONFIGURAÇÃO DE EVENT LISTENERS =====
  function setupEventListeners() {
      // Navegação do carrossel
      document.getElementById('carousel-prev')?.addEventListener('click', () => navigateCarousel('prev'));
      document.getElementById('carousel-next')?.addEventListener('click', () => navigateCarousel('next'));

      // Botões de ação do mascote
      document.getElementById('personalized-recommendations')?.addEventListener('click', showPersonalizedRecommendations);

      // Botões de like e comentário nas reviews
      document.querySelectorAll('.like-btn, .comment-btn').forEach(btn => {
          btn.addEventListener('click', handleReviewInteraction);
      });

      // Botões de ação nos filmes
      document.querySelectorAll('.play-btn, .action-btn').forEach(btn => {
          btn.addEventListener('click', handleMovieAction);
      });

      // Botão de wishlist
      document.querySelectorAll('.wishlist-btn').forEach(btn => {
          btn.addEventListener('click', handleWishlistAction);
      });

      // Botão de assinatura premium
      document.querySelector('.premium-btn')?.addEventListener('click', handlePremiumSignup);

      // Newsletter
      document.querySelector('.newsletter-form')?.addEventListener('submit', handleNewsletterSignup);
  }

  // ===== INICIALIZAÇÃO DE CARROSSÉIS =====
  function initializeCarousels() {
      // Inicializar dots do carrossel
      setupCarouselDots();
      
      // Configurar arrasto para carrosséis em dispositivos móveis
      setupTouchCarousel();
  }

  function setupCarouselDots() {
      const carousel = document.getElementById('popular-carousel');
      if (!carousel) return;
      
      const dotsContainer = document.querySelector('.carousel-dots');
      if (!dotsContainer) return;
      
      const itemCount = carousel.children.length;
      const pageCount = Math.ceil(itemCount / CAROUSEL_ITEMS_PER_PAGE);
      
      dotsContainer.innerHTML = '';
      
      for (let i = 0; i < pageCount; i++) {
          const dot = document.createElement('div');
          dot.className = 'carousel-dot';
          if (i === 0) dot.classList.add('active');
          dot.addEventListener('click', () => goToCarouselPage(i));
          dotsContainer.appendChild(dot);
      }
  }

  function setupTouchCarousel() {
      const carousels = document.querySelectorAll('.carousel');
      
      carousels.forEach(carousel => {
          let startX, scrollLeft, isDown = false;
          
          carousel.addEventListener('mousedown', (e) => {
              isDown = true;
              startX = e.pageX - carousel.offsetLeft;
              scrollLeft = carousel.scrollLeft;
          });
          
          carousel.addEventListener('mouseleave', () => {
              isDown = false;
          });
          
          carousel.addEventListener('mouseup', () => {
              isDown = false;
          });
          
          carousel.addEventListener('mousemove', (e) => {
              if (!isDown) return;
              e.preventDefault();
              const x = e.pageX - carousel.offsetLeft;
              const walk = (x - startX) * 2;
              carousel.scrollLeft = scrollLeft - walk;
          });
          
          // Suporte para dispositivos touch
          carousel.addEventListener('touchstart', (e) => {
              startX = e.touches[0].pageX - carousel.offsetLeft;
              scrollLeft = carousel.scrollLeft;
          }, { passive: true });
          
          carousel.addEventListener('touchmove', (e) => {
              if (!startX) return;
              const x = e.touches[0].pageX - carousel.offsetLeft;
              const walk = (x - startX) * 2;
              carousel.scrollLeft = scrollLeft - walk;
          }, { passive: true });
      });
  }

  // ===== RENDERIZAÇÃO DE CONTEÚDO =====
  function renderPopularCarousel() {
      const carousel = document.getElementById('popular-carousel');
      if (!carousel) return;
      
      carousel.innerHTML = popularMovies.map(movie => `
          <div class="carousel-item">
              <div class="movie-card" data-movie-id="${movie.id}">
                  <div class="movie-poster">
                      <img src="${movie.image}" alt="${movie.title}" onerror="this.src='data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22280%22%20height%3D%22350%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20280%20350%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17adec85189%20text%20%7B%20fill%3A%23e5bf00%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A18pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17adec85189%22%3E%3Crect%20width%3D%22280%22%20height%3D%22350%22%20fill%3D%22%23252a33%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22130%22%20y%3D%22180%22%3E${encodeURIComponent(movie.title)}%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'">
                      <div class="movie-overlay">
                          <button class="play-btn" data-movie-id="${movie.id}">
                              <i class="fas fa-play"></i>
                          </button>
                      </div>
                      <div class="movie-rating-badge">${movie.rating}</div>
                  </div>
                  <div class="movie-info">
                      <h3 class="movie-title">${movie.title}</h3>
                      <div class="movie-meta">
                          <span>${movie.year}</span>
                          <span>${movie.genre}</span>
                      </div>
                  </div>
              </div>
          </div>
      `).join('');
  }

  function renderNewReleases() {
      const releasesGrid = document.querySelector('.releases-grid');
      if (!releasesGrid) return;
      
      releasesGrid.innerHTML = newReleases.map(movie => `
          <div class="release-card" data-movie-id="${movie.id}">
              <div class="release-poster">
                  <img src="${movie.image}" alt="${movie.title}" onerror="this.src='data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22280%22%20height%3D%22350%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20280%20350%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17adec85189%20text%20%7B%20fill%3A%23e5bf00%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A18pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17adec85189%22%3E%3Crect%20width%3D%22280%22%20height%3D%22350%22%20fill%3D%22%23252a33%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22130%22%20y%3D%22180%22%3E${encodeURIComponent(movie.title)}%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'">
                  ${movie.badge ? `<div class="release-badge">${movie.badge}</div>` : ''}
                  <div class="release-overlay">
                      <button class="play-btn" data-movie-id="${movie.id}">
                          <i class="fas fa-play"></i>
                      </button>
                      <div class="release-actions">
                          <button class="action-btn" data-action="like" data-movie-id="${movie.id}">
                              <i class="far fa-heart"></i>
                          </button>
                          <button class="action-btn" data-action="watchlist" data-movie-id="${movie.id}">
                              <i class="far fa-bookmark"></i>
                          </button>
                      </div>
                  </div>
              </div>
              <div class="release-info">
                  <h3>${movie.title}</h3>
                  <div class="release-meta">
                      <span>${movie.year}</span>
                      <span>${movie.genre}</span>
                  </div>
                  ${movie.rating ? `
                  <div class="release-rating">
                      <div class="stars">
                          ${renderStars(movie.rating)}
                      </div>
                      <span>${movie.rating}/5</span>
                  </div>
                  ` : `
                  <div class="release-cta">
                      <button class="wishlist-btn" data-movie-id="${movie.id}">
                          <i class="far fa-bell"></i>
                          Avise-me
                      </button>
                  </div>
                  `}
              </div>
          </div>
      `).join('');
  }

  function renderStars(rating) {
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;
      let starsHTML = '';
      
      for (let i = 0; i < fullStars; i++) {
          starsHTML += '<i class="fas fa-star"></i>';
      }
      
      if (hasHalfStar) {
          starsHTML += '<i class="fas fa-star-half-alt"></i>';
      }
      
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
      for (let i = 0; i < emptyStars; i++) {
          starsHTML += '<i class="far fa-star"></i>';
      }
      
      return starsHTML;
  }

  // ===== NAVEGAÇÃO DO CARROSSEL =====
  function navigateCarousel(direction) {
      const carousel = document.getElementById('popular-carousel');
      if (!carousel) return;
      
      const itemCount = carousel.children.length;
      const pageCount = Math.ceil(itemCount / CAROUSEL_ITEMS_PER_PAGE);
      
      if (direction === 'next') {
          currentCarouselPage = (currentCarouselPage + 1) % pageCount;
      } else {
          currentCarouselPage = (currentCarouselPage - 1 + pageCount) % pageCount;
      }
      
      goToCarouselPage(currentCarouselPage);
  }

  function goToCarouselPage(page) {
      const carousel = document.getElementById('popular-carousel');
      if (!carousel) return;
      
      const itemWidth = carousel.children[0].offsetWidth + 20; // width + gap
      carousel.scrollTo({
          left: page * CAROUSEL_ITEMS_PER_PAGE * itemWidth,
          behavior: 'smooth'
      });
      
      currentCarouselPage = page;
      updateCarouselDots(page);
  }

  function updateCarouselDots(activePage) {
      const dots = document.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
          if (index === activePage) {
              dot.classList.add('active');
          } else {
              dot.classList.remove('active');
          }
      });
  }

  // ===== INTERAÇÕES DO MASCOTE =====
  function setupMascoteInteractions() {
      const starMascot = document.querySelector('.star-mascot');
      const speechBubble = document.querySelector('.speech-bubble');
      const eyes = document.querySelectorAll('.pupil');
      const messages = [
          "Ei! Pronto para descobrir seu próximo filme favorito? 🎬",
          "Baseado no que você assistiu, tenho ótimas recomendações! 🌟",
          "Sua próxima obsessão cinematográfica está a um clique! 🍿",
          "Lights, camera, action! Vamos começar? 🎥"
      ];
      
      let currentMessage = 0;
      
      // Movimento dos olhos seguindo o cursor
      document.addEventListener('mousemove', (e) => {
          const mouseX = e.clientX;
          const mouseY = e.clientY;
          
          eyes.forEach(eye => {
              const eyeRect = eye.getBoundingClientRect();
              const eyeCenterX = eyeRect.left + eyeRect.width / 2;
              const eyeCenterY = eyeRect.top + eyeRect.height / 2;
              
              const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
              const distance = Math.min(5, Math.sqrt(Math.pow(mouseX - eyeCenterX, 2) + Math.pow(mouseY - eyeCenterY, 2)) / 20);
              
              const moveX = Math.cos(angle) * distance;
              const moveY = Math.sin(angle) * distance;
              
              eye.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
          });
      });
      
      // Alternar mensagens a cada 8 segundos
      setInterval(() => {
          currentMessage = (currentMessage + 1) % messages.length;
          speechBubble.querySelector('p').textContent = messages[currentMessage];
          speechBubble.style.animation = 'none';
          setTimeout(() => {
              speechBubble.style.animation = 'fadeIn 0.8s ease-out, wiggle 7s ease-in-out infinite';
          }, 10);
      }, 8000);
      
      // Efeito de interação ao passar o mouse
      starMascot.addEventListener('mouseenter', () => {
          starMascot.style.animation = 'pulse 1s ease-in-out';
          speechBubble.querySelector('p').textContent = "Olá! Pronto para uma maratona? 🎉";
      });
      
      starMascot.addEventListener('mouseleave', () => {
          starMascot.style.animation = 'float 6s ease-in-out infinite';
      });
      
      // Efeito de clique nos botões
      document.querySelectorAll('.mascote-btn').forEach(btn => {
          btn.addEventListener('click', function() {
              this.style.transform = 'scale(0.95)';
              setTimeout(() => {
                  this.style.transform = '';
              }, 200);
          });
      });
  }

  function showPersonalizedRecommendations() {
      showToast("Analisando suas preferências...");
      
      // Simular tempo de processamento
      setTimeout(() => {
          // Filtrar filmes com alta avaliação para simular recomendações
          const recommendedMovies = popularMovies.filter(movie => movie.rating >= 4.5);
          
          // Em uma implementação real, isso redirecionaria para uma página de recomendações
          showToast("Recomendações personalizadas prontas! Redirecionando...");
          
          setTimeout(() => {
              // window.location.href = `recommendations.html?type=personalized`;
          }, 1500);
      }, 2000);
  }

  // ===== MANIPULAÇÃO DE AÇÕES =====
  function handleReviewInteraction(e) {
      e.stopPropagation();
      const button = e.currentTarget;
      const isLikeButton = button.classList.contains('like-btn');
      const countElement = button.querySelector('span');
      
      if (countElement) {
          let count = parseInt(countElement.textContent);
          
          if (isLikeButton) {
              const icon = button.querySelector('i');
              
              if (icon.classList.contains('far')) {
                  icon.classList.replace('far', 'fas');
                  button.style.color = '#ff4757';
                  countElement.textContent = count + 1;
                  showToast("Review curtida!");
              } else {
                  icon.classList.replace('fas', 'far');
                  button.style.color = '';
                  countElement.textContent = count - 1;
                  showToast("Like removido!");
              }
          }
      }
  }

  function handleMovieAction(e) {
      e.stopPropagation();
      const button = e.currentTarget;
      const movieId = button.dataset.movieId;
      const movie = [...popularMovies, ...newReleases].find(m => m.id == movieId);
      
      if (!movie) return;
      
      if (button.classList.contains('play-btn')) {
          playMovieTrailer(movie);
          window.location.href="./info.html"
      } else if (button.classList.contains('action-btn')) {
          const action = button.dataset.action;
          handleMovieInteraction(movie, action, button);
      }
  }

  function handleMovieInteraction(movie, action, button) {
      const icon = button.querySelector('i');
      
      switch(action) {
          case 'like':
              if (icon.classList.contains('far')) {
                  icon.classList.replace('far', 'fas');
                  button.style.color = '#ff4757';
                  showToast(`"${movie.title}" adicionado aos favoritos!`);
              } else {
                  icon.classList.replace('fas', 'far');
                  button.style.color = '';
                  showToast(`"${movie.title}" removido dos favoritos!`);
              }
              break;
              
          case 'watchlist':
              if (icon.classList.contains('far')) {
                  icon.classList.replace('far', 'fas');
                  button.style.color = '#fada5e';
                  showToast(`"${movie.title}" adicionado à watchlist!`);
              } else {
                  icon.classList.replace('fas', 'far');
                  button.style.color = '';
                  showToast(`"${movie.title}" removido da watchlist!`);
              }
              break;
      }
  }

  function handleWishlistAction(e) {
      e.stopPropagation();
      const button = e.currentTarget;
      const movieId = button.dataset.movieId;
      const movie = newReleases.find(m => m.id == movieId);
      
      if (!movie) return;
      
      const icon = button.querySelector('i');
      
      if (icon.classList.contains('far')) {
          icon.classList.replace('far', 'fas');
          button.innerHTML = '<i class="fas fa-bell"></i> Na lista de desejos';
          showToast(`Você será notificado sobre "${movie.title}"!`);
      } else {
          icon.classList.replace('fas', 'far');
          button.innerHTML = '<i class="far fa-bell"></i> Avise-me';
          showToast(`Notificação removida para "${movie.title}"!`);
      }
  }

  function playMovieTrailer(movie) {
      showToast(`Reproduzindo trailer de "${movie.title}"...`);
      
      // Em uma implementação real, isso abriria um modal com o trailer
      console.log(`Abrindo trailer para: ${movie.title}`);
  }

  function handlePremiumSignup() {
      showToast("Redirecionando para assinatura Premium...");
      
      // Simular redirecionamento
      setTimeout(() => {
          // window.location.href = `premium.html`;
      }, 1000);
  }

  function handleNewsletterSignup(e) {
      e.preventDefault();
      const form = e.target;
      const emailInput = form.querySelector('input[type="email"]');
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

  // ===== CONFIGURAÇÃO DE DADOS DO USUÁRIO =====
  function setupMockUserData() {
      // Simular dados do usuário
      currentUser = {
          name: "Cinéfilo",
          username: "@cinefilo",
          email: "cinefilo@rescene.com",
          avatar: "src/img/icon.jpg"
      };
      
      // Atualizar elementos da interface
      const usernameElements = document.querySelectorAll('.username');
      const userEmailElements = document.querySelectorAll('.user-email');
      const avatarElements = document.querySelectorAll('.user-avatar, .user-avatar-large, .mobile-user-avatar');
      
      usernameElements.forEach(el => {
          el.textContent = currentUser.name;
      });
      
      userEmailElements.forEach(el => {
          el.textContent = currentUser.email;
      });
      
      avatarElements.forEach(el => {
          el.src = currentUser.avatar;
      });
  }

  // ===== ANIMAÇÕES =====
  function startAnimations() {
      // Iniciar animações de elementos com atraso
      const animatedElements = document.querySelectorAll('.movie-card, .release-card, .review-card, .category-card');
      
      animatedElements.forEach((el, index) => {
          el.style.animationDelay = `${index * 0.1}s`;
      });
      
      // Configurar observador de interseção para animações lazy
      setupIntersectionObserver();
  }

  function setupIntersectionObserver() {
      const observerOptions = {
          root: null,
          rootMargin: '0px',
          threshold: 0.1
      };
      
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('animate-in');
                  observer.unobserve(entry.target);
              }
          });
      }, observerOptions);
      
      // Observar elementos para animação quando entrarem na viewport
      document.querySelectorAll('.movie-card, .release-card, .review-card, .category-card').forEach(el => {
          observer.observe(el);
      });
  }

  // ===== NOTIFICAÇÕES E FEEDBACK =====
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
  window.homePage = {
      navigateCarousel,
      showPersonalizedRecommendations,
      showToast
  };
});

// Estilos para o toast (poderia ser movido para o CSS)
const toastStyles = document.createElement('style');
toastStyles.textContent = `
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #1A1A23;
  color: white;
  padding: 15px 20px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10000;
  display: flex;
  align-items: center;
  gap: 12px;
  transform: translateX(100%);
  opacity: 0;
  transition: all 0.3s ease;
}

.toast.show {
  transform: translateX(0);
  opacity: 1;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toast.success {
  border-left: 4px solid #4CAF50;
}

.toast.error {
  border-left: 4px solid #ff4757;
}

.toast i {
  font-size: 1.2rem;
}

.toast.success i {
  color: #4CAF50;
}

.toast.error i {
  color: #ff4757;
}

@media (max-width: 768px) {
  .toast {
      left: 20px;
      right: 20px;
      transform: translateY(-100%);
  }
  
  .toast.show {
      transform: translateY(0);
  }
}
`;
document.head.appendChild(toastStyles);

// Adicione esta função ao seu main-page.js para corrigir os ícones

function fixReleaseOverlayIcons() {
  // Selecionar todos os botões de ação nos overlays de lançamento
  const releaseActionButtons = document.querySelectorAll('.release-overlay .action-btn');
  
  releaseActionButtons.forEach(button => {
      // Remover event listeners existentes para evitar duplicação
      button.replaceWith(button.cloneNode(true));
  });
  
  // Reaplicar os event listeners
  document.querySelectorAll('.release-overlay .action-btn').forEach(btn => {
      btn.addEventListener('click', handleMovieAction);
  });
}

// Modifique a função handleMovieAction para lidar com os ícones de release
function handleMovieAction(e) {
  e.stopPropagation();
  const button = e.currentTarget;
  const movieId = button.dataset.movieId;
  const movie = [...popularMovies, ...newReleases].find(m => m.id == movieId);
  
  if (!movie) return;
  
  if (button.classList.contains('play-btn')) {
      playMovieTrailer(movie);
  } else if (button.classList.contains('action-btn')) {
      const action = button.dataset.action;
      handleMovieInteraction(movie, action, button);
  }
}

// Atualize a função handleMovieInteraction para um visual mais consistente
function handleMovieInteraction(movie, action, button) {
  const icon = button.querySelector('i');
  
  switch(action) {
      case 'like':
          if (icon.classList.contains('far')) {
              icon.classList.replace('far', 'fas');
              button.style.color = '#ff4757';
              showToast(`"${movie.title}" adicionado aos favoritos!`);
          } else {
              icon.classList.replace('fas', 'far');
              button.style.color = '#ffffff';
              showToast(`"${movie.title}" removido dos favoritos!`);
          }
          break;
          
      case 'watchlist':
          if (icon.classList.contains('far')) {
              icon.classList.replace('far', 'fas');
              button.style.color = '#fada5e';
              showToast(`"${movie.title}" adicionado à watchlist!`);
          } else {
              icon.classList.replace('fas', 'far');
              button.style.color = '#ffffff';
              showToast(`"${movie.title}" removido da watchlist!`);
          }
          break;
  }
}

// Adicione este CSS para melhorar a aparência dos ícones
const overlayFixStyles = document.createElement('style');
overlayFixStyles.textContent = `
/* Estilos para os ícones de ação no overlay */
.release-overlay .action-btn {
  background: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.release-overlay .action-btn:hover {
  transform: scale(1.1);
  background: rgba(0, 0, 0, 0.9);
}

.release-overlay .action-btn i {
  font-size: 1.1rem;
}

/* Melhorar a visibilidade do overlay */
.release-overlay {
  background: linear-gradient(transparent 30%, rgba(0, 0, 0, 0.8) 100%) !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

/* Ajustar o botão de play */
.release-overlay .play-btn {
  width: 60px;
  height: 60px;
  font-size: 1.4rem;
}
`;
document.head.appendChild(overlayFixStyles);

// Chame a função de correção após o carregamento da página
document.addEventListener('DOMContentLoaded', function() {
  // Sua inicialização existente...
  
  // Corrigir os ícones de overlay após um pequeno delay
  setTimeout(fixReleaseOverlayIcons, 500);
});

// Adicione também este código para garantir que os event listeners sejam aplicados após renderizações dinâmicas
function refreshEventListeners() {
  // Remover e readicionar event listeners para todos os botões de ação
  const allActionButtons = document.querySelectorAll('.action-btn, .play-btn, .wishlist-btn');
  
  allActionButtons.forEach(button => {
      button.replaceWith(button.cloneNode(true));
  });
  
  // Reaplicar os event listeners
  document.querySelectorAll('.action-btn, .play-btn, .wishlist-btn').forEach(btn => {
      if (btn.classList.contains('action-btn') || btn.classList.contains('play-btn')) {
          btn.addEventListener('click', handleMovieAction);
      } else if (btn.classList.contains('wishlist-btn')) {
          btn.addEventListener('click', handleWishlistAction);
      }
  });
  
  // Aplicar também para botões de review
  document.querySelectorAll('.like-btn, .comment-btn').forEach(btn => {
      btn.addEventListener('click', handleReviewInteraction);
  });
}

// Atualize a função renderNewReleases para incluir data-action nos botões
function renderNewReleases() {
  const releasesGrid = document.querySelector('.releases-grid');
  if (!releasesGrid) return;
  
  releasesGrid.innerHTML = newReleases.map(movie => `
      <div class="release-card" data-movie-id="${movie.id}">
          <div class="release-poster">
              <img src="${movie.image}" alt="${movie.title}" onerror="this.src='data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22280%22%20height%3D%22350%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20280%20350%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17adec85189%20text%20%7B%20fill%3A%23e5bf00%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A18pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17adec85189%22%3E%3Crect%20width%3D%22280%22%20height%3D%22350%22%20fill%3D%22%23252a33%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22130%22%20y%3D%22180%22%3E${encodeURIComponent(movie.title)}%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'">
              ${movie.badge ? `<div class="release-badge">${movie.badge}</div>` : ''}
              <div class="release-overlay">
                  <button class="play-btn" data-movie-id="${movie.id}">
                      <i class="fas fa-play"></i>
                  </button>
                  <div class="release-actions">
                      <button class="action-btn" data-action="like" data-movie-id="${movie.id}">
                          <i class="far fa-heart"></i>
                      </button>
                      <button class="action-btn" data-action="watchlist" data-movie-id="${movie.id}">
                          <i class="far fa-bookmark"></i>
                      </button>
                  </div>
              </div>
          </div>
          <div class="release-info">
              <h3>${movie.title}</h3>
              <div class="release-meta">
                  <span>${movie.year}</span>
                  <span>${movie.genre}</span>
              </div>
              ${movie.rating ? `
              <div class="release-rating">
                  <div class="stars">
                      ${renderStars(movie.rating)}
                  </div>
                  <span>${movie.rating}/5</span>
              </div>
              ` : `
              <div class="release-cta">
                  <button class="wishlist-btn" data-movie-id="${movie.id}">
                      <i class="far fa-bell"></i>
                      Avise-me
                  </button>
              </div>
              `}
          </div>
      </div>
  `).join('');
  
  // Atualizar os event listeners após renderizar
  setTimeout(refreshEventListeners, 100);
}

   // Este código substitui o anterior - a mensagem aparecerá sempre
   document.addEventListener('DOMContentLoaded', function() {
    const registrationBanner = document.getElementById('registrationBanner');
    const dismissBtn = document.getElementById('dismissBtn');
    const closeBtn = document.getElementById('closeRegistration');
    const loginBtn = document.getElementById('loginBtn');
    
    // SEMPRE mostrar o banner, independente de localStorage
    registrationBanner.style.display = 'block';
    
    // Fechar o banner (mas não lembrar a escolha)
    function dismissBanner() {
        registrationBanner.style.animation = 'slideUp 0.5s ease-out forwards';
        
        // Desativar interações (exemplo simplificado)
        document.querySelectorAll('.action-btn, .play-btn, .like-btn').forEach(btn => {
            btn.style.opacity = '0.7';
            btn.style.cursor = 'not-allowed';
            btn.onclick = function(e) {
                e.preventDefault();
                showToast('Faça login para interagir com a plataforma', 'info');
                return false;
            };
        });
        
        setTimeout(() => {
            registrationBanner.style.display = 'none';
            // Adicionar botão para reativar o banner
            addRecoveryButton();
        }, 500);
    }
    
    // Adicionar botão de recuperação
    function addRecoveryButton() {
        // Verificar se já existe um botão de recuperação
        if (document.getElementById('recoverBannerBtn')) return;
        
        const recoveryBtn = document.createElement('button');
        recoveryBtn.id = 'recoverBannerBtn';
        recoveryBtn.innerHTML = '<i class="fas fa-user-plus"></i> Ativar Interações';
        recoveryBtn.style = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            padding: 12px 18px;
            background: linear-gradient(135deg, #fada5e 0%, #e5bf00 100%);
            color: #1c1b25;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
        `;
        
        recoveryBtn.onmouseover = function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.4)';
        };
        
        recoveryBtn.onmouseout = function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        };
        
        recoveryBtn.onclick = function() {
            // Não usa mais localStorage, apenas recarrega
            location.reload();
        };
        
        document.body.appendChild(recoveryBtn);
    }
    
    // Definir animação de saída
    document.head.appendChild(document.createElement('style')).textContent = `
        @keyframes slideUp {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(-100%);
                opacity: 0;
            }
        }
    `;
    
    // Event listeners
    if (dismissBtn) dismissBtn.addEventListener('click', dismissBanner);
    if (closeBtn) closeBtn.addEventListener('click', dismissBanner);
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            window.location.href = '../login/login-hub-rescene.html';
        });
    }
    
    // Animar o mascote
    const mascote = document.querySelector('.mascote-registration .star-mascot');
    if (mascote) {
        setInterval(() => {
            mascote.style.animation = 'none';
            setTimeout(() => {
                mascote.style.animation = 'float 4s ease-in-out infinite, pulse-gentle 3s ease-in-out infinite';
            }, 10);
        }, 8000);
    }
    
    // Remover qualquer item do localStorage que possa estar causando o problema
    localStorage.removeItem('registrationDismissed');
});

// Função para mostrar notificações
function showToast(message, type = 'info') {
    // Implementação básica de toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

