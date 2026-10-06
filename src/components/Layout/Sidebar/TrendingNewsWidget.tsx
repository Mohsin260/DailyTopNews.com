'use client';

import Link from 'next/link';
import { Icon } from '@/components/Layout/common/Icon';
import { getArticleSlug } from '@/utils/articleUtils';
import InFeedNativeAd from '@/components/ui/InFeedNativeAd';
import { useNativeAdSlot } from '@/lib/ads/useNativeFeed';
import type { PageType, AdPosition } from '@/lib/models/AdSnippet';
import type { Article } from '@/types';

interface TrendingNewsWidgetProps {
  dark?: boolean;
  posts?: Article[];
  /** Optional native ad slot hosted inside the small-post list (displaces a random item). */
  adSlot?: { pageType: PageType; position: AdPosition };
}

export const TrendingNewsWidget: React.FC<TrendingNewsWidgetProps> = ({
  dark = false,
  posts = [],
  adSlot,
}) => {
  const featuredPost = posts[0];
  const smallPosts = posts.slice(1, 4);

  // Ad displaces one random small post — widget length stays constant.
  const nativeSlot = useNativeAdSlot(
    adSlot?.pageType ?? 'article',
    adSlot?.position ?? 'in-feed-x',
    adSlot ? smallPosts.length : 0,
    !!adSlot
  );

  if (posts.length === 0) return null;

  return (
    <div className="trending_widget mb30">
      <h2 className="widget-title">Tending News</h2>
      {featuredPost && (
        <div className="single_post post_type3">
          <div className="post_img">
            <div className="img_wrap">
              <Link href={`/post/${getArticleSlug(featuredPost.title)}`}>
                <img src={featuredPost.image} alt="trendbig1" />
              </Link>
            </div>
            <span className="tranding">
              <Icon name="bolt" />
            </span>
          </div>
          <div className="single_post_text">
            <div className="meta3">
              <Link href="#">{featuredPost.categoryLabel || featuredPost.category}</Link>
              <Link href="#">{featuredPost.date}</Link>
            </div>
            <h4>
              <Link href={`/post/${getArticleSlug(featuredPost.title)}`}>
                {featuredPost.title}
              </Link>
            </h4>
            <div className="space-10" />
            <p className="post-p">
              {featuredPost.excerpt}
            </p>
          </div>
        </div>
      )}
      {smallPosts.map((item, idx) => (
        <div key={idx}>
          <div className="space-15" />
          {dark ? <div className="border_white" /> : <div className="border_black" />}
          <div className="space-30" />
          {adSlot && nativeSlot.hasAd && idx === nativeSlot.index ? (
            <InFeedNativeAd
              pageType={adSlot.pageType}
              position={adSlot.position}
              cardStyle="widgets-small"
              dark={dark}
              separators={false}
            />
          ) : (
            <div className="single_post widgets_small">
              <div className="post_img">
                <div className="img_wrap">
                  <Link href={`/post/${getArticleSlug(item.title)}`}>
                    <img src={item.image} alt="thumb" />
                  </Link>
                </div>
                <span className="tranding">
                  <Icon name="bolt" />
                </span>
              </div>
              <div className="single_post_text">
                <div className="meta2">
                  <Link href="#">{item.categoryLabel || item.category}</Link>
                  <Link href="#">{item.date}</Link>
                </div>
                <h4>
                  <Link href={`/post/${getArticleSlug(item.title)}`}>{item.title}</Link>
                </h4>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TrendingNewsWidget;
