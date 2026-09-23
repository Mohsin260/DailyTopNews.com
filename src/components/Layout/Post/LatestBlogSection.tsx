'use client';

import Link from 'next/link';
import { Icon } from '@/components/Layout/common/Icon';
import { getArticleSlug } from '@/utils/articleUtils';
import type { Article } from '@/types';

interface LatestBlogSectionProps {
  dark?: boolean;
  posts?: Article[];
}

export const LatestBlogSection: React.FC<LatestBlogSectionProps> = ({ dark = false, posts = [] }) => {
  if (posts.length === 0) return null;

  return (
    <div className={`${dark ? 'primay_bg' : 'fourth_bg'} padding6030`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="heading">
              <h2 className="widget-title">Our Latest Blog</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {posts.map((item, idx) => (
            <div className="col-md-6 col-lg-4" key={idx}>
              <div className="single_post post_type3 mb30 post_type15 border-radious5">
                <div className="post_img border-radious5">
                  <div className="img_wrap">
                    <img src={item.image} alt="thumb" />
                  </div>
                  <span className="tranding border_tranding">
                    <Icon name="bolt" />
                  </span>
                </div>
                <div className="single_post_text padding20 white_bg">
                  <Link href={`/post/${getArticleSlug(item.title)}`}>{item.title}</Link>
                  <div className="space-10" />
                  <p className="post-p">{item.excerpt}</p>
                  <div className="space-20" />
                  <div className="meta3">
                    <Link href={`/post/${getArticleSlug(item.title)}`}>{item.category}</Link>
                    <Link href={`/post/${getArticleSlug(item.title)}`}>{item.date}</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestBlogSection;
