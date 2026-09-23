const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;
const LOCALE = process.env.NEXT_PUBLIC_LOCALE || 'en';

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
const DB_URI = forceDbUri(MONGO_URI);

// Define SimpleCategory schema to match our model
const simpleCategorySchema = new mongoose.Schema({
  slug: { type: String, required: true },
  label: { type: String, required: true },
  color: { type: String, default: "#1a8cb2" },
  count: { type: Number, default: 0 },
  locale: { type: String, default: "en" },
  footerLabel: { type: String, default: "" },
}, { 
  timestamps: false,
  collection: 'categories'
});
simpleCategorySchema.index({ slug: 1, locale: 1 }, { unique: true });

const SimpleCategory = mongoose.model('SimpleCategory', simpleCategorySchema);

async function importCategories() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(DB_URI);
    console.log('✅ Connected to MongoDB\n');
    console.log(`🌐 Using locale: ${LOCALE}\n`);

    // Load categories JSON file
    const categoriesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/categories.json'), 'utf8')
    );

    console.log(`📦 Found ${categoriesData.length} categories\n`);

    // Clear existing categories for this locale
    console.log('🗑️  Clearing existing categories...');
    await SimpleCategory.deleteMany({ locale: LOCALE });
    console.log('✅ Cleared existing categories\n');

    // Import categories
    console.log('📂 Importing categories...');
    
    for (const cat of categoriesData) {
      try {
        await SimpleCategory.create({
          slug: cat.slug,
          label: cat.label,
          color: cat.color || '#1a8cb2',
          count: cat.count || 0,
          locale: LOCALE,
          footerLabel: cat.footerLabel || '',
        });
        console.log(`  ✓ ${cat.label} (${cat.slug})`);
      } catch (error) {
        console.log(`  ❌ Error importing "${cat.label}": ${error.message}`);
      }
    }

    console.log(`\n✅ Successfully imported ${categoriesData.length} categories`);

    // Verify import
    const importedCount = await SimpleCategory.countDocuments({ locale: LOCALE });
    console.log(`📊 Total categories in database for locale "${LOCALE}": ${importedCount}`);

    // List all categories
    const allCategories = await SimpleCategory.find({ locale: LOCALE }).lean();
    console.log('\n📋 Imported categories:');
    allCategories.forEach(cat => {
      console.log(`  • ${cat.label} (${cat.slug}) - ${cat.color}`);
    });

  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run import
importCategories();