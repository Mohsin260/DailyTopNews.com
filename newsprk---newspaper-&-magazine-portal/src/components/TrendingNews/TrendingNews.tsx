import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { trendingNewsCarousel, trendingNewsList } from '../../data/newsData';
import { Heading } from '../common/Heading';
import { Icon } from '../common/Icon';

interface TrendingNewsProps {
  dark?: boolean;
}

export const TrendingNews: React.FC<TrendingNewsProps> = ({ dark = false }) => {
  return (
    <>
      <Heading title="Trending News" />
      <div className="carousel_post2_type2 nav_style1">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next4',
            prevEl: '.swiper-button-prev4',
          }}
          slidesPerView={2}
          spaceBetween={30}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 2 },
            320: { slidesPerView: 1 },
          }}
        >
          {trendingNewsCarousel.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="single_post post_type3">
                <div className="post_img">
                  <div className="img_wrap">
                    <Link to="/">
                      <img src={item.image} alt="post" />
                    </Link>
                  </div>
                </div>
                <div className="single_post_text">
                  <div className="meta">
                    <Link to="/" className="meta_category">
                      {item.category}
                    </Link>
                    <Link to="/" className="meta_date">
                      {item.date}
                    </Link>
                  </div>
                  <h4>
                    <Link to="/">{item.title}</Link>
                  </h4>
                  <div className="space-10" />
                  <p className="post-p">{item.body}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="navBtns">
          <div className="navBtn prevBtn swiper-button-prev4">
            <Icon name="angle-left" />
          </div>
          <div className="navBtn nextBtn swiper-button-next4">
            <Icon name="angle-right" />
          </div>
        </div>
      </div>

      {dark ? <div className="border_white" /> : <div className="border_black" />}
      <div className="space-30" />

      <div className="row">
        <div className="col-lg-6">
          {trendingNewsList.slice(0, 3).map((item, idx) => (
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
                    <Link to="/">{item.category}</Link>
                    <Link to="/">{item.date}</Link>
                  </div>
                  <h4>
                    <Link to="/post1">{item.title}</Link>
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
          {trendingNewsList.slice(3, 6).map((item, idx) => (
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
                    <Link to="/">{item.category}</Link>
                    <Link to="/">{item.date}</Link>
                  </div>
                  <h4>
                    <Link to="/post1">{item.title}</Link>
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
