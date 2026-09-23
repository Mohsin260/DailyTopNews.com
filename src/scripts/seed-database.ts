/**
 * Master seeder — seeds every collection in dailytopnews-db from src/data/*.json.
 *
 * Usage:
 *   npx tsx src/scripts/seed-database.ts
 *   npm run seed:database
 *
 * Idempotent: upserts by natural key. Always targets dailytopnews-db (hard-fails otherwise).
 * Resolves "$admin" / "$firstArticle" refs after users + articles are seeded.
 */
import "dotenv/config";
import mongoose, { Types } from "mongoose";
import { connectScript } from "./_db";
import { verifyPassword } from "@/lib/auth/password";

import { User } from "@/lib/models/User";
import { Article } from "@/lib/models/Article";
import { Setting } from "@/lib/models/Setting";
import { RolePolicy } from "@/lib/models/RolePolicy";
import { AdSnippet } from "@/lib/models/AdSnippet";
import { AdTemplate } from "@/lib/models/AdTemplate";
import { Media } from "@/lib/models/Media";
import { Comment } from "@/lib/models/Comment";
import { Subscriber } from "@/lib/models/Subscriber";
import { Newsletter } from "@/lib/models/Newsletter";
import { ConsentLog } from "@/lib/models/ConsentLog";
import { AuditLog } from "@/lib/models/AuditLog";
import { PublishEvent } from "@/lib/models/PublishEvent";
import { UploadAnalytics } from "@/lib/models/UploadAnalytics";
import { AffiliateOffer } from "@/lib/models/AffiliateOffer";

import usersJson from "@/data/users.json";
import articlesJson from "@/data/articles.json";
import categoriesJson from "@/data/categories.json";
import settingsJson from "@/data/settings.json";
import rolePoliciesJson from "@/data/role-policies.json";
import adSnippetsJson from "@/data/ad-snippets.json";
import adTemplatesJson from "@/data/ad-templates.json";
import mediaJson from "@/data/media.json";
import commentsJson from "@/data/comments.json";
import subscribersJson from "@/data/subscribers.json";
import newslettersJson from "@/data/newsletters.json";
import consentLogsJson from "@/data/consent-logs.json";
import auditLogsJson from "@/data/audit-logs.json";
import publishEventsJson from "@/data/publish-events.json";
import uploadAnalyticsJson from "@/data/upload-analytics.json";
import affiliateOffersJson from "@/data/affiliate-offers.json";

const FIRST_ARTICLE_SLUG = "the-home-decorations-document-photograph-of-an";

interface Refs {
  adminId: Types.ObjectId;
  firstArticleId: Types.ObjectId | null;
}

/** Recursively replace "$admin" / "$firstArticle" markers with real ObjectIds. */
function resolveRefs(value: unknown, refs: Refs): unknown {
  if (value === "$admin") return refs.adminId;
  if (value === "$firstArticle") return refs.firstArticleId;
  if (Array.isArray(value)) return value.map((v) => resolveRefs(v, refs));
  if (value && typeof value === "object" && !(value instanceof Date) && !(value instanceof Types.ObjectId)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = resolveRefs(v, refs);
    }
    return out;
  }
  return value;
}

function asDocs(json: unknown): Record<string, unknown>[] {
  return resolveRefs(json, { adminId: new Types.ObjectId(), firstArticleId: null }) as Record<string, unknown>[];
}

