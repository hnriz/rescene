// login-hub.js - Funcionalidades para página de login hub melhorada

document.addEventListener('DOMContentLoaded', function () {
  // ===== VARIÁVEIS GLOBAIS =====
  let currentForm = 'login';
  let isAnimating = false;

  // ===== ELEMENTOS DO DOM =====
  const authModal = document.getElementById('authModal');
  const stellarSweeper = document.getElementById('stellarSweeper');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  const switchToRegister = document.getElementById('switchToRegister');
  const switchToLogin = document.getElementById('switchToLogin');
  const closeModal = document.getElementById('closeModal');
  const loginAuthForm = document.getElementById('loginAuthForm');
  const registerAuthForm = document.getElementById('registerAuthForm');
  const toggleLoginPassword = document.getElementById('toggleLoginPassword');
  const toggleRegisterPassword = document.getElementById('toggleRegisterPassword');
  const passwordStrengthFill = document.getElementById('passwordStrengthFill');
  const passwordStrengthText = document.getElementById('passwordStrengthText');
  const registerPassword = document.getElementById('registerPassword');
  const cometsBackground = document.getElementById('cometsBackground');

  // ===== INICIALIZAÇÃO =====
  init();

  function init() {
    setupEventListeners();
    // createComets(); // Removido
    // createFireflies(); // Removido - agora é feito pelo particles-background.js
    // startBackgroundAnimations(); // Removido
    setupInputAnimations();
    // enhanceCinematicElements(); // Removido
  }

  // ===== CONFIGURAÇÃO DE EVENT LISTENERS =====
  function setupEventListeners() {
    // Alternância entre abas
    loginTab.addEventListener('click', () => switchForm('login'));
    registerTab.addEventListener('click', () => switchForm('register'));

    // Alternância através dos links
    switchToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      switchForm('register');
    });

    switchToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      switchForm('login');
    });

    // Fechar modal
    closeModal.addEventListener('click', closeAuthModal);

    // Alternância de visibilidade de senha
    toggleLoginPassword.addEventListener('click', togglePasswordVisibility);
    toggleRegisterPassword.addEventListener('click', togglePasswordVisibility);

    // Força da senha
    registerPassword.addEventListener('input', checkPasswordStrength);

    // Envio de formulários
    loginAuthForm.addEventListener('submit', handleLoginSubmit);
    registerAuthForm.addEventListener('submit', handleRegisterSubmit);

    // Fechar modal clicando fora
    document.addEventListener('click', (e) => {
      if (e.target === authModal) {
        closeAuthModal();
      }
    });

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAuthModal();
      }
    });
  }

  // ===== ANIMAÇÃO DE FUNDO COM COMETAS =====
  function createComets() {
    const cometCount = 15;

    for (let i = 0; i < cometCount; i++) {
      const comet = document.createElement('div');
      comet.className = 'comet';

      // Propriedades aleatórias para os cometas
      const size = Math.random() * 150 + 50;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 30;
      const startY = Math.random() * 100;
      const drift = (Math.random() - 0.5) * 50;
      const rotation = (Math.random() - 0.5) * 45;
      const tailLength = Math.random() * 100 + 50;

      comet.style.cssText = `
          --size: ${size}px;
          --duration: ${duration}s;
          --delay: ${delay}s;
          --start-y: ${startY}%;
          --drift: ${drift}px;
          --rotation: ${rotation}deg;
          --tail-length: ${tailLength}px;
        `;

      cometsBackground.appendChild(comet);
    }
  }

  // ===== CRIAR VAGALUMES/ESTRELAS NO FUNDO =====
  function createFireflies() {
    const fireflyCount = 100;
    const container = document.body;

    for (let i = 0; i < fireflyCount; i++) {
      const firefly = document.createElement('div');
      firefly.className = 'firefly';

      // Posição aleatória
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;

      // Propriedades de animação aleatórias
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 20;
      const translateX = (Math.random() - 0.5) * 100;
      const translateY = (Math.random() - 0.5) * 100;
      const rotation = (Math.random() - 0.5) * 180;
      const size = Math.random() * 3 + 1;

      firefly.style.cssText = `
          left: ${posX}%;
          top: ${posY}%;
          width: ${size}px;
          height: ${size}px;
          --translate-x: ${translateX}vw;
          --translate-y: ${translateY}vh;
          --rotation: ${rotation}deg;
          animation: fireflyFloat ${duration}s ease-in-out ${delay}s infinite;
        `;

      container.appendChild(firefly);
    }
  }

  function startBackgroundAnimations() {
    // Animação pulsante para elementos cinematográficos
    const cinematicElements = document.querySelectorAll('.film-reel, .clapboard, .oscar-trophy');
    cinematicElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 1.5}s`;
    });
  }

  function enhanceCinematicElements() {
    // Adicionar brilho e animação melhorada aos elementos cinematográficos
    const elements = document.querySelectorAll('.film-reel, .clapboard, .oscar-trophy');
    elements.forEach(el => {
      el.classList.add('enhanced-pulse');

      // Adicionar brilho suave
      const glow = document.createElement('div');
      glow.style.cssText = `
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          background: radial-gradient(circle, rgba(250, 218, 94, 0.2) 0%, transparent 70%);
          animation: twinkle 3s ease-in-out infinite;
        `;

      el.appendChild(glow);
    });
  }

  function setupInputAnimations() {
    // Adicionar classe focused quando o input estiver preenchido
    document.querySelectorAll('.input-field-wide input').forEach(input => {
      if (input.value) {
        input.parentElement.classList.add('focused');
      }

      input.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
      });

      input.addEventListener('blur', function () {
        if (this.value === '') {
          this.parentElement.classList.remove('focused');
        }
      });
    });
  }

  // ===== ALTERNÂNCIA ENTRE FORMULÁRIOS =====
  function switchForm(formType) {
    if (currentForm === formType) return;

    currentForm = formType;

    // Ativar aba correspondente
    if (formType === 'login') {
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
      registerForm.classList.remove('active');
      loginForm.classList.add('active');
    } else {
      registerTab.classList.add('active');
      loginTab.classList.remove('active');
      loginForm.classList.remove('active');
      registerForm.classList.add('active');
    }
  }


  function executeMegaStarSweep(callback) {
    // Criar estrela mega brilhante
    const megaStar = document.createElement('div');
    megaStar.className = 'mega-star';

    // Posicionar a estrela aleatoriamente na vertical
    const sweepY = Math.random() * 50 + 25; // Entre 25% e 75%
    megaStar.style.top = `${sweepY}%`;

    document.body.appendChild(megaStar);

    // Forçar reflow
    void megaStar.offsetWidth;

    // Aplicar animação
    megaStar.style.animation = 'megaStarSweep 1.2s ease-in-out forwards';

    // Executar callback ao finalizar
    setTimeout(() => {
      megaStar.remove();
      callback();
    }, 1200);
  }

  // ===== FUNÇÕES DE FORMULÁRIO =====
  function togglePasswordVisibility(e) {
    const button = e.currentTarget;
    const input = button.closest('.input-field-wide').querySelector('input');
    const icon = button.querySelector('i');

    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
  }

  function checkPasswordStrength() {
    const password = registerPassword.value;
    let strength = 0;
    let text = '';

    // Verificar comprimento
    if (password.length > 5) strength++;
    if (password.length > 8) strength++;

    // Verificar caracteres especiais
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    // Verificar números e letras
    if (/[0-9]/.test(password) && /[a-zA-Z]/.test(password)) strength++;

    // Verificar maiúsculas e minúsculas
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;

    // Atualizar visualização
    passwordStrengthFill.className = 'strength-fill-wide';
    passwordStrengthText.className = 'strength-text-wide';

    if (password.length === 0) {
      text = 'Força da senha';
    } else {
      switch (strength) {
        case 0:
        case 1:
          text = 'Muito fraca';
          passwordStrengthFill.classList.add('strength-0');
          passwordStrengthText.classList.add('text-strength-0');
          break;
        case 2:
          text = 'Fraca';
          passwordStrengthFill.classList.add('strength-1');
          passwordStrengthText.classList.add('text-strength-1');
          break;
        case 3:
          text = 'Moderada';
          passwordStrengthFill.classList.add('strength-2');
          passwordStrengthText.classList.add('text-strength-2');
          break;
        case 4:
          text = 'Forte';
          passwordStrengthFill.classList.add('strength-3');
          passwordStrengthText.classList.add('text-strength-3');
          break;
        default:
          text = 'Muito forte';
          passwordStrengthFill.classList.add('strength-4');
          passwordStrengthText.classList.add('text-strength-4');
      }
    }

    passwordStrengthText.textContent = text;
  }

  function handleLoginSubmit(e) {
    e.preventDefault();

    const submitBtn = loginAuthForm.querySelector('.submit-btn-wide');
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Validação básica
    if (!email || !password) {
      showErrorMessage('Por favor, preencha todos os campos');
      return;
    }

    // Simular carregamento
    submitBtn.classList.add('loading');

    // Simular requisição de login
    setTimeout(() => {
      submitBtn.classList.remove('loading');

      // Aqui viria a lógica real de autenticação
      console.log('Tentativa de login:', { email, password });

      // Simular sucesso
      showSuccessMessage('Login realizado com sucesso! Redirecionando...');

      // Redirecionar após sucesso
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 2000);
    }, 2000);
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();

    const submitBtn = registerAuthForm.querySelector('.submit-btn-wide');
    const name = document.getElementById('registerName').value;
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const termsAgree = document.getElementById('termsAgree').checked;

    // Validação básica
    if (!name || !username || !email || !password || !confirmPassword) {
      showErrorMessage('Por favor, preencha todos os campos');
      return;
    }

    if (!termsAgree) {
      showErrorMessage('Você precisa aceitar os Termos de Serviço');
      return;
    }

    if (password !== confirmPassword) {
      showErrorMessage('As senhas não coincidem');
      return;
    }

    // Simular carregamento
    submitBtn.classList.add('loading');

    // Simular requisição de registro
    setTimeout(() => {
      submitBtn.classList.remove('loading');

      // Aqui viria a lógica real de registro
      console.log('Tentativa de registro:', { name, username, email, password });

      // Simular sucesso
      showSuccessMessage('Conta criada com sucesso! Redirecionando...');

      // Redirecionar após sucesso
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 2000);
    }, 2000);
  }

  // ===== FEEDBACK VISUAL =====
  function showSuccessMessage(message) {
    // Criar elemento de mensagem
    const messageEl = document.createElement('div');
    messageEl.className = 'success-message';
    messageEl.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
      `;

    // Estilizar
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
      `;

    document.body.appendChild(messageEl);

    // Remover após 3 segundos
    setTimeout(() => {
      messageEl.style.animation = 'slideOut 0.3s ease-out forwards';
      setTimeout(() => {
        if (messageEl.parentNode) {
          messageEl.parentNode.removeChild(messageEl);
        }
      }, 300);
    }, 3000);
  }

  function showErrorMessage(message) {
    // Criar elemento de mensagem
    const messageEl = document.createElement('div');
    messageEl.className = 'error-message';
    messageEl.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
      `;

    // Estilizar
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--error);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
      `;

    document.body.appendChild(messageEl);

    // Remover após 3 segundos
    setTimeout(() => {
      messageEl.style.animation = 'slideOut 0.3s ease-out forwards';
      setTimeout(() => {
        if (messageEl.parentNode) {
          messageEl.parentNode.removeChild(messageEl);
        }
      }, 300);
    }, 3000);
  }

  function closeAuthModal() {
    authModal.style.animation = 'slideOut 0.5s ease-out forwards';

    setTimeout(() => {
      // Redirecionar para a página inicial
      window.location.href = '../index.html';
    }, 500);
  }

  // ===== EFEITOS EXTRAS =====
  // Efeito de flutuação suave no modal
  let floatDirection = 1;
  setInterval(() => {
    const floatValue = Math.sin(Date.now() / 1500) * 8;
    authModal.style.transform = `translateY(${floatValue}px)`;
  }, 100);

  // Efeito de brilho interativo
  document.querySelectorAll('.tab-btn-wide, .submit-btn-wide, .social-btn-wide').forEach(element => {
    element.addEventListener('mouseenter', function () {
      this.classList.add('enhanced-pulse');
    });

    element.addEventListener('mouseleave', function () {
      this.classList.remove('enhanced-pulse');
    });
  });

  // Efeito de digitação nos placeholders
  const typewriterElements = document.querySelectorAll('.form-header-wide h2');
  typewriterElements.forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }

    // Iniciar apenas quando o elemento estiver visível
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        typeWriter();
        observer.disconnect();
      }
    });

    observer.observe(el);
  });
});

class ParticlesBackground {
  constructor() {
    this.particles = [];
    this.particleCount = 80; // Número de partículas
    this.container = null;
    this.init();
  }

  init() {
    // Criar container para as partículas
    this.container = document.createElement('div');
    this.container.className = 'particles-container';
    this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
            overflow: hidden;
        `;

    document.body.appendChild(this.container);

    // Criar partículas
    this.createParticles();

    // Iniciar animação
    this.animate();
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Tamanho aleatório (2px a 5px)
    const size = Math.random() * 3 + 2;

    // Posição inicial aleatória
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;

    // Cor baseada em tons dourados/amarelos (tema Rescene)
    const hue = 50; // Amarelo
    const saturation = 90;
    const lightness = Math.random() * 20 + 60; // 60-80% de luminosidade
    const alpha = Math.random() * 0.5 + 0.3; // 0.3-0.8 de opacidade

    // Configuração inicial
    particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha});
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            box-shadow: 0 0 ${size * 2}px ${size}px hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.5});
            opacity: 0;
        `;

    this.container.appendChild(particle);

    // Adicionar aos controles
    this.particles.push({
      element: particle,
      x: posX,
      y: posY,
      size: size,
      speedX: (Math.random() - 0.5) * 0.5, // Velocidade horizontal
      speedY: (Math.random() - 0.5) * 0.5, // Velocidade vertical
      opacity: alpha,
      hue: hue,
      saturation: saturation,
      lightness: lightness,
      pulseSpeed: Math.random() * 0.02 + 0.01, // Velocidade de pulsação
      pulseSize: 0
    });
  }

  animate() {
    const animateFrame = () => {
      this.updateParticles();
      requestAnimationFrame(animateFrame);
    };

    animateFrame();
  }

  updateParticles() {
    this.particles.forEach(particle => {
      // Atualizar posição
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Verificar limites e inverter direção se necessário
      if (particle.x <= 0 || particle.x >= 100) {
        particle.speedX *= -1;
        particle.x = Math.max(0, Math.min(100, particle.x));
      }

      if (particle.y <= 0 || particle.y >= 100) {
        particle.speedY *= -1;
        particle.y = Math.max(0, Math.min(100, particle.y));
      }

      // Atualizar pulsação
      particle.pulseSize += particle.pulseSpeed;
      const pulseFactor = Math.sin(particle.pulseSize) * 0.5 + 0.5;

      // Aplicar mudanças
      particle.element.style.left = `${particle.x}%`;
      particle.element.style.top = `${particle.y}%`;

      // Efeito de pulsação no tamanho e opacidade
      const currentSize = particle.size * (0.8 + pulseFactor * 0.4);
      const currentOpacity = particle.opacity * (0.5 + pulseFactor * 0.5);

      particle.element.style.width = `${currentSize}px`;
      particle.element.style.height = `${currentSize}px`;
      particle.element.style.opacity = currentOpacity;

      // Atualizar sombra com base no novo tamanho
      particle.element.style.boxShadow = `0 0 ${currentSize * 2}px ${currentSize}px hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, ${currentOpacity * 0.3})`;
    });
  }

  // Método para limpar partículas (se necessário)
  destroy() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.particles = [];
  }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  window.particlesBackground = new ParticlesBackground();
});