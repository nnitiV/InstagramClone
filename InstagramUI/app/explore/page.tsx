"use client";
import { Post } from "@/types/feed";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import ExploreModal from "../../feature/explore/components/ExploreModal";
import { MOCK_EXPLORE_POSTS } from "@/feature/explore/constants/data";
import ExploreGridItems from "@/feature/explore/components/ExploreGridItems";
import { getPosts } from "@/feature/feed/services/feed.service";

export default function ExplorePage() {
    const [posts, setPosts] =  useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>();

  useEffect(() =>{
    const fetchPosts = async () => setPosts(await getPosts());
    fetchPosts();
  }, []);
  const setPostForModal = (id: number) => {
    const postIndex = posts.findIndex((p) => p.id == id);
    setSelectedPost(posts[postIndex]);
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <ExploreGridItems posts={posts} setPostForModal={setPostForModal} />
      </div>

      {selectedPost && (
        <ExploreModal
          username=""
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </>
  );
}
