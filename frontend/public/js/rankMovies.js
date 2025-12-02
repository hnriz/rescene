// ✅ Envolva todo o código em uma função global
window.initRankMovies = async function() {
    console.log('🎬 Inicializando Rank Movies...');
    
    // Verificar se elementos necessários existem
    const tableBody = document.getElementById("ranking-body");
    const seeMoreBtn = document.getElementById("see-more-btn");
    const seeLessBtn = document.getElementById("see-less-btn");
    const seeLessContainer = document.getElementById("see-less-container");
    
    if (!tableBody || !seeMoreBtn || !seeLessBtn) {
        console.error('❌ Elementos necessários não encontrados!');
        console.log('tableBody:', tableBody);
        console.log('seeMoreBtn:', seeMoreBtn);
        console.log('seeLessBtn:', seeLessBtn);
        return;
    }

    // Selecionar elementos de navegação
    const rankingTabs = document.querySelectorAll('.ranking-tab');
    
    // Ativar tab atual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    rankingTabs.forEach(tab => {
        const tabHref = tab.getAttribute('href');
        if (tabHref === currentPage) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Smooth scroll para rankings
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    };
    
    // Verificar hash na URL
    if (window.location.hash) {
        smoothScroll(window.location.hash);
    }
    
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
    
    document.querySelectorAll('.ranking-item, .ranking-header, .ranking-table-container').forEach(el => {
        observer.observe(el);
    });

    // Buscar filmes da API TMDB
    const TMDB_API_KEY = '75e676add70640aadafcda354ca23a4c';
    const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
    const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
    
    // Detectar idioma baseado na URL
    const isPortuguese = window.location.pathname.includes('/PTBR/') || window.location.pathname.includes('/filmes') || window.location.pathname.includes('/top-filmes');
    const language = isPortuguese ? 'pt-BR' : 'en-US';
    
    let filmes = [];
    
    try {
        // Buscar filmes top-rated da API
        const response = await fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=${language}&page=1`);
        const data = await response.json();
        
        filmes = data.results.map((filme, index) => ({
            id: filme.id,
            title: filme.title,
            poster: filme.poster_path ? `${TMDB_IMAGE_BASE}${filme.poster_path}` : '../src/img/poster1.jpg',
            genre: 'Cinema',
            score: (filme.vote_average / 2).toFixed(2),
            rank: index + 1
        })).slice(0, 100);
        
        console.log('✅ Filmes carregados da API:', filmes.length);
    } catch (error) {
        console.error('❌ Erro ao carregar filmes da API:', error);
        // Fallback: usar dados padrão
        const generos = ['Ação', 'Comédia', 'Drama', 'Suspense', 'Ficção Científica', 'Romance', 'Aventura', 'Animação', 'Terror', 'Documentário'];
        filmes = Array.from({ length: 100 }, (_, i) => ({
            id: i + 1,
            title: `Filme ${i + 1}`,
            poster: `../src/img/poster${(i % 10) + 1}.jpg`,
            genre: generos[i % generos.length],
            score: (Math.random() * 2 + 3).toFixed(2),
        }));

        // Ordena do maior para o menor
        filmes.sort((a, b) => b.score - a.score);
        filmes.forEach((filme, index) => filme.rank = index + 1);
    }

    let currentIndex = 0;
    const increment = 25;

    // Função para renderizar os filmes
    function renderRankingList(from = 0, to = increment) {
        tableBody.innerHTML = "";
        const itemsToRender = filmes.slice(from, to);
        itemsToRender.forEach((filme) => {
            const row = document.createElement("tr");
            row.classList.add("ranking-item");
            row.style.cursor = "pointer";
            row.innerHTML = `
                <td class="rank-cell">
                    <div class="rank-badge ${filme.rank === 1 ? "gold" : filme.rank === 2 ? "silver" : filme.rank === 3 ? "bronze" : ""}">${filme.rank}</div>
                </td>
                <td class="main-cell">
                    <div class="item-content">
                        <div class="item-poster">
                            <img src="${filme.poster}" alt="${filme.title}" onerror="this.onerror=null;this.src='../src/img/poster1.jpg';">
                        </div>
                        <div class="item-info">
                            <h3 class="item-title">${filme.title}</h3>
                            <div class="item-meta">
                                <span class="meta-tag">${filme.genre}</span>
                            </div>
                        </div>
                    </div>
                </td>
                <td class="score-cell">
                    <div class="score-value"><i class="fas fa-star"></i> ${filme.score}</div>
                </td>
            `;
            tableBody.appendChild(row);
            
            // Adicionar evento de clique
            row.addEventListener('click', () => {
                // Detectar idioma baseado na URL
                const isPortuguese = window.location.pathname.includes('/PTBR/') || window.location.pathname.includes('/filmes') || window.location.pathname.includes('/top-filmes');
                const infoUrl = isPortuguese ? `/info-ptbr/movie/${filme.id}` : `/info/movie/${filme.id}`;
                window.location.href = infoUrl;
            });
        });
        
        console.log(`✅ Renderizados ${itemsToRender.length} filmes (${from} até ${to})`);
    }

    // Clique em "Ver mais"
    seeMoreBtn.addEventListener("click", () => {
        currentIndex += increment;
        renderRankingList(0, currentIndex);
        if (currentIndex >= filmes.length) {
            seeMoreBtn.parentElement.style.display = "none";
            if (seeLessContainer) {
                seeLessContainer.style.display = "block";
            }
        }
    });

    // Clique em "Ver menos"
    seeLessBtn.addEventListener("click", () => {
        currentIndex = increment;
        renderRankingList(0, currentIndex);
        if (seeLessContainer) {
            seeLessContainer.style.display = "none";
        }
        seeMoreBtn.parentElement.style.display = "block";
    });

    // Inicializa com os primeiros 25
    currentIndex = increment;
    renderRankingList(0, currentIndex);
    
    console.log('✅ Rank Movies inicializado com sucesso!');
};

// ✅ Se já estiver carregado, executa imediatamente
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    window.initRankMovies();
} else {
    document.addEventListener('DOMContentLoaded', window.initRankMovies);
}