import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'w-12 h-12' }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`${className} relative`}>
      <img 
        src="/Logo.png" 
        alt="CARBONSENS Logo" 
        className={`w-full h-full object-contain animate-spin-slow ${isDarkMode ? 'brightness-200 contrast-75' : ''}`}
      />
    </div>
  );
};

export default Logo;