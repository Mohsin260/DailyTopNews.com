import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import { Icon } from '../components/common/Icon';
import TabWidget from '../components/Sidebar/TabWidget';
import TrendingNewsWidget from '../components/Sidebar/TrendingNewsWidget';
import MostShared from '../components/Sidebar/MostShared';
import NewsletterWidget from '../components/Sidebar/NewsletterWidget';
import BottomBannerArea from '../components/common/BottomBannerArea';
import EntertainmentNews from '../components/Entertainment/EntertainmentNews';
import { entertainmentPosts } from '../data/newsData';

export const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'1' | '2'>('1');

  return (
    <>
      <Breadcrumb className="shadow5" title="Archive">
        <div className="space-50" />
        <div className="row">
          <div className="col-12">
            <div className="author_about">
              <div className="author_img">
                <div className="author_wrap">
                  <img src="/assets/author1-C1xL9xYF.png" alt="author1" />
                </div>
              </div>
              <div className="author_content">
                <Link to="/">QuomodoSoft</Link>
                <ul className="inline">
                  <li>News Writer</li>
                  <li>Since: April 25, 2020</li>
                </ul>
              </div>
              <p>
                QuomodoSoft is an investigative reporter for Newspark, based in Bangladesh. He
                started at The Times in 1999 covering Mayor Rudolph W. Giuliani and then the Sept.
                11, 2001, attacks.
              </p>
              <br />
              <p>
                He is a three-time winner of the Pulitzer Prize for explanatory reporting,
                investigative reporting and as part of team for foreign reporting. He previously
                worked at The Bangladesh Post and The Hartford Courant.
              </p>
            </div>
          </div>
        </div>
        <div className="space-50" />
      </Breadcrumb>

      <div className="archives padding-top-30">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-8">
              <div className="row">
                <div className="col-10 align-self-center">
                  <div className="about_post_list">
                    <ul className="nav nav-tabs">
                      <li className="nav-item">
                        <div
                          className={activeTab === '1' ? 'active' : ''}
                          onClick={() => setActiveTab('1')}
                          style={{ cursor: 'pointer' }}
                        >
                          Latest news
                        </div>
                      </li>
                      <li className="nav-item">
                        <div
                          className={activeTab === '2' ? 'active' : ''}
                          onClick={() => setActiveTab('2')}
                          style={{ cursor: 'pointer' }}
                        >
                          Popular news
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-2 text-right align-self-center">
                  <div className="calender mb20">
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

export default AboutPage;
