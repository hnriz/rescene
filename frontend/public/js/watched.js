// ✅ Envolva todo o código em uma função global
window.initWatched = function () {
  console.log('🎬 Inicializando Watched...');

  // Verificar se elementos existem
  const viewButtons = document.querySelectorAll('.viewButton');
  const contentGrid = document.querySelector('.contentGrid');
  const contentTypeSelect = document.getElementById('contentType');
  const sortBySelect = document.getElementById('sortBy');
  const contentCards = document.querySelectorAll('.contentCard');

  if (!contentGrid || !contentTypeSelect || !sortBySelect) {
    console.error('❌ Elementos necessários não encontrados!');
    return;
  }

  // ===== ALTERNAR VISUALIZAÇÃO =====
  viewButtons.forEach(button => {
    button.addEventListener('click', function () {
      const viewType = this.getAttribute('data-view');

      // Atualizar botões ativos
      viewButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Alternar visualização
      if (viewType === 'list') {
        contentGrid.classList.add('list-view');
      } else {
        contentGrid.classList.remove('list-view');
      }
    });
  });

  // ===== FILTRAGEM E ORDENAÇÃO =====
  function filterAndSortContent() {
    const contentType = contentTypeSelect.value;
    const sortBy = sortBySelect.value;

    // Filtrar
    contentCards.forEach(card => {
      if (contentType === 'all' || card.classList.contains(contentType)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    // Ordenar
    const visibleCards = Array.from(contentCards).filter(card =>
      card.style.display !== 'none'
    );

    visibleCards.sort((a, b) => {
      const aValue = a.getAttribute(`data-${sortBy}`);
      const bValue = b.getAttribute(`data-${sortBy}`);

      if (sortBy === 'title') {
        const titleA = a.querySelector('.cardTitle')?.textContent || '';
        const titleB = b.querySelector('.cardTitle')?.textContent || '';
        return titleA.localeCompare(titleB);
      } else if (sortBy === 'rating') {
        return parseFloat(bValue) - parseFloat(aValue);
      } else if (sortBy === 'date') {
        return new Date(bValue) - new Date(aValue);
      } else if (sortBy === 'duration') {
        return parseInt(bValue) - parseInt(aValue);
      } else if (sortBy === 'recent') {
        return new Date(bValue) - new Date(aValue);
      } else if (sortBy === 'oldest') {
        return new Date(aValue) - new Date(bValue);
      }
      return 0;
    });

    // Reordenar no DOM
    visibleCards.forEach(card => contentGrid.appendChild(card));
  }

  contentTypeSelect.addEventListener('change', filterAndSortContent);
  sortBySelect.addEventListener('change', filterAndSortContent);

  // ===== FUNCIONALIDADE DE LIKE =====
  const likeButtons = document.querySelectorAll('.actionButton.like');
  likeButtons.forEach(button => {
    // Remove o listener antigo se existir
    const oldListener = button._likeListener;
    if (oldListener) {
      button.removeEventListener('click', oldListener);
    }

    // Cria e armazena o novo listener
    const newListener = function (e) {
      e.preventDefault();
      e.stopPropagation();

      const isLiked = this.classList.contains('liked');

      if (isLiked) {
        this.classList.remove('liked');
        this.setAttribute('data-tooltip', 'Favoritar');
        console.log('❤️ Like removido');
      } else {
        this.classList.add('liked');
        this.setAttribute('data-tooltip', 'Desfavoritar');
        console.log('❤️ Like adicionado');
      }
    };

    button._likeListener = newListener;
    button.addEventListener('click', newListener);
  });

  // ===== PAGINAÇÃO =====
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
      contentGrid.style.opacity = '0.5';

      setTimeout(() => {
        contentGrid.style.opacity = '1';
      }, 800);
    });
  });

  // ===== TOOLTIPS =====
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
  });

  function showTooltip(e) {
    const tooltipText = this.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = tooltipText;
    tooltip.style.position = 'fixed';
    tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '8px 12px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '0.85rem';
    tooltip.style.zIndex = '1000';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.whiteSpace = 'nowrap';

    document.body.appendChild(tooltip);

    const rect = this.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;

    this._tooltip = tooltip;
  }

  function hideTooltip() {
    if (this._tooltip) {
      this._tooltip.remove();
      this._tooltip = null;
    }
  }

  console.log('✅ Watched inicializado com sucesso!');
};

// ✅ Se já estiver carregado, executa imediatamente
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  window.initWatched();
} else {
  document.addEventListener('DOMContentLoaded', window.initWatched);
}