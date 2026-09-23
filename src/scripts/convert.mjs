import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlText = fs.readFileSync('../design-reference/foxiz.io/default/index.htm', 'utf8');
const $ = cheerio.load(htmlText);

// Extract the main content area
const siteContent = $('body').html();

// We will write a function to convert HTML string to JSX
function convertHTMLToJSX(html) {
    let jsx = html;

    // Replace class= with className=
    jsx = jsx.replace(/class=/g, 'className=');

    // Replace for= with htmlFor=
    jsx = jsx.replace(/for=/g, 'htmlFor=');

    // Fix inline styles - simple ones
    // We will just remove inline styles that are complex or try to handle simple background images.
    // Actually, let's just use regex to fix common SVG attributes
    jsx = jsx.replace(/stroke-width=/g, 'strokeWidth=');
    jsx = jsx.replace(/stroke-linecap=/g, 'strokeLinecap=');
    jsx = jsx.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
    jsx = jsx.replace(/fill-rule=/g, 'fillRule=');
    jsx = jsx.replace(/clip-path=/g, 'clipPath=');
    jsx = jsx.replace(/clip-rule=/g, 'clipRule=');

    // Close unclosed tags
    jsx = jsx.replace(/<img(.*?)>/g, (match, p1) => {
        if (match.endsWith('/>')) return match;
        return `<img${p1}/>`;
    });
    jsx = jsx.replace(/<br(.*?)>/g, (match, p1) => {
        if (match.endsWith('/>')) return match;
        return `<br${p1}/>`;
    });
    jsx = jsx.replace(/<input(.*?)>/g, (match, p1) => {
        if (match.endsWith('/>')) return match;
        return `<input${p1}/>`;
    });
    jsx = jsx.replace(/<hr(.*?)>/g, (match, p1) => {
        if (match.endsWith('/>')) return match;
        return `<hr${p1}/>`;
    });

    // Handle style="background-image: url(...)"
    jsx = jsx.replace(/style="background-image: url\('(.*?)'\);?"/g, "style={{ backgroundImage: `url('$1')` }}");
    jsx = jsx.replace(/style="background-image:url\((.*?)\)"/g, "style={{ backgroundImage: `url('$1')` }}");

    // Remove other style strings that break JSX (or wrap them in {})
    // This is very rudimentary, so let's just strip remaining style="..." to avoid React errors
    jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
        // If we already converted to {{...}} we skip
        if (match.startsWith('style={{')) return match;

        const styles = p1.split(';')
            .filter(s => s.trim())
            .map(s => {
                const [key, val] = s.split(':');
                if (!key || !val) return '';
                const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
                return `"${camelKey}": "${val.trim()}"`;
            })
            .filter(Boolean)
            .join(', ');

        return `style={{ ${styles} }}`;
    });

    // Replace HTML comments
    jsx = jsx.replace(/<!--(.*?)-->/gs, '{/* $1 */}');

    return jsx;
}

const jsxContent = convertHTMLToJSX(siteContent);

const output = `
import React from 'react';
import articles from '@/data/articles.json';
import Image from 'next/image';

export default function FoxizHome() {
  return (
    <div className="site-content">
      ${jsxContent}
    </div>
  );
}
`;

fs.writeFileSync('components/FoxizExtracted.tsx', output);
console.log('JSX extraction complete.');
