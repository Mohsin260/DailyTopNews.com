import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../common/Icon';

interface SportsNewsProps {
  dark?: boolean;
}

const sportsCarouselPosts = [
  {
    image: '/assets/sports-1-D_Z4IXtL.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Nancy zhang a chinese busy woman and dhaka',
  },
  {
    image: '/assets/sports-2--I-U6rqZ.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'The billionaire Philan thropist read to learn',
  },
  {
    image: '/assets/sports-3-BHHhAqwe.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Cheap smartphone sensor could help you',
  },
  {
    image: '/assets/sports-4-CvreONwO.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Ratiffe to be Director of nation talent Trump',
  },
  {
    image: '/assets/sports-5-C6oSzBmq.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Nancy zhang a chinese busy woman and dhaka',
  },
  {
    image: '/assets/sports-1-D_Z4IXtL.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'The billionaire Philan thropist read to learn',
  },
];

export const SportsNews: React.FC<SportsNewsProps> = ({ dark = false }) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="sports">
          <div className="row">
            <div className="col-12">
              <div className="heading">
                <h2 className="widget-title">Sports News</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="single_post post_type3 mb30">
                <div className="post_img">
                  <Link to="/">
                    <img src="/assets/sports-news-B-FCm1YF.jpg" alt="sportsbig1" />
                  </Link>
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
                    <Link to="/post1">Copa America: Luis Suarez from devastated US</Link>
                  </h4>
                  <div className="space-10" />
                  <p className="post-p">
                    The property, complete with 30-seat screening from room, a 100-seat amphitheater
                    and a swimming pond with sandy shower…
                  </p>
                  <div className="space-20" />
                  <Link to="/" className="readmore">
                    Read More
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side list */}
            <div className="col-md-6">
              <div className="sports_carousel nav_style1">
                <div className="widget tab_widgets">
                  <div className="post_type2_carousel multipleRowCarousel nav_style1">
                    <div className="carousel_items">
                      {sportsCarouselPosts.map((item, idx) => (
                        <div className="single_post2_carousel" key={idx}>
                          <div className="single_post widgets_small">
                            <div className="post_img">
                              <div className="img_wrap">
                                <Link to="/">
                                  <img src={item.image} alt="thumb" />
                                </Link>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsNews;
