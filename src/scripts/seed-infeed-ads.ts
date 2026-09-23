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

const ADS: AdDefinition[] = [
  // ── in-feed-1: Main grid row 1 (news-grid) ──
  {
    position: "in-feed-1",
    pageType: "homepage",
    name: "In-Feed 1 — Main Grid Row 1",
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
      cardStyle: "news-grid",
    },
  },
  // ── in-feed-2: Main grid row 2 (news-grid) ──
  {
    position: "in-feed-2",
    pageType: "homepage",
    name: "In-Feed 2 — Main Grid Row 2",
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
      cardStyle: "news-grid",
    },
  },
  // ── in-feed-3: Featured Carousel (carousel) ──
  {
    position: "in-feed-3",
    pageType: "homepage",
    name: "In-Feed 3 — Featured Carousel",
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
      cardStyle: "carousel",
    },
  },
  // ── in-feed-4: Hero Slider (hero-side, center) ──
  {
    position: "in-feed-4",
    pageType: "homepage",
    name: "In-Feed 4 — Hero Slider",
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
      cardStyle: "hero-side",
    },
  },
  // ── in-feed-5: Top Stories Sidebar (sidebar-list) ──
  {
    position: "in-feed-5",
    pageType: "homepage",
    name: "In-Feed 5 — Top Stories Sidebar",
    nativeContent: {
      title: "How This Credit Card Hack Saved Travelers Thousands",
      excerpt: "Points experts reveal the strategy airlines don't want you to know.",
      image: img(60),
      sponsorLabel: "Sponsored",
      sponsorName: "TravelSmart",
      clickThroughUrl: "https://example.com/travel",
      category: "Finance",
      categoryColor: "#3B82F6",
      readTime: "3 min",
      author: "Rachel Kim",
      cardStyle: "sidebar-list",
    },
  },
  // ── in-feed-6: Most Viewed Sidebar (most-viewed) ──
  {
    position: "in-feed-6",
    pageType: "homepage",
    name: "In-Feed 6 — Most Viewed Sidebar",
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
      cardStyle: "most-viewed",
    },
  },
  // ── in-feed-7: Popular News Sidebar (sidebar-list) ──
  {
    position: "in-feed-7",
    pageType: "homepage",
    name: "In-Feed 7 — Popular News Sidebar",
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
      cardStyle: "sidebar-list",
    },
  },
  // ── in-feed-8: Tech & Innovation Sidebar (sidebar-list) ──
  {
    position: "in-feed-8",
    pageType: "homepage",
    name: "In-Feed 8 — Tech & Innovation Sidebar",
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
      cardStyle: "sidebar-list",
    },
  },
  // ── in-feed-9: Editor's Picks Sidebar (sidebar-list) ──
  {
    position: "in-feed-9",
    pageType: "homepage",
    name: "In-Feed 9 — Editor's Picks Sidebar",
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
      cardStyle: "sidebar-list",
    },
  },
  // ── in-feed-10: Latest Articles Center (latest-articles) ──
  {
    position: "in-feed-10",
    pageType: "homepage",
    name: "In-Feed 10 — Latest Articles Center",
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
      cardStyle: "latest-articles",
    },
  },
  // ── in-feed-11: Latest Reviews Sidebar (review-list) ──
  {
    position: "in-feed-11",
    pageType: "homepage",
    name: "In-Feed 11 — Latest Reviews Sidebar",
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
      cardStyle: "review-list",
    },
  },
  // ── in-feed-12: Featured Carousel Inline (carousel) ──
  {
    position: "in-feed-12",
    pageType: "homepage",
    name: "In-Feed 12 — Featured Carousel Inline",
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
      cardStyle: "carousel",
    },
  },
  // ── in-feed-13: Hero Slider Right Side (hero-side) ──
  {
    position: "in-feed-13",
    pageType: "homepage",
    name: "In-Feed 13 — Hero Right Side",
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
      cardStyle: "hero-side",
    },
  },
  // ── in-feed-14: Hero Slider Center (hero-side) ──
  {
    position: "in-feed-14",
    pageType: "homepage",
    name: "In-Feed 14 — Hero Center Slider",
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
      cardStyle: "hero-side",
    },
  },
  // ── in-feed-15: Hero Slider Left Side (hero-side) ──
  {
    position: "in-feed-15",
    pageType: "homepage",
    name: "In-Feed 15 — Hero Left Side",
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
      cardStyle: "hero-side",
    },
  },
  // ── in-feed-x: Repeating in-feed ad (news-grid, homepage) ──
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
      cardStyle: "news-grid",
    },
  },
  // ── in-feed-x: Repeating in-feed ad (news-grid, category) ──
  {
    position: "in-feed-x",
    pageType: "category",
    name: "In-Feed X — Repeating Native (Category)",
    nativeContent: {
      title: "This $15 Kitchen Gadget Went Viral on TikTok",
      excerpt: "The garlic chopper that sold out 3 times this year.",
      image: img(425),
      sponsorLabel: "Sponsored",
      sponsorName: "KitchenHacks",
      clickThroughUrl: "https://example.com/gadget",
      category: "Kitchen",
      categoryColor: "#F59E0B",
      readTime: "2 min",
      author: "Tom Chen",
      cardStyle: "news-grid",
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

  // Find which positions already have native_feed ads
  const existing = await AdSnippet.find({
    pageType: "homepage",
    templateType: "native_feed",
  }).lean();

  const existingPositions = new Set(existing.map((ad: any) => ad.position));
  console.log(`\n[seed-infeed] found ${existing.length} existing native_feed ads`);
  console.log(`[seed-infeed] configured positions: ${[...existingPositions].join(", ") || "(none)"}`);

  let created = 0;
  let skipped = 0;

  for (const adDef of ADS) {
    if (existingPositions.has(adDef.position)) {
      console.log(`  ⏭  ${adDef.position} — already configured, skipping`);
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
        layout: ["sidebar-list", "sidebar-featured", "review-list"].includes(adDef.nativeContent.cardStyle) ? "row" : "column",
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
  const finalCount = await AdSnippet.countDocuments({ pageType: "homepage", templateType: "native_feed" });
  console.log(`[seed-infeed] total homepage native_feed ads: ${finalCount}`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("[seed-infeed] fatal error:", err);
  process.exit(1);
});
