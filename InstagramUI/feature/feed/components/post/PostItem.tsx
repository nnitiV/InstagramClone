import { BASE_URL } from "@/constants";
import { Post } from "@/types/feed";
import { formatShortDate } from "@/utils/date";
import PostMedia from "./PostMedia";
import PostActions from "./PostActions";
import { Dispatch, SetStateAction } from "react";

type PostItemProps = {
  post: Post;
  index: number;
  selectedPost: Post | null;
  setSelectedPost: Dispatch<SetStateAction<Post | null>>;
  goToUserProfile: (userId: number) => Promise<void>;
};

export default function PostItem({ post, index, selectedPost, setSelectedPost, goToUserProfile }: PostItemProps) {
  return (
    <div className="border-bottom pb-4 my-3">
      <div className="d-flex align-items-center justify-content-between py-2">
        <div
          className="d-flex align-items-center cursor-pointer"
          onClick={() => goToUserProfile(post.userId)}
        >
          <img
            src={
              post.authorProfilePicture
                ? BASE_URL + post.authorProfilePicture
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="User"
            className="rounded-circle border me-2"
            style={{ width: "32px", height: "32px", objectFit: "cover" }}
          />
          <div className="d-flex align-items-center">
            <span className="fw-bold small me-1">{post.authorName}</span>
            <span className="text-muted small">
              • {formatShortDate(post.createdAt)}
            </span>
          </div>
        </div>
        <i
          className="bi bi-three-dots cursor-pointer"
          data-bs-toggle="modal"
          data-bs-target="#postPopup"
        ></i>
      </div>
      <PostMedia
        contentUrls={post.contentUrls}
        postIndex={index}
        hasSelectedPost={!!selectedPost}
        isModal={false}
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
        <span className="small">{post.caption}</span>
      </div>
    </div>
  );
}
