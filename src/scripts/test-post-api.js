const fetch = require('node-fetch');

async function testPostAPI() {
  const testId = '69b6312860deb12750c15915';
  const url = `http://localhost:3000/api/posts/${testId}`;
  
  console.log(`🧪 Testing API: ${url}`);
  
  try {
    const response = await fetch(url);
    console.log(`📊 Status: ${response.status}`);
    console.log(`📊 Status Text: ${response.statusText}`);
    
    const text = await response.text();
    console.log(`📄 Response: ${text}`);
    
    if (response.ok) {
      const data = JSON.parse(text);
      console.log(`✅ Success! Post title: ${data.title}`);
    } else {
      console.log(`❌ Error response`);
    }
    
  } catch (error) {
    console.error('❌ Fetch error:', error.message);
  }
}

testPostAPI();