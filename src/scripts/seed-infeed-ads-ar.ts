#!/usr/bin/env tsx
/**
 * Seed all in-feed native ad positions (Arabic locale) that are not yet configured.
 *
 * Usage:
 *   npx tsx scripts/seed-infeed-ads-ar.ts
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

// ── Position → native content mapping (Arabic) ──────────────────────────────
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
      title: "أفضل 10 سماعات لاسلكية لكل ميزانية في 2026",
      excerpt: "جرّبنا أكثر من 30 زوجاً لنجد التي تستحق فعلاً أموالك.",
      image: img(251),
      sponsorLabel: "ممول",
      sponsorName: "AudioTech",
      clickThroughUrl: "https://example.com/earbuds",
      category: "عروض",
      categoryColor: "#F59E0B",
      readTime: "5 دقائق",
      author: "سارة تشين",
      cardStyle: "news-grid",
    },
  },
  // ── in-feed-2: Main grid row 2 (news-grid) ──
  {
    position: "in-feed-2",
    pageType: "homepage",
    name: "In-Feed 2 — Main Grid Row 2",
    nativeContent: {
      title: "لماذا الجميع ينتقل إلى مكاتب الوقوف هذه السنة",
      excerpt: "الفوائد الصحية حقيقية — والتجهيزات لم تكن أسعارها منخفضة قط.",
      image: img(180),
      sponsorLabel: "ممول",
      sponsorName: "ErgoWork",
      clickThroughUrl: "https://example.com/desks",
      category: "نمط حياة",
      categoryColor: "#10B981",
      readTime: "4 دقائق",
      author: "محمد توريس",
      cardStyle: "news-grid",
    },
  },
  // ── in-feed-3: Featured Carousel (carousel) ──
  {
    position: "in-feed-3",
    pageType: "homepage",
    name: "In-Feed 3 — Featured Carousel",
    nativeContent: {
      title: "منظومة المنزل الذكي التي وفّرت لنا 400 دولار على فواتير الطاقة",
      excerpt: "دليل شامل لأتمتة منزلك لتحقيق أقصى توفير.",
      image: img(119),
      sponsorLabel: "ممول",
      sponsorName: "SmartLiving",
      clickThroughUrl: "https://example.com/smart-home",
      category: "تكنولوجيا",
      categoryColor: "#6366F1",
      readTime: "6 دقائق",
      author: "فاطمة بارك",
      cardStyle: "carousel",
    },
  },
  // ── in-feed-4: Hero Slider (hero-side, center) ──
  {
    position: "in-feed-4",
    pageType: "homepage",
    name: "In-Feed 4 — Hero Slider",
    nativeContent: {
      title: "مراجعة ماك بوك إير M4: الحاسوب الذي يجب على الجميع شراؤه",
      excerpt: "جهاز آبل الأخير يقدم أداءً مذهلاً بسعر منطقي.",
      image: img(1),
      sponsorLabel: "ممول",
      sponsorName: "TechReview",
      clickThroughUrl: "https://example.com/macbook",
      category: "مراجعات",
      categoryColor: "#EF4444",
      readTime: "8 دقائق",
      author: "جيمس ليو",
      cardStyle: "hero-side",
    },
  },
  // ── in-feed-5: Top Stories Sidebar (sidebar-list) ──
  {
    position: "in-feed-5",
    pageType: "homepage",
    name: "In-Feed 5 — Top Stories Sidebar",
    nativeContent: {
      title: "كيف وفّرت هذه الحيلة بطاقة الائتمان آلاف الدولارات للمسافرين",
      excerpt: "خبراء النقاط يكشفون الاستراتيجية التي لا تريد شركات الطيران معرفتك بها.",
      image: img(60),
      sponsorLabel: "ممول",
      sponsorName: "TravelSmart",
      clickThroughUrl: "https://example.com/travel",
      category: "مالية",
      categoryColor: "#3B82F6",
      readTime: "3 دقائق",
      author: "ريتشيل كيم",
      cardStyle: "sidebar-list",
    },
  },
  // ── in-feed-6: Most Viewed Sidebar (most-viewed) ──
  {
    position: "in-feed-6",
    pageType: "homepage",
    name: "In-Feed 6 — Most Viewed Sidebar",
    nativeContent: {
      title: "مسحوق البروتين الذي طعمه فعلاً لذيذ",
      excerpt: "صنّفنا أفضل 15 منتجاً بناءً على الطعم والذوبان والقيمة الغذائية.",
      image: img(292),
      sponsorLabel: "ممول",
      sponsorName: "FitNutrition",
      clickThroughUrl: "https://example.com/protein",
      category: "صحة",
      categoryColor: "#EC4899",
      readTime: "03",
      author: "ديفيد أوكافور",
      cardStyle: "most-viewed",
    },
  },
  // ── in-feed-7: Popular News Sidebar (sidebar-list) ──
  {
    position: "in-feed-7",
    pageType: "homepage",
    name: "In-Feed 7 — Popular News Sidebar",
    nativeContent: {
      title: "أدوات الذكاء الاصطناعي التي تستبدل وظائف المطورين المبتدئين",
      excerpt: "ما لا تخبرك به الصناعة عن ثورة البرمجة بالذكاء الاصطناعي.",
      image: img(366),
      sponsorLabel: "ممول",
      sponsorName: "DevInsider",
      clickThroughUrl: "https://example.com/ai-jobs",
      category: "تكنولوجيا",
      categoryColor: "#8B5CF6",
      readTime: "7 دقائق",
      author: "بريا شارما",
      cardStyle: "sidebar-list",
    },
  },
  // ── in-feed-8: Tech & Innovation Sidebar (sidebar-list) ──
  {
    position: "in-feed-8",
    pageType: "homepage",
    name: "In-Feed 8 — Tech & Innovation Sidebar",
    nativeContent: {
      title: "ألواح الطاقة الشمسية أصبحت أرخص من أي وقت مضى — وهذا السبب",
      excerpt: "اختراقات تصنيع جديدة تدفع الأسعار إلى مستويات تاريخية منخفضة.",
      image: img(325),
      sponsorLabel: "ممول",
      sponsorName: "GreenTech",
      clickThroughUrl: "https://example.com/solar",
      category: "تكنولوجيا خضراء",
      categoryColor: "#22C55E",
      readTime: "5 دقائق",
      author: "أنا بيتروف",
      cardStyle: "sidebar-list",
    },
  },
  // ── in-feed-9: Editor's Picks Sidebar (sidebar-list) ──
  {
    position: "in-feed-9",
    pageType: "homepage",
    name: "In-Feed 9 — Editor's Picks Sidebar",
    nativeContent: {
      title: "خزانة الملابس البسيطة التي تُبسّط صباحك",
      excerpt: "30 قطعة، تركيبات لا نهائية — خزائن الملابس المصغرة فعلاً تنجح.",
      image: img(399),
      sponsorLabel: "ممول",
      sponsorName: "StyleCo",
      clickThroughUrl: "https://example.com/wardrobe",
      category: "أزياء",
      categoryColor: "#F97316",
      readTime: "3 دقائق",
      author: "ليزا مونرو",
      cardStyle: "sidebar-list",
    },
  },
  // ── in-feed-10: Latest Articles Center (latest-articles) ──
  {
    position: "in-feed-10",
    pageType: "homepage",
    name: "In-Feed 10 — Latest Articles Center",
    nativeContent: {
      title: "لماذا خدمات وجبات الوجبات المجمعة توفّر فعلاً المال للعائلات",
      excerpt: "قارننا تكاليف البقالة مقابل وجبات الأطعمة المجمعة لعائلة من أربعة أفراد على مدى 3 أشهر.",
      image: img(429),
      sponsorLabel: "ممول",
      sponsorName: "FreshMeals",
      clickThroughUrl: "https://example.com/meals",
      category: "طعام",
      categoryColor: "#EF4444",
      readTime: "5 دقائق",
      author: "كارلوس مينديز",
      cardStyle: "latest-articles",
    },
  },
  // ── in-feed-11: Latest Reviews Sidebar (review-list) ──
  {
    position: "in-feed-11",
    pageType: "homepage",
    name: "In-Feed 11 — Latest Reviews Sidebar",
    nativeContent: {
      title: "مراجعة دايسون V15: هل يستحق المكنسة كل هذا الضجة؟",
      excerpt: "بعد 6 أشهر من الاستخدام اليومي، إليكم حكمنا الصريح.",
      image: img(440),
      sponsorLabel: "ممول",
      sponsorName: "HomeGadgets",
      clickThroughUrl: "https://example.com/dyson",
      category: "مراجعات",
      categoryColor: "#EF4444",
      readTime: "6 دقائق",
      author: "توم برادلي",
      cardStyle: "review-list",
    },
  },
  // ── in-feed-12: Featured Carousel Inline (carousel) ──
  {
    position: "in-feed-12",
    pageType: "homepage",
    name: "In-Feed 12 — Featured Carousel Inline",
    nativeContent: {
      title: "سماعات إلغاء الضوضاء التي غيّرت رحلتي اليومية",
      excerpt: "بوز كوايت كومفورت ألترا تقدم صمتاً تاماً حيث كانت الفوضى.",
      image: img(119),
      sponsorLabel: "ممول",
      sponsorName: "AudioPro",
      clickThroughUrl: "https://example.com/headphones",
      category: "صوتيات",
      categoryColor: "#6366F1",
      readTime: "4 دقائق",
      author: "نينا والش",
      cardStyle: "carousel",
    },
  },
  // ── in-feed-13: Hero Slider Right Side (hero-side) ──
  {
    position: "in-feed-13",
    pageType: "homepage",
    name: "In-Feed 13 — Hero Right Side",
    nativeContent: {
      title: "هذا الجهاز بـ 30 دولار أصلح وضعيته السيئة نهائياً",
      excerpt: "الأخصائيون العلاج الطبيعي يوصون به لآلاف المرضى.",
      image: img(164),
      sponsorLabel: "ممول",
      sponsorName: "PosturePro",
      clickThroughUrl: "https://example.com/posture",
      category: "صحة",
      categoryColor: "#EC4899",
      readTime: "3 دقائق",
      author: "د. كيم سانتوس",
      cardStyle: "hero-side",
    },
  },
  // ── in-feed-14: Hero Slider Center (hero-side) ──
  {
    position: "in-feed-14",
    pageType: "homepage",
    name: "In-Feed 14 — Hero Center Slider",
    nativeContent: {
      title: "سامسونج جالكسي S26 ألترا: كل ما نعرفه حتى الآن",
      excerpt: "المواصفات المتسربة تكشف عن نظام كاميرا قد يُطيح بالآيفون من عرشه.",
      image: img(160),
      sponsorLabel: "ممول",
      sponsorName: "TechRadar",
      clickThroughUrl: "https://example.com/galaxy",
      category: "تكنولوجيا",
      categoryColor: "#6366F1",
      readTime: "5 دقائق",
      author: "أليكس نجوين",
      cardStyle: "hero-side",
    },
  },
  // ── in-feed-15: Hero Slider Left Side (hero-side) ──
  {
    position: "in-feed-15",
    pageType: "homepage",
    name: "In-Feed 15 — Hero Left Side",
    nativeContent: {
      title: "الشبكة الافتراضية الخاصة التي تعمل فعلاً مع نتفلكس في 2026",
      excerpt: "جرّبنا 20 VPN فقط 3 منها فتحت كل مكتبات البث.",
      image: img(475),
      sponsorLabel: "ممول",
      sponsorName: "StreamGuard",
      clickThroughUrl: "https://example.com/vpn",
      category: "تكنولوجيا",
      categoryColor: "#6366F1",
      readTime: "4 دقائق",
      author: "جوردون بليك",
      cardStyle: "hero-side",
    },
  },
  // ── in-feed-x: Repeating in-feed ad (news-grid, homepage) ──
  {
    position: "in-feed-x",
    pageType: "homepage",
    name: "In-Feed X — Repeating Native (Homepage)",
    nativeContent: {
      title: "وسادة الرغوة المذكورة التي تساعدك فعلاً على النوم",
      excerpt: "أكثر من 12,000 تقييم بخمس نجوم لا يمكن أن يكون خاطئاً.",
      image: img(447),
      sponsorLabel: "ممول",
      sponsorName: "SleepWell",
      clickThroughUrl: "https://example.com/pillow",
      category: "منزل",
      categoryColor: "#14B8A6",
      readTime: "3 دقائق",
      author: "كارين ميتشل",
      cardStyle: "news-grid",
    },
  },
  // ── in-feed-x: Repeating in-feed ad (news-grid, category) ──
  {
    position: "in-feed-x",
    pageType: "category",
    name: "In-Feed X — Repeating Native (Category)",
    nativeContent: {
      title: "هذا جهاز المطبخ بـ 15 دولار انتشر على تيك توك",
      excerpt: "محرّك الثوم الذي نفد من المخزون 3 مرات هذا العام.",
      image: img(425),
      sponsorLabel: "ممول",
      sponsorName: "KitchenHacks",
      clickThroughUrl: "https://example.com/gadget",
      category: "مطبخ",
      categoryColor: "#F59E0B",
      readTime: "دقيقة",
      author: "توم تشين",
      cardStyle: "news-grid",
    },
  },
];

async function connectToDB() {
  const uri = forceDbUri(process.env.MONGO_URI);
  console.log(`[seed-infeed-ar] connecting to: ${DB_NAME}`);
  await mongoose.connect(uri, { bufferCommands: false });
  const dbName = mongoose.connection.db?.databaseName || "unknown";
  if (dbName !== DB_NAME) {
    throw new Error(`Connected to wrong database: ${dbName}`);
  }
  console.log(`[seed-infeed-ar] connected to: ${dbName}`);
}

async function main() {
  await connectToDB();

  // Find which positions already have native_feed ads for Arabic locale
  const existing = await AdSnippet.find({
    pageType: { $in: ["homepage", "category"] },
    templateType: "native_feed",
    locale: "ar",
  }).lean();

  const existingPositions = new Set(existing.map((ad: any) => ad.position));
  console.log(`\n[seed-infeed-ar] found ${existing.length} existing native_feed ads (ar)`);
  console.log(`[seed-infeed-ar] configured positions: ${[...existingPositions].join(", ") || "(none)"}`);

  let created = 0;
  let skipped = 0;

  for (const adDef of ADS) {
    if (existingPositions.has(adDef.position)) {
      console.log(`  ⏭  ${adDef.position} — already configured, skipping`);
      skipped++;
      continue;
    }

    await (AdSnippet as any).create({
      name: `[AR] ${adDef.name}`,
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
      locale: "ar",
    });

    console.log(`  ✅ ${adDef.position} — created "${adDef.nativeContent.title.slice(0, 50)}..."`);
    created++;
  }

  console.log(`\n[seed-infeed-ar] done: ${created} created, ${skipped} skipped`);

  // Show final state
  const finalCount = await AdSnippet.countDocuments({ pageType: { $in: ["homepage", "category"] }, templateType: "native_feed", locale: "ar" });
  console.log(`[seed-infeed-ar] total Arabic native_feed ads: ${finalCount}`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("[seed-infeed-ar] fatal error:", err);
  process.exit(1);
});
