import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('../design-reference/foxiz.io/default/index.htm', 'utf8');
const $ = cheerio.load(html);

const articles = [];
const seenSlugs = new Set();

$('.p-wrap').each((_, el) => {
    const $el = $(el);

    const hElement = $el.find('h3, h4, h5, h2');
    const title = hElement.text().trim();
    const link = hElement.find('a').attr('href') || $el.find('.p-link').attr('href') || '/';

    // Extract slug from the end of the link
    let slug = link.split('/').filter(Boolean).pop();
    if (!slug || slug.includes('.')) {
        slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    // Skip if already seen (since many articles repeat in tickers or popular sections)
    if (seenSlugs.has(slug)) return;
    seenSlugs.add(slug);

    let image = $el.find('img').attr('src') || $el.find('img').attr('data-src');
    if (image && image.startsWith('data:image')) {
        image = $el.find('img').attr('data-lazy-src') || $el.find('img').attr('data-src') || image;
    }

    if (image && image.startsWith('http://foxiz.io')) {
        image = image.replace('http://foxiz.io/default/', '/');
    } else if (image && image.startsWith('https://foxiz.io')) {
        image = image.replace('https://foxiz.io/default/', '/');
    }

    const categoryLabel = $el.find('.p-category').first().text().trim();
    const category = categoryLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const excerpt = $el.find('.p-summary, .p-excerpt, .entry-summary').text().trim() || '';
    const authorName = $el.find('.meta-author .author, .meta-author a').text().trim() || 'Ashley Turner';
    const author = authorName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const date = $el.find('.meta-date .published').attr('datetime') || $el.find('.meta-date').text().trim() || '2024-10-15';

    const readTimeStr = $el.find('.meta-read').text().trim() || '5 Min Read';
    const readTime = parseInt(readTimeStr) || 5;

    if (title) {
        articles.push({
            id: slug,
            slug,
            title,
            excerpt,
            category: category || 'news',
            categoryLabel: categoryLabel || 'News',
            author,
            authorName,
            date,
            readTime,
            image: image || 'https://picsum.photos/seed/' + slug + '/800/500',
            featured: $el.hasClass('p-hero') || false,
            tags: [category || 'news', 'trending'],
            views: Math.floor(Math.random() * 20000) + 5000
        });
    }
});

console.log(`Extracted ${articles.length} unique articles.`);
fs.writeFileSync('data/articles.json', JSON.stringify(articles, null, 2));

