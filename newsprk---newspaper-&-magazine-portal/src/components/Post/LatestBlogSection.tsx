import React from 'react';
import { Link } from 'react-router-dom';

interface LatestBlogSectionProps {
  dark?: boolean;
}

const latestBlogData = [
  {
    photo: '/assets/latest-news-1-Bqhtge8P.png',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'There may be no consoles in the future ea exec says',
    description:
      'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
  },
  {
    photo: '/assets/latest-news-2-Cg_HcKuP.png',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'There may be no consoles in the future ea exec says',
    description:
      'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
  },
  {
    photo: '/assets/latest-news-3-td77wntH.png',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'There may be no consoles in the future ea exec says',
    description:
      'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
  },
];

export const LatestBlogSection: React.FC<LatestBlogSectionProps> = ({ dark = false }) => {
  return (
    <div className={`${dark ? 'primay_bg' : 'fourth_bg'} padding6030`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="heading">
              <h2 className="widget-title">Our Latest Blog</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {latestBlogData.map((item, idx) => (
            <div className="col-md-6 col-lg-4" key={idx}>
              <div className="single_post post_type3 mb30">
                <div className="post_img">
                  <Link to="/">
                    <img src={item.photo} alt="thumb" />
                  </Link>
                </div>
                <div className="single_post_text">
                  <div className="meta3">
                    <Link to="/">{item.category}</Link>
                    <Link to="/">{item.date}</Link>
                  </div>
                  <h4>
                    <Link to="/post1">{item.title}</Link>
                  </h4>
                  <div className="space-10" />
                  <p className="post-p">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestBlogSection;
