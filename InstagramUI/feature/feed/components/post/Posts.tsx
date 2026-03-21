"use client";
import { Post } from "@/types/feed";
import { useState } from "react";
import CommentModal from "../comment/CommentModal";
import PostPopUp from "./PostPopUp";
import { useRouter } from 'next/navigation';
import PostItem from "./PostItem";

type PostsProps = {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps) {
  const router = useRouter();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const goToUserProfile = async (username: string) => {
    router.push(`/profile/${username}`);
  };

  return (
    <>
      <div className="container-fluid p-0">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-9">
            {posts.length > 0 &&
              posts.map((post, index) => (
                <PostItem
                  key={post.id}
                  goToUserProfile={goToUserProfile}
                  index={index}
                  post={post}
                  selectedPost={selectedPost}
                  setSelectedPost={setSelectedPost}
                />
              ))}
          </div>
        </div>
        {selectedPost && (
          <CommentModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
            goToUserProfile={goToUserProfile}
          />
        )}
      </div>
      <PostPopUp />
    </>
  );
}
