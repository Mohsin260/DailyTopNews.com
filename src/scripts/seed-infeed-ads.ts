#!/usr/bin/env tsx
/**
 * Seed all in-feed native ad positions that are not yet configured.
 *
 * Usage:
 *   npx tsx scripts/seed-infeed-ads.ts
 *
 * Connects to dailytopnews-db → adsnippets collection.
 * Only inserts ads for positions that don't already exist.
 * Safe to run multiple times (idempotent).
 */
import "dotenv/config";
import mongoose from "mongoose";
import { forceDbUri } from "./_db";

const DB_NAME = "dailytopnews-db";

const adSnippetSchema = new mongoose.Schema({}, { strict: false, collection: "adsnippets", timestamps: true });
const AdSnippet = mongoose.model("AdSnippet", adSnippetSchema);

// ── Position → native content mapping ──────────────────────────────────────
interface NativeContent {
  title: string;
  excerpt: string;
  image: string;
  sponsorLabel: string;
  sponsorName: string;
  clickThroughUrl: string;
  category: string;
  categoryColor: string;
  readTime: string;
  author: string;
  cardStyle: string;
}

interface AdDefinition {
  position: string;
  pageType: string;
  name: string;
  nativeContent: NativeContent;
}

// Use picsum.photos for placeholder images (realistic, random photos)
const img = (id: number, w = 800, h = 500) => `https://picsum.photos/id/${id}/${w}/${h}`;

