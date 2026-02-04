"use client";

import PostMedia from "./postMedia";
import PostActions from "./PostActions";
import { Post, PostComment, PostCommentTree } from "@/types/feed";
import { useEffect, useState, useCallback } from "react";
import { getPostComments } from "../services/feed-service";
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
    }, [post.id, post.profilePictureUrl, comments.length, buildCommentTree]);

    useEffect(() => {
        const load = async () => {
            try {
                const apiComments = await getPostComments(post.id);
                let finalComments: PostComment[] = apiComments;

                if (apiComments.length === 0) {
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
                        {
                            id: 2,
                            text: "I used to work near there, the view from the top floor is even better!",
                            postId: 999,
                            userId: 102,
                            username: "CityExplorer",
                            profilePictureUrl: "https://i.pravatar.cc/150?u=102",
                            parentCommentId: null,
                            createdAt: "2026-02-04T11:30:00Z"
                        },
                        {
                            id: 3,
                            text: "Agreed! Especially during sunset. 🌇",
                            postId: 999,
                            userId: 103,
                            username: "SunsetChaser",
                            profilePictureUrl: "https://i.pravatar.cc/150?u=103",
                            parentCommentId: 2,
                            createdAt: "2026-02-04T12:00:00Z"
                        },
                        {
                            id: 4,
                            text: "Wait, isn't this the new tech hub downtown?",
                            postId: 999,
                            userId: 104,
                            username: "TechGuru",
                            profilePictureUrl: "https://i.pravatar.cc/150?u=104",
                            parentCommentId: null,
                            createdAt: "2026-02-04T13:00:00Z"
                        },
                        {
                            id: 5,
                            text: "Yes! They just finished the glass facade last week.",
                            postId: 999,
                            userId: 105,
                            username: "UrbanPlanner",
                            profilePictureUrl: "https://i.pravatar.cc/150?u=105",
                            parentCommentId: 4,
                            createdAt: "2026-02-04T13:15:00Z"
                        },
                        {
                            id: 6,
                            text: "It looks way better in person than in the renders.",
                            postId: 999,
                            userId: 104,
                            username: "TechGuru",
                            profilePictureUrl: "https://i.pravatar.cc/150?u=104",
                            parentCommentId: 5,
                            createdAt: "2026-02-04T13:30:00Z"
                        },
                        {
                            id: 7,
                            text: "Totally! The reflection on the glass at noon is blinding though lol.",
                            postId: 999,
                            userId: 106,
                            username: "LocalResident",
                            profilePictureUrl: "https://i.pravatar.cc/150?u=106",
                            parentCommentId: 6,
                            createdAt: "2026-02-04T13:45:00Z"
                        },
                        {
                            id: 8,
                            text: "I need to visit this place ASAP!",
                            postId: 999,
                            userId: 107,
                            username: "TravelAddict",
                            profilePictureUrl: "https://i.pravatar.cc/150?u=107",
                            parentCommentId: null,
                            createdAt: "2026-02-04T14:00:00Z"
                        },
                        {
                            id: 9,
                            text: "What camera did you use for this? The clarity is insane.",
                            postId: 999,
                            userId: 108,
                            username: "PhotoSniper",
                            profilePictureUrl: "https://i.pravatar.cc/150?u=108",
                            parentCommentId: null,
                            createdAt: "2026-02-04T15:00:00Z"
                        }
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

    return (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} onClick={onClose}>
            <div
                className="modal-dialog modal-xl modal-dialog-centered"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content overflow-hidden" style={{ height: "90vh", borderRadius: "4px" }}>
                    <div className="row g-0 h-100">
                        <div className="col-md-7 bg-black d-flex align-items-center justify-content-center h-100">
                            <div className="w-100">
                                <PostMedia contentUrls={post.contentUrls} />
                            </div>
                        </div>
                        <div className="col-md-5 d-flex flex-column bg-white h-100">
                            <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={post.profilePictureUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                        className="rounded-circle border me-2"
                                        style={{ width: "32px", height: "32px" }}
                                    />
                                    <span className="fw-bold small">{post.authorName}</span>
                                </div>
                                <button className="btn-close small" onClick={onClose}></button>
                            </div>
                            <div className="flex-grow-1 overflow-y-auto p-3 no-scrollbar">
                                <div className="d-flex mb-3">
                                    <img src={post.profilePictureUrl} className="rounded-circle me-2" style={{ width: "32px", height: "32px" }} />
                                    <p className="small mb-0">
                                        <span className="fw-bold me-2">{post.authorName}</span>
                                        {post.caption}
                                    </p>
                                    <hr />
                                </div>
                                <div className="flex-grow-1 overflow-y-auto p-3 no-scrollbar">
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
                            </div>
                            <div className="border-top p-3">
                                <PostActions
                                    postId={post.id}
                                    initialIsLiked={post.isLiked}
                                    initialLikeCount={post.likeCount}
                                    onCommentClick={() => { }}
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
                                        Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
