"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Icon } from "@/components/Layout/common/Icon";
import {
  resolveNativeCardStyle,
  type NativeCardStyle,
} from "@/lib/ads/nativeCardStyles";

interface NativeContent {
  title: string;
  excerpt: string;
  image: string;
  sponsorLabel: string;
  sponsorName: string;
  sponsorLogo?: string;
  clickThroughUrl: string;
  category?: string;
  categoryColor?: string;
  readTime?: string;
  author?: string;
  date?: string;
  layout?: "column" | "row";
  cardStyle?: string;
}

interface NativeAdData {
  _id: string;
  nativeContent: NativeContent;
  vastTagUrl?: string;
  vastUrl?: string;
  trackingPixels?: {
    impression?: string;
    click?: string;
  };
}

interface Props {
  ad: NativeAdData;
  variant?: "grid" | "list";
  cardStyle?: string;
  position?: string;
  pageType?: string;
  adNumber?: number;
  /** Extra classes injected by the host cell (e.g. mb30 to match neighbours). */
  className?: string;
  dark?: boolean;
  /** Render the trailing border/spacer pair used by list feeds (false when the host cell renders its own). */
  separators?: boolean;
  /** Show the theme's bolt badge (some post-type3 feeds use it, others don't). */
  bolt?: boolean;
}

/**
 * NativeAdCard — sponsored card whose ROOT element IS the NewsPrk
 * `.single_post` card (same classes, same DOM depth as real article cards).
 * Because it renders inside the same feed containers, every section sizing /
 * aspect-ratio rule applies to it unchanged — the ad adopts the surrounding
 * feed's image size, ratio and alignment exactly.
 */
