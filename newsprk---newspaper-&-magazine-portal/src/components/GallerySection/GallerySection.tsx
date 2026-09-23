import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Icon } from '../common/Icon';
import { VideoModal } from '../common/VideoModal';

interface GallerySectionProps {
  className?: string;
  dark?: boolean;
}

const galleryThumbnails = [
  '/assets/item-1-qg6R-Vff.jpg',
  '/assets/item-2-DzsAXLZt.jpg',
  '/assets/item-3-CpAPLhPC.jpg',
  '/assets/item-4-3vPPcrxq.jpg',
  '/assets/item-5-DaFAzTQ8.jpg',
  '/assets/item-6-CqxiEhBu.jpg',
  '/assets/item-7-BFGifr-y.jpg',
  '/assets/item-4-3vPPcrxq.jpg',
  '/assets/item-3-CpAPLhPC.jpg',
];

const galleryPosts = [
  {
    image: '/assets/gallery-post-DydtzxC6.jpg',
    title: 'Japan’s virus success has puzzled the world. Is its luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-post-2-C0W9wDVx.jpg',
    title: 'Japan’s virus success has puzzled the world. Is its luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-post-DydtzxC6.jpg',
    title: 'Copa America: Luis Suarez from devastated US America',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-post-2-C0W9wDVx.jpg',
    title: 'Japan’s virus success has puzzled the world. Is its luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-post-DydtzxC6.jpg',
    title: 'Copa America: Luis Suarez from devastated US America',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-post-2-C0W9wDVx.jpg',
    title: 'Japan’s virus success has puzzled the world. Is its luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-post-DydtzxC6.jpg',
    title: 'Copa America: Luis Suarez from devastated US America',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-post-2-C0W9wDVx.jpg',
    title: 'Japan’s virus success has puzzled the world. Is its luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-post-DydtzxC6.jpg',
    title: 'Japan’s virus success has puzzled the world. Is its luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
];

const tabPosts = [
  {
    image: '/assets/gallery-1-z8qK02Z1.jpg',
    title: 'Copa America: Luis Suarez from devastated US',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-2-BjL35jxX.jpg',
    title: 'Nancy Zhang a Chinese busy woman and Dhaka',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-3-C5tFqJrq.jpg',
    title: 'U.S. Response subash says he will label regions by risk of…',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-4-BQgMsRpZ.jpg',
    title: 'Venezuela elan govt and opposit the property collect',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-5-BO602hdN.jpg',
    title: 'Cheap smartphone sensor could help you old food safe',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
];

export const GallerySection: React.FC<GallerySectionProps> = ({ className = '', dark = false }) => {
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'1' | '2' | '3'>('1');
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const handleThumbClick = (idx: number) => {
    setActiveIndex(idx);
    if (mainSwiper && !mainSwiper.destroyed) {
      mainSwiper.slideToLoop(idx, 400);
    }
  };

  const currentTabPosts =
    activeTab === '1'
      ? tabPosts
      : activeTab === '2'
      ? tabPosts.slice().reverse()
      : tabPosts;

  return (
    <div className={`post_gallary_area mb40 ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              {/* Featured Slide + Thumbnails Column */}
              <div className="col-xl-8">
                {/* Main Featured Slide Carousel */}
                <div className="slider_demo2">
                  <Swiper
                    onSwiper={setMainSwiper}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={10}
                  >
                    {galleryPosts.map((post, idx) => (
                      <SwiperSlide key={idx}>
                        <div className="single_post post_type6 xs-mb30">
                          <div className="post_img gradient1">
                            <img src={post.image} alt={post.title} />
                            <span
                              onClick={() => setVideoModalOpen(true)}
                              className="tranding"
                              style={{ cursor: 'pointer' }}
                            >
                              <Icon name="play" />
                            </span>
                          </div>
                          <div className="single_post_text">
                            <div className="meta meta_separator1">
                              <Link to="#">{post.category}</Link>
                              <Link to="#">{post.date}</Link>
                            </div>
                            <h4>
                              <Link className="play_btn" to="/video_post1">
                                {post.title}
                              </Link>
                            </h4>
                            <div className="space-10" />
                            <p className="post-p">{post.body}</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Thumbnails Stack: Spans full width of featured container, stacked together with 0 gap */}
                <div className="slider_demo1" style={{ marginBottom: '30px' }}>
                  <div
                    className="gallery_thumbs_stack"
                    style={{
                      display: 'flex',
                      width: '100%',
                      margin: 0,
                      padding: 0,
                      gap: 0,
                    }}
                  >
                    {galleryThumbnails.map((thumbImg, idx) => {
                      const isActive = activeIndex === idx;
                      return (
                        <div
                          key={idx}
                          onClick={() => handleThumbClick(idx)}
                          className={`single_gallary_item ${isActive ? 'active' : ''}`}
                          style={{
                            flex: '1 1 0',
                            minWidth: 0,
                            cursor: 'pointer',
                            position: 'relative',
                            lineHeight: 0,
                            opacity: isActive ? 1 : 0.65,
                            borderBottom: isActive ? '3px solid #ff5555' : '3px solid transparent',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <img
                            src={thumbImg}
                            alt={`thumb-${idx}`}
                            style={{
                              width: '100%',
                              height: '65px',
                              objectFit: 'cover',
                              display: 'block',
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Tabbed Widget Column */}
              <div className="col-xl-4">
                <div className="widget_tab md-mt-30">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a
                        href="#related1"
                        className={`nav-link ${activeTab === '1' ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab('1');
                        }}
                      >
                        RELATED
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#related2"
                        className={`nav-link ${activeTab === '2' ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab('2');
                        }}
                      >
                        RELATED
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#popular"
                        className={`nav-link ${activeTab === '3' ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab('3');
                        }}
                      >
                        POPULAR
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane active show">
                      <div className="widget tab_widgets">
                        {currentTabPosts.map((item, idx) => (
                          <div key={idx}>
                            <div className="single_post widgets_small">
                              <div className="post_img">
                                <div className="img_wrap">
                                  <Link to="/">
                                    <img src={item.image} alt="thumb" />
                                  </Link>
                                </div>
                              </div>
                              <div className="single_post_text">
                                <div className="meta2 meta_separator1">
                                  <Link to="#">{item.category}</Link>
                                  <Link to="#">{item.date}</Link>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VideoModal
        isOpen={videoModalOpen}
        videoId="0r6C3z3TEKw"
        onClose={() => setVideoModalOpen(false)}
      />
    </div>
  );
};

export default GallerySection;
