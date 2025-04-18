document.querySelectorAll('.actions span').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    });
  });
  
  const carrossel = document.getElementById('carrossel');
const btnEsquerda = document.getElementById('seta-esquerda');
const btnDireita = document.getElementById('seta-direita');

const cardWidth = 200 + 16; // largura do card + gap

btnEsquerda.addEventListener('click', () => {
  carrossel.scrollBy({
    left: -cardWidth * 2,
    behavior: 'smooth'
  });
});

btnDireita.addEventListener('click', () => {
  carrossel.scrollBy({
    left: cardWidth * 2,
    behavior: 'smooth'
  });
});

const carrossel2 = document.getElementById('carrossel2');
const btnEsquerda2 = document.getElementById('seta-esquerda2');
const btnDireita2 = document.getElementById('seta-direita2');

const cardWidth2 = 200 + 16; // largura do card + gap

btnEsquerda2.addEventListener('click', () => {
  carrossel2.scrollBy({
    left: -cardWidth2 * 2,
    behavior: 'smooth'
  });
});

btnDireita2.addEventListener('click', () => {
  carrossel2.scrollBy({
    left: cardWidth2 * 2,
    behavior: 'smooth'
  });
});

const carrossel3 = document.getElementById('carrossel3');
const btnEsquerda3 = document.getElementById('seta-esquerda3');
const btnDireita3 = document.getElementById('seta-direita3');

const cardWidth3 = 200 + 16; // largura do card + gap

btnEsquerda3.addEventListener('click', () => {
  carrossel3.scrollBy({
    left: -cardWidth3 * 2,
    behavior: 'smooth'
  });
});

btnDireita3.addEventListener('click', () => {
  carrossel3.scrollBy({
    left: cardWidth3 * 2,
    behavior: 'smooth'
  });
});

