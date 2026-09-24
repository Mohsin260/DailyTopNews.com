import Link from 'next/link';
import { PostItem } from '@/types';
import { getArticleSlug } from '@/utils/articleUtils';

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
                <Link href={`/post/${getArticleSlug(item.title)}`}>
                  <img src={item.image} alt="thumb" />
                </Link>
              </div>
            </div>
            <div className="single_post_text">
              <div className="meta3">
                <Link href={`/post/${getArticleSlug(item.title)}`}>{item.categoryLabel || item.category || 'Technology'}</Link>
                <Link href={`/post/${getArticleSlug(item.title)}`}>{item.date}</Link>
              </div>
              <h4>
                <Link href={`/post/${getArticleSlug(item.title)}`}>{item.title}</Link>
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
