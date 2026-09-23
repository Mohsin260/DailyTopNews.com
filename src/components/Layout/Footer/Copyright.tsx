'use client';

import Link from 'next/link';
import { footerMenus } from '@/data/config';

export const Copyright: React.FC = () => {
  return (
    <div className="copyright">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <p>© Copyright 2020, All Rights Reserved</p>
          </div>
          <div className="col-lg-6 align-self-center">
            <div className="copyright_menus text-right">
              <div className="language" />
              <div className="copyright_menu inline">
                <ul>
                  {footerMenus.map((item, idx) => (
                    <li key={idx}>
                      <Link href={item.link}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
