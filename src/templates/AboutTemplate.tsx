'use client';

import Link from 'next/link';
import TabWidget from '@/components/Layout/Sidebar/TabWidget';
import TrendingNewsWidget from '@/components/Layout/Sidebar/TrendingNewsWidget';
import MostShared from '@/components/Layout/Sidebar/MostShared';
import NewsletterWidget from '@/components/Layout/Sidebar/NewsletterWidget';
import BannerWidget from '@/components/Layout/Sidebar/BannerWidget';
import BottomBannerArea from '@/components/Layout/common/BottomBannerArea';
import AdSlot from '@/components/ui/AdSlot';
import { Icon } from '@/components/Layout/common/Icon';
import { categoriesList } from '@/data/config';
import { scrollIconBase64 } from '@/data/base64Assets';
import type { Article, Category } from '@/types';

interface AboutPageProps {
  categories: Category[];
  articles: Article[];
}

const fallbackImageFor = (cat: Category, index: number): string => {
  const label = (cat.label || cat.name || cat.slug || '').toLowerCase();
  const match = categoriesList.find(
    (item) => item.title.toLowerCase() === label || item.title.toLowerCase() === cat.slug
  );
  if (match) return match.big_image;
  return categoriesList[index % categoriesList.length]?.big_image || '';
};

export const AboutPage: React.FC<AboutPageProps> = ({ categories, articles }) => {
  const sectionLabels = categories
    .map((cat) => cat.label || cat.name || cat.slug)
    .filter(Boolean) as string[];
  const desksLine =
    sectionLabels.length > 1
      ? `${sectionLabels.slice(0, -1).join(', ')} and ${sectionLabels[sectionLabels.length - 1]}`
      : sectionLabels[0] || 'news';

  const stats = [
    { icon: 'th', value: String(categories.length), label: 'News Desks' },
    { icon: 'newspaper-o', value: String(articles.length), label: 'Stories Published' },
    { icon: 'clock-o', value: '24/7', label: 'Newsroom Coverage' },
    { icon: 'unlock', value: '100%', label: 'Free to Read' },
  ];

  const values = [
    {
      icon: 'check-circle',
      title: 'Accuracy first',
      text: 'Every headline is verified against primary sources before it publishes. When we get something wrong, we correct it openly and promptly.',
    },
    {
      icon: 'balance-scale',
      title: 'Editorial independence',
      text: 'Our newsroom is walled off from advertisers and owners. What we cover is decided by editors — never by sponsors.',
    },
    {
      icon: 'bolt',
      title: 'Around-the-clock updates',
      text: 'A 24/7 newsroom means stories are refreshed as they develop: morning briefings, live updates and evening roundups.',
    },
  ];

  return (
    <>
      <div className="inner inner_bg inner_overlay">
        <div className="container">
          <div className="inner_wrap">
            <div className="row">
              <div className="col-lg-8">
                <div className="title_inner">
                  <h6>ABOUT US</h6>
                  <h1>About DailyTopNews</h1>
                  <p className="about-hero_tagline">
                    Your daily briefing on the stories shaping the world — breaking news, deep
                    dives and analysis, published around the clock.
                  </p>
                </div>
              </div>
            </div>
            <div className="inner_scroll">
              <div className="scrollIcon">
                <img src={scrollIconBase64} alt="scrollIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>

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
              <div className="about_section mb30">
                <div className="categories_title">
                  <h5>Who we are</h5>
                </div>
                <div className="about_intro">
                  <p>
                    DailyTopNews is a digital newspaper and magazine portal built for readers who
                    want the full picture, fast. We combine breaking wire updates with original
                    reporting and analysis from across the globe, all in one place.
                  </p>
                  <p>
                    Our editorial desks — {desksLine} — publish continuously throughout the day.
                    Every article is fact-checked by our editors, corrected transparently when
                    needed, and updated as events develop so the version you read is the version
                    that is current.
                  </p>
                  <p>
                    Reading DailyTopNews is completely free. No paywalls, no account required —
                    open the site and you are caught up.
                  </p>
                </div>
              </div>

              <div className="about_stats mb30">
                {stats.map((stat) => (
                  <div className="about_stat" key={stat.label}>
                    <Icon name={stat.icon} />
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="about_section mb30">
                <div className="categories_title">
                  <h5>What we cover</h5>
                </div>
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
                <div className="space-10" />
                <Link href="/categories" className="readmore">
                  Browse all categories
                </Link>
              </div>

              <div className="about_section mb30">
                <div className="categories_title">
                  <h5>Why readers trust us</h5>
                </div>
                <div className="about_values">
                  {values.map((value) => (
                    <div className="about_value" key={value.title}>
                      <span className="about_value_icon">
                        <Icon name={value.icon} />
                      </span>
                      <h4>{value.title}</h4>
                      <p>{value.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="about_cta primay_bg">
                <div className="about_cta_text">
                  <h3>Have a tip or a story idea?</h3>
                  <p>Our editors are around the clock — reach the newsroom any time.</p>
                </div>
                <div className="about_cta_actions">
                  <Link href="/contact" className="cbtn1">
                    Contact us
                  </Link>
                  <Link href="/categories" className="about_cta_link">
                    Browse all categories
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <TabWidget posts={articles.slice(0, 4)} />
              <TrendingNewsWidget posts={articles} />
              <BannerWidget pageType="website" className="mb30" />
              <MostShared title="Most Share" posts={articles} />
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
