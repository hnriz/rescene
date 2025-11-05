// settings.js - Funcionalidades completas para a página de configurações

document.addEventListener('DOMContentLoaded', function() {
  // ===== VARIÁVEIS GLOBAIS =====
  let currentSection = 'profile';
  let avatarFile = null;
  let selectedPresetAvatar = null;
  let favoriteItems = [];
  
  // ===== INICIALIZAÇÃO =====
  function initSettings() {
    initNavigation();
    initForms();
    initAvatarUpload();
    initModals();
    initFavoriteItems();
    initTwoFactorAuth();
    initSessions();
    loadUserData();
    updateCharacterCount();
    
    // Mostrar a seção ativa inicialmente
    showSection(currentSection);
  }
  
  // ===== NAVEGAÇÃO =====
  function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        
        const section = this.getAttribute('data-section');
        if (section && section !== currentSection) {
          // Atualizar navegação
          navItems.forEach(nav => nav.classList.remove('active'));
          this.classList.add('active');
          
          // Mostrar seção
          showSection(section);
          currentSection = section;
        }
      });
    });
  }
  
  function showSection(sectionId) {
    // Esconder todas as seções
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Mostrar a seção selecionada
    const targetSection = document.getElementById(`${sectionId}-section`);
    if (targetSection) {
      targetSection.classList.add('active');
      
      // Scroll para o topo da seção
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  // ===== FORMULÁRIOS =====
  function initForms() {
    // Configurar todos os formulários
    const forms = document.querySelectorAll('.settings-form');
    forms.forEach(form => {
      form.addEventListener('submit', handleFormSubmit);
      form.addEventListener('reset', handleFormReset);
    });
    
    // Configurar inputs especiais
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(input => {
      input.addEventListener('input', updateRangeValue);
      // Definir valor inicial
      updateRangeValue({ target: input });
    });
    
    // Configurar contador de caracteres da bio
    const bioTextarea = document.getElementById('bio');
    if (bioTextarea) {
      bioTextarea.addEventListener('input', updateCharacterCount);
    }
  }
  
  function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formId = form.id;
    const formData = new FormData(form);
    
    // Validação básica
    if (!validateForm(form)) {
      showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }
    
    // Validações específicas por formulário
    if (formId === 'password-form' && !validatePasswordForm()) {
      return;
    }
    
    // Simular envio (substituir por API real)
    simulateFormSubmit(form)
      .then(() => {
        showNotification('Configurações salvas com sucesso!', 'success');
        // Atualizar UI conforme necessário
        updateUIAfterSave(formId);
      })
      .catch(error => {
        showNotification('Erro ao salvar configurações. Tente novamente.', 'error');
        console.error('Form submission error:', error);
      });
  }
  
  function handleFormReset(e) {
    const form = e.target;
    const confirmReset = confirm('Tem certeza que deseja descartar todas as alterações?');
    
    if (!confirmReset) {
      e.preventDefault();
    } else {
      // Recarregar dados do usuário após reset
      setTimeout(() => loadUserData(), 100);
    }
  }
  
  function validateForm(form) {
    let isValid = true;
    const requiredInputs = form.querySelectorAll('[required]');
    
    requiredInputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        highlightError(input);
      } else {
        clearError(input);
      }
    });
    
    return isValid;
  }
  
  function validatePasswordForm() {
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');
    let isValid = true;
    
    // Verificar se as senhas coincidem
    if (newPassword.value !== confirmPassword.value) {
      isValid = false;
      highlightError(confirmPassword, 'As senhas não coincidem');
    } else {
      clearError(confirmPassword);
    }
    
    // Verificar força da senha
    if (newPassword.value.length > 0 && newPassword.value.length < 8) {
      isValid = false;
      highlightError(newPassword, 'A senha deve ter pelo menos 8 caracteres');
    }
    
    return isValid;
  }
  
  function highlightError(input, message = 'Este campo é obrigatório') {
    input.classList.add('error');
    
    // Adicionar mensagem de erro se não existir
    let errorMsg = input.nextElementSibling;
    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
      errorMsg = document.createElement('div');
      errorMsg.className = 'error-message';
      errorMsg.textContent = message;
      input.parentNode.insertBefore(errorMsg, input.nextSibling);
    } else {
      errorMsg.textContent = message;
    }
  }
  
  function clearError(input) {
    input.classList.remove('error');
    
    // Remover mensagem de erro se existir
    const errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains('error-message')) {
      errorMsg.remove();
    }
  }
  
  function simulateFormSubmit(form) {
    const formId = form.id;
    
    return new Promise((resolve, reject) => {
      // Simular delay de rede
      setTimeout(() => {
        // Simular sucesso (90% das vezes)
        if (Math.random() > 0.1) {
          // Processamentos específicos por formulário
          if (formId === 'avatar-form' && (avatarFile || selectedPresetAvatar)) {
            processAvatarUpload();
          }
          
          resolve({ success: true, form: formId });
        } else {
          reject(new Error('Falha na rede'));
        }
      }, 1000);
    });
  }
  
  function updateUIAfterSave(formId) {
    // Atualizações específicas para cada formulário
    switch (formId) {
      case 'profile-form':
        // Atualizar dados do usuário na UI
        const username = document.getElementById('username').value;
        const displayName = document.getElementById('displayname').value;
        updateProfileInfo(username, displayName);
        break;
        
      case 'password-form':
        // Limpar campos de senha
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';
        break;
        
      case 'avatar-form':
        // Resetar estados do avatar
        avatarFile = null;
        selectedPresetAvatar = null;
        break;
        
      case 'language-form':
        // Aplicar preferências de idioma
        applyLanguagePreferences();
        break;
    }
  }
  
  function updateProfileInfo(username, displayName) {
    // Atualizar onde quer que o nome de usuário e display name apareçam
    const usernameElements = document.querySelectorAll('.username');
    const displayNameElements = document.querySelectorAll('.display-name');
    
    usernameElements.forEach(el => {
      el.textContent = `@${username}`;
    });
    
    displayNameElements.forEach(el => {
      el.textContent = displayName;
    });
  }
  
  function applyLanguagePreferences() {
    const interfaceLang = document.getElementById('interface-language').value;
    const dateFormat = document.getElementById('date-format').value;
    
    showNotification(`Preferências de idioma salvas: ${interfaceLang}`, 'success');
    
    // Aqui você aplicaria as mudanças de idioma e formato na interface
    // Isso seria implementado com uma biblioteca de i18n em um projeto real
  }
  
  function updateRangeValue(e) {
    const input = e.target;
    const valueDisplay = input.nextElementSibling;
    
    if (valueDisplay && valueDisplay.classList.contains('range-value')) {
      valueDisplay.textContent = input.value;
    }
  }
  
  function updateCharacterCount() {
    const bioTextarea = document.getElementById('bio');
    const charCount = document.getElementById('bio-chars');
    
    if (bioTextarea && charCount) {
      const count = bioTextarea.value.length;
      charCount.textContent = count;
      
      // Alerta se estiver perto do limite
      if (count > 450) {
        charCount.style.color = '#e74c3c';
      } else {
        charCount.style.color = 'rgba(255, 255, 255, 0.6)';
      }
    }
  }
  
  // ===== AVATAR =====
  function initAvatarUpload() {
    const avatarUpload = document.getElementById('avatar-upload');
    const avatarPreview = document.getElementById('avatar-preview');
    const resetAvatarBtn = document.getElementById('reset-avatar');
    const removeAvatarBtn = document.getElementById('remove-avatar');
    const avatarForm = document.getElementById('avatar-form');
    
    if (avatarUpload) {
      avatarUpload.addEventListener('change', handleAvatarUpload);
    }
    
    if (resetAvatarBtn) {
      resetAvatarBtn.addEventListener('click', resetAvatar);
    }
    
    if (removeAvatarBtn) {
      removeAvatarBtn.addEventListener('click', removeAvatar);
    }
    
    if (avatarForm) {
      avatarForm.addEventListener('submit', handleAvatarSubmit);
    }
    
    // Configurar avatares pré-definidos
    const presetAvatars = document.querySelectorAll('.preset-avatar');
    presetAvatars.forEach(avatar => {
      avatar.addEventListener('click', selectPresetAvatar);
    });
  }
  
  function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Verificar se é uma imagem
    if (!file.type.match('image.*')) {
      showNotification('Por favor, selecione um arquivo de imagem.', 'error');
      return;
    }
    
    // Verificar tamanho do arquivo (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification('A imagem deve ter menos de 5MB.', 'error');
      return;
    }
    
    avatarFile = file;
    selectedPresetAvatar = null; // Resetar avatar pré-definido se houver
    
    // Pré-visualizar imagem
    const reader = new FileReader();
    reader.onload = function(e) {
      const avatarPreview = document.getElementById('avatar-preview');
      if (avatarPreview) {
        avatarPreview.src = e.target.result;
      }
    };
    reader.readAsDataURL(file);
    
    showNotification('Imagem carregada com sucesso! Clique em "Aplicar avatar" para salvar.', 'success');
  }
  
  function resetAvatar() {
    const avatarPreview = document.getElementById('avatar-preview');
    const avatarUpload = document.getElementById('avatar-upload');
    
    if (avatarPreview) {
      avatarPreview.src = '../src/img/icon.jpg'; // Avatar padrão
    }
    
    if (avatarUpload) {
      avatarUpload.value = '';
    }
    
    avatarFile = null;
    selectedPresetAvatar = null;
    showNotification('Avatar redefinido para a imagem padrão.', 'info');
  }
  
  function removeAvatar() {
    const avatarPreview = document.getElementById('avatar-preview');
    const avatarUpload = document.getElementById('avatar-upload');
    
    if (avatarPreview) {
      avatarPreview.src = '../src/img/avatar-placeholder.jpg'; // Imagem placeholder
    }
    
    if (avatarUpload) {
      avatarUpload.value = '';
    }
    
    avatarFile = null;
    selectedPresetAvatar = null;
    showNotification('Avatar removido. Uma imagem padrão será exibida.', 'info');
  }
  
  function selectPresetAvatar() {
    const avatarId = this.getAttribute('data-avatar');
    const avatarImg = this.querySelector('img');
    if (!avatarImg) return;
    
    const avatarPreview = document.getElementById('avatar-preview');
    if (avatarPreview) {
      avatarPreview.src = avatarImg.src;
    }
    
    avatarFile = null; // Reset do arquivo
    selectedPresetAvatar = avatarId;
    showNotification('Avatar pré-definido selecionado! Clique em "Aplicar avatar" para salvar.', 'success');
  }
  
  function handleAvatarSubmit(e) {
    e.preventDefault();
    
    if (!avatarFile && !selectedPresetAvatar) {
      showNotification('Por favor, selecione um avatar para upload ou escolha um pré-definido.', 'error');
      return;
    }
    
    // Simular upload do avatar
    const form = e.target;
    simulateFormSubmit(form)
      .then(() => {
        showNotification('Avatar atualizado com sucesso!', 'success');
      })
      .catch(error => {
        showNotification('Erro ao atualizar avatar. Tente novamente.', 'error');
      });
  }
  
  function processAvatarUpload() {
    // Em uma aplicação real, aqui enviaríamos o arquivo para o servidor
    console.log('Processando upload do avatar...');
    
    if (avatarFile) {
      console.log('Upload de arquivo:', avatarFile.name);
    } else if (selectedPresetAvatar) {
      console.log('Avatar pré-definido selecionado:', selectedPresetAvatar);
    }
  }
  
  // ===== FAVORITOS =====
  function initFavoriteItems() {
    const favoriteButtons = document.querySelectorAll('.add-favorite');
    favoriteButtons.forEach(button => {
      button.addEventListener('click', addFavoriteItem);
    });
  }
  
  function addFavoriteItem() {
    const type = this.getAttribute('data-type');
    let title = '';
    
    switch (type) {
      case 'movie':
        title = prompt('Digite o nome do filme favorito:');
        break;
      case 'series':
        title = prompt('Digite o nome da série favorita:');
        break;
      case 'director':
        title = prompt('Digite o nome do diretor favorito:');
        break;
    }
    
    if (title && title.trim() !== '') {
      favoriteItems.push({
        type: type,
        title: title.trim(),
        id: Date.now() // ID único
      });
      
      updateFavoritesDisplay();
      showNotification(`${type === 'movie' ? 'Filme' : type === 'series' ? 'Série' : 'Diretor'} adicionado aos favoritos!`, 'success');
    }
  }
  
  function updateFavoritesDisplay() {
    // Esta função atualizaria a exibição dos favoritos
    // Em uma aplicação real, você criaria elementos para cada favorito
    console.log('Favoritos atualizados:', favoriteItems);
  }
  
  // ===== AUTENTICAÇÃO DE DOIS FATORES =====
  function initTwoFactorAuth() {
    const enable2faBtn = document.getElementById('enable-2fa');
    if (enable2faBtn) {
      enable2faBtn.addEventListener('click', enableTwoFactorAuth);
    }
  }
  
  function enableTwoFactorAuth() {
    showNotification('Iniciando configuração da autenticação de dois fatores...', 'info');
    
    // Simular processo de configuração
    setTimeout(() => {
      const statusIndicator = document.querySelector('.status-indicator');
      const statusText = document.querySelector('.two-factor-status span');
      const enableBtn = document.getElementById('enable-2fa');
      
      if (statusIndicator && statusText && enableBtn) {
        statusIndicator.classList.remove('inactive');
        statusIndicator.classList.add('active');
        statusText.textContent = 'Autenticação de dois fatores ativada';
        enableBtn.textContent = 'Gerenciar autenticação de dois fatores';
        
        showNotification('Autenticação de dois fatores ativada com sucesso!', 'success');
      }
    }, 2000);
  }
  
  // ===== SESSÕES =====
  function initSessions() {
    const terminateButtons = document.querySelectorAll('.session-terminate');
    terminateButtons.forEach(button => {
      button.addEventListener('click', terminateSession);
    });
  }
  
  function terminateSession() {
    const sessionItem = this.closest('.session-item');
    const deviceName = sessionItem.querySelector('h4').textContent;
    
    if (confirm(`Tem certeza que deseja encerrar a sessão do ${deviceName}?`)) {
      // Simular encerramento de sessão
      sessionItem.style.opacity = '0.5';
      this.textContent = 'Encerrando...';
      this.disabled = true;
      
      setTimeout(() => {
        sessionItem.remove();
        showNotification(`Sessão do ${deviceName} encerrada com sucesso.`, 'success');
      }, 1500);
    }
  }
  
  // ===== MODAIS =====
  function initModals() {
    const modal = document.getElementById('confirmation-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const modalCancel = document.getElementById('modal-cancel');
    
    // Botões que abrem modais
    const dangerButtons = document.querySelectorAll('.btn-danger');
    dangerButtons.forEach(button => {
      button.addEventListener('click', function() {
        const action = this.getAttribute('data-action');
        openModal(action);
      });
    });
    
    // Fechar modal
    if (modalOverlay) {
      modalOverlay.addEventListener('click', closeModal);
    }
    
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }
    
    if (modalCancel) {
      modalCancel.addEventListener('click', closeModal);
    }
    
    // Confirmar ação no modal
    const modalConfirm = document.getElementById('modal-confirm');
    if (modalConfirm) {
      modalConfirm.addEventListener('click', handleModalConfirm);
    }
  }
  
  function openModal(action) {
    const modal = document.getElementById('confirmation-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalConfirm = document.getElementById('modal-confirm');
    
    if (!modal || !modalTitle || !modalMessage) return;
    
    // Configurar mensagem baseada na ação
    switch (action) {
      case 'deactivate':
        modalTitle.textContent = 'Desativar Conta';
        modalMessage.textContent = 'Tem certeza que deseja desativar sua conta? Você poderá reativá-la fazendo login novamente.';
        modalConfirm.textContent = 'Desativar';
        break;
        
      case 'delete':
        modalTitle.textContent = 'Excluir Conta Permanentemente';
        modalMessage.textContent = 'Tem certeza que deseja excluir sua conta permanentemente? Esta ação não pode ser desfeita e todos os seus dados serão perdidos.';
        modalConfirm.textContent = 'Excluir';
        break;
        
      default:
        modalTitle.textContent = 'Confirmar Ação';
        modalMessage.textContent = 'Tem certeza que deseja realizar esta ação?';
        modalConfirm.textContent = 'Confirmar';
    }
    
    // Armazenar ação atual
    modal.setAttribute('data-action', action);
    
    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  }
  
  function closeModal() {
    const modal = document.getElementById('confirmation-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restaurar scroll
    }
  }
  
  function handleModalConfirm() {
    const modal = document.getElementById('confirmation-modal');
    const action = modal.getAttribute('data-action');
    
    closeModal();
    
    // Executar ação baseada no tipo
    switch (action) {
      case 'deactivate':
        deactivateAccount();
        break;
        
      case 'delete':
        deleteAccount();
        break;
    }
  }
  
  function deactivateAccount() {
    // Simular desativação de conta
    showNotification('Sua conta foi desativada com sucesso.', 'success');
    
    // Redirecionar após um delay
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 2000);
  }
  
  function deleteAccount() {
    // Simular exclusão de conta (em um caso real, isso faria uma requisição à API)
    showNotification('Sua conta está sendo excluída...', 'info');
    
    // Simular processo de exclusão
    setTimeout(() => {
      showNotification('Conta excluída permanentemente.', 'success');
      
      // Redirecionar para a página inicial
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 1500);
    }, 3000);
  }
  
  // ===== NOTIFICAÇÕES =====
  function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="notification-icon ${getNotificationIcon(type)}"></i>
        <span>${message}</span>
      </div>
    `;
    
    // Estilos da notificação
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '1001';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.color = '#fff';
    notification.style.fontWeight = '500';
    notification.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    notification.style.animation = 'slideIn 0.3s ease';
    
    // Cores baseadas no tipo
    switch (type) {
      case 'success':
        notification.style.background = '#27ae60';
        break;
      case 'error':
        notification.style.background = '#e74c3c';
        break;
      case 'warning':
        notification.style.background = '#f39c12';
        break;
      default:
        notification.style.background = '#3498db';
    }
    
    document.body.appendChild(notification);
    
    // Remover após 5 segundos
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 300);
      }
    }, 5000);
  }
  
  function getNotificationIcon(type) {
    switch (type) {
      case 'success':
        return 'fas fa-check-circle';
      case 'error':
        return 'fas fa-exclamation-circle';
      case 'warning':
        return 'fas fa-exclamation-triangle';
      default:
        return 'fas fa-info-circle';
    }
  }
  
  // ===== CARREGAMENTO DE DADOS =====
  function loadUserData() {
    // Simular carregamento de dados do usuário
    // Em uma aplicação real, isso viria de uma API
    
    const userData = {
      username: 'nomeusuario',
      displayName: 'Nome de Exibição',
      email: 'usuario@email.com',
      bio: 'Descrição sobre mim e meus gostos cinematográficos...',
      pronouns: 'ele/dele',
      avatar: '../src/img/icon.jpg',
      language: 'pt-BR',
      contentLanguage: 'pt-BR',
      subtitleLanguage: 'pt-BR',
      dateFormat: 'dd/MM/yyyy',
      timeFormat: '24'
    };
    
    // Preencher formulário de perfil
    document.getElementById('username').value = userData.username;
    document.getElementById('displayname').value = userData.displayName;
    document.getElementById('email').value = userData.email;
    document.getElementById('bio').value = userData.bio;
    document.getElementById('pronouns').value = userData.pronouns;
    
    // Preencher preferências de idioma
    document.getElementById('interface-language').value = userData.language;
    document.getElementById('content-language').value = userData.contentLanguage;
    document.getElementById('subtitle-language').value = userData.subtitleLanguage;
    document.getElementById('date-format').value = userData.dateFormat;
    document.getElementById('time-format').value = userData.timeFormat;
    
    // Atualizar avatar
    const avatarPreview = document.getElementById('avatar-preview');
    if (avatarPreview) {
      avatarPreview.src = userData.avatar;
    }
    
    // Atualizar contador de caracteres
    updateCharacterCount();
    
    // Atualizar informações do usuário na UI
    updateProfileInfo(userData.username, userData.displayName);
  }
  
  // ===== OUTRAS FUNCIONALIDADES =====
  function initOtherFeatures() {
    // Alternar visibilidade de senha
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.innerHTML = '<i class="fas fa-eye"></i>';
      toggle.style.background = 'none';
      toggle.style.border = 'none';
      toggle.style.color = 'var(--text-muted)';
      toggle.style.position = 'absolute';
      toggle.style.right = '10px';
      toggle.style.top = '50%';
      toggle.style.transform = 'translateY(-50%)';
      toggle.style.cursor = 'pointer';
      
      input.parentNode.style.position = 'relative';
      input.parentNode.appendChild(toggle);
      
      toggle.addEventListener('click', function() {
        if (input.type === 'password') {
          input.type = 'text';
          toggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
          input.type = 'password';
          toggle.innerHTML = '<i class="fas fa-eye"></i>';
        }
      });
    });
    
    // Tooltips
    initTooltips();
  }
  
  function initTooltips() {
    const elementsWithTooltip = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltip.forEach(element => {
      element.addEventListener('mouseenter', showTooltip);
      element.addEventListener('mouseleave', hideTooltip);
    });
  }
  
  function showTooltip(e) {
    const tooltipText = this.getAttribute('data-tooltip');
    if (!tooltipText) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    
    // Estilos do tooltip
    tooltip.style.position = 'absolute';
    tooltip.style.background = 'rgba(28, 27, 37, 0.95)';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '8px 12px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '0.85rem';
    tooltip.style.zIndex = '1000';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    tooltip.style.pointerEvents = 'none';
    
    document.body.appendChild(tooltip);
    
    // Posicionar tooltip
    const rect = this.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
    
    // Armazenar referência para remoção
    this.tooltip = tooltip;
  }
  
  function hideTooltip() {
    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = null;
    }
  }
  
  // ===== INICIALIZAR TUDO =====
  initSettings();
  initOtherFeatures();
  
  // Adicionar estilos de animação para notificações
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-icon {
      margin-right: 10px;
    }
    
    .status-indicator {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 8px;
    }
    
    .status-indicator.active {
      background-color: #27ae60;
    }
    
    .status-indicator.inactive {
      background-color: #e74c3c;
    }
  `;
  document.head.appendChild(style);
});