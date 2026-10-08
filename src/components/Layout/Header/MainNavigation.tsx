'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { menuData } from '@/data/config';
import { Icon } from '@/components/Layout/common/Icon';
import { MobileNavigation } from '@/components/Layout/Header/MobileNavigation';
import { SearchModal } from '@/components/Layout/Header/SearchModal';

const tempIcon =
  'data:image/png;base64,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';

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
  const [weather, setWeather] = useState<{ city: string; temp: string } | null>(null);

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

  useEffect(() => {
    let cancelled = false;

    const fetchJson = async (url: string, ms = 5000): Promise<any | null> => {
      try {
        const res = await Promise.race([
          fetch(url),
          new Promise<Response>((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), ms)
          ),
        ]);
        if (!res.ok) return null;
        return await res.json();
      } catch {
        return null;
      }
    };

    const getBrowserCoords = (): Promise<{ lat: number; lon: number } | null> =>
      new Promise((resolve) => {
        if (typeof navigator === 'undefined' || !navigator.geolocation) {
          resolve(null);
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
          () => resolve(null),
          { timeout: 5000, maximumAge: 10 * 60 * 1000 }
        );
      });

    (async () => {
      let lat: number | null = null;
      let lon: number | null = null;
      let city: string | null = null;

      const coords = await getBrowserCoords();
      if (coords) {
        lat = coords.lat;
        lon = coords.lon;
        const geo = await fetchJson(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        );
        city = geo?.city || geo?.locality || geo?.principalSubdivision || null;
      }

      if (lat == null || lon == null || !city) {
        const ip = await fetchJson('https://ipwho.is/');
        if (ip?.success && typeof ip.latitude === 'number' && typeof ip.longitude === 'number') {
          lat = ip.latitude;
          lon = ip.longitude;
          city = city || ip.city || ip.locality || null;
        }
      }

      if (cancelled) return;
      if (lat == null || lon == null) {
        setWeather({ city: 'Unavailable', temp: '--' });
        return;
      }

      const forecast = await fetchJson(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`
      );
      const temp = forecast?.current?.temperature_2m;

      if (cancelled) return;
      setWeather({
        city: city || 'Local',
        temp: typeof temp === 'number' ? String(Math.round(temp)) : '--',
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div className={`main-menu ${className}`} id="header">
        <Link href="#top" className="up_btn up_btn1" onClick={(e) => {
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
                              <Link
                                href="#"
                                className="menu-dropdown"
                                onClick={(e) => e.preventDefault()}
                              >
                                {menu.linkText} <Icon name={menu.icon} />
                              </Link>
                            ) : (
                              <Link href={menu.link || '/'}
                                className="menu-dropdown"
                              >
                                {menu.linkText} <Icon name={menu.icon} />
                              </Link>
                            )}

                            {menu.child && menu.submenu && (
                              <ul className="dropdown-menu" role="menu">
                                {menu.submenu.map((sub) => (
                                  <li
                                    key={sub.id}
                                    className={`${sub.child ? 'dropdown-submenu' : ''}`}
                                  >
                                    {sub.child ? (
                                      <Link href="#" onClick={(e) => e.preventDefault()}>
                                        {sub.linkText}
                                      </Link>
                                    ) : (
                                      <Link href={sub.link || '/'}>
                                        {sub.linkText}
                                      </Link>
                                    )}

                                    {sub.third_menu && (
                                      <ul className="dropdown-menu">
                                        {sub.third_menu.map((third) => (
                                          <li key={third.id}>
                                            <Link href={third.link}>
                                              {third.linkText}
                                            </Link>
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
                  {/* <div className="lang d-none d-xl-block">
                    <ul>
                      <li>
                        <Link href="/">
                          English <Icon name="angle-down" />
                        </Link>
                        <ul>
                          <li>
                            <Link href="/">Spanish</Link>
                          </li>
                          <li>
                            <Link href="/">China</Link>
                          </li>
                          <li>
                            <Link href="/">Hindi</Link>
                          </li>
                          <li>
                            <Link href="/">Corian</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div> */}
                  <div className="temp d-none d-lg-block">
                    <div className="temp_wap">
                      <div className="temp_icon">
                        <img src={tempIcon} alt="temp icon" />
                      </div>
                      <h3 className="temp_count">{weather?.temp ?? '…'}</h3>
                      <p>{weather?.city ?? 'Locating…'}</p>
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
