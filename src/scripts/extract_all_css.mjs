import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlText = fs.readFileSync('../design-reference/foxiz.io/default/index.htm', 'utf8');
const $ = cheerio.load(htmlText);

let css = '';
$('style').each((i, el) => {
    css += $(el).html() + '\n';
});

// Since some styles might be inline, we also need to capture those styles
// Write everything to a standalone CSS file.
fs.writeFileSync('app/foxiz-original.css', css);
console.log('Extracted ' + css.length + ' bytes of CSS successfully into app/foxiz-original.css.');
