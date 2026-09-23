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

interface MostSharedProps {
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
  return r.map((it, idx) => ({
    ...it,
    id: (idx % 2 ? Math.floor(b.length / 2) + (idx - 1) / 2 + 1 : idx / 2 + 1) as number,
  }));
};

export const MostShared: React.FC<MostSharedProps> = ({
  title = 'Most share',
  dark = false,
  posts = [],
}) => {
  const items = posts.length > 0 ? Bt(posts, 10) : [];

  if (items.length === 0) return null;

  return (
    <div className="widget tab_widgets mb30">
      <h2 className="widget-title">{title}</h2>
      <div className="post_type2_carousel multipleRowCarousel nav_style1">
        <Swiper
          modules={[Grid, Navigation]}
          navigation={{
            nextEl: '.swiper-button-next7',
            prevEl: '.swiper-button-prev7',
          }}
          slidesPerView={1}
          grid={{ rows: 6 }}
        >
          {items.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="carousel_items">
                <div className="single_post widgets_small widgets_type4">
                  <div className="post_img number">
                    <h2>{item.id}</h2>
                  </div>
                  <div className="single_post_text">
                    <div className="meta2">
                      <Link href={`/post/${getArticleSlug(item.title)}`}>{item.category}</Link>
                      <Link href={`/post/${getArticleSlug(item.title)}`}>{item.date}</Link>
                    </div>
                    <h4>
                      <Link href={`/post/${getArticleSlug(item.title)}`}>{item.title}</Link>
                    </h4>
                    <ul className="inline socail_share">
                      <li>
                        <Link href="#">
                          <Icon name="twitter" /> 2.2K
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Icon name="facebook-f" /> 2.2K
                        </Link>
                      </li>
                    </ul>
                    <div className="space-15" />
                    {dark ? <div className="border_white" /> : <div className="border_black" />}
                  </div>
                </div>
                <div className="space-15" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="navBtns">
          <div className="navBtn prevtBtn swiper-button-prev7">
            <Icon name="angle-left" />
          </div>
          <div className="navBtn nextBtn swiper-button-next7">
            <Icon name="angle-right" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostShared;
