import React, { createContext, useContext, useState } from 'react';

const ErrorContext = createContext();

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError deve ser usado dentro de ErrorProvider');
  }
  return context;
};

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const triggerError = (errorType = '404') => {
    setError(errorType);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, triggerError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};
