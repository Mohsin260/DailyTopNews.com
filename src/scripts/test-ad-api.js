const fetch = require('node-fetch');

async function testAdAPI() {
  try {
    console.log('Testing ads API for article page...');
    const response = await fetch('http://localhost:3000/api/ads?pageType=article');
    const data = await response.json();
    
    console.log(`Found ${data.items.length} ads for article page`);
    
    if (data.items.length > 0) {
      const ad = data.items[0];
      console.log('\nFirst ad:');
      console.log(`- Name: ${ad.name}`);
      console.log(`- Label: ${ad.label}`);
      console.log(`- Position: ${ad.position}`);
      console.log(`- Enabled: ${ad.enabled}`);
      console.log(`- Code length: ${ad.code.length} characters`);
      console.log(`- Code preview: ${ad.code.substring(0, 200)}...`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAdAPI();