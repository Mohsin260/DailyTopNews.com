import React from 'react';
import { Link } from 'react-router-dom';
import { bannerSidebar } from '../../data/newsData';

interface BannerWidgetProps {
  className?: string;
  imgSrc?: string;
}

export const BannerWidget: React.FC<BannerWidgetProps> = ({
  className = '',
  imgSrc = bannerSidebar,
}) => {
  return (
    <div className={`banner2 mb30 ${className}`}>
      <Link to="/">
        <img src={imgSrc} alt="thumb" />
      </Link>
    </div>
  );
};

export default BannerWidget;
