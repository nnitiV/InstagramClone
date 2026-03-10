"use client";
import { Post } from "@/types/feed";
import { useEffect, useState } from "react";
import ExploreModal from "../../feature/explore/components/ExploreModal";
import Header from "@/feature/profile/components/Header";
import Highlights from "@/feature/profile/components/Highlights";
import Posts from "@/feature/profile/components/Posts";
import { getLoggedUserInfo } from "@/feature/auth/services/auth-service";
import { UserProfile } from "@/types/user";
import EmptyUserPosts from "@/feature/profile/components/EmptyUserPosts";
import EditProfileModal from "@/feature/profile/components/EditProfileModal";
import { getUserProfileInformation } from "@/feature/profile/services/profile.service";

export default function SearchPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [userHighlights, setUserHighlights] = useState<[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        setIsLoading(true);
        const checkWidth = () => setIsMobile(window.innerWidth <= 768);
        checkWidth();

        const getUser = async () => {
            let userInfo = await getLoggedUserInfo();
            console.log(userInfo);
            setUser(userInfo);
        }
        getUser();
        setIsLoading(false);
    }, []);
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
                            <button type="button" className="btn btn-light border fw-bold flex-grow-1 flex-sm-grow-0 me-sm-2 mb-2 mb-sm-0 px-4"
                                data-bs-toggle="modal" data-bs-target="#editProfile">
                                Edit profile
                            </button>
                            {/* <button type="button" className="btn btn-light border fw-bold flex-grow-1 flex-sm-grow-0 me-sm-2 mb-2 mb-sm-0 px-4">
                                View archive
                            </button> */}
                        </div>
                        <Highlights userId={user?.id} isLoggedUser={true} />
                        {user?.postsCount != undefined && user?.postsCount > 0 ?
                            <Posts setSelectedPost={setSelectedPost} />
                            :
                            <EmptyUserPosts isLoggedUser={true}/>
                        }
                    </div>
                    {selectedPost &&
                        <ExploreModal post={selectedPost} onClose={() => setSelectedPost(null)} />
                    }
                    <EditProfileModal user={user} />
                </>
            }
        </>
    );
};

