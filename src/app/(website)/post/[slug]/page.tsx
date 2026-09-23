import { notFound } from 'next/navigation';
import ArticleTemplate from '@/templates/ArticleTemplate';
import { fetchArticleBySlug, fetchArticles } from '@/lib/api';

export async function generateStaticParams() {
  const { articles } = await fetchArticles({ limit: 100 });
  return articles.map((article) => ({ slug: article.slug }));
}

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { articles: allArticles } = await fetchArticles({ limit: 100 });
  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : undefined;
  const nextArticle =
    currentIndex >= 0 && currentIndex < allArticles.length - 1
      ? allArticles[currentIndex + 1]
      : undefined;

  const sidebarPosts = allArticles.filter((a) => a.slug !== slug).slice(0, 10);
  const latestPosts = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <ArticleTemplate
      article={article}
      prevArticle={prevArticle}
      nextArticle={nextArticle}
      sidebarPosts={sidebarPosts}
      latestPosts={latestPosts}
    />
  );
}
