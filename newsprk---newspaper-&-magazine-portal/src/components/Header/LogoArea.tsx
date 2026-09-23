import React from 'react';
import { Link } from 'react-router-dom';
import { bannerTop, logoDark, logoLight } from '../../data/newsData';

interface LogoAreaProps {
  className?: string;
  dark?: boolean;
}

export const LogoArea: React.FC<LogoAreaProps> = ({ className = '', dark = false }) => {
  return (
    <div className={`logo_area ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 align-self-center">
            <div className="logo">
              <Link to="/">
                <img src={dark ? logoDark : logoLight} alt="logo" />
              </Link>
            </div>
          </div>
          <div className="col-lg-8 align-self-center">
            <div className="banner1">
              <Link to="#">
                <img src={bannerTop} alt="banner" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoArea;
