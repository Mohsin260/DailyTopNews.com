import "dotenv/config";
import mongoose from "mongoose";
import categoriesJson from "@/data/categories.json";
import { forceDbUri, DB_NAME } from "./_db";

async function connectToDB() {
  const uri = forceDbUri(process.env.MONGO_URI);
  console.log(`[seed] connecting to: ${DB_NAME}`);
  await mongoose.connect(uri, { bufferCommands: false });
  const dbName = mongoose.connection.db?.databaseName || "unknown";
  if (dbName !== DB_NAME) {
    throw new Error(`Connected to wrong database: ${dbName}`);
  }
  console.log(`[seed] connected to: ${dbName}`);
}

async function seedCategories() {
  console.log("[seed] upserting categories...");
  const col = mongoose.connection.db!.collection("categories");
  const cats = categoriesJson as any[];
  let created = 0;

  for (const cat of cats) {
    const label = cat.name || cat.label || cat.slug;
    try {
      await col.updateOne(
        { slug: cat.slug, locale: cat.locale || "en" },
        { $set: { slug: cat.slug, label, color: cat.color || "#1a8cb2", locale: cat.locale || "en", count: 0 } },
        { upsert: true }
      );
      created++;
      console.log(`  [+] ${label}`);
    } catch (error: any) {
      console.error(`  [!] ${cat.slug}: ${error.message}`);
    }
  }

  console.log(`[seed] categories done: ${created} upserted`);
}

async function main() {
  await connectToDB();
  await seedCategories();
  console.log("\n[seed] all done!");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("[seed] fatal error:", err);
  process.exit(1);
});
