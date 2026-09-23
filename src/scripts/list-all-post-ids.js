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

async function listAllPostIds() {
  try {
    await mongoose.connect(forceDbUri(process.env.MONGO_URI));
    console.log('✅ Connected to MongoDB (' + mongoose.connection.db.databaseName + ')');

    const db = mongoose.connection.db;
    const postsCollection = db.collection('posts');
    
    // Get all posts with just ID and title
    const posts = await postsCollection.find({}, { 
      projection: { _id: 1, title: 1, slug: 1 } 
    }).toArray();
    
    console.log(`\n📄 All ${posts.length} posts in database:`);
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ID: ${post._id}`);
      console.log(`   Title: ${post.title}`);
      console.log(`   Slug: ${post.slug}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

listAllPostIds();