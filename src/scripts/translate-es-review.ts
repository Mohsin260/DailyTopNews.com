/**
 * Translate the word "Review" → "Análisis" in Spanish (locale: "es") article
 * titles AND slugs, matching the existing Spanish content convention
 * (e.g. "es-liga-futbol-mexicano-analisis").
 *
 * Run: npx tsx scripts/translate-es-review.ts
 */
import "dotenv/config";
import mongoose from "mongoose";
import { connectScript } from "./_db";

const TITLE_RE = /\bReview\b/gi;
const SLUG_RE = /\breview\b/g;

async function run() {
  await connectScript("translate-es-review");
  const db = mongoose.connection.db!;
  const articles = db.collection("articles");

  const targets = await articles
    .find({
      locale: "es",
      $or: [{ title: TITLE_RE }, { slug: SLUG_RE }],
    })
    .toArray();

  console.log(`Matched ${targets.length} Spanish articles.\n`);

  let updated = 0;
  for (const a of targets) {
    const newTitle = String(a.title).replace(TITLE_RE, "Análisis");
    const newSlug = String(a.slug).replace(SLUG_RE, "analisis");

    if (newTitle === a.title && newSlug === a.slug) continue;

    if (newSlug !== a.slug) {
      const clash = await articles.findOne({ locale: "es", slug: newSlug });
      if (clash) {
        console.warn(`SKIP (slug clash): ${a.slug} -> ${newSlug}`);
        continue;
      }
    }

    const res = await articles.updateOne(
      { _id: a._id },
      { $set: { title: newTitle, slug: newSlug } }
    );

    console.log(`✔ ${a.slug} -> ${newSlug}`);
    console.log(`    "${a.title}"`);
    console.log(`    "${newTitle}"`);
    updated += res.modifiedCount;
  }

  console.log(`\nUpdated ${updated} documents.`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});