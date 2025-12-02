import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faUserPlus,
  faTimes,
  faFilm,
  faStar,
  faUser,
  faAt,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import { useParticles } from '../hooks/useParticles';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginEN = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  // Todos os hooks DEVEM estar dentro do componente
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    login: false,
    register: false,
    confirm: false
  });

  const [formData, setFormData] = useState({
    login: {
      email: '',
      password: '',
      rememberMe: false
    },
    register: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAgree: false,
      newsletterSubscribe: false
    }
  });

  const [errors, setErrors] = useState({
    login: {
      email: '',
      password: '',
      general: ''
    },
    register: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: ''
    }
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    text: 'Password strength'
  });

  const particlesContainerRef = useParticles();
  const cometsBackgroundRef = useRef(null);
  const stellarSweeperRef = useRef(null);

  // Efeito das partículas (cometas)
  useEffect(() => {
    const createComet = () => {
      if (!cometsBackgroundRef.current) return;

      const comet = document.createElement('div');
      comet.className = 'comet';

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

      cometsBackgroundRef.current.appendChild(comet);

      setTimeout(() => {
        if (cometsBackgroundRef.current?.contains(comet)) {
          cometsBackgroundRef.current.removeChild(comet);
        }
      }, 5000);
    };

    const interval = setInterval(createComet, 1000);
    return () => clearInterval(interval);
  }, []);

  // Efeito de flutuação no modal
  useEffect(() => {
    let animationFrame;

    const animate = () => {
      const floatValue = Math.sin(Date.now() / 1500) * 8;
      const modal = document.querySelector('.auth-modal-wide');
      if (modal) {
        modal.style.transform = `translateY(${floatValue}px)`;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  // Efeito de vagalumes
  useEffect(() => {
    const createFireflies = () => {
      const fireflyCount = 30;
      const container = document.querySelector('.login-hub-main');

      for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';

        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
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

        if (container) {
          container.appendChild(firefly);
        }
      }
    };

    createFireflies();
  }, []);

  // Funções do componente
  const switchForm = (formType) => {
    if (activeTab === formType) return;

    // Animação do stellar sweeper
    if (stellarSweeperRef.current) {
      stellarSweeperRef.current.style.animation = 'none';
      setTimeout(() => {
        if (stellarSweeperRef.current) {
          stellarSweeperRef.current.style.animation = 'stellarSweep 0.6s ease-out';
        }
      }, 10);
    }

    setActiveTab(formType);
  };

  const handleInputChange = (form, field, value) => {
    setFormData(prev => ({
      ...prev,
      [form]: {
        ...prev[form],
        [field]: value
      }
    }));

    // Calcular força da senha
    if (form === 'register' && field === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let score = 0;
    let text = 'Password strength';

    if (password.length === 0) {
      setPasswordStrength({ score: 0, text });
      return;
    }

    if (password.length > 5) score += 20;
    if (password.length > 8) score += 20;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 20;
    if (/[0-9]/.test(password) && /[a-zA-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 20;

    if (score >= 80) text = 'Very strong';
    else if (score >= 60) text = 'Strong';
    else if (score >= 40) text = 'Moderate';
    else if (score >= 20) text = 'Weak';
    else text = 'Very weak';

    setPasswordStrength({ score, text });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const getStrengthClass = () => {
    if (passwordStrength.score >= 75) return 'strength-4';
    if (passwordStrength.score >= 50) return 'strength-3';
    if (passwordStrength.score >= 25) return 'strength-2';
    return 'strength-1';
  };

  const getStrengthTextClass = () => {
    if (passwordStrength.score >= 75) return 'text-strength-4';
    if (passwordStrength.score >= 50) return 'text-strength-3';
    if (passwordStrength.score >= 25) return 'text-strength-2';
    return 'text-strength-1';
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Clear previous errors
    setErrors(prev => ({
      ...prev,
      login: { email: '', password: '', general: '' }
    }));

    try {
      await login(formData.login.email, formData.login.password);
      // toast.success('Login successful!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Login error:', error);
      console.log('Error response:', error.response);
      console.log('Error data:', error.response?.data);

      const errorMessage = error.response?.data?.message || 'Error logging in. Please try again.';

      // Determine which field to display the error
      if (errorMessage.includes('not found')) {
        setErrors(prev => ({
          ...prev,
          login: { ...prev.login, email: errorMessage }
        }));
      } else if (errorMessage.includes('password')) {
        setErrors(prev => ({
          ...prev,
          login: { ...prev.login, password: errorMessage }
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          login: { ...prev.login, general: errorMessage }
        }));
      }

      // toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors(prev => ({
      ...prev,
      register: { name: '', username: '', email: '', password: '', confirmPassword: '', general: '' }
    }));

    if (formData.register.username.length < 4) {
      setErrors(prev => ({
        ...prev,
        register: { ...prev.register, username: 'Username must have at least 4 characters' }
      }));
      // toast.error('Username must have at least 4 characters');
      return;
    }

    if (formData.register.password !== formData.register.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        register: { ...prev.register, confirmPassword: 'Passwords do not match!' }
      }));
      // toast.error('Passwords do not match!');
      return;
    }

    if (!formData.register.termsAgree) {
      setErrors(prev => ({
        ...prev,
        register: { ...prev.register, general: 'You need to accept the Terms of Service!' }
      }));
      // toast.error('You need to accept the Terms of Service!');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        username: formData.register.username,
        email: formData.register.email,
        password: formData.register.password,
        displayName: formData.register.name
      });

      // toast.success('Account created successfully! Welcome!');
      // Limpar formulário
      setFormData({
        ...formData,
        register: {
          name: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          termsAgree: false,
          newsletterSubscribe: false
        }
      });
      // Redirecionar para home
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Register error:', error);
      console.log('Error response:', error.response);
      console.log('Error data:', error.response?.data);

      const errorData = error.response?.data;
      
      // Check if the error response has separate errors object
      if (errorData?.errors) {
        setErrors(prev => {
          const newErrors = { ...prev.register };
          if (errorData.errors.username) {
            newErrors.username = errorData.errors.username;
          }
          if (errorData.errors.email) {
            newErrors.email = errorData.errors.email;
          }
          return {
            ...prev,
            register: newErrors
          };
        });
      } else {
        const errorMessage = errorData?.message || 'Error creating account. Please try again.';
        setErrors(prev => ({
          ...prev,
          register: { ...prev.register, general: errorMessage }
        }));
      }

      // toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implementar OAuth
  };

  const closeAuthModal = () => {
    // Implementar redirecionamento
    // window.location.href = '/';
  };

  return (
    <main className="login-hub-main">
      {/* Fundo com partículas estelares */}
      <div ref={cometsBackgroundRef} className="comets-background"></div>

      {/* Efeito de brilho cósmico */}
      <div className="cosmic-glow"></div>

      {/* Partículas modernas */}
      <div ref={particlesContainerRef} className="particles-container"></div>

      {/* Modal de Login/Registro */}
      <div className="auth-modal-wide">
        {/* Círculos decorativos */}
        <div className="modal-circle circle-1"></div>
        <div className="modal-circle circle-2"></div>
        <div className="modal-circle circle-3"></div>

        {/* Efeito de estrela com cauda para transição */}
        <div ref={stellarSweeperRef} className="stellar-sweeper">
          <div className="comet-head"></div>
          <div className="comet-tail"></div>
          <div className="sparkle-1"></div>
          <div className="sparkle-2"></div>
          <div className="sparkle-3"></div>
        </div>

        {/* Conteúdo do Modal */}
        <div className="modal-content-wide">
          {/* Cabeçalho com abas */}
          <div className="modal-header-wide">
            <div className="tabs-container-wide">
              <button
                className={`tab-btn-wide ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => switchForm('login')}
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                <span>Entrar na Comunidade</span>
              </button>
              <button
                className={`tab-btn-wide ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => switchForm('register')}
              >
                <FontAwesomeIcon icon={faUserPlus} />
                <span>Criar Conta</span>
              </button>
            </div>
            
          </div>

          {/* Formulário de Login */}
          <div className={`form-container-wide login-form ${activeTab === 'login' ? 'active' : ''}`}>
            <div className="form-header-wide">
              <div className="form-icon">
                <FontAwesomeIcon icon={faFilm} />
              </div>
              <h2>Welcome back, Cinephile!</h2>
              <p>Log in to your account to continue your cinematic journey</p>
            </div>

            <form className="auth-form-wide" onSubmit={handleLoginSubmit}>
              <div className="input-row">
                <div className="input-group-wide">
                  <div className="input-field-wide">
                    <input
                      type="email"
                      id="loginEmail"
                      required
                      autoComplete="email"
                      value={formData.login.email}
                      onChange={(e) => handleInputChange('login', 'email', e.target.value)}
                    />
                    <label htmlFor="loginEmail">E-mail</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div className="input-underline"></div>
                  </div>
                  {errors.login.email && <span className="error-message">{errors.login.email}</span>}
                </div>

                <div className="input-group-wide">
                  <div className="input-field-wide">
                    <input
                      type={showPassword.login ? "text" : "password"}
                      id="loginPassword"
                      required
                      autoComplete="current-password"
                      value={formData.login.password}
                      onChange={(e) => handleInputChange('login', 'password', e.target.value)}
                    />
                    <label htmlFor="loginPassword">Password</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faLock} />
                    </div>
                    <div className="input-underline"></div>
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => togglePasswordVisibility('login')}
                    >
                      <FontAwesomeIcon icon={showPassword.login ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  {errors.login.password && <span className="error-message">{errors.login.password}</span>}
                </div>
              </div>

              <div className="form-options-wide">
                {/* <label className="checkbox-container-wide">
                  <input 
                    type="checkbox" 
                    id="rememberMe"
                    checked={formData.login.rememberMe}
                    onChange={(e) => handleInputChange('login', 'rememberMe', e.target.checked)}
                  />
                  <span className="checkmark-wide"></span>
                  Manter-me conectado
                </label> */}
                {/* <a href="#" className="forgot-password-wide">Forgot my password</a> */}
              </div>

              <button
                type="submit"
                className={`submit-btn-wide primary ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                <span className="btn-text-login">
                  {isLoading ? 'Carregando...' : 'Explorar o Universo Rescene'}
                </span>
                <div className="btn-loader">
                  <div className="loader-dot"></div>
                  <div className="loader-dot"></div>
                  <div className="loader-dot"></div>
                </div>
              </button>

              {errors.login.general && <span className="error-message">{errors.login.general}</span>}

              {/* <div className="divider-wide">
                <span>ou continue com</span>
              </div>

              <div className="social-auth-wide">
                <button 
                  type="button" 
                  className="social-btn-wide google-btn"
                  onClick={() => handleSocialLogin('google')}
                >
                  <i className="fab fa-google"></i>
                  <span>Google</span>
                </button>
                <button 
                  type="button" 
                  className="social-btn-wide facebook-btn"
                  onClick={() => handleSocialLogin('facebook')}
                >
                  <i className="fab fa-facebook-f"></i>
                  <span>Facebook</span>
                </button>
                <button 
                  type="button" 
                  className="social-btn-wide twitter-btn"
                  onClick={() => handleSocialLogin('twitter')}
                >
                  <i className="fab fa-x-twitter"></i>
                  <span>Twitter</span>
                </button>
              </div> */}
            </form>

            <div className="form-footer-wide">
              <p>New on Rescene?</p>
              <button
                className="switch-form-link"
                onClick={() => switchForm('register')}
              >
                Create an account
              </button>
            </div>
          </div>

          {/* Formulário de Registro */}
          <div className={`form-container-wide register-form ${activeTab === 'register' ? 'active' : ''}`}>
            <div className="form-header-wide">
              <div className="form-icon">
                <FontAwesomeIcon icon={faStar} />
              </div>
              <h2>Join Our Community!</h2>
              <p>Create your account to discover, rate, and share movies</p>
            </div>

            <form className="auth-form-wide" onSubmit={handleRegisterSubmit}>
              <div className="input-row">
                <div className="input-group-wide">
                  <div className="input-field-wide">
                    <input
                      type="text"
                      id="registerName"
                      required
                      autoComplete="name"
                      value={formData.register.name}
                      onChange={(e) => handleInputChange('register', 'name', e.target.value)}
                    />
                    <label htmlFor="registerName">Full Name</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="input-underline"></div>
                  </div>
                  {errors.register.name && <span className="error-message">{errors.register.name}</span>}
                </div>

                <div className="input-group-wide">
                  <div className="input-field-wide">
                    <input
                      type="text"
                      id="registerUsername"
                      required
                      autoComplete="username"
                      value={formData.register.username}
                      onChange={(e) => handleInputChange('register', 'username', e.target.value)}
                    />
                    <label htmlFor="registerUsername">Username</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faAt} />
                    </div>
                    <div className="input-underline"></div>
                  </div>
                  {errors.register.username && <span className="error-message">{errors.register.username}</span>}
                </div>
              </div>

              <div className="input-row">
                <div className="input-group-wide">
                  <div className="input-field-wide">
                    <input
                      type="email"
                      id="registerEmail"
                      required
                      autoComplete="email"
                      value={formData.register.email}
                      onChange={(e) => handleInputChange('register', 'email', e.target.value)}
                    />
                    <label htmlFor="registerEmail">E-mail</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div className="input-underline"></div>
                  </div>
                  {errors.register.email && <span className="error-message">{errors.register.email}</span>}
                </div>

                <div className="input-group-wide">
                  <div className="input-field-wide">
                    <input
                      type={showPassword.register ? "text" : "password"}
                      id="registerPassword"
                      required
                      autoComplete="new-password"
                      value={formData.register.password}
                      onChange={(e) => handleInputChange('register', 'password', e.target.value)}
                    />
                    <label htmlFor="registerPassword">Password</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faLock} />
                    </div>
                    <div className="input-underline"></div>
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => togglePasswordVisibility('register')}
                    >
                      <FontAwesomeIcon icon={showPassword.register ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  {errors.register.password && <span className="error-message">{errors.register.password}</span>}
                  <div className="password-strength-wide">
                    <div className="strength-bar-wide">
                      <div
                        className={`strength-fill-wide ${getStrengthClass()}`}
                        style={{ width: `${passwordStrength.score}%` }}
                      ></div>
                    </div>
                    <span className={`strength-text-wide ${getStrengthTextClass()}`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                </div>
              </div>

              <div className="input-group-wide">
                <div className="input-field-wide">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    id="registerConfirmPassword"
                    required
                    autoComplete="new-password"
                    value={formData.register.confirmPassword}
                    onChange={(e) => handleInputChange('register', 'confirmPassword', e.target.value)}
                  />
                  <label htmlFor="registerConfirmPassword">Confirm Password</label>
                  <div className="input-icon">
                    <FontAwesomeIcon icon={faLock} />
                  </div>
                  <div className="input-underline"></div>
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    <FontAwesomeIcon icon={showPassword.confirm ? faEyeSlash : faEye} />
                  </button>
                </div>
                {errors.register.confirmPassword && <span className="error-message">{errors.register.confirmPassword}</span>}
              </div>

              <div className="form-options-wide">
                <label className="checkbox-container-wide">
                  <input
                    type="checkbox"
                    id="termsAgree"
                    required
                    checked={formData.register.termsAgree}
                    onChange={(e) => handleInputChange('register', 'termsAgree', e.target.checked)}
                  />
                  <span className="checkmark-wide"></span>
                  I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
                </label>
                {/* <label className="checkbox-container-wide">
                  <input 
                    type="checkbox" 
                    id="newsletterSubscribe"
                    checked={formData.register.newsletterSubscribe}
                    onChange={(e) => handleInputChange('register', 'newsletterSubscribe', e.target.checked)}
                  />
                  <span className="checkmark-wide"></span>
                  Desejo receber novidades e atualizações por e-mail
                </label> */}
              </div>

              <button
                type="submit"
                className={`submit-btn-wide primary ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                <span className="btn-text-login">
                  {isLoading ? 'Criando conta...' : 'Iniciar Jornada Cinematográfica'}
                </span>
                <div className="btn-loader">
                  <div className="loader-dot"></div>
                  <div className="loader-dot"></div>
                  <div className="loader-dot"></div>
                </div>
              </button>

              {errors.register.general && <span className="error-message">{errors.register.general}</span>}

              {/* <div className="divider-wide">
                <span>ou registre-se com</span>
              </div>

              <div className="social-auth-wide">
                <button 
                  type="button" 
                  className="social-btn-wide google-btn"
                  onClick={() => handleSocialLogin('google')}
                >
                  <i className="fab fa-google"></i>
                  <span>Google</span>
                </button>
                <button 
                  type="button" 
                  className="social-btn-wide facebook-btn"
                  onClick={() => handleSocialLogin('facebook')}
                >
                  <i className="fab fa-facebook-f"></i>
                  <span>Facebook</span>
                </button>
                <button 
                  type="button" 
                  className="social-btn-wide twitter-btn"
                  onClick={() => handleSocialLogin('twitter')}
                >
                  <i className="fab fa-x-twitter"></i>
                  <span>Twitter</span>
                </button>
              </div> */}
            </form>

            <div className="form-footer-wide">
              <p>Already part of the community?</p>
              <button
                className="switch-form-link"
                onClick={() => switchForm('login')}
              >
                Log in
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginEN;