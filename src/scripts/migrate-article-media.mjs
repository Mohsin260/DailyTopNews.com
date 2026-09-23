import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Minimal Schema to avoid validation issues during migration
const ArticleSchema = new mongoose.Schema({
  title: String,
  articleMedia: {
    heroCoverMedia: { url: String, vastTagUrl: String },
    postBodyMedia: { url: String, vastTagUrl: String },
    keyTakeawaysMedia: { url: String, vastTagUrl: String },
    finalThoughtsMedia: { url: String, vastTagUrl: String },
  }
}, { strict: false, timestamps: true });

const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);

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

async function migrate() {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    console.error('❌ MONGO_URI not found in environment variables.');
    process.exit(1);
  }

  try {
    console.log('🚀 Connecting to MongoDB...');
    await mongoose.connect(forceDbUri(MONGO_URI));
    console.log(`✅ Connected (${mongoose.connection.db.databaseName}).`);

    const articles = await Article.find({});
    console.log(`📦 Found ${articles.length} articles to process.`);

    let updatedCount = 0;

    for (const doc of articles) {
      const a = doc.toObject();
      
      const heroUrl = a.articleMedia?.heroCoverMedia?.url || 
                       a.articleImages?.heroCoverImage || 
                       a.heroCoverImage || 
                       a.image || "";
                       
      const postBodyUrl = a.articleMedia?.postBodyMedia?.url || 
                          a.articleImages?.postBodyImage || 
                          a.postBodyImage || "";
                          
      const keyTakeawaysUrl = a.articleMedia?.keyTakeawaysMedia?.url || 
                              a.articleImages?.keyTakeawaysImage || 
                              a.keyTakeawaysImage || "";
                              
      const finalThoughtsUrl = a.articleMedia?.finalThoughtsMedia?.url || 
                               a.articleImages?.finalThoughtsImage || 
                               a.finalThoughtsImage || "";

      // Reconstruct document in EXACT order
      const orderedDocument = {
        _id: a._id,
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        category: a.category,
        categoryLabel: a.categoryLabel,
        author: a.author,
        authorName: a.authorName,
        date: a.date,
        readTime: a.readTime,
        featured: a.featured,
        tags: a.tags,
        views: a.views,
        status: a.status,
        articleMedia: {
          heroCoverMedia: { url: heroUrl, vastTagUrl: a.articleMedia?.heroCoverMedia?.vastTagUrl || "" },
          postBodyMedia: { url: postBodyUrl, vastTagUrl: a.articleMedia?.postBodyMedia?.vastTagUrl || "" },
          keyTakeawaysMedia: { url: keyTakeawaysUrl, vastTagUrl: a.articleMedia?.keyTakeawaysMedia?.vastTagUrl || "" },
          finalThoughtsMedia: { url: finalThoughtsUrl, vastTagUrl: a.articleMedia?.finalThoughtsMedia?.vastTagUrl || "" }
        },
        bodyContent: a.bodyContent || "",
        keyTakeawaysContent: a.keyTakeawaysContent || "",
        finalThoughtsContent: a.finalThoughtsContent || "",
        adOverrides: a.adOverrides || [],
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
        __v: a.__v
      };

      // Perform a full replacement to fix physical BSON order
      await Article.replaceOne({ _id: doc._id }, orderedDocument);
      updatedCount++;
    }

    console.log(`🎉 Migration complete! ${updatedCount} articles updated and re-ordered.`);
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

migrate();
