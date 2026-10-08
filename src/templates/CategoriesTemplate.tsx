'use client';

import Link from 'next/link';
import Breadcrumb from '@/components/Layout/common/Breadcrumb';
import TabWidget from '@/components/Layout/Sidebar/TabWidget';
import BottomBannerArea from '@/components/Layout/common/BottomBannerArea';
import AdSlot from '@/components/ui/AdSlot';
import { categoriesList } from '@/data/config';
import type { Article, Category } from '@/types';

interface CategoriesPageProps {
  categories: Category[];
  articles?: Article[];
}

const fallbackImageFor = (cat: Category, index: number): string => {
  const label = (cat.label || cat.name || cat.slug || '').toLowerCase();
  const match = categoriesList.find(
    (item) => item.title.toLowerCase() === label || item.title.toLowerCase() === cat.slug
  );
  if (match) return match.big_image;
  return categoriesList[index % categoriesList.length]?.big_image || '';
};

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ categories, articles = [] }) => {
  return (
    <>
      <Breadcrumb title="Categories" />

      <div className="archives padding-top-30">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <AdSlot
                pageType="website"
                position="top-leaderboard"
                width="728px"
                height="90px"
                responsive
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-8">
              <div className="row">
                <div className="col-12">
                  <div className="categories_title mb30">
                    <h5>All Categories</h5>
                  </div>
                </div>
              </div>

              {categories.length === 0 ? (
                <p>No categories found.</p>
              ) : (
                <div className="row categories-grid">
                  {categories.map((cat, index) => {
                    const label = cat.label || cat.name || cat.slug;
                    const image = cat.latestImage || fallbackImageFor(cat, index);
                    return (
                      <div className="col-sm-6 col-lg-4" key={cat.slug}>
                        <Link href={`/category/${cat.slug}`} className="category-card">
                          <span
                            className="category-card_img"
                            style={{ backgroundColor: cat.color || '#64748b' }}
                          >
                            {image ? <img src={image} alt={label} /> : null}
                            <span
                              className="category-card_dot"
                              style={{ backgroundColor: cat.color || '#64748b' }}
                            />
                          </span>
                          <span className="category-card_body">
                            <h4>{label}</h4>
                            <p>
                              {typeof cat.count === 'number'
                                ? `${cat.count} ${cat.count === 1 ? 'Article' : 'Articles'}`
                                : 'View category'}
                            </p>
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="col-md-6 col-lg-4">
              <TabWidget posts={articles.slice(0, 4)} />
            </div>
          </div>
        </div>
      </div>
      <div className="space-70" />
      <BottomBannerArea />
    </>
  );
};

export default CategoriesPage;
