import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { connectScript } from "./_db";

dotenv.config({ path: path.join(__dirname, "../.env") });

async function main() {
  await connectScript("verify-all-images");

  const db = mongoose.connection.db!;
  const collection = db.collection("articles");

  const all = await collection.find({}).toArray();
  const comparisons = all.filter((a) => a.content_type === "comparison");
  const reviews = all.filter((a) => a.content_type === "review");
  const articles = all.filter((a) => a.content_type === "article");

  const noHero = all.filter((a) => !a.articleMedia?.heroCoverMedia?.url);
  const picsumHero = all.filter((a) => (a.articleMedia?.heroCoverMedia?.url || "").includes("picsum"));
  const compMissingEntity = comparisons.filter((c) => !c.entity_A?.image || !c.entity_B?.image);
  const compPicsumEntity = comparisons.filter((c) =>
    (c.entity_A?.image || "").includes("picsum") || (c.entity_B?.image || "").includes("picsum")
  );

  console.log(`Total: ${all.length} (articles: ${articles.length}, comparisons: ${comparisons.length}, reviews: ${reviews.length})`);
  console.log(`No hero image: ${noHero.length}`);
  console.log(`Hero using picsum placeholder: ${picsumHero.length}`);
  console.log(`Comparisons missing entity image: ${compMissingEntity.length}`);
  console.log(`Comparisons using picsum entity placeholder: ${compPicsumEntity.length}`);
  console.log(`\nAll images verified: ${noHero.length === 0 && picsumHero.length === 0 && compMissingEntity.length === 0 && compPicsumEntity.length === 0 ? "YES ✅" : "NO ❌"}`);

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
