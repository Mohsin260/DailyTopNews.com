import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { connectScript } from "./_db";

dotenv.config({ path: path.join(__dirname, "../.env") });

const U = (id: string, w = 800) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

/**
 * slug -> [entity_A image, entity_B image]
 * All URLs verified as working (HTTP 200) royalty-free Unsplash images.
 */
const ENTITY_IMAGE_MAP: Record<string, [string, string]> = {
  // ── Arabic comparisons ────────────────────────────────
  "ar-السعودية-رؤية-2030--vs-امارات": [U("photo-1590283603385-17ffb3a7f29f"), U("photo-1512453979798-5ea266f8880c")],
  "ar-هيونداي-كيا-السعودية": [U("photo-1568605117036-5fe5e7bab0b7"), U("photo-1494976388531-d1058494cdd8")],
  "ar-شيهد-ستارزبلاي-البث": [U("photo-1489599849927-2ee91cede3ba"), U("photo-1478720568477-152d9b164e26")],
  "ar-كريم-vs-اوبر-الخليج": [U("photo-1449965408869-eaa3f722e40d"), U("photo-1502877338535-766e1452684a")],
  "ar-نون-vs-امazon-السعودية": [U("photo-1563013544-824ae1b704d3"), U("photo-1472851294608-062f824d29cc")],
  "ar-الراجحي--vs-البنك-الاهلي": [U("photo-1556742049-0cfed4f6a45d"), U("photo-1560518883-ce09059eeffa")],
  "ar-السعودية-إمارات-الاستثمار": [U("photo-1611974789855-9c2a0a7236a3"), U("photo-1486406146926-c627a92ad1ab")],
  "ar-آيفون-بلاي-ستيشن-مقارنة": [U("photo-1606144042614-b2417e99c4e3"), U("photo-1552820728-8b83bb6b773f")],
  "ar-stc-vs-zain-خدمات-الاتصالات": [U("photo-1511707171634-5f897ff02aa9"), U("photo-1557597774-9d273605dfa9")],
  "ar-chatgpt-vs-claude-مساعد-ذكي": [U("photo-1677442136019-21780ecad995"), U("photo-1620712943543-bcc4688e7485")],
  "ar-tesla-model-y-vs-byd-seal-الخليج": [U("photo-1560958089-b8a1929cea89"), U("photo-1617704548623-340376564e68")],
  "ar-iphone-15-vs-samsung-s24-المقارنة": [U("photo-1592750475338-74b7b21085ab"), U("photo-1610945265064-0e34e5519bbf")],

  // ── English comparisons ───────────────────────────────
  "macbook-pro-m3-max-vs-dell-xps-15-2024": [U("photo-1517336714731-489689fd1ca8"), U("photo-1517430816045-df4b7de11d1d")],
  "tesla-model-3-vs-bmw-i4-ev-sedan-2024": [U("photo-1560958089-b8a1929cea89"), U("photo-1555215695-3004980ad54e")],
  "react-vs-nextjs-vs-remix-web-framework-2024": [U("photo-1461749280684-dccba630e2f6"), U("photo-1555066931-4365d14bab8c")],
  "iphone-15-pro-max-vs-samsung-galaxy-s24-ultra": [U("photo-1592750475338-74b7b21085ab"), U("photo-1610945265064-0e34e5519bbf")],
  "chatgpt-plus-vs-claude-pro-ai-assistant": [U("photo-1677442136019-21780ecad995"), U("photo-1620712943543-bcc4688e7485")],
  "sony-wh1000xm5-vs-bose-qc-ultra-headphones": [U("photo-1484704849700-f032a568e944"), U("photo-1618366712010-f4ae9c647dcb")],
  "ipad-pro-m4-vs-samsung-galaxy-tab-s9-ultra": [U("photo-1544244015-0df4b3ffc6b0"), U("photo-1585790050230-5dd28404ccb9")],
  "lg-c4-oled-vs-samsung-s95d-qd-oled-tv-2024": [U("photo-1593359677879-a4bb92f829d1"), U("photo-1593784991095-a205069470b6")],
  "netflix-vs-disney-plus-streaming-2024": [U("photo-1489599849927-2ee91cede3ba"), U("photo-1478720568477-152d9b164e26")],
  "air-fryer-vs-convection-oven-which-is-better": [U("photo-1547592180-85f173990554"), U("photo-1556910103-1c02745aae4d")],
  "apple-watch-ultra-2-vs-samsung-galaxy-watch-6-classic": [U("photo-1546868871-7041f2a55e12"), U("photo-1523275335684-37898b6baf30")],
  "dyson-v15-detect-vs-irobot-roomba-j7-plus": [U("photo-1558317374-067fb5f30001"), U("photo-1585123334904-845d60e97b29")],
  "google-pixel-9-pro-vs-iphone-15-pro": [U("photo-1598327105666-5b89351aff97"), U("photo-1592750475338-74b7b21085ab")],
  "sonos-era-300-vs-apple-homepod-2nd-gen": [U("photo-1545454675-3531b543be5d"), U("photo-1608043152269-423dbba4e7e1")],
  "nikon-z8-vs-sony-a7-iv-vs-canon-r6-ii": [U("photo-1502920917128-1aa500764cbd"), U("photo-1516035069371-29a1b244cc32")],

  // ── Spanish comparisons ───────────────────────────────
  "es-starbucks-vs-cafe-de-origen": [U("photo-1509042239860-f550ce710b93"), U("photo-1495474472287-4d71bcdd2085")],
  "es-bbva-vs-santander-mexico": [U("photo-1556742049-0cfed4f6a45d"), U("photo-1560518883-ce09059eeffa")],
  "es-rappi-vs-uber-eats-mexico": [U("photo-1504674900247-0877df9cc836"), U("photo-1565299624946-b28f40a0ae38")],
  "es-claro-vs-movistar-colombia": [U("photo-1511707171634-5f897ff02aa9"), U("photo-1557597774-9d273605dfa9")],
  "es-disney-plus-vs-hbo-max-latam": [U("photo-1489599849927-2ee91cede3ba"), U("photo-1478720568477-152d9b164e26")],
  "es-playstation-5-vs-xbox-series-x-latam": [U("photo-1606144042614-b2417e99c4e3"), U("photo-1552820728-8b83bb6b773f")],
  "es-cafe-colombiano-vs-brasileño": [U("photo-1495474472287-4d71bcdd2085"), U("photo-1509042239860-f550ce710b93")],
  "es-futbol-mexicano-vs-argentino-2025": [U("photo-1574629810360-7efbbe195018"), U("photo-1522778119026-d647f0596c20")],
  "es-mercadolibre-vs-amazon-mexico": [U("photo-1563013544-824ae1b704d3"), U("photo-1472851294608-062f824d29cc")],
  "es-tesla-model-y-vs-byd-seal-mexico": [U("photo-1560958089-b8a1929cea89"), U("photo-1617704548623-340376564e68")],
  "es-nubank-vs-mercado-pago-banca-digital": [U("photo-1563013544-824ae1b704d3"), U("photo-1556742049-0cfed4f6a45d")],
};

async function main() {
  await connectScript("update-entity-images");
  console.log("Connected to MongoDB\n");

  const db = mongoose.connection.db!;
  const collection = db.collection("articles");

  let updated = 0;
  let matched = 0;

  for (const [slug, [imgA, imgB]] of Object.entries(ENTITY_IMAGE_MAP)) {
    const result = await collection.updateMany(
      { slug, content_type: "comparison" },
      {
        $set: {
          "entity_A.image": imgA,
          "entity_B.image": imgB,
        },
      }
    );
    matched += result.matchedCount;
    updated += result.modifiedCount;
    console.log(`${result.modifiedCount > 0 ? "✅" : "➖"} ${slug} (modified ${result.modifiedCount})`);
  }

  console.log(`\nMatched ${matched} documents, updated ${updated} across ${Object.keys(ENTITY_IMAGE_MAP).length} slugs.`);

  await mongoose.disconnect();
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
