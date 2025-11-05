// Ativar indicador dinâmico
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.navItem');
    const navIndicator = document.querySelector('.navIndicator');
    
    function moveIndicator(element) {
      if (!element || !navIndicator) return;
      
      const itemRect = element.getBoundingClientRect();
      const containerRect = element.parentElement.getBoundingClientRect();
      
      navIndicator.style.width = `${itemRect.width}px`;
      navIndicator.style.left = `${itemRect.left - containerRect.left}px`;
    }
    
    // Inicializar com o item ativo
    const activeItem = document.querySelector('.navItem.active');
    if (activeItem && navIndicator) {
      moveIndicator(activeItem);
    }
    
    // Atualizar ao redimensionar
    window.addEventListener('resize', function() {
      const activeItem = document.querySelector('.navItem.active');
      if (activeItem && navIndicator) {
        moveIndicator(activeItem);
      }
    });
  });