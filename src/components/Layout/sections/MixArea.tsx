'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Icon } from '@/components/Layout/common/Icon';
import { VideoModal } from '@/components/Layout/common/VideoModal';
import { getArticleSlug } from '@/utils/articleUtils';
import type { Article } from '@/types';

interface MixAreaProps {
  className?: string;
  dark?: boolean;
  posts?: Article[];
}

export const MixArea: React.FC<MixAreaProps> = ({ className = '', dark = false, posts = [] }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoId] = useState('0r6C3z3TEKw');

  if (posts.length === 0) return null;

  return (
    <div className={`mix_area ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={`mix_carousel ${dark ? 'primay_bg' : ''}`}>
              <div className="single_mix_carousel nav_style3">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  slidesPerView={2}
                  spaceBetween={30}
                  loop={true}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  navigation={{
                    nextEl: '.mix-swiper-next',
                    prevEl: '.mix-swiper-prev',
                  }}
                  breakpoints={{
                    1024: { slidesPerView: 2, spaceBetween: 30 },
                    768: { slidesPerView: 1, spaceBetween: 0 },
                    300: { slidesPerView: 1, spaceBetween: 0 },
                  }}
                >
                  {posts.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="single_post post_type6 post_type9">
                        <div className="post_img gradient1">
                          <div className="img_wrap">
                            <Link className="play_btn" href="#" onClick={(e) => {
                              e.preventDefault();
                              setVideoModalOpen(true);
                            }}>
                              <img src={item.image} alt="news" />
                            </Link>
                          </div>
                          <span
                            onClick={() => setVideoModalOpen(true)}
                            className={`tranding ${idx % 2 ? 'left' : ''}`}
                          >
                            <Icon name="bolt" />
                          </span>
                        </div>
                        <div className="single_post_text">
                          <div className="meta">
                            <Link href={`/post/${getArticleSlug(item.title)}`}>{item.categoryLabel || item.category}</Link>
                            <Link href={`/post/${getArticleSlug(item.title)}`}>{item.date}</Link>
                          </div>
                          <h4>
                            <Link href={`/post/${getArticleSlug(item.title)}`}>{item.title}</Link>
                          </h4>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="owl-nav">
                  <div className="owl-prev mix-swiper-prev">
                    <Icon name="angle-left" />
                  </div>
                  <div className="owl-next mix-swiper-next">
                    <Icon name="angle-right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-30" />
      <VideoModal isOpen={videoModalOpen} videoId={currentVideoId} onClose={() => setVideoModalOpen(false)} />
    </div>
  );
};

export default MixArea;
