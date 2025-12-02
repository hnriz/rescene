// ✅ Envolva todo o código em uma função global
window.initStats = function() {
    console.log('🎬 Inicializando Stats...');
    
    // ✅ Prevenir execução dupla
    if (window._statsInitialized) {
        console.log('⚠️ Stats já foi inicializado, pulando...');
        return;
    }
    window._statsInitialized = true;
    
    // Verificar se elementos existem
    const profileStatsSection = document.querySelector('.profileStatsSection');
    if (!profileStatsSection) {
        console.error('❌ Seção de estatísticas não encontrada!');
        window._statsInitialized = false;
        return;
    }
    
    // ===== ANIMAÇÃO DE VALORES =====
    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        if (!obj) return;
        
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
    
    // ===== INTERSECTION OBSERVER =====
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
    
    observer.observe(profileStatsSection);
    
    // ===== GRÁFICOS =====
    let genreChart = null;
    let activityChart = null;
    let ratingChart = null;
    
    function initCharts() {
        // Verificar se Chart.js está disponível
        if (typeof Chart === 'undefined') {
            console.error('❌ Chart.js não está carregado!');
            return;
        }
        
        // Destruir gráficos existentes se houver
        if (genreChart) genreChart.destroy();
        if (activityChart) activityChart.destroy();
        if (ratingChart) ratingChart.destroy();
        
        // Gráfico de Gêneros (Pizza)
        const genreCtx = document.getElementById('genreChart');
        if (genreCtx) {
            genreChart = new Chart(genreCtx.getContext('2d'), {
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
        }
        
        // Gráfico de Atividade (Barras)
        const activityCtx = document.getElementById('activityChart');
        if (activityCtx) {
            activityChart = new Chart(activityCtx.getContext('2d'), {
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
        }
        
        // Gráfico de Distribuição de Notas
        const ratingCtx = document.getElementById('ratingDistributionChart');
        if (ratingCtx) {
            ratingChart = new Chart(ratingCtx.getContext('2d'), {
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
    }
    
    // ===== MODAL DE MEDALHAS =====
    // const showAllBadgesBtn = document.getElementById('showAllBadges');
    // const badgesModal = document.getElementById('badgesModal');
    // const closeModalBtn = document.querySelector('.badges-modal .close-modal');
    // const modalOverlay = document.querySelector('.badges-modal .modal-overlay');
    
    // if (showAllBadgesBtn && badgesModal) {
    //     showAllBadgesBtn.addEventListener('click', () => {
    //         badgesModal.classList.add('active');
    //         document.body.style.overflow = 'hidden';
    //         new MedalhaGenerator();
    //     });
    // }
    
    // if (closeModalBtn) {
    //     closeModalBtn.addEventListener('click', () => {
    //         badgesModal.classList.remove('active');
    //         document.body.style.overflow = '';
    //     });
    // }
    
    // if (modalOverlay) {
    //     modalOverlay.addEventListener('click', () => {
    //         badgesModal.classList.remove('active');
    //         document.body.style.overflow = '';
    //     });
    // }
    
    // ===== FILTROS DE MEDALHAS =====
    // const filterButtons = document.querySelectorAll('.filter-btn');
    // filterButtons.forEach(btn => {
    //     btn.addEventListener('click', function() {
    //         const filter = this.getAttribute('data-filter');
            
    //         // Atualizar botão ativo
    //         filterButtons.forEach(b => b.classList.remove('active'));
    //         this.classList.add('active');
            
    //         // Filtrar medalhas
    //         document.querySelectorAll('.badge-item').forEach(item => {
    //             if (filter === 'all') {
    //                 item.style.display = 'flex';
    //             } else if (filter === 'unlocked' && item.classList.contains('unlocked')) {
    //                 item.style.display = 'flex';
    //             } else if (filter === 'locked' && item.classList.contains('locked')) {
    //                 item.style.display = 'flex';
    //             } else {
    //                 item.style.display = 'none';
    //             }
    //         });
    //     });
    // });
    
    // ===== BUSCA DE MEDALHAS =====
    // const medalSearch = document.getElementById('medal-search');
    // if (medalSearch) {
    //     medalSearch.addEventListener('input', function() {
    //         const searchTerm = this.value.toLowerCase();
            
    //         document.querySelectorAll('.badge-item').forEach(item => {
    //             const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
    //             const desc = item.querySelector('p')?.textContent.toLowerCase() || '';
                
    //             if (title.includes(searchTerm) || desc.includes(searchTerm)) {
    //                 item.style.display = 'flex';
    //             } else {
    //                 item.style.display = 'none';
    //             }
    //         });
    //     });
    // }
    
    // ===== GERADOR DE MEDALHAS =====
    // class MedalhaGenerator {
    //     constructor() {
    //         this.medalhas = [];
    //         this.niveis = {
    //             comum: { name: "Comum", color: "#6c757d", iconColor: "#adb5bd", elements: 1 },
    //             bronze: { name: "Bronze", color: "#cd7f32", iconColor: "#cd7f32", elements: 2 },
    //             prata: { name: "Prata", color: "#c0c0c0", iconColor: "#e0e0e0", elements: 3 },
    //             ouro: { name: "Ouro", color: "#ffd700", iconColor: "#fffacd", elements: 4 },
    //             diamante: { name: "Diamante", color: "#b9f2ff", iconColor: "#e0ffff", elements: 5 },
    //             estrela: { name: "Estrela", color: "#ff4500", iconColor: "#ffd700", elements: 6 }
    //         };
            
    //         this.icons = [
    //             'film', 'trophy', 'star', 'award', 'crown', 
    //             'medal', 'chess-queen', 'shield-alt', 'bolt',
    //             'moon', 'sun', 'microphone-alt'
    //         ];
            
    //         this.generateMedalhas();
    //     }
        
    //     generateMedalhas() {
    //         // Medalhas desbloqueadas
    //         this.addMedalha("Primeiras Impressões", "Avaliar seu primeiro filme na plataforma", "comum", true);
    //         this.addMedalha("Socializador", "Comentar em 5 avaliações de outros usuários", "bronze", true);
    //         this.addMedalha("Explorador de Gêneros", "Avaliar filmes de 5 gêneros diferentes", "prata", true);
    //         this.addMedalha("Maratonista", "Assistir 10 filmes em um único fim de semana", "ouro", true);
    //         this.addMedalha("Crítico Preciso", "Dar a nota exata em 20 avaliações consecutivas", "diamante", true);
            
    //         // Medalhas bloqueadas
    //         this.addMedalha("Lenda do Cinema", "Manter média perfeita por 100 avaliações", "estrela", false, 12, 100);
    //         this.addMedalha("Colecionador Iniciante", "Criar 3 listas de filmes diferentes", "comum", false, 2, 3);
    //         this.addMedalha("Noite do Terror", "Assistir 5 filmes de terror em uma noite", "bronze", false, 2, 5);
    //         this.addMedalha("Influenciador", "Ter 3 avaliações com mais de 50 curtidas", "prata", false, 1, 3);
    //         this.addMedalha("Especialista", "Avaliar todos os filmes de um diretor famoso", "ouro", false, 7, 25);
    //         this.addMedalha("Veterano", "Usar a plataforma por 1 ano ininterrupto", "diamante", false, 7, 12);
    //         this.addMedalha("Frequente", "Acessar a plataforma por 7 dias seguidos", "comum", true);
    //         this.addMedalha("Organizador", "Criar uma lista com pelo menos 10 filmes", "bronze", true);
    //         this.addMedalha("Crítico Renomado", "Ter uma avaliação destacada pelos editores", "prata", false, 0, 1);
    //         this.addMedalha("Conhecedor", "Identificar 10 referências cinematográficas", "ouro", false, 3, 10);
    //         this.addMedalha("Arquiteto de Listas", "Criar 5 listas temáticas com 20+ filmes", "diamante", false, 2, 5);
    //         this.addMedalha("Mestre do Cinema", "Completar todos os desafios de um gênero", "estrela", false, 0, 1);
            
    //         this.renderMedalhas();
    //     }
        
    //     addMedalha(nome, descricao, nivel, desbloqueada = true, progresso = 0, total = 1) {
    //         const nivelInfo = this.niveis[nivel];
    //         const icon = this.icons[Math.floor(Math.random() * this.icons.length)];
            
    //         this.medalhas.push({
    //             nome,
    //             descricao,
    //             nivel,
    //             nivelInfo,
    //             icon,
    //             desbloqueada,
    //             progresso,
    //             total
    //         });
    //     }
        
    //     // renderMedalhas() {
    //     //     const container = document.querySelector('.badges-container');
    //     //     if (!container) return;
            
    //     //     container.innerHTML = '';
            
    //     //     this.medalhas.forEach(medalha => {
    //     //         const medalhaEl = document.createElement('div');
    //     //         medalhaEl.className = `badge-item ${medalha.nivel} ${medalha.desbloqueada ? 'unlocked' : 'locked'}`;
    //     //         medalhaEl.setAttribute('data-level', medalha.nivel);
                
    //     //         // Elementos decorativos baseados no nível
    //     //         const decorativeElements = [];
    //     //         for (let i = 0; i < medalha.nivelInfo.elements; i++) {
    //     //             decorativeElements.push(
    //     //                 `<div class="decorative-element pos-${i}" style="transform: rotate(${i * (360/medalha.nivelInfo.elements)}deg)">
    //     //                     ${this.getDecorativeElement(medalha.nivel, i)}
    //     //                 </div>`
    //     //             );
    //     //         }
                
    //     //         medalhaEl.innerHTML = `
    //     //             <div class="badge-visual">
    //     //                 <div class="badge-icon"><i class="fas fa-${medalha.icon}"></i></div>
    //     //                 ${medalha.desbloqueada ? '<div class="badge-glow"></div>' : ''}
    //     //                 ${decorativeElements.join('')}
    //     //                 <div class="badge-level">${medalha.nivelInfo.name}</div>
    //     //                 ${!medalha.desbloqueada ? '<div class="badge-lock"><i class="fas fa-lock"></i></div>' : ''}
    //     //             </div>
    //     //             <div class="badge-details">
    //     //                 <h3>${medalha.nome}</h3>
    //     //                 <p>${medalha.descricao}</p>
    //     //                 <div class="badge-progress ${medalha.desbloqueada ? 'unlocked' : ''}">
    //     //                     ${medalha.desbloqueada 
    //     //                         ? '<i class="fas fa-check-circle"></i> Conquistada' 
    //     //                         : `<div class="progress-bar">
    //     //                                 <div class="progress-fill" style="width: ${(medalha.progresso / medalha.total) * 100}%"></div>
    //     //                             </div>
    //     //                             <span>${medalha.progresso}/${medalha.total}</span>`
    //     //                     }
    //     //                 </div>
    //     //             </div>
    //     //         `;
                
    //     //         container.appendChild(medalhaEl);
    //     //     });
            
    //     //     // Atualizar contador de progresso
    //     //     const unlocked = this.medalhas.filter(m => m.desbloqueada).length;
    //     //     const total = this.medalhas.length;
    //     //     const progressCount = document.getElementById('progress-count');
    //     //     const totalMedals = document.getElementById('total-medals');
    //     //     const globalProgress = document.getElementById('global-progress');
            
    //     //     if (progressCount) progressCount.textContent = unlocked;
    //     //     if (totalMedals) totalMedals.textContent = total;
    //     //     if (globalProgress) globalProgress.style.width = `${(unlocked / total) * 100}%`;
    //     // }
        
    //     // getDecorativeElement(nivel, index) {
    //     //     const elements = {
    //     //         comum: ['<i class="fas fa-circle-notch"></i>'],
    //     //         bronze: [
    //     //             '<i class="fas fa-leaf"></i>',
    //     //             '<i class="fas fa-circle"></i>'
    //     //         ],
    //     //         prata: [
    //     //             '<i class="fas fa-star"></i>',
    //     //             '<i class="fas fa-angle-double-right"></i>',
    //     //             '<i class="fas fa-circle"></i>'
    //     //         ],
    //     //         ouro: [
    //     //             '<i class="fas fa-crown"></i>',
    //     //             '<i class="fas fa-star"></i>',
    //     //             '<i class="fas fa-angle-double-right"></i>',
    //     //             '<i class="fas fa-circle"></i>'
    //     //         ],
    //     //         diamante: [
    //     //             '<i class="fas fa-gem"></i>',
    //     //             '<i class="fas fa-crown"></i>',
    //     //             '<i class="fas fa-star"></i>',
    //     //             '<i class="fas fa-angle-double-right"></i>',
    //     //             '<i class="fas fa-circle"></i>'
    //     //         ],
    //     //         estrela: [
    //     //             '<i class="fas fa-star"></i>',
    //     //             '<i class="fas fa-gem"></i>',
    //     //             '<i class="fas fa-crown"></i>',
    //     //             '<i class="fas fa-star"></i>',
    //     //             '<i class="fas fa-angle-double-right"></i>',
    //     //             '<i class="fas fa-circle"></i>'
    //     //         ]
    //     //     };
            
    //     //     return elements[nivel][index % elements[nivel].length];
    //     // }
    // }
    
    // ===== EFEITO DE BRILHO =====
    document.querySelectorAll('.glow-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    console.log('✅ Stats inicializado com sucesso!');
};

// ✅ Se já estiver carregado, executa imediatamente
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    window.initStats();
} else {
    document.addEventListener('DOMContentLoaded', window.initStats);
}