// NewsPrk-matched card styles per homepage section position
const ADS: AdDefinition[] = [
  // ── in-feed-1: Trending carousel (post-type5) ──
  {
    position: "in-feed-1",
    pageType: "homepage",
    name: "In-Feed 1 — Trending Carousel",
    nativeContent: {
      title: "10 Best Wireless Earbuds for Every Budget in 2026",
      excerpt: "We tested over 30 pairs to find the ones actually worth your money.",
      image: img(251),
      sponsorLabel: "Sponsored",
      sponsorName: "AudioTech",
      clickThroughUrl: "https://example.com/earbuds",
      category: "Deals",
      categoryColor: "#F59E0B",
      readTime: "5 min",
      author: "Sarah Chen",
      cardStyle: "post-type5",
    },
  },
  // ── in-feed-2: Gallery related list (widgets-small-sep) ──
  {
    position: "in-feed-2",
    pageType: "homepage",
    name: "In-Feed 2 — Gallery Related List",
    nativeContent: {
      title: "Why Everyone Is Switching to Standing Desks This Year",
      excerpt: "The health benefits are real — and the setups have never been more affordable.",
      image: img(180),
      sponsorLabel: "Sponsored",
      sponsorName: "ErgoWork",
      clickThroughUrl: "https://example.com/desks",
      category: "Lifestyle",
      categoryColor: "#10B981",
      readTime: "4 min",
      author: "Mike Torres",
      cardStyle: "widgets-small-sep",
    },
  },
  // ── in-feed-3: Feature News overlay (post-type7) ──
  {
    position: "in-feed-3",
    pageType: "homepage",
    name: "In-Feed 3 — Feature News Overlay",
    nativeContent: {
      title: "The Smart Home Setup That Saved Us $400 on Energy Bills",
      excerpt: "A complete guide to automating your home for maximum savings.",
      image: img(119),
      sponsorLabel: "Sponsored",
      sponsorName: "SmartLiving",
      clickThroughUrl: "https://example.com/smart-home",
      category: "Tech",
      categoryColor: "#6366F1",
      readTime: "6 min",
      author: "Emily Park",
      cardStyle: "post-type7",
    },
  },
  // ── in-feed-4: Trending News thumb list (widgets-small) ──
  {
    position: "in-feed-4",
    pageType: "homepage",
    name: "In-Feed 4 — Trending News List",
    nativeContent: {
      title: "MacBook Air M4 Review: The Laptop Most People Should Buy",
      excerpt: "Apple's latest delivers incredible performance at a price that makes sense.",
      image: img(1),
      sponsorLabel: "Sponsored",
      sponsorName: "TechReview",
      clickThroughUrl: "https://example.com/macbook",
      category: "Reviews",
      categoryColor: "#EF4444",
      readTime: "8 min",
      author: "James Liu",
      cardStyle: "widgets-small",
    },
  },
  // ── in-feed-5: Most Viewed (type8) ──
  {
    position: "in-feed-5",
    pageType: "homepage",
    name: "In-Feed 5 — Most Viewed Sidebar",
    nativeContent: {
      title: "How This Credit Card Hack Saved Travelers Thousands",
      excerpt: "Points experts reveal the strategy airlines don't want you to know.",
      image: img(60),
      sponsorLabel: "Sponsored",
      sponsorName: "TravelSmart",
      clickThroughUrl: "https://example.com/travel",
      category: "Finance",
      categoryColor: "#3B82F6",
      readTime: "03",
      author: "Rachel Kim",
      cardStyle: "type8",
    },
  },
  // ── in-feed-6: Mix Area overlay (post-type9) ──
  {
    position: "in-feed-6",
    pageType: "homepage",
    name: "In-Feed 6 — Mix Area Overlay",
    nativeContent: {
      title: "The Protein Powder That Actually Tastes Good",
      excerpt: "We ranked the top 15 based on taste, mixability, and nutrition.",
      image: img(292),
      sponsorLabel: "Sponsored",
      sponsorName: "FitNutrition",
      clickThroughUrl: "https://example.com/protein",
      category: "Health",
      categoryColor: "#EC4899",
      readTime: "03",
      author: "David Okafor",
      cardStyle: "post-type9",
    },
  },
  // ── in-feed-7: Entertainment feature grid (post-type3) ──
  {
    position: "in-feed-7",
    pageType: "homepage",
    name: "In-Feed 7 — Entertainment Grid",
    nativeContent: {
      title: "AI Tools That Are Replacing Junior Developer Jobs",
      excerpt: "What the industry isn't telling you about the AI coding revolution.",
      image: img(366),
      sponsorLabel: "Sponsored",
      sponsorName: "DevInsider",
      clickThroughUrl: "https://example.com/ai-jobs",
      category: "Technology",
      categoryColor: "#8B5CF6",
      readTime: "7 min",
      author: "Priya Sharma",
      cardStyle: "post-type3",
    },
  },
  // ── in-feed-8: Sports list (widgets-small) ──
  {
    position: "in-feed-8",
    pageType: "homepage",
    name: "In-Feed 8 — Sports Sidebar List",
    nativeContent: {
      title: "Solar Panels Are Now Cheaper Than Ever — Here's Why",
      excerpt: "New manufacturing breakthroughs are driving prices to historic lows.",
      image: img(325),
      sponsorLabel: "Sponsored",
      sponsorName: "GreenTech",
      clickThroughUrl: "https://example.com/solar",
      category: "Green Tech",
      categoryColor: "#22C55E",
      readTime: "5 min",
      author: "Anna Petrov",
      cardStyle: "widgets-small",
    },
  },
  // ── in-feed-9: Business split row (post-type12) ──
  {
    position: "in-feed-9",
    pageType: "homepage",
    name: "In-Feed 9 — Business News Row",
    nativeContent: {
      title: "The Minimalist Wardrobe That Simplifies Your Morning",
      excerpt: "30 pieces, endless combinations — capsule wardrobes actually work.",
      image: img(399),
      sponsorLabel: "Sponsored",
      sponsorName: "StyleCo",
      clickThroughUrl: "https://example.com/wardrobe",
      category: "Fashion",
      categoryColor: "#F97316",
      readTime: "3 min",
      author: "Lisa Monroe",
      cardStyle: "post-type12",
    },
  },
  // ── in-feed-10: Most Shared (widgets-type4) ──
  {
    position: "in-feed-10",
    pageType: "homepage",
    name: "In-Feed 10 — Most Share Widget",
    nativeContent: {
      title: "Why Meal Kit Services Are Actually Saving Families Money",
      excerpt: "We compared grocery costs vs. meal kits for a family of four over 3 months.",
      image: img(429),
      sponsorLabel: "Sponsored",
      sponsorName: "FreshMeals",
      clickThroughUrl: "https://example.com/meals",
      category: "Food",
      categoryColor: "#EF4444",
      readTime: "5 min",
      author: "Carlos Mendez",
      cardStyle: "widgets-type4",
    },
  },
  // ── in-feed-11: Popular Posts numbered (type10) ──
  {
    position: "in-feed-11",
    pageType: "homepage",
    name: "In-Feed 11 — Popular Posts Numbered",
    nativeContent: {
      title: "Dyson V15 Review: Is the Vacuum Worth the Hype?",
      excerpt: "After 6 months of daily use, here's our honest verdict.",
      image: img(440),
      sponsorLabel: "Sponsored",
      sponsorName: "HomeGadgets",
      clickThroughUrl: "https://example.com/dyson",
      category: "Reviews",
      categoryColor: "#EF4444",
      readTime: "6 min",
      author: "Tom Bradley",
      cardStyle: "type10",
    },
  },
  // ── in-feed-12: Video featured (post-type11) ──
  {
    position: "in-feed-12",
    pageType: "homepage",
    name: "In-Feed 12 — Video Featured",
    nativeContent: {
      title: "The Noise-Canceling Headphones That Changed My Commute",
      excerpt: "Bose QuietComfort Ultra delivers silence where there was chaos.",
      image: img(119),
      sponsorLabel: "Sponsored",
      sponsorName: "AudioPro",
      clickThroughUrl: "https://example.com/headphones",
      category: "Audio",
      categoryColor: "#6366F1",
      readTime: "4 min",
      author: "Nina Walsh",
      cardStyle: "post-type11",
    },
  },
  // ── in-feed-13: Sports feature (post-type3) ──
  {
    position: "in-feed-13",
    pageType: "homepage",
    name: "In-Feed 13 — Sports Feature Card",
    nativeContent: {
      title: "This $30 Gadget Fixed My Bad Posture Permanently",
      excerpt: "Physical therapists are recommending it to thousands of patients.",
      image: img(164),
      sponsorLabel: "Sponsored",
      sponsorName: "PosturePro",
      clickThroughUrl: "https://example.com/posture",
      category: "Health",
      categoryColor: "#EC4899",
      readTime: "3 min",
      author: "Dr. Kim Santos",
      cardStyle: "post-type3",
    },
  },
  // ── in-feed-14: Gallery hero overlay (post-type6) ──
  {
    position: "in-feed-14",
    pageType: "homepage",
    name: "In-Feed 14 — Gallery Hero Overlay",
    nativeContent: {
      title: "Samsung Galaxy S26 Ultra: Everything We Know So Far",
      excerpt: "Leaked specs reveal a camera system that could dethrone the iPhone.",
      image: img(160),
      sponsorLabel: "Sponsored",
      sponsorName: "TechRadar",
      clickThroughUrl: "https://example.com/galaxy",
      category: "Tech",
      categoryColor: "#6366F1",
      readTime: "5 min",
      author: "Alex Nguyen",
      cardStyle: "post-type6",
    },
  },
  // ── in-feed-15: Trending carousel (post-type3) ──
  {
    position: "in-feed-15",
    pageType: "homepage",
    name: "In-Feed 15 — Trending Carousel Slide",
    nativeContent: {
      title: "The VPN That Actually Works With Netflix in 2026",
      excerpt: "We tested 20 VPNs and only 3 unblocked every streaming library.",
      image: img(475),
      sponsorLabel: "Sponsored",
      sponsorName: "StreamGuard",
      clickThroughUrl: "https://example.com/vpn",
      category: "Tech",
      categoryColor: "#6366F1",
      readTime: "4 min",
      author: "Jordan Blake",
      cardStyle: "post-type3",
    },
  },
  // ── in-feed-x: Repeating (post-type3, homepage) ──
  {
    position: "in-feed-x",
    pageType: "homepage",
    name: "In-Feed X — Repeating Native (Homepage)",
    nativeContent: {
      title: "The Memory Foam Pillow That Actually Helps You Sleep",
      excerpt: "Over 12,000 five-star reviews can't be wrong.",
      image: img(447),
      sponsorLabel: "Sponsored",
      sponsorName: "SleepWell",
      clickThroughUrl: "https://example.com/pillow",
      category: "Home",
      categoryColor: "#14B8A6",
      readTime: "3 min",
      author: "Karen Mitchell",
      cardStyle: "post-type3",
    },
  },
  // ── sidebar-infeed: homepage sidebar (type8, below Most Viewed) ──
  {
    position: "sidebar-infeed",
    pageType: "homepage",
    name: "Sidebar In-Feed — Homepage",
    nativeContent: {
      title: "The Desk Lamp That Eliminated My Eye Strain",
      excerpt: "A lighting designer shares the one upgrade every home office needs.",
      image: img(30),
      sponsorLabel: "Sponsored",
      sponsorName: "BrightDesk",
      clickThroughUrl: "https://example.com/lamp",
      category: "Home",
      categoryColor: "#F59E0B",
      readTime: "2 min",
      author: "Nina Cole",
      cardStyle: "type8",
    },
  },
  // ── article-native-1: in-content after body ──
  {
    position: "article-native-1",
    pageType: "article",
    name: "Article Native 1 — After Body",
    nativeContent: {
      title: "The Standing Desk Mat Reviewers Can't Stop Buying",
      excerpt: "Anti-fatigue support without the premium price tag.",
      image: img(100),
      sponsorLabel: "Sponsored",
      sponsorName: "ComfortStep",
      clickThroughUrl: "https://example.com/mat",
      category: "Home Office",
      categoryColor: "#3B82F6",
      readTime: "4 min",
      author: "Elena Ruiz",
      cardStyle: "post-type3",
    },
  },
  // ── article-native-2: in-content mid article ──
  {
    position: "article-native-2",
    pageType: "article",
    name: "Article Native 2 — Mid Content",
    nativeContent: {
      title: "How a $40 Monitor Riser Fixed My Neck Pain",
      excerpt: "Ergonomists agree: elevation is the easiest desk upgrade.",
      image: img(101),
      sponsorLabel: "Sponsored",
      sponsorName: "ErgoLift",
      clickThroughUrl: "https://example.com/riser",
      category: "Health",
      categoryColor: "#10B981",
      readTime: "3 min",
      author: "Mark Fields",
      cardStyle: "post-type3",
    },
  },
  // ── article-related: Latest Blog section ──
  {
    position: "article-related",
    pageType: "article",
    name: "Article Related — Latest Blog",
    nativeContent: {
      title: "The Only Backpack You Need for 2026 Travel",
      excerpt: "Carry-on legal, laptop friendly, and built to last a decade.",
      image: img(102),
      sponsorLabel: "Sponsored",
      sponsorName: "NomadGear",
      clickThroughUrl: "https://example.com/backpack",
      category: "Travel",
      categoryColor: "#8B5CF6",
      readTime: "5 min",
      author: "Sofia Lang",
      cardStyle: "post-type15",
    },
  },
  // ── sidebar-infeed: article sidebar after TabWidget (widgets-small-sep) ──
  {
    position: "sidebar-infeed",
    pageType: "article",
    name: "Sidebar In-Feed — Article",
    nativeContent: {
      title: "Quiet Mechanical Keyboards Worth the Upgrade",
      excerpt: "Hot-swappable switches without the office noise.",
      image: img(103),
      sponsorLabel: "Sponsored",
      sponsorName: "KeyForge",
      clickThroughUrl: "https://example.com/keyboard",
      category: "Tech",
      categoryColor: "#6366F1",
      readTime: "4 min",
      author: "Chris Park",
      cardStyle: "widgets-small-sep",
    },
  },
  // ── in-feed-x: article sidebar Trending News widget (post-type3) ──
  {
    position: "in-feed-x",
    pageType: "article",
    name: "Sidebar Trending — Article",
    nativeContent: {
      title: "Why Everyone Is Canceling Their Gym Membership",
      excerpt: "Home workout tech has finally caught up — and it's cheaper.",
      image: img(80),
      sponsorLabel: "Sponsored",
      sponsorName: "HomeFit",
      clickThroughUrl: "https://example.com/homefit",
      category: "Fitness",
      categoryColor: "#22C55E",
      readTime: "4 min",
      author: "Maya Brooks",
      cardStyle: "post-type3",
    },
  },
];

