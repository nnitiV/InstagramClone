"use client";
import { Post } from "@/types/feed";
import { useState } from "react";
import ExploreModal from "../../feature/explore/components/ExploreModal";
import { USER_PROFILE_MOCK } from "@/feature/profile/constants/data";
import Header from "@/feature/profile/components/header";
import Highlights from "@/feature/profile/components/Highlights";
import Posts from "@/feature/profile/components/Posts";

export default function SearchPage() {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    
    return (
        <>
            <div className="vh-100 py-5">
                <Header />
                <div className="user-buttons w-75 mx-auto">
                    <button type="button" className="border border-2 btn-custom w-25 me-3">Edit profile</button>
                    <button type="button" className="border border-2 btn-custom w-25 me-3">View archive</button>
                </div>
                <Highlights />
                <Posts setSelectedPost={setSelectedPost} />
            </div>
            {selectedPost && 
                <ExploreModal post={selectedPost} onClose={() => setSelectedPost(null)} />
            }
        </>
    )
};

