"use client";

import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { PageType } from "@/lib/models/AdSnippet";

/** Trimmed ad-snippet shape needed by in-feed rendering. */
export interface FeedAd {
  _id: string;
  position: string;
  pageType?: string;
  templateType?: string;
  enabled?: boolean;
  clickThroughUrl?: string;
  vastUrl?: string;
  vastTagUrl?: string;
  trackingPixels?: { impression?: string; click?: string };
  nativeContent?: {
    title?: string;
    excerpt?: string;
    image?: string;
    cardStyle?: string;
    layout?: string;
    [key: string]: unknown;
  };
  code?: string;
  mediaUrl?: string;
  url?: string;
}

/**
 * One in-feed ad slot inside a section's card array.
 * `index` is the cell the ad occupies this page load — re-randomized on every
 * mount so sponsored cards never sit in a fixed spot of the feed.
 */
export interface FeedSlot {
  position: string;
  ad: FeedAd | null;
  index: number | null;
  hasAd: boolean;
}

interface FeedResponse {
  items?: FeedAd[];
  adsEnabled?: boolean;
}

/** Mirrors InFeedNativeAd's renderability checks — an ad that would render nothing never reserves a cell. */
function isRenderable(ad: FeedAd): boolean {
  if (!ad || ad.enabled === false) return false;
  if (ad.templateType === "native_feed") {
    const nc = ad.nativeContent;
    return !!nc && (!!(nc.title as string) || !!(nc.image as string));
  }
  return !!(
    ((ad.code || "") as string).trim() ||
    ((ad.mediaUrl || "") as string).trim() ||
    ((ad.url || "") as string).trim() ||
    ((ad.vastUrl || "") as string).trim() ||
    ((ad.vastTagUrl || "") as string).trim()
  );
}

function shuffle<T>(input: T[]): T[] {
  const arr = input.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Shared per-pageType store of ad snippets — ONE request per page feeds every
 * in-feed slot (sections + InFeedNativeAd) instead of one request per slot.
 * Pass `enabled: false` from hosts that have no slot to avoid a wasted fetch.
 */
export function useNativeFeed(pageType: PageType, enabled = true) {
  const { data, isLoading } = useQuery({
    queryKey: ["native-feed", pageType],
    enabled,
    queryFn: async (): Promise<FeedResponse> => {
      try {
        const res = await fetch(`/api/ads?pageType=${pageType}&activeOnly=true`, {
          cache: "no-store",
        });
        if (!res.ok) return { items: [], adsEnabled: true };
        return (await res.json()) as FeedResponse;
      } catch {
        return { items: [], adsEnabled: true };
      }
    },
    staleTime: 60_000,
    gcTime: 300_000,
  });

  const adsEnabled = data?.adsEnabled !== false;

  const adsByPosition = useMemo(() => {
    const map: Record<string, FeedAd> = {};
    if (!adsEnabled || !data?.items) return map;
    for (const ad of data.items) {
      if (!ad?.position || map[ad.position]) continue;
      if (!isRenderable(ad)) continue;
      map[ad.position] = ad;
    }
    return map;
  }, [data, adsEnabled]);

  const getAd = useCallback(
    (position: string) => adsByPosition[position],
    [adsByPosition]
  );

  return {
    ready: !isLoading && !!data,
    adsEnabled,
    adsByPosition,
    getAd,
  };
}

/**
 * Single ad slot: returns the ad configured at `position` (if renderable) and
 * the random cell index it should replace within a feed of `cardCount` cards.
 * Index is computed once per mount (keyed on the ad id), so it re-rolls on
 * every page load but stays stable across re-renders/refetches.
 */
export function useNativeAdSlot(
  pageType: PageType,
  position: string,
  cardCount: number,
  enabled = true
): FeedSlot {
  const { getAd } = useNativeFeed(pageType, enabled);
  const ad = getAd(position) ?? null;
  const adId = ad?._id;

  const index = useMemo(() => {
    if (!adId || cardCount < 1) return null;
    return Math.floor(Math.random() * cardCount);
  }, [adId, cardCount]);

  return {
    position,
    ad,
    index: adId && index !== null ? index : null,
    hasAd: !!adId && index !== null,
  };
}

/**
 * Multiple ad slots sharing ONE card array (e.g. a list hosting two positions).
 * Assigns distinct random cell indices so slots never collide and every ad
 * displaces its own article card (total cell count stays constant).
 */
export function useNativeAdSlots(
  pageType: PageType,
  positions: readonly string[],
  cardCount: number,
  enabled = true
): FeedSlot[] {
  const { getAd } = useNativeFeed(pageType, enabled);

  const ads = positions.map((p) => getAd(p) ?? null);
  const signature = ads.map((a) => a?._id ?? "-").join("|");

  return useMemo(() => {
    const pool = shuffle(
      Array.from({ length: Math.max(cardCount, 0) }, (_, i) => i)
    );
    return ads.map((ad, i) => {
      if (!ad || pool.length === 0) {
        return { position: positions[i], ad: null, index: null, hasAd: false };
      }
      return {
        position: positions[i],
        ad,
        index: pool.pop() as number,
        hasAd: true,
      };
    });
    // signature captures ad identity; positions/getAd are re-read each recompute
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, cardCount]);
}
