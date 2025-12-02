// ✅ Envolva todo o código em uma função global
window.initRankMovies = function() {
    console.log('🎬 Inicializando Rank Movies...');
    
    // Verificar se elementos necessários existem
    const tableBody = document.getElementById("ranking-body");
    const seeMoreBtn = document.getElementById("see-more-btn");
    const seeLessBtn = document.getElementById("see-less-btn");
    
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

    // Geração de filmes com nota entre 3.00 e 5.00
    const filmes = Array.from({ length: 100 }, (_, i) => ({
        title: `Filme ${i + 1}`,
        description: `Descrição do filme ${i + 1}`,
        discipline: `Categoria ${Math.ceil((i + 1) / 10)}`,
        score: (Math.random() * 2 + 3).toFixed(2),
    }));

    // Ordena do maior para o menor
    filmes.sort((a, b) => b.score - a.score);
    filmes.forEach((filme, index) => filme.rank = index + 1);

    let currentIndex = 0;
    const increment = 25;

    // Função para renderizar os filmes
    function renderRankingList(from = 0, to = increment) {
        tableBody.innerHTML = "";
        const itemsToRender = filmes.slice(from, to);
        itemsToRender.forEach((filme) => {
            const row = document.createElement("tr");
            row.classList.add("ranking-item");
            row.innerHTML = `
                <td class="rank-cell">
                    <div class="rank-badge ${filme.rank === 1 ? "gold" : filme.rank === 2 ? "silver" : filme.rank === 3 ? "bronze" : ""}">${filme.rank}</div>
                </td>
                <td class="main-cell">
                    <div class="item-content">
                        <h3 class="item-title">Título: ${filme.title}</h3>
                        <p class="item-description">${filme.description}</p>
                        <div class="item-meta">
                            <span class="meta-tag">Discipline: ${filme.discipline}</span>
                        </div>
                    </div>
                </td>
                <td class="score-cell">
                    <div class="score-value">${filme.score}</div>
                </td>
            `;
            tableBody.appendChild(row);
        });
        
        console.log(`✅ Renderizados ${itemsToRender.length} filmes (${from} até ${to})`);
    }

    // Clique em "Ver mais"
    seeMoreBtn.addEventListener("click", () => {
        currentIndex += increment;
        renderRankingList(0, currentIndex);
        if (currentIndex >= filmes.length) {
            seeMoreBtn.style.display = "none";
            seeLessBtn.style.display = "inline-block";
        }
    });

    // Clique em "Ver menos"
    seeLessBtn.addEventListener("click", () => {
        currentIndex = increment;
        renderRankingList(0, currentIndex);
        seeLessBtn.style.display = "none";
        seeMoreBtn.style.display = "inline-block";
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