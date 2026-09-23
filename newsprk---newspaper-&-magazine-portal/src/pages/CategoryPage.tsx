import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import FollowUs from '../components/Sidebar/FollowUs';
import MostViewed from '../components/Sidebar/MostViewed';
import MostShared from '../components/Sidebar/MostShared';
import UpcomingMatches from '../components/Sidebar/UpcomingMatches';
import NewsletterWidget from '../components/Sidebar/NewsletterWidget';
import CategoriesWidget from '../components/Sidebar/CategoriesWidget';
import BannerWidget from '../components/Sidebar/BannerWidget';
import { businessPosts, entertainmentPosts } from '../data/newsData';

interface CategoryPageProps {
  title: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ title }) => {
  const posts = [...entertainmentPosts, ...businessPosts];

  return (
    <>
      <Breadcrumb title={title} />
      <div className="archives padding-top-30">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-8">
              <div className="row">
                <div className="col-12 align-self-center">
                  <div className="categories_title">
                    <h5>
                      Category: <Link to="/">{title}</Link>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="row">
                {posts.map((post, idx) => (
                  <div className="col-lg-6" key={idx}>
                    <div className="single_post post_type3 mb30">
                      <div className="post_img">
                        <div className="img_wrap">
                          <Link to="/post1">
                            <img src={post.image} alt="thumb" />
                          </Link>
                        </div>
                      </div>
                      <div className="single_post_text">
                        <div className="meta3">
                          <Link to="/">{post.category || 'TECHNOLOGY'}</Link>
                          <Link to="#">{post.date || 'March 26, 2020'}</Link>
                        </div>
                        <h4>
                          <Link to="/post1">{post.title}</Link>
                        </h4>
                        <div className="space-10" />
                        <p className="post-p">{post.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <FollowUs />
              <MostViewed />
              <MostShared />
              <UpcomingMatches />
              <NewsletterWidget />
              <CategoriesWidget />
              <BannerWidget />
            </div>
          </div>
        </div>
      </div>
      <div className="space-70" />
    </>
  );
};

export default CategoryPage;
