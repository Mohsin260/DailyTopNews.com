'use client';

import { useState, useEffect } from 'react';
import TopBar from '@/components/Layout/Header/TopBar';
import LogoArea from '@/components/Layout/Header/LogoArea';
import MainNavigation from '@/components/Layout/Header/MainNavigation';
import Footer from '@/components/Layout/Footer/Footer';
import { Icon } from '@/components/Layout/common/Icon';
import StickyFooterAd from '@/components/ui/StickyFooterAd';

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
      <StickyFooterAd />
    </div>
  );
};

export default Layout;
