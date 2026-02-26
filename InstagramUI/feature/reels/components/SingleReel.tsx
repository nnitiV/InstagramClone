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
    likes: string;
    comments: string;
    isLiked: boolean;
    isSaved: boolean;
  }
};

export default function SingleReel({ reel }: SingleReelProps) {
  const [isLiked, setIsLiked] = useState(reel.isLiked);
  const [isSaved, setIsSaved] = useState(reel.isSaved);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [commentsList, setCommentsList] = useState([
    {
      id: 1,
      username: "john_doe",
      text: "Great video! 🔥",
      time: "2h",
      replies: []
    }
  ]);
  const commentInputRef = useRef<HTMLInputElement>(null);

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [resetKey, setResetKey] = useState<number>(0);
  const containerRef = useRef(null);

  const handleSendComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        username: "you",
        text: commentText,
        time: "now",
        replies: []
      };
      setCommentsList(prev => [newComment, ...prev]);
      setCommentText("");
      if (commentInputRef.current) {
        commentInputRef.current.focus();
      }
    }
  };

  const handleSendReply = () => {
    if (replyText.trim() && replyingTo) {
      setCommentsList(prev => prev.map(comment =>
        comment.id === parseInt(replyingTo)
          ? {
            ...comment,
            replies: [...comment.replies, {
              id: Date.now(),
              username: "you",
              text: replyText,
              time: "now",
              replies: []
            }]
          }
          : comment
      ));
      setReplyText("");
      setReplyingTo(null);
    }
  };

  const handleReplyClick = (commentId: number) => {
    setReplyingTo(replyingTo === commentId.toString() ? null : commentId.toString());
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setResetKey(prev => prev + 1);
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
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

  const renderComments = (comments: any[], level = 0) => (
    <div style={{ paddingLeft: level * 20 }}>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-3">
          <div className="d-flex align-items-start p-3">
            <img src={reel.profilePic} alt="" className="rounded-circle me-3 flex-shrink-0" style={{ width: '32px', height: '32px' }} />
            <div className="flex-grow-1">
              <strong>{comment.username}</strong>
              <span className="text-muted small mx-2">·</span>
              <span className="text-muted small">{comment.time}</span>
              <p className="mb-2">{comment.text}</p>
              <small className="cursor-pointer text-primary" onClick={() => handleReplyClick(comment.id)}>
                Reply
              </small>
            </div>
          </div>

          {replyingTo === comment.id.toString() && (
            <div className="p-3 pt-0">
              <div className="input-group input-group-sm">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Replying to ${commentsList.find(c => c.id === parseInt(replyingTo))?.username}...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendReply()}
                />
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                >
                  Post
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    setReplyText("");
                    setReplyingTo(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            renderComments(comment.replies, level + 1)
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="w-100 d-flex justify-content-center ms-4 my-3" style={{ scrollSnapAlign: "start" }} ref={containerRef}>
        <div className="d-flex justify-content-center align-items-center rounded rounded-3"
         onClick={() => setIsPlaying(prev => !prev)} 
         style={{ background: "rgba(0,0,0,1)", height: "95vh", width: 'min(85%, 400px)', aspectRatio: '9/16' }}>
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
        <ul className="d-flex flex-column justify-content-end list-unstyled align-items-center ms-2" style={{ gap: '1rem' }} >
          <li className="d-flex flex-column align-items-center cursor-pointer" onClick={() => setIsLiked(!isLiked)}>
            <i className={`bi ${isLiked ? 'bi-heart-fill text-danger' : 'bi-heart'} fs-5 m-0 p-0`}></i>
            <span className="p-0 m-0">{reel.likes}</span>
          </li>
          <li className="d-flex flex-column align-items-center mt-3 cursor-pointer" onClick={() => setShowComments(true)}>
            <i className="bi bi-chat flip-horizontal fs-5 m-0 p-0"></i>
            <span className="p-0 m-0">{reel.comments}</span>
          </li>
          <li className="mt-3 cursor-pointer" onClick={() => setShowShare(true)}>
            <i className="bi bi-send fs-5 m-0 p-0"></i>
          </li>
          <li className="mt-3 cursor-pointer" onClick={() => setIsSaved(!isSaved)}>
            <i className={`bi ${isSaved ? 'bi-bookmark-fill text-warning' : 'bi-bookmark'} fs-5 m-0 p-0`}></i>
          </li>
          <li className="mt-3 cursor-pointer" onClick={() => setShowMore(true)}>
            <i className="bi bi-three-dots fs-5 m-0 p-0"></i>
          </li>
          <li className="mt-3 cursor-pointer text-center">
            <img src={reel.profilePic} alt="" className="rounded-circle w-50" />
          </li>
        </ul>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
<div className="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{parseInt(reel.comments) + commentsList.length} Comments</h5>
                <button type="button" className="btn-close" onClick={() => setShowComments(false)}></button>
              </div>
              <div className="modal-body p-0" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {/* Reel post preview */}
                <div className="d-flex align-items-start mb-3 p-3 border-bottom">
                  <img src={reel.profilePic} alt="" className="rounded-circle me-3" style={{ width: '40px', height: '40px' }} />
                  <div>
                    <strong>{reel.username}</strong>
                    <p className="mb-0 small text-muted">{reel.caption}</p>
                  </div>
                </div>

                {/* Render all comments + replies */}
                {renderComments(commentsList)}
              </div>
              <div className="modal-footer border-top p-3">
                <div className="input-group">
                  <input
                    ref={commentInputRef}
                    type="text"
                    className="form-control"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendComment()}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleSendComment}
                    disabled={!commentText.trim()}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShare && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Share Reel</h5>
                <button type="button" className="btn-close" onClick={() => setShowShare(false)}></button>
              </div>
              <div className="modal-body text-center py-4">
                <div className="mb-4">
                  <i className="bi bi-share fs-1 text-muted"></i>
                </div>
                <h6>Share to your story</h6>
                <p className="text-muted small">Your followers will be able to see this in their stories within 24 hours.</p>
                <button className="btn btn-primary w-100 mb-2">Post</button>
                <button className="btn btn-outline-secondary w-100" onClick={() => setShowShare(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* More Options Modal */}
      {showMore && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content rounded-3 shadow">
              <div className="modal-header pb-2 pt-3 border-0 rounded-top-3">
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowMore(false)}
                  style={{ marginLeft: 'auto' }}
                ></button>
              </div>
              <div className="list-group list-group-flush rounded-bottom-3 overflow-hidden">
                <button className="list-group-item list-group-item-action px-4 py-3 border-0 border-end-0 border-start-0" onClick={() => console.log('Report')}>
                  <i className="bi bi-flag me-3 text-danger"></i>Report
                </button>
                <button className="list-group-item list-group-item-action px-4 py-3 border-0 border-end-0 border-start-0" onClick={() => console.log('Turn off comments')}>
                  <i className="bi bi-chat-square-dots me-3 text-muted"></i>Turn off comments
                </button>
                <button className="list-group-item list-group-item-action px-4 py-3 border-0 border-end-0 border-start-0" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                  <i className="bi bi-link-45deg me-3 text-primary"></i>Copy link
                </button>
                <button className="list-group-item list-group-item-action px-4 py-3 border-0 border-end-0 border-start-0" onClick={() => setShowShare(true)}>
                  <i className="bi bi-share me-3 text-info"></i>Share to...
                </button>
              </div>
            </div>
          </div>
        </div>

      )}
    </>
  )
}
