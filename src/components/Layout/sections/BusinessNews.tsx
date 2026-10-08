'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { PostItem } from '@/types';
import { getArticleSlug } from '@/utils/articleUtils';
import InFeedNativeAd from '@/components/ui/InFeedNativeAd';
import { useNativeAdSlot } from '@/lib/ads/useNativeFeed';

interface BusinessNewsProps {
  businessNews: PostItem[];
  headerHide?: boolean;
}

export const BusinessNews: React.FC<BusinessNewsProps> = ({
  businessNews,
  headerHide = false,
}) => {
  // The ad displaces one random post_type12 row (replaces the old always-appended
  // cell) so the section never grows an extra row when the slot is configured.
  const adSlot = useNativeAdSlot('homepage', 'in-feed-9', businessNews.length);

  return (
    <div className="row">
      <div className="col-12">
        <div className="businerss_news">
          {!headerHide && (
            <div className="row">
              <div className="col-6 align-self-center">
                <h2 className="widget-title">Business News</h2>
              </div>
              <div className="col-6 text-right align-self-center">
                <Link href="/" className="see_all mb20">
                  See All
                </Link>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-12">
              {businessNews.map((item, idx) => (
                <Fragment key={idx}>
                  {adSlot.hasAd && idx === adSlot.index ? (
                    <InFeedNativeAd
                      pageType="homepage"
                      position="in-feed-9"
                      cardStyle="post-type12"
                    />
                  ) : (
                    <div className="single_post post_type3 post_type12 mb30">
                      <div className="post_img">
                        <div className="img_wrap">
                          <Link href={`/post/${item.slug || getArticleSlug(item.title)}`}>
                            <img src={item.image} alt="thumb" />
                          </Link>
                        </div>
                      </div>
                      <div className="single_post_text">
                        <div className="meta3">
                          <Link href={`/post/${item.slug || getArticleSlug(item.title)}`}>{item.categoryLabel || item.category || 'Business'}</Link>
                          <Link href={`/post/${item.slug || getArticleSlug(item.title)}`}>{item.date || 'March 26, 2020'}</Link>
                        </div>
                        <h4>
                          <Link href={`/post/${item.slug || getArticleSlug(item.title)}`}>
                            {item.title || 'Copa America: Luis Suarez from devastated US'}
                          </Link>
                        </h4>
                        <div className="space-10" />
                        <p className="post-p">
                          {item.body ||
                            'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with…'}
                        </p>
                        <div className="space-20" />
                        <Link href={`/category/${item.category || 'business'}`} className="readmore">
                          Read more
                        </Link>
                      </div>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessNews;
