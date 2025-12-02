import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ErrorBoundary = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Lista de rotas válidas
    const validRoutes = [
      '/',
      '/profile',
      '/privacy',
      '/about',
      '/terms',
      '/contact',
      '/search',
      '/movies',
      '/tvshows',
      '/series',
      '/list',
      '/listEdit',
      '/rankMovies',
      '/rankTVShows',
      '/rankUsers',
      '/rankComments',
      '/settings',
      '/login-en',
      '/PTBR/',
      '/perfil',
      '/privacidade',
      '/sobre-nos',
      '/termos',
      '/contate',
      '/pesquisa',
      '/filmes',
      '/lista',
      '/editar-lista',
      '/lista-editar',
      '/list-edit',
      '/top-filmes',
      '/top-series',
      '/top-usuarios',
      '/top-comentarios',
      '/configuracoes',
      '/login-ptbr',
      '/error',
      '/erro'
    ];

    // Verifica se é uma rota dinâmica
    const isDynamicRoute = 
      location.pathname.startsWith('/info/') || 
      location.pathname.startsWith('/info-ptbr/') ||
      location.pathname.startsWith('/list/') ||
      location.pathname.startsWith('/lista/') ||
      location.pathname.startsWith('/list-edit/') ||
      location.pathname.startsWith('/lista-editar/') ||
      location.pathname.startsWith('/user/') ||
      location.pathname.startsWith('/usuario/') ||
      // Rotas com username (profile, lists, etc)
      (location.pathname.includes('/profile') && location.pathname.split('/').length >= 2) ||
      (location.pathname.includes('/perfil') && location.pathname.split('/').length >= 2) ||
      (location.pathname.includes('/list/') && location.pathname.split('/').length >= 3) ||
      (location.pathname.includes('/lista/') && location.pathname.split('/').length >= 3) ||
      (location.pathname.includes('/list-edit/') && location.pathname.split('/').length >= 3) ||
      (location.pathname.includes('/lista-editar/') && location.pathname.split('/').length >= 3);
    
    // A rota dinâmica pode ser /info/movieId ou /info/type/movieId ou /list/listId ou /lista/listId ou /user/userId ou /usuario/userId ou /username/list/listId ou /username/lista/listId ou /username/list-edit/listId ou /username/lista-editar/listId
    const isValidDynamicRoute = isDynamicRoute && location.pathname.split('/').filter(p => p).length >= 2;

    // Verifica se é uma rota válida
    const isValidRoute = validRoutes.includes(location.pathname) || isValidDynamicRoute;

    // Se não é válida e não é rota de erro, redireciona para erro
    if (!isValidRoute && 
        location.pathname !== '/error' && 
        location.pathname !== '/erro' &&
        !location.pathname.startsWith('/info') &&
        !location.pathname.includes('/list-edit/') &&
        !location.pathname.includes('/lista-editar/')) {
      navigate('/error', { replace: true });
    }
  }, [location.pathname, navigate]);

  return children;
};

export default ErrorBoundary;
