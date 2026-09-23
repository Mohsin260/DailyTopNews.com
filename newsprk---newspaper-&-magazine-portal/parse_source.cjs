const fs = require('fs');

const js = fs.readFileSync('source_index.js', 'utf8');

// Let's check routes
const routeMatches = js.match(/path:\s*["'][^"']+["']/g) || [];
console.log('Routes in source:', routeMatches);

// Let's check page titles / keywords
console.log('Includes NewsPrk?', js.includes('NewsPrk'));
console.log('Includes Trending?', js.includes('trending'));
console.log('Includes Sports?', js.includes('Sports'));

// Look for component names or major sections
const matches = js.match(/function [A-Z][a-zA-Z0-9]+/g) || [];
console.log('Functions:', matches.slice(0, 30));
