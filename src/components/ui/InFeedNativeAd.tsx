"use client";

import AdSlot from "./AdSlot";
import NativeAdCard from "./NativeAdCard";
import {
  resolveNativeCardStyle,
  HOMEPAGE_POSITION_CARD_STYLE,
  ARTICLE_POSITION_CARD_STYLE,
} from "@/lib/ads/nativeCardStyles";
import { useNativeFeed } from "@/lib/ads/useNativeFeed";
import type { PageType, AdPosition } from "@/lib/models/AdSnippet";

interface Props {
  pageType: PageType;
  position: AdPosition;
  adNumber?: number;
  variant?: "grid" | "list";
  /**
   * Surrounding feed's card style. This ALWAYS wins over the ad's stored
   * cardStyle so the sponsored card adopts the exact sizing/layout/aspect
   * ratio of the article cards it sits between.
   */
  cardStyle?: string;
  className?: string;
  dark?: boolean;
  /** Render the trailing border/spacer pair used by list feeds (false when the host cell renders its own). */
  separators?: boolean;
  /** Match whether the surrounding feed's cards show the bolt badge. */
  bolt?: boolean;
}

/**
 * InFeedNativeAd — slot renderer for one configured ad position. Reads from the
 * shared per-page useNativeFeed store (one request per page) and renders with
 * the NewsPrk card style of the surrounding feed.
 * Non-native ads fall back to AdSlot banner rendering.
 */
export default function InFeedNativeAd({
  pageType,
  position,
  adNumber,
  variant,
  cardStyle,
  className,
  dark,
  separators = true,
  bolt = true,
}: Props) {
  const { getAd, ready, adsEnabled } = useNativeFeed(pageType);
  const ad = getAd(position);

  if (!ready || !adsEnabled || !ad || ad.enabled === false) return null;

  if (ad.templateType === "native_feed" && ad.nativeContent) {
    const nc = ad.nativeContent;
    if (!nc.title && !nc.image) return null;

    // Call-site section style → dashboard/nativeContent.cardStyle → position default
    const positionDefault =
      pageType === "article"
        ? ARTICLE_POSITION_CARD_STYLE[position]
        : HOMEPAGE_POSITION_CARD_STYLE[position];
    const resolved = resolveNativeCardStyle(cardStyle || nc.cardStyle || positionDefault);

    return (
      <NativeAdCard
        ad={{
          _id: ad._id,
          nativeContent: {
            title: (nc.title as string) || "",
            excerpt: (nc.excerpt as string) || "",
            image: (nc.image as string) || "",
            sponsorLabel: (nc.sponsorLabel as string) || "Sponsored",
            sponsorName: (nc.sponsorName as string) || "",
            sponsorLogo: (nc.sponsorLogo as string) || "",
            clickThroughUrl:
              (nc.clickThroughUrl as string) || ad.clickThroughUrl || "",
            category: (nc.category as string) || "",
            categoryColor: (nc.categoryColor as string) || "",
            readTime: (nc.readTime as string) || "",
            author: (nc.author as string) || "",
            date: (nc.date as string) || "",
            layout: (nc.layout as "column" | "row") || "column",
            cardStyle: (nc.cardStyle as string) || "",
          },
          vastTagUrl: ad.vastTagUrl,
          vastUrl: ad.vastUrl,
          trackingPixels: ad.trackingPixels,
        }}
        variant={variant}
        cardStyle={resolved}
        position={position}
        pageType={pageType}
        adNumber={adNumber}
        className={className}
        dark={dark}
        separators={separators}
        bolt={bolt}
      />
    );
  }

  // Non-native fallback (banner/video/html)
  const nonNativeHasContent = !!(
    ((ad.code || "") as string).trim() ||
    ((ad.mediaUrl || "") as string).trim() ||
    ((ad.url || "") as string).trim() ||
    ((ad.vastUrl || "") as string).trim() ||
    ((ad.vastTagUrl || "") as string).trim()
  );
  if (!nonNativeHasContent) return null;

  return (
    <div className="p-wrap">
      <AdSlot
        pageType={pageType}
        position={position}
        label="AD"
        className="w-full h-full"
        fullWidth={true}
      />
      <div className="mt-1" style={{ fontSize: "10px", color: "#888", textTransform: "uppercase" }}>
        Sponsored
      </div>
    </div>
  );
}
