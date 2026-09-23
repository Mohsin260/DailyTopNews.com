/**
 * Migration: posts → articles collection
 * ----------------------------------------
 * This script moves all documents from the old 'posts' MongoDB collection
 * to the new 'articles' collection, restructuring the flat image fields
 * into the new nested `articleImages` sub-document.
 *
 * Run ONCE after deploying the updated Article model (which no longer
 * uses `collection: 'posts'`).
 *
 * Usage:
 *   node scripts/migrate-to-articles.js
 *
 * Requirements:
 *   MONGO_URI must be set in your environment (.env or shell).
 */

require("dotenv").config({ path: ".env" });
const { MongoClient } = require("mongodb");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌  MONGO_URI is not set. Add it to .env");
  process.exit(1);
}

// Always target dailytopnews-db — strips any other DB name from the URI
function forceDbUri(raw) {
  const [main, ...q] = String(raw).trim().split('?');
  const params = q.length ? '?' + q.join('?') : '';
  const i = main.indexOf('://');
  if (i < 0) { console.error('❌ Invalid MONGO_URI'); process.exit(1); }
  const scheme = main.slice(0, i + 3);
  const rest = main.slice(i + 3);
  const at = rest.lastIndexOf('@');
  const from = at >= 0 ? at : 0;
  const slash = rest.indexOf('/', from);
  const authority = slash >= 0 ? rest.slice(0, slash) : rest;
  return scheme + authority + '/dailytopnews-db' + params;
}

async function run() {
  const client = new MongoClient(forceDbUri(MONGO_URI));
  await client.connect();
  console.log("✅  Connected to MongoDB");

  const db = client.db("dailytopnews-db"); // always dailytopnews-db
  const postsCol = db.collection("posts");
  const articlesCol = db.collection("articles");

  // 1. Count existing docs
  const existingInArticles = await articlesCol.countDocuments();
  const totalInPosts = await postsCol.countDocuments();
  console.log(`\n📊  posts collection:    ${totalInPosts} documents`);
  console.log(`📊  articles collection: ${existingInArticles} documents`);

  if (totalInPosts === 0) {
    console.log("\n⚠️  Nothing to migrate — posts collection is empty.");
    await client.close();
    return;
  }

  // 2. Stream all posts and insert into articles
  const cursor = postsCol.find({});
  let migrated = 0;
  let skipped = 0;
  let errors = 0;

  while (await cursor.hasNext()) {
    const doc = await cursor.next();

    // Skip if already migrated (same _id exists in articles)
    const exists = await articlesCol.findOne({ _id: doc._id });
    if (exists) {
      skipped++;
      continue;
    }

    // Build nested articleImages from flat fields
    const articleImages = {
      heroCoverImage: doc.heroCoverImage || doc.articleImages?.heroCoverImage || "",
      postBodyImage: doc.postBodyImage || doc.articleImages?.postBodyImage || "",
      keyTakeawaysImage: doc.keyTakeawaysImage || doc.articleImages?.keyTakeawaysImage || "",
      finalThoughtsImage: doc.finalThoughtsImage || doc.articleImages?.finalThoughtsImage || "",
    };

    // Build the new document
    const newDoc = {
      ...doc,
      articleImages,
      // Remove old flat image fields
      heroCoverImage: undefined,
      postBodyImage: undefined,
      keyTakeawaysImage: undefined,
      finalThoughtsImage: undefined,
      // Ensure timestamps exist
      createdAt: doc.createdAt || new Date(doc.date || Date.now()),
      updatedAt: doc.updatedAt || new Date(doc.date || Date.now()),
    };

    // Remove undefined keys
    Object.keys(newDoc).forEach((k) => newDoc[k] === undefined && delete newDoc[k]);

    try {
      await articlesCol.insertOne(newDoc);
      migrated++;
      if (migrated % 100 === 0) {
        console.log(`   ↳ Migrated ${migrated}/${totalInPosts}…`);
      }
    } catch (err) {
      console.error(`❌  Failed to migrate _id=${doc._id}:`, err.message);
      errors++;
    }
  }

  console.log(`\n✅  Migration complete!`);
  console.log(`   Migrated : ${migrated}`);
  console.log(`   Skipped  : ${skipped} (already existed)`);
  console.log(`   Errors   : ${errors}`);

  if (errors === 0 && migrated > 0) {
    console.log(`\n🗑️  If everything looks correct, you can drop the old collection:`);
    console.log(`   db.posts.drop()`);
    console.log(`   (or keep it as a backup)`);
  }

  await client.close();
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
