// Dados dos comentários
const commentsData = [
    { 
        rank: 1, 
        film: "Breaking Boundaries (S03E05)", 
        date: "12/03/2025", 
        text: "Esta cena específica redefine completamente o arco do personagem principal. A maneira como a diretora construiu a tensão ao longo de 3 temporadas culminando neste momento é pura genialidade cinematográfica.", 
        author: "CinemaScholar", 
        avatar: "../src/img/user1.jpg", 
        likes: "24.5K" 
    },
    { 
        rank: 2, 
        film: "Cosmic Odyssey (Final da 4ª temporada)", 
        date: "05/04/2025", 
        text: "O paralelo entre a jornada do protagonista e o mito de Orfeu é impressionante. Quando ele se vira para olhar para trás no momento crítico - assim como Orfeu olhou para Eurídice - o desfecho se torna inevitável, mas dolorosamente belo.", 
        author: "MythAnalysis", 
        avatar: "../src/img/user2.jpg", 
        likes: "18.7K" 
    },
    { 
        rank: 3, 
        film: "The Last Horizon (S01E02)", 
        date: "20/02/2025", 
        text: "O enredo desse episódio introduz uma reviravolta impressionante, mostrando que a verdadeira luta é contra as próprias escolhas do protagonista. Não esperava que a moral fosse tão profunda.", 
        author: "FilmFanatic", 
        avatar: "../src/img/user3.jpg", 
        likes: "15.2K" 
    },
    { 
        rank: 4, 
        film: "Digital Dreamers (Episódio Final)", 
        date: "11/03/2025", 
        text: "A forma como a série conseguiu explorar a relação entre a realidade e o mundo digital foi de tirar o fôlego. A conclusão foi inesperada e deixou muitas perguntas, mas de uma maneira fascinante.", 
        author: "TechViewer", 
        avatar: "../src/img/user4.jpg", 
        likes: "12.8K" 
    },
    { 
        rank: 5, 
        film: "Galactic Frontiers (S02E04)", 
        date: "28/01/2025", 
        text: "As batalhas espaciais continuam sendo as mais emocionantes da série, mas o foco na relação entre os personagens é o que realmente faz essa temporada brilhar. A cena final foi de cortar a respiração.", 
        author: "StarWatcher", 
        avatar: "../src/img/user5.jpg", 
        likes: "10.5K" 
    },
    { 
        rank: 6, 
        film: "Echoes of Silence (S04E01)", 
        date: "15/02/2025", 
        text: "A abordagem emocional deste episódio realmente me tocou. Ver os personagens lidando com o luto e a perda de uma maneira tão realista foi uma experiência cinematográfica única.", 
        author: "FilmCritic", 
        avatar: "../src/img/user6.jpg", 
        likes: "9.3K" 
    },
    { 
        rank: 7, 
        film: "Sunset Mirage (Episódio 3)", 
        date: "18/02/2025", 
        text: "O ritmo acelerado e a direção desse episódio foram incríveis, mas foi a atuação do elenco principal que me fez investir emocionalmente na história. A tensão aumentou a cada minuto.", 
        author: "DramaLover", 
        avatar: "../src/img/user7.jpg", 
        likes: "8.7K" 
    },
    { 
        rank: 8, 
        film: "Time's Edge (S01E08)", 
        date: "22/02/2025", 
        text: "Este episódio é um marco na série, onde o passado e o futuro se encontram de maneira brilhante. As questões filosóficas levantadas realmente me fizeram refletir sobre a nossa própria existência.", 
        author: "TimeMaster", 
        avatar: "../src/img/user8.jpg", 
        likes: "7.5K" 
    },
    { 
        rank: 9, 
        film: "Warrior's Path (Final da Temporada)", 
        date: "02/03/2025", 
        text: "Este final de temporada foi uma explosão de emoções. As escolhas dos personagens finalmente fizeram sentido e toda a jornada foi construída de forma magistral, mesmo com seus altos e baixos.", 
        author: "ActionFan", 
        avatar: "../src/img/user9.jpg", 
        likes: "6.2K" 
    },
    { 
        rank: 10, 
        film: "Voices in the Dark (S03E07)", 
        date: "10/03/2025", 
        text: "A complexidade psicológica dos personagens é o ponto forte da série. Cada interação revela uma nova camada de suas motivações e as reviravoltas na trama são simplesmente imperdíveis.", 
        author: "PsychoWatcher", 
        avatar: "../src/img/user10.jpg", 
        likes: "5.9K" 
    }
];

// Variáveis globais
let currentView = "list";
let itemsPerPage = 5;
let currentPage = 1;

