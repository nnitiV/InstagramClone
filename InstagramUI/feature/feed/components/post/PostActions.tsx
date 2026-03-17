"use client";

import { useEffect, useState } from "react";
import { getPostLikeCount, likePost, unlikePost } from "../../services/feed.service";
// import { toggleLikePost, toggleSavePost } from "@/feature/feed/services/interaction-service"; // We'll make this later

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
        if (!isLiked) {
            const res = await likePost(postId);
            if (res) {
                setIsLiked(true);
                setLikeCount(prev => prev + 1);
                setIsAnimating(true);
                setTimeout(() => setIsAnimating(false), 300);
            }
        } else {
            const res = await unlikePost(postId);
            if (res) {
                setIsLiked(false);
                setLikeCount(prev => prev - 1);
            }
        }
    };

    const handleSave = async () => {
        setIsSaved(!isSaved);
    };

    return (
        <>
            <div className="d-flex align-items-center mt-2">
                <div className="d-flex align-items-center me-3 cursor-pointer" onClick={handleLike}>
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
                </div>
                <div className="d-flex align-items-center me-3 cursor-pointer" onClick={onCommentClick}>
                    <i className="bi bi-chat fs-4"></i>{commentCount > 0 && commentCount}
                </div>
                <div className="cursor-pointer">
                    <i className="bi bi-send fs-4"></i>
                </div>
                <div className="ms-auto cursor-pointer" onClick={handleSave}>
                    <i className={`bi ${isSaved ? "bi-bookmark-fill text-dark" : "bi-bookmark"} fs-4`}></i>
                </div>
            </div>
        </>
    );
}