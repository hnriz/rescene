// ✅ Envolva todo o código em uma função global
window.initRankUsers = function() {
    console.log('👥 Inicializando Rank Users...');
    
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
    
    // Smooth scroll
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

    // Função para buscar usuários do backend
    async function fetchUsersData() {
        try {
            console.log('🌐 Fazendo requisição para /api/top-users...');
            const response = await fetch('/api/top-users');
            
            console.log('📊 Status da resposta:', response.status);
            console.log('📄 Content-Type:', response.headers.get('content-type'));
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Resposta não OK. Status:', response.status);
                console.error('❌ Conteúdo:', errorText.substring(0, 200));
                throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}`);
            }
            
            const data = await response.json();
            console.log('📥 Dados de usuários recebidos:', data);
            return data.users || [];
        } catch (error) {
            console.error('❌ Erro ao buscar usuários:', error);
            return [];
        }
    }

    // Inicializa com dados do backend
    let usersData = [];
    
    // Carregar dados de forma assíncrona
    fetchUsersData().then(users => {
        usersData = users;
        if (usersData.length === 0) {
            console.warn('⚠️ Nenhum usuário encontrado, usando dados padrão');
            usersData = generateUsersData();
        }
        console.log(`✅ Carregados ${usersData.length} usuários`);
        renderRankingList(0, increment);
        updateButtonsVisibility();
    });

    // Função para gerar dados de usuários padrão (fallback)
    function generateUsersData() {
        const users = [];
        const baseUsernames = [
            "MovieLover", "CinemaAddict", "DramaQueen", "RetroCine", "PopcornFan",
            "HorrorHunter", "SeriesJunkie", "DocuLover", "IndieSoul", "BlockbusterKing"
        ];

        const specialties = [
            "Crítico profissional", "Fã de terror", "Dramas intensos", "Cinema clássico", "Pipoca e ação",
            "Especialista em horror", "Maratonador oficial", "Documentarista", "Cinema alternativo", "Explosões e bilheteria"
        ];

        for (let i = 0; i < 10; i++) {
            const username = baseUsernames[i];
            const rating = parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)); // Entre 3.5 e 5.0
            const followers = Math.floor(Math.random() * 300000 + 50000);
            const reviews = Math.floor(Math.random() * 1200 + 100);
            
            const formattedFollowers = followers > 1000 
                ? Math.floor(followers / 1000) + "K" 
                : followers.toString();

            users.push({
                rank: i + 1,
                username: username,
                name: username,
                avatar: `../src/img/user${(i % 10) + 1}.jpg`,
                rating: rating,
                followers: formattedFollowers,
                reviews: reviews + " reviews",
                specialty: specialties[i],
                score: rating
            });
        }

        return users;
    }

    let currentIndex = 0;
    const increment = 10;

    // Função para renderizar os usuários
    function renderRankingList(from = 0, to = increment) {
        tableBody.innerHTML = "";
        const itemsToRender = usersData.slice(from, to);
        itemsToRender.forEach((user) => {
            const row = document.createElement("tr");
            row.classList.add("ranking-item");
            row.style.cursor = "pointer";
            
            // Avatar URL - tenta avatar da API ou usa padrão
            const avatarUrl = user.avatar && user.avatar !== 'null' 
                ? user.avatar 
                : null;
            
            // Renderizar avatar com fallback para avatar padrão
            const avatarHTML = avatarUrl 
                ? `<img src="${avatarUrl}" alt="${user.username}" class="user-avatar-rank" onerror="this.parentElement.innerHTML='<div class=\\'default-avatar-rank\\'><svg viewBox=\\'0 0 24 24\\' fill=\\'currentColor\\'><path d=\\'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z\\'/></svg></div>'">`
                : `<div class="default-avatar-rank"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>`;
            
            row.innerHTML = `
                <td class="rank-cell">
                    <div class="rank-badge ${user.rank === 1 ? "gold" : user.rank === 2 ? "silver" : user.rank === 3 ? "bronze" : ""}">${user.rank}</div>
                </td>
                <td class="main-cell">
                    <div class="item-content">
                        <div class="avatar-container-rank">
                            ${avatarHTML}
                        </div>
                        <div class="user-info-rank">
                            <h3 class="item-title">${user.displayName}</h3>
                            <span class="item-username">@${user.username.toLowerCase()}</span>
                        </div>
                    </div>
                </td>
                <td class="score-cell">
                    <div class="score-value"><i class="fas fa-comments"></i> ${user.commentCount} comments</div>
                </td>
            `;
            
            // Adicionar evento de clique
            row.addEventListener("click", () => {
                const currentPath = window.location.pathname;
                const isPTBR = currentPath.includes('/PTBR/') || currentPath.includes('/top-');
                
                if (isPTBR) {
                    window.location.href = `/usuario/${user.username}`;
                } else {
                    window.location.href = `/user/${user.username}`;
                }
                
                console.log(`🔗 Navegando para perfil de ${user.displayName} (username: ${user.username})`);
            });
            
            tableBody.appendChild(row);
        });
        
        console.log(`✅ Renderizados ${itemsToRender.length} usuários (${from} até ${to})`);
    }

    // Atualizar visibilidade dos botões
    function updateButtonsVisibility() {
        // Como só temos 10 itens e mostramos todos de uma vez, esconde ambos os botões
        seeMoreBtn.parentElement.style.display = "none";
        if (seeLessContainer) {
            seeLessContainer.style.display = "none";
        }
    }

    // Clique em "Ver mais"
    seeMoreBtn.addEventListener("click", () => {
        currentIndex += increment;
        renderRankingList(0, currentIndex);
        updateButtonsVisibility();
        console.log(`📊 Mostrando ${currentIndex} de ${usersData.length} usuários`);
    });

    // Clique em "Ver menos"
    seeLessBtn.addEventListener("click", () => {
        currentIndex = increment;
        renderRankingList(0, currentIndex);
        updateButtonsVisibility();
        console.log(`📊 Voltando para ${currentIndex} usuários`);
    });
    
    console.log('✅ Rank Users inicializado. Carregando dados...');
};

// ✅ Se já estiver carregado, executa imediatamente
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    window.initRankUsers();
} else {
    document.addEventListener('DOMContentLoaded', window.initRankUsers);
}