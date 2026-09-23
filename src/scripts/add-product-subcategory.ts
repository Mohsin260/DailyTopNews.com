/**
 * Migration: Reset and correctly assign product_subcategory to all articles.
 * Resets ALL existing values first, then re-assigns based on tags, brand, and title.
 *
 * Usage: npx tsx scripts/add-product-subcategory.ts
 */
import { MongoClient } from "mongodb";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "../.env") });

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = "dailytopnews-db";

function forceDbUri(raw: string): string {
  const [main, ...q] = String(raw).trim().split("?");
  const params = q.length ? "?" + q.join("?") : "";
  const i = main.indexOf("://");
  if (i < 0) { console.error("Invalid MONGO_URI"); process.exit(1); }
  const scheme = main.slice(0, i + 3);
  const rest = main.slice(i + 3);
  const at = rest.lastIndexOf("@");
  const from = at >= 0 ? at : 0;
  const slash = rest.indexOf("/", from);
  const authority = slash >= 0 ? rest.slice(0, slash) : rest;
  return scheme + authority + "/" + DB_NAME + params;
}

// ── Tag → subcategory (check order matters: more specific first) ──
const TAG_RULES: Array<{ match: (tag: string) => boolean; sub: string }> = [
  // Automotive — Arabic + English
  { match: (t) => /سيارات|car|automotive|electric car/i.test(t), sub: "automotive" },
  // Smartphones
  { match: (t) => /智能手机|phone|smartphone|iphone|galaxy|pixel|android|samsung/i.test(t), sub: "smartphones" },
  // Laptops
  { match: (t) => /laptop|macbook|xps|thinkpad|notebook/i.test(t), sub: "laptops" },
  // Headphones
  { match: (t) => /headphone|earbuds|airpods|noise cancel/i.test(t), sub: "headphones" },
  // Tablets
  { match: (t) => /tablet|ipad/i.test(t), sub: "tablets" },
  // Smartwatches
  { match: (t) => /smartwatch|watch|fitness|wearable|fitbit|garmin/i.test(t), sub: "smartwatches" },
  // Gaming consoles
  { match: (t) => /gaming|console|playstation|xbox|switch|ps5/i.test(t), sub: "gaming_consoles" },
  // Sneakers
  { match: (t) => /sneaker|shoe|jordan|yeezy|air max|ultraboost/i.test(t), sub: "sneakers" },
  // Home appliances
  { match: (t) => /vacuum|mixer|air fryer|kitchen|appliance|roomba|dyson|instant pot|peloton|bike/i.test(t), sub: "home_appliances" },
  // Audio speakers
  { match: (t) => /speaker|sonos|homepod|dolby|spatial audio|home audio/i.test(t), sub: "audio_speakers" },
  // Software / AI
  { match: (t) => /ai|software|saas|chatgpt|claude|notion|slack|streaming|fintech|bank|e-commerce|delivery|telecom/i.test(t), sub: "software" },
  // Cameras
  { match: (t) => /camera|nikon|canon|mirrorless|gopro|action camera/i.test(t), sub: "cameras" },
];

// ── Brand → subcategory (only unambiguous brands) ──
const BRAND_RULES: Array<{ match: (brand: string) => boolean; sub: string }> = [
  { match: (b) => /kia|hyundai|toyota|honda|ford|bmw|mercedes|tesla|byd|porsche|audi|volkswagen|nissan|lexus|subaru|undai/i.test(b), sub: "automotive" },
  { match: (b) => /google/i.test(b), sub: "smartphones" },
  { match: (b) => /dell/i.test(b), sub: "laptops" },
  { match: (b) => /bose/i.test(b), sub: "headphones" },
  { match: (b) => /nike/i.test(b), sub: "sneakers" },
  { match: (b) => /adidas/i.test(b), sub: "sneakers" },
  { match: (b) => /dyson/i.test(b), sub: "home_appliances" },
  { match: (b) => /irobot/i.test(b), sub: "home_appliances" },
  { match: (b) => /kitchenaid/i.test(b), sub: "home_appliances" },
  { match: (b) => /ninja/i.test(b), sub: "home_appliances" },
  { match: (b) => /instant pot/i.test(b), sub: "home_appliances" },
  { match: (b) => /microsoft/i.test(b), sub: "gaming_consoles" },
  { match: (b) => /nintendo/i.test(b), sub: "gaming_consoles" },
  { match: (b) => /garmin/i.test(b), sub: "smartwatches" },
  { match: (b) => /peloton/i.test(b), sub: "home_appliances" },
  { match: (b) => /sonos/i.test(b), sub: "audio_speakers" },
];

