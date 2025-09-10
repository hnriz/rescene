document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchPlaceholder = document.getElementById('search-placeholder');
  const searchTerms = [
      "Buscar filmes, séries ou usuários...",
      "Encontrar críticas e avaliações...", 
      "Descobrir novos conteúdos...",
      "Pesquisar por atores ou diretores..."
  ];
  
  let termIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function typeEffect() {
    const currentTerm = searchTerms[termIndex];

    if (!isDeleting && charIndex < currentTerm.length) {
        // Adiciona letra por letra
        searchPlaceholder.textContent = currentTerm.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeEffect, typingSpeed);
    } 
    else if (isDeleting && charIndex > 0) {
        // Apaga letra por letra
        searchPlaceholder.textContent = currentTerm.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeEffect, typingSpeed / 2);
    } 
    else {
        // Troca entre digitar e apagar
        if (!isDeleting) {
            setTimeout(() => {
                isDeleting = true;
                typeEffect();
            }, 1000); // tempo de espera antes de apagar
        } else {
            isDeleting = false;
            termIndex = (termIndex + 1) % searchTerms.length;
            setTimeout(typeEffect, 500); // tempo de espera antes de escrever a próxima
        }
    }
}
  
  // Iniciar o efeito apenas se o campo estiver vazio e sem foco
  searchInput.addEventListener('focus', function() {
      searchPlaceholder.style.display = 'none';
  });
  
  searchInput.addEventListener('blur', function() {
      if (this.value === '') {
          searchPlaceholder.style.display = 'block';
      }
  });
  
  // Iniciar o efeito
  if (searchInput.value === '') {
      typeEffect();
  }
  
  // Menu mobile
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = document.getElementById('closeMenu');
  
  hamburger.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
  });
  
  closeMenu.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
  });
  
  // Dropdowns de notificação e usuário
  const notificationBtn = document.getElementById('notification-btn');
  const userBtn = document.getElementById('user-btn');
  
  notificationBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      document.querySelector('.notification-content').classList.toggle('show');
      document.querySelector('.user-content').classList.remove('show');
  });
  
  userBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      document.querySelector('.user-content').classList.toggle('show');
      document.querySelector('.notification-content').classList.remove('show');
  });
  
  // Fechar dropdowns ao clicar fora
  document.addEventListener('click', function() {
      document.querySelector('.notification-content').classList.remove('show');
      document.querySelector('.user-content').classList.remove('show');
  });
  
  // Prevenir que clicks dentro dos dropdowns fechem eles
  document.querySelectorAll('.dropdown-content').forEach(function(dropdown) {
      dropdown.addEventListener('click', function(e) {
          e.stopPropagation();
      });
  });
  
  // Simulação de busca
  searchInput.addEventListener('input', function() {
      const resultsContainer = document.getElementById('search-results');
      const query = this.value.toLowerCase();
      
      if (query.length > 2) {
          // Simulação de resultados (em um caso real, viria de uma API)
          const mockResults = [
              { type: 'Filme', title: 'Interestelar', year: 2014, image: '../src/img/movie1.jpg' },
              { type: 'Série', title: 'Breaking Bad', year: '2008-2013', image: '../src/img/series1.jpg' },
              { type: 'Usuário', title: 'Maria Silva', username: '@maria_silva', image: '../src/img/user1.jpg' },
              { type: 'Filme', title: 'O Poderoso Chefão', year: 1972, image: '../src/img/movie2.jpg' }
          ];
          
          const filteredResults = mockResults.filter(item => 
              item.title.toLowerCase().includes(query) || 
              (item.username && item.username.toLowerCase().includes(query))
          );
          
          if (filteredResults.length > 0) {
              resultsContainer.innerHTML = filteredResults.map(result => `
                  <a href="#" class="search-result-item">
                      <img src="${result.image}" alt="${result.title}">
                      <div class="search-result-info">
                          <h4>${result.title}</h4>
                          <p>${result.type} ${result.year ? `· ${result.year}` : ''} ${result.username ? `· ${result.username}` : ''}</p>
                      </div>
                  </a>
              `).join('');
              resultsContainer.style.display = 'block';
          } else {
              resultsContainer.innerHTML = '<div class="no-results">Nenhum resultado encontrado</div>';
              resultsContainer.style.display = 'block';
          }
      } else {
          resultsContainer.style.display = 'none';
      }
  });
});