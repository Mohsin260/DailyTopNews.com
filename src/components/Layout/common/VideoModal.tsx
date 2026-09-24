'use client';

import { Icon } from './Icon';
import VastVideoPlayer from '@/components/ui/VastVideoPlayer';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentUrl?: string;
  vastUrl?: string;
  poster?: string;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  contentUrl,
  vastUrl,
  poster,
  title,
}) => {
  if (!isOpen) return null;

  const hasVideo = Boolean(contentUrl || vastUrl);

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose} aria-label="Close modal">
          <Icon name="times" />
        </button>
        {hasVideo ? (
          <VastVideoPlayer
            vastUrl={vastUrl}
            contentUrl={contentUrl}
            poster={poster}
            position="video-modal"
            autoplay
            muted={false}
            loop={false}
          />
        ) : (
          <div className="video-modal-unavailable">
            <p>{title || 'Video'} unavailable</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
