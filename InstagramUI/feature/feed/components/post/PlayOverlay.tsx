type PlayOverlayProps = {
    isPlaying: boolean;
    isInViewport: boolean;
    isModal: boolean;
}
export const PlayOverlay = ({isPlaying, isInViewport, isModal}: PlayOverlayProps) => {
    if (isPlaying || (!isInViewport && !isModal)) return null;
    return (
      <div className="position-absolute top-50 start-50 translate-middle shadow" style={{ opacity: 0.8, pointerEvents: 'none', zIndex: 10 }}>
        <svg width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
          <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
        </svg>
      </div>
    );
  };