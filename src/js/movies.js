
const config = {
  duration: 500, 
  easing: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t 
};

function smoothScroll(element, distance) {
  const start = element.scrollLeft;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / config.duration, 1);
    const easedProgress = config.easing(progress);
    
    element.scrollLeft = start + (distance * easedProgress);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}


function setupCarrossel(carrosselId, btnPrevId, btnNextId) {
  const carrossel = document.getElementById(carrosselId);
  const btnPrev = document.getElementById(btnPrevId);
  const btnNext = document.getElementById(btnNextId);
  const cardWidth = 216; 

  btnPrev.addEventListener('click', () => {
    const cardsToScroll = window.innerWidth <= 530 ? 1 : 2;
    smoothScroll(carrossel, -cardWidth * cardsToScroll);
  });

  btnNext.addEventListener('click', () => {
    const cardsToScroll = window.innerWidth <= 530 ? 1 : 2;
    smoothScroll(carrossel, cardWidth * cardsToScroll);
  });
}


document.addEventListener('DOMContentLoaded', () => {
  setupCarrossel('carrossel', 'seta-esquerda', 'seta-direita');
  setupCarrossel('carrossel2', 'seta-esquerda2', 'seta-direita2');
  setupCarrossel('carrossel3', 'seta-esquerda3', 'seta-direita3');
});