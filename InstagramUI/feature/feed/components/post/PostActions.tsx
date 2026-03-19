"use client";

import { useState } from "react";
import { likePost, unlikePost } from "../../services/feed.service";

type PostActionsProps = {
    postId: number;
    initialIsLiked: boolean;
    initialLikeCount: number;
    initialIsSaved?: boolean;
    onCommentClick: () => void;
};

export default function PostActions({
    postId,
    initialIsLiked,
    initialLikeCount,
    initialIsSaved = false,
    onCommentClick
}: PostActionsProps) {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const [commentCount, setCommentCount] = useState(0);
    const [isSaved, setIsSaved] = useState(initialIsSaved);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleLike = async () => {
        const previousIsLiked = isLiked;
        setIsLiked(!previousIsLiked);
        setLikeCount(prev => previousIsLiked ? prev - 1 : prev + 1);

        if (!previousIsLiked) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 300);
        }

        try {
            if (!previousIsLiked) {
                await likePost(postId); 
            } else {
                await unlikePost(postId);
            }
        } catch (error) {
            setIsLiked(previousIsLiked);
            setLikeCount(prev => previousIsLiked ? prev + 1 : prev - 1);

            if (previousIsLiked) {
                setIsAnimating(true);
                setTimeout(() => setIsAnimating(false), 300);
            }
        }
    };

    const handleSave = async () => {
        setIsSaved(!isSaved);
    };

    return (
        <>
            <div className="d-flex align-items-center mt-2">
                <button className="btn btn-link p-0 border-0 text-body text-decoration-none" onClick={handleLike}>
                    <i
                        className={`bi ${isLiked ? "bi-heart-fill text-danger" : "bi-heart"} fs-4`}
                        style={{
                            transform: isAnimating ? "scale(1.2)" : "scale(1)",
                            transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                        }}
                    ></i>
                    {likeCount > 0 && (
                        <span className="ms-2 fw-semibold">{likeCount}</span>
                    )}
                </button>
                <button className="btn btn-link p-0 border-0 text-body text-decoration-none" onClick={onCommentClick}>
                    <i className="bi bi-chat fs-4"></i>{commentCount > 0 && commentCount}
                </button>
                <div className="cursor-pointer">
                    <i className="bi bi-send fs-4"></i>
                </div>
                <div className="ms-auto cursor-pointer" onClick={handleSave}>
                    <i className={`bi ${isSaved ? "bi-bookmark-fill" : "bi-bookmark"} fs-4`}></i>
                </div>
            </div>
        </>
    );
}