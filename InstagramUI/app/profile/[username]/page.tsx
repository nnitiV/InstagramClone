"use client";
import { getLoggedUserInfo } from "@/feature/auth/services/auth-service";
import ExploreModal from "@/feature/explore/components/ExploreModal";
import EmptyUserPosts from "@/feature/profile/components/EmptyUserPosts";
import Header from "@/feature/profile/components/Header";
import Highlights from "@/feature/profile/components/Highlights";
import Posts from "@/feature/profile/components/Posts";
import { checkFollowStatus, followUser, getUserByUsername, getUserPosts, unfollowUser } from "@/feature/profile/services/profile.service";
import { Post } from "@/types/feed";
import { UserProfile } from "@/types/user";
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from "next/server";
import { use, useEffect, useState } from "react";

type UserProfileProps = {
    params: Promise<{ username: string }>;
}

export default function SearchPage({ params }: UserProfileProps) {
    const { username } = use(params);
    const [isSelf, setIsSelf] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [userHighlights, setUserHighlights] = useState<[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        setIsLoading(true);
        const checkWidth = () => setIsMobile(window.innerWidth <= 768);
        checkWidth();

        const getUser = async () => {
            let userFetched = (await getUserByUsername(username)).user;
            if (userFetched) setUser(userFetched);
            const userInfo = await getLoggedUserInfo();
            if(userInfo.id == userFetched.id) {
                return redirect("/profile");
            }
            setIsSelf(userInfo.id == userFetched.id);
            let userPosts = await getUserPosts(userFetched.id);
            setPosts(userPosts.items);
        }
        getUser();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (user?.id) { // Só dispara quando o ID do perfil alvo chegar
            const checkFollowing = async () => {
                const userInfo = await getLoggedUserInfo();
                if (userInfo.id != user.id) {
                    const res = await checkFollowStatus(user.id);
                    setIsFollowing(res ? res.isFollowing : false);
                }
            }
            checkFollowing();
        }
    }, [user?.id]);

    const followButtonAction = async () => {
        let didChange = false;
        if (user != null) {
            if (isFollowing) {
                didChange = await unfollowUser(user.id);
            } else {
                didChange = await followUser(user.id);
            }
            if (didChange) setIsFollowing(prev => !prev);
        }
    }

    return (
        <>
            {isLoading ?
                <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div className="spinner-border">
                        <span className="visually-hidden"> Loading...</span >
                    </div >
                </div>
                :
                <>
                    <div className="vh-100 py-5">
                        <Header isMobile={isMobile} userProfile={user} />
                        <div className={`user-buttons w-75 mx-auto ${isMobile && "d-flex justify-content-between"}`}>
                            {!isSelf && (isFollowing ?
                                <button type="button" onClick={followButtonAction} className="btn btn-secondary border fw-bold flex-grow-1 flex-sm-grow-0 me-sm-2 mb-2 mb-sm-0 px-4">
                                    Unfollow
                                </button>
                                :
                                <button type="button" onClick={followButtonAction} className="btn btn-primary border fw-bold flex-grow-1 flex-sm-grow-0 me-sm-2 mb-2 mb-sm-0 px-4">
                                    Follow
                                </button>)
                            }
                        </div>
                        <Highlights userId={user?.id} isLoggedUser={false} />
                        {posts && posts.length > 0 ?
                            <Posts posts={posts} setSelectedPost={setSelectedPost} />
                            :
                            <EmptyUserPosts isLoggedUser={false} />
                        }
                    </div>
                    {selectedPost &&
                        <ExploreModal post={selectedPost} onClose={() => setSelectedPost(null)} />
                    }
                </>
            }
        </>
    );
};

