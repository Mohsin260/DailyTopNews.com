import fs from "fs";
import path from "path";

const U = (id: string, w = 860) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const IMAGE_MAP: Record<string, string> = {
  "iphone-16-pro-review": U("photo-1592750475338-74b7b21085ab"),
  "samsung-galaxy-s25-ultra-review": U("photo-1610945265064-0e34e5519bbf"),
  "macbook-pro-m4-review": U("photo-1517336714731-489689fd1ca8"),
  "dell-xps-15-2025-review": U("photo-1593642632559-0c6d3fc62b89"),
  "sony-wh-1000xm5-review": U("photo-1484704849700-f032a568e944"),
  "bose-quietcomfort-ultra-review": U("photo-1618366712010-f4ae9c647dcb"),
  "ipad-pro-m4-review": U("photo-1544244015-0df4b3ffc6b0"),
  "google-pixel-9-pro-review": U("photo-1598327105666-5b89351aff97"),
  "apple-watch-ultra-2-review": U("photo-1546868871-7041f2a55e12"),
  "samsung-galaxy-watch-6-review": U("photo-1523275335684-37898b6baf30"),
  "garmin-fenix-7-review": U("photo-1518183214770-9cffbec72538"),
  "airpods-pro-2-review": U("photo-1600294037681-c80b4cb5b434"),
  "sonos-era-300-review": U("photo-1608043152269-423dbba4e7e1"),
  "nike-air-max-270-review": U("photo-1542291026-7eec264c27ff"),
  "adidas-ultraboost-review": U("photo-1552346154-21d32810aba3"),
  "ray-ban-meta-smart-glasses-review": U("photo-1572635196237-14b3f281503f"),
  "gopro-hero-12-review": U("photo-1516035069371-29a1b244cc32"),
  "peloton-bike-plus-review": U("photo-1571068316344-75bc76f77890"),
  "playstation-5-pro-review": U("photo-1606144042614-b2417e99c4e3"),
  "xbox-series-x-review": U("photo-1552820728-8b83bb6b773f"),
  "nintendo-switch-oled-review": U("photo-1578303512597-81e6cc155b3e"),
  "dyson-v15-detect-review": U("photo-1558317374-067fb5f30001"),
  "irobot-roomba-j7-review": U("photo-1585123334904-845d60e97b29"),
  "kitchenaid-artisan-stand-mixer-review": U("photo-1556909114-f6e7ad7d3136"),
  "ninja-foodi-air-fryer-review": U("photo-1547592180-85f173990554"),
  "instant-pot-duo-review": U("photo-1608501078713-8e445a709b39"),
  "notion-ai-review": U("photo-1611532736597-de2d4265fba3"),
  "slack-enterprise-review": U("photo-1553062407-98eeb64c6a62"),
};

const filePath = path.join(__dirname, "../data/articles.json");
const articles = JSON.parse(fs.readFileSync(filePath, "utf8"));

let updated = 0;
for (const a of articles) {
  const url = IMAGE_MAP[a.slug];
  if (url) {
    a.image = url;
    if (!a.articleMedia) a.articleMedia = {};
    if (!a.articleMedia.heroCoverMedia) a.articleMedia.heroCoverMedia = {};
    a.articleMedia.heroCoverMedia.url = url;
    a.articleMedia.heroCoverMedia.poster = "";
    updated++;
  }
}

fs.writeFileSync(filePath, JSON.stringify(articles, null, 2) + "\n", "utf8");
console.log(`Updated ${updated}/${articles.length} articles in data/articles.json`);
