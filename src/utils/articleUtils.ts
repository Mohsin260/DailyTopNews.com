import articlesData from '@/data/articles.json';

function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/[\u2018\u2019\u0060\u0027]+s\b/g, '')
    .replace(/[\u2018\u2019\u0060\u0027]/g, '')
    .replace(/[\u201C\u201D]/g, '')
    .replace(/\u2026/g, '')
    .replace(/\.\.\./g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getArticleSlug(title: string): string {
  const n = normalize(title);
  // Exact match
  const exact = articlesData.find((a) => normalize(a.title) === n);
  if (exact) return exact.slug;
  // Partial match: first 25 chars
  const partial = articlesData.find((a) => {
    const aNorm = normalize(a.title);
    return n.includes(aNorm.substring(0, 25)) || aNorm.includes(n.substring(0, 25));
  });
  if (partial) return partial.slug;
  // Word overlap match
  const words = n.split(' ').filter((w) => w.length > 3);
  const best = articlesData.find((a) => {
    const aWords = normalize(a.title).split(' ').filter((w) => w.length > 3);
    const overlap = words.filter((w) => aWords.includes(w));
    return overlap.length >= Math.min(3, words.length);
  });
  return best ? best.slug : '';
}
