import React from 'react';
import { Link } from 'react-router-dom';
import { categoriesList } from '../../data/newsData';

export const CategoriesWidget: React.FC = () => {
  return (
    <div className="widget category mb30">
      <div className="row">
        <div className="col-6 align-self-center">
          <h2 className="widget-title">Categories</h2>
        </div>
        <div className="col-6 text-right align-self-center">
          <Link to="/" className="see_all mb20">
            See All
          </Link>
        </div>
      </div>
      <ul>
        {categoriesList.map((item, idx) => (
          <li key={idx}>
            <Link
              to={`/${item.title.toLowerCase()}`}
              style={{ backgroundImage: `url(${item.big_image})` }}
            >
              <span>{item.title}</span>
              <img src={item.small_img} alt="category" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesWidget;
