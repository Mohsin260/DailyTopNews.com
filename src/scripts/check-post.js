const mongoose = require('mongoose');
require('dotenv').config();

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

async function testSpecificArticle() {
  try {
    await mongoose.connect(forceDbUri(process.env.MONGO_URI));
    console.log('Connected to database (' + mongoose.connection.db.databaseName + ')');
    
    const slug = 'how-my-phone-s-most-annoying-feature-saved-my-life';
    
    // Check if article exists
    const article = await Article.findOne({ slug }).lean();
    if (article) {
      console.log('Article found:');
      console.log({
        title: article.title,
        slug: article.slug,
        status: article.status,
        postBodyImage: article.postBodyImage,
        keyTakeawaysImage: article.keyTakeawaysImage
      });
    } else {
      console.log('Article not found with slug:', slug);
    }
    
    // Check with published status
    const publishedArticle = await Article.findOne({ 
      slug, 
      status: "published" 
    }).lean();
    
    if (publishedArticle) {
      console.log('\nPublished article found');
    } else {
      console.log('\nNo published article found with this slug');
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

testSpecificArticle();