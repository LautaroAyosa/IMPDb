import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Default theme is 'dark-mode'
  const [theme, setTheme] = useState('dark-mode');

  // Check for existing theme in localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // If no saved preference, set to 'dark-mode' and save in localStorage
      setTheme('dark-mode');
      localStorage.setItem('theme', 'dark-mode');
    }

  }, []);

  // Toggle function
  const toggleTheme = () => {
    const newTheme = theme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };




  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Any components below can access theme & toggleTheme */}
      {children}
    </ThemeContext.Provider>
  );
}
