import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook para fazer scroll para o topo da página quando a rota muda
 */
const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll imediato
    window.scrollTo(0, 0);
    
    // Se não funcionar imediatamente, tenta novamente após 100ms
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname, location.key]);

  // Também trata F5 (page reload)
  useEffect(() => {
    const handlePageReload = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('beforeunload', handlePageReload);
    window.addEventListener('load', handlePageReload);
    
    // Scroll ao montar o componente
    window.scrollTo(0, 0);
    
    return () => {
      window.removeEventListener('beforeunload', handlePageReload);
      window.removeEventListener('load', handlePageReload);
    };
  }, []);
};

export default useScrollToTop;

