const fs = require('fs');

const css = fs.readFileSync('source_index.css', 'utf8');
const js = fs.readFileSync('source_index.js', 'utf8');

console.log('CSS length:', css.length);
console.log('JS length:', js.length);

const cssUrls = [...new Set((css.match(/url\([^)]+\)/g) || []).map(u => u.replace(/^url\(["'\s]?/, '').replace(/["'\s]?\)$/, '')))];
console.log('CSS URLs count:', cssUrls.length);
console.log('CSS URLs:', cssUrls);

const imgMatches = [...new Set(js.match(/\/assets\/[a-zA-Z0-9_\.-]+\.(png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)/gi) || [])];
console.log('Asset matches in JS count:', imgMatches.length);
console.log('JS assets sample:', imgMatches.slice(0, 30));
