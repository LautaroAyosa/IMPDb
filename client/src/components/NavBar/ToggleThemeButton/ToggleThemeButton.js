import React from 'react';

function ToggleThemeButton({ theme, onToggle }) {
  const isDarkMode = theme === 'dark-mode';

  return (
    <button onClick={onToggle}>
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
}

export default ToggleThemeButton;
