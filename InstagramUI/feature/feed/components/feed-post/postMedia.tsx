"use client";
import { useState, useRef, useEffect, useCallback } from 'react';

interface PostMediaProps {
  contentUrls: string[];
}

const isVideo = (url: string): boolean => {
  return /\.(mp4|webm|ogg|mov|avi)$/i.test(url);
};

export default function PostMedia({ contentUrls }: PostMediaProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const toggleMute = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Evita que o clique no mute pause o vídeo
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    videoRefs.current.forEach(video => {
      if (video) video.muted = newMutedState;
    });
  }, [isMuted]);

  const togglePlay = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlaying(prev => !prev);
  }, []);

  // Controla o Play/Pause do vídeo ativo
  useEffect(() => {
    const currentVideo = videoRefs.current[contentUrls?.length === 1 ? 0 : activeIndex];
    if (!currentVideo) return;

    if (isPlaying) {
      currentVideo.play().catch(() => {});
    } else {
      currentVideo.pause();
    }
  }, [isPlaying, activeIndex, contentUrls?.length]);

  // Controla o evento de slide do carrossel
  useEffect(() => {
    const handleSlide = (e: Event) => {
      const carousel = (window as any).bootstrap?.Carousel?.getInstance(carouselRef.current!);
      if (carousel && carousel._activeElement) {
        const newIndex = Array.from(carouselRef.current!.querySelectorAll('.carousel-item')).indexOf(carousel._activeElement);
        if (newIndex !== -1) {
          setActiveIndex(newIndex);
          setIsPlaying(true); // Força o autoplay no novo slide
          
          // Pausa todos os outros vídeos e reseta o tempo
          videoRefs.current.forEach((video, i) => {
            if (video && i !== newIndex) {
              video.pause();
              video.currentTime = 0;
            }
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

  // Garante que o estado de mute persista
  useEffect(() => {
    videoRefs.current.forEach(video => {
      if (video) video.muted = isMuted;
    });
  }, [isMuted]);

  if (!contentUrls?.length) {
    return <div className="w-100 h-100 bg-dark d-flex align-items-center justify-content-center text-white fs-6">No media</div>;
  }

  const VolumeIcon = () => (
    <span className="d-flex align-items-center justify-content-center w-100 h-100">
      {isMuted ? (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.283.495l-4.714 2.912a.5.5 0 0 1-.771-.436V3.064a.5.5 0 0 1 .717-.495L6.717 3.55z"/>
          <path d="M12.383 3.55A.5.5 0 0 1 13 4v8a.5.5 0 0 1-.483.496l-1.302.76a.5.5 0 0 1-.617-.417V3.417a.5.5 0 0 1 .619-.496l1.302.76z"/>
        </svg>
      ) : (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.445 4.515a2.06 2.06 0 0 1 2.11 0 2.457 2.457 0 0 1 0 3.97l-.248.155a2.06 2.06 0 0 1 0 3.283l.248.155a2.457 2.457 0 0 1-2.11 3.97l-1.302-.76a1.457 1.457 0 0 1-1.617-.417V5.935a1.457 1.457 0 0 1 1.617-.416l1.302.76z"/>
          <path d="M3.717 3.55A.5.5 0 0 1 4 4v8a.5.5 0 0 1-.283.495l-4.714 2.912A.5.5 0 0 1 0 14.028V1.972a.5.5 0 0 1 .717-.495L3.717 3.55z"/>
        </svg>
      )}
    </span>
  );

  const PlayOverlay = () => {
    if (isPlaying) return null;
    return (
      <div className="position-absolute top-50 start-50 translate-middle text-white shadow" style={{ opacity: 0.8, pointerEvents: 'none', zIndex: 10 }}>
        <svg width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
          <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
        </svg>
      </div>
    );
  };

  if (contentUrls.length === 1) {
    const url = contentUrls[0];
    return (
      <div className="w-100 h-100 position-relative">
        {isVideo(url) ? (
          <>
            <video
              ref={el => { if (el) videoRefs.current[0] = el; }}
              className="w-100 h-100 object-fit-cover"
              src={url}
              autoPlay
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
              style={{ width: '48px', height: '48px', right: '20px', bottom: '20px', zIndex: 9999 }}
              onClick={toggleMute}
              title={isMuted ? "Ativar som" : "Silenciar"}
            >
              <VolumeIcon />
            </button>
          </>
        ) : (
          <img src={url} className="w-100 h-100 object-fit-cover" alt="Post media" />
        )}
      </div>
    );
  }

  return (
    <div id="postMediaCarousel" className="carousel slide h-100 w-100 position-relative" data-bs-interval="false" data-bs-wrap="true" ref={carouselRef}>
      <button
        className="position-absolute btn p-0 bg-black bg-opacity-75 text-white rounded-circle border-0 shadow-lg"
        style={{ width: '48px', height: '48px', right: '20px', bottom: '20px', zIndex: 9999 }}
        onClick={toggleMute}
        title={isMuted ? "Ativar som" : "Silenciar"}
      >
        <i className={`bi ${isMuted ? 'bi-volume-mute' : 'bi-volume-up-fill'}`} style={{ fontSize: '20px' }}></i>
      </button>

      <div className="carousel-indicators position-absolute bottom-0 start-0 mb-5 ms-3">
        {contentUrls.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#postMediaCarousel"
            data-bs-slide-to={index.toString()}
            className={`rounded-circle ${index === activeIndex ? 'active bg-white' : 'bg-white bg-opacity-50'}`}
            style={{ width: '10px', height: '10px' }}
          />
        ))}
      </div>

      <div className="carousel-inner h-100 w-100">
        {contentUrls.map((url, index) => (
          <div key={index} className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}>
            {isVideo(url) ? (
              <div className="w-100 h-100 position-relative">
                <video
                  ref={el => { if (el) videoRefs.current[index] = el; }}
                  src={url}
                  className="w-100 h-100 object-fit-cover"
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
                className="w-100 h-100 object-fit-cover"
                alt={`Post media ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            )}
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#postMediaCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon bg-black bg-opacity-50 rounded-circle" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#postMediaCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon bg-black bg-opacity-50 rounded-circle" aria-hidden="true"></span>
      </button>
    </div>
  );
}