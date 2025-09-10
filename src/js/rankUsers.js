// Dados dos usuários
const usersData = [
    { 
        rank: 1,
        username: "MovieLover42",
        name: "MovieLover42",
        rating: 4.8,
        followers: "300K",
        reviews: "1.200 reviews",
        avatar: "../src/img/icon.jpg",
        specialty: "Crítico profissional"
    },
    { 
        rank: 2,
        username: "CinemaAddict",
        name: "CinemaAddict",
        rating: 4.7,
        followers: "295K",
        reviews: "850 reviews",
        avatar: "../src/img/icon.jpg",
        specialty: "Fã de terror"
    },
    { 
        rank: 3,
        username: "DramaQueen",
        name: "DramaQueen",
        rating: 4.9,
        followers: "290K",
        reviews: "1.000 reviews",
        avatar: "../src/img/icon.jpg",
        specialty: "Dramas intensos"
    },
    { 
        rank: 4,
        username: "RetroCine",
        name: "RetroCine",
        rating: 4.6,
        followers: "275K",
        reviews: "600 reviews",
        avatar: "../src/img/icon.jpg",
        specialty: "Amante do cinema clássico"
    },
    { 
        rank: 5,
        username: "PopcornFan",
        name: "PopcornFan",
        rating: 4.5,
        followers: "260K",
        reviews: "700 reviews",
        avatar: "../src/img/icon.jpg",
        specialty: "Pipoca e ação"
    },
    { 
        rank: 6,
        username: "HorrorHunter",
        name: "HorrorHunter",
        rating: 4.7,
        followers: "250K",
        reviews: "530 reviews",
        avatar: "../src/img/icon.jpg",
        specialty: "Especialista em horror"
    },
    { 
        rank: 7,
        username: "SeriesJunkie",
        name: "SeriesJunkie",
        rating: 4.8,
        followers: "245K",
        reviews: "900 reviews",
        avatar: "../src/img/icon.jpg",
        specialty: "Maratonador oficial"
    },
    { 
        rank: 8,
        username: "DocuLover",
        name: "DocuLover",
        rating: 4.6,
        followers: "240K",
        reviews: "480 reviews",
        avatar: "../src/img/icon.jpg",
        specialty: "Documentarista"
    },
    { 
        rank: 9,
        username: "IndieSoul",
        name: "IndieSoul",
        rating: 4.9,
        followers: "235K",
        reviews: "390 reviews",
        avatar: "../src/img/icon.jpg",
        specialty: "Cinema alternativo"
    },
    { 
        rank: 10,
        username: "BlockbusterKing",
        name: "BlockbusterKing",
        rating: 4.5,
        followers: "230K",
        reviews: "850 reviews",
        avatar: "../src/img/icon.jpg",
        specialty: "Explosões e bilheteria"
    }
];

// Função para gerar estrelas baseadas na avaliação
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    while (starsHTML.split('<i').length - 1 < 5) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    return starsHTML;
}

// Renderização dos usuários
function renderUsers() {
    const rankingList = document.getElementById("rankingList");
    if (!rankingList) {
        console.error("Elemento rankingList não encontrado!");
        return;
    }
    
    rankingList.innerHTML = "";
    rankingList.className = `rankingList listView`;

    usersData.forEach(user => {
        const userElement = document.createElement("div");
        userElement.className = "rankingItem";
        userElement.innerHTML = `
    <div class="itemRank">
        <div class="rankBadge ${user.rank <= 3 ? ['gold','silver','bronze'][user.rank-1] : ''}">
            ${user.rank}
        </div>
    </div>
    <div class="itemAvatar">
        <div class="avatar-image-container">
            <img src="${user.avatar}" alt="${user.name}" onerror="this.onerror=null;this.src='../src/img/avatar-placeholder.png';">
        </div>
        <div class="avatarOverlay">
            <button class="quickAction"><i class="fas fa-user-plus"></i></button>
        </div>
    </div>
    <div class="itemInfo">
        <h3 class="itemTitle">${user.name}</h3>
        <span class="itemUsername">@${user.username.toLowerCase()}</span>
        <div class="itemMeta">
            <span class="metaTag">${user.specialty}</span>
            <span class="metaTag">${user.reviews}</span>
            <div class="metaFollowers">
                <i class="fas fa-users"></i> ${user.followers} seguidores
            </div>
        </div>
        <div class="itemRating">
            <div class="stars">${generateStars(user.rating)}</div>
            <div class="ratingValue">${user.rating.toFixed(1)}</div>
            <div class="followersCount">Média de avaliações</div>
        </div>
    </div>
    <div class="itemActions">
        <button class="followButton">
            <i class="fas fa-plus"></i> Seguir
        </button>
        <button class="actionButton">
            <i class="far fa-envelope"></i>
        </button>
        <button class="actionButton">
            <i class="fas fa-ellipsis-h"></i>
        </button>
    </div>
`;
        rankingList.appendChild(userElement);
    });
}

// Configurar eventos
function setupEventListeners() {
    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            sortUsers(e.target.value);
        });
    }
    
    const viewOptions = document.querySelectorAll(".viewOption");
    if (viewOptions.length > 0) {
        viewOptions.forEach(btn => {
            btn.addEventListener("click", () => {
                document.querySelectorAll(".viewOption").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                currentView = btn.dataset.view;
                renderUsers();
            });
        });
    }
    
    // Esconder o botão de carregar mais já que temos apenas 10 usuários
    const loadMoreButton = document.getElementById("loadMoreButton");
    if (loadMoreButton) {
        loadMoreButton.style.display = "none";
    }
}

// Configurar navegação
function setupNavigation() {
    const activeItem = document.querySelector('.navItem.active');
    const navIndicator = document.querySelector('.navIndicator');
    
    if (activeItem && navIndicator) {
        navIndicator.style.width = `${activeItem.offsetWidth}px`;
        navIndicator.style.left = `${activeItem.offsetLeft}px`;
    }
}

// Inicialização
function initRankUsers() {
    // Verificar se estamos na página correta
    if (!document.getElementById("rankingList")) {
        return;
    }
    
    // Configurar eventos
    setupEventListeners();
    
    // Configurar navegação
    setupNavigation();
    
    // Renderizar usuários
    renderUsers();
    
    console.log("RankUsers inicializado com sucesso!");
}

// Inicializar quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRankUsers);
} else {
    initRankUsers();
}

// Função para ordenação (se necessário)
function sortUsers(criteria) {
    // Implementar lógica de ordenação se necessário
    console.log("Ordenar por:", criteria);
    // Recriar a lógica de ordenação conforme necessário
}