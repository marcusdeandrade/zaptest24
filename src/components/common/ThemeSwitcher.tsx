import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function ThemeSwitcher() {
  const { theme, setTheme } = useStore((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
  }));

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 text-gray-400 hover:text-gray-600"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}