// Renderização
function renderComments(view = currentView) {
    const rankingList = document.getElementById("rankingList");
    rankingList.innerHTML = "";
    rankingList.className = `rankingList ${view}View`;

    const start = 0;
    const end = itemsPerPage * currentPage;
    const dataToRender = commentsData.slice(start, end);

    dataToRender.forEach(comment => {
        const commentElement = document.createElement("div");
        commentElement.className = "rankingItem";
        
        if (view === "list") {
            commentElement.innerHTML = `
                <div class="itemRank">
                    <div class="rankBadge ${comment.rank <= 3 ? ['gold','silver','bronze'][comment.rank-1] : ''}">
                        ${comment.rank}
                    </div>
                </div>
                <div class="itemAuthor">
                    <img src="${comment.avatar}" alt="${comment.author}" class="authorAvatar" onerror="this.onerror=null;this.src='../src/img/icon.jpg';">
                    <span class="authorName">${comment.author}</span>
                </div>
                <div class="itemInfo">
                    <div class="commentMeta">
                        <span class="commentFilm">${comment.film}</span>
                        <span class="commentDate">Postado em: ${comment.date}</span>
                    </div>
                    <p class="commentText">${comment.text}</p>
                    <div class="itemLikes">
                        <span class="likesCount">${comment.likes}</span>
                        <span class="likesLabel">curtidas</span>
                        <i class="fas fa-heart likesIcon"></i>
                    </div>
                </div>
                <div class="itemActions">
                    <button class="actionButton"><i class="far fa-heart"></i></button>
                    <button class="actionButton"><i class="far fa-bookmark"></i></button>
                    <button class="actionButton"><i class="fas fa-ellipsis-h"></i></button>
                </div>
            `;
        } else {
            commentElement.innerHTML = `
                <div class="itemRank">
                    <div class="rankBadge ${comment.rank <= 3 ? ['gold','silver','bronze'][comment.rank-1] : ''}">
                        ${comment.rank}
                    </div>
                </div>
                <div class="itemAuthor">
                    <img src="${comment.avatar}" alt="${comment.author}" class="authorAvatar" onerror="this.onerror=null;this.src='../src/img/icon.jpg';">
                    <span class="authorName">${comment.author}</span>
                </div>
                <div class="itemInfo">
                    <div class="commentMeta">
                        <span class="commentFilm">${comment.film}</span>
                        <span class="commentDate">Postado em: ${comment.date}</span>
                    </div>
                    <p class="commentText">${comment.text}</p>
                    <div class="itemLikes">
                        <span class="likesCount">${comment.likes}</span>
                        <span class="likesLabel">curtidas</span>
                        <i class="fas fa-heart likesIcon"></i>
                    </div>
                </div>
                <div class="itemActions">
                    <button class="actionButton"><i class="far fa-heart"></i></button>
                    <button class="actionButton"><i class="far fa-bookmark"></i></button>
                    <button class="actionButton"><i class="fas fa-ellipsis-h"></i></button>
                </div>
            `;
        }
        
        rankingList.appendChild(commentElement);
    });

    // Atualizar botão de carregar mais
    const loadMoreButton = document.getElementById("loadMoreButton");
    if (loadMoreButton) {
        if (end >= commentsData.length) {
            loadMoreButton.style.display = "none";
        } else {
            loadMoreButton.style.display = "inline-flex";
        }
    }
}

// Ordenação
function sortComments(criteria) {
    let sortedData = [...commentsData];
    
    if (criteria === "likes") {
        sortedData.sort((a, b) => {
            const aLikes = parseFloat(a.likes.replace('K', '')) * (aLikes.includes('K') ? 1000 : 1);
            const bLikes = parseFloat(b.likes.replace('K', '')) * (bLikes.includes('K') ? 1000 : 1);
            return bLikes - aLikes;
        });
    } else if (criteria === "date") {
        sortedData.sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')));
    } else if (criteria === "author") {
        sortedData.sort((a, b) => a.author.localeCompare(b.author));
    } else {
        sortedData.sort((a, b) => a.rank - b.rank);
    }
    
    // Reatribuir ranks após ordenar
    sortedData.forEach((c, i) => c.rank = i + 1);
    commentsData.splice(0, commentsData.length, ...sortedData);
    currentPage = 1;
    renderComments(currentView);
}

// Eventos
document.addEventListener('DOMContentLoaded', function() {
    // Configurar navegação
    const activeItem = document.querySelector('.navItem.active');
    const navIndicator = document.querySelector('.navIndicator');
    
    if (activeItem && navIndicator) {
        navIndicator.style.width = `${activeItem.offsetWidth}px`;
        navIndicator.style.left = `${activeItem.offsetLeft}px`;
    }
    
    // Configurar eventos de ordenação
    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            sortComments(e.target.value);
        });
    }
    
    // Configurar eventos de visualização
    const viewOptions = document.querySelectorAll(".viewOption");
    if (viewOptions.length > 0) {
        viewOptions.forEach(btn => {
            btn.addEventListener("click", () => {
                document.querySelectorAll(".viewOption").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                currentView = btn.dataset.view;
                renderComments(currentView);
            });
        });
    }
    
    // Configurar botão de carregar mais
    const loadMoreButton = document.getElementById("loadMoreButton");
    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", () => {
            currentPage++;
            renderComments(currentView);
        });
    }
    
    // Renderizar comentários
    renderComments();
});