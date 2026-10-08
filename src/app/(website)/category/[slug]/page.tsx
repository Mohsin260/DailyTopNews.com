import CategoryTemplate from '@/templates/CategoryTemplate';
import { fetchArticles, fetchCategories } from '@/lib/api';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 8;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const requestedPage = Math.max(1, parseInt(pageParam || '1', 10) || 1);

  const [{ articles, pagination }, categories] = await Promise.all([
    fetchArticles({ category: slug, limit: PAGE_SIZE, page: requestedPage }),
    fetchCategories(),
  ]);

  let pageArticles = articles;
  let page = pagination?.currentPage || requestedPage;

  if (page !== requestedPage) {
    const retry = await fetchArticles({ category: slug, limit: PAGE_SIZE, page });
    pageArticles = retry.articles;
    page = retry.pagination?.currentPage || page;
  }

  const category = categories.find((c) => c.slug === slug);

  return (
    <CategoryTemplate
      title={category?.label || slug.charAt(0).toUpperCase() + slug.slice(1)}
      categorySlug={slug}
      articles={pageArticles}
      categories={categories}
      page={page}
      totalPages={pagination?.totalPages || 1}
      totalCount={pagination?.totalCount || 0}
    />
  );
}
