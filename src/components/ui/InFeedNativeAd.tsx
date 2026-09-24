"use client";

import { useQuery } from "@tanstack/react-query";
import AdSlot from "./AdSlot";
import NativeAdCard from "./NativeAdCard";
import {
  resolveNativeCardStyle,
  HOMEPAGE_POSITION_CARD_STYLE,
  ARTICLE_POSITION_CARD_STYLE,
} from "@/lib/ads/nativeCardStyles";
import type { PageType, AdPosition } from "@/lib/models/AdSnippet";

interface Props {
  pageType: PageType;
  position: AdPosition;
  adNumber?: number;
  variant?: "grid" | "list";
  /** Optional section fallback when the ad has no stored cardStyle */
  cardStyle?: string;
  className?: string;
  dark?: boolean;
}

/**
 * In-Feed Native Ad — fetches a native_feed AdSnippet for (pageType, position)
 * and renders it with the NewsPrk card style matching the surrounding section.
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
}: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["ads", pageType, position],
    queryFn: async () => {
      const res = await fetch(
        `/api/ads?pageType=${pageType}&position=${position}&activeOnly=true`,
        { cache: "no-store" }
      );
      if (!res.ok) return { items: [] };
      return res.json() as Promise<{ items: any[] }>;
    },
    staleTime: 0,
    gcTime: 0,
  });

  const ad = data?.items?.find(
    (a: any) =>
      a.pageType === pageType && a.position === position && a.enabled !== false
  );
  const adsGloballyDisabled = (data as any)?.adsEnabled === false;
  const hasAd = !!ad && !adsGloballyDisabled;

  if (isLoading) return null;
  if (!hasAd) return null;

  // Suggested style for this slot when ad/editor didn't pin one
  const positionDefault =
    pageType === "article"
      ? ARTICLE_POSITION_CARD_STYLE[position]
      : HOMEPAGE_POSITION_CARD_STYLE[position];

  if (ad.templateType === "native_feed" && ad.nativeContent) {
    const nc = ad.nativeContent;
    if (!nc.title && !nc.image) return null;

    // Dashboard/nativeContent.cardStyle wins → call-site section fallback → position default
    const resolved = resolveNativeCardStyle(nc.cardStyle || cardStyle || positionDefault);

    return (
      <NativeAdCard
        ad={{
          _id: ad._id,
          nativeContent: {
            title: nc.title || "",
            excerpt: nc.excerpt || "",
            image: nc.image || "",
            sponsorLabel: nc.sponsorLabel || "Sponsored",
            sponsorName: nc.sponsorName || "",
            sponsorLogo: nc.sponsorLogo || "",
            clickThroughUrl: nc.clickThroughUrl || ad.clickThroughUrl || "",
            category: nc.category || "",
            categoryColor: nc.categoryColor || "",
            readTime: nc.readTime || "",
            author: nc.author || "",
            date: nc.date || "",
            layout: nc.layout || "column",
            cardStyle: nc.cardStyle || "",
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
      />
    );
  }

  // Non-native fallback (banner/video/html)
  const nonNativeHasContent = !!(
    (ad.code || "").trim() ||
    (ad.mediaUrl || "").trim() ||
    (ad.url || "").trim() ||
    (ad.vastUrl || "").trim() ||
    (ad.vastTagUrl || "").trim()
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
