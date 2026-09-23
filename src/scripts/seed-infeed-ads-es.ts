#!/usr/bin/env tsx
/**
 * Seed all in-feed native ad positions (Spanish locale) that are not yet configured.
 *
 * Usage:
 *   npx tsx scripts/seed-infeed-ads-es.ts
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

// ── Position → native content mapping (Spanish) ─────────────────────────────
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
      title: "10 Auriculares Inalámbricos Mejores para Cada Presupuesto en 2026",
      excerpt: "Probamos más de 30 pares para encontrar los que realmente valen tu dinero.",
      image: img(251),
      sponsorLabel: "Patrocinado",
      sponsorName: "AudioTech",
      clickThroughUrl: "https://example.com/earbuds",
      category: "Ofertas",
      categoryColor: "#F59E0B",
      readTime: "5 min",
      author: "María García",
      cardStyle: "news-grid",
    },
  },
  // ── in-feed-2: Main grid row 2 (news-grid) ──
  {
    position: "in-feed-2",
    pageType: "homepage",
    name: "In-Feed 2 — Main Grid Row 2",
    nativeContent: {
      title: "Por Qué Todos Están Cambiando a Escritorios de Pie Este Año",
      excerpt: "Los beneficios para la salud son reales — y las configuraciones nunca han sido tan accesibles.",
      image: img(180),
      sponsorLabel: "Patrocinado",
      sponsorName: "ErgoWork",
      clickThroughUrl: "https://example.com/desks",
      category: "Estilo de vida",
      categoryColor: "#10B981",
      readTime: "4 min",
      author: "Carlos López",
      cardStyle: "news-grid",
    },
  },
  // ── in-feed-3: Featured Carousel (carousel) ──
  {
    position: "in-feed-3",
    pageType: "homepage",
    name: "In-Feed 3 — Featured Carousel",
    nativeContent: {
      title: "La Configuración de Hogar Inteligente Que Nos Ahorró $400 en Facturas de Energía",
      excerpt: "Una guía completa para automatizar tu hogar y maximizar tus ahorros.",
      image: img(119),
      sponsorLabel: "Patrocinado",
      sponsorName: "SmartLiving",
      clickThroughUrl: "https://example.com/smart-home",
      category: "Tecnología",
      categoryColor: "#6366F1",
      readTime: "6 min",
      author: "Ana Martínez",
      cardStyle: "carousel",
    },
  },
  // ── in-feed-4: Hero Slider (hero-side, center) ──
  {
    position: "in-feed-4",
    pageType: "homepage",
    name: "In-Feed 4 — Hero Slider",
    nativeContent: {
      title: "Reseña del MacBook Air M4: La Laptop Que la Mayoría Debería Comprar",
      excerpt: "Lo último de Apple ofrece un rendimiento increíble a un precio que tiene sentido.",
      image: img(1),
      sponsorLabel: "Patrocinado",
      sponsorName: "TechReview",
      clickThroughUrl: "https://example.com/macbook",
      category: "Reseñas",
      categoryColor: "#EF4444",
      readTime: "8 min",
      author: "Pedro Sánchez",
      cardStyle: "hero-side",
    },
  },
  // ── in-feed-5: Top Stories Sidebar (sidebar-list) ──
  {
    position: "in-feed-5",
    pageType: "homepage",
    name: "In-Feed 5 — Top Stories Sidebar",
    nativeContent: {
      title: "Cómo Este Truco de Tarjeta de Crédito Ahorró Miles a los Viajeros",
      excerpt: "Los expertos en puntos revelan la estrategia que las aerolíneas no quieren que sepas.",
      image: img(60),
      sponsorLabel: "Patrocinado",
      sponsorName: "TravelSmart",
      clickThroughUrl: "https://example.com/travel",
      category: "Finanzas",
      categoryColor: "#3B82F6",
      readTime: "3 min",
      author: "Laura Rodríguez",
      cardStyle: "sidebar-list",
    },
  },
  // ── in-feed-6: Most Viewed Sidebar (most-viewed) ──
  {
    position: "in-feed-6",
    pageType: "homepage",
    name: "In-Feed 6 — Most Viewed Sidebar",
    nativeContent: {
      title: "La Proteína en Polvo Que Realmente Sabe Bien",
      excerpt: "Clasificamos las 15 mejores según sabor, facilidad de mezcla y valor nutricional.",
      image: img(292),
      sponsorLabel: "Patrocinado",
      sponsorName: "FitNutrition",
      clickThroughUrl: "https://example.com/protein",
      category: "Salud",
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
      title: "Herramientas de IA Que Están Reemplazando los Empleos de Desarrolladores Junior",
      excerpt: "Lo que la industria no te dice sobre la revolución de la codificación con IA.",
      image: img(366),
      sponsorLabel: "Patrocinado",
      sponsorName: "DevInsider",
      clickThroughUrl: "https://example.com/ai-jobs",
      category: "Tecnología",
      categoryColor: "#8B5CF6",
      readTime: "7 min",
      author: "Sofía Hernández",
      cardStyle: "sidebar-list",
    },
  },
  // ── in-feed-8: Tech & Innovation Sidebar (sidebar-list) ──
  {
    position: "in-feed-8",
    pageType: "homepage",
    name: "In-Feed 8 — Tech & Innovation Sidebar",
    nativeContent: {
      title: "Los Paneles Solares Ahora Son Más Baratos Que Nunca — Estos Son los Motivos",
      excerpt: "Los avances en fabricación están impulsando los precios a mínimos históricos.",
      image: img(325),
      sponsorLabel: "Patrocinado",
      sponsorName: "GreenTech",
      clickThroughUrl: "https://example.com/solar",
      category: "Tecnología Verde",
      categoryColor: "#22C55E",
      readTime: "5 min",
      author: "Andrés Morales",
      cardStyle: "sidebar-list",
    },
  },
  // ── in-feed-9: Editor's Picks Sidebar (sidebar-list) ──
  {
    position: "in-feed-9",
    pageType: "homepage",
    name: "In-Feed 9 — Editor's Picks Sidebar",
    nativeContent: {
      title: "El Armario Minimalista Que Simplifica Tus Mañanas",
      excerpt: "30 prendas, combinaciones infinitas — los armarios cápsula realmente funcionan.",
      image: img(399),
      sponsorLabel: "Patrocinado",
      sponsorName: "StyleCo",
      clickThroughUrl: "https://example.com/wardrobe",
      category: "Moda",
      categoryColor: "#F97316",
      readTime: "3 min",
      author: "Valentina Rojas",
      cardStyle: "sidebar-list",
    },
  },
  // ── in-feed-10: Latest Articles Center (latest-articles) ──
  {
    position: "in-feed-10",
    pageType: "homepage",
    name: "In-Feed 10 — Latest Articles Center",
    nativeContent: {
      title: "Por Qué los Servicios de Kits de Comida Realmente Ahorran Dinero a las Familias",
      excerpt: "Comparamos los costos del supermercado con los kits de comida para una familia de cuatro durante 3 meses.",
      image: img(429),
      sponsorLabel: "Patrocinado",
      sponsorName: "FreshMeals",
      clickThroughUrl: "https://example.com/meals",
      category: "Gastronomía",
      categoryColor: "#EF4444",
      readTime: "5 min",
      author: "Carlos Méndez",
      cardStyle: "latest-articles",
    },
  },
  // ── in-feed-11: Latest Reviews Sidebar (review-list) ──
  {
    position: "in-feed-11",
    pageType: "homepage",
    name: "In-Feed 11 — Latest Reviews Sidebar",
    nativeContent: {
      title: "Reseña del Dyson V15: ¿Vale la Pena el Aspiradora?",
      excerpt: "Después de 6 meses de uso diario, este es nuestro veredicto honesto.",
      image: img(440),
      sponsorLabel: "Patrocinado",
      sponsorName: "HomeGadgets",
      clickThroughUrl: "https://example.com/dyson",
      category: "Reseñas",
      categoryColor: "#EF4444",
      readTime: "6 min",
      author: "Alejandro Vega",
      cardStyle: "review-list",
    },
  },
  // ── in-feed-12: Featured Carousel Inline (carousel) ──
  {
    position: "in-feed-12",
    pageType: "homepage",
    name: "In-Feed 12 — Featured Carousel Inline",
    nativeContent: {
      title: "Los Auriculares Con Cancelación de Ruido Que Transformaron Mi Trayecto",
      excerpt: "El Bose QuietComfort Ultra ofrece silencio donde antes había caos.",
      image: img(119),
      sponsorLabel: "Patrocinado",
      sponsorName: "AudioPro",
      clickThroughUrl: "https://example.com/headphones",
      category: "Audio",
      categoryColor: "#6366F1",
      readTime: "4 min",
      author: "Camila Torres",
      cardStyle: "carousel",
    },
  },
  // ── in-feed-13: Hero Slider Right Side (hero-side) ──
  {
    position: "in-feed-13",
    pageType: "homepage",
    name: "In-Feed 13 — Hero Right Side",
    nativeContent: {
      title: "Este Gadget de $30 Corrigió Mi Mala Postura Permanentemente",
      excerpt: "Los fisioterapeutas lo están recomendando a miles de pacientes.",
      image: img(164),
      sponsorLabel: "Patrocinado",
      sponsorName: "PosturePro",
      clickThroughUrl: "https://example.com/posture",
      category: "Salud",
      categoryColor: "#EC4899",
      readTime: "3 min",
      author: "Dr. Felipe Santos",
      cardStyle: "hero-side",
    },
  },
  // ── in-feed-14: Hero Slider Center (hero-side) ──
  {
    position: "in-feed-14",
    pageType: "homepage",
    name: "In-Feed 14 — Hero Center Slider",
    nativeContent: {
      title: "Samsung Galaxy S26 Ultra: Todo Lo Que Sabemos Hasta Ahora",
      excerpt: "Las especificaciones filtradas revelan un sistema de cámara que podría desbancar al iPhone.",
      image: img(160),
      sponsorLabel: "Patrocinado",
      sponsorName: "TechRadar",
      clickThroughUrl: "https://example.com/galaxy",
      category: "Tecnología",
      categoryColor: "#6366F1",
      readTime: "5 min",
      author: "Isabella Fernández",
      cardStyle: "hero-side",
    },
  },
  // ── in-feed-15: Hero Slider Left Side (hero-side) ──
  {
    position: "in-feed-15",
    pageType: "homepage",
    name: "In-Feed 15 — Hero Left Side",
    nativeContent: {
      title: "El VPN Que Realmente Funciona Con Netflix en 2026",
      excerpt: "Probamos 20 VPNs y solo 3 desbloquearon todas las bibliotecas de streaming.",
      image: img(475),
      sponsorLabel: "Patrocinado",
      sponsorName: "StreamGuard",
      clickThroughUrl: "https://example.com/vpn",
      category: "Tecnología",
      categoryColor: "#6366F1",
      readTime: "4 min",
      author: "Juan Pablo Ramírez",
      cardStyle: "hero-side",
    },
  },
  // ── in-feed-x: Repeating in-feed ad (news-grid, homepage) ──
  {
    position: "in-feed-x",
    pageType: "homepage",
    name: "In-Feed X — Repeating Native (Homepage)",
    nativeContent: {
      title: "El Almohada de Espuma de Memoria Que Realmente Te Ayuda a Dormir",
      excerpt: "Más de 12,000 reseñas de 5 estrellas no pueden estar equivocadas.",
      image: img(447),
      sponsorLabel: "Patrocinado",
      sponsorName: "SleepWell",
      clickThroughUrl: "https://example.com/pillow",
      category: "Hogar",
      categoryColor: "#14B8A6",
      readTime: "3 min",
      author: "Elena Castillo",
      cardStyle: "news-grid",
    },
  },
  // ── in-feed-x: Repeating in-feed ad (news-grid, category) ──
  {
    position: "in-feed-x",
    pageType: "category",
    name: "In-Feed X — Repeating Native (Category)",
    nativeContent: {
      title: "Este Gadget de Cocina de $15 Se Viralizó en TikTok",
      excerpt: "El picador de ajo que se agotó 3 veces este año.",
      image: img(425),
      sponsorLabel: "Patrocinado",
      sponsorName: "KitchenHacks",
      clickThroughUrl: "https://example.com/gadget",
      category: "Cocina",
      categoryColor: "#F59E0B",
      readTime: "2 min",
      author: "Roberto Díaz",
      cardStyle: "news-grid",
    },
  },
];

async function connectToDB() {
  const uri = forceDbUri(process.env.MONGO_URI);
  console.log(`[seed-infeed-es] connecting to: ${DB_NAME}`);
  await mongoose.connect(uri, { bufferCommands: false });
  const dbName = mongoose.connection.db?.databaseName || "unknown";
  if (dbName !== DB_NAME) {
    throw new Error(`Connected to wrong database: ${dbName}`);
  }
  console.log(`[seed-infeed-es] connected to: ${dbName}`);
}

async function main() {
  await connectToDB();

  // Find which positions already have native_feed ads for Spanish locale
  const existing = await AdSnippet.find({
    pageType: { $in: ["homepage", "category"] },
    templateType: "native_feed",
    locale: "es",
  }).lean();

  const existingPositions = new Set(existing.map((ad: any) => ad.position));
  console.log(`\n[seed-infeed-es] found ${existing.length} existing native_feed ads`);
  console.log(`[seed-infeed-es] configured positions: ${[...existingPositions].join(", ") || "(none)"}`);

  let created = 0;
  let skipped = 0;

  for (const adDef of ADS) {
    if (existingPositions.has(adDef.position)) {
      console.log(`  ⏭  ${adDef.position} — already configured, skipping`);
      skipped++;
      continue;
    }

    await (AdSnippet as any).create({
      name: `[ES] ${adDef.name}`,
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
      locale: "es",
    });

    console.log(`  ✅ ${adDef.position} — created "${adDef.nativeContent.title.slice(0, 50)}..."`);
    created++;
  }

  console.log(`\n[seed-infeed-es] done: ${created} created, ${skipped} skipped`);

  // Show final state
  const finalCount = await AdSnippet.countDocuments({ pageType: { $in: ["homepage", "category"] }, templateType: "native_feed", locale: "es" });
  console.log(`[seed-infeed-es] total homepage native_feed ads: ${finalCount}`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("[seed-infeed-es] fatal error:", err);
  process.exit(1);
});
