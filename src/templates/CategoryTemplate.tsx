'use client';

import Link from 'next/link';
import Breadcrumb from '@/components/Layout/common/Breadcrumb';
import BusinessNews from '@/components/Layout/sections/BusinessNews';
import TabWidget from '@/components/Layout/Sidebar/TabWidget';
import TrendingNewsWidget from '@/components/Layout/Sidebar/TrendingNewsWidget';
import NewsletterWidget from '@/components/Layout/Sidebar/NewsletterWidget';
import FollowUs from '@/components/Layout/Sidebar/FollowUs';
import BannerWidget from '@/components/Layout/Sidebar/BannerWidget';
import { Icon } from '@/components/Layout/common/Icon';
import type { Article, Category } from '@/types';

interface CategoryPageProps {
  title: string;
  categorySlug: string;
  articles: Article[];
  categories: Category[];
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  title,
  articles,
}) => {
  return (
    <>
      <Breadcrumb title={title} />
      <div className="archives padding-top-30">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-8">
              <div className="businerss_news">
                <div className="row">
                  <div className="col-12 align-self-center">
                    <div className="categories_title">
                      <h5>
                        Category: <Link href="/">{title}</Link>
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <BusinessNews headerHide businessNews={articles} />
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
            </div>

            <div className="col-md-6 col-lg-4">
              <TabWidget />
              <TrendingNewsWidget />
              <NewsletterWidget />
              <FollowUs title="Follow Us" />
              <BannerWidget pageType="category" />
            </div>
          </div>
        </div>
      </div>
      <div className="space-70" />
    </>
  );
};

export default CategoryPage;
