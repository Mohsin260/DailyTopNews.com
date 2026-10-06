'use client';

import Link from 'next/link';
import { PostItem } from '@/types';
import { getArticleSlug } from '@/utils/articleUtils';
import InFeedNativeAd from '@/components/ui/InFeedNativeAd';
import { useNativeAdSlot } from '@/lib/ads/useNativeFeed';

interface EntertainmentNewsProps {
  entertainments: PostItem[];
}

export const EntertainmentNews: React.FC<EntertainmentNewsProps> = ({ entertainments }) => {
  // When the slot is configured, one random article card is displaced by the
  // ad — grid cell count stays constant and the ad blends in at a new spot
  // on every page load.
  const adSlot = useNativeAdSlot('homepage', 'in-feed-7', entertainments.length);

  return (
    <>
      {entertainments.map((item, idx) => (
        <div className="col-lg-6" key={idx}>
          {adSlot.hasAd && idx === adSlot.index ? (
            <InFeedNativeAd
              pageType="homepage"
              position="in-feed-7"
              cardStyle="post-type3"
              className="mb30"
              bolt={false}
            />
          ) : (
            <div className="single_post post_type3 mb30">
              <div className="post_img">
                <div className="img_wrap">
                  <Link href={`/post/${getArticleSlug(item.title)}`}>
                    <img src={item.image} alt="thumb" />
                  </Link>
                </div>
              </div>
              <div className="single_post_text">
                <div className="meta3">
                  <Link href={`/post/${getArticleSlug(item.title)}`}>{item.categoryLabel || item.category || 'Technology'}</Link>
                  <Link href={`/post/${getArticleSlug(item.title)}`}>{item.date}</Link>
                </div>
                <h4>
                  <Link href={`/post/${getArticleSlug(item.title)}`}>{item.title}</Link>
                </h4>
                <div className="space-10" />
                <p className="post-p">{item.body}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default EntertainmentNews;
