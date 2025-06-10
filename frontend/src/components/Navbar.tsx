import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    setUsername(null);
    navigate('/');
    window.location.reload(); 
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/#home" className="flex items-center ">
                <Logo className="h-10 w-10" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                  CARBONSENS
                </span>
              </a>
            </div>
            {username && (
              <span className="ml-6 text-gray-700 dark:text-gray-300 font-medium">
                Signed as: <strong>{username}</strong>
              </span>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/#home"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors"
            >
              Home
            </a>
            <a
              href="/#services"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors"
            >
              Services
            </a>
            <a
              href="/#about"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors"
            >
              About
            </a>
            <a
              href="/#team"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors"
            >
              Team
            </a>
            <a
              href="/#contact"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors"
            >
              Contact
            </a>

            {!username ? (
              <a
                href="/Signup"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors"
              >
                Sign Up
              </a>
            ) : (
              <button
                onClick={logout}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 dark:text-red-400 dark:hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 shadow-lg">
          <a
            href="/#home"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
            onClick={toggleMenu}
          >
            Home
          </a>
          <a
            href="/#services"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
            onClick={toggleMenu}
          >
            Services
          </a>
          <a
            href="/#about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
            onClick={toggleMenu}
          >
            About
          </a>
          <a
            href="/#team"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
            onClick={toggleMenu}
          >
            Team
          </a>
          <a
            href="/#contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
            onClick={toggleMenu}
          >
            Contact
          </a>
          {!username && (
            <a
              href="/Signup"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
              onClick={toggleMenu}
            >
              Sign Up
            </a>
          )}
          {username && (
            <button
              onClick={() => {
                logout();
                toggleMenu();
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 dark:text-red-400 dark:hover:text-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
