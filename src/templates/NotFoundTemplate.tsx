'use client';

import Link from 'next/link';
import { Icon } from '@/components/Layout/common/Icon';
import TabWidget from '@/components/Layout/Sidebar/TabWidget';
import FollowUs from '@/components/Layout/Sidebar/FollowUs';
import TrendingNewsWidget from '@/components/Layout/Sidebar/TrendingNewsWidget';
import MostShared from '@/components/Layout/Sidebar/MostShared';
import NewsletterWidget from '@/components/Layout/Sidebar/NewsletterWidget';
import BottomBannerArea from '@/components/Layout/common/BottomBannerArea';
import EntertainmentNews from '@/components/Layout/sections/EntertainmentNews';
import { calendarIconBase64 } from '@/data/base64Assets';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <div className="inner_table">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="space-50" />
              <div className="area404 text-center">
                <img src="/assets/404-Dy_YRgEE.png" alt="404" />
              </div>
              <div className="space-30" />
              <div className="back4040 text-center col-lg-6 m-auto">
                <h3>Page not faund</h3>
                <div className="space-10" />
                <p>
                  Sorry the page you were looking for cannot be found. Try searching for the best
                  match or browse the links below:
                </p>
                <div className="space-20" />
                <div className="button_group">
                  <Link href="/" className="cbtn2">
                    GO TO HOME
                  </Link>
                  <Link href="/contact" className="cbtn3">
                    contact us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-50" />
      </div>

      <div className="archives padding-top-30">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-8">
              <div className="row">
                <div className="col-6 align-self-center">
                  <div className="heading">
                    <h2 className="widget-title">Archive</h2>
                  </div>
                </div>
                <div className="col-6 text-right">
                  <div className="calender">
                    <img src={calendarIconBase64} alt="calendar" />
                  </div>
                </div>
              </div>
              <div className="about_posts_tab">
                <div className="row justify-content-center">
                  <EntertainmentNews entertainments={[]} />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="cpagination">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <Link className="page-link" href="/" aria-label="Previous">
                            <span aria-hidden="true">
                              <Icon name="caret-left" />
                            </span>
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" href="/">
                            1
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" href="/">
                            ..
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" href="/">
                            5
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" href="/" aria-label="Next">
                            <span aria-hidden="true">
                              <Icon name="caret-right" />
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <TabWidget posts={[]} />
              <FollowUs title="Follow Us" />
              <TrendingNewsWidget posts={[]} />
              <div className="banner2 mb30">
                <Link href="/">
                  <img src="/assets/banner-2-zRgCfOgB.jpg" alt="thumb" />
                </Link>
              </div>
              <MostShared title="Most Share" posts={[]} />
              <NewsletterWidget />
            </div>
          </div>
        </div>
      </div>
      <div className="space-70" />
      <BottomBannerArea />
    </>
  );
};

export default NotFoundPage;
