"use client";
import { BASE_URL } from '@/constants';
import { useState, useRef, useEffect, useCallback } from 'react';
import VolumeIcon from './VolumeIcon';
import { PlayOverlay } from './PlayOverlay';

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

  const carouselId = isModal ? 'postMediaCarousel-modal' : `postMediaCarousel-${postIndex}`;

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
      window.dispatchEvent(new Event("localVideoMuteChanged"));
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
      currentVideo.play().catch(() => { });
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
      }
    };

    const handleLocalChange = () => {
      const stored = localStorage.getItem("globalVideoMute");
      if (stored != null) setIsMuted(stored !== 'false');
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localVideoMuteChanged', handleLocalChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localVideoMuteChanged', handleLocalChange);
    };
  }, []);

  // Track carousel slide changes
  useEffect(() => {
    const handleSlide = (e: any) => {
      const newIndex = e.to;
      setActiveIndex(newIndex);
      videoRefs.current.forEach((video, i) => {
        if (video && i !== newIndex) video.pause();
      });
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('slid.bs.carousel', handleSlide);
      return () => carousel.removeEventListener('slid.bs.carousel', handleSlide);
    }
  }, []);

  if (!contentUrls?.length) {
    return <div className="w-100 h-100 d-flex align-items-center justify-content-center fs-6">No media</div>;
  }

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
              src={BASE_URL + url}
              muted={isMuted}
              loop
              playsInline
              preload="auto"
              onClick={togglePlay}
              style={{ cursor: 'pointer' }}
            />
            <PlayOverlay isPlaying={isPlaying} isModal={isModal} isInViewport={isInViewport} />
            <button
              className="position-absolute btn p-0 bg-body bg-opacity-75 rounded-circle border-0 shadow-lg"
              style={{ width: '48px', height: '48px', right: '20px', bottom: '20px', zIndex: 10 }}
              onClick={toggleMute}
              title={isMuted ? "Ativar som" : "Silenciar"}
            >
              <VolumeIcon isMuted={isMuted} />
            </button>
          </>
        ) : (
          <img src={BASE_URL + url} className="w-100 h-100 object-fit-contain" alt="Post media" />
        )}
      </div>
    );
  }

  // Carousel
  return (
    <div id={carouselId} className="carousel slide h-100 w-100 position-relative" data-bs-interval="false" data-bs-wrap="true"
      ref={carouselRef}>
      <button
        className="position-absolute btn p-0 bg-body bg-opacity-75 rounded-circle border-0 shadow-lg"
        style={{ width: '48px', height: '48px', right: '20px', bottom: '20px', zIndex: 10 }}
        onClick={toggleMute}
        title={isMuted ? "Ativar som" : "Silenciar"}
      >
        <VolumeIcon isMuted={isMuted} />
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
            className={`rounded-circle ${index === activeIndex ? 'active bg-body' : 'bg-body bg-opacity-50'}`}
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
                  src={BASE_URL + url}
                  className="object-fit-contain w-100 h-100"
                  muted={isMuted}
                  playsInline
                  preload={index === 0 ? "auto" : "metadata"}
                  loop
                  onClick={togglePlay}
                  style={{ cursor: 'pointer' }}
                />
                <PlayOverlay isPlaying={isPlaying} isModal={isModal} isInViewport={isInViewport} />
              </div>
            ) : (
              <img
                src={BASE_URL + url}
                className="w-100 h-100 object-fit-contain"
                alt={`Post media ${index + 1}`}
              />
            )}
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
        <span className="carousel-control-prev-icon bg-body bg-opacity-50 rounded-circle" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
        <span className="carousel-control-next-icon bg-body bg-opacity-50 rounded-circle" aria-hidden="true"></span>
      </button>
    </div>
  );
}