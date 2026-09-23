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

const adSnippetSchema = new mongoose.Schema({}, { strict: false, collection: 'adsnippets' });
const AdSnippet = mongoose.model('AdSnippet', adSnippetSchema);

async function testAds() {
  try {
    await mongoose.connect(forceDbUri(process.env.MONGO_URI));
    console.log('Connected to database (' + mongoose.connection.db.databaseName + ')');
    
    // Check if there are any ads
    const ads = await AdSnippet.find({}).lean();
    console.log(`Found ${ads.length} ads in database`);
    
    if (ads.length > 0) {
      console.log('\nAds:');
      ads.forEach(ad => {
        console.log(`- ${ad.name} (${ad.pageType}/${ad.position}): ${ad.enabled ? 'Enabled' : 'Disabled'}`);
        console.log(`  Code: ${ad.code.substring(0, 100)}...`);
      });
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

testAds();