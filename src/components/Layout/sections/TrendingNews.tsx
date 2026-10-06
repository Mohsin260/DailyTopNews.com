'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Heading } from '@/components/Layout/common/Heading';
import { Icon } from '@/components/Layout/common/Icon';
import { getArticleSlug } from '@/utils/articleUtils';
import InFeedNativeAd from '@/components/ui/InFeedNativeAd';
import { useNativeAdSlot } from '@/lib/ads/useNativeFeed';
import type { Article } from '@/types';

interface TrendingNewsProps {
  dark?: boolean;
  carouselPosts?: Article[];
  listPosts?: Article[];
}

export const TrendingNews: React.FC<TrendingNewsProps> = ({ dark = false, carouselPosts = [], listPosts = [] }) => {
  const leftList = listPosts.slice(0, 3);
  const rightList = listPosts.slice(3, 6);

  // Each of the three feeds hosts one native ad slot that displaces a random
  // card on every page load (the standalone sidebar `in-feed-x` slot moved
  // into the right-hand list so no native ad sits outside a feed).
  const carouselAdSlot = useNativeAdSlot('homepage', 'in-feed-15', carouselPosts.length);
  const leftAdSlot = useNativeAdSlot('homepage', 'in-feed-4', leftList.length);
  const rightAdSlot = useNativeAdSlot('homepage', 'in-feed-x', rightList.length);

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
              {carouselAdSlot.hasAd && idx === carouselAdSlot.index ? (
                <InFeedNativeAd
                  pageType="homepage"
                  position="in-feed-15"
                  cardStyle="post-type3"
                  dark={dark}
                />
              ) : (
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
              )}
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
          {leftList.map((item, idx) => (
            <div key={idx + 'key'}>
              {leftAdSlot.hasAd && idx === leftAdSlot.index ? (
                <InFeedNativeAd
                  pageType="homepage"
                  position="in-feed-4"
                  cardStyle="widgets-small"
                  dark={dark}
                />
              ) : (
                <>
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
                </>
              )}
            </div>
          ))}
        </div>

        <div className="col-lg-6">
          {rightList.map((item, idx) => (
            <div key={idx + 'key'}>
              {rightAdSlot.hasAd && idx === rightAdSlot.index ? (
                <InFeedNativeAd
                  pageType="homepage"
                  position="in-feed-x"
                  cardStyle="widgets-small"
                  dark={dark}
                />
              ) : (
                <>
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
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TrendingNews;
