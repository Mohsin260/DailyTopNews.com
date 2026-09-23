/**
 * Seed articles into MongoDB.
 *
 * Usage:
 *   npx tsx scripts/seed-all.ts
 *
 * Seeds articles from articles.json.
 * Safe to run multiple times (uses upsert by slug).
 * Target database: dailytopnews-db
 */
import "dotenv/config";
import mongoose from "mongoose";
import { Article } from "@/lib/models/Article";
import articlesEN from "@/data/articles.json";
import { forceDbUri, DB_NAME } from "./_db";

async function connectToDB() {
  const uri = forceDbUri(process.env.MONGO_URI);
  console.log(`[seed] connecting to database: ${DB_NAME}`);
  await mongoose.connect(uri, { bufferCommands: false });
  const dbName = mongoose.connection.db?.databaseName || "unknown";
  if (dbName !== DB_NAME) {
    throw new Error(`Connected to wrong database: ${dbName}`);
  }
  console.log(`[seed] connected to: ${dbName}`);
}

async function seedArticles() {
  console.log("[seed] upserting articles...");

  const allArticles = [...(articlesEN as any[])];
  console.log(`[seed] ${allArticles.length} articles`);

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const article of allArticles) {
    const locale = article.locale || "en";
    const slug = article.slug;
    try {
      const result = await Article.findOneAndUpdate(
        { slug, locale },
        {
          $set: {
            slug,
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
            locale,
            articleMedia: article.articleMedia || {
              heroCoverMedia: { url: article.image || "", vastTagUrl: "", poster: "" },
              postBodyMedia: { url: "", vastTagUrl: "", poster: "" },
              keyTakeawaysMedia: { url: "", vastTagUrl: "", poster: "" },
              finalThoughtsMedia: { url: "", vastTagUrl: "", poster: "" },
              vastAdSlotIds: [],
            },
          },
        },
        { upsert: true, new: true, lean: true }
      );

      if (result.createdAt?.getTime() === result.updatedAt?.getTime()) {
        created++;
      } else {
        updated++;
      }
    } catch (error: any) {
      skipped++;
      console.error(`  [!] skipped: ${article.slug} (${locale}) — ${error.message}`);
    }
  }

  console.log(`[seed] articles done: ${created} created, ${updated} updated, ${skipped} skipped`);
}

async function main() {
  await connectToDB();
  await seedArticles();
  console.log("\n[seed] all done!");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("[seed] fatal error:", err);
  process.exit(1);
});
