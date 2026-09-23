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

async function checkPostIds() {
  try {
    await mongoose.connect(forceDbUri(process.env.MONGO_URI));
    console.log('✅ Connected to MongoDB (' + mongoose.connection.db.databaseName + ')');

    const db = mongoose.connection.db;
    const postsCollection = db.collection('posts');
    
    // Get first 5 posts to see ID format
    const posts = await postsCollection.find({}).limit(5).toArray();
    
    console.log('\n📄 Sample posts with IDs:');
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ID: ${post._id} (${post._id.toString().length} chars)`);
      console.log(`   Title: ${post.title}`);
      console.log(`   Type: ${typeof post._id}`);
      console.log(`   Valid ObjectId: ${mongoose.Types.ObjectId.isValid(post._id)}`);
      console.log('');
    });

    // Check the specific ID from the error
    const problemId = '69b6312860deb12750c15915';
    console.log(`🔍 Checking problem ID: ${problemId}`);
    console.log(`   Length: ${problemId.length} chars`);
    console.log(`   Valid ObjectId: ${mongoose.Types.ObjectId.isValid(problemId)}`);
    
    // Try to find it
    const foundPost = await postsCollection.findOne({ _id: problemId });
    console.log(`   Found in DB: ${foundPost ? 'YES' : 'NO'}`);
    
    if (foundPost) {
      console.log(`   Title: ${foundPost.title}`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

checkPostIds();