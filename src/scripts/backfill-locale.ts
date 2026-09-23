/**
 * Backfill locale field on existing articles and categories.
 * Run once: npx tsx src/scripts/backfill-locale.ts
 */
import "dotenv/config";
import mongoose from "mongoose";
import { connectScript } from "./_db";

async function run() {
  await connectScript("backfill-locale");

  const db = mongoose.connection.db!;

  // Backfill articles
  const articles = await db.collection("articles").updateMany(
    { locale: { $exists: false } },
    { $set: { locale: "en" } }
  );
  console.log(`Articles updated: ${articles.modifiedCount} (matched: ${articles.matchedCount})`);

  // Backfill categories
  const categories = await db.collection("simplecategories").updateMany(
    { locale: { $exists: false } },
    { $set: { locale: "en" } }
  );
  console.log(`Categories updated: ${categories.modifiedCount} (matched: ${categories.matchedCount})`);

  // Backfill comparisons
  const comparisons = await db.collection("comparisons").updateMany(
    { locale: { $exists: false } },
    { $set: { locale: "en" } }
  );
  console.log(`Comparisons updated: ${comparisons.modifiedCount} (matched: ${comparisons.matchedCount})`);

  await mongoose.disconnect();
  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
