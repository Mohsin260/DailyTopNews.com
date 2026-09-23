import React, { useEffect, useState } from 'react';
import TopBar from '../Header/TopBar';
import LogoArea from '../Header/LogoArea';
import MainNavigation from '../Header/MainNavigation';
import Footer from '../Footer/Footer';
import { Icon } from '../common/Icon';

interface LayoutProps {
  children: React.ReactNode;
  dark?: boolean;
}

const BackToTop: React.FC = () => {
  const [stickyClass, setStickyClass] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (Math.ceil(window.scrollY) >= 200) {
        setStickyClass('sticky');
      } else {
        setStickyClass('');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={stickyClass}>
      <div className="up_btn up_btn1" onClick={scrollToTop}>
        <Icon name="angle-double-up" />
      </div>
    </div>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, dark = false }) => {
  return (
    <div className={`theme-1 ${dark ? 'dark-theme' : ''}`}>
      <BackToTop />
      <TopBar className="white_bg" dark={dark} />
      {dark ? <div className="border_white" /> : <div className="border_black" />}
      <LogoArea className="white_bg" dark={dark} />
      <MainNavigation dark={dark} />
      {children}
      <Footer className="primay_bg" />
    </div>
  );
};

export default Layout;
