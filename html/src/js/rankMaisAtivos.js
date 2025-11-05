// Dados dos usuários mais ativos
const activeUsersData = [
    { 
        rank: 1, 
        name: "ReviewMaster", 
        avatar: "../src/img/user1.jpg", 
        timeActive: "Ativo há 5 anos", 
        avgPosts: "15 posts/dia", 
        totalPosts: "2.4K", 
        level: "Lenda" 
    },
    { 
        rank: 2, 
        name: "FilmCriticPro", 
        avatar: "../src/img/user2.jpg", 
        timeActive: "Ativo há 3 anos", 
        avgPosts: "12 posts/dia", 
        totalPosts: "1.8K", 
        level: "Expert" 
    },
    { 
        rank: 3, 
        name: "ComentadorX", 
        avatar: "../src/img/user3.jpg", 
        timeActive: "Ativo há 2 anos", 
        avgPosts: "10 posts/dia", 
        totalPosts: "1.5K", 
        level: "Veterano" 
    },
    { 
        rank: 4, 
        name: "CineFurioso", 
        avatar: "../src/img/user4.jpg", 
        timeActive: "Ativo há 4 anos", 
        avgPosts: "8 posts/dia", 
        totalPosts: "1.3K", 
        level: "Veterano" 
    },
    { 
        rank: 5, 
        name: "SérieManíaco", 
        avatar: "../src/img/user5.jpg", 
        timeActive: "Ativo há 1 ano", 
        avgPosts: "9 posts/dia", 
        totalPosts: "1.1K", 
        level: "Entusiasta" 
    },
    { 
        rank: 6, 
        name: "DraMaster", 
        avatar: "../src/img/user6.jpg", 
        timeActive: "Ativo há 6 anos", 
        avgPosts: "7 posts/dia", 
        totalPosts: "980", 
        level: "Lenda" 
    },
    { 
        rank: 7, 
        name: "IndieHunter", 
        avatar: "../src/img/user7.jpg", 
        timeActive: "Ativo há 2 anos", 
        avgPosts: "6 posts/dia", 
        totalPosts: "900", 
        level: "Entusiasta" 
    },
    { 
        rank: 8, 
        name: "TopComenter", 
        avatar: "../src/img/user8.jpg", 
        timeActive: "Ativo há 3 anos", 
        avgPosts: "5 posts/dia", 
        totalPosts: "820", 
        level: "Expert" 
    },
    { 
        rank: 9, 
        name: "ClássicoFan", 
        avatar: "../src/img/user9.jpg", 
        timeActive: "Ativo há 4 anos", 
        avgPosts: "4 posts/dia", 
        totalPosts: "750", 
        level: "Veterano" 
    },
    { 
        rank: 10, 
        name: "DocFanático", 
        avatar: "../src/img/user10.jpg", 
        timeActive: "Ativo há 1 ano", 
        avgPosts: "3 posts/dia", 
        totalPosts: "670", 
        level: "Entusiasta" 
    }
];

// Variáveis globais
let currentView = "list";
let itemsPerPage = 5;
let currentPage = 1;