export default function NativeAdCard({
  ad,
  variant: variantProp,
  cardStyle: cardStyleOverride,
  position,
  pageType,
  adNumber,
  className = "",
  dark = false,
  separators = true,
  bolt = true,
}: Props) {
  const { nativeContent: nc, trackingPixels } = ad;
  const containerRef = useRef<HTMLDivElement>(null);
  const [impressionTracked, setImpressionTracked] = useState(false);

  const cardStyle: NativeCardStyle = resolveNativeCardStyle(
    cardStyleOverride || nc.cardStyle || (nc.layout === "row" ? "widgets-small" : "post-type3")
  );

  // ── Impression tracking (50% visible) ──────────────────────────────
  useEffect(() => {
    if (!ad._id || impressionTracked || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !impressionTracked) {
            setImpressionTracked(true);
            fetch(`/api/ads/${ad._id}/analytics`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ event: "impression" }),
            }).catch(() => {});
            if (trackingPixels?.impression) {
              const img = new window.Image();
              img.src = trackingPixels.impression;
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [ad._id, impressionTracked, trackingPixels?.impression]);

  // ── Click handler ──────────────────────────────────────────────────
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Inner anchors already handled the click and it bubbled here — don't
      // track/open twice.
      if (e.defaultPrevented) return;
      e.preventDefault();
      if (ad._id) {
        fetch(`/api/ads/${ad._id}/analytics`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "click" }),
        }).catch(() => {});
      }
      if (trackingPixels?.click) {
        const img = new window.Image();
        img.src = trackingPixels.click;
      }
      if (nc.clickThroughUrl) {
        window.open(nc.clickThroughUrl, "_blank", "noopener,noreferrer");
      }
    },
    [ad._id, nc.clickThroughUrl, trackingPixels?.click]
  );

  if (!nc.title && !nc.image) return null;

  const href = nc.clickThroughUrl || "#";
  const sponsoredLabel = nc.sponsorLabel || "Sponsored";
  const category = nc.category || sponsoredLabel;
  // Disclosure lives ONLY in the ::after overlay ("category / sponsored") —
  // the meta row shows just the category, like real article cards.
  const dateLabel = nc.date || "";
  const excerpt = nc.excerpt || "";
  const title = nc.title || "";
  const image = nc.image;
  const counter = adNumber != null ? String(adNumber) : nc.readTime || "01";

  const metaDate = dateLabel ? (
    <Link href={href} onClick={handleClick}>
      {dateLabel}
    </Link>
  ) : null;
  const metaCategory = (
    <Link href={href} onClick={handleClick}>
      {category}
    </Link>
  );
  const titleLink = (
    <Link href={href} onClick={handleClick}>
      {title}
    </Link>
  );

  const rootProps = () => ({
    ref: containerRef,
    onClick: handleClick,
    role: "link" as const,
    tabIndex: 0,
    "aria-label": `Sponsored: ${title}`,
    "data-ad-position": position,
    "data-ad-page": pageType,
    "data-card-style": cardStyle,
    "data-sponsor": sponsoredLabel,
    "data-ad-category": category,
  });

  /** Real-card classes + native marker + host cell classes, on ONE element. */
  const rootClass = (classes: string) =>
    `native-ad-card ${classes} ${className}`.trim();

  const listSeparators = separators ? (
    <>
      <div className="space-15" />
      {dark ? <div className="border_white" /> : <div className="border_black" />}
      <div className="space-15" />
    </>
  ) : null;

  // ── post-type5: Trending carousel slide (80×70 + excerpt) ─────────
  if (cardStyle === "post-type5") {
    return (
      <div {...rootProps()} className={rootClass("single_post widgets_small post_type5")}>
        <div className="post_img">
          <div className="img_wrap">
            <a href={href} onClick={handleClick}>
              {image ? <img src={image} alt={title || "Sponsored"} /> : null}
            </a>
          </div>
        </div>
        <div className="single_post_text">
          <h4>
            {titleLink}
            <span className="native-sponsor-inline">{sponsoredLabel}</span>
          </h4>
          <p>{excerpt}</p>
        </div>
      </div>
    );
  }

  // ── post-type6: Gallery hero overlay ───────────────────────────────
  if (cardStyle === "post-type6") {
    return (
      <div {...rootProps()} className={rootClass("single_post post_type6 xs-mb30")}>
        <div className="post_img gradient1">
          {image ? <img src={image} alt={title || "Sponsored"} /> : null}
        </div>
        <div className="single_post_text">
          <div className="meta meta_separator1">
            {metaCategory}
            {metaDate}
          </div>
          <h4>{titleLink}</h4>
          {excerpt ? (
            <>
              <div className="space-10" />
              <p className="post-p">{excerpt}</p>
            </>
          ) : null}
        </div>
      </div>
    );
  }

  // ── post-type7: Feature News fixed overlay ─────────────────────────
  if (cardStyle === "post-type7") {
    return (
      <div {...rootProps()} className={rootClass("single_post post_type6 post_type7")}>
        <div className="post_img gradient1">
          <a href={href} onClick={handleClick}>
            {image ? <img src={image} alt={title || "Sponsored"} /> : null}
          </a>
        </div>
        <div className="single_post_text">
          <div className="meta5">
            {metaCategory}
            {metaDate}
          </div>
          <h4>{titleLink}</h4>
        </div>
      </div>
    );
  }

  // ── post-type9: Mix Area large overlay ─────────────────────────────
  if (cardStyle === "post-type9") {
    return (
      <div {...rootProps()} className={rootClass("single_post post_type6 post_type9")}>
        <div className="post_img gradient1">
          <div className="img_wrap">
            <a href={href} onClick={handleClick}>
              {image ? <img src={image} alt={title || "Sponsored"} /> : null}
            </a>
          </div>
          <span className="tranding">
            <Icon name="bolt" />
          </span>
        </div>
        <div className="single_post_text">
          <div className="meta">
            {metaCategory}
            {metaDate}
          </div>
          <h4>{titleLink}</h4>
        </div>
      </div>
    );
  }

  // ── post-type11: Video featured (img + grey panel) ─────────────────
  if (cardStyle === "post-type11") {
    return (
      <div {...rootProps()} className={rootClass("single_post post_type3 post_type11")}>
        <div className="post_img">
          <div className="img_wrap">
            <a href={href} onClick={handleClick} className="play_btn">
              {image ? <img src={image} alt={title || "Sponsored"} /> : null}
            </a>
          </div>
          <p className="youtube_middle">
            <Icon name="youtube-play" />
          </p>
        </div>
        <div className={`single_post_text padding30 ${dark ? "dark-2" : "fourth_bg"}`}>
          <div className="meta3">
            {metaCategory}
            {metaDate}
          </div>
          <h4>{titleLink}</h4>
        </div>
      </div>
    );
  }

  // ── post-type12: Business split row ────────────────────────────────
  if (cardStyle === "post-type12") {
    return (
      <div {...rootProps()} className={rootClass("single_post post_type3 post_type12 mb30")}>
        <div className="post_img">
          <div className="img_wrap">
            <a href={href} onClick={handleClick}>
              {image ? <img src={image} alt={title || "Sponsored"} /> : null}
            </a>
          </div>
        </div>
        <div className="single_post_text">
          <div className="meta3">
            {metaCategory}
            {metaDate}
          </div>
          <h4>{titleLink}</h4>
          {excerpt ? (
            <>
              <div className="space-10" />
              <p className="post-p">{excerpt}</p>
            </>
          ) : null}
          <div className="space-20" />
          <a href={href} onClick={handleClick} className="readmore">
            Read more
          </a>
        </div>
      </div>
    );
  }

  // ── post-type15: Latest blog rounded card ──────────────────────────
  if (cardStyle === "post-type15") {
    return (
      <div {...rootProps()} className={rootClass("single_post post_type3 mb30 post_type15 border-radious5")}>
        <div className="post_img border-radious5">
          <div className="img_wrap">
            <a href={href} onClick={handleClick}>
              {image ? <img src={image} alt={title || "Sponsored"} /> : null}
            </a>
          </div>
          <span className="tranding border_tranding">
            <Icon name="bolt" />
          </span>
        </div>
        <div className="single_post_text padding20 white_bg">
          <Link href={href} onClick={handleClick}>
            {title}
          </Link>
          {excerpt ? (
            <>
              <div className="space-10" />
              <p className="post-p">{excerpt}</p>
            </>
          ) : null}
          <div className="space-20" />
          <div className="meta3">
            {metaCategory}
            {metaDate}
          </div>
        </div>
      </div>
    );
  }

  // ── type8: Most Viewed (thumb + ghost counter) ─────────────────────
  if (cardStyle === "type8") {
    return (
      <div {...rootProps()} className={rootClass("single_post widgets_small type8")}>
        <div className="post_img">
          <div className="img_wrap">
            <a href={href} onClick={handleClick}>
              {image ? <img src={image} alt={title || "Sponsored"} /> : null}
            </a>
          </div>
          <span className="tranding">
            <Icon name="bolt" />
          </span>
        </div>
        <div className="single_post_text">
          <div className="meta2">
            {metaCategory}
            {metaDate}
          </div>
          <h4>{titleLink}</h4>
        </div>
        <div className="type8_count">
          <h2>{counter}</h2>
        </div>
      </div>
    );
  }

  // ── type10: Popular numbered (tranding_border badge) ───────────────
  if (cardStyle === "type10") {
    return (
      <div {...rootProps()} className={rootClass("single_post type10 widgets_small mb15")}>
        <div className="post_img">
          <div className="img_wrap">
            <a href={href} onClick={handleClick}>
              {image ? <img src={image} alt={title || "Sponsored"} /> : null}
            </a>
          </div>
          <span className="tranding tranding_border">{counter}</span>
        </div>
        <div className="single_post_text">
          <h4>{titleLink}</h4>
          <div className="meta4">{metaCategory}</div>
        </div>
      </div>
    );
  }

  // ── widgets-type4: Most Shared (number circle + share counts) ──────
  if (cardStyle === "widgets-type4") {
    return (
      <div {...rootProps()} className={rootClass("single_post widgets_small widgets_type4")}>
        <div className="post_img number">
          <h2>{counter}</h2>
        </div>
        <div className="single_post_text">
          <div className="meta2">
            {metaCategory}
            {metaDate}
          </div>
          <h4>{titleLink}</h4>
          <ul className="inline socail_share">
            <li>
              <a href={href} onClick={handleClick}>
                <Icon name="twitter" /> 2.2K
              </a>
            </li>
            <li>
              <a href={href} onClick={handleClick}>
                <Icon name="facebook-f" /> 2.2K
              </a>
            </li>
          </ul>
          <div className="space-15" />
          {dark ? <div className="border_white" /> : <div className="border_black" />}
        </div>
      </div>
    );
  }

  // ── widgets-small-sep: Related list (thumb + meta_separator1) ──────
  if (cardStyle === "widgets-small-sep") {
    return (
      <>
        <div {...rootProps()} className={rootClass("single_post widgets_small")}>
          <div className="post_img">
            <div className="img_wrap">
              <a href={href} onClick={handleClick}>
                {image ? <img src={image} alt={title || "Sponsored"} /> : null}
              </a>
            </div>
          </div>
          <div className="single_post_text">
            <div className="meta2 meta_separator1">
              {metaCategory}
              {metaDate}
            </div>
            <h4>{titleLink}</h4>
          </div>
        </div>
        {separators ? (
          <>
            <div className="space-15" />
            {dark ? <div className="border_white" /> : <div className="border_black" />}
            <div className="space-15" />
          </>
        ) : null}
      </>
    );
  }

  // ── widgets-small: Thumb list ──────────────────────────────────────
  if (cardStyle === "widgets-small") {
    return (
      <>
        <div {...rootProps()} className={rootClass("single_post widgets_small")}>
          <div className="post_img">
            <div className="img_wrap">
              <a href={href} onClick={handleClick}>
                {image ? <img src={image} alt={title || "Sponsored"} /> : null}
              </a>
            </div>
            <span className="tranding">
              <Icon name="bolt" />
            </span>
          </div>
          <div className="single_post_text">
            <div className="meta2">
              {metaCategory}
              {metaDate}
            </div>
            <h4>{titleLink}</h4>
          </div>
        </div>
        {listSeparators}
      </>
    );
  }

  // ── post-type3: standard feature card (default) ────────────────────
  return (
    <div {...rootProps()} className={rootClass("single_post post_type3")}>
      <div className="post_img">
        <div className="img_wrap">
          <a href={href} onClick={handleClick}>
            {image ? <img src={image} alt={title || "Sponsored"} /> : null}
          </a>
        </div>
        {bolt ? (
          <span className="tranding">
            <Icon name="bolt" />
          </span>
        ) : null}
      </div>
      <div className="single_post_text">
        <div className="meta3">
          {metaCategory}
          {metaDate}
        </div>
        <h4>{titleLink}</h4>
        {excerpt ? (
          <>
            <div className="space-10" />
            <p className="post-p">{excerpt}</p>
          </>
        ) : null}
      </div>
    </div>
  );
}
