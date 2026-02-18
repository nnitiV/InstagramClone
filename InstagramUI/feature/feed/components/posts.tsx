'use client';
import { Post } from "@/types/feed";
import PostMedia from "./postMedia";
import PostActions from "./PostActions";
import { useState } from "react";
import CommentModal from "./CommentModal";
import PostPopUp from "./PostPopUp";

type PostsProps = {
    posts: Post[],
}

export default function Posts({ posts }: PostsProps) {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    return (
        <>
            <div className="container-fluid p-0" >
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-7">
                        {posts.length > 0 && posts.map((post) => (
                            <div key={post.id} className="border-bottom pb-4 my-3">
                                <div className="d-flex align-items-center justify-content-between py-2">
                                    <div className="d-flex align-items-center cursor-pointer">
                                        <img
                                            src={post.profilePictureUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                            alt="User"
                                            className="rounded-circle border me-2"
                                            style={{ width: "32px", height: "32px", objectFit: "cover" }}
                                        />
                                        <div className="d-flex align-items-center">
                                            <span className="fw-bold small me-1">{post.authorName}</span>
                                            <span className="text-muted small">• {post.createdAt}</span>
                                        </div>
                                    </div>
                                    <i className="bi bi-three-dots cursor-pointer" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                                </div>
                                <PostMedia contentUrls={post.contentUrls} />
                                <PostActions
                                    postId={post.id}
                                    initialIsLiked={post.isLiked}
                                    initialLikeCount={post.likeCount}
                                    initialIsSaved={false}
                                    onCommentClick={() => setSelectedPost(post)}
                                />
                                <div className="mt-1">
                                    <span className="fw-bold me-2 small">{post.authorName}</span>
                                    <span className="small">
                                        {post.caption}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {
                    selectedPost && (
                        <CommentModal
                            post={selectedPost}
                            onClose={() => setSelectedPost(null)}
                        />
                    )
                }
            </div >
            <PostPopUp />
        </>
    );
}