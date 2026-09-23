import React from 'react';
import { Link } from 'react-router-dom';
import { mostViewPosts } from '../../data/newsData';
import { Icon } from '../common/Icon';

interface MostViewedProps {
  no_margin?: boolean;
  title?: string;
  dark?: boolean;
}

export const MostViewed: React.FC<MostViewedProps> = ({
  no_margin = false,
  title = 'Most View',
  dark = false,
}) => {
  return (
    <div className={`widget tab_widgets ${no_margin ? '' : 'mb30'}`}>
      <h2 className="widget-title">{title}</h2>
      <div className="post_type2_carousel multipleRowCarousel nav_style1">
        <div className="carousel_items">
          {mostViewPosts.map((item, idx) => (
            <div className="single_post2_carousel" key={idx}>
              <div className="single_post widgets_small type8">
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
                <div className="type8_count">
                  <h2>{idx + 1}</h2>
                </div>
              </div>
              {idx + 1 < mostViewPosts.length && (
                <>
                  <div className="space-15" />
                  {dark ? <div className="border_white" /> : <div className="border_black" />}
                  <div className="space-15" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostViewed;