// Renderização
function renderUsers(view = currentView) {
    const rankingList = document.getElementById("rankingList");
    rankingList.innerHTML = "";
    rankingList.className = `rankingList ${view}View`;

    const start = 0;
    const end = itemsPerPage * currentPage;
    const dataToRender = activeUsersData.slice(start, end);

    dataToRender.forEach(user => {
        const userElement = document.createElement("div");
        userElement.className = "rankingItem";
        
        if (view === "list") {
            userElement.innerHTML = `
                <div class="itemRank">
                    <div class="rankBadge ${user.rank <= 3 ? ['gold','silver','bronze'][user.rank-1] : ''}">
                        ${user.rank}
                    </div>
                </div>
                <div class="itemAvatar">
                    <img src="${user.avatar}" alt="${user.name}" class="userAvatar" onerror="this.onerror=null;this.src='../src/img/icon.jpg';">
                </div>
                <div class="itemInfo">
                    <h3 class="userName">${user.name}</h3>
                    <div class="userStats">
                        <div class="statItem">
                            <i class="fas fa-clock"></i>
                            <span>${user.timeActive}</span>
                        </div>
                        <div class="statItem">
                            <i class="fas fa-chart-line"></i>
                            <span>${user.avgPosts}</span>
                        </div>
                        <div class="statItem">
                            <i class="fas fa-trophy"></i>
                            <span>Nível: ${user.level}</span>
                        </div>
                    </div>
                    <div class="activityScore">
                        <span class="scoreValue">${user.totalPosts}</span>
                        <span class="scoreLabel">posts totais</span>
                        <i class="fas fa-fire scoreIcon"></i>
                    </div>
                </div>
                <div class="itemActions">
                    <button class="actionButton"><i class="fas fa-user-plus"></i></button>
                    <button class="actionButton"><i class="fas fa-envelope"></i></button>
                    <button class="actionButton"><i class="fas fa-ellipsis-h"></i></button>
                </div>
            `;
        } else {
            userElement.innerHTML = `
                <div class="itemRank">
                    <div class="rankBadge ${user.rank <= 3 ? ['gold','silver','bronze'][user.rank-1] : ''}">
                        ${user.rank}
                    </div>
                </div>
                <div class="itemAvatar">
                    <img src="${user.avatar}" alt="${user.name}" class="userAvatar" onerror="this.onerror=null;this.src='../src/img/icon.jpg';">
                </div>
                <div class="itemInfo">
                    <h3 class="userName">${user.name}</h3>
                    <div class="userStats">
                        <div class="statItem">
                            <i class="fas fa-clock"></i>
                            <span>${user.timeActive}</span>
                        </div>
                        <div class="statItem">
                            <i class="fas fa-chart-line"></i>
                            <span>${user.avgPosts}</span>
                        </div>
                        <div class="statItem">
                            <i class="fas fa-trophy"></i>
                            <span>Nível: ${user.level}</span>
                        </div>
                    </div>
                    <div class="activityScore">
                        <span class="scoreValue">${user.totalPosts}</span>
                        <span class="scoreLabel">posts totais</span>
                        <i class="fas fa-fire scoreIcon"></i>
                    </div>
                </div>
                <div class="itemActions">
                    <button class="actionButton"><i class="fas fa-user-plus"></i></button>
                    <button class="actionButton"><i class="fas fa-envelope"></i></button>
                    <button class="actionButton"><i class="fas fa-ellipsis-h"></i></button>
                </div>
            `;
        }
        
        rankingList.appendChild(userElement);
    });

    // Atualizar botão de carregar mais
    const loadMoreButton = document.getElementById("loadMoreButton");
    if (loadMoreButton) {
        if (end >= activeUsersData.length) {
            loadMoreButton.style.display = "none";
        } else {
            loadMoreButton.style.display = "inline-flex";
        }
    }
}

// Ordenação
function sortUsers(criteria) {
    let sortedData = [...activeUsersData];
    
    if (criteria === "activity") {
        sortedData.sort((a, b) => {
            const aPosts = parseFloat(a.totalPosts.replace('K', '')) * (a.totalPosts.includes('K') ? 1000 : 1);
            const bPosts = parseFloat(b.totalPosts.replace('K', '')) * (b.totalPosts.includes('K') ? 1000 : 1);
            return bPosts - aPosts;
        });
    } else if (criteria === "name") {
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === "time") {
        sortedData.sort((a, b) => {
            const aYears = parseInt(a.timeActive.match(/\d+/)[0]);
            const bYears = parseInt(b.timeActive.match(/\d+/)[0]);
            return bYears - aYears;
        });
    } else {
        sortedData.sort((a, b) => a.rank - b.rank);
    }
    
    // Reatribuir ranks após ordenar
    sortedData.forEach((u, i) => u.rank = i + 1);
    activeUsersData.splice(0, activeUsersData.length, ...sortedData);
    currentPage = 1;
    renderUsers(currentView);
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
            sortUsers(e.target.value);
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
                renderUsers(currentView);
            });
        });
    }
    
    // Configurar botão de carregar mais
    const loadMoreButton = document.getElementById("loadMoreButton");
    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", () => {
            currentPage++;
            renderUsers(currentView);
        });
    }
    
    // Renderizar usuários
    renderUsers();
});