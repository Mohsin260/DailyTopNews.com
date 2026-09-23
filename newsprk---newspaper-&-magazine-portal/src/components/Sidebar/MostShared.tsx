import React from 'react';
import { Link } from 'react-router-dom';
import { mostSharePosts } from '../../data/newsData';
import { Icon } from '../common/Icon';

interface MostSharedProps {
  title?: string;
  dark?: boolean;
}

export const MostShared: React.FC<MostSharedProps> = ({
  title = 'Most share',
  dark = false,
}) => {
  return (
    <div className="widget tab_widgets mb30">
      <h2 className="widget-title">{title}</h2>
      <div className="post_type2_carousel multipleRowCarousel nav_style1">
        <div className="carousel_items">
          {mostSharePosts.map((item, idx) => (
            <div className="carousel_items" key={idx}>
              <div className="single_post widgets_small widgets_type4">
                <div className="post_img number">
                  <h2>{item.id}</h2>
                </div>
                <div className="single_post_text">
                  <div className="meta2">
                    <Link to="#">{item.category}</Link>
                    <Link to="#">{item.date}</Link>
                  </div>
                  <h4>
                    <Link to="/post1">{item.title}</Link>
                  </h4>
                  <ul className="inline socail_share">
                    <li>
                      <Link to="#">
                        <Icon name="twitter" /> 2.2K
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <Icon name="facebook-f" /> 2.2K
                      </Link>
                    </li>
                  </ul>
                  <div className="space-15" />
                  {dark ? <div className="border_white" /> : <div className="border_black" />}
                </div>
              </div>
              <div className="space-15" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostShared;
