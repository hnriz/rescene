// ✅ Envolva todo o código em uma função global
window.initRankSeries = async function() {
    console.log('📺 Inicializando Rank Series...');
    
    // Verificar se elementos necessários existem
    const tableBody = document.getElementById("ranking-body");
    const seeMoreBtn = document.getElementById("see-more-btn");
    const seeLessBtn = document.getElementById("see-less-btn");
    const seeLessContainer = document.getElementById("see-less-container");
    
    if (!tableBody || !seeMoreBtn || !seeLessBtn) {
        console.error('❌ Elementos necessários não encontrados!');
        return;
    }

    const TMDB_API_KEY = '75e676add70640aadafcda354ca23a4c';
    const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
    const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

    // Detectar idioma baseado na URL
    const isPortuguese = window.location.pathname.includes('/PTBR/') || window.location.pathname.includes('/series') || window.location.pathname.includes('/top-series');
    const language = isPortuguese ? 'pt-BR' : 'en-US';

    let seriesData = [];
    let currentIndex = 0;
    const increment = 25;

    // Carregar séries da API TMDB
    try {
        const response = await fetch(`${TMDB_BASE_URL}/tv/top_rated?api_key=${TMDB_API_KEY}&language=${language}&page=1`);
        const data = await response.json();
        
        seriesData = data.results.map((tv, index) => ({
            rank: index + 1,
            id: tv.id,
            title: tv.name,
            year: new Date(tv.first_air_date).getFullYear(),
            poster: tv.poster_path ? `${TMDB_IMAGE_BASE}${tv.poster_path}` : '../src/img/poster1.jpg',
            genre: 'Série',
            score: (tv.vote_average / 2).toFixed(1)
        })).slice(0, 100);
        
        console.log('✅ Séries carregadas da API:', seriesData.length);
    } catch (error) {
        console.error('❌ Erro ao carregar séries:', error);
        // Fallback com dados locais
        seriesData = Array.from({ length: 100 }, (_, i) => ({
            rank: i + 1,
            id: i + 1,
            title: `Série ${i + 1}`,
            year: new Date().getFullYear() - Math.floor(Math.random() * 20),
            poster: `../src/img/poster${(i % 10) + 1}.jpg`,
            genre: 'Drama',
            score: (Math.random() * 2 + 3).toFixed(1)
        }));
    }

    // Função para renderizar as séries
    function renderRankingList(from = 0, to = increment) {
        tableBody.innerHTML = "";
        const itemsToRender = seriesData.slice(from, to);
        itemsToRender.forEach((serie) => {
            const row = document.createElement("tr");
            row.classList.add("ranking-item");
            row.style.cursor = "pointer";
            row.innerHTML = `
                <td class="rank-cell">
                    <div class="rank-badge ${serie.rank === 1 ? "gold" : serie.rank === 2 ? "silver" : serie.rank === 3 ? "bronze" : ""}">${serie.rank}</div>
                </td>
                <td class="main-cell">
                    <div class="item-content">
                        <div class="item-poster">
                            <img src="${serie.poster}" alt="${serie.title}" onerror="this.onerror=null;this.src='../src/img/poster1.jpg';">
                        </div>
                        <div class="item-info">
                            <h3 class="item-title">
                                ${serie.title} <span class="item-year">(${serie.year})</span>
                            </h3>
                            <div class="item-meta">
                                <span class="meta-tag">${serie.genre}</span>
                            </div>
                        </div>
                    </div>
                </td>
                <td class="score-cell">
                    <div class="score-value"><i class="fas fa-star"></i> ${serie.score}</div>
                </td>
            `;
            tableBody.appendChild(row);
            
            // Adicionar evento de clique
            row.addEventListener('click', () => {
                // Detectar idioma baseado na URL
                const isPortuguese = window.location.pathname.includes('/PTBR/') || window.location.pathname.includes('/series') || window.location.pathname.includes('/top-series');
                const infoUrl = isPortuguese ? `/info-ptbr/tv/${serie.id}` : `/info/tv/${serie.id}`;
                window.location.href = infoUrl;
            });
        });
        
        console.log(`✅ Renderizadas ${itemsToRender.length} séries (${from} até ${to})`);
    }

    // Renderizar inicial
    renderRankingList(0, increment);

    // Clique em "Ver mais"
    seeMoreBtn.addEventListener("click", () => {
        currentIndex += increment;
        renderRankingList(0, currentIndex);
        if (currentIndex >= seriesData.length) {
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

    // Inicializa com as primeiras 25
    currentIndex = increment;
    renderRankingList(0, currentIndex);
    
    console.log('✅ Rank Series inicializado com sucesso!');
};

// ✅ Se já estiver carregado, executa imediatamente
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    window.initRankSeries();
} else {
    document.addEventListener('DOMContentLoaded', window.initRankSeries);
}