"use client";

import { useState } from "react";
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
    const [isSaved, setIsSaved] = useState(initialIsSaved);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleLike = async () => {
        const previousLiked = isLiked;
        const newLiked = !isLiked;
        setIsLiked(newLiked);
        setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
        if (newLiked) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 300);
        }
        try {
            console.log(`Toggled like for post ${postId}`);
        } catch (error) {
            setIsLiked(previousLiked);
            setLikeCount(prev => previousLiked ? prev + 1 : prev - 1);
            console.error("Failed to like post");
        }
    };

    const handleSave = async () => {
        setIsSaved(!isSaved);
        console.log(`Toggled save for post ${postId}`);
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
                    <i className="bi bi-chat fs-4"></i>
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