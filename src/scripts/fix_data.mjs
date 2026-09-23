/**
 * fix_data.mjs
 * Cleans up articles.json:
 *  - Strips embedded newlines/excessive whitespace from title, excerpt
 *  - Converts relative image paths to /wp-content/... public paths
 *  - Marks the first 5 high-view, good-image articles as featured=true
 *  - Fixes malformed author slugs
 */
import fs from 'fs';

const articles = JSON.parse(fs.readFileSync('data/articles.json', 'utf8'));

function clean(str) {
    return str ? str.replace(/\s+/g, ' ').trim() : '';
}

function fixImage(img) {
    if (!img) return 'https://picsum.photos/seed/default/860/573';
    // Already a public path
    if (img.startsWith('/')) return img;
    // Already an https URL
    if (img.startsWith('https://') || img.startsWith('http://')) return img;
    // Relative path from extraction (e.g. "wp-content/uploads/...")
    return '/' + img;
}

// Find articles with large images for featured slots
const hasBigImage = (a) => {
    const img = fixImage(a.image);
    return img.includes('860x') || img.includes('615x') || img.includes('856x') || img.includes('1200x');
};

// Pick the first 5 high-image articles across different categories for featured
const featuredTargets = new Set();
const categoryUsed = new Set();
for (const a of articles) {
    if (featuredTargets.size >= 5) break;
    if (hasBigImage(a) && !categoryUsed.has(a.category)) {
        featuredTargets.add(a.id);
        categoryUsed.add(a.category);
    }
}
// If fewer than 5, take any remaining with big images
for (const a of articles) {
    if (featuredTargets.size >= 5) break;
    if (hasBigImage(a)) {
        featuredTargets.add(a.id);
    }
}

const fixed = articles.map((a) => {
    const cleanTitle = clean(a.title);
    return {
        ...a,
        title: cleanTitle,
        excerpt: clean(a.excerpt) || `Discover the latest insights and details about ${cleanTitle}. We explore everything you need to know to stay informed and ahead of the curve.`,
        image: fixImage(a.image),
        featured: featuredTargets.has(a.id),
        author: a.author ? a.author.replace(/\s+/g, '-').toLowerCase() : 'ashley-turner',
        authorName: a.authorName ? clean(a.authorName) : 'Ashley Turner',
    };
});

fs.writeFileSync('data/articles.json', JSON.stringify(fixed, null, 2));
console.log(`Fixed ${fixed.length} articles. Featured: ${fixed.filter(a => a.featured).map(a => a.title.slice(0, 40)).join(', ')}`);
