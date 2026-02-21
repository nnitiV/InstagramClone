import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

export type SingleReelProps = {
  reel: {
    id: number;
    username: string;
    profilePic: string;
    videoUrl: string;
    caption: string;
    audioName: string;
    likes: string; // Keep as string if it includes 'K' or 'M'
    comments: string;
    isLiked: boolean;
    isSaved: boolean;
  }
};

export default function SingleReel({ reel }: SingleReelProps) {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [resetKey, setResetKey] = useState<number>(0);
  const containerRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
          setResetKey(prev => prev + 1); 
          setIsPlaying(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.7,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  return (
    <div className="w-50 d-flex my-3" style={{ scrollSnapAlign: "start" }} ref={containerRef}>
      <div className="d-flex justify-content-center align-items-center rounded rounded-3" onClick={() => setIsPlaying(prev => !prev)} style={{ background: "rgba(0,0,0,1)", width: "27vw", height: "95vh" }}>
        {/* <video src="blob:https://www.instagram.com/464b7444-c101-4960-be77-6104310c49ae"></video> */}
        <ReactPlayer
          key={resetKey}
          src={reel.videoUrl}
          autoPlay
          loop
          playing={isPlaying}
          muted={isMuted}
          width='100%'
          height='100%'
        />
      </div>
      <ul className="d-flex flex-column justify-content-end align-items-center px-4 list-unstyled">
        <li className="d-flex flex-column align-items-center cursor-pointer">
          <i className="bi bi-heart fs-5 m-0 p-0"></i>
          <span className="p-0 m-0">{reel.likes}</span>
        </li>
        <li className="d-flex flex-column align-items-center mt-3 cursor-pointer">
          <i className="bi bi-chat flip-horizontal fs-5 m-0 p-0"></i>
          <span className="p-0 m-0">{reel.comments}</span>
        </li>
        <li className="mt-3 cursor-pointer">
          <i className="bi bi-send fs-5 m-0 p-0"></i>
        </li>
        <li className="mt-3 cursor-pointer">
          <i className="bi bi-bookmark fs-5 m-0 p-0"></i>
        </li>
        <li className="mt-3 cursor-pointer">
          <i className="bi bi-three-dots fs-5 m-0 p-0"></i>
        </li>
        <li className="mt-3 cursor-pointer text-center">
          <img src={reel.profilePic} alt="" className="rounded-circle w-50" />
        </li>
      </ul>
    </div>
  )
}
