'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MenuItem } from '@/types';
import { Icon } from '@/components/Layout/common/Icon';

interface MobileNavigationProps {
  menus: MenuItem[];
  sideShow: boolean;
  setSideShow: (show: boolean) => void;
  className?: string;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  menus,
  sideShow,
  setSideShow,
  className = '',
}) => {
  const [openSubMenuId, setOpenSubMenuId] = useState<number | null>(null);
  const [openThirdMenuId, setOpenThirdMenuId] = useState<number | null>(null);

  return (
    <div className={`sidebarMenu ${sideShow ? '' : 'hideSideMenu'} ${className}`}>
      <span className="clox" onClick={() => setSideShow(false)}>
        Close
      </span>
      <ul className="navBar">
        {menus.length > 0 &&
          menus.map((menu) => (
            <li key={menu.id} className={`${menu.child ? 'has_sub' : ''}`}>
              {menu.child ? (
                <p
                  onClick={() => setOpenSubMenuId(openSubMenuId === menu.id ? null : menu.id)}
                  className={openSubMenuId === menu.id ? 'active' : ''}
                >
                  {menu.linkText}
                  <Icon name={openSubMenuId === menu.id ? 'angle-down active' : 'angle-down'} />
                </p>
              ) : (
                <Link href={menu.link || '/'}
                  className={openSubMenuId === menu.id ? 'active' : ''}
                  onClick={() => setSideShow(false)}
                >
                  {menu.linkText}
                </Link>
              )}

              {menu.child && menu.submenu && (
                <div style={{ display: openSubMenuId === menu.id ? 'block' : 'none' }}>
                  <ul className="subMenu">
                    {menu.submenu.map((sub) => (
                      <li key={sub.id} className={`${sub.child ? 'has_sub' : ''}`}>
                        {sub.child ? (
                          <p
                            onClick={() =>
                              setOpenThirdMenuId(openThirdMenuId === sub.id ? null : sub.id)
                            }
                            className={openThirdMenuId === sub.id ? 'active' : ''}
                          >
                            {sub.linkText}
                            <Icon
                              name={openThirdMenuId === sub.id ? 'angle-down active' : 'angle-down'}
                            />
                          </p>
                        ) : (
                          <Link href={sub.link || '/'}
                            onClick={() => setSideShow(false)}
                          >
                            {sub.linkText}
                          </Link>
                        )}

                        {sub.third_menu && (
                          <div style={{ display: openThirdMenuId === sub.id ? 'block' : 'none' }}>
                            <ul className="thirdMenu">
                              {sub.third_menu.map((third) => (
                                <li key={third.id}>
                                  <Link href={third.link}
                                    onClick={() => setSideShow(false)}
                                  >
                                    {third.linkText}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MobileNavigation;
