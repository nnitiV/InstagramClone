"use client";
import { PostComment, PostCommentTree } from "@/types/feed";

interface CommentItemProps {
    commentTree: PostCommentTree;
    onReplyClick: (commentId: number) => void;
    isReplying?: boolean;
    replyText?: string;
    onReplyChange?: (text: string) => void;
    onPostReply?: () => void;
    onCancelReply?: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
    commentTree,
    onReplyClick,
    isReplying = false,
    replyText = '',
    onReplyChange,
    onPostReply,
    onCancelReply
}) => {
    const comment = commentTree.comment;

    return (
        <div className="mb-2">
            <div className="d-flex">
                <img
                    src={"http://localhost:5000/" + comment.profilePictureUrl || "https://via.placeholder.com/32?text=👤"}
                    className="rounded-circle me-2"
                    style={{ width: "32px", height: "32px" }}
                    alt={`${comment.username}'s profile`}
                />
                <div className="flex-grow-1">
                    <p className="small mb-1">
                        <span className="fw-bold me-2">{comment.username}</span>
                        {comment.text}
                    </p>
                    <div className="d-flex align-items-center gap-2 small text-muted">
                        <small>{new Date(comment.createdAt).toLocaleString()}</small>
                        {!isReplying && (
                            <button
                                className="btn btn-link p-0 text-muted small fw-normal"
                                onClick={() => onReplyClick(comment.id)}
                            >
                                Reply
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {isReplying && (
                <div className="ms-5 mt-2 p-2 bg-light rounded">
                    <input
                        type="text"
                        className="form-control form-control-sm mb-1"
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => onReplyChange?.(e.target.value)}
                        autoFocus
                    />
                    <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-primary" onClick={onPostReply}>
                            Post
                        </button>
                        <button className="btn btn-sm btn-outline-secondary" onClick={onCancelReply}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentItem;
