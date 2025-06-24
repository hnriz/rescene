document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  

  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);
  

  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  

  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('show');
    overlay.classList.toggle('active');
    
   
    if (mobileMenu.classList.contains('show')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  

  overlay.addEventListener('click', function() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('show');
    this.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('show');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  

  const searchInput = document.querySelector('.searchBar input');
  const placeholderTexts = ["Search movies...", "Search actors...", "Search genres..."];
  let currentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typeWriter() {
    const currentText = placeholderTexts[currentIndex];
    
    if (isDeleting) {
      searchInput.placeholder = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      searchInput.placeholder = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
  
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % placeholderTexts.length;
      setTimeout(typeWriter, 500);
    } else {
      setTimeout(typeWriter, isDeleting ? 50 : 100);
    }
  }

  if (searchInput) {
    setTimeout(typeWriter, 1000);
  }
});