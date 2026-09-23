/**
 * Full seed: delete old articles, re-seed from articles.json.
 *
 * Usage:
 *   npx tsx scripts/seed-full.ts
 *
 * WARNING: This deletes ALL existing articles and replaces with data from articles.json.
 */
import "dotenv/config";
import { connectDB } from "@/lib/db";
import { Article } from "@/lib/models/Article";
import articlesEN from "@/data/articles.json";

async function seedArticles() {
  console.log("[seed] deleting all existing articles...");
  const deleteResult = await Article.deleteMany({});
  console.log(`[seed] deleted ${deleteResult.deletedCount} articles`);

  const allArticles = [...(articlesEN as any[])];
  console.log(`[seed] seeding ${allArticles.length} articles`);

  let created = 0;
  for (const article of allArticles) {
    try {
      await Article.create({
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        category: article.category,
        categoryLabel: article.categoryLabel,
        author: article.author,
        authorName: article.authorName,
        date: article.date,
        readTime: article.readTime,
        image: article.image,
        featured: article.featured,
        tags: article.tags,
        views: article.views,
        status: article.status || "published",
        content_type: "article",
        bodyContent: article.bodyContent || "",
        keyTakeawaysContent: article.keyTakeawaysContent || "",
        finalThoughtsContent: article.finalThoughtsContent || "",
        locale: article.locale || "en",
        articleMedia: article.articleMedia || {
          heroCoverMedia: { url: article.image || "", vastTagUrl: "", poster: "" },
          postBodyMedia: { url: "", vastTagUrl: "", poster: "" },
          keyTakeawaysMedia: { url: "", vastTagUrl: "", poster: "" },
          finalThoughtsMedia: { url: "", vastTagUrl: "", poster: "" },
          vastAdSlotIds: [],
        },
      });
      created++;
      console.log(`  [+] ${article.locale || "en"}: ${article.slug}`);
    } catch (error: any) {
      console.error(`  [!] ${article.slug}: ${error.message}`);
    }
  }
  console.log(`[seed] articles: ${created} created`);
}

async function main() {
  console.log("[seed] connecting to database...");
  await connectDB();
  await seedArticles();
  console.log("\n[seed] all done!");
}

main().catch((err) => {
  console.error("[seed] fatal error:", err);
  process.exit(1);
});
