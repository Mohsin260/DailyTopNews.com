'use client';

import { useState } from 'react';
import { Icon } from '@/components/Layout/common/Icon';
import { VideoModal } from '@/components/Layout/common/VideoModal';

export interface ArticleMediaItem {
  url?: string;
  poster?: string;
  vastTagUrl?: string;
}

const VIDEO_EXTS = ['.mp4', '.webm', '.mov', '.m4v'];

const isVideoUrl = (url?: string) => {
  if (!url) return false;
  const clean = url.split('?')[0].split('#')[0].toLowerCase();
  return VIDEO_EXTS.some((ext) => clean.endsWith(ext));
};

const isImageUrl = (url?: string) => {
  if (!url) return false;
  const clean = url.split('?')[0].split('#')[0].toLowerCase();
  return (
    clean.endsWith('.jpg') ||
    clean.endsWith('.jpeg') ||
    clean.endsWith('.png') ||
    clean.endsWith('.webp') ||
    clean.endsWith('.gif') ||
    clean.endsWith('.avif') ||
    clean.endsWith('.svg')
  );
};

interface ArticleMediaBlockProps {
  media?: ArticleMediaItem;
  position: string;
  alt?: string;
  fallbackImage?: string;
  /** Render fallback image even when media.url is empty (hero only) */
  alwaysFallback?: boolean;
}

export const ArticleMediaBlock: React.FC<ArticleMediaBlockProps> = ({
  media,
  position,
  alt = '',
  fallbackImage,
  alwaysFallback = false,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const url = media?.url?.trim() || '';
  const vastUrl = media?.vastTagUrl?.trim() || '';
  const poster = media?.poster?.trim() || '';
  const video = isVideoUrl(url);

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(true);
  };

  // ── Video → reference-style poster + play icon → VideoModal ──────────────
  if (video) {
    const posterSrc = poster || fallbackImage || '';
    return (
      <>
        <div
          className="video_img"
          data-article-media={position}
          style={{ marginBottom: 12 }}
        >
          <a
            className="play_btn"
            href="#"
            onClick={openModal}
            aria-label={`Play ${alt || 'video'}`}
          >
            {posterSrc ? (
              <img src={posterSrc} alt={alt} />
            ) : (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  background: '#111',
                }}
              />
            )}
          </a>
          <a
            className="video_img_icon play_btn"
            href="#"
            onClick={openModal}
            aria-label={`Play ${alt || 'video'}`}
          >
            <Icon name="play" />
          </a>
        </div>

        <VideoModal
          isOpen={modalOpen}
          contentUrl={url}
          vastUrl={vastUrl}
          poster={posterSrc}
          title={alt}
          onClose={() => setModalOpen(false)}
        />
      </>
    );
  }

  // ── Image ────────────────────────────────────────────────────────────────
  if (url && isImageUrl(url)) {
    return (
      <div data-article-media={position} style={{ marginBottom: 12 }}>
        <img src={url} alt={alt} style={{ width: '100%', display: 'block' }} />
      </div>
    );
  }

  // Non-video, non-image URL (e.g. unknown CDN) — try as image if set
  if (url) {
    return (
      <div data-article-media={position} style={{ marginBottom: 12 }}>
        <img src={url} alt={alt} style={{ width: '100%', display: 'block' }} />
      </div>
    );
  }

  if (alwaysFallback && fallbackImage) {
    return (
      <div data-article-media={position} style={{ marginBottom: 12 }}>
        <img src={fallbackImage} alt={alt} style={{ width: '100%', display: 'block' }} />
      </div>
    );
  }

  return null;
};

export default ArticleMediaBlock;
