'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import { Icon } from '@/components/Layout/common/Icon';
import { VideoModal } from '@/components/Layout/common/VideoModal';
import { getArticleSlug } from '@/utils/articleUtils';
import InFeedNativeAd from '@/components/ui/InFeedNativeAd';
import type { Article } from '@/types';

const isVideoUrl = (url?: string) => {
  if (!url) return false;
  const cleanUrl = url.split('?')[0].toLowerCase();
  return (
    cleanUrl.endsWith('.mp4') ||
    cleanUrl.endsWith('.webm') ||
    cleanUrl.endsWith('.mov') ||
    cleanUrl.endsWith('.m4v')
  );
};

const getFeaturedVideo = (post?: Article) => {
  if (!post) return { contentUrl: '', vastUrl: '', poster: '' };

  const hero = post.articleMedia?.heroCoverMedia;
  const videoAsset = (post.videoAsset ?? {}) as { cdnUrl?: string; poster?: string };

  const contentUrl =
    (isVideoUrl(hero?.url) ? hero?.url : '') || videoAsset.cdnUrl || '';
  const vastUrl = hero?.vastTagUrl?.trim() || '';
  const poster = hero?.poster || videoAsset.poster || '';

  return { contentUrl, vastUrl, poster };
};

interface VideoNewsProps {
  className?: string;
  dark?: boolean;
  featuredPost?: Article;
  posts?: Article[];
  videoThumb?: string;
}

export const VideoNews: React.FC<VideoNewsProps> = ({ className = '', dark = false, featuredPost, posts = [], videoThumb = '/assets/video-post-thumb-Cx2wM747.jpg' }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const { contentUrl, vastUrl, poster } = getFeaturedVideo(featuredPost);
  const posterSrc = poster || featuredPost?.image || videoThumb;

  const popularPosts = posts.slice(0, 10);

  if (popularPosts.length === 0 && !featuredPost) return null;

  const popularGrid = (() => {
    if (popularPosts.length === 0) return [];
    let a = 0;
    let t = Math.floor(popularPosts.length / 2) - 1;
    const r: typeof popularPosts = [];
    popularPosts.forEach((it, idx) => {
      if (idx % 2) {
        t += 1;
        r.push({ ...popularPosts[t] });
      } else {
        a += 1;
        r.push({ ...popularPosts[a] });
      }
    });
    return r.map((it, idx) => ({
      ...it,
      id: idx % 2 ? Math.floor(popularPosts.length / 2) + (idx - 1) / 2 + 1 : idx / 2 + 1,
    }));
  })();

  return (
    <div className={`video_posts ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="heading white">
              <h2 className="widget-title">Video News</h2>
            </div>
          </div>
        </div>
        <div className="space-50" />
        <div className={`viceo_posts_wrap ${dark ? 'primay_bg' : ''}`}>
          <div className="row">
            <div className="col-lg-8">
              <div className="single_post post_type3 post_type11 margintop-60- xs-mb30">
                <div className="post_img">
                  <div className="img_wrap">
                    <Link href="#"
                      className="play_btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setVideoModalOpen(true);
                      }}
                    >
                      <img src={posterSrc} alt={featuredPost?.title || 'video'} />
                    </Link>
                  </div>
                  <p onClick={() => setVideoModalOpen(true)} className="youtube_middle">
                    <Icon name="youtube-play" />
                  </p>
                </div>
                {featuredPost && (
                  <div className={`single_post_text padding30 ${dark ? 'dark-2' : 'fourth_bg'}`}>
                    <div className="meta3">
                      <Link href={`/post/${getArticleSlug(featuredPost.title)}`}>{featuredPost.categoryLabel || featuredPost.category}</Link>
                      <Link href={`/post/${getArticleSlug(featuredPost.title)}`}>{featuredPost.date}</Link>
                    </div>
                    <h4>
                      <Link href={`/post/${getArticleSlug(featuredPost.title)}`}>
                        {featuredPost.title}
                      </Link>
                    </h4>
                  </div>
                )}
              </div>
              <div className="mt30">
                <InFeedNativeAd pageType="homepage" position="in-feed-12" cardStyle="post-type11" dark={dark} />
              </div>
            </div>

            {/* Popular Posts */}
            <div className="col-lg-4">
              <div className="popular_carousel_area mb30 md-mt-30">
                <h2 className="widget-title">Popular Posts</h2>
                <div className="popular_carousel pt-15 multipleRowCarousel nav_style1">
                  <Swiper
                    modules={[Grid, Navigation]}
                    navigation={{
                      nextEl: '.swiper-button-next10',
                      prevEl: '.swiper-button-prev10',
                    }}
                    slidesPerView={1}
                    grid={{ rows: 6 }}
                  >
                    {popularGrid.map((post, idx) => (
                      <SwiperSlide key={idx}>
                        <div className="single_post type10 widgets_small mb15">
                          <div className="post_img">
                            <div className="img_wrap">
                              <Link href={`/post/${getArticleSlug(post.title)}`}>
                                <img src={post.image} alt="thumb" />
                              </Link>
                            </div>
                            <span className="tranding tranding_border">{post.id}</span>
                          </div>
                          <div className="single_post_text">
                            <h4>
                              <Link href={`/post/${getArticleSlug(post.title)}`}>{post.title}</Link>
                            </h4>
                            <div className="meta4">
                               <Link href={`/post/${getArticleSlug(post.title)}`}>{post.categoryLabel || post.category}</Link>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                    <SwiperSlide>
                      <InFeedNativeAd pageType="homepage" position="in-feed-11" cardStyle="type10" dark={dark} />
                    </SwiperSlide>
                  </Swiper>
                  <div className="navBtns">
                    <div className="navBtn prevtBtn swiper-button-prev10">
                      <Icon name="angle-left" />
                    </div>
                    <div className="navBtn nextBtn swiper-button-next10">
                      <Icon name="angle-right" />
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
        contentUrl={contentUrl}
        vastUrl={vastUrl}
        poster={posterSrc}
        title={featuredPost?.title}
        onClose={() => setVideoModalOpen(false)}
      />
    </div>
  );
};

export default VideoNews;
