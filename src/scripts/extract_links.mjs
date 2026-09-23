import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlText = fs.readFileSync('../design-reference/foxiz.io/default/index.htm', 'utf8');
const $ = cheerio.load(htmlText);

let stylesheets = [];
$('link[rel="stylesheet"]').each((i, el) => {
    let href = $(el).attr('href');
    if (href && !href.startsWith('http') && !href.startsWith('//')) {
        // Local paths usually wp-content/... which we copied to public/wp-content/...
        stylesheets.push(`<link rel="stylesheet" href="/${href}" />`);
    } else if (href) {
        stylesheets.push(`<link rel="stylesheet" href="${href}" />`);
    }
});

console.log(stylesheets.join('\n'));
