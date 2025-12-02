// ✅ Envolva todo o código em uma função global
window.initRankComments = function() {
    console.log('💬 Inicializando Rank Comments...');
    
    // Detectar idioma baseado na URL com múltiplas verificações
    const getCurrentLanguage = () => {
        const path = window.location.pathname;
        const href = window.location.href;
        
        // Verificações robustas
        if (path.includes('/PTBR/') || path.startsWith('/PTBR') || href.includes('/PTBR/')) {
            return 'PTBR';
        }
        
        // Verificar se está em página de português
        if (path.includes('Comentarios') || path.includes('comentarios') || 
            document.documentElement.lang === 'pt-BR' ||
            document.documentElement.lang === 'pt') {
            return 'PTBR';
        }
        
        return 'EN';
    };
    
    const language = getCurrentLanguage();
    const baseInfoUrl = language === 'PTBR' ? '/info-ptbr' : '/info';
    
    console.log('🌐 Idioma detectado:', language);
    console.log('📍 URL atual:', window.location.pathname);
    console.log('🔗 baseInfoUrl será:', baseInfoUrl);
    
    // Verificar se elementos necessários existem
    const rankingList = document.getElementById("ranking-body");
    const loadMoreButton = document.getElementById("see-more-btn");
    const loadLessButton = document.getElementById("see-less-btn");
    const loadLessContainer = document.getElementById("see-less-container");
    
    if (!rankingList || !loadMoreButton) {
        console.error('❌ Elementos necessários não encontrados!');
        return;
    }

    // Função para buscar comentários do backend
    async function fetchCommentsData() {
        try {
            console.log('🌐 Fazendo requisição para /api/top-comments...');
            const response = await fetch('/api/top-comments');
            
            console.log('📊 Status da resposta:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Resposta não OK. Status:', response.status);
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            console.log('📥 Dados de comentários recebidos:', data);
            return data.comments || [];
        } catch (error) {
            console.error('❌ Erro ao buscar comentários:', error);
            return [];
        }
    }

    // Função para gerar dados de comentários padrão (fallback)
    function generateCommentsData() {
        const authors = ['CinemaScholar', 'MythAnalysis', 'FilmFanatic', 'TechViewer', 'StarWatcher', 
                         'FilmCritic', 'DramaLover', 'TimeMaster', 'ActionFan', 'PsychoWatcher'];
        
        const movies = [
            { title: 'Interestelar', year: '2014' },
            { title: 'Breaking Bad', year: '2008' },
            { title: 'The Matrix', year: '1999' },
            { title: 'Inception', year: '2010' },
            { title: 'Oppenheimer', year: '2023' },
            { title: 'The Shawshank Redemption', year: '1994' },
            { title: 'Pulp Fiction', year: '1994' },
            { title: 'Parasite', year: '2019' },
            { title: 'The Last of Us', year: '2023' },
            { title: 'Dune', year: '2021' }
        ];
        
        const comments = [
            "Esta cena específica redefine completamente o arco do personagem principal.",
            "O paralelo entre a jornada do protagonista e o mito de Orfeu é impressionante.",
            "O enredo introduz uma reviravolta impressionante que muda tudo.",
            "A forma como a série conseguiu explorar realidade e ficção foi incrível.",
            "As batalhas são emocionantes, mas o foco no relacionamento brilha.",
            "A abordagem emocional realmente me tocou profundamente.",
            "O ritmo acelerado mantém a tensão do início ao fim.",
            "Um marco na série onde passado e futuro se encontram magistralmente.",
            "Um final de temporada que foi uma explosão de emoções.",
            "A complexidade psicológica dos personagens é impressionante."
        ];

        return Array.from({ length: 10 }, (_, i) => ({
            rank: i + 1,
            id: i + 1,
            author: authors[i % authors.length],
            username: authors[i % authors.length].toLowerCase().replace(' ', '_'),
            text: comments[i],
            rating: (Math.random() * 2 + 3).toFixed(1),
            likes: Math.floor(Math.random() * 5000) + 100,
            movieTitle: movies[i].title,
            movieYear: movies[i].year,
            createdAt: new Date()
        }));
    }

    // Inicializa com dados do backend
    let commentsData = [];
    
    // Carregar dados de forma assíncrona
    fetchCommentsData().then(comments => {
        commentsData = comments;
        if (commentsData.length === 0) {
            console.warn('⚠️ Nenhum comentário encontrado, usando dados padrão');
            commentsData = generateCommentsData();
        }
        console.log(`✅ Carregados ${commentsData.length} comentários`);
        renderRankingList(0, increment);
        updateButtonsVisibility();
    });

    // Variáveis de controle
    let currentIndex = 0;
    const increment = 10;

    // Configurar Intersection Observer para animações
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Função para renderizar comentários em estilo review card
    function renderRankingList(from = 0, to = increment) {
        rankingList.innerHTML = "";
        
        const itemsToRender = commentsData.slice(from, to);
        
        itemsToRender.forEach(comment => {
            const row = document.createElement("tr");
            row.classList.add("ranking-item", "review-item-row");
            
            // Renderizar estrelas
            const starsHtml = (() => {
                const fullStars = Math.floor(comment.rating || 0);
                const hasHalf = (comment.rating || 0) % 1 !== 0;
                let html = '';
                for (let i = 0; i < fullStars; i++) {
                    html += '<i class="fas fa-star"></i>';
                }
                if (hasHalf) {
                    html += '<i class="fas fa-star-half-alt"></i>';
                }
                return html;
            })();
            
            const posterUrl = comment.moviePoster || '/src/img/poster-default.jpg';
            const infoUrl = comment.mediaId ? `${baseInfoUrl}/${comment.mediaId}` : '#';
            
            console.log(`🎬 Comentário ${comment.rank}: mediaId=${comment.mediaId}, infoUrl=${infoUrl}`);
            
            row.innerHTML = `
                <td class="rank-cell">
                    <div class="rank-badge ${comment.rank === 1 ? 'gold' : comment.rank === 2 ? 'silver' : comment.rank === 3 ? 'bronze' : ''}">${comment.rank}</div>
                </td>
                <td class="main-cell-comments">
                    <div class="review-card-comments-wrapper">
                        <a href="${infoUrl}" class="movie-poster-comment-link" title="Ir para página do filme/série">
                            <div class="movie-poster-comment">
                                <img src="${posterUrl}" alt="Movie Poster" onerror="this.src='/src/img/poster-default.jpg'"/>
                            </div>
                        </a>
                        <div class="review-card-comments">
                            <div class="movie-header-comment">
                                <h4 class="movie-title-comment">${comment.movieTitle || 'Título não disponível'}</h4>
                                <span class="movie-year-comment">${comment.movieYear ? `(${comment.movieYear})` : ''}</span>
                            </div>
                            <div class="stars-rating-movie">${starsHtml}</div>
                            <div class="comment-author-section">
                                <div class="author-header">
                                    <h4 class="author-name">${comment.username}</h4>
                                    <span class="author-username">@${comment.username}</span>
                                </div>
                            </div>
                            
                            <p class="item-description">${comment.text}</p>
                        </div>
                    </div>
                </td>
                <td class="score-cell">
                    <div class="score-value likes-column"><i class="fas fa-heart"></i> ${comment.likes}</div>
                </td>
            `;
            
            rankingList.appendChild(row);
            observer.observe(row);
        });
        
        console.log(`✅ Renderizados ${itemsToRender.length} comentários (${from} até ${to})`);
    }

    // Atualizar visibilidade dos botões
    function updateButtonsVisibility() {
        // Como só temos 10 itens e mostramos todos de uma vez, esconde ambos os botões
        loadMoreButton.parentElement.style.display = "none";
        if (loadLessContainer) {
            loadLessContainer.style.display = "none";
        }
    }

    // Clique em "Ver mais"
    loadMoreButton.addEventListener("click", () => {
        currentIndex += increment;
        renderRankingList(0, currentIndex);
        updateButtonsVisibility();
        console.log(`📊 Mostrando ${currentIndex} de ${commentsData.length} comentários`);
    });

    // Clique em "Ver menos"
    if (loadLessButton) {
        loadLessButton.addEventListener("click", () => {
            currentIndex = increment;
            renderRankingList(0, currentIndex);
            updateButtonsVisibility();
            console.log(`📊 Voltando para ${currentIndex} comentários`);
        });
    }
    
    console.log('✅ Rank Comments inicializado. Carregando dados...');
};

// ✅ Se já estiver carregado, executa imediatamente
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    window.initRankComments();
} else {
    document.addEventListener('DOMContentLoaded', window.initRankComments);
}