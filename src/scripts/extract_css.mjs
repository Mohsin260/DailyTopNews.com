import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlText = fs.readFileSync('../design-reference/foxiz.io/default/index.htm', 'utf8');
const $ = cheerio.load(htmlText);

let css = '';
$('style').each((i, el) => {
    css += $(el).html() + '\n';
});

// Write to active global CSS file
fs.writeFileSync('app/foxiz-original.css', css);
console.log('Extracted ' + css.length + ' bytes of CSS.');