// ── Title patterns (ordered: most specific first) ──
const TITLE_RULES: Array<{ match: (title: string) => boolean; sub: string }> = [
  // Automotive — must come before smartphones
  { match: (t) => /kia|hyundai|toyota|honda|ford|bmw|mercedes|tesla|byd|porsche|audi|volkswagen|nissan|lexus|subaru|سيارات|car review|ev sedan|electric car|suv/i.test(t), sub: "automotive" },
  // Phones
  { match: (t) => /iphone|galaxy s\d|pixel \d|oneplus|xiaomi|redmi|realme|oppo|vivo|motorola/i.test(t), sub: "smartphones" },
  // Laptops
  { match: (t) => /macbook|dell xps|lenovo thinkpad|asus zenbook|hp spectre|laptop/i.test(t), sub: "laptops" },
  // Headphones
  { match: (t) => /sony wh|bose quiet|headphone|earbuds|airpods/i.test(t), sub: "headphones" },
  // Tablets
  { match: (t) => /ipad|galaxy tab|tablet/i.test(t), sub: "tablets" },
  // Smartwatches
  { match: (t) => /apple watch|galaxy watch|smartwatch|garmin fenix|fitbit/i.test(t), sub: "smartwatches" },
  // Gaming
  { match: (t) => /playstation|ps5|xbox|nintendo switch|gaming console/i.test(t), sub: "gaming_consoles" },
  // Sneakers
  { match: (t) => /nike|adidas|jordan|sneaker|yeezy/i.test(t), sub: "sneakers" },
  // Home appliances
  { match: (t) => /dyson|roomba|vacuum|kitchenaid|mixer|air fryer|instant pot|peloton/i.test(t), sub: "home_appliances" },
  // Audio speakers
  { match: (t) => /sonos|speaker|homepod|echo/i.test(t), sub: "audio_speakers" },
  // Software / AI
  { match: (t) => /chatgpt|claude|notion ai|slack|netflix|disney|streaming|starzplay|shahid|nubank|mercado|bbva|santander|claro|movistar|rappi|uber eats|noon|amazon|careem|stc|zain|البنك|الاتصالات|الاستثمار|رؤية/i.test(t), sub: "software" },
  // Cameras
  { match: (t) => /nikon|canon|mirrorless|gopro|action camera/i.test(t), sub: "cameras" },
];

function inferSubcategory(tags: string[], brand: string, title: string): string {
  // 1. Try tag-based matching
  for (const tag of tags) {
    for (const rule of TAG_RULES) {
      if (rule.match(tag)) return rule.sub;
    }
  }

  // 2. Try brand-based (Apple/Samsung/Sony need title disambiguation)
  const b = brand.toLowerCase();
  if (b === "apple") {
    const t = (title + " " + tags.join(" ")).toLowerCase();
    if (/watch|ساعة/.test(t)) return "smartwatches";
    if (/laptop|macbook|notebook/.test(t)) return "laptops";
    if (/tablet|ipad/.test(t)) return "tablets";
    if (/airpods|earbuds|سماعات/.test(t)) return "headphones";
    return "smartphones";
  }
  if (b === "samsung") {
    const t = (title + " " + tags.join(" ")).toLowerCase();
    if (/watch|ساعة/.test(t)) return "smartwatches";
    if (/tab|tablet/.test(t)) return "tablets";
    return "smartphones";
  }
  if (b === "sony") {
    const t = (title + " " + tags.join(" ")).toLowerCase();
    if (/playstation|ps5|gaming|gamer/.test(t)) return "gaming_consoles";
    if (/wh|headphone|xm5|xm4/.test(t)) return "headphones";
    return "headphones"; // default for Sony
  }

  // 3. Try brand rules
  for (const rule of BRAND_RULES) {
    if (rule.match(brand)) return rule.sub;
  }

  // 4. Try title-based
  for (const rule of TITLE_RULES) {
    if (rule.match(title)) return rule.sub;
  }

  return "";
}

async function migrate() {
  if (!MONGO_URI) {
    console.error("MONGO_URI not set. Aborting.");
    process.exit(1);
  }

  const client = new MongoClient(forceDbUri(MONGO_URI));

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const articles = db.collection("articles");

    // STEP 1: Reset ALL product_subcategory values
    const resetResult = await articles.updateMany(
      { product_subcategory: { $exists: true, $ne: "" } },
      { $unset: { product_subcategory: "" } }
    );
    console.log(`Reset ${resetResult.modifiedCount} articles (cleared product_subcategory).`);

    // STEP 2: Find all articles (products + articles with product-like content)
    const allArticles = await articles.find({}).toArray();
    console.log(`Total articles in DB: ${allArticles.length}`);

    let updated = 0;
    let skipped = 0;

    for (const article of allArticles) {
      const sub = inferSubcategory(
        article.tags || [],
        article.product_brand || "",
        article.title || ""
      );

      if (sub) {
        await articles.updateOne(
          { _id: article._id },
          { $set: { product_subcategory: sub, is_product: true } }
        );
        console.log(`  ✓ ${article.slug} → ${sub}`);
        updated++;
      } else {
        skipped++;
      }
    }

    console.log(`\nMigration complete.`);
    console.log(`  Updated: ${updated}`);
    console.log(`  Skipped: ${skipped}`);

    await articles.createIndex({ product_subcategory: 1 });
    console.log("Index created on product_subcategory.");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

migrate();
