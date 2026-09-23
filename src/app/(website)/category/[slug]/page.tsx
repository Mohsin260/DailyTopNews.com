import CategoryTemplate from '@/templates/CategoryTemplate';
import { fetchArticles, fetchCategories } from '@/lib/api';

export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [{ articles }, categories] = await Promise.all([
    fetchArticles({ category: slug, limit: 20 }),
    fetchCategories(),
  ]);

  const category = categories.find((c) => c.slug === slug);

  return (
    <CategoryTemplate
      title={category?.label || slug.charAt(0).toUpperCase() + slug.slice(1)}
      categorySlug={slug}
      articles={articles}
      categories={categories}
    />
  );
}
