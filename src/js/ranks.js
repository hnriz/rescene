// Navegação e efeitos
document.addEventListener('DOMContentLoaded', () => {

    // Selecionar elementos
    const rankingTabs = document.querySelectorAll('.ranking-tab');
    const rankingItems = document.querySelectorAll('.ranking-item');
    
    // Efeito ripple nos tabs
    rankingTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            // Criar efeito ripple
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            // Posicionar ripple
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            this.appendChild(ripple);
            
            // Remover ripple após animação
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Animar itens do ranking com atrasos
    rankingItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
    });
    
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

});

// Geração de filmes com nota entre 3.00 e 5.00
const filmes = Array.from({ length: 100 }, (_, i) => ({
    title: `Filme ${i + 1}`,
    description: `Descrição do filme ${i + 1}`,
    discipline: `Categoria ${Math.ceil((i + 1) / 10)}`,
    score: (Math.random() * 2 + 3).toFixed(2), // entre 3 e 5
}));

// Ordena do maior para o menor
filmes.sort((a, b) => b.score - a.score);
filmes.forEach((filme, index) => filme.rank = index + 1);

// Elementos
const tableBody = document.getElementById("ranking-body");
const seeMoreBtn = document.getElementById("see-more-btn");
const seeLessBtn = document.getElementById("see-less-btn");

let currentIndex = 0;
const increment = 25;

// Função para renderizar os filmes do índice 0 até currentIndex
function renderRankingList(from = 0, to = increment) {

    const rankingContainer = document.getElementById('ranking-container');
  if (!rankingContainer) {
    console.error('Elemento #ranking-container não encontrado!');
    return;
  }

document.addEventListener('DOMContentLoaded', renderRankingList);

    tableBody.innerHTML = "";
    const itemsToRender = filmes.slice(from, to);
    itemsToRender.forEach((filme) => {
        const row = document.createElement("tr");
        row.classList.add("ranking-item");
        row.innerHTML = `
            <td class="rank-cell">
                <div class="rank-badge ${filme.rank === 1 ? "gold" : filme.rank === 2 ? "silver" : filme.rank === 3 ? "bronze" : ""}">${filme.rank }</div>
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

