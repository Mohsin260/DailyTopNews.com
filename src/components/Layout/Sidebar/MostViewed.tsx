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

interface MostViewedProps {
  no_margin?: boolean;
  title?: string;
  dark?: boolean;
  posts?: Article[];
}

const Bt = (s: Article[], n: number) => {
  const b: Article[] = [];
  for (let i = 0; i < n; i++) b.push({ ...s[i % s.length] });
  let a = 0;
  let t = Math.floor(b.length / 2) - 1;
  const r: Article[] = [];
  b.forEach((it, idx) => {
    if (idx % 2) {
      t += 1;
      r.push({ ...b[t] });
    } else {
      a += 1;
      r.push({ ...b[a] });
    }
  });
  return r.map((it, idx) => ({ ...it, count: (idx % 2 ? 7 + (idx - 1) / 2 : idx / 2 + 1) as number }));
};

export const MostViewed: React.FC<MostViewedProps> = ({
  no_margin = false,
  title = 'Most View',
  dark = false,
  posts = [],
}) => {
  const items = posts.length > 0 ? Bt(posts, 12) : [];

  if (items.length === 0) return null;

  return (
    <div className={`widget tab_widgets ${no_margin ? '' : 'mb30'}`}>
      <h2 className="widget-title">{title}</h2>
      <div className="post_type2_carousel multipleRowCarousel nav_style1">
        <Swiper
          modules={[Grid, Navigation]}
          navigation={{
            nextEl: '.swiper-button-next8',
            prevEl: '.swiper-button-prev8',
          }}
          slidesPerView={1}
          grid={{ rows: 6 }}
        >
          {items.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="single_post2_carousel">
                <div className="single_post widgets_small type8">
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
                  <div className="type8_count">
                    <h2>{item.count}</h2>
                  </div>
                </div>
                {idx + 2 < items.length ? (
                  <>
                    <div className="space-15" />
                    {dark ? <div className="border_white" /> : <div className="border_black" />}
                    <div className="space-15" />
                  </>
                ) : null}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="navBtns">
          <div className="navBtn prevtBtn swiper-button-prev8">
            <Icon name="angle-left" />
          </div>
          <div className="navBtn nextBtn swiper-button-next8">
            <Icon name="angle-right" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostViewed;
