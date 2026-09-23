/**
 * Migration: Convert existing isArticleOverride=true AdSnippets to global article ads
 * 
 * This script converts per-article override ads to global article ads by setting
 * isArticleOverride=false. This allows them to appear in the "Global Article Ads"
 * tab in the dashboard and serve as fallbacks for all articles.
 * 
 * Run with: npx tsx scripts/migrate-article-overrides.ts
 * 
 * IMPORTANT: This script is idempotent — running it multiple times is safe.
 */

import { connectDB } from "@/lib/db";
import { AdSnippet } from "@/lib/models/AdSnippet";

async function migrateArticleOverrides() {
  console.log("🔄 Connecting to database...");
  await connectDB();

  console.log("🔍 Finding article-specific ad snippets (isArticleOverride=true)...");
  const overrides = await AdSnippet.find({ isArticleOverride: true }).lean();
  console.log(`Found ${overrides.length} article-specific ad snippets`);

  if (overrides.length === 0) {
    console.log("✅ No article-specific ads to migrate. Done.");
    return;
  }

  console.log("\n📋 Ads to migrate:");
  for (const ad of overrides) {
    console.log(`  - ${ad.name} (${ad.pageType}/${ad.position})`);
  }

  console.log("\n🔄 Migrating to global article ads...");
  const result = await AdSnippet.updateMany(
    { isArticleOverride: true },
    { $set: { isArticleOverride: false } }
  );

  console.log(`✅ Successfully migrated ${result.modifiedCount} ad snippets`);
  console.log("   These ads now appear in the 'Global Article Ads' dashboard tab");
  console.log("   and serve as fallbacks for all articles on those positions.");

  console.log("\n⚠️  Note: Article-specific overrides stored in article.adOverrides[]");
  console.log("   are NOT affected by this migration. They will still take priority");
  console.log("   over these now-global ads when an article has an override.");
}

migrateArticleOverrides()
  .then(() => {
    console.log("\n🎉 Migration complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("\n❌ Migration failed:", err);
    process.exit(1);
  });
