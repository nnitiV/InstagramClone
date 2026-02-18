import { getUserInfo } from "@/feature/auth/services/auth-service";
import EmptyPost from "@/feature/feed/components/EmptyPost";
import EmptyStory from "@/feature/feed/components/EmptyStory";
import Posts from "@/feature/feed/components/posts";
import Stories from "@/feature/feed/components/stories";
import { getPosts, getStories } from "@/feature/feed/services/feed-service";
import { Post } from "@/types/feed";

export default async function Home() {
  const [token, stories, posts] = await Promise.all([
    getUserInfo(),
    getStories(),
    getPosts()
  ]);

  const mockPosts: Post[] = posts.length > 0 ? posts : [{
    id: 999,
    authorName: "TestingUser",
    authorProfilePicture: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    caption: "Testing the modal logic!",
    title: "Test Post",
    userId: 1,
    contentUrls: [
      "https://picsum.photos/600/600",
      "https://picsum.photos/601/601"
    ],
    likeCount: 42,
    commentCount: 5,
    isLiked: false,
    createdAt: new Date().toISOString()
  },];

  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-6">
            {stories.length > 0 ? (
              <Stories stories={stories} userPhoto={token.picture} />
            ) : (
              <EmptyStory />
            )}
            {posts.length <= 0 ?
              // <EmptyPost />
              <Posts posts={mockPosts} />
              :
              <Posts posts={posts} />
            }
          </div>
        </div>
      </div>

    </>
  );
}
