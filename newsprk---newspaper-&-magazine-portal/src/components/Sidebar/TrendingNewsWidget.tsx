import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../common/Icon';

interface TrendingNewsWidgetProps {
  dark?: boolean;
}

const trendingSmallPosts = [
  {
    photo: '/assets/gallery-1-z8qK02Z1.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Nancy Zhang a Chinese busy woman and Dhaka',
  },
  {
    photo: '/assets/gallery-2-BjL35jxX.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'U.S. Response subash says he will label regions by risk of…',
  },
  {
    photo: '/assets/gallery-3-C5tFqJrq.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Venezuela elan govt and opposit the property collect',
  },
];

export const TrendingNewsWidget: React.FC<TrendingNewsWidgetProps> = ({ dark = false }) => {
  return (
    <div className="trending_widget mb30">
      <h2 className="widget-title">Tending News</h2>
      <div className="single_post post_type3">
        <div className="post_img">
          <div className="img_wrap">
            <img src="/assets/trending-news-2-ByY80RgJ.jpg" alt="trendbig1" />
          </div>
          <span className="tranding">
            <Icon name="bolt" />
          </span>
        </div>
        <div className="single_post_text">
          <div className="meta3">
            <Link to="/">TECHNOLOGY</Link>
            <Link to="/">March 26, 2020</Link>
          </div>
          <h4>
            <Link to="/post1">There may be no consoles in the future ea exec says</Link>
          </h4>
          <div className="space-10" />
          <p className="post-p">
            The property, complete with 30-seat screening from room, a 100-seat amphitheater and a
            swimming pond with sandy shower…
          </p>
        </div>
      </div>
      {trendingSmallPosts.map((item, idx) => (
        <div key={idx}>
          <div className="space-15" />
          {dark ? <div className="border_white" /> : <div className="border_black" />}
          <div className="space-30" />
          <div className="single_post widgets_small">
            <div className="post_img">
              <div className="img_wrap">
                <img src={item.photo} alt="thumb" />
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
        </div>
      ))}
    </div>
  );
};

export default TrendingNewsWidget;
