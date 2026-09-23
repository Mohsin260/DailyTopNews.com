import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface TabWidgetProps {
  className?: string;
  dark?: boolean;
}

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
    image: '/assets/gallery-5-BO602h40.jpg',
    title: 'Cheap smartphone sensor could help you old food safe',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
];

export const TabWidget: React.FC<TabWidgetProps> = ({ className = '', dark = false }) => {
  const [activeTab, setActiveTab] = useState('1');

  return (
    <div className={`widget_tab md-mt-30 ${className}`}>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            to="/"
            className={`nav-link ${activeTab === '1' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('1');
            }}
          >
            RELATED
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/"
            className={`nav-link ${activeTab === '2' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('2');
            }}
          >
            RELATED
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/"
            className={`nav-link ${activeTab === '3' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('3');
            }}
          >
            POPULAR
          </Link>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane active">
          <div className="widget tab_widgets">
            {tabPosts.map((item, idx) => (
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
  );
};

export default TabWidget;
