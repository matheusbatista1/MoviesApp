import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconSun from './IconSun';
import IconMoon from './IconMoon';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

export default function Header({ onThemeToggle }: { onThemeToggle?: () => void }) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
    onThemeToggle?.();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="relative w-full bg-background-dark/50 border-t-footer-top border-footer-top flex justify-between items-center py-2 px-3 sm:px-6 md:px-8 z-20">
      <button
        className="flex items-center text-white bg-none border-none p-0 cursor-pointer"
        onClick={() => navigate('/movies')}
        aria-label='Ir para listagem de filmes'
      >
        <img
          src='/src/assets/logo-cubos.png'
          alt='Cubos Logo'
          className='h-7 w-auto'
        />
        <h2 className="ml-2 sm:ml-4 font-bold text-lg sm:text-xl">Movies</h2>
      </button>
      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          variant="secondary"
          onClick={handleThemeToggle}
          aria-label='Alternar tema'
          className="flex items-center justify-center py-2 px-3 sm:px-4 rounded-sm"
        >
          {isDarkTheme ? <IconSun /> : <IconMoon />}
        </Button>
          <Button
            onClick={handleLogout}
            className="py-2 px-4 sm:px-6 rounded"
          >
            Logout
          </Button>
      </div>
    </header>
  );
}