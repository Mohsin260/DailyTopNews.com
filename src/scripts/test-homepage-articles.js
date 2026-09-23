const fetch = require('node-fetch');

async function testHomepage() {
  try {
    console.log('🔍 Testing homepage article fetch...\n');
    
    // Test the API endpoint with limit=100
    const response = await fetch('http://localhost:3000/api/articles?limit=100');
    const data = await response.json();
    
    console.log(`📊 Total articles fetched: ${data.articles.length}\n`);
    
    // Count articles by category
    const categoryCounts = {};
    data.articles.forEach(article => {
      categoryCounts[article.category] = (categoryCounts[article.category] || 0) + 1;
    });
    
    console.log('📈 Articles per category:');
    Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count} articles`);
    });
    
    console.log('\n✅ Test complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testHomepage();
