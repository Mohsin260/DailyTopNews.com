import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { menuData } from '../../data/newsData';
import { Icon } from '../common/Icon';
import { MobileNavigation } from './MobileNavigation';
import { SearchModal } from './SearchModal';

const tempIcon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAbCAYAAAAQ2f3dAAAABHNCSVQICAgIfAhkiAAABnlJREFUWEfNlntM1vcVxj9HsFwUlZvoiwpYkdZZKGKRq1qstEqNImo7zdQ1FbegWFdb57aUlTZeungvnW03g06putkKztkOdFUu1oKIKCDWiqIor4CICkhRzvIjYWGWq7pkJ3mT949znvOc8/t+n+8jPIYorNQXbjawxsaSw74u8tZjgEQeFURVLY6VkT15L77xoZQs9mWeiKQ/Ku7jIGZdVMXpoJ0Mey+UkkW+LBSR1P8LYoWV5Acn4fluMCWxfkSLSNr/jJiqWolIQ1canCjXQ3/IJmyhD1fGD+Y5ESnvrE5VXUWkrL28Nj+lqroUVXG0tpGq0QMIEZGm9gCMBoDpXDXLhtuTBJwCLomItleTcVnfaWhiRkMjn0weJh+2ldcmsXyz7phzgDnVDfD36ZT59GeYiNxtAVBVt6p6Xq2qZ3pxNb3rG+lTUkO9qTfWDtb0HGZPBZDl5cAOEclo3fhCtW5bepioI1folTSFvEkeRIjI1QfJtUnsfLVGJp5h84e5uPYQSInkRPAg/AEtvc3K4iqmby9g+PGrUFH/43ktekDAQAh2pWymFznD7FkhIkX5Zl379hEWfHMNOz8X7mycwJ9GOsvSLm/MSPz+pkalXSThnQxctoRzYZon8wsr2RyXiU/aJZp1JswNAkxce8oB6WPF5XtNDCyu4n7uddwyr8C1WvBygGgfisLciDfXEbvwSwIDTNQt8yfJ014WdOuMtSSnXVDvvjZ8cucuf7S0JG5GMh4N92HSUFjuT6G9DfuH2PEFcB2aP19f41dRy8Rz1byUVor/hhwcDLzV4zCHuLKg9gd+U9PIX8PdZV1HF6RTHVNV29OVnBmbhIcB9F4I5RPd2ODlyDoRaewIXFWnZl1lQ9Q+3O/eg5WhlL84lEVP9pO9nd3aTomdNOu+mclMrayHZaM5P9+H9wf1lm2dAbe6KH3zK0gJ38NYY9sbwyieO7L5wH//0BszJo7PYuv6HBzeGE3Za968OcROdneVVCtyDqkXOTYrheHP9oePXmD3CGd59aGJZZVpRuQ+gj36wF8i2OfpIJHdJdWSX1arr689zqatp7GJD6ZksR/TRSSv24dfVf0ST3Nw6b9w/n0w5iV+TBCRgoclZtQdLtVv5h1gzNjBsHECK5xsZHW3iVXU6dKYf7Iu6xocmkWBl6OMfBRSRu2lW7rqzcP8+oQZPp/K174D5PkOialqL8ACEBGpMZLPVume6K+YaWcFv/UnIWiwLHpUYqoauuoYuz7IxpQ5m+9GOOErIrWqakjKPcBSRG4YfaT4hk6qrOP9PlbYqqIKFd7OTDpfzYFpXzB+lAtsj2CxSNtvWnfIqqpvUiEpMWkM2vky5ZOHEpBrJvrWD0x0ssGuqo47Vj3JCTTJLyX9ip6YspdRLQ0muENcEOvqGwl4ZT9Bzw+GrZP4mYjs6ESzxgFHO3q8VdVzewFpSw4xZH0YpfNHErc+h5XxWQxswX5jFPVxIcyQnHJd+e1VZlv0QO83ISOcsBw3mOCSmyREJRPxZD/YEs5yJ1v5oD1iRy7r8';

