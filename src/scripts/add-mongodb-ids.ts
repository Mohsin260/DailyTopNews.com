/**
 * Script to add MongoDB ObjectId format IDs to articles.json and categories.json
 */

import fs from 'fs';
import path from 'path';

// Simple MongoDB ObjectId generator (24 hex characters)
function generateObjectId(): string {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
  const randomValue = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
  const counter = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
  const machineId = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
  return timestamp + machineId + randomValue + counter;
}

// Read categories
const categoriesPath = path.join(process.cwd(), 'data', 'categories.json');
const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));

// Add _id to categories
const categoriesWithIds = categories.map((cat: any) => ({
  _id: cat._id || generateObjectId(),
  ...cat
}));

// Write updated categories
fs.writeFileSync(categoriesPath, JSON.stringify(categoriesWithIds, null, 2));
console.log(`✓ Updated ${categoriesWithIds.length} categories with MongoDB IDs`);

// Read articles
const articlesPath = path.join(process.cwd(), 'data', 'articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));

// Add _id to articles
const articlesWithIds = articles.map((article: any) => ({
  _id: article._id || generateObjectId(),
  ...article
}));

// Write updated articles
fs.writeFileSync(articlesPath, JSON.stringify(articlesWithIds, null, 2));
console.log(`✓ Updated ${articlesWithIds.length} articles with MongoDB IDs`);

console.log('\n✓ All done! MongoDB IDs added to both files.');
