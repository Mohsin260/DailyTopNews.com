import AboutTemplate from '@/templates/AboutTemplate';
import { fetchArticles, fetchCategories } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function AboutPageRoute() {
  const [categories, { articles }] = await Promise.all([
    fetchCategories(),
    fetchArticles({ limit: 100 }),
  ]);

  return <AboutTemplate categories={categories} articles={articles} />;
}
