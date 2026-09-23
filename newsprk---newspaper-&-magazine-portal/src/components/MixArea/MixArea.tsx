import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { mixAreaPosts } from '../../data/newsData';
import { Icon } from '../common/Icon';
import { VideoModal } from '../common/VideoModal';

interface MixAreaProps {
  className?: string;
  dark?: boolean;
}

export const MixArea: React.FC<MixAreaProps> = ({ className = '', dark = false }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoId] = useState('0r6C3z3TEKw');

  return (
    <div className={`mix_area ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={`mix_carousel ${dark ? 'primay_bg' : ''}`}>
              <div className="single_mix_carousel nav_style3">
                <Swiper
                  modules={[Navigation]}
                  slidesPerView={2}
                  spaceBetween={30}
                  loop={true}
                  navigation={{
                    nextEl: '.swiper-button-next6',
                    prevEl: '.swiper-button-prev6',
                  }}
                  breakpoints={{
                    1024: { slidesPerView: 2, spaceBetween: 30 },
                    768: { slidesPerView: 1, spaceBetween: 0 },
                    300: { slidesPerView: 1, spaceBetween: 0 },
                  }}
                >
                  {mixAreaPosts.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="single_post post_type6 post_type9">
                        <div className="post_img gradient1">
                          <div className="img_wrap">
                            <Link className="play_btn" to="#" onClick={(e) => {
                              e.preventDefault();
                              setVideoModalOpen(true);
                            }}>
                              <img src={item.image} alt="news" />
                            </Link>
                          </div>
                          <span
                            onClick={() => setVideoModalOpen(true)}
                            className={`tranding ${idx % 2 ? 'left' : ''}`}
                            style={{ cursor: 'pointer' }}
                          >
                            <Icon name={item.icon} />
                          </span>
                        </div>
                        <div className="single_post_text">
                          <div className="meta">
                            <Link to="/">{item.category}</Link>
                            <Link to="#">{item.date}</Link>
                          </div>
                          <h4>
                            <Link to="/video_post1">{item.title}</Link>
                          </h4>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="owl-nav">
                  <div className="owl-prev swiper-button-prev6">
                    <Icon name="angle-left" />
                  </div>
                  <div className="owl-next swiper-button-next6">
                    <Icon name="angle-right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-30" />
      <VideoModal
        isOpen={videoModalOpen}
        videoId={currentVideoId}
        onClose={() => setVideoModalOpen(false)}
      />
    </div>
  );
};

export default MixArea;
