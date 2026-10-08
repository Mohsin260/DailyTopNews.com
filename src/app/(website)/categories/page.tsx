import CategoriesTemplate from '@/templates/CategoriesTemplate';
import { fetchArticles, fetchCategories } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function CategoriesPageRoute() {
  const [categories, { articles }] = await Promise.all([
    fetchCategories(),
    fetchArticles({ limit: 12 }),
  ]);

  return <CategoriesTemplate categories={categories} articles={articles} />;
}
