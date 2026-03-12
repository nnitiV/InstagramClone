'use client';
import { Post } from "@/types/feed";
import PostMedia from "./PostMedia";
import PostActions from "./PostActions";
import { useState } from "react";
import CommentModal from "../comment/CommentModal";
import PostPopUp from "./PostPopUp";
import { getUserById } from "@/feature/profile/services/profile.service";
import { redirect } from "next/navigation";
import { ptBR } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import { userInfo } from "os";

type PostsProps = {
    posts: Post[],
}

export default function Posts({ posts }: PostsProps) {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const goToUserProfile = async (userId: number) => {
        const user = await getUserById(userId);
        redirect(`/profile/${user.username}`);
    }
    const formatShortDate = (date: string) => {
        return formatDistanceToNow(new Date(date), { locale: ptBR })
            .replace('aproximadamente ', '')
            .replace('há ', '')
            .replace('menos de um minuto', 'agora')
            .replace(' minutos', 'min')
            .replace(' minuto', 'min')
            .replace(' horas', 'h')
            .replace(' hora', 'h')
            .replace(' dias', 'd')
            .replace(' dia', 'd');
    };
    return (
        <>
            <div className="container-fluid p-0" >
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-9">
                        {posts.length > 0 && posts.map((post, index) => (
                            <div key={post.id} className="border-bottom pb-4 my-3">
                                <div className="d-flex align-items-center justify-content-between py-2">
                                    <div className="d-flex align-items-center cursor-pointer" onClick={() => goToUserProfile(post.userId)}>
                                        <img
                                            src={post.authorProfilePicture ? "http://localhost:5000/" + post.authorProfilePicture : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                            alt="User"
                                            className="rounded-circle border me-2"
                                            style={{ width: "32px", height: "32px", objectFit: "cover" }}
                                        />
                                        <div className="d-flex align-items-center">
                                            <span className="fw-bold small me-1">{post.authorName}</span>
                                            <span className="text-muted small">• {formatShortDate(post.createdAt)}</span>
                                        </div>
                                    </div>
                                    <i className="bi bi-three-dots cursor-pointer" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                                </div>
                                <PostMedia
                                    contentUrls={post.contentUrls}
                                    postIndex={index}
                                    hasSelectedPost={!!selectedPost} isModal={false}
                                />
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
                            goToUser={goToUserProfile}
                        />
                    )
                }
            </div >
            <PostPopUp />
        </>
    );
}