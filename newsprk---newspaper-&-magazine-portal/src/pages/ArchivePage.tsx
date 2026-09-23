import React from 'react';
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

export const ArchivePage: React.FC = () => {
  return (
    <>
      <Breadcrumb className="shadow5" title="Archive">
        <div className="space-50" />
        <div className="row">
          <div className="col-lg-4">
            <div className="table_content">
              <h2 className="widget-title">Archive:2020</h2>
              <ul>
                <li>
                  <Link to="/">January</Link>
                </li>
                <li>
                  <Link to="/">February</Link>
                </li>
                <li>
                  <Link to="/">March</Link>
                </li>
                <li>
                  <Link className="active" to="">
                    April
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="table_content border_black_left pl-md-5">
              <h2 className="widget-title">Years list</h2>
              <div className="row">
                <div className="col-lg-3">
                  <div className="yearList">
                    <ul>
                      <li>
                        <Link to="/">2000</Link>
                      </li>
                      <li>
                        <Link to="/">2001</Link>
                      </li>
                      <li>
                        <Link to="/">2002</Link>
                      </li>
                      <li>
                        <Link to="/">2003</Link>
                      </li>
                      <li>
                        <Link className="active" to="/">
                          2004
                        </Link>
                      </li>
                      <li>
                        <Link to="/">2005</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="yearList">
                    <ul>
                      <li>
                        <Link to="/">2006</Link>
                      </li>
                      <li>
                        <Link to="/">2007</Link>
                      </li>
                      <li>
                        <Link to="/">2008</Link>
                      </li>
                      <li>
                        <Link to="/">2009</Link>
                      </li>
                      <li>
                        <Link to="/">2010</Link>
                      </li>
                      <li>
                        <Link to="/">2011</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="yearList">
                    <ul>
                      <li>
                        <Link to="/">2012</Link>
                      </li>
                      <li>
                        <Link to="/">2013</Link>
                      </li>
                      <li>
                        <Link to="/">2014</Link>
                      </li>
                      <li>
                        <Link to="/">2015</Link>
                      </li>
                      <li>
                        <Link to="/">2016</Link>
                      </li>
                      <li>
                        <Link to="/">2017</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="yearList">
                    <ul>
                      <li>
                        <Link to="/">2018</Link>
                      </li>
                      <li>
                        <Link to="/">2019</Link>
                      </li>
                      <li>
                        <Link to="/">2014</Link>
                      </li>
                      <li>
                        <Link to="/">2015</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
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

export default ArchivePage;
