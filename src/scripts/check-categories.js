const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

// Always target dailytopnews-db — strips any other DB name from the URI
function forceDbUri(raw) {
  if (!raw) { console.error('❌ MONGO_URI not set'); process.exit(1); }
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

const articleSchema = new mongoose.Schema({}, { strict: false, collection: 'posts' });
const Article = mongoose.model('Article', articleSchema);

async function checkCategories() {
  try {
    await mongoose.connect(forceDbUri(process.env.MONGO_URI));
    console.log('✅ Connected to database (' + mongoose.connection.db.databaseName + ')');

    // Get all unique category values
    const categories = await Article.distinct('category');
    console.log('\n📊 Unique category values in database:');
    console.log(categories);

    // Count articles per category
    console.log('\n📈 Article count per category:');
    for (const cat of categories) {
      const count = await Article.countDocuments({ category: cat });
      console.log(`  ${cat}: ${count} articles`);
    }

    // Sample a few articles to see their category values
    console.log('\n📄 Sample articles with their categories:');
    const samples = await Article.find({}).limit(10).select('title category categoryLabel slug');
    samples.forEach(article => {
      console.log(`  - "${article.title}"`);
      console.log(`    category: "${article.category}"`);
      console.log(`    categoryLabel: "${article.categoryLabel}"`);
      console.log(`    slug: "${article.slug}"`);
      console.log('');
    });

    await mongoose.disconnect();
    console.log('✅ Disconnected from database');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkCategories();
