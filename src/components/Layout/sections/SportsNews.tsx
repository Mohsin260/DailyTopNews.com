'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import { Icon } from '@/components/Layout/common/Icon';
import { getArticleSlug } from '@/utils/articleUtils';
import type { Article } from '@/types';

interface SportsNewsProps {
  dark?: boolean;
  featuredPost?: Article;
  posts?: Article[];
}

export const SportsNews: React.FC<SportsNewsProps> = ({ dark = false, featuredPost, posts = [] }) => {
  if (!featuredPost && posts.length === 0) return null;

  return (
    <div className="row">
      <div className="col-12">
        <div className="sports">
          <div className="row">
            <div className="col-12">
              <div className="heading">
                <h2 className="widget-title">Sports News</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {featuredPost && (
                <div className="single_post post_type3 mb30">
                  <div className="post_img">
                    <Link href={`/post/${getArticleSlug(featuredPost.title)}`}>
                      <img src={featuredPost.image} alt="sportsbig1" />
                    </Link>
                    <span className="tranding">
                      <Icon name="bolt" />
                    </span>
                  </div>
                  <div className="single_post_text">
                    <div className="meta3">
                       <Link href={`/post/${getArticleSlug(featuredPost.title)}`}>{featuredPost.categoryLabel || featuredPost.category}</Link>
                      <Link href={`/post/${getArticleSlug(featuredPost.title)}`}>{featuredPost.date}</Link>
                    </div>
                    <h4>
                      <Link href={`/post/${getArticleSlug(featuredPost.title)}`}>{featuredPost.title}</Link>
                    </h4>
                    <div className="space-10" />
                    <p className="post-p">
                      {featuredPost.excerpt}
                    </p>
                    <div className="space-20" />
                     <Link href={`/post/${getArticleSlug(featuredPost.title)}`} className="readmore">
                       Read More
                     </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right side list */}
            <div className="col-md-6">
              <div className="sports_carousel nav_style1">
                <div className="widget tab_widgets">
                  <div className="post_type2_carousel multipleRowCarousel nav_style1">
                    <Swiper
                      modules={[Grid, Navigation]}
                      navigation={{
                        nextEl: '.swiper-button-next13',
                        prevEl: '.swiper-button-prev13',
                      }}
                      slidesPerView={1}
                      grid={{ rows: 5 }}
                    >
                      {posts.map((item, idx) => (
                        <SwiperSlide key={idx}>
                          <div className="single_post2_carousel">
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
                                   <Link href={`/post/${getArticleSlug(item.title)}`}>{item.categoryLabel || item.category}</Link>
                                  <Link href={`/post/${getArticleSlug(item.title)}`}>{item.date}</Link>
                                </div>
                                <h4>
                                  <Link href={`/post/${getArticleSlug(item.title)}`}>{item.title}</Link>
                                </h4>
                              </div>
                            </div>
                            <div className="space-15" />
                            {dark ? <div className="border_white" /> : <div className="border_black" />}
                            <div className="space-15" />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div className="navBtns">
                      <div className="navBtn prevtBtn swiper-button-prev13">
                        <Icon name="angle-left" />
                      </div>
                      <div className="navBtn nextBtn swiper-button-next13">
                        <Icon name="angle-right" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsNews;
