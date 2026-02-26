"use client";
import { useState, useRef, useEffect, useCallback } from 'react';

interface PostMediaProps {
  contentUrls: string[];
  postIndex?: number;
  hasSelectedPost?: boolean;
  isModal?: boolean;
}

const isVideo = (url: string): boolean => {
  return /\.(mp4|webm|ogg|mov|avi)$/i.test(url);
};

export default function PostMedia({
  contentUrls,
  postIndex = 0,
  hasSelectedPost = false,
  isModal = false
}: PostMediaProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(hasSelectedPost);
  const [isInViewport, setIsInViewport] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const carouselId = isModal
    ? 'postMediaCarousel-modal'
    : `postMediaCarousel-${postIndex}`;

  // Load mute setting from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('globalVideoMute');
      if (stored !== null) {
        setIsMuted(stored !== 'false');
      }
    }
  }, []);

  const toggleMute = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (typeof window !== 'undefined') {
      localStorage.setItem('globalVideoMute', newMutedState.toString());
    }
    videoRefs.current.forEach(video => {
      if (video) video.muted = newMutedState;
    });
  }, [isMuted]);

  const togglePlay = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setIsPlaying(prev => !prev);
  }, []);

  // Intersection Observer for auto-play/pause
  useEffect(() => {
    const currentElement = carouselRef.current;
    if (!currentElement) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const fullyVisible = entry.intersectionRatio >= 1.0;
        setIsInViewport(fullyVisible);

        if (fullyVisible && !isModal) {
          setIsPlaying(true);
        } else if (!isModal) {
          videoRefs.current.forEach(video => {
            if (video) video.pause();
          });
          setIsPlaying(false);
        }
      },
      { threshold: 1.0, rootMargin: '0px' }
    );

    observerRef.current.observe(currentElement);
    return () => observerRef.current?.disconnect();
  }, [isModal]);

  // Control active video playback
  useEffect(() => {
    const currentVideo = videoRefs.current[contentUrls?.length === 1 ? 0 : activeIndex];
    if (!currentVideo) return;

    if (!isInViewport && !isModal) {
      currentVideo.pause();
      return;
    }

    if (hasSelectedPost && !isModal) {
      currentVideo.pause();
    } else if (isPlaying) {
      currentVideo.play().catch(() => {});
    } else {
      currentVideo.pause();
    }
  }, [isPlaying, hasSelectedPost, activeIndex, contentUrls?.length, isInViewport, isModal]);

  // Sync mute state to all videos
  useEffect(() => {
    videoRefs.current.forEach(video => {
      if (video) video.muted = isMuted;
    });
  }, [isMuted]);

  // Global mute sync across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'globalVideoMute' && typeof window !== 'undefined') {
        const newMuteState = e.newValue !== 'false';
        setIsMuted(newMuteState);
        videoRefs.current.forEach(video => {
          if (video) video.muted = newMuteState;
        });
      }
    };

    const checkStorage = () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('globalVideoMute');
        if (stored !== null && stored !== isMuted.toString()) {
          const muteState = stored !== 'false';
          setIsMuted(muteState);
          videoRefs.current.forEach(video => {
            if (video) video.muted = muteState;
          });
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(checkStorage, 100);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [isMuted]);

  // Track carousel slide changes
  useEffect(() => {
    const handleSlide = (e: Event) => {
      const carousel = (window as any).bootstrap?.Carousel?.getInstance(carouselRef.current!);
      if (carousel && carousel._activeElement) {
        const newIndex = Array.from(carouselRef.current!.querySelectorAll('.carousel-item')).indexOf(carousel._activeElement);
        if (newIndex !== -1) {
          setActiveIndex(newIndex);
          videoRefs.current.forEach((video, i) => {
            if (video && i !== newIndex) video.pause();
          });
        }
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('slid.bs.carousel', handleSlide);
      return () => carousel.removeEventListener('slid.bs.carousel', handleSlide);
    }
  }, []);

  if (!contentUrls?.length) {
    return <div className="w-100 h-100 bg-dark d-flex align-items-center justify-content-center text-white fs-6">No media</div>;
  }

  const VolumeIcon = () => (
    <span className="d-flex align-items-center justify-content-center w-100 h-100">
      {isMuted ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          <path d="M4.5 5.5L17.5 18.5M19.5 5.5L6.5 18.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
      )}
    </span>
  );

  const PlayOverlay = () => {
    if (isPlaying || (!isInViewport && !isModal)) return null;
    return (
      <div className="position-absolute top-50 start-50 translate-middle text-white shadow" style={{ opacity: 0.8, pointerEvents: 'none', zIndex: 10 }}>
        <svg width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
          <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
        </svg>
      </div>
    );
  };

  // Single media
  if (contentUrls.length === 1) {
    const url = contentUrls[0];
    return (
      <div className="w-100 h-100 position-relative" ref={carouselRef}>
        {isVideo(url) ? (
          <>
            <video
              ref={el => { if (el) videoRefs.current[0] = el; }}
              className="w-100 h-100 object-fit-contain"
              src={url}
              muted={isMuted}
              loop
              playsInline
              preload="auto"
              onClick={togglePlay}
              style={{ cursor: 'pointer' }}
            />
            <PlayOverlay />
            <button
              className="position-absolute btn p-0 bg-black bg-opacity-75 text-white rounded-circle border-0 shadow-lg"
              style={{ width: '48px', height: '48px', right: '20px', bottom: '20px', zIndex: 10 }}
              onClick={toggleMute}
              title={isMuted ? "Ativar som" : "Silenciar"}
            >
              <VolumeIcon />
            </button>
          </>
        ) : (
          <img src={url} className="w-100 h-100 object-fit-contain" alt="Post media" />
        )}
      </div>
    );
  }

  // Carousel
  return (
    <div id={carouselId} className="carousel bg-dark slide h-100 w-100 position-relative" data-bs-interval="false" data-bs-wrap="true" ref={carouselRef}>
      <button
        className="position-absolute btn p-0 bg-black bg-opacity-75 text-white rounded-circle border-0 shadow-lg"
        style={{ width: '48px', height: '48px', right: '20px', bottom: '20px', zIndex: 10 }}
        onClick={toggleMute}
        title={isMuted ? "Ativar som" : "Silenciar"}
      >
        <VolumeIcon />
      </button>

      {/* Indicators */}
      <div
        className="carousel-indicators position-absolute start-50 translate-middle-x mx-auto"
        style={{
          display: contentUrls.length > 1 ? 'flex' : 'none',
          bottom: '30px',
          zIndex: 5
        }}
      >
        {contentUrls.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide-to={index.toString()}
            className={`rounded-circle ${index === activeIndex ? 'active bg-white' : 'bg-white bg-opacity-50'}`}
            style={{ width: '10px', height: '10px', margin: '0 4px' }}
          />
        ))}
      </div>

      {/* Carousel inner - always w-100 */}
      <div className="carousel-inner h-100 w-100">
        {contentUrls.map((url, index) => (
          <div key={index} className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}>
            {isVideo(url) ? (
              <div className="position-relative w-100 h-100">
                <video
                  ref={el => { if (el) videoRefs.current[index] = el; }}
                  src={url}
                  className="object-fit-contain w-100 h-100"
                  muted={isMuted}
                  playsInline
                  preload={index === 0 ? "auto" : "metadata"}
                  loop
                  onClick={togglePlay}
                  style={{ cursor: 'pointer' }}
                />
                <PlayOverlay />
              </div>
            ) : (
              <img
                src={url}
                className="w-100 h-100 object-fit-contain"
                alt={`Post media ${index + 1}`}
              />
            )}
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
        <span className="carousel-control-prev-icon bg-black bg-opacity-50 rounded-circle" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
        <span className="carousel-control-next-icon bg-black bg-opacity-50 rounded-circle" aria-hidden="true"></span>
      </button>
    </div>
  );
}