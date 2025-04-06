'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeType = 'green' | 'red';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('green');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'green' ? 'red' : 'green'));
  };

  useEffect(() => {
    // Apply theme CSS variables
    const root = document.documentElement;
    
    if (theme === 'green') {
      root.style.setProperty('--color-primary', '#4ade80');
      root.style.setProperty('--color-primary-50', '#f0fdf4');
      root.style.setProperty('--color-primary-100', '#dcfce7');
      root.style.setProperty('--color-primary-200', '#bbf7d0');
      root.style.setProperty('--color-primary-300', '#86efac');
      root.style.setProperty('--color-primary-400', '#4ade80');
      root.style.setProperty('--color-primary-500', '#22c55e');
      root.style.setProperty('--color-primary-600', '#16a34a');
      root.style.setProperty('--color-primary-700', '#15803d');
      root.style.setProperty('--color-primary-800', '#166534');
      root.style.setProperty('--color-primary-900', '#14532d');
    } else {
      root.style.setProperty('--color-primary', '#ef4444');
      root.style.setProperty('--color-primary-50', '#fef2f2');
      root.style.setProperty('--color-primary-100', '#fee2e2');
      root.style.setProperty('--color-primary-200', '#fecaca');
      root.style.setProperty('--color-primary-300', '#fca5a5');
      root.style.setProperty('--color-primary-400', '#f87171');
      root.style.setProperty('--color-primary-500', '#ef4444');
      root.style.setProperty('--color-primary-600', '#dc2626');
      root.style.setProperty('--color-primary-700', '#b91c1c');
      root.style.setProperty('--color-primary-800', '#991b1b');
      root.style.setProperty('--color-primary-900', '#7f1d1d');
    }
    
    // Secondary colors (consistent across themes)
    root.style.setProperty('--color-secondary', '#64748b');
    root.style.setProperty('--color-secondary-50', '#f8fafc');
    root.style.setProperty('--color-secondary-100', '#f1f5f9');
    root.style.setProperty('--color-secondary-200', '#e2e8f0');
    root.style.setProperty('--color-secondary-300', '#cbd5e1');
    root.style.setProperty('--color-secondary-400', '#94a3b8');
    root.style.setProperty('--color-secondary-500', '#64748b');
    root.style.setProperty('--color-secondary-600', '#475569');
    root.style.setProperty('--color-secondary-700', '#334155');
    root.style.setProperty('--color-secondary-800', '#1e293b');
    root.style.setProperty('--color-secondary-900', '#0f172a');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 