import HomeTemplate from '@/templates/HomeTemplate';
import { fetchArticles, fetchCategories } from '@/lib/api';

export default async function HomePage() {
  const [allArticlesRes, categories] = await Promise.all([
    fetchArticles({ limit: 100 }),
    fetchCategories(),
  ]);

  const all = allArticlesRes.articles;
  const usedSlugs = new Set<string>();

  const pick = (count: number) => {
    const result = all.filter((a) => !usedSlugs.has(a.slug)).slice(0, count);
    result.forEach((a) => usedSlugs.add(a.slug));
    return result;
  };

  const trendingPosts = pick(12);
  const featuredPosts = pick(6);
  const entertainmentPosts = pick(4);
  const businessPosts = pick(4);
  const sportsPosts = pick(7);
  const latestPosts = pick(11);

  return (
    <HomeTemplate
      allArticles={all}
      featuredPosts={featuredPosts}
      trendingPosts={trendingPosts}
      entertainmentPosts={entertainmentPosts}
      businessPosts={businessPosts}
      sportsPosts={sportsPosts}
      latestPosts={latestPosts}
      categories={categories}
    />
  );
}
