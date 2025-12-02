// ✅ Integração JavaScript para Home.js (React Component)
window.initHome = function () {
  console.log('🏠 Inicializando Home Page (React)...');

  // ===== VARIÁVEIS GLOBAIS =====
  let currentCarouselPage = 0;
  const CAROUSEL_ITEMS_PER_PAGE = 4;

  // ===== AGUARDAR REACT RENDERIZAR =====
  const waitForReact = setInterval(() => {
    const carousel = document.getElementById('popular-carousel');
    
    if (carousel && carousel.children.length > 0) {
      clearInterval(waitForReact);
      console.log('✅ React renderizado, inicializando funcionalidades...');
      initialize();
    }
  }, 100);

  // Timeout de segurança (10 segundos)
  setTimeout(() => {
    clearInterval(waitForReact);
    console.warn('⚠️ Timeout: React não renderizado em 10s');
  }, 10000);

  // ===== INICIALIZAÇÃO =====
  function initialize() {
    setupCarousel();
    setupMascote();
    setupMovieInteractions();
    setupReviewInteractions();
    setupAnimations();
    console.log('✅ Home inicializada com sucesso!');
  }

  // ===== CARROSSEL =====
  function setupCarousel() {
    const carousel = document.getElementById('popular-carousel');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');

    if (!carousel) return;

    // Criar dots
    if (dotsContainer) {
      const itemCount = carousel.children.length;
      const pageCount = Math.ceil(itemCount / CAROUSEL_ITEMS_PER_PAGE);

      dotsContainer.innerHTML = '';
      for (let i = 0; i < pageCount; i++) {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToPage(i));
        dotsContainer.appendChild(dot);
      }
    }

    // Navegação
    if (prevBtn) prevBtn.addEventListener('click', () => navigate('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => navigate('next'));

    // Touch/Drag support
    let startX, scrollLeft, isDown = false;

    carousel.style.cursor = 'grab';

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.style.cursor = 'grabbing';
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch
    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX;
      scrollLeft = carousel.scrollLeft;
    }, { passive: true });

    carousel.addEventListener('touchmove', (e) => {
      if (!startX) return;
      const x = e.touches[0].pageX;
      const walk = (startX - x) * 2;
      carousel.scrollLeft = scrollLeft + walk;
    }, { passive: true });

    function navigate(direction) {
      const itemCount = carousel.children.length;
      const pageCount = Math.ceil(itemCount / CAROUSEL_ITEMS_PER_PAGE);

      if (direction === 'next') {
        currentCarouselPage = (currentCarouselPage + 1) % pageCount;
      } else {
        currentCarouselPage = (currentCarouselPage - 1 + pageCount) % pageCount;
      }

      goToPage(currentCarouselPage);
    }

    function goToPage(page) {
      if (carousel.children.length === 0) return;

      const itemWidth = carousel.children[0].offsetWidth;
      const gap = 20;
      const scrollPosition = page * CAROUSEL_ITEMS_PER_PAGE * (itemWidth + gap);

      carousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });

      currentCarouselPage = page;

      // Atualizar dots
      document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === page);
      });
    }
  }

  // ===== MASCOTE =====
  function setupMascote() {
    const starMascot = document.querySelector('.star-mascot');
    const speechBubble = document.querySelector('.speech-bubble');
    const pupils = document.querySelectorAll('.pupil');
    const recBtn = document.getElementById('personalized-recommendations');

    if (!starMascot) return;

    const messages = [
      "Ei! Pronto para descobrir seu próximo filme favorito? 🎬",
      "Baseado no que você assistiu, tenho ótimas recomendações! 🌟",
      "Sua próxima obsessão cinematográfica está a um clique! 🍿",
      "Lights, camera, action! Vamos começar? 🎥"
    ];

    let messageIndex = 0;

    // Olhos seguindo cursor
    document.addEventListener('mousemove', (e) => {
      pupils.forEach(pupil => {
        const rect = pupil.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const distance = Math.min(5, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 20);

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      });
    });

    // Mensagens rotativas
    if (speechBubble) {
      setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        const p = speechBubble.querySelector('p');
        if (p) p.textContent = messages[messageIndex];
      }, 8000);
    }

    // Hover effect
    starMascot.addEventListener('mouseenter', () => {
      starMascot.style.animation = 'pulse 1s ease-in-out';
    });

    starMascot.addEventListener('mouseleave', () => {
      starMascot.style.animation = '';
    });

    // Botão de recomendações
    if (recBtn) {
      recBtn.addEventListener('click', () => {
        showToast("Analisando suas preferências...");
        setTimeout(() => {
          showToast("Recomendações prontas!", "success");
          setTimeout(() => {
            window.location.href = 'catalog/movies.html';
          }, 1000);
        }, 1500);
      });
    }

    // Efeito nos botões do mascote
    document.querySelectorAll('.mascote-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => { this.style.transform = ''; }, 200);
      });
    });
  }

  // ===== INTERAÇÕES DOS FILMES =====
  function setupMovieInteractions() {
    // Play buttons (já tem onClick no React, só feedback visual)
    document.querySelectorAll('.play-btn').forEach(btn => {
      btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
      });
      btn.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });

    // Action buttons (like, bookmark)
    document.querySelectorAll('.release-actions .action-btn, .movie-overlay .action-btn').forEach(btn => {
      // Remover listeners antigos
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();

        // FontAwesome do React gera SVG, não <i>, então vamos verificar pelo SVG
        const svg = this.querySelector('svg');
        if (!svg) {
          console.warn('SVG icon não encontrado');
          return;
        }

        // Verificar o data-icon do SVG para saber qual ícone é
        const iconType = svg.getAttribute('data-icon');
        const isHeart = iconType === 'heart';
        const isBookmark = iconType === 'bookmark';

        // Usar data-attribute para controlar o estado
        const isActive = this.getAttribute('data-active') === 'true';

        if (isHeart) {
          if (!isActive) {
            this.setAttribute('data-active', 'true');
            this.style.color = '#ff4757';
            showToast("Adicionado aos favoritos! ❤️");
          } else {
            this.setAttribute('data-active', 'false');
            this.style.color = '';
            showToast("Removido dos favoritos");
          }
        } else if (isBookmark) {
          if (!isActive) {
            this.setAttribute('data-active', 'true');
            this.style.color = '#fada5e';
            showToast("Adicionado à watchlist! 📌");
          } else {
            this.setAttribute('data-active', 'false');
            this.style.color = '';
            showToast("Removido da watchlist");
          }
        }
      });
    });

    // Wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();

        // Verificar estado pelo data-attribute ao invés do ícone
        const isActive = this.getAttribute('data-active') === 'true';

        if (!isActive) {
          // Ativar
          this.setAttribute('data-active', 'true');
          this.style.background = '#fada5e';
          this.style.color = '#000';
          this.style.fontWeight = '600';
          
          // Manter o texto simples sem tentar manipular SVG
          const textContent = this.textContent.trim();
          if (textContent.includes('Avise-me')) {
            // Só muda o texto, o ícone do React permanece
            const textNode = Array.from(this.childNodes).find(node => node.nodeType === 3);
            if (textNode) {
              textNode.textContent = ' Na lista!';
            }
          }
          
          showToast("Você será notificado! 🔔", "success");
        } else {
          // Desativar
          this.setAttribute('data-active', 'false');
          this.style.background = '';
          this.style.color = '';
          this.style.fontWeight = '';
          
          const textNode = Array.from(this.childNodes).find(node => node.nodeType === 3);
          if (textNode) {
            textNode.textContent = ' Avise-me';
          }
          
          showToast("Notificação removida");
        }
      });
    });
  }

  // ===== INTERAÇÕES DAS REVIEWS =====
  function setupReviewInteractions() {
    document.querySelectorAll('.like-btn, .comment-btn').forEach(btn => {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener('click', function(e) {
        e.stopPropagation();

        const span = this.querySelector('span');
        if (!span) return;

        let count = parseInt(span.textContent);
        const icon = this.querySelector('i');
        const isLike = this.classList.contains('like-btn');

        if (isLike) {
          if (icon.classList.contains('far') || !icon.classList.contains('fas')) {
            icon.className = 'fas fa-heart';
            this.style.color = '#ff4757';
            span.textContent = count + 1;
            showToast("Review curtida!");
          } else {
            icon.className = 'far fa-heart';
            this.style.color = '';
            span.textContent = count - 1;
            showToast("Like removido");
          }
        } else {
          showToast("Comentários em breve! 💬");
        }
      });
    });
  }

  // ===== ANIMAÇÕES =====
  function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(30px)';
          
          setTimeout(() => {
            entry.target.style.transition = 'all 0.6s ease-out';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 50);
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px'
    });

    document.querySelectorAll('.movie-card, .release-card, .review-card-index, .category-card').forEach(el => {
      observer.observe(el);
    });
  }

  // ===== TOAST NOTIFICATIONS =====
  function showToast(message, type = "default") {
    const existing = document.querySelectorAll('.toast-notification');
    existing.forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    
    const bgColor = type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#1A1A23';
    const iconClass = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    const borderColor = type === 'default' ? '#fada5e' : bgColor;

    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${bgColor};
      color: white;
      padding: 15px 20px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      border-left: 4px solid ${borderColor};
      z-index: 999999;
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      max-width: 350px;
      animation: slideInRight 0.3s ease-out;
    `;

    toast.innerHTML = `
      <i class="fas ${iconClass}" style="font-size: 18px;"></i>
      <span>${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => {
        if (toast.parentNode) toast.remove();
      }, 300);
    }, 3000);
  }

  // ===== ESTILOS =====
  if (!document.getElementById('home-page-styles')) {
    const styles = document.createElement('style');
    styles.id = 'home-page-styles';
    styles.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }

      .carousel {
        cursor: grab;
        user-select: none;
      }

      .carousel:active {
        cursor: grabbing;
      }

      .carousel-dot {
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .carousel-dot:hover {
        transform: scale(1.2);
      }

      @media (max-width: 768px) {
        .toast-notification {
          top: auto !important;
          bottom: 20px !important;
          left: 20px !important;
          right: 20px !important;
          max-width: calc(100% - 40px) !important;
        }
      }
    `;
    document.head.appendChild(styles);
  }

  // Expor funções globais
  window.homePage = {
    showToast
  };
};

// ✅ Auto-inicializar
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(window.initHome, 0);
} else {
  document.addEventListener('DOMContentLoaded', window.initHome);
}

// ✅ Reinicializar se necessário (para React hot reload)
if (window.homePage) {
  window.initHome();
}