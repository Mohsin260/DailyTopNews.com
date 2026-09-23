'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Heading } from '@/components/Layout/common/Heading';
import { Icon } from '@/components/Layout/common/Icon';
import { getArticleSlug } from '@/utils/articleUtils';
import type { Article } from '@/types';

interface FeatureNewsProps {
  className?: string;
  posts?: Article[];
}

export const FeatureNews: React.FC<FeatureNewsProps> = ({ className = '', posts = [] }) => {
  if (posts.length === 0) return null;

  return (
    <div className={`feature_carousel_area mb40 ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Heading title="Feature News" />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="feature_carousel nav_style1">
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                  nextEl: '.fn-swiper-next',
                  prevEl: '.fn-swiper-prev',
                }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                slidesPerView={4}
                spaceBetween={30}
                loop={true}
                breakpoints={{
                  1024: { slidesPerView: 4, spaceBetween: 30 },
                  768: { slidesPerView: 2, spaceBetween: 30 },
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  320: { slidesPerView: 1, spaceBetween: 20 },
                }}
              >
                {posts.map((post, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="single_post post_type6 post_type7">
                      <div className="post_img gradient1">
                        <Link href={`/post/${getArticleSlug(post.title)}`}>
                          <img src={post.image} alt="feature news" />
                        </Link>
                      </div>
                      <div className="single_post_text">
                        <div className="meta5">
                          <Link href={`/post/${getArticleSlug(post.title)}`}>{post.category}</Link>
                          <Link href={`/post/${getArticleSlug(post.title)}`}>{post.date}</Link>
                        </div>
                        <h4>
                          <Link href={`/post/${getArticleSlug(post.title)}`}>{post.title}</Link>
                        </h4>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="navBtns">
                <div className="navBtn prevtBtn fn-swiper-prev">
                  <Icon name="angle-left" />
                </div>
                <div className="navBtn nextBtn fn-swiper-next">
                  <Icon name="angle-right" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureNews;
