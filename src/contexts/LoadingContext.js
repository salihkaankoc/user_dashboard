import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: () => {},
  error: null,
  setError: () => {},
});

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, error, setError }}>
      {children}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <i className="fas fa-circle-notch fa-spin"></i>
          </div>
        </div>
      )}
      {error && (
        <div className="error-toast">
          <i className="fas fa-exclamation-circle"></i>
          <span>{error}</span>
          <button onClick={() => setError(null)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
} 