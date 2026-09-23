const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testAPIs() {
  console.log('🧪 Testing API endpoints...\n');

  try {
    // Test categories API
    console.log('📂 Testing Categories API...');
    const categoriesResponse = await fetch(`${BASE_URL}/api/categories`);
    const categories = await categoriesResponse.json();
    
    if (categoriesResponse.ok) {
      console.log(`✅ Categories API: ${categories.length} categories found`);
      console.log('   Sample category:', categories[0]);
    } else {
      console.log('❌ Categories API failed:', categories);
    }

    // Test articles API
    console.log('\n📄 Testing Articles API...');
    const articlesResponse = await fetch(`${BASE_URL}/api/articles`);
    const articles = await articlesResponse.json();
    
    if (articlesResponse.ok) {
      console.log(`✅ Articles API: ${articles.length} articles found`);
      console.log('   Sample article:', {
        title: articles[0]?.title,
        slug: articles[0]?.slug,
        status: articles[0]?.status,
        category: articles[0]?.category
      });
    } else {
      console.log('❌ Articles API failed:', articles);
    }

    // Test articles with status filter
    console.log('\n📄 Testing Articles API with status=published...');
    const publishedResponse = await fetch(`${BASE_URL}/api/articles?status=published`);
    const publishedArticles = await publishedResponse.json();
    
    if (publishedResponse.ok) {
      console.log(`✅ Published Articles: ${publishedArticles.length} articles found`);
    } else {
      console.log('❌ Published Articles API failed:', publishedArticles);
    }

    // Test single article
    if (articles.length > 0 && articles[0]?.slug) {
      console.log('\n📄 Testing Single Article API...');
      const singleResponse = await fetch(`${BASE_URL}/api/articles/${articles[0].slug}`);
      const singleArticle = await singleResponse.json();
      
      if (singleResponse.ok) {
        console.log(`✅ Single Article API: Found "${singleArticle.title}"`);
      } else {
        console.log('❌ Single Article API failed:', singleArticle);
      }
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPIs();