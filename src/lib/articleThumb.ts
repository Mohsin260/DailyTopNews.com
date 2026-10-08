const VIDEO_URL_RE = /\.(mp4|webm|mov|m3u8|ogv)(\?|#|$)/i;

export function isVideoMediaUrl(url?: string | null): boolean {
  return !!url && VIDEO_URL_RE.test(url);
}

/**
 * Thumbnail URL for article cards.
 *
 * Video articles store the video file in `articleMedia.heroCoverMedia.url`
 * and the cover still in `heroCoverMedia.poster`. Card components render
 * plain <img> tags, which can't display an .mp4 — so when the hero media is
 * a video, return the poster image instead of the video URL.
 */
export function articleThumb(
  article?:
    | {
        image?: string;
        articleMedia?: {
          heroCoverMedia?: { url?: string; poster?: string } | null;
        } | null;
      }
    | null
): string {
  const hero = article?.articleMedia?.heroCoverMedia;
  const raw = hero?.url || article?.image || "";
  if (isVideoMediaUrl(raw)) {
    return hero?.poster || raw;
  }
  return raw;
}
