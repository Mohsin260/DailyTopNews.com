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

interface TrendingNewsProps {
  dark?: boolean;
  carouselPosts?: Article[];
  listPosts?: Article[];
}

export const TrendingNews: React.FC<TrendingNewsProps> = ({ dark = false, carouselPosts = [], listPosts = [] }) => {
  return (
    <>
      <Heading title="Trending News" />
      <div className="carousel_post2_type3 nav_style1">
        <Swiper
          className="trancarousel"
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.swiper-button-next17',
            prevEl: '.swiper-button-prev17',
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          slidesPerView={2}
          spaceBetween={20}
          loop={true}
          breakpoints={{
            1024: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 1, spaceBetween: 20 },
            300: { slidesPerView: 1, spaceBetween: 20 },
          }}
        >
          {carouselPosts.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="single_post post_type3">
                <div className="post_img">
                  <div className="img_wrap">
                    <img src={item.image} alt="thumb" />
                  </div>
                  <span className="tranding">
                    <Icon name="fa-bolt" />
                  </span>
                </div>
                <div className="single_post_text">
                  <div className="meta3">
                    <Link href={`/post/${getArticleSlug(item.title)}`}>{item.categoryLabel || item.category}</Link>
                    <Link href={`/post/${getArticleSlug(item.title)}`}>{item.date}</Link>
                  </div>
                  <h4>
                    <Link href={`/post/${getArticleSlug(item.title)}`}>{item.title}</Link>
                  </h4>
                  <div className="space-10" />
                  <p className="post-p">{item.excerpt}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="navBtns">
          <div className="navBtn prevtBtn swiper-button-prev17">
            <Icon name="angle-left" />
          </div>
          <div className="navBtn nextBtn swiper-button-next17">
            <Icon name="angle-right" />
          </div>
        </div>
      </div>

      {dark ? <div className="border_white" /> : <div className="border_black" />}
      <div className="space-30" />

      <div className="row">
        <div className="col-lg-6">
          {listPosts.slice(0, 3).map((item, idx) => (
            <div key={idx + 'key'}>
              <div className="single_post widgets_small">
                <div className="post_img">
                  <div className="img_wrap">
                    <img src={item.image} alt="thumb" />
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
          ))}
        </div>

        <div className="col-lg-6">
          {listPosts.slice(3, 6).map((item, idx) => (
            <div key={idx + 'key'}>
              <div className="single_post widgets_small">
                <div className="post_img">
                  <div className="img_wrap">
                    <img src={item.image} alt="thumb" />
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
          ))}
        </div>
      </div>
    </>
  );
};

export default TrendingNews;
