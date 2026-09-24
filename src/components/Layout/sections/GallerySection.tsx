"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import type { Swiper as SwiperType } from 'swiper';
import { Icon } from '../common/Icon';
import { VideoModal } from '../common/VideoModal';
import { getArticleSlug } from '@/utils/articleUtils';
import type { Article } from '@/types';

interface GallerySectionProps {
  className?: string;
  dark?: boolean;
  posts?: Article[];
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

const fallbackGalleryPosts = [
  { image: '/assets/gallery-post-DydtzxC6.jpg', title: "Japan's virus success has puzzled the world. Is its luck running out?", slug: 'japans-virus-success-puzzled-world-luck-running-out', body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…', category: 'TECHNOLOGY', date: 'March 26, 2020' },
  { image: '/assets/gallery-post-2-C0W9wDVx.jpg', title: "Japan's virus success has puzzled the world. Is its luck running out?", slug: 'japans-virus-success-puzzled-world-luck-running-out', body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…', category: 'TECHNOLOGY', date: 'March 26, 2020' },
  { image: '/assets/gallery-post-DydtzxC6.jpg', title: 'Copa America: Luis Suarez from devastated US America', slug: 'copa-america-luis-suarez-devastated-us', body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…', category: 'TECHNOLOGY', date: 'March 26, 2020' },
  { image: '/assets/gallery-post-2-C0W9wDVx.jpg', title: "Japan's virus success has puzzled the world. Is its luck running out?", slug: 'japans-virus-success-puzzled-world-luck-running-out', body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…', category: 'TECHNOLOGY', date: 'March 26, 2020' },
  { image: '/assets/gallery-post-DydtzxC6.jpg', title: 'Copa America: Luis Suarez from devastated US America', slug: 'copa-america-luis-suarez-devastated-us', body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…', category: 'TECHNOLOGY', date: 'March 26, 2020' },
];

const fallbackTabPosts = [
  { image: '/assets/gallery-1-z8qK02Z1.jpg', title: 'Copa America: Luis Suarez from devastated US', category: 'TECHNOLOGY', date: 'March 26, 2020' },
  { image: '/assets/gallery-2-BjL35jxX.jpg', title: 'Nancy Zhang a Chinese busy woman and Dhaka', category: 'TECHNOLOGY', date: 'March 26, 2020' },
  { image: '/assets/gallery-3-C5tFqJrq.jpg', title: 'U.S. Response subash says he will label regions by risk of…', category: 'TECHNOLOGY', date: 'March 26, 2020' },
  { image: '/assets/gallery-4-BQgMsRpZ.jpg', title: 'Venezuela elan govt and opposit the property collect', category: 'TECHNOLOGY', date: 'March 26, 2020' },
  { image: '/assets/gallery-5-BO602hdN.jpg', title: 'Cheap smartphone sensor could help you old food safe', category: 'TECHNOLOGY', date: 'March 26, 2020' },
];

export const GallerySection: React.FC<GallerySectionProps> = ({ className = '', posts = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeTab, setActiveTab] = useState<'1' | '2' | '3'>('1');
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const galleryPosts = posts.length > 0
    ? posts.map((a) => ({
        image: a.image,
        title: a.title,
        slug: a.slug,
        body: a.excerpt,
        category: a.categoryLabel || a.category || '',
        date: a.date || '',
      }))
    : fallbackGalleryPosts;

  const tabPosts = posts.length > 0
    ? posts.slice(0, 5).map((a) => ({
        image: a.image,
        slug: a.slug,
        title: a.title,
        category: a.categoryLabel || a.category || '',
        date: a.date || '',
      }))
    : fallbackTabPosts;

  // Thumbnails should be the same article images
  const thumbnailImages = posts.length > 0
    ? posts.map(a => a.image)
    : galleryThumbnails;

  const currentTabPosts =
    activeTab === '1' ? tabPosts
    : activeTab === '2' ? tabPosts.slice().reverse()
    : tabPosts;

  return (
    <div className={`post_gallary_area mb40 ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-xl-8">
                <div className="slider_demo2">
                  <Swiper
                    modules={[Navigation, Thumbs, Autoplay]}
                    navigation={{
                      nextEl: '.gs-swiper-next',
                      prevEl: '.gs-swiper-prev',
                    }}
                    thumbs={{
                      swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                    }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={10}
                  >
                    {galleryPosts.map((post, idx) => (
                      <SwiperSlide key={idx}>
                        <div className="single_post post_type6 xs-mb30">
                          <div className="post_img gradient1">
                            <img src={post.image} alt={post.title} />
                            <span onClick={() => setVideoModalOpen(true)} className="tranding">
                              <Icon name="play" />
                            </span>
                          </div>
                          <div className="single_post_text">
                            <div className="meta meta_separator1">
                               <Link href={`/category/${(post.category || 'technology').toLowerCase()}`}>{post.category}</Link>
                              <Link href="#">{post.date}</Link>
                            </div>
                            <h4>
                              <Link href={`/post/${post.slug || getArticleSlug(post.title)}`}>
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

                <div className="slider_demo1">
                  <div className=" slider_arrow arrow_left slick-arrow gs-swiper-prev">
                    <Icon name="angle-left" />
                  </div>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    breakpoints={{
                      1024: { slidesPerView: 8 },
                      768: { slidesPerView: 5 },
                      320: { slidesPerView: 3 },
                    }}
                  >
                    {thumbnailImages.map((thumbImg, idx) => (
                      <SwiperSlide key={idx}>
                        <div className="single_gallary_item">
                          <img src={thumbImg} alt="thumb" />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className=" slider_arrow arrow_right slick-arrow gs-swiper-next">
                    <Icon name="angle-right" />
                  </div>
                </div>
              </div>

              <div className="col-xl-4">
                <div className="widget_tab md-mt-30">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a href="#related1" className={`nav-link ${activeTab === '1' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('1'); }}>RELATED</a>
                    </li>
                    <li className="nav-item">
                      <a href="#related2" className={`nav-link ${activeTab === '2' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('2'); }}>RELATED</a>
                    </li>
                    <li className="nav-item">
                      <a href="#popular" className={`nav-link ${activeTab === '3' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('3'); }}>POPULAR</a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane active show">
                      <div className="widget tab_widgets">
                        {currentTabPosts.map((item: any, idx: number) => (
                          <div key={idx}>
                            <div className="single_post widgets_small">
                              <div className="post_img">
                                <div className="img_wrap">
                                  <Link href={`/post/${item.slug || getArticleSlug(item.title)}`}>
                                    <img src={item.image} alt="thumb" />
                                  </Link>
                                </div>
                              </div>
                              <div className="single_post_text">
                                <div className="meta2 meta_separator1">
                                   <Link href="#">{item.categoryLabel || item.category}</Link>
                                  <Link href="#">{item.date}</Link>
                                </div>
                                <h4>
                                  <Link href={`/post/${item.slug || getArticleSlug(item.title)}`}>{item.title}</Link>
                                </h4>
                              </div>
                            </div>
                            <div className="space-15" />
                            <div className="border_white" />
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
      <VideoModal isOpen={videoModalOpen} videoId="0r6C3z3TEKw" onClose={() => setVideoModalOpen(false)} />
    </div>
  );
};

export default GallerySection;
