'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Icon } from '@/components/Layout/common/Icon';

interface TopBarProps {
  className?: string;
  dark?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ className = '', dark = false }) => {
  return (
    <div className={`topbar ${className}`} id="top">
      <div className="container">
        <div className="row">
          <div className="col-md-8 align-self-center">
            <div className={`trancarousel_area ${dark ? 'white' : ''}`} style={{ display: 'flex' }}>
              <p className="trand">Tranding</p>
              <div className="nav_style1" style={{ width: '80%' }}>
                <Swiper
                  modules={[Autoplay, Navigation]}
                  navigation={{
                    nextEl: '.swiper-button-next14',
                    prevEl: '.swiper-button-prev14',
                  }}
                  className="trancarousel"
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                >
                  <SwiperSlide>
                    <div className="trancarousel_item">
                      <p>
                        <Link href="/">Top 10 Best Movies of 2018 So Far: Great Movies To Watch Now</Link>
                      </p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="trancarousel_item">
                      <p>
                        <Link href="/">Top 10 Best Movies of 2018 So Far: Great Movies To Watch Now</Link>
                      </p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="trancarousel_item">
                      <p>
                        <Link href="/">Top 10 Best Movies of 2018 So Far: Great Movies To Watch Now</Link>
                      </p>
                    </div>
                  </SwiperSlide>
                </Swiper>
                <div className="navBtns">
                  <button className="navBtn prevBtn swiper-button-prev14" aria-label="Previous">
                    <Icon name="angle-left" />
                  </button>
                  <button className="navBtn nextBtn swiper-button-next14" aria-label="Next">
                    <Icon name="angle-right" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 align-self-center">
            <div className="top_date_social text-right">
              <div className={`paper_date ${dark ? 'white' : ''}`}>
                <p>Thursday, March 26, 2020</p>
              </div>
              <div className={`social1 ${dark ? 'white' : ''}`}>
                <ul className="inline">
                  <li>
                    <Link href="#">
                      <Icon name="twitter" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <Icon name="facebook-f" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <Icon name="youtube-play" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <Icon name="instagram" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
