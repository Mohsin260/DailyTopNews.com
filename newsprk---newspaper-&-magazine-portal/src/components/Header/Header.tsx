import React from 'react';
import TopBar from './TopBar';
import LogoArea from './LogoArea';
import MainNavigation from './MainNavigation';

interface HeaderProps {
  className?: string;
  dark?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ className = '', dark = false }) => {
  return (
    <header>
      <TopBar dark={dark} />
      <LogoArea dark={dark} />
      <MainNavigation dark={dark} className={className} />
    </header>
  );
};

export default Header;
