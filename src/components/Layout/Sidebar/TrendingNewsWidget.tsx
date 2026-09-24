import Link from 'next/link';
import { Icon } from '@/components/Layout/common/Icon';
import { getArticleSlug } from '@/utils/articleUtils';
import type { Article } from '@/types';

interface TrendingNewsWidgetProps {
  dark?: boolean;
  posts?: Article[];
}

export const TrendingNewsWidget: React.FC<TrendingNewsWidgetProps> = ({ dark = false, posts = [] }) => {
  if (posts.length === 0) return null;

  const featuredPost = posts[0];
  const smallPosts = posts.slice(1, 4);

  return (
    <div className="trending_widget mb30">
      <h2 className="widget-title">Tending News</h2>
      {featuredPost && (
        <div className="single_post post_type3">
          <div className="post_img">
            <div className="img_wrap">
              <Link href={`/post/${getArticleSlug(featuredPost.title)}`}>
                <img src={featuredPost.image} alt="trendbig1" />
              </Link>
            </div>
            <span className="tranding">
              <Icon name="bolt" />
            </span>
          </div>
          <div className="single_post_text">
            <div className="meta3">
              <Link href="#">{featuredPost.categoryLabel || featuredPost.category}</Link>
              <Link href="#">{featuredPost.date}</Link>
            </div>
            <h4>
              <Link href={`/post/${getArticleSlug(featuredPost.title)}`}>
                {featuredPost.title}
              </Link>
            </h4>
            <div className="space-10" />
            <p className="post-p">
              {featuredPost.excerpt}
            </p>
          </div>
        </div>
      )}
      {smallPosts.map((item, idx) => (
        <div key={idx}>
          <div className="space-15" />
          {dark ? <div className="border_white" /> : <div className="border_black" />}
          <div className="space-30" />
          <div className="single_post widgets_small">
            <div className="post_img">
              <div className="img_wrap">
                <Link href={`/post/${getArticleSlug(item.title)}`}>
                  <img src={item.image} alt="thumb" />
                </Link>
              </div>
              <span className="tranding">
                <Icon name="bolt" />
              </span>
            </div>
            <div className="single_post_text">
              <div className="meta2">
                <Link href="#">{item.categoryLabel || item.category}</Link>
                <Link href="#">{item.date}</Link>
              </div>
              <h4>
                <Link href={`/post/${getArticleSlug(item.title)}`}>{item.title}</Link>
              </h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingNewsWidget;
