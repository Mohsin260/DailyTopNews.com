import React from 'react';
import { Link } from 'react-router-dom';
import { PostItem } from '../../types';

interface EntertainmentNewsProps {
  entertainments: PostItem[];
}

export const EntertainmentNews: React.FC<EntertainmentNewsProps> = ({ entertainments }) => {
  return (
    <>
      {entertainments.map((item, idx) => (
        <div className="col-lg-6" key={idx}>
          <div className="single_post post_type3 mb30">
            <div className="post_img">
              <div className="img_wrap">
                <Link to="/">
                  <img src={item.image} alt="thumb" />
                </Link>
              </div>
            </div>
            <div className="single_post_text">
              <div className="meta3">
                <Link to="/">{item.category || 'TECHNOLOGY'}</Link>
                <Link to="/">{item.date}</Link>
              </div>
              <h4>
                <Link to="/post1">{item.title}</Link>
              </h4>
              <div className="space-10" />
              <p className="post-p">{item.body}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default EntertainmentNews;
