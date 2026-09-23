'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getArticleSlug } from '@/utils/articleUtils';
import type { Article } from '@/types';

interface TabWidgetProps {
  className?: string;
  dark?: boolean;
  posts?: Article[];
}

export const TabWidget: React.FC<TabWidgetProps> = ({ className = '', dark = false, posts = [] }) => {
  const [activeTab, setActiveTab] = useState<'1' | '2' | '3'>('1');

  const currentTabPosts =
    activeTab === '1'
      ? posts
      : activeTab === '2'
      ? posts.slice().reverse()
      : posts;

  return (
    <div className={`widget_tab md-mt-30 ${className}`}>
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
                      <Link href={`/post/${getArticleSlug(item.title)}`}>
                        <img src={item.image} alt="thumb" />
                      </Link>
                    </div>
                  </div>
                  <div className="single_post_text">
                    <div className="meta2 meta_separator1">
                      <Link href="#">{item.category}</Link>
                      <Link href="#">{item.date}</Link>
                    </div>
                    <h4>
                      <Link href={`/post/${getArticleSlug(item.title)}`}>{item.title}</Link>
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
