"use client"

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Icon } from '../common/Icon';
import { getArticleSlug } from '@/utils/articleUtils';
import type { Article } from '@/types';

interface TrendingCarouselProps {
  className?: string;
  posts?: Article[];
}

export const TrendingCarousel: React.FC<TrendingCarouselProps> = ({ className = '', posts = [] }) => {
  if (posts.length === 0) return null;

  return (
    <div className={className || ''}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="carousel_posts1 owl-carousel nav_style2 mb40 mt30">
              <div className="px-4 position-relative">
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    nextEl: '.swiper-button-next11',
                    prevEl: '.swiper-button-prev11',
                  }}
                  className="trancarousel"
                  slidesPerView={3}
                  spaceBetween={20}
                  loop={true}
                  breakpoints={{
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    320: { slidesPerView: 1, spaceBetween: 20 },
                  }}
                >
                  {posts.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="single_post widgets_small post_type5">
                        <div className="post_img">
                          <div className="img_wrap">
                            <Link href={`/post/${getArticleSlug(item.title)}`}>
                              <img src={item.image} alt="slider5" style={{ minHeight: '91px' }} />
                            </Link>
                          </div>
                        </div>
                        <div className="single_post_text">
                          <h4>
                            <Link href={`/post/${getArticleSlug(item.title)}`}>{item.title}</Link>
                          </h4>
                          <p className='text-truncate' style={{ width: '220px' }}>{item.excerpt}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="owl-nav">
                  <div className="owl-prev swiper-button-prev11">
                    <Icon name="angle-left" />
                  </div>
                  <div className="owl-next swiper-button-next11">
                    <Icon name="angle-right" />
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

export default TrendingCarousel;
