/**
 * Native in-feed ad card styles — mapped 1:1 to DailyTopNews/NewsPrk article card markup.
 *
 * Each style mirrors a real section card so sponsored content blends into the feed.
 * Renderer: src/components/ui/NativeAdCard.tsx
 */

export const NativeCardStyles = [
  /** Trending carousel slide — single_post widgets_small post_type5 (80×70 thumb + title + 1-line excerpt) */
  "post-type5",
  /** Standard feature card — single_post post_type3 (full img + meta3 + title + excerpt) */
  "post-type3",
  /** Gallery hero overlay — single_post post_type6 gradient1 (img + overlaid meta/title/excerpt) */
  "post-type6",
  /** Feature News overlay — single_post post_type6 post_type7 (fixed-height gradient + meta5 + title) */
  "post-type7",
  /** Mix Area overlay — single_post post_type6 post_type9 (aspect ~540/420 + meta + bolt) */
  "post-type9",
  /** Video featured — single_post post_type3 post_type11 (img + grey padding30 panel + meta3) */
  "post-type11",
  /** Business split row — single_post post_type3 post_type12 (48% img left / text right + readmore) */
  "post-type12",
  /** Latest blog card — single_post post_type15 border-radious5 (rounded + white_bg padding20) */
  "post-type15",
  /** Sidebar/thumb list — single_post widgets_small (100×77 img + meta2 + title, dashed border) */
  "widgets-small",
  /** Thumb list with meta separator (Gallery/TabWidget related lists) */
  "widgets-small-sep",
  /** Most Viewed — single_post widgets_small type8 (80×64 + ghost counter) */
  "type8",
  /** Popular Posts — single_post type10 widgets_small (100×56 + numbered tranding_border badge) */
  "type10",
  /** Most Share — single_post widgets_small widgets_type4 (number circle + meta + share counts) */
  "widgets-type4",
] as const;

export type NativeCardStyle = (typeof NativeCardStyles)[number];

export const DEFAULT_NATIVE_CARD_STYLE: NativeCardStyle = "post-type3";

/** Old dashboard/seed style keys → NewsPrk taxonomy (backward compat) */
export const LEGACY_CARD_STYLE_MAP: Record<string, NativeCardStyle> = {
  "news-grid": "post-type3",
  "sidebar-list": "widgets-small",
  "sidebar-featured": "post-type3",
  "latest-articles": "post-type12",
  "hero-side": "post-type7",
  "review-list": "widgets-small",
  "carousel": "post-type5",
  "most-viewed": "type8",
  "article-list": "widgets-small",
  "article-small": "widgets-small",
  "top-stories-thumb": "type10",
  "category-grid": "post-type3",
  "category-featured": "post-type6",
};

export function isNativeCardStyle(value: string): value is NativeCardStyle {
  return (NativeCardStyles as readonly string[]).includes(value);
}

/** Every cardStyle value accepted by the dashboard/API (canonical + legacy keys) */
export const ALL_CARD_STYLE_KEYS: string[] = [
  ...NativeCardStyles,
  ...Object.keys(LEGACY_CARD_STYLE_MAP),
];

export function resolveNativeCardStyle(style?: string): NativeCardStyle {
  if (style && isNativeCardStyle(style)) return style;
  if (style && LEGACY_CARD_STYLE_MAP[style]) return LEGACY_CARD_STYLE_MAP[style];
  return DEFAULT_NATIVE_CARD_STYLE;
}

/** Human labels for dashboard selects */
export const NATIVE_CARD_STYLE_LABELS: Record<NativeCardStyle, string> = {
  "post-type5": "Trending Slide (80×70 thumb + excerpt)",
  "post-type3": "Feature Card (image + meta + title + excerpt)",
  "post-type6": "Gallery Overlay (full-bleed gradient hero)",
  "post-type7": "Feature Overlay (fixed-height gradient card)",
  "post-type9": "Mix Overlay (large video-style overlay)",
  "post-type11": "Video Featured (image + grey text panel)",
  "post-type12": "Business Row (image left / text right + read more)",
  "post-type15": "Latest Blog (rounded card, white text panel)",
  "widgets-small": "Thumb List (100×77 + meta + title)",
  "widgets-small-sep": "Related List (thumb list + meta separator)",
  "type8": "Most Viewed (thumb + ghost counter)",
  "type10": "Popular Numbered (thumb + number badge)",
  "widgets-type4": "Most Shared (number circle + share counts)",
};

/** Suggested homepage position → card style (section-aware) */
export const HOMEPAGE_POSITION_CARD_STYLE: Record<string, NativeCardStyle> = {
  "in-feed-1": "post-type5",
  "in-feed-2": "widgets-small-sep",
  "in-feed-3": "post-type7",
  "in-feed-4": "widgets-small",
  "in-feed-5": "type8",
  "in-feed-6": "post-type9",
  "in-feed-7": "post-type3",
  "in-feed-8": "widgets-small",
  "in-feed-9": "post-type12",
  "in-feed-10": "widgets-type4",
  "in-feed-11": "type10",
  "in-feed-12": "post-type11",
  "in-feed-13": "post-type3",
  "in-feed-14": "post-type6",
  "in-feed-15": "post-type3",
  "in-feed-x": "post-type3",
  "sidebar-infeed": "type8",
};

/** Suggested article position → card style */
export const ARTICLE_POSITION_CARD_STYLE: Record<string, NativeCardStyle> = {
  "article-native-1": "post-type3",
  "article-native-2": "post-type3",
  "article-related": "post-type15",
  "sidebar-infeed": "widgets-small-sep",
  "in-feed-x": "post-type3",
};
