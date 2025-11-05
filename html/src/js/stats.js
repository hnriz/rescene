 // Animação dos valores numéricos
 function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      obj.innerHTML = id === 'avgRating' ? value.toFixed(1) : value;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  // Inicializar animações quando a seção estiver visível
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateValue('moviesRated', 0, 128, 1500);
        animateValue('seriesRated', 0, 42, 1500);
        animateValue('avgRating', 0, 7.8, 1500);
        animateValue('activeDays', 0, 186, 1500);
        
        // Ativar gráficos
        initCharts();
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.1});
  
  observer.observe(document.querySelector('.profileStatsSection'));
  
  // Gráficos
  function initCharts() {
    // Gráfico de Gêneros (Pizza)
    const genreCtx = document.getElementById('genreChart').getContext('2d');
    const genreChart = new Chart(genreCtx, {
      type: 'doughnut',
      data: {
        labels: ['Ficção Científica', 'Drama', 'Ação', 'Comédia', 'Suspense'],
        datasets: [{
          data: [35, 25, 20, 15, 5],
          backgroundColor: [
            'rgba(250, 218, 94, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(153, 102, 255, 0.8)'
          ],
          borderColor: [
            'rgba(250, 218, 94, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateScale: true,
          animateRotate: true
        },
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#fff',
              font: {
                family: "'Nunito Sans', sans-serif"
              }
            }
          }
        },
        cutout: '65%'
      }
    });
  
    // Gráfico de Atividade (Barras)
    const activityCtx = document.getElementById('activityChart').getContext('2d');
    const activityChart = new Chart(activityCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
        datasets: [{
          label: 'Avaliações por Mês',
          data: [12, 19, 15, 8, 14, 22, 18],
          backgroundColor: 'rgba(250, 218, 94, 0.7)',
          borderColor: 'rgba(250, 218, 94, 1)',
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 2000
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#fff'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#fff'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  
    // Gráfico de Distribuição de Notas
    const ratingCtx = document.getElementById('ratingDistributionChart').getContext('2d');
    const ratingChart = new Chart(ratingCtx, {
      type: 'radar',
      data: {
        labels: ['5 Estrelas', '4 Estrelas', '3 Estrelas', '2 Estrelas', '1 Estrela'],
        datasets: [{
          label: 'Distribuição de Notas',
          data: [25, 42, 35, 18, 8],
          backgroundColor: 'rgba(250, 218, 94, 0.2)',
          borderColor: 'rgba(250, 218, 94, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(250, 218, 94, 1)',
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            suggestedMin: 0,
            ticks: {
              color: 'white',
              backdropColor: 'transparent'
            },
            pointLabels: {
              color: 'white'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
  
  // Modal de Medalhas
  const showAllBadgesBtn = document.getElementById('showAllBadges');
  const badgesModal = document.getElementById('badgesModal');
  const closeModalBtn = document.querySelector('.close-modal');
  
  showAllBadgesBtn.addEventListener('click', () => {
    badgesModal.classList.add('active');
  });
  
  closeModalBtn.addEventListener('click', () => {
    badgesModal.classList.remove('active');
  });
  
  // Fechar modal ao clicar fora
  badgesModal.addEventListener('click', (e) => {
    if (e.target === badgesModal) {
      badgesModal.classList.remove('active');
    }
  });
  
  // Trocar abas
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      
      // Remove active class from all buttons and tabs
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked button and corresponding tab
      btn.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Efeito de brilho nas bordas
  document.querySelectorAll('.glow-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Abrir modal de medalhas
document.getElementById('showAllBadges').addEventListener('click', function() {
    document.getElementById('badgesModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  // Fechar modal
  document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('badgesModal').classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Fechar ao clicar no overlay
  document.querySelector('.modal-overlay').addEventListener('click', function() {
    document.getElementById('badgesModal').classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Filtros de medalhas
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Atualizar botão ativo
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Filtrar medalhas
      document.querySelectorAll('.badge-item').forEach(item => {
        if (filter === 'all') {
          item.style.display = 'flex';
        } else if (filter === 'unlocked' && item.classList.contains('unlocked')) {
          item.style.display = 'flex';
        } else if (filter === 'locked' && item.classList.contains('locked')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Busca de medalhas
  document.querySelector('.search-box input').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    document.querySelectorAll('.badge-item').forEach(item => {
      const title = item.querySelector('h3').textContent.toLowerCase();
      const desc = item.querySelector('p').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || desc.includes(searchTerm)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });

  // Gerador de Medalhas
class MedalhaGenerator {
    constructor() {
      this.medalhas = [];
      this.niveis = {
        comum: { name: "Comum", color: "#6c757d", iconColor: "#adb5bd", elements: 1 },
        bronze: { name: "Bronze", color: "#cd7f32", iconColor: "#cd7f32", elements: 2 },
        prata: { name: "Prata", color: "#c0c0c0", iconColor: "#e0e0e0", elements: 3 },
        ouro: { name: "Ouro", color: "#ffd700", iconColor: "#fffacd", elements: 4 },
        diamante: { name: "Diamante", color: "#b9f2ff", iconColor: "#e0ffff", elements: 5 },
        estrela: { name: "Estrela", color: "#ff4500", iconColor: "#ffd700", elements: 6 }
      };
      
      this.icons = [
        'film', 'trophy', 'star', 'award', 'crown', 
        'medal', 'chess-queen', 'shield-alt', 'bolt',
        'moon-stars', 'sun', 'microphone-alt'
      ];
      
      this.generateMedalhas();
    }
    
    generateMedalhas() {
      // Medalhas desbloqueadas
      this.addMedalha("Primeiras Impressões", "Avaliar seu primeiro filme na plataforma", "comum", true);
      this.addMedalha("Socializador", "Comentar em 5 avaliações de outros usuários", "bronze", true);
      this.addMedalha("Explorador de Gêneros", "Avaliar filmes de 5 gêneros diferentes", "prata", true);
      this.addMedalha("Maratonista", "Assistir 10 filmes em um único fim de semana", "ouro", true);
      this.addMedalha("Crítico Preciso", "Dar a nota exata em 20 avaliações consecutivas", "diamante", true);
      
      // Medalhas bloqueadas
      this.addMedalha("Lenda do Cinema", "Manter média perfeita por 100 avaliações", "estrela", false, 12, 100);
      this.addMedalha("Colecionador Iniciante", "Criar 3 listas de filmes diferentes", "comum", false, 2, 3);
      this.addMedalha("Noite do Terror", "Assistir 5 filmes de terror em uma noite", "bronze", false, 2, 5);
      this.addMedalha("Influenciador", "Ter 3 avaliações com mais de 50 curtidas", "prata", false, 1, 3);
      this.addMedalha("Especialista", "Avaliar todos os filmes de um diretor famoso", "ouro", false, 7, 25);
      this.addMedalha("Veterano", "Usar a plataforma por 1 ano ininterrupto", "diamante", false, 7, 12);
      this.addMedalha("Frequente", "Acessar a plataforma por 7 dias seguidos", "comum", true);
      this.addMedalha("Organizador", "Criar uma lista com pelo menos 10 filmes", "bronze", true);
      this.addMedalha("Crítico Renomado", "Ter uma avaliação destacada pelos editores", "prata", false, 0, 1);
      this.addMedalha("Conhecedor", "Identificar 10 referências cinematográficas", "ouro", false, 3, 10);
      this.addMedalha("Arquiteto de Listas", "Criar 5 listas temáticas com 20+ filmes", "diamante", false, 2, 5);
      this.addMedalha("Mestre do Cinema", "Completar todos os desafios de um gênero", "estrela", false, 0, 1);
      
      this.renderMedalhas();
    }
    
    addMedalha(nome, descricao, nivel, desbloqueada = true, progresso = 0, total = 1) {
      const nivelInfo = this.niveis[nivel];
      const icon = this.icons[Math.floor(Math.random() * this.icons.length)];
      
      this.medalhas.push({
        nome,
        descricao,
        nivel,
        nivelInfo,
        icon,
        desbloqueada,
        progresso,
        total
      });
    }
    
    renderMedalhas() {
      const container = document.querySelector('.badges-container');
      container.innerHTML = '';
      
      this.medalhas.forEach(medalha => {
        const medalhaEl = document.createElement('div');
        medalhaEl.className = `badge-item ${medalha.nivel} ${medalha.desbloqueada ? 'unlocked' : 'locked'}`;
        medalhaEl.setAttribute('data-level', medalha.nivel);
        
        // Elementos decorativos baseados no nível
        const decorativeElements = [];
        for (let i = 0; i < medalha.nivelInfo.elements; i++) {
          decorativeElements.push(
            `<div class="decorative-element pos-${i}" style="transform: rotate(${i * (360/medalha.nivelInfo.elements)}deg)">
              ${this.getDecorativeElement(medalha.nivel, i)}
            </div>`
          );
        }
        
        medalhaEl.innerHTML = `
          <div class="badge-visual">
            <div class="badge-icon"><i class="fas fa-${medalha.icon}"></i></div>
            ${medalha.desbloqueada ? '<div class="badge-glow"></div>' : ''}
            ${decorativeElements.join('')}
            <div class="badge-level">${medalha.nivelInfo.name}</div>
            ${!medalha.desbloqueada ? '<div class="badge-lock"><i class="fas fa-lock"></i></div>' : ''}
          </div>
          <div class="badge-details">
            <h3>${medalha.nome}</h3>
            <p>${medalha.descricao}</p>
            <div class="badge-progress ${medalha.desbloqueada ? 'unlocked' : ''}">
              ${medalha.desbloqueada 
                ? '<i class="fas fa-check-circle"></i> Conquistada' 
                : `<div class="progress-bar">
                    <div class="progress-fill" style="width: ${(medalha.progresso / medalha.total) * 100}%"></div>
                  </div>
                  <span>${medalha.progresso}/${medalha.total}</span>`
              }
            </div>
          </div>
        `;
        
        container.appendChild(medalhaEl);
      });
    }
    
    getDecorativeElement(nivel, index) {
      const elements = {
        comum: ['<i class="fas fa-circle-notch"></i>'],
        bronze: [
          '<i class="fas fa-leaf"></i>',
          '<i class="fas fa-circle"></i>'
        ],
        prata: [
          '<i class="fas fa-star"></i>',
          '<i class="fas fa-angle-double-right"></i>',
          '<i class="fas fa-circle"></i>'
        ],
        ouro: [
          '<i class="fas fa-crown"></i>',
          '<i class="fas fa-star"></i>',
          '<i class="fas fa-angle-double-right"></i>',
          '<i class="fas fa-circle"></i>'
        ],
        diamante: [
          '<i class="fas fa-gem"></i>',
          '<i class="fas fa-crown"></i>',
          '<i class="fas fa-star"></i>',
          '<i class="fas fa-angle-double-right"></i>',
          '<i class="fas fa-circle"></i>'
        ],
        estrela: [
          '<i class="fas fa-star-shooting"></i>',
          '<i class="fas fa-gem"></i>',
          '<i class="fas fa-crown"></i>',
          '<i class="fas fa-star"></i>',
          '<i class="fas fa-angle-double-right"></i>',
          '<i class="fas fa-circle"></i>'
        ]
      };
      
      return elements[nivel][index % elements[nivel].length];
    }
  }
  
  // Inicializar quando o modal for aberto
  document.getElementById('showAllBadges').addEventListener('click', function() {
    new MedalhaGenerator();
  });

  // Animação do cabeçalho do perfil
function animateProfileHeader() {
    const profileHeader = document.querySelector('.profileHeader');
    const profileAvatar = document.querySelector('.profileAvatar');
    
    // Efeito parallax no background
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      profileHeader.style.backgroundPosition = 'center ' + (-scrollPosition * 0.5) + 'px';
    });
    
    // Efeito de brilho ao passar o mouse no avatar
    profileAvatar.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      this.style.setProperty('--mouse-x', x + 'px');
      this.style.setProperty('--mouse-y', y + 'px');
    });
    
    // Animação dos números de seguidores/seguindo
    animateValue('followers-count', 0, 20, 1000);
    animateValue('following-count', 0, 20, 1000);
    animateValue('active-days-count', 0, 186, 1000);
    
    // Tooltip dinâmico para status
    const statusTooltips = {
      online: "Online agora",
      offline: "Offline - Última vez visto 2h atrás",
      away: "Ausente - Inativo há 30 minutos"
    };
    
    const statusElement = document.querySelector('.avatarStatus');
    statusElement.addEventListener('click', function() {
      // Alternar status (simulação)
      const currentStatus = this.classList.contains('online') ? 'online' : 
                           this.classList.contains('away') ? 'away' : 'offline';
      
      // Rotação de status
      this.className = 'avatarStatus';
      let newStatus;
      
      if(currentStatus === 'online') {
        this.classList.add('away');
        newStatus = 'away';
      } else if(currentStatus === 'away') {
        this.classList.add('offline');
        newStatus = 'offline';
      } else {
        this.classList.add('online');
        newStatus = 'online';
      }
      
      this.setAttribute('data-tooltip', statusTooltips[newStatus]);
    });
  }
  
  // Inicializar quando a página carregar
  document.addEventListener('DOMContentLoaded', function() {
    animateProfileHeader();
    
    // Simular carregamento de dados do usuário
    setTimeout(() => {
      document.querySelector('.avatarStatus').classList.add('online');
    }, 1000);
  });
  
  // Botão de seguir
  document.querySelector('.followButton').addEventListener('click', function() {
    if(this.classList.contains('following')) {
      this.innerHTML = '<i class="fas fa-user-plus"></i> Seguir';
      this.classList.remove('following');
    } else {
      this.innerHTML = '<i class="fas fa-check"></i> Seguindo';
      this.classList.add('following');
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Alternar seção de comentários
    const commentButtons = document.querySelectorAll('.commentButton');
    commentButtons.forEach(button => {
      button.addEventListener('click', function() {
        const reviewCard = this.closest('.reviewCard');
        reviewCard.classList.toggle('expanded');
        
        // Alternar ícone
        const icon = this.querySelector('i');
        if (reviewCard.classList.contains('expanded')) {
          icon.classList.replace('far', 'fas');
          this.querySelector('span').textContent = 'Ocultar';
        } else {
          icon.classList.replace('fas', 'far');
          this.querySelector('span').textContent = 'Responder';
        }
      });
    });
    
    // Funcionalidade de curtida
    const likeButtons = document.querySelectorAll('.likeButton');
    likeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const isLiked = this.classList.contains('liked');
        const icon = this.querySelector('i');
        const countElement = this.querySelector('span');
        let currentCount = parseInt(countElement.textContent);
        
        if (isLiked) {
          this.classList.remove('liked');
          icon.classList.replace('fas', 'far');
          countElement.textContent = currentCount - 1;
        } else {
          this.classList.add('liked');
          icon.classList.replace('far', 'fas');
          countElement.textContent = currentCount + 1;
          
          // Efeito de animação
          const heartEffect = icon.cloneNode(true);
          heartEffect.classList.add('heart-effect');
          this.appendChild(heartEffect);
          
          setTimeout(() => {
            heartEffect.remove();
          }, 1000);
        }
      });
    });
    
    // Formulário de comentário
    const commentForms = document.querySelectorAll('.commentForm');
    commentForms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('.commentInput');
        const commentText = input.value.trim();
        
        if (commentText) {
          // Simular adição de novo comentário
          const commentsContainer = this.closest('.reviewComments');
          const newComment = document.createElement('div');
          newComment.className = 'comment';
          newComment.innerHTML = `
            <img src="../src/img/icon.jpg" alt="User avatar" class="commentAvatar">
            <div class="commentContent">
              <div class="commentHeader">
                <span class="commentAuthor">Você</span>
                <span class="commentDate">Agora mesmo</span>
              </div>
              <p class="commentText">${commentText}</p>
              <div class="commentActions">
                <button class="actionButton likeButton" data-likes="0">
                  <i class="far fa-heart"></i>
                  <span>0</span>
                </button>
                <button class="actionButton replyButton">
                  <i class="fas fa-reply"></i>
                  <span>Responder</span>
                </button>
              </div>
            </div>
          `;
          
          commentsContainer.insertBefore(newComment, this);
          input.value = '';
          
          // Adicionar eventos ao novo botão de like
          newComment.querySelector('.likeButton').addEventListener('click', function() {
            this.classList.toggle('liked');
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            
            let currentCount = parseInt(this.querySelector('span').textContent);
            if (this.classList.contains('liked')) {
              this.querySelector('span').textContent = currentCount + 1;
            } else {
              this.querySelector('span').textContent = currentCount - 1;
            }
          });
        }
      });
    });
    
    // Carregar mais reviews
    const loadMoreButton = document.querySelector('.loadMoreButton');
    if (loadMoreButton) {
      loadMoreButton.addEventListener('click', function() {
        // Simular carregamento
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
        this.disabled = true;
        
        setTimeout(() => {
          // Simular adição de novos cards
          const reviewList = document.querySelector('.reviewList');
          const newReview = document.createElement('article');
          newReview.className = 'reviewCard';
          newReview.innerHTML = `
            <div class="reviewMovie">
              <a href="../info.html" class="moviePoster">
                <img src="../src/img/poster14.jpg" alt="Pôster do filme">
                <div class="movieRating">
                  <i class="fas fa-star"></i>
                  <span>4.8</span>
                </div>
              </a>
              <div class="movieQuickInfo">
                <h3 class="movieTitle">Princesa Mononoke</h3>
                <div class="movieMeta">
                  <span class="movieYear">1997</span>
                  <span class="movieDuration">134 min</span>
                  <span class="movieGenre">Animação, Aventura</span>
                </div>
              </div>
            </div>
  
            <div class="reviewContent">
              <div class="reviewHeader">
                <div class="reviewAuthor">
                  <img src="../src/img/icon.jpg" alt="User avatar" class="authorAvatar">
                  <div class="authorInfo">
                    <span class="authorName">Nome de exibição</span>
                    <span class="reviewDate">1 semana atrás</span>
                  </div>
                </div>
                <div class="reviewRating">
                  <div class="stars" aria-label="5 de 5 estrelas">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
  
              <div class="reviewText">
                <p>Uma obra-prima absoluta que envelheceu como vinho fino. A complexidade moral da narrativa, onde não há vilões claros, apenas conflitos de interesses, é algo raro no cinema. A animação continua deslumbrante décadas depois, e a trilha sonora de Joe Hisaishi é simplesmente sublime.</p>
                
                <div class="reviewTags">
                  <span class="tag">Narrativa complexa</span>
                  <span class="tag">Animação impecável</span>
                  <span class="tag">Trilha sonora</span>
                </div>
              </div>
  
              <div class="reviewActions">
                <button class="actionButton likeButton" data-likes="32">
                  <i class="far fa-heart"></i>
                  <span>32</span>
                </button>
                <button class="actionButton commentButton">
                  <i class="far fa-comment"></i>
                  <span>Responder</span>
                </button>
                <button class="actionButton shareButton">
                  <i class="fas fa-share-alt"></i>
                  <span>Compartilhar</span>
                </button>
              </div>
            </div>
          `;
          
          reviewList.appendChild(newReview);
          this.innerHTML = '<i class="fas fa-plus"></i> Carregar mais avaliações';
          this.disabled = false;
          
          // Adicionar eventos aos novos elementos
          addReviewEvents(newReview);
        }, 1500);
      });
    }
    
    // Função para adicionar eventos a novos reviews
    function addReviewEvents(reviewElement) {
      const commentButton = reviewElement.querySelector('.commentButton');
      const likeButton = reviewElement.querySelector('.likeButton');
      
      if (commentButton) {
        commentButton.addEventListener('click', function() {
          const reviewCard = this.closest('.reviewCard');
          reviewCard.classList.toggle('expanded');
          
          const icon = this.querySelector('i');
          if (reviewCard.classList.contains('expanded')) {
            icon.classList.replace('far', 'fas');
            this.querySelector('span').textContent = 'Ocultar';
          } else {
            icon.classList.replace('fas', 'far');
            this.querySelector('span').textContent = 'Responder';
          }
        });
      }
      
      if (likeButton) {
        likeButton.addEventListener('click', function() {
          const isLiked = this.classList.contains('liked');
          const icon = this.querySelector('i');
          const countElement = this.querySelector('span');
          let currentCount = parseInt(countElement.textContent);
          
          if (isLiked) {
            this.classList.remove('liked');
            icon.classList.replace('fas', 'far');
            countElement.textContent = currentCount - 1;
          } else {
            this.classList.add('liked');
            icon.classList.replace('far', 'fas');
            countElement.textContent = currentCount + 1;
          }
        });
      }
    }
    
    // Ordenação de reviews
    const sortSelect = document.querySelector('.sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        // Simular ordenação
        const reviewList = document.querySelector('.reviewList');
        const reviews = Array.from(document.querySelectorAll('.reviewCard'));
        
        reviews.forEach(review => {
          review.style.opacity = '0.5';
          review.style.transition = 'opacity 0.3s ease';
        });
        
        setTimeout(() => {
          reviews.forEach(review => {
            review.style.opacity = '1';
          });
        }, 300);
      });
    }
  });

  // Ativar indicador dinâmico
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.navItem');
    const navIndicator = document.querySelector('.navIndicator');
    
    function moveIndicator(element) {
      const itemRect = element.getBoundingClientRect();
      const containerRect = element.parentElement.getBoundingClientRect();
      
      navIndicator.style.width = `${itemRect.width}px`;
      navIndicator.style.left = `${itemRect.left - containerRect.left + 5}px`;
    }
    
    // Inicializar com o item ativo
    const activeItem = document.querySelector('.navItem.active');
    if (activeItem) {
      moveIndicator(activeItem);
    }
    
    // Atualizar ao clicar
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        navItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        moveIndicator(this);
      });
    });
    
    // Atualizar ao redimensionar
    window.addEventListener('resize', function() {
      const activeItem = document.querySelector('.navItem.active');
      if (activeItem) {
        moveIndicator(activeItem);
      }
    });
  });


  