interface MainNavigationProps {
  className?: string;
  dark?: boolean;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({
  className = '',
  dark = false,
}) => {
  const [searchShow, setSearchShow] = useState(false);
  const [sideShow, setSideShow] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`main-menu ${className}`} id="header">
        <Link to="#top" className="up_btn up_btn1" onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <Icon name="chevron-double-up" />
        </Link>
        <div className={`main-nav clearfix is-ts-sticky ${isSticky ? 'sticky' : ''}`}>
          <div className="container">
            <div className="row justify-content-between">
              <nav className="navbar navbar-expand-lg col-lg-8 align-self-center">
                <div className="site-nav-inner">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setSideShow(true)}
                    aria-label="Toggle navigation"
                  >
                    <Icon name="bars" />
                  </button>
                  <div
                    id="navbarSupportedContent"
                    className="collapse navbar-collapse navbar-responsive-collapse"
                  >
                    <ul className="nav navbar-nav" id="scroll">
                      {menuData.length > 0 &&
                        menuData.map((menu) => (
                          <li
                            key={menu.id}
                            className={`${menu.child ? 'dropdown' : ''} nav-item`}
                          >
                            {menu.child ? (
                              <NavLink
                                onClick={(e) => e.preventDefault()}
                                to="/"
                                className="menu-dropdown"
                                data-toggle="dropdown"
                              >
                                {menu.linkText} <Icon name={menu.icon} />
                              </NavLink>
                            ) : (
                              <NavLink
                                to={menu.link || '/'}
                                className="menu-dropdown"
                                data-toggle="dropdown"
                              >
                                {menu.linkText} <Icon name={menu.icon} />
                              </NavLink>
                            )}

                            {menu.child && menu.submenu && (
                              <ul className="dropdown-menu" role="menu">
                                {menu.submenu.map((sub) => (
                                  <li
                                    key={sub.id}
                                    className={`${sub.child ? 'dropdown-submenu' : ''}`}
                                  >
                                    {sub.child ? (
                                      <NavLink
                                        onClick={(e) => e.preventDefault()}
                                        to="/"
                                      >
                                        {sub.linkText}
                                      </NavLink>
                                    ) : (
                                      <NavLink to={sub.link || '/'}>
                                        {sub.linkText}
                                      </NavLink>
                                    )}

                                    {sub.third_menu && (
                                      <ul className="dropdown-menu">
                                        {sub.third_menu.map((third) => (
                                          <li key={third.id}>
                                            <NavLink to={third.link}>
                                              {third.linkText}
                                            </NavLink>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <MobileNavigation
                    sideShow={sideShow}
                    setSideShow={setSideShow}
                    menus={menuData}
                  />
                </div>
              </nav>
              <div className="col-lg-4 align-self-center">
                <div className="menu_right">
                  <div className="users_area">
                    <ul className="inline">
                      <li
                        className="search_btn"
                        onClick={() => setSearchShow(!searchShow)}
                        style={{ cursor: 'pointer' }}
                      >
                        <Icon name="search" />
                      </li>
                      <li>
                        <Icon name="user-circle" />
                      </li>
                    </ul>
                  </div>
                  <div className="lang d-none d-xl-block">
                    <ul>
                      <li>
                        <Link to="/">
                          English <Icon name="angle-down" />
                        </Link>
                        <ul>
                          <li>
                            <Link to="/">Spanish</Link>
                          </li>
                          <li>
                            <Link to="/">China</Link>
                          </li>
                          <li>
                            <Link to="/">Hindi</Link>
                          </li>
                          <li>
                            <Link to="/">Corian</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="temp d-none d-lg-block">
                    <div className="temp_wap">
                      <div className="temp_icon">
                        <img src={tempIcon} alt="temp icon" />
                      </div>
                      <h3 className="temp_count">13</h3>
                      <p>San Francisco</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {searchShow && <SearchModal setSearchShow={setSearchShow} />}
    </>
  );
};

export default MainNavigation;
