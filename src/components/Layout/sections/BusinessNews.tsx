import Link from 'next/link';
import { Fragment } from 'react';
import { PostItem } from '@/types';
import { getArticleSlug } from '@/utils/articleUtils';
import InFeedNativeAd from '@/components/ui/InFeedNativeAd';

interface BusinessNewsProps {
  businessNews: PostItem[];
  headerHide?: boolean;
}

export const BusinessNews: React.FC<BusinessNewsProps> = ({
  businessNews,
  headerHide = false,
}) => {
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
                  <div className="single_post post_type3 post_type12 mb30">
                    <div className="post_img">
                      <div className="img_wrap">
                        <Link href={`/post/${getArticleSlug(item.title)}`}>
                          <img src={item.image} alt="thumb" />
                        </Link>
                      </div>
                    </div>
                    <div className="single_post_text">
                      <div className="meta3">
                        <Link href={`/post/${getArticleSlug(item.title)}`}>{item.categoryLabel || item.category || 'Business'}</Link>
                        <Link href={`/post/${getArticleSlug(item.title)}`}>{item.date || 'March 26, 2020'}</Link>
                      </div>
                      <h4>
                        <Link href={`/post/${getArticleSlug(item.title)}`}>
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
                  {idx === 1 && (
                    <InFeedNativeAd pageType="homepage" position="in-feed-9" cardStyle="post-type12" />
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