async function upsertMany(
  label: string,
  model: mongoose.Model<any>,
  docs: Record<string, unknown>[],
  filterOf: (doc: Record<string, unknown>) => Record<string, unknown>
) {
  let created = 0;
  let updated = 0;
  for (const doc of docs) {
    const filter = filterOf(doc);
    try {
      const res = await model.updateOne(filter, { $set: doc }, { upsert: true });
      if (res.upsertedCount) created++;
      else if (res.modifiedCount) updated++;
      else updated++; // matched, no field changes
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  [!] ${label}: upsert failed for ${JSON.stringify(filter)} — ${msg}`);
    }
  }
  console.log(`[seed] ${label}: ${created} created, ${updated} updated (of ${docs.length})`);
}

async function seedUsers(refs: Refs) {
  const docs = asDocs(usersJson);
  await upsertMany("users", User, docs, (d) => ({ email: d.email }));
  // Remove any users not present in users.json (single-admin policy)
  // Use exact emails from JSON — MongoDB string match is case-sensitive
  const emails = docs.map((d) => String(d.email));
  const stale = await User.deleteMany({ email: { $nin: emails } });
  if (stale.deletedCount) console.log(`[seed] users: removed ${stale.deletedCount} not in users.json`);
  const adminEmail = emails[0];
  const admin = await User.findOne({ email: adminEmail }).lean();
  if (!admin?._id) throw new Error(`Admin user missing after seed: ${adminEmail}`);
  refs.adminId = admin._id as Types.ObjectId;
}

async function seedArticles(refs: Refs) {
  const docs = articlesJson as unknown as Record<string, unknown>[];
  await upsertMany(
    "articles",
    Article,
    docs.map((d) => ({ ...d, content_type: d.content_type ?? "article", status: d.status ?? "published" })),
    (d) => ({ slug: d.slug, locale: d.locale || "en" })
  );
  const first = await Article.findOne({ slug: FIRST_ARTICLE_SLUG }).lean();
  refs.firstArticleId = (first?._id as Types.ObjectId) ?? null;
  if (!refs.firstArticleId) {
    console.warn(`[seed] warning: first article "${FIRST_ARTICLE_SLUG}" not found`);
  }
}

async function seedCategories(refs: Refs) {
  const col = mongoose.connection.db!.collection("categories");
  const articleCounts = new Map<string, number>();
  for (const a of articlesJson as unknown as { category?: string }[]) {
    const slug = a.category;
    if (slug) articleCounts.set(slug, (articleCounts.get(slug) ?? 0) + 1);
  }
  let created = 0;
  let updated = 0;
  for (const raw of categoriesJson as unknown as Record<string, unknown>[]) {
    const cat = raw as {
      name: string;
      slug: string;
      locale?: string;
      parent?: string | null;
      meta?: Record<string, unknown>;
      color?: string;
    };
    const locale = cat.locale || "en";
    const doc = {
      slug: cat.slug,
      name: cat.name,
      label: cat.name,
      color: cat.color || "#1a8cb2",
      locale,
      parent: null,
      meta: cat.meta ?? {},
      count: articleCounts.get(cat.slug) ?? 0,
      footerLabel: cat.name,
    };
    const res = await col.updateOne({ slug: cat.slug, locale }, { $set: doc }, { upsert: true });
    if (res.upsertedCount) created++;
    else updated++;
  }
  console.log(`[seed] categories: ${created} created, ${updated} updated (of ${categoriesJson.length})`);
}

async function seedSettings(refs: Refs) {
  const docs = asDocs(settingsJson);
  await upsertMany("settings", Setting, docs, (d) => ({ key: d.key, locale: d.locale || "en" }));
}

async function seedRolePolicies(refs: Refs) {
  const docs = rolePoliciesJson as unknown as Record<string, unknown>[];
  await upsertMany("role-policies", RolePolicy, docs, (d) => ({ roleName: d.roleName }));
}

async function seedAdSnippets(refs: Refs) {
  const docs = asDocs(adSnippetsJson);
  await upsertMany("ad-snippets", AdSnippet, docs, (d) => ({ name: d.name }));
}

async function seedAdTemplates(refs: Refs) {
  const docs = asDocs(adTemplatesJson);
  await upsertMany("ad-templates", AdTemplate, docs, (d) => ({ name: d.name }));
}

async function seedMedia(refs: Refs) {
  const docs = asDocs(mediaJson);
  await upsertMany("media", Media, docs, (d) => ({ filename: d.filename, url: d.url }));
}

async function seedComments(refs: Refs) {
  const docs = commentsJson as unknown as Record<string, unknown>[];
  await upsertMany("comments", Comment, docs, (d) => ({
    articleSlug: d.articleSlug,
    authorName: d.authorName,
    content: d.content,
  }));
}

async function seedSubscribers(refs: Refs) {
  const docs = subscribersJson as unknown as Record<string, unknown>[];
  await upsertMany("subscribers", Subscriber, docs, (d) => ({ email: d.email }));
}

async function seedNewsletters(refs: Refs) {
  const docs = newslettersJson as unknown as Record<string, unknown>[];
  await upsertMany("newsletters", Newsletter, docs, (d) => ({ email: d.email }));
}

async function seedConsentLogs(refs: Refs) {
  const docs = consentLogsJson as unknown as Record<string, unknown>[];
  await upsertMany("consent-logs", ConsentLog, docs, (d) => ({
    sessionId: d.sessionId,
    timestamp: d.timestamp,
  }));
}

async function seedAuditLogs(refs: Refs) {
  const docs = asDocs(auditLogsJson);
  await upsertMany("audit-logs", AuditLog, docs, (d) => ({
    action: d.action,
    resourceType: d.resourceType,
    "meta.note": (d.meta as Record<string, unknown> | undefined)?.note,
  }));
}

async function seedPublishEvents(refs: Refs) {
  const docs = asDocs(publishEventsJson);
  await upsertMany("publish-events", PublishEvent, docs, (d) => ({
    articleId: d.articleId,
    event: d.event,
    timestamp: d.timestamp,
  }));
}

async function seedUploadAnalytics(refs: Refs) {
  const docs = uploadAnalyticsJson as unknown as Record<string, unknown>[];
  await upsertMany("upload-analytics", UploadAnalytics, docs, (d) => ({ date: d.date }));
}

async function seedAffiliateOffers(refs: Refs) {
  const docs = affiliateOffersJson as unknown as Record<string, unknown>[];
  await upsertMany("affiliate-offers", AffiliateOffer, docs, (d) => ({ offerId: d.offerId }));
}

async function ensureEmptyCollections() {
  const db = mongoose.connection.db!;
  const empties = ["invitations", "apitokens", "affiliateclicks"];
  for (const name of empties) {
    const existing = await db.listCollections({ name }).toArray();
    if (!existing.length) {
      await db.createCollection(name);
      console.log(`[seed] created empty collection: ${name}`);
    } else {
      console.log(`[seed] collection exists: ${name}`);
    }
  }
}

async function verify(refs: Refs) {
  const db = mongoose.connection.db!;
  const collections = (await db.listCollections().toArray()).map((c) => c.name).sort();
  console.log("\n═══ Verification ═══");
  console.log(`Database: ${db.databaseName}`);
  console.log(`Collections (${collections.length}):`);
  for (const name of collections) {
    const count = await db.collection(name).countDocuments();
    console.log(`  - ${name}: ${count}`);
  }

  const admin = await User.findOne({ email: "admin@Dailytopnews.com" }).lean();
  if (!admin?.passwordHash) {
    throw new Error("Admin user or passwordHash missing");
  }
  const ok = await verifyPassword("Admin123!", admin.passwordHash as string);
  if (!ok) throw new Error("bcrypt verify failed for admin password");
  console.log("\n✅ bcrypt verify OK for admin@Dailytopnews.com / Admin123!");
}

async function main() {
  await connectScript("seed-database");
  const refs: Refs = { adminId: new Types.ObjectId(), firstArticleId: null };

  await seedUsers(refs);
  await seedArticles(refs);
  await seedCategories(refs);
  await seedSettings(refs);
  await seedRolePolicies(refs);
  await seedAdSnippets(refs);
  await seedAdTemplates(refs);
  await seedMedia(refs);
  await seedComments(refs);
  await seedSubscribers(refs);
  await seedNewsletters(refs);
  await seedConsentLogs(refs);
  await seedAuditLogs(refs);
  await seedPublishEvents(refs);
  await seedUploadAnalytics(refs);
  await seedAffiliateOffers(refs);
  await ensureEmptyCollections();
  await verify(refs);

  await mongoose.disconnect();
  console.log("\n[seed-database] done.");
}

main().catch((err) => {
  console.error("[seed-database] fatal:", err);
  process.exit(1);
});
