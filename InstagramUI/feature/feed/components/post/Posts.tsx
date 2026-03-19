"use client";
import { Post } from "@/types/feed";
import PostMedia from "./PostMedia";
import PostActions from "./PostActions";
import { useState } from "react";
import CommentModal from "../comment/CommentModal";
import PostPopUp from "./PostPopUp";
import { getUserById } from "@/feature/profile/services/profile.service";
import { redirect } from "next/navigation";
import { formatShortDate } from "@/utils/date";
import { BASE_URL } from "@/constants";
import { useRouter } from "next/router";
import PostItem from "./PostItem";

type PostsProps = {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps) {
  const router = useRouter();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  // TODO: Put username with the post returned
  const goToUserProfile = async (userId: number) => {
    const user = await getUserById(userId);
    router.push(`/profile/${user.username}`);
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
            goToUser={goToUserProfile}
          />
        )}
      </div>
      <PostPopUp />
    </>
  );
}
