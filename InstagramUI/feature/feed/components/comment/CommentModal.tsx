"use client";

import PostMedia from "../post/PostMedia";
import PostActions from "../post/PostActions";
import { Post, PostComment, PostCommentTree } from "@/types/feed";
import { useEffect, useState, useCallback, useRef } from "react";
import { getPostComments } from "../../services/feed.service";
import CommentsList from "./CommentList";

type CommentModalProps = {
    post: Post;
    onClose: () => void;
};

export default function CommentModal({ post, onClose }: CommentModalProps) {
    if (!post) return null;

    const [comments, setComments] = useState<PostComment[]>([]);
    const [tree, setTree] = useState<PostCommentTree[]>([]);
    const [replyTarget, setReplyTarget] = useState<number | null>(null);
    const [replyText, setReplyText] = useState<string>('');
    const [newCommentText, setNewCommentText] = useState<string>('');

    const mediaContainerRef = useRef<HTMLDivElement>(null);

    const buildCommentTree = useCallback((comments: PostComment[]): PostCommentTree[] => {
        const commentMap: Record<number, PostCommentTree> = {};
        const roots: PostCommentTree[] = [];

        comments.forEach(comment => {
            commentMap[comment.id] = { comment, replies: [] };
        });

        comments.forEach(comment => {
            const parentId = comment.parentCommentId;
            if (parentId !== null && commentMap[parentId]) {
                commentMap[parentId].replies.push(commentMap[comment.id]);
            } else {
                roots.push(commentMap[comment.id]);
            }
        });

        return roots;
    }, []);

    const insertComment = useCallback((tree: PostCommentTree[], parentId: number, newComment: PostCommentTree): void => {
        for (const commentTree of tree) {
            if (commentTree.comment.id === parentId) {
                commentTree.replies.push(newComment);
                return;
            }
            if (commentTree.replies.length > 0) {
                insertComment(commentTree.replies, parentId, newComment);
            }
        }
    }, []);

    const addReply = useCallback((parentId: number, text: string) => {
        const newComment: PostComment = {
            id: Date.now(),
            text,
            postId: post.id,
            userId: 999,
            username: 'You',
            profilePictureUrl: post.profilePictureUrl || '',
            parentCommentId: parentId,
            createdAt: new Date().toISOString()
        };

        const newCommentTree: PostCommentTree = {
            comment: newComment,
            replies: []
        };

        setTree(prevTree => {
            const newTree = JSON.parse(JSON.stringify(prevTree));
            insertComment(newTree, parentId, newCommentTree);
            setComments(prevComments => [...prevComments, newComment]);
            return newTree;
        });

        setReplyTarget(null);
        setReplyText('');
    }, [post.id, post.profilePictureUrl, insertComment]);

    const addTopLevelComment = useCallback((text: string) => {
        const newComment: PostComment = {
            id: Date.now(),
            text,
            postId: post.id,
            userId: 999,
            username: 'You',
            profilePictureUrl: post.profilePictureUrl || '',
            parentCommentId: null,
            createdAt: new Date().toISOString()
        };

        setComments(prev => [...prev, newComment]);
        setTree(buildCommentTree([...comments, newComment]));
        setNewCommentText('');
    }, [post.id, post.profilePictureUrl, comments, buildCommentTree]);

    // Load comments (mock data)
    useEffect(() => {
        const load = async () => {
            try {
                const apiComments = await getPostComments(post.id);
                let finalComments: PostComment[] = apiComments;

                if (finalComments.length === 0) {
                    finalComments = [
                        {
                            id: 1,
                            text: "This building is absolutely massive! Great shot. 🔥",
                            postId: 999,
                            userId: 101,
                            username: "ArchitectureLover",
                            profilePictureUrl: "https://i.pravatar.cc/150?u=101",
                            parentCommentId: null,
                            createdAt: "2026-02-04T10:00:00Z"
                        },
                        // Add other mock comments as needed
                    ];
                }
                setComments(finalComments);
                setTree(buildCommentTree(finalComments));
            } catch (error) {
                console.error('Failed to load comments:', error);
            }
        };
        load();
    }, [post.id, buildCommentTree]);

    // Manually initialize Bootstrap carousel after modal opens
    useEffect(() => {
        if (typeof window !== 'undefined' && mediaContainerRef.current) {
            const carouselElement = mediaContainerRef.current.querySelector('.carousel');
            if (carouselElement && !carouselElement.classList.contains('slide')) {
                const bootstrap = (window as any).bootstrap;
                if (bootstrap && bootstrap.Carousel) {
                    new bootstrap.Carousel(carouselElement, {
                        interval: false,
                        wrap: true
                    });
                }
            }
        }
    }, []);

    return (
        <>
            {/* Responsive style for media column - adjust 40vh to your liking */}
            <style jsx>{`
                .modal-media-col {
                    height: 40vh;  /* Change this value for mobile height */
                    min-height: 300px;
                    max-height: 60vh;
                    flex-shrink: 0;
                }
                @media (min-width: 768px) {
                    .modal-media-col {
                        height: 100% !important;
                        max-height: none;
                        min-height: 0;
                    }
                }
            `}</style>

            <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} onClick={onClose}>
                <div
                    className="modal-dialog modal-xl modal-dialog-centered"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-content overflow-hidden" style={{ height: "100vh", maxHeight: "90vh", borderRadius: "4px" }}>
                        <div className="d-flex flex-column flex-md-row h-100">
                            {/* Left column - media */}
                            <div
                                ref={mediaContainerRef}
                                className="col-12 col-md-7 bg-black d-flex align-items-center justify-content-center modal-media-col"
                            >
                                <div className="w-100 h-100">
                                    <PostMedia contentUrls={post.contentUrls} isModal={true} hasSelectedPost />
                                </div>
                            </div>

                            {/* Right column - comments - now with flex-grow on small, no h-100 */}
                            <div className="col-12 col-md-5 d-flex flex-column bg-white flex-grow-1 flex-md-grow-0">
                                {/* Header */}
                                <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={post.profilePictureUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                            className="rounded-circle border me-2"
                                            style={{ width: "32px", height: "32px", objectFit: "cover" }}
                                        />
                                        <span className="fw-bold small">{post.authorName}</span>
                                    </div>
                                    <button className="btn-close small" onClick={onClose}></button>
                                </div>

                                {/* Scrollable comments area */}
                                <div className="flex-grow-1 overflow-y-auto p-3">
                                    {/* Post caption */}
                                    <div className="d-flex mb-3">
                                        <img
                                            src={post.profilePictureUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                            className="rounded-circle me-2"
                                            style={{ width: "32px", height: "32px", objectFit: "cover" }}
                                        />
                                        <p className="small mb-0">
                                            <span className="fw-bold me-2">{post.authorName}</span>
                                            {post.caption}
                                        </p>
                                    </div>

                                    {/* Comments tree */}
                                    {tree.length > 0 ? (
                                        <CommentsList
                                            comments={tree}
                                            replyTarget={replyTarget}
                                            replyText={replyText}
                                            onReplyClick={setReplyTarget}
                                            onReplyChange={setReplyText}
                                            onPostReply={() => replyTarget && replyText && addReply(replyTarget, replyText)}
                                            onCancelReply={() => {
                                                setReplyTarget(null);
                                                setReplyText('');
                                            }}
                                        />
                                    ) : (
                                        <p className="text-center text-muted small py-5">No comments yet.</p>
                                    )}
                                </div>

                                {/* Footer with actions and input */}
                                <div className="border-top p-3">
                                    <PostActions
                                        postId={post.id}
                                        initialIsLiked={post.isLiked}
                                        initialLikeCount={post.likeCount}
                                        onCommentClick={() => {}}
                                    />
                                    <div className="mt-3 position-relative border-top pt-2">
                                        <input
                                            type="text"
                                            className="form-control border-0 shadow-none small pe-5"
                                            placeholder="Add a comment..."
                                            value={newCommentText}
                                            onChange={(e) => setNewCommentText(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter' && newCommentText.trim()) {
                                                    addTopLevelComment(newCommentText);
                                                }
                                            }}
                                        />
                                        <button
                                            className="btn text-primary fw-bold btn-sm position-absolute end-0 me-3"
                                            style={{ top: '50%', transform: 'translateY(-50%)' }}
                                            disabled={!newCommentText.trim()}
                                            onClick={() => newCommentText.trim() && addTopLevelComment(newCommentText)}
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}