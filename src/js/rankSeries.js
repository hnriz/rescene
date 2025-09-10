function generateSeriesData() {
    const series = [];
    const titles = [
        "Breaking Bad", "Game of Thrones", "Stranger Things", "The Crown", "The Mandalorian",
        "The Witcher", "The Boys", "The Last of Us", "House of the Dragon", "The Umbrella Academy",
        "Better Call Saul", "Ozark", "Money Heist", "Dark", "Peaky Blinders",
        "The Queen's Gambit", "Chernobyl", "The Handmaid's Tale", "Westworld", "The Marvelous Mrs. Maisel",
        "The Office", "Friends", "The Big Bang Theory", "How I Met Your Mother", "Brooklyn Nine-Nine",
        "The Simpsons", "Rick and Morty", "South Park", "Family Guy", "Archer",
        "Black Mirror", "True Detective", "Mindhunter", "Dexter", "Sherlock",
        "Luther", "Line of Duty", "Killing Eve", "Fargo", "True Blood",
        "The Walking Dead", "Lost", "Prison Break", "24", "Homeland",
        "Grey's Anatomy", "House M.D.", "The Good Doctor", "ER", "Chicago Med",
        "The Sopranos", "The Wire", "Mad Men", "Boardwalk Empire", "Ray Donovan",
        "Narcos", "El Chapo", "Queen of the South", "Power", "Snowfall"
    ];

    const creators = [
        "Vince Gilligan", "David Benioff, D.B. Weiss", "The Duffer Brothers", "Peter Morgan", "Jon Favreau",
        "Lauren Schmidt Hissrich", "Eric Kripke", "Craig Mazin", "Ryan Condal", "Steve Blackman",
        "Vince Gilligan, Peter Gould", "Bill Dubuque", "Álex Pina", "Baran bo Odar, Jantje Friese", "Steven Knight",
        "Scott Frank", "Craig Mazin", "Bruce Miller", "Jonathan Nolan, Lisa Joy", "Amy Sherman-Palladino",
        "Greg Daniels", "David Crane, Marta Kauffman", "Chuck Lorre, Bill Prady", "Carter Bays, Craig Thomas", "Michael Schur, Dan Goor",
        "Matt Groening", "Justin Roiland, Dan Harmon", "Trey Parker, Matt Stone", "Seth MacFarlane", "Adam Reed",
        "Charlie Brooker", "Nic Pizzolatto", "Joe Penhall", "James Manos Jr.", "Mark Gatiss, Steven Moffat",
        "Neil Cross", "Jed Mercurio", "Phoebe Waller-Bridge", "Noah Hawley", "Alan Ball",
        "Frank Darabont", "J.J. Abrams", "Paul Scheuring", "Joel Surnow, Robert Cochran", "Howard Gordon, Alex Gansa",
        "Shonda Rhimes", "David Shore", "David Shore", "Michael Crichton", "Dick Wolf, Matt Olmstead",
        "David Chase", "David Simon", "Matthew Weiner", "Terence Winter", "Ann Biderman",
        "Chris Brancato, Carlo Bernard, Doug Miro", "Silvana Aguirre Zegarra", "M.A. Fortin, Joshua John Miller", "Courtney Kemp", "Dave Andron, Eric Amadio"
    ];

    const genres = [
        "Crime, Drama, Thriller", "Ação, Aventura, Drama", "Drama, Fantasia, Horror", "Drama, História", "Ação, Aventura, Ficção Científica",
        "Ação, Aventura, Drama", "Ação, Comédia, Crime", "Ação, Aventura, Drama", "Ação, Aventura, Drama", "Ação, Comédia, Drama",
        "Crime, Drama", "Crime, Drama, Thriller", "Ação, Crime, Drama", "Crime, Drama, Mistério", "Crime, Drama",
        "Drama", "Drama, História", "Drama, Ficção Científica", "Drama, Ficção Científica", "Comédia, Drama",
        "Comédia", "Comédia, Romance", "Comédia, Romance", "Comédia, Romance", "Comédia, Crime",
        "Animação, Comédia", "Animação, Aventura, Comédia", "Animação, Comédia", "Animação, Comédia", "Animação, Ação, Comédia",
        "Drama, Ficção Científica, Thriller", "Crime, Drama, Mistério", "Crime, Drama, Thriller", "Crime, Drama, Mistério", "Crime, Drama, Mistério",
        "Crime, Drama, Mistério", "Crime, Drama, Mistério", "Crime, Drama, Mistério", "Crime, Drama, Thriller", "Drama, Fantasia, Horror",
        "Drama, Horror, Thriller", "Aventura, Drama, Fantasia", "Ação, Crime, Drama", "Ação, Crime, Drama", "Crime, Drama, Mistério",
        "Drama, Romance", "Drama, Mistério", "Drama", "Drama, Romance", "Drama, Romance",
        "Crime, Drama", "Crime, Drama", "Drama", "Crime, Drama", "Crime, Drama",
        "Biografia, Crime, Drama", "Biografia, Crime, Drama", "Crime, Drama", "Crime, Drama, Romance", "Crime, Drama"
    ];

    for (let i = 0; i < 100; i++) {
        const titleIndex = i % titles.length;
        const year = Math.floor(Math.random() * 25) + 2000;
        const rating = (Math.random() * 2 + 3).toFixed(1); // Notas entre 3.0 e 5.0
        const votes = (Math.random() * 2000000 + 50000).toFixed(0);
        const seasons = Math.floor(Math.random() * 10) + 1;
        const formattedVotes = parseInt(votes) > 1000000 
            ? (parseInt(votes) / 1000000).toFixed(1) + "M" 
            : (parseInt(votes) / 1000).toFixed(0) + "K";
        
        // Usar poster1.jpg a poster15.jpg em ciclo
        const posterNumber = (i % 15) + 1;
        
        series.push({
            rank: i + 1,
            title: titles[titleIndex] + (i >= titles.length ? " " + Math.floor(i/titles.length + 1) : ""),
            year: year,
            rating: parseFloat(rating),
            votes: formattedVotes,
            poster: `../src/img/poster${posterNumber}.jpg`,
            creator: creators[titleIndex],
            genre: genres[titleIndex],
            seasons: seasons
        });
    }

    return series;
}

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

