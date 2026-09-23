/**
 * One-off: fill empty code on image ads from mediaUrl + clickThroughUrl
 * so the dashboard Custom Code tab shows the image template snippet.
 *
 * Usage: npx tsx src/scripts/backfill-ad-codes.ts
 */
import "dotenv/config";
import { connectScript } from "./_db";
import { AdSnippet } from "@/lib/models/AdSnippet";

const IMAGE_CODE = (clickUrl: string, mediaUrl: string) =>
  `<div style="text-align:center;margin:20px 0;">
  <a href="${clickUrl || "#"}" target="_blank" rel="noopener">
    <img src="${mediaUrl}" alt="Advertisement"
      style="max-width:100%;height:auto;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);" />
  </a>
</div>`;

async function main() {
  await connectScript("backfill-ad-codes");
  const ads = await AdSnippet.find({
    isArticleOverride: { $ne: true },
    $or: [{ code: "" }, { code: null }, { code: { $exists: false } }],
  }).lean();

  let updated = 0;
  for (const ad of ads as any[]) {
    const media = (ad.mediaUrl || ad.url || "").trim();
    if (!media) continue;
    const isImage =
      ad.creativeType === "image" ||
      ad.type === "image" ||
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(media);
    if (!isImage) continue;

    const click = (ad.clickThroughUrl || "#").trim() || "#";
    await AdSnippet.updateOne(
      { _id: ad._id },
      {
        $set: {
          code: IMAGE_CODE(click, media),
          templateType: "direct_banner",
          type: "image",
          creativeType: "image",
          customCode: false,
        },
      }
    );
    updated++;
    console.log(`  updated: ${ad.pageType}/${ad.position}`);
  }

  console.log(`[backfill-ad-codes] updated ${updated} ads`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
