'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
// import { X } from 'lucide-react';
import { PageType, AdPosition } from '@/lib/models/AdSnippet';
import { cn } from '@/lib/utils';

interface StickyFooterAdProps {
  pageType?: PageType;
  delaySeconds?: number;
  showOnAllPages?: boolean;
  zIndex?: number;
  closeButton?: boolean;
  onClose?: () => void;
  className?: string;
  adOverrideId?: string;
  articleSlug?: string;
}

function pageTypeFromPath(pathname: string): PageType {
  if (pathname === '/' || pathname === '') return 'homepage';
  if (pathname.startsWith('/post/')) return 'article';
  if (pathname.startsWith('/category/')) return 'category';
  return 'website';
}

function articleSlugFromPath(pathname: string): string | undefined {
  if (!pathname.startsWith('/post/')) return undefined;
  const seg = pathname.split('/').filter(Boolean);
  return seg[1] || undefined;
}

interface ViewportDimensions {
  width: number;
  height: number;
}

interface Position {
  bottom: number;
  left: number;
  right: number;
}

type Ad = {
  _id: string;
  name: string;
  label: string;
  pageType: PageType;
  position: AdPosition;
  enabled: boolean;
  code: string;
  type?: string;
  mediaUrl?: string;
  vastTagUrl?: string;
  vastUrl?: string;
  clickThroughUrl?: string;
  url?: string;
};

import AdSlot from './AdSlot';

export function StickyFooterAd({
  pageType: pageTypeProp,
  delaySeconds = 3,
  showOnAllPages = true,
  zIndex = 1000,
  closeButton = true,
  onClose,
  className,
  adOverrideId,
  articleSlug: articleSlugProp,
}: StickyFooterAdProps) {
  const pathname = usePathname() || '/';
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [affiliateBarActive, setAffiliateBarActive] = useState(false);

  const resolvedPageType = pageTypeProp ?? pageTypeFromPath(pathname);
  const resolvedArticleSlug =
    articleSlugProp ?? (resolvedPageType === 'article' ? articleSlugFromPath(pathname) : undefined);

  // Reset close state when the page type (or article) changes so each
  // Ads Manager tab's sticky-footer config controls its own bar.
  useEffect(() => {
    setIsClosed(false);
  }, [resolvedPageType, resolvedArticleSlug, adOverrideId]);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delaySeconds * 1000);
    return () => clearTimeout(timer);
  }, [delaySeconds]);

  // D5c: Suppress anchor ad when affiliate sticky bar is active
  useEffect(() => {
    const checkAffiliateBar = () => {
      const bar = document.querySelector('.fixed.inset-x-0.bottom-0.z-50');
      setAffiliateBarActive(!!bar);
    };
    const observer = new MutationObserver(checkAffiliateBar);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setIsClosed(true);
    onClose?.();
  };

  // Only mount the fixed wrapper when a real ad exists for this slot.
  const { data: stickyAdData, isLoading: stickyAdLoading } = useQuery({
    queryKey: ["sticky-footer-ad", resolvedPageType, adOverrideId, resolvedArticleSlug],
    queryFn: async () => {
      if (adOverrideId) {
        const res = await fetch(`/api/ads/${adOverrideId}`, { cache: "no-store" });
        if (!res.ok) return { items: [] as Ad[], adsEnabled: true };
        const { item, adsEnabled } = await res.json();
        return { items: item ? [item] : [] as Ad[], adsEnabled: adsEnabled !== false };
      }
      if (resolvedPageType === "article" && resolvedArticleSlug) {
        const res = await fetch(
          `/api/ads/resolve?pageType=article&position=sticky-footer&articleSlug=${encodeURIComponent(resolvedArticleSlug)}`,
          { cache: "no-store" }
        );
        if (!res.ok) return { items: [] as Ad[], adsEnabled: true };
        const { item, adsEnabled } = await res.json();
        return { items: item ? [item] : [] as Ad[], adsEnabled: adsEnabled !== false };
      }
      const qs = new URLSearchParams({
        pageType: resolvedPageType,
        position: "sticky-footer",
        activeOnly: "true",
      });
      const res = await fetch(`/api/ads?${qs.toString()}`, { cache: "no-store" });
      if (!res.ok) return { items: [] as Ad[], adsEnabled: true };
      return res.json() as Promise<{ items: Ad[]; adsEnabled?: boolean }>;
    },
    staleTime: 0,
    gcTime: 0,
  });

  const hasStickyAd =
    stickyAdData?.adsEnabled !== false &&
    !!stickyAdData?.items?.some(
      (a) =>
        a.enabled !== false &&
        (!!a.code?.trim() ||
          !!a.mediaUrl?.trim() ||
          !!a.url?.trim() ||
          !!a.vastUrl?.trim() ||
          !!a.vastTagUrl?.trim())
    );

  if (!isMounted || isClosed) return null;
  if (stickyAdLoading || !hasStickyAd) return null;

  // D5c: Suppress anchor ad when affiliate sticky bar is active
  if (affiliateBarActive) return null;

  return (
      <div
      data-sticky-footer-ad
      className={cn(
        isVisible ? 'is-visible' : '',
        className
      )}
      style={{ zIndex }}
    >
      <div className="sticky-ad-inner" style={{ position: 'relative' }}>
        <button
          onClick={handleClose}
          className="sticky-ad-close"
          aria-label="Close"
          type="button"
        >
          ×
        </button>
        <AdSlot
          pageType={adOverrideId ? undefined : resolvedPageType}
          position="sticky-footer"
          adOverrideId={adOverrideId}
          articleSlug={resolvedArticleSlug}
          width="728px"
          height="90px"
          mobileWidth="320px"
          mobileHeight="50px"
          responsive
        />
      </div>
    </div>
  );
}

// Hook for managing sticky footer ad state
export function useStickyFooterAd() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);
  const close = () => {
    setIsVisible(false);
    setIsClosed(true);
  };
  const reset = () => {
    setIsVisible(false);
    setIsClosed(false);
  };

  return {
    isVisible,
    isClosed,
    show,
    hide,
    close,
    reset,
  };
}

// Default export for backward compatibility
export default StickyFooterAd;