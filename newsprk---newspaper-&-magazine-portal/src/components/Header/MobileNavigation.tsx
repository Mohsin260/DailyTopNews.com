import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuItem } from '../../types';
import { Icon } from '../common/Icon';

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
                <NavLink
                  to={menu.link || '/'}
                  className={openSubMenuId === menu.id ? 'active' : ''}
                  onClick={() => setSideShow(false)}
                >
                  {menu.linkText}
                </NavLink>
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
                          <NavLink
                            to={sub.link || '/'}
                            onClick={() => setSideShow(false)}
                          >
                            {sub.linkText}
                          </NavLink>
                        )}

                        {sub.third_menu && (
                          <div style={{ display: openThirdMenuId === sub.id ? 'block' : 'none' }}>
                            <ul className="thirdMenu">
                              {sub.third_menu.map((third) => (
                                <li key={third.id}>
                                  <NavLink
                                    to={third.link}
                                    onClick={() => setSideShow(false)}
                                  >
                                    {third.linkText}
                                  </NavLink>
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
