import Link from 'next/link';
import { categoriesList } from '@/data/config';

export const CategoriesWidget: React.FC = () => {
  return (
    <div className="widget category mb30">
      <div className="row">
        <div className="col-6 align-self-center">
          <h2 className="widget-title">Categories</h2>
        </div>
        <div className="col-6 text-right align-self-center">
          <Link href="/" className="see_all mb20">
            See All
          </Link>
        </div>
      </div>
      <ul>
        {categoriesList.map((item, idx) => (
          <li key={idx}>
            <Link
              href={`/category/${item.title.toLowerCase()}`}
              style={{ background: `url(${item.big_image})` }}
            >
              {' '}
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
