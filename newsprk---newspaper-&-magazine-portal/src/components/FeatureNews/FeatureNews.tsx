import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { featureNewsPosts } from '../../data/newsData';
import { Heading } from '../common/Heading';
import { Icon } from '../common/Icon';

interface FeatureNewsProps {
  className?: string;
}

export const FeatureNews: React.FC<FeatureNewsProps> = ({ className = '' }) => {
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
            <div className="feature_carousel nav_style1 owl-carousel">
              <Swiper
                modules={[Navigation]}
                navigation={{
                  nextEl: '.swiper-button-next3',
                  prevEl: '.swiper-button-prev3',
                }}
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
                {featureNewsPosts.map((post, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="single_post post_type6 post_type7">
                      <div className="post_img gradient7">
                        <div className="img_wrap">
                          <Link to="/">
                            <img src={post.image} alt="feature news" />
                          </Link>
                        </div>
                        <div className="single_post_text">
                          <Link to="/" className="meta meta_category">
                            {post.category}
                          </Link>
                          <Link to="/" className="meta meta_date">
                            {post.date}
                          </Link>
                          <h4>
                            <Link to="/">{post.title}</Link>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="navBtns">
                <div className="navBtn prevBtn swiper-button-prev3">
                  <Icon name="angle-left" />
                </div>
                <div className="navBtn nextBtn swiper-button-next3">
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
