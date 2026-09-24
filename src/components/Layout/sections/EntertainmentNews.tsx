import Link from 'next/link';
import { Fragment } from 'react';
import { PostItem } from '@/types';
import { getArticleSlug } from '@/utils/articleUtils';
import InFeedNativeAd from '@/components/ui/InFeedNativeAd';

interface EntertainmentNewsProps {
  entertainments: PostItem[];
}

export const EntertainmentNews: React.FC<EntertainmentNewsProps> = ({ entertainments }) => {
  return (
    <>
      {entertainments.map((item, idx) => (
        <Fragment key={idx}>
          <div className="col-lg-6">
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
          </div>
          {idx === 1 && (
            <div className="col-lg-6">
              <InFeedNativeAd pageType="homepage" position="in-feed-7" cardStyle="post-type3" />
            </div>
          )}
        </Fragment>
      ))}
    </>
  );
};

export default EntertainmentNews;
