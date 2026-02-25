import React from 'react'

type RenderCommentsProps = {
  comments: any[];
  level?: number; // Transformei em opcional para facilitar a primeira chamada
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
  };
  // Estados e funções que vieram do SingleReel
  replyingTo: string | null;
  handleReplyClick: (commentId: number) => void;
  replyText: string;
  setReplyText: (text: string) => void;
  handleSendReply: () => void;
  setReplyingTo: (id: string | null) => void;
  commentsList: any[];
}

export default function RenderComments({
  comments, 
  level = 0, 
  reel,
  replyingTo,
  handleReplyClick,
  replyText,
  setReplyText,
  handleSendReply,
  setReplyingTo,
  commentsList
} : RenderCommentsProps) {
  return (
    <div style={{ paddingLeft: level * 20 }}>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-3">
          <div className="d-flex align-items-start p-3 pb-0">
            <img src={reel.profilePic} alt="" className="rounded-circle me-3 flex-shrink-0" style={{ width: '32px', height: '32px' }} />
            <div className="flex-grow-1">
              <strong>{comment.username}</strong>
              <span className="text-muted small mx-2">·</span>
              <span className="text-muted small">{comment.time}</span>
              <p className="mb-2">{comment.text}</p>
              <small className="cursor-pointer text-primary fw-bold" 
              onClick={() => handleReplyClick(comment.id)}>
                Reply
              </small>
            </div>
          </div>

          {replyingTo === comment.id.toString() && (
            <div className="p-3 pt-2">
              <div className="input-group input-group-sm">
                <input
                  type="text"
                  className="form-control rounded-start-pill shadow-none border-secondary border-opacity-50"
                  placeholder={`Replying to ${commentsList.find(c => c.id === parseInt(replyingTo || "0"))?.username}...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendReply()}
                />
                <button
                  className="btn btn-outline-secondary border-secondary border-opacity-50"
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                >
                  Post
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary rounded-end-pill border-secondary border-opacity-50"
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

          {/* Chamada Recursiva do próprio componente para as respostas */}
          {comment.replies && comment.replies.length > 0 && (
            <RenderComments 
              comments={comment.replies} 
              level={level + 1} 
              reel={reel}
              replyingTo={replyingTo}
              handleReplyClick={handleReplyClick}
              replyText={replyText}
              setReplyText={setReplyText}
              handleSendReply={handleSendReply}
              setReplyingTo={setReplyingTo}
              commentsList={commentsList}
            />
          )}
        </div>
      ))}
    </div>
  )
}