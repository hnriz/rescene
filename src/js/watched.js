document.addEventListener('DOMContentLoaded', function() {
    // Alternar entre visualização em grade e lista
    const viewButtons = document.querySelectorAll('.viewButton');
    const contentGrid = document.querySelector('.contentGrid');
    
    viewButtons.forEach(button => {
      button.addEventListener('click', function() {
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
    
    // Filtragem de conteúdo
    const contentTypeSelect = document.getElementById('contentType');
    const sortBySelect = document.getElementById('sortBy');
    const contentCards = document.querySelectorAll('.contentCard');
    
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
          return aValue.localeCompare(bValue);
        } else if (sortBy === 'rating') {
          return parseFloat(bValue) - parseFloat(aValue);
        } else if (sortBy === 'date') {
          return new Date(bValue) - new Date(aValue);
        } else if (sortBy === 'duration') {
          return parseInt(bValue) - parseInt(aValue);
        }
        return 0;
      });
      
      // Reordenar no DOM
      const container = contentGrid;
      visibleCards.forEach(card => container.appendChild(card));
    }
    
    contentTypeSelect.addEventListener('change', filterAndSortContent);
    sortBySelect.addEventListener('change', filterAndSortContent);
    
    // Funcionalidade de like
    const likeButtons = document.querySelectorAll('.actionButton.like');
    likeButtons.forEach(button => {
      button.addEventListener('click', function() {
        this.classList.toggle('liked');
        const icon = this.querySelector('i');
        
        if (this.classList.contains('liked')) {
          icon.classList.replace('far', 'fas');
          this.setAttribute('data-tooltip', 'Desfavoritar');
        } else {
          icon.classList.replace('fas', 'far');
          this.setAttribute('data-tooltip', 'Favoritar');
        }
      });
    });
    
    // Paginação (simulada)
    const paginationButtons = document.querySelectorAll('.paginationButton:not(:disabled)');
    paginationButtons.forEach(button => {
      button.addEventListener('click', function() {
        if (this.classList.contains('active')) return;
        
        document.querySelector('.paginationButton.active').classList.remove('active');
        this.classList.add('active');
        
        // Simular carregamento de nova página
        contentGrid.style.opacity = '0.5';
        
        setTimeout(() => {
          contentGrid.style.opacity = '1';
        }, 800);
      });
    });
    
    // Tooltips
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
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
      tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    }
    
    function hideTooltip() {
      const tooltip = document.querySelector('.custom-tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    }
  });