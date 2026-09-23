import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { videoThumb } from '../../data/newsData';
import { Icon } from '../common/Icon';
import { VideoModal } from '../common/VideoModal';

interface VideoNewsProps {
  className?: string;
  dark?: boolean;
}

const popularPosts = [
  {
    image: '/assets/populer-post-1-pEdBi0gv.jpg',
    category: 'TECHNOLOGY',
    title: 'The property complete with a 30 seat screen room.',
    id: 1,
  },
  {
    image: '/assets/populer-post-2-DdXzmbkJ.jpg',
    category: 'TECHNOLOGY',
    title: 'Cheap smartphone sensor could help you old.',
    id: 2,
  },
  {
    image: '/assets/populer-post-3-D0G-Sy73.jpg',
    category: 'TECHNOLOGY',
    title: 'Harbour amid a Slowen the down in singer city',
    id: 3,
  },
  {
    image: '/assets/populer-post-4-3A8LF3cn.jpg',
    category: 'TECHNOLOGY',
    title: 'The secret to moving this from sphinx screening',
    id: 4,
  },
  {
    image: '/assets/populer-post-5-c1NhO4es.jpg',
    category: 'TECHNOLOGY',
    title: 'Harbour amid a Slowen the down in singer city',
    id: 5,
  },
  {
    image: '/assets/populer-post-1-pEdBi0gv.jpg',
    category: 'TECHNOLOGY',
    title: 'The property complete with a 30 seat screen room.',
    id: 6,
  },
];

export const VideoNews: React.FC<VideoNewsProps> = ({ className = '', dark = false }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoId] = useState('0r6C3z3TEKw');

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
                    <Link
                      to="#"
                      className="play_btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setVideoModalOpen(true);
                      }}
                    >
                      <img src={videoThumb} alt="video1" />
                    </Link>
                  </div>
                  <p
                    onClick={() => setVideoModalOpen(true)}
                    className="youtube_middle"
                    style={{ cursor: 'pointer' }}
                  >
                    <Icon name="youtube-play" />
                  </p>
                </div>
                <div className={`single_post_text padding30 ${dark ? 'dark-2' : 'fourth_bg'}`}>
                  <div className="meta3">
                    <Link to="/">TECHNOLOGY</Link>
                    <Link to="/">March 26, 2020</Link>
                  </div>
                  <h4>
                    <Link to="/post1">
                      Riots Report Shows London Needs To Maintain Police Numbers, Says Mayor
                    </Link>
                  </h4>
                </div>
              </div>
            </div>

            {/* Popular Posts */}
            <div className="col-lg-4">
              <div className="popular_carousel_area mb30 md-mt-30">
                <h2 className="widget-title">Popular Posts</h2>
                <div className="popular_carousel pt-15 multipleRowCarousel nav_style1">
                  <div className="carousel_items">
                    {popularPosts.map((post, idx) => (
                      <div key={idx} className="single_post type10 widgets_small mb15">
                        <div className="post_img">
                          <div className="img_wrap">
                            <Link to="/">
                              <img src={post.image} alt="thumb" />
                            </Link>
                          </div>
                          <span className="tranding tranding_border">{post.id}</span>
                        </div>
                        <div className="single_post_text">
                          <h4>
                            <Link to="/post1">{post.title}</Link>
                          </h4>
                          <div className="meta4">
                            <Link to="/">{post.category}</Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VideoModal
        isOpen={videoModalOpen}
        videoId={currentVideoId}
        onClose={() => setVideoModalOpen(false)}
      />
    </div>
  );
};

export default VideoNews;
