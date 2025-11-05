document.addEventListener('DOMContentLoaded', function() {
    // Modal de criação de lista
    const createListBtn = document.getElementById('createListBtn');
    const createListCard = document.getElementById('createListCard');
    const createListModal = document.getElementById('createListModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelButton = document.querySelector('.cancelButton');
    const listForm = document.querySelector('.listForm');
  
    function openCreateModal() {
      createListModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  
    function closeCreateModal() {
      createListModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  
    createListBtn.addEventListener('click', openCreateModal);
    createListCard.addEventListener('click', openCreateModal);
    closeModalBtn.addEventListener('click', closeCreateModal);
    cancelButton.addEventListener('click', closeCreateModal);
  
    // Fechar modal ao clicar fora
    createListModal.addEventListener('click', function(e) {
      if (e.target === createListModal) {
        closeCreateModal();
      }
    });
  
    // Upload de imagem de capa
    const coverUpload = document.querySelector('.coverUpload');
    const coverInput = document.getElementById('listCover');
    
    coverUpload.addEventListener('click', function() {
      coverInput.click();
    });
    
    coverInput.addEventListener('change', function(e) {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          coverUpload.style.backgroundImage = `url(${e.target.result})`;
          coverUpload.style.backgroundSize = 'cover';
          coverUpload.style.backgroundPosition = 'center';
          coverUpload.querySelector('.uploadPlaceholder').style.display = 'none';
        }
        reader.readAsDataURL(e.target.files[0]);
      }
    });
  
    // Envio do formulário
    listForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const listName = document.getElementById('listName').value;
      const listDescription = document.getElementById('listDescription').value;
      const listPrivacy = document.getElementById('listPrivacy').value;
      
      // Simular criação da lista
      console.log('Criando lista:', { listName, listDescription, listPrivacy });
      
      // Fechar modal e resetar formulário
      closeCreateModal();
      listForm.reset();
      coverUpload.style.backgroundImage = '';
      coverUpload.querySelector('.uploadPlaceholder').style.display = 'block';
      
      // Mostrar mensagem de sucesso
      alert(`Lista "${listName}" criada com sucesso!`);
    });
  
    // Alternar entre visualização em grade e lista
    const viewButtons = document.querySelectorAll('.viewButton');
    const listsGrid = document.querySelector('.listsGrid');
    
    viewButtons.forEach(button => {
      button.addEventListener('click', function() {
        const viewType = this.getAttribute('data-view');
        
        // Atualizar botões ativos
        viewButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Alternar visualização
        if (viewType === 'list') {
          listsGrid.classList.add('list-view');
        } else {
          listsGrid.classList.remove('list-view');
        }
      });
    });
  
    // Ordenação de listas
    const sortSelect = document.getElementById('sortLists');
    const listCards = document.querySelectorAll('.listCard:not(.createCard)');
    
    sortSelect.addEventListener('change', function() {
      const sortBy = this.value;
      
      const sortedCards = Array.from(listCards).sort((a, b) => {
        const aValue = a.getAttribute(`data-${sortBy}`);
        const bValue = b.getAttribute(`data-${sortBy}`);
        
        if (sortBy === 'name') {
          return a.querySelector('.cardTitle').textContent.localeCompare(
            b.querySelector('.cardTitle').textContent
          );
        } else if (sortBy === 'recent') {
          return new Date(bValue) - new Date(aValue);
        } else {
          return parseInt(bValue) - parseInt(aValue);
        }
      });
      
      // Reordenar no DOM (mantendo o card de criar primeiro)
      const container = listsGrid;
      const createCard = document.querySelector('.createCard');
      
      // Remover todos os cards exceto o de criar
      listCards.forEach(card => container.removeChild(card));
      
      // Adicionar o card de criar de volta (se não estiver em modo lista)
      if (!listsGrid.classList.contains('list-view')) {
        container.appendChild(createCard);
      }
      
      // Adicionar os cards ordenados
      sortedCards.forEach(card => container.appendChild(card));
    });
  
    // Busca de listas
    const searchInput = document.querySelector('.searchBox input');
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      
      listCards.forEach(card => {
        const title = card.querySelector('.cardTitle').textContent.toLowerCase();
        const description = card.querySelector('.cardDescription').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
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
  
    // Paginação (simulada)
    const paginationButtons = document.querySelectorAll('.paginationButton:not(:disabled)');
    paginationButtons.forEach(button => {
      button.addEventListener('click', function() {
        if (this.classList.contains('active')) return;
        
        document.querySelector('.paginationButton.active').classList.remove('active');
        this.classList.add('active');
        
        // Simular carregamento de nova página
        listsGrid.style.opacity = '0.5';
        
        setTimeout(() => {
          listsGrid.style.opacity = '1';
        }, 800);
      });
    });
  });