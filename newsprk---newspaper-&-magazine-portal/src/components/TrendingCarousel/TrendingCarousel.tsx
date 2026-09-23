import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Icon } from '../common/Icon';

const topCarouselData = [
  {
    title: 'The home decorations document: photograph of an',
    body: 'People have been infected',
    image: '/assets/post-1-BGjgFCDE.jpg',
  },
  {
    title: 'U.S. Response subash says he will label regions by risk of…',
    body: 'People have been infected',
    image: '/assets/post-2-DhIV9LdM.jpg',
  },
  {
    title: 'Stimul package will transform the government fundamentally.',
    body: 'People have been infected',
    image: '/assets/post-3-DNXfgPMx.jpg',
  },
  {
    title: 'U.S. Response subash says he will label regions by risk of…',
    body: 'People have been infected',
    image: '/assets/post-2-DhIV9LdM.jpg',
  },
  {
    title: 'U.S. Response subash says he will label regions by risk of…',
    body: 'People have been infected',
    image: '/assets/post-1-BGjgFCDE.jpg',
  },
  {
    title: 'U.S. Response subash says he will label regions by risk of…',
    body: 'People have been infected',
    image: '/assets/post-3-DNXfgPMx.jpg',
  },
];

interface TrendingCarouselProps {
  className?: string;
}

export const TrendingCarousel: React.FC<TrendingCarouselProps> = ({ className = '' }) => {
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
                  {topCarouselData.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="single_post widgets_small post_type5">
                        <div className="post_img">
                          <div className="img_wrap">
                            <Link to="/">
                              <img src={item.image} alt="slider5" />
                            </Link>
                          </div>
                        </div>
                        <div className="single_post_text">
                          <h4>
                            <Link to="/post1">{item.title}</Link>
                          </h4>
                          <p>{item.body}</p>
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
