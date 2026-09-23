const fetch = require('node-fetch');

async function testSpecificArticleAPI() {
  try {
    console.log('Testing specific article API...');
    const response = await fetch('http://localhost:3000/api/articles/how-my-phone-s-most-annoying-feature-saved-my-life');
    const article = await response.json();
    
    console.log('Article image fields:');
    console.log({
      title: article.title,
      image: article.image,
      heroCoverImage: article.heroCoverImage,
      postBodyImage: article.postBodyImage,
      keyTakeawaysImage: article.keyTakeawaysImage,
      finalThoughtsImage: article.finalThoughtsImage
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testSpecificArticleAPI();