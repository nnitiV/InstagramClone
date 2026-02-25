"use client";
import { Post } from "@/types/feed";
import { useState } from "react";
import ReactPlayer from "react-player";
import ExploreModal from "../../feature/explore/components/ExploreModal";
import { MOCK_EXPLORE_POSTS } from "@/feature/explore/constants/data";
import ExploreGridItems from "@/feature/explore/components/ExploreGridItems";

export default function ExplorePage() {
    const [selectedPost, setSelectedPost] = useState<Post | null>();
    const setPostForModal = (id: number) => {
        const postIndex = MOCK_EXPLORE_POSTS.findIndex(p => p.id == id);
        setSelectedPost(MOCK_EXPLORE_POSTS[postIndex]);
    }
    return (
        <>
            <div className="d-flex justify-content-center">
                <ExploreGridItems setPostForModal={setPostForModal} />
            </div>

            {
                selectedPost && (
                    <ExploreModal
                        post={selectedPost}
                        onClose={() => setSelectedPost(null)}
                    />
                )
            }
        </>
    )

};