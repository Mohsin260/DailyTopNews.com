import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { connectScript } from "./_db";

dotenv.config({ path: path.join(__dirname, "../.env") });

async function main() {
  await connectScript("verify-db-images");

  const db = mongoose.connection.db!;
  const collection = db.collection("articles");

  const all = await collection.find({}).sort({ locale: 1 }).toArray();

  const missing: any[] = [];
  const bySlug = new Map<string, Set<string>>();
  for (const a of all) {
    const url = a.articleMedia?.heroCoverMedia?.url || "";
    if (!url) {
      missing.push({ locale: a.locale, slug: a.slug, title: (a.title || "").slice(0, 60) });
    }
    if (!bySlug.has(a.slug)) bySlug.set(a.slug, new Set());
    bySlug.get(a.slug)!.add(url);
  }

  console.log(`Total docs: ${all.length}`);
  console.log(`Docs with images: ${all.length - missing.length}`);
  console.log(`Docs MISSING images: ${missing.length}\n`);

  if (missing.length) {
    console.log("MISSING:");
    missing.forEach((m) => console.log(`  - [${m.locale}] ${m.slug} :: ${m.title}`));
  }

  // Duplicate image usage across different slugs
  const urlCount = new Map<string, string[]>();
  for (const [slug, urls] of bySlug) {
    for (const url of urls) {
      if (!url) continue;
      if (!urlCount.has(url)) urlCount.set(url, []);
      urlCount.get(url)!.push(slug);
    }
  }
  console.log("\nImages shared by multiple DIFFERENT slugs:");
  for (const [url, slugs] of urlCount) {
    const uniqueSlugs = [...new Set(slugs)];
    if (uniqueSlugs.length > 1) {
      console.log(`  - ${url.split("?")[0].split("/").pop()}`);
      console.log(`      used by: ${uniqueSlugs.join(", ")}`);
    }
  }

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
