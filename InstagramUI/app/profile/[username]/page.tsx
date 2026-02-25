"use client";
import ExploreModal from "@/feature/explore/components/ExploreModal";
import Header from "@/feature/profile/components/header";
import Highlights from "@/feature/profile/components/Highlights";
import Posts from "@/feature/profile/components/Posts";
import { Post } from "@/types/feed";
import { use, useState } from "react";

type UserProfileProps = {
    params: Promise<{ username: string }>;
}

export default function UserProfile({ params }: UserProfileProps) {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const { username } = use(params);
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
}
