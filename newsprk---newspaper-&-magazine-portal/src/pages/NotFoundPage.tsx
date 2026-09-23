import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/common/Icon';
import TabWidget from '../components/Sidebar/TabWidget';
import FollowUs from '../components/Sidebar/FollowUs';
import TrendingNewsWidget from '../components/Sidebar/TrendingNewsWidget';
import MostShared from '../components/Sidebar/MostShared';
import NewsletterWidget from '../components/Sidebar/NewsletterWidget';
import BottomBannerArea from '../components/common/BottomBannerArea';
import EntertainmentNews from '../components/Entertainment/EntertainmentNews';
import { entertainmentPosts } from '../data/newsData';

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
                  Sorry the page you were looking for cannot be found. Try searching for the best match
                  or browse the links below:
                </p>
                <div className="space-20" />
                <div className="button_group">
                  <Link to="/" className="cbtn2">
                    GO TO HOME
                  </Link>
                  <Link to="/contact" className="cbtn3">
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
                    <img src="/assets/calendar-DqLz_3iG.png" alt="calendar" />
                  </div>
                </div>
              </div>
              <div className="about_posts_tab">
                <div className="row justify-content-center">
                  <EntertainmentNews entertainments={entertainmentPosts} />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="cpagination">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <Link className="page-link" to="/" aria-label="Previous">
                            <span aria-hidden="true">
                              <Icon name="caret-left" />
                            </span>
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="/">
                            1
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="/">
                            ..
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="/">
                            5
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="/" aria-label="Next">
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
              <TabWidget />
              <FollowUs title="Follow Us" />
              <TrendingNewsWidget />
              <div className="banner2 mb30">
                <Link to="/">
                  <img src="/assets/banner-2-zRgCfOgB.jpg" alt="thumb" />
                </Link>
              </div>
              <MostShared title="Most Share" />
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
