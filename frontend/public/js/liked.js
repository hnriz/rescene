// ✅ Envolva todo o código em uma função global
window.initLiked = function () {
  console.log('🎬 Inicializando Liked Content...');

  // Verificar se elementos existem
  const contentTypeSelect = document.getElementById('contentType');
  const sortBySelect = document.getElementById('sortBy');
  const contentCards = document.querySelectorAll('.contentCard');
  const searchInput = document.querySelector('.searchBox input');

  if (!contentTypeSelect || !sortBySelect) {
    console.error('❌ Elementos necessários não encontrados!');
    console.log('contentTypeSelect:', contentTypeSelect);
    console.log('sortBySelect:', sortBySelect);
    return;
  }

  // Filtragem de conteúdo
  function filterContent() {
    const contentType = contentTypeSelect.value;
    const sortBy = sortBySelect.value;

    contentCards.forEach(card => {
      // Filtro por tipo
      if (contentType === 'all' || card.classList.contains(contentType)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    // Ordenação (simplificada para demonstração)
    const container = document.querySelector('.contentGrid');
    if (!container) return;

    const cards = Array.from(contentCards).filter(card =>
      window.getComputedStyle(card).display !== 'none'
    );

    cards.sort((a, b) => {
      if (sortBy === 'title') {
        return a.querySelector('.cardTitle').textContent.localeCompare(
          b.querySelector('.cardTitle').textContent
        );
      } else if (sortBy === 'rating') {
        const ratingA = parseFloat(a.querySelector('.cardRating span').textContent);
        const ratingB = parseFloat(b.querySelector('.cardRating span').textContent);
        return ratingB - ratingA;
      } else if (sortBy === 'oldest') {
        return 1; // Simulação - na prática seria por data de adição
      }
      return -1; // Padrão: mais recentes primeiro
    });

    // Reordenar no DOM
    cards.forEach(card => container.appendChild(card));
  }

  contentTypeSelect.addEventListener('change', filterContent);
  sortBySelect.addEventListener('change', filterContent);

  // Funcionalidade de like
  const likeButtons = document.querySelectorAll('.likeButton');
  likeButtons.forEach(button => {
    button.addEventListener('click', function () {
      this.classList.toggle('liked');

      // Simular atualização no servidor
      const card = this.closest('.contentCard');
      if (!this.classList.contains('liked')) {
        // Aqui você faria uma chamada AJAX para remover dos favoritos
        setTimeout(() => {
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }, 500);
      }
    });
  });

  // Paginação (simulada)
  const paginationButtons = document.querySelectorAll('.paginationButton:not(:disabled)');
  paginationButtons.forEach(button => {
    button.addEventListener('click', function () {
      if (this.classList.contains('active')) return;

      const activeButton = document.querySelector('.paginationButton.active');
      if (activeButton) {
        activeButton.classList.remove('active');
      }
      this.classList.add('active');

      // Simular carregamento de nova página
      const contentGrid = document.querySelector('.contentGrid');
      if (contentGrid) {
        contentGrid.style.opacity = '0.5';

        setTimeout(() => {
          // Na prática, você carregaria novos dados aqui
          contentGrid.style.opacity = '1';
        }, 800);
      }
    });
  });

  // Busca (simplificada)
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase();

      contentCards.forEach(card => {
        const title = card.querySelector('.cardTitle').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  console.log('✅ Liked Content inicializado com sucesso!');
};

// ✅ Se já estiver carregado, executa imediatamente
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  window.initLiked();
} else {
  document.addEventListener('DOMContentLoaded', window.initLiked);
}