"use client";
import ExploreModal from "@/feature/explore/components/ExploreModal";
import EmptyUserPosts from "@/feature/profile/components/EmptyUserPosts";
import Header from "@/feature/profile/components/Header";
import Highlights from "@/feature/profile/components/Highlights";
import Posts from "@/feature/profile/components/Posts";
import { checkFollowStatus, followUser, unfollowUser } from "@/services/follower.service";
import { getUserPosts } from "@/services/post.service";
import { getLoggedUserInfo, getUserByUsername } from "@/services/user.service";
import { Post } from "@/types/feed";
import { UserProfile } from "@/types/user";
import { redirect, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

type UserProfileProps = {
  params: Promise<{ username: string }>;
};

export default function UserVisitProfilePage({ params }: UserProfileProps) {
  const { username } = use(params);
  const router = useRouter();
  const [isSelf, setIsSelf] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isHandlingFollow, setIsHandlingFollowing] = useState<boolean>(false);
  // const [userHighlights, setUserHighlights] = useState<[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    const checkWidth = () => setIsMobile(window.innerWidth <= 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);

    const getUser = async () => {
      let res = await getUserByUsername(username);
      if (!res) router.push("/profile");
      let userFetched = res.user;
      setUser(userFetched);
      const userInfo = await getLoggedUserInfo();
      if (userInfo.id == userFetched.id) {
        return redirect("/profile");
      }
      setIsSelf(userInfo.id == userFetched.id);
      let userPosts = await getUserPosts(userFetched.id);
      setPosts(userPosts.items);

      if (userFetched?.id && userFetched?.id > 0) {
        const checkFollowing = async () => {
          if (userInfo.id != userFetched.id) {
            console.log(
              "Checking follow status for user with id ",
              userFetched.id,
            );
            const res = await checkFollowStatus(userFetched.id);
            setIsFollowing(res ? res.isFollowing : false);
          }
        };
        checkFollowing();
      }

      setIsLoading(false);
    };
    getUser();
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const followButtonAction = async () => {
    let didChange = false;
    setIsHandlingFollowing(true);
    if (user != null) {
      if (isFollowing) {
        didChange = await unfollowUser(user.id);
      } else {
        didChange = await followUser(user.id);
      }
      if (didChange) {
        const followerCount = user.followersCount;
        setIsFollowing((prev) => !prev);
        setUser((prevUser) => {
          if (!prevUser) return null;

          return {
            ...prevUser,
            followersCount: isFollowing ? followerCount - 1 : followerCount + 1,
          };
        });
      }
    }
    setIsHandlingFollowing(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center h-100 w-100">
          <div className="spinner-border">
            <span className="visually-hidden"> Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="vh-100 py-5">
            <Header isMobile={isMobile} userProfile={user} />
            <div
              className={`user-buttons w-75 mx-auto ${isMobile && "d-flex justify-content-between"}`}
            >
              {isHandlingFollow ? (
                <button
                  type="button"
                  disabled={isHandlingFollow}
                  onClick={followButtonAction}
                  className="btn btn-secondary border fw-bold flex-grow-1 flex-sm-grow-0 me-sm-2 mb-2 mb-sm-0 px-4"
                >
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </button>
              ) : (
                !isSelf &&
                (isFollowing ? (
                  <button
                    type="button"
                    disabled={isHandlingFollow}
                    onClick={followButtonAction}
                    className="btn btn-secondary border fw-bold flex-grow-1 flex-sm-grow-0 me-sm-2 mb-2 mb-sm-0 px-4"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isHandlingFollow}
                    onClick={followButtonAction}
                    className="btn btn-primary border fw-bold flex-grow-1 flex-sm-grow-0 me-sm-2 mb-2 mb-sm-0 px-4"
                  >
                    Follow
                  </button>
                ))
              )}
            </div>
            <Highlights isLoggedUser={false} />
            {posts && posts.length > 0 ? (
              <Posts posts={posts} setSelectedPost={setSelectedPost} />
            ) : (
              <EmptyUserPosts isLoggedUser={false} />
            )}
          </div>
          {selectedPost && (
            <ExploreModal
              username={username}
              post={selectedPost}
              onClose={() => setSelectedPost(null)}
            />
          )}
        </>
      )}
    </>
  );
}
