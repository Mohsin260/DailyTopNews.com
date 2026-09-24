'use client';

import Link from 'next/link';
import Breadcrumb from '@/components/Layout/common/Breadcrumb';
import { Icon } from '@/components/Layout/common/Icon';
import FollowUs from '@/components/Layout/Sidebar/FollowUs';
import MostShared from '@/components/Layout/Sidebar/MostShared';
import NewsletterWidget from '@/components/Layout/Sidebar/NewsletterWidget';
import TabWidget from '@/components/Layout/Sidebar/TabWidget';
import TrendingNewsWidget from '@/components/Layout/Sidebar/TrendingNewsWidget';
import LatestBlogSection from '@/components/Layout/Post/LatestBlogSection';
import CommentsSection from '@/components/Layout/Post/CommentsSection';
import AdSlot from '@/components/ui/AdSlot';
import InFeedNativeAd from '@/components/ui/InFeedNativeAd';
import ArticleMediaBlock from '@/components/Layout/Post/ArticleMediaBlock';
import { getArticleSlug } from '@/utils/articleUtils';
import type { Article } from '@/types';

interface ArticleTemplateProps {
  article: Article;
  prevArticle?: Article;
  nextArticle?: Article;
  sidebarPosts?: Article[];
  latestPosts?: Article[];
}

