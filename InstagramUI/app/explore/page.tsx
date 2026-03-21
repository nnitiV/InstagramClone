"use client";
import { Post } from "@/types/feed";
import { useEffect, useState } from "react";
import ExploreModal from "../../feature/explore/components/ExploreModal";
import ExploreGridItems from "@/feature/explore/components/ExploreGridItems";
import EmptyPost from "@/feature/feed/components/post/EmptyPost";
import { getPostsFeed } from "@/services/post.service";

export default function ExplorePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>();

  useEffect(() => {
    const fetchPosts = async () => {
      const feedPosts =await getPostsFeed()
      console.log(feedPosts);
      setPosts(feedPosts);
    }
    fetchPosts();
  }, []);
  const setPostForModal = (id: number) => {
    const postIndex = posts.findIndex((p) => p.id == id);
    setSelectedPost(posts[postIndex]);
  };
  return (
    <>
      <div className="d-flex justify-content-center ">
        {posts.length > 0 ?
          <ExploreGridItems posts={posts} setPostForModal={setPostForModal} />
          :
          <EmptyPost />
        }
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
