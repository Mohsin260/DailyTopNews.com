import type { PageType, AdPosition } from "@/lib/models/AdSnippet";

type SlotAd = {
    _id: string;
    pageType: PageType;
    position: AdPosition;
    enabled?: boolean;
    [key: string]: unknown;
};

export type AdSlotResult = {
    items: SlotAd[];
    adsEnabled?: boolean;
    /** true when the returned items came from the homepage fallback */
    usedFallback?: boolean;
};

async function getAds(pageType: PageType, position: AdPosition): Promise<AdSlotResult> {
    const res = await fetch(
        `/api/ads?pageType=${pageType}&position=${position}&activeOnly=true`,
        { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to load ads");
    return res.json() as Promise<AdSlotResult>;
}

const matches = (items: SlotAd[] | undefined, pageType: PageType, position: AdPosition) =>
    (items || []).filter(
        (a) => a.pageType === pageType && a.position === position && a.enabled !== false
    );

// Positions whose frames exist on other pages under a different name than the
// homepage label for the same creative size/placement.
const POSITION_ALIASES: Partial<Record<AdPosition, AdPosition[]>> = {
    // Static pages render an above-footer 728×90 banner; the homepage calls
    // the same placement "bottom-leaderboard".
    "above-footer": ["bottom-leaderboard"],
};

/**
 * Fetch the homepage ad for a given position — used as a fallback when a slot's
 * own pageType (article/category/website) has no ad configured for that position,
 * so every ad frame shows the same creative the homepage shows for that slot.
 */
export async function fetchHomepageAdFallback(position: AdPosition): Promise<AdSlotResult> {
    const positions = [position, ...(POSITION_ALIASES[position] || [])];
    for (const tryPosition of positions) {
        try {
            const data = await getAds("homepage", tryPosition);
            const items = matches(data.items, "homepage", tryPosition);
            if (items.length > 0) {
                return { items, adsEnabled: data.adsEnabled, usedFallback: true };
            }
            if (data.adsEnabled === false) {
                return { items: [], adsEnabled: false, usedFallback: false };
            }
        } catch {
            return { items: [], adsEnabled: true, usedFallback: false };
        }
    }
    return { items: [], adsEnabled: true, usedFallback: false };
}

/**
 * Fetch the ad for a pageType+position slot.
 *
 * Homepage is the source of truth for every other page: category/website
 * pages first look for the homepage ad with the same position (or its alias)
 * so all pages render the exact same campaign — e.g. the sticky-footer frame
 * on /categories shows the homepage's sticky-footer ad. The page's own
 * pageType ad is only used when the homepage has no ad for that position.
 *
 * Article pages are resolved by the caller first (article override → global
 * article ad → homepage fallback) and do not go through this preference.
 */
export async function fetchAdsWithFallback(
    pageType: PageType,
    position: AdPosition
): Promise<AdSlotResult> {
    if (pageType !== "homepage") {
        const homepageAd = await fetchHomepageAdFallback(position);
        if (homepageAd.usedFallback) return homepageAd;
    }
    const primary = await getAds(pageType, position);
    return {
        ...primary,
        items: matches(primary.items, pageType, position),
        usedFallback: false,
    };
}
