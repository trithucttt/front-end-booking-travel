import React, { createContext, useContext, useState } from 'react';

const CityContext = createContext();

export function CityProvider({ children }) {
  const [city, setCity] = useState('');

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
}
