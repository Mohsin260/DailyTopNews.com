const fs = require('fs');
const path = require('path');

// Read the article_updated.json file
const articlesPath = path.join(__dirname, '../data/article_updated.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

console.log(`Found ${articles.length} articles`);

// Add status: 'published' to all articles
const updatedArticles = articles.map(article => ({
  ...article,
  status: 'published'
}));

// Write back to file
fs.writeFileSync(articlesPath, JSON.stringify(updatedArticles, null, 2));
console.log(`Updated ${updatedArticles.length} articles with status: 'published'`);