// Variáveis globais
let seriesData = generateSeriesData();
let currentView = "list";
let itemsPerPage = 10;
let currentPage = 1;

// Renderização
function renderSeries(view = currentView) {
    const rankingList = document.getElementById("rankingList");
    rankingList.innerHTML = "";
    rankingList.className = `rankingList ${view}View`;

    const start = 0;
    const end = itemsPerPage * currentPage;
    const dataToRender = seriesData.slice(start, end);

    dataToRender.forEach(series => {
        const seriesElement = document.createElement("div");
        seriesElement.className = "rankingItem";
        seriesElement.innerHTML = `
            <div class="itemRank">
                <div class="rankBadge ${series.rank <= 3 ? ['gold','silver','bronze'][series.rank-1] : ''}">
                    ${series.rank}
                </div>
            </div>
            <div class="itemPoster">
                <img src="${series.poster}" alt="${series.title}" onerror="this.onerror=null;this.src='../src/img/poster-placeholder.jpg';">
                <div class="posterOverlay">
                    <button class="quickAction"><i class="fas fa-play"></i></button>
                </div>
            </div>
            <div class="itemInfo">
                <h3 class="itemTitle">${series.title} <span class="itemYear">(${series.year})</span></h3>
                <div class="itemMeta">
                    <span class="metaCreator">${series.creator}</span>
                    <span class="metaGenre">${series.genre}</span>
                    <div class="metaSeasons">
                        <i class="fas fa-layer-group"></i> ${series.seasons} temporada${series.seasons > 1 ? 's' : ''}
                    </div>
                </div>
                <div class="itemRating">
                    <div class="stars">${generateStars(series.rating)}</div>
                    <div class="ratingValue">${series.rating.toFixed(1)}</div>
                    <div class="ratingVotes">${series.votes} avaliações</div>
                </div>
            </div>
            <div class="itemActions">
                <button class="actionButton"><i class="far fa-heart"></i></button>
                <button class="actionButton"><i class="far fa-bookmark"></i></button>
                <button class="actionButton"><i class="fas fa-ellipsis-h"></i></button>
            </div>
        `;
        rankingList.appendChild(seriesElement);
    });
}

// Ordenação
function sortSeries(criteria) {
    if (criteria === "title") {
        seriesData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === "rating") {
        seriesData.sort((a, b) => b.rating - a.rating);
    } else if (criteria === "year") {
        seriesData.sort((a, b) => b.year - a.year);
    } else {
        seriesData.sort((a, b) => a.rank - b.rank);
    }
    // Reatribuir ranks após ordenar
    seriesData.forEach((s, i) => s.rank = i + 1);
    currentPage = 1;
    renderSeries(currentView);
}

// Eventos
document.addEventListener('DOMContentLoaded', function() {
    // Configurar eventos após o DOM estar carregado
    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            sortSeries(e.target.value);
        });
    }
    
    const viewOptions = document.querySelectorAll(".viewOption");
    if (viewOptions.length > 0) {
        viewOptions.forEach(btn => {
            btn.addEventListener("click", () => {
                document.querySelectorAll(".viewOption").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                currentView = btn.dataset.view;
                renderSeries(currentView);
            });
        });
    }
    
    const loadMoreButton = document.getElementById("loadMoreButton");
    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", () => {
            currentPage++;
            renderSeries(currentView);
        });
    }
    
    // Renderizar séries
    renderSeries();
});

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Configurar navegação
    const activeItem = document.querySelector('.navItem.active');
    const navIndicator = document.querySelector('.navIndicator');
    
    if (activeItem && navIndicator) {
        navIndicator.style.width = `${activeItem.offsetWidth}px`;
        navIndicator.style.left = `${activeItem.offsetLeft}px`;
    }
    
    // Renderizar séries
    renderSeries();
});