export const ArticleTemplate: React.FC<ArticleTemplateProps> = ({
  article,
  prevArticle,
  nextArticle,
  sidebarPosts = [],
  latestPosts = [],
}) => {
  return (
    <div className="archives post post1">
      <Breadcrumb className="shadow5 padding-top-30" title={`Archive / ${article.categoryLabel || article.category}`} />
      <span className="space-30" />
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-8">
            <div className="row">
              <div className="col-6 align-self-center">
                <div className="page_category">
                  <Link href={`/category/${article.category}`}>
                    <h4>{(article.categoryLabel || article.category).toUpperCase()}</h4>
                  </Link>
                </div>
              </div>
              <div className="col-6 text-right">
                <div className="page_comments">
                  <ul className="inline">
                    <li>
                      <Icon name="comment" /> {article.views}
                    </li>
                    <li>
                      <Icon name="fire" /> {article.views}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <AdSlot
              pageType="article"
              position="top-leaderboard"
              articleSlug={article.slug || getArticleSlug(article.title)}
              width="728px"
              height="90px"
              responsive
              fullWidth
              beforeSpaceClass="space-30"
              afterSpaceClass="space-30"
            />

            <div className="single_post_heading">
              <h1>{article.title}</h1>
              <div className="space-10" />
              <p>{article.excerpt}</p>
            </div>

            <AdSlot
              pageType="article"
              position="atf-rectangle"
              articleSlug={article.slug || getArticleSlug(article.title)}
              width="336px"
              height="280px"
              responsive
              fullWidth
              beforeSpaceClass="space-40"
              afterSpaceClass="space-40"
            />
            <ArticleMediaBlock
              media={article.articleMedia?.heroCoverMedia}
              position="hero-cover"
              alt={article.title}
              fallbackImage={article.image}
              alwaysFallback
            />
            <div className="space-20" />

            <div className="row">
              <div className="col-lg-6 align-self-center">
                <div className="author">
                  <div className="author_img">
                    <div className="author_img_wrap">
                      <img src="/assets/author1-C1xL9xYF.png" alt={article.authorName} />
                    </div>
                  </div>
                  <Link href="/">{article.authorName}</Link>
                  <ul>
                    <li>{article.date}</li>
                    <li>{article.readTime} min read</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 align-self-center">
                <div className="author_social inline text-right">
                  <ul>
                    <li>
                      <Link href="#">
                        <Icon name="instagram" />
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Icon name="facebook-f" />
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Icon name="youtube" />
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Icon name="twitter" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-20" />
            <ArticleMediaBlock
              media={article.articleMedia?.postBodyMedia}
              position="post-body"
              alt={article.title}
            />
            <div dangerouslySetInnerHTML={{ __html: article.bodyContent || '' }} />

            <InFeedNativeAd
              pageType="article"
              position="article-native-1"
              cardStyle="post-type3"
            />

            <AdSlot
              pageType="article"
              position="in-content-1"
              articleSlug={article.slug || getArticleSlug(article.title)}
              width="728px"
              height="90px"
              responsive
              fullWidth
              beforeSpaceClass="space-40"
            />

            {(article.keyTakeawaysContent || article.articleMedia?.keyTakeawaysMedia?.url) && (
              <>
                <div className="space-40" />
                <h3>Key Takeaways</h3>
                <ArticleMediaBlock
                  media={article.articleMedia?.keyTakeawaysMedia}
                  position="key-takeaways"
                  alt={article.title}
                />
                {article.keyTakeawaysContent && (
                  <div dangerouslySetInnerHTML={{ __html: article.keyTakeawaysContent }} />
                )}
              </>
            )}

            <InFeedNativeAd
              pageType="article"
              position="article-native-2"
              cardStyle="post-type3"
            />

            <AdSlot
              pageType="article"
              position="in-content-2"
              articleSlug={article.slug || getArticleSlug(article.title)}
              width="728px"
              height="90px"
              responsive
              fullWidth
              beforeSpaceClass="space-40"
            />

            {(article.finalThoughtsContent || article.articleMedia?.finalThoughtsMedia?.url) && (
              <>
                <div className="space-40" />
                <h3>Final Thoughts</h3>
                <ArticleMediaBlock
                  media={article.articleMedia?.finalThoughtsMedia}
                  position="final-thoughts"
                  alt={article.title}
                />
                {article.finalThoughtsContent && (
                  <div dangerouslySetInnerHTML={{ __html: article.finalThoughtsContent }} />
                )}
              </>
            )}

            <div className="space-40" />
            <div className="tags">
              <ul className="inline">
                <li className="tag_list">
                  <Icon name="tag" /> tags
                </li>
                {article.tags?.map((tag) => (
                  <li key={tag}>
                    <Link href={`/category/${tag}`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-40" />
            <div className="border_black" />
            <div className="space-40" />

            <div className="next_prev">
              <div className="row">
                <div className="col-lg-6 align-self-center">
                  {prevArticle ? (
                    <div className="next_prv_single border_left3">
                      <p>PREVIOUS NEWS</p>
                      <h3>
                        <Link href={`/post/${getArticleSlug(prevArticle.title)}`}>
                          {prevArticle.title}
                        </Link>
                      </h3>
                    </div>
                  ) : (
                    <div className="next_prv_single border_left3">
                      <p>PREVIOUS NEWS</p>
                      <h3>
                        <Link href={`/post/${getArticleSlug(article.title)}`}>
                          {article.title}
                        </Link>
                      </h3>
                    </div>
                  )}
                </div>
                <div className="col-lg-6 align-self-center">
                  {nextArticle ? (
                    <div className="next_prv_single border_left3">
                      <p>NEXT NEWS</p>
                      <h3>
                        <Link href={`/post/${getArticleSlug(nextArticle.title)}`}>
                          {nextArticle.title}
                        </Link>
                      </h3>
                    </div>
                  ) : (
                    <div className="next_prv_single border_left3">
                      <p>NEXT NEWS</p>
                      <h3>
                        <Link href={`/post/${getArticleSlug(article.title)}`}>
                          {article.title}
                        </Link>
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

            <div className="col-md-6 col-lg-4">
            <TabWidget posts={sidebarPosts} />
            <InFeedNativeAd
              pageType="article"
              position="sidebar-infeed"
              cardStyle="widgets-small-sep"
            />
            <FollowUs title="Follow Us" />
            <TrendingNewsWidget posts={sidebarPosts} />
            <InFeedNativeAd
              pageType="article"
              position="in-feed-x"
              cardStyle="post-type3"
            />
            <AdSlot
              pageType="article"
              position="sidebar-sticky"
              articleSlug={article.slug || getArticleSlug(article.title)}
              width="300px"
              height="600px"
              responsive
              fullWidth
              beforeSpaceClass="space-30"
            />
            <AdSlot
              pageType="article"
              position="sidebar-rectangle"
              articleSlug={article.slug || getArticleSlug(article.title)}
              width="300px"
              height="250px"
              responsive
              fullWidth
              wrapperClassName="banner2 mb30"
            />
            <MostShared title="Most Share" posts={sidebarPosts} />
            <NewsletterWidget />
          </div>
        </div>
        <div className="space-40" />
        <div className="row">
          <div className="col-12">
            <AdSlot
              pageType="article"
              position="bottom-leaderboard"
              articleSlug={article.slug || getArticleSlug(article.title)}
              width="728px"
              height="90px"
              responsive
              fullWidth
            />
          </div>
        </div>
      </div>

      <div className="space-60" />
      <LatestBlogSection dark={true} posts={latestPosts} />
      <div className="space-60" />
      <CommentsSection dark={true} />
      <div className="space-60" />
      <div className="parimay_bg padding5050">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 m-auto">
              <div className="banner1">
                <AdSlot
                  pageType="article"
                  position="above-footer"
                  articleSlug={article.slug || getArticleSlug(article.title)}
                  width="728px"
                  height="90px"
                  responsive
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-30" />
    </div>
  );
};

export default ArticleTemplate;
