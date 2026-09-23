/**
 * Data Import Script (Updated)
 *
 * Imports categories, users, and articles into MongoDB
 * using the CURRENT Mongoose model schemas:
 *   - SimpleCategory  → collection: "categories"
 *   - User            → collection: "users"
 *   - Article         → collection: "articles"
 *
 * Data files read:
 *   data/categories.json
 *   data/users.json
 *   data/Dailytopnews.articles.json
 *
 * Usage:
 *   node src/scripts/import-data.js
 *
 * Environment:
 *   Requires MONGO_URI in .env — database name is always forced to dailytopnews-db
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not found in .env file');
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

/* ------------------------------------------------------------------ */
/*  Schemas — mirror the app's Mongoose models                         */
/* ------------------------------------------------------------------ */

// SimpleCategory (collection: "categories")
const simpleCategorySchema = new mongoose.Schema(
  {
    slug:        { type: String, required: true, unique: true, index: true },
    label:       { type: String, required: true },
    color:       { type: String, default: '#1a8cb2' },
    count:       { type: Number, default: 0 },
    footerLabel: { type: String, default: '' },
  },
  { timestamps: false, collection: 'categories' }
);

// User
const userSchema = new mongoose.Schema(
  {
    name:                 { type: String, required: true, trim: true, maxlength: 120 },
    email:                { type: String, required: true, unique: true, index: true, trim: true, lowercase: true, maxlength: 254 },
    avatarUrl:            { type: String, default: null },
    passwordHash:         { type: String, default: null },
    roles:                { type: [String], enum: ['admin', 'editor', 'author'], default: ['author'] },
    isActive:             { type: Boolean, default: true },
    invitationTokenHash:  { type: String, default: null },
    invitationExpiresAt:  { type: Date,   default: null },
    resetTokenHash:       { type: String, default: null },
    resetTokenExpiresAt:  { type: Date,   default: null },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

// Article
const mediaItemSchema = new mongoose.Schema(
  {
    url:        { type: String, default: '' },
    vastTagUrl: { type: String, default: '' },
  },
  { _id: false }
);

const articleMediaSchema = new mongoose.Schema(
  {
    heroCoverMedia:     { type: mediaItemSchema, default: () => ({}) },
    postBodyMedia:      { type: mediaItemSchema, default: () => ({}) },
    keyTakeawaysMedia:  { type: mediaItemSchema, default: () => ({}) },
    finalThoughtsMedia: { type: mediaItemSchema, default: () => ({}) },
    vastAdSlotIds:      { type: [mongoose.Schema.Types.ObjectId], ref: 'AdSnippet', default: [] },
  },
  { _id: false }
);

const adOverrideSchema = new mongoose.Schema(
  {
    position:    { type: String, required: true },
    adSnippetId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdSnippet', required: true },
    width:       { type: Number, default: null },
    height:      { type: Number, default: null },
  },
  { _id: false }
);

const articleSchema = new mongoose.Schema(
  {
    slug:                 { type: String, required: true, unique: true, index: true },
    title:                { type: String, required: true },
    excerpt:              { type: String, default: '' },
    category:             { type: String, default: 'uncategorized' },
    categoryLabel:        { type: String, default: 'Uncategorized' },
    author:               { type: String, default: 'unknown' },
    authorName:           { type: String, default: 'Unknown Author' },
    date:                 { type: String, required: true },
    readTime:             { type: Number, default: 5 },
    featured:             { type: Boolean, default: false },
    tags:                 [{ type: String }],
    views:                { type: Number, default: 0 },
    status:               { type: String, enum: ['draft', 'published', 'scheduled'], default: 'published' },
    articleMedia:         { type: articleMediaSchema, default: () => ({}) },
    bodyContent:          { type: String, default: '' },
    keyTakeawaysContent:  { type: String, default: '' },
    finalThoughtsContent: { type: String, default: '' },
    adOverrides:          { type: [adOverrideSchema], default: [] },
  },
  { timestamps: true }
);

const SimpleCategory = mongoose.model('SimpleCategory', simpleCategorySchema);
const User           = mongoose.model('User', userSchema);
const Article        = mongoose.model('Article', articleSchema);

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/**
 * Safely read & parse a JSON file. Exits on error.
 */
function loadJSON(relativePath) {
  const fullPath = path.join(__dirname, '..', relativePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ File not found: ${fullPath}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

/* ------------------------------------------------------------------ */
/*  Main import routine                                                */
/* ------------------------------------------------------------------ */

async function importData() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(forceDbUri(MONGO_URI));
    console.log(`✅ Connected to MongoDB (${mongoose.connection.db.databaseName})\n`);

    // ── Load data files ──────────────────────────────────────────────
    const categoriesData = loadJSON('data/categories.json');
    const usersData      = loadJSON('data/users.json');
    const articlesData   = loadJSON('data/Dailytopnews.articles.json');

    console.log(`📦 Found ${categoriesData.length} categories`);
    console.log(`📦 Found ${usersData.length} users`);
    console.log(`📦 Found ${articlesData.length} articles\n`);

    // ── Step 1: Import Categories ────────────────────────────────────
    console.log('📂 Importing categories...');
    await SimpleCategory.deleteMany({});
    await SimpleCategory.insertMany(categoriesData);
    console.log(`✅ Imported ${categoriesData.length} categories\n`);

    // ── Step 2: Import Users ─────────────────────────────────────────
    console.log('👤 Importing users...');
    await User.deleteMany({});
    await User.insertMany(usersData);
    console.log(`✅ Imported ${usersData.length} users\n`);

    // ── Step 3: Import Articles ──────────────────────────────────────
    console.log('📝 Importing articles...');
    await Article.deleteMany({});

    try {
      // Use ordered: false to continue even if some articles fail validation/duplicates
      const result = await Article.insertMany(articlesData, { ordered: false });
      console.log(`✅ Successfully imported ${result.length} articles`);
    } catch (error) {
      const importedCount = error.insertedDocs ? error.insertedDocs.length : 0;
      const failedCount = articlesData.length - importedCount;
      console.log(`✅ Successfully imported ${importedCount} articles`);
      if (failedCount > 0) {
        console.warn(`⚠️  ${failedCount} articles failed (likely duplicate slugs).`);
      }
    }

    // ── Summary ──────────────────────────────────────────────────────
    console.log('\n' + '─'.repeat(50));
    console.log('📊 Import Summary:');
    console.log(`  Categories : ${categoriesData.length}`);
    console.log(`  Users      : ${usersData.length}`);
    console.log(`  Articles   : ${articlesData.length}`);
    console.log('─'.repeat(50));

    console.log('\n✅ Import completed successfully!');
    console.log('\n🚀 Next steps:');
    console.log('  1. Start your dev server: npm run dev');
    console.log('  2. Visit: http://localhost:3000');
    console.log('  3. Check dashboard: http://localhost:3000/dashboard');

  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run import
importData();
