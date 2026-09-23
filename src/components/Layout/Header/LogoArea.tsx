'use client';

import Link from 'next/link';
import { logoDark, logoLight } from '@/data/config';
import AdSlot from '@/components/ui/AdSlot';

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
              <Link href="/" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                <img src={dark ? logoDark : logoLight} alt="logo" style={{ width: '50px' }} />
                <h1 style={{ fontFamily: '-moz-initial', fontSize: '40px' }}>DailyTopNews</h1>
              </Link>
            </div>
          </div>
          <div className="col-lg-8 align-self-center">
            <AdSlot
              pageType="homepage"
              position="header-leaderboard"
              width="728px"
              height="90px"
              responsive
              fullWidth
              wrapperClassName="banner1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoArea;
