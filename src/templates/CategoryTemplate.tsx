'use client';

import Link from 'next/link';
import Breadcrumb from '@/components/Layout/common/Breadcrumb';
import BusinessNews from '@/components/Layout/sections/BusinessNews';
import TabWidget from '@/components/Layout/Sidebar/TabWidget';
import TrendingNewsWidget from '@/components/Layout/Sidebar/TrendingNewsWidget';
import NewsletterWidget from '@/components/Layout/Sidebar/NewsletterWidget';
import FollowUs from '@/components/Layout/Sidebar/FollowUs';
import BannerWidget from '@/components/Layout/Sidebar/BannerWidget';
import AdSlot from '@/components/ui/AdSlot';
import { Icon } from '@/components/Layout/common/Icon';
import type { Article, Category } from '@/types';

interface CategoryPageProps {
  title: string;
  categorySlug: string;
  articles: Article[];
  categories: Category[];
  page?: number;
  totalPages?: number;
  totalCount?: number;
}

function getPageItems(current: number, total: number): (number | 'gap')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const nums = Array.from(
    new Set([1, total, current - 1, current, current + 1].filter((n) => n >= 1 && n <= total))
  ).sort((a, b) => a - b);
  const items: (number | 'gap')[] = [];
  let prev = 0;
  for (const n of nums) {
    if (n - prev > 1) items.push('gap');
    items.push(n);
    prev = n;
  }
  return items;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  title,
  categorySlug,
  articles,
  page = 1,
  totalPages = 1,
}) => {
  const pageHref = (n: number) => `/category/${categorySlug}${n > 1 ? `?page=${n}` : ''}`;
  const current = Math.min(Math.max(1, page), Math.max(1, totalPages));

  return (
    <>
      <Breadcrumb title={title} />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <AdSlot
              pageType="category"
              position="top-leaderboard"
              width="728px"
              height="90px"
              responsive
              fullWidth
            />
          </div>
        </div>
      </div>
      <div className="archives padding-top-30">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-8">
              <div className="businerss_news">
                <div className="row">
                  <div className="col-12 align-self-center">
                    <div className="categories_title">
                      <h5>
                        Category:{' '}
                        <Link href={`/category/${categorySlug}`}>{title}</Link>
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <BusinessNews headerHide businessNews={articles} />
                  </div>
                </div>
                {totalPages > 1 && (
                  <div className="row">
                    <div className="col-12">
                      <div className="cpagination">
                        <nav aria-label="Category pages">
                          <ul className="pagination">
                            <li className={`page-item${current <= 1 ? ' disabled' : ''}`}>
                              {current <= 1 ? (
                                <span className="page-link" aria-label="Previous">
                                  <span aria-hidden="true">
                                    <Icon name="caret-left" />
                                  </span>
                                </span>
                              ) : (
                                <Link
                                  className="page-link"
                                  href={pageHref(current - 1)}
                                  aria-label="Previous"
                                >
                                  <span aria-hidden="true">
                                    <Icon name="caret-left" />
                                  </span>
                                </Link>
                              )}
                            </li>
                            {getPageItems(current, totalPages).map((item, idx) =>
                              typeof item === 'number' ? (
                                <li
                                  key={idx}
                                  className={`page-item${item === current ? ' active' : ''}`}
                                >
                                  <Link className="page-link" href={pageHref(item)}>
                                    {item}
                                  </Link>
                                </li>
                              ) : (
                                <li key={idx} className="page-item disabled">
                                  <span className="page-link">..</span>
                                </li>
                              )
                            )}
                            <li className={`page-item${current >= totalPages ? ' disabled' : ''}`}>
                              {current >= totalPages ? (
                                <span className="page-link" aria-label="Next">
                                  <span aria-hidden="true">
                                    <Icon name="caret-right" />
                                  </span>
                                </span>
                              ) : (
                                <Link
                                  className="page-link"
                                  href={pageHref(current + 1)}
                                  aria-label="Next"
                                >
                                  <span aria-hidden="true">
                                    <Icon name="caret-right" />
                                  </span>
                                </Link>
                              )}
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <TabWidget posts={articles.slice(0, 4)} />
              <TrendingNewsWidget posts={articles} />
              <NewsletterWidget />
              <FollowUs title="Follow Us" />
              <BannerWidget pageType="category" />
            </div>
          </div>
        </div>
      </div>
      <div className="space-15" />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <AdSlot
              pageType="category"
              position="bottom-leaderboard"
              width="728px"
              height="90px"
              responsive
              fullWidth
            />
          </div>
        </div>
      </div>
      <div className="space-15" />
    </>
  );
};

export default CategoryPage;