async function connectToDB() {
  const uri = forceDbUri(process.env.MONGO_URI);
  console.log(`[seed-infeed] connecting to: ${DB_NAME}`);
  await mongoose.connect(uri, { bufferCommands: false });
  const dbName = mongoose.connection.db?.databaseName || "unknown";
  if (dbName !== DB_NAME) {
    throw new Error(`Connected to wrong database: ${dbName}`);
  }
  console.log(`[seed-infeed] connected to: ${dbName}`);
}

async function main() {
  await connectToDB();

  // Find which positions already have native_feed ads (any pageType)
  const existing = await AdSnippet.find({
    templateType: "native_feed",
  }).lean();

  const existingKeys = new Set(
    existing.map((ad: any) => `${ad.pageType}:${ad.position}`)
  );
  console.log(`\n[seed-infeed] found ${existing.length} existing native_feed ads`);

  let created = 0;
  let skipped = 0;

  for (const adDef of ADS) {
    const key = `${adDef.pageType}:${adDef.position}`;
    if (existingKeys.has(key)) {
      // Align cardStyle/layout with current section mapping if drifted
      const existingAd: any = existing.find(
        (ad: any) => ad.pageType === adDef.pageType && ad.position === adDef.position
      );
      const wanted = adDef.nativeContent.cardStyle;
      const currentStyle = existingAd?.nativeContent?.cardStyle;
      const wantedLayout = ["widgets-small", "widgets-small-sep", "type8", "type10", "widgets-type4", "post-type5", "post-type12"].includes(wanted)
        ? "row"
        : "column";
      if (existingAd && (currentStyle !== wanted || existingAd.nativeContent?.layout !== wantedLayout)) {
        await AdSnippet.updateOne(
          { _id: existingAd._id },
          {
            $set: {
              "nativeContent.cardStyle": wanted,
              "nativeContent.layout": wantedLayout,
            },
          }
        );
        console.log(`  🔄 ${adDef.position} (${adDef.pageType}) — cardStyle ${currentStyle || "(none)"} → ${wanted}`);
      } else {
        console.log(`  ⏭  ${adDef.position} (${adDef.pageType}) — already configured, skipping`);
      }
      skipped++;
      continue;
    }

    await (AdSnippet as any).create({
      name: adDef.name,
      label: "",
      type: "image",
      templateType: "native_feed",
      creativeType: "image",
      code: "",
      mediaUrl: "",
      url: "",
      vastTagUrl: "",
      clickThroughUrl: adDef.nativeContent.clickThroughUrl,
      fallbackMediaUrl: "",
      nativeContent: {
        title: adDef.nativeContent.title,
        excerpt: adDef.nativeContent.excerpt,
        image: adDef.nativeContent.image,
        sponsorLabel: adDef.nativeContent.sponsorLabel,
        sponsorName: adDef.nativeContent.sponsorName,
        sponsorLogo: "",
        clickThroughUrl: adDef.nativeContent.clickThroughUrl,
        category: adDef.nativeContent.category,
        categoryColor: adDef.nativeContent.categoryColor,
        readTime: adDef.nativeContent.readTime,
        author: adDef.nativeContent.author,
        layout: ["widgets-small", "widgets-small-sep", "type8", "type10", "widgets-type4", "post-type5", "post-type12"].includes(adDef.nativeContent.cardStyle) ? "row" : "column",
        cardStyle: adDef.nativeContent.cardStyle,
      },
      trackingPixels: { impression: "", click: "" },
      pageType: adDef.pageType,
      position: adDef.position,
      status: true,
      enabled: true,
      isArticleOverride: false,
      locale: "en",
    });

    console.log(`  ✅ ${adDef.position} — created "${adDef.nativeContent.title.slice(0, 50)}..."`);
    created++;
  }

  console.log(`\n[seed-infeed] done: ${created} created, ${skipped} skipped`);

  // Show final state
  const finalCount = await AdSnippet.countDocuments({ templateType: "native_feed" });
  console.log(`[seed-infeed] total native_feed ads: ${finalCount}`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("[seed-infeed] fatal error:", err);
  process.exit(1);
});
