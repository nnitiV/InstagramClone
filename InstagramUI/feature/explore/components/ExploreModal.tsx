"use client";

import { getLoggedUserInfo } from "@/feature/auth/services/auth-service";
import CommentsList from "@/feature/feed/components/comment/CommentList";
import PostActions from "@/feature/feed/components/post/PostActions";
import PostMedia from "@/feature/feed/components/post/PostMedia";
import { addPostComments, getPostComments } from "@/feature/feed/services/feed.service";
import { Post, PostComment, PostCommentTree } from "@/types/feed";
import { useEffect, useState, useCallback } from "react";

type CommentModalProps = {
    post: Post;
    onClose: () => void;
};

export default function ExploreModal({ post, onClose }: CommentModalProps) {
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
    const addReply = useCallback(async (parentId: number, text: string) => {
        const userInfo = await getLoggedUserInfo();
        const newComment: PostComment = {
            id: Date.now(),
            text,
            postId: post.id,
            userId: userInfo.id,
            username: userInfo.username,
            profilePictureUrl: userInfo.profilePictureUrl,
            parentCommentId: parentId,
            createdAt: new Date().toISOString()
        };
        await addPostComments(newComment);

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
    }, [post.id, post.authorProfilePicture, insertComment]);
    const addTopLevelComment = useCallback(async (text: string) => {
        const userInfo = await getLoggedUserInfo();
        const newComment: PostComment = {
            id: Date.now(),
            text,
            postId: post.id,
            userId: userInfo.id,
            username: userInfo.username,
            profilePictureUrl: userInfo.profilePictureUrl,
            parentCommentId: null,
            createdAt: new Date().toISOString()
        };
        const res = await addPostComments(newComment);
        if(res){
            setComments(prev => [...prev, newComment]);
            setTree(buildCommentTree([...comments, newComment]));
            setNewCommentText('');
        }
    }, [post.id, post.authorProfilePicture, comments, buildCommentTree]);
    useEffect(() => {
        const load = async () => {
            try {
                const apiComments = await getPostComments(post.id);
                let finalComments: PostComment[] = apiComments;

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
                className="modal-dialog modal-xl modal-dialog-centered modal-fullscreen-md-down"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content overflow-hidden border-0" style={{ height: "90vh", borderRadius: "4px" }}>
                    <div className="row g-0 h-100 flex-column flex-md-row">
                        <div className="col-12 col-md-7 bg-black d-flex align-items-center justify-content-center col-media">
                            <div className="w-100 h-100 d-flex align-items-center justify-content-center overflow-hidden">
                                <PostMedia contentUrls={post.contentUrls} />
                            </div>
                        </div>
                        <div className="col-12 col-md-5 d-flex flex-column bg-white col-comments">
                            <div className="p-3 border-bottom d-flex align-items-center justify-content-between flex-shrink-0">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={"http://localhost:5000/" + post.authorProfilePicture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                        className="rounded-circle border me-2 object-fit-cover"
                                        style={{ width: "32px", height: "32px" }}
                                    />
                                    <span className="fw-bold small">{post.authorName}</span>
                                </div>
                                <button className="btn-close small" onClick={onClose}></button>
                            </div>
                            <div className="flex-grow-1 overflow-auto p-3 no-scrollbar" style={{ minHeight: 0 }}>
                                <div className="d-flex mb-3">
                                    <img src={"http://localhost:5000/" + post.authorProfilePicture} className="rounded-circle me-2 object-fit-cover" style={{ width: "32px", height: "32px" }} />
                                    <p className="small mb-0">
                                        <span className="fw-bold me-2">{post.authorName}</span>
                                        {post.caption}
                                    </p>
                                </div>
                                <hr className="my-2" />

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
                            <div className="border-top p-3 flex-shrink-0">
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
                                        Post
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
