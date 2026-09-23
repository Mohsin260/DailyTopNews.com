import { NextResponse } from "next/server";
import { resolveArticleAd, resolveGlobalAd } from "@/lib/ads/resolveAd";
import { connectDB } from "@/lib/db";
import { isAdsGloballyEnabled } from "@/lib/ads/adsEnabled";

export const dynamic = "force-dynamic";

/**
 * GET /api/ads/resolve?pageType=article&position=top-leaderboard&articleSlug=notion-ai-review
 *
 * Resolves which ad to display with priority:
 * 1. Article-specific override (highest priority)
 * 2. Global article ad (fallback for article pages)
 * 3. null (no ad)
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const position = searchParams.get("position");
    const pageType = searchParams.get("pageType") || "article";
    const articleSlug = searchParams.get("articleSlug");

    if (!position) {
      return NextResponse.json(
        { error: "position parameter is required" },
        { status: 400 }
      );
    }

    await connectDB();
    if (!(await isAdsGloballyEnabled())) {
      return NextResponse.json({ item: null, adsEnabled: false });
    }

    let ad = null;

    if (pageType === "article") {
      // Article pages: check override first, then global
      ad = await resolveArticleAd(position, articleSlug || undefined);
    } else {
      // Other page types: global only
      ad = await resolveGlobalAd(pageType, position);
    }

    return NextResponse.json({ item: ad, adsEnabled: true });
  } catch (err) {
    console.error("[/api/ads/resolve] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
