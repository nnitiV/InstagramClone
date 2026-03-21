"use client";
import { PostCommentTree } from "@/types/feed";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/constants";
import { checkCommentLikeStatus, likeComment, unlikeComment } from "@/services/comment.like.service";

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
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isAnimating, setIsAnimation] = useState<boolean>(false);
    const comment = commentTree.comment;
    useEffect(() => {
        const likeStatus = async () => {
            let commentLikeStatus = await checkCommentLikeStatus(comment.id);
            console.log(commentLikeStatus);
            setIsLiked(commentLikeStatus)
        };
        likeStatus();   
    },[]);
    const likeUserComment = async () => {
        if(!isLiked) {
            const res = await likeComment(comment.id);
            console.log(res);
            setIsLiked(true);
            setIsAnimation(true);
            setTimeout(() => setIsAnimation(false), 300);
        } else {
            await unlikeComment(comment.id);
            setIsLiked(false);
        }
    }
    return (
        <div className="mb-2">
            <div className="d-flex">
                <img
                    src={comment.profilePictureUrl && comment.profilePictureUrl.length > 0 ? BASE_URL + comment.profilePictureUrl : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"}
                    className="rounded-circle me-2"
                    style={{ width: "32px", height: "32px" }}
                    alt={`${comment.username}'s profile`}
                />
                <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                        <p className="small mb-1">
                            <span className="fw-bold me-2">{comment.username}</span>
                            {comment.text}
                        </p>
                        <i className={`bi ${isLiked ? "bi-heart-fill text-danger" : "bi-heart"}`} role="button" onClick={likeUserComment} style={{
                            transform: isAnimating ? "scale(1.2)" : "scale(1)",
                            transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                        }}></i>
                    </div>
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
                <div className="ms-5 mt-2 p-2 rounded border">
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
