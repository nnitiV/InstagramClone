import { getLoggedUserTokenInfo } from "@/feature/auth/services/auth-service";
import EmptyPost from "@/feature/feed/components/post/EmptyPost";
import EmptyStory from "@/feature/feed/components/story/EmptyStory";
import Posts from "@/feature/feed/components/post/Posts";
import { getPosts, getStories } from "@/feature/feed/services/feed.service";
import { Post, Story } from "@/types/feed";
import Stories from "@/feature/feed/components/story/Stories";

export default async function Home() {
  const [token, stories, posts] = await Promise.all([
    getLoggedUserTokenInfo(),
    getStories(),
    getPosts()
  ]);

  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            {stories.length > 0 ? (
              <Stories stories={stories} userPhoto={token?.picture} />
            ) : (
              <EmptyStory />
            )}
            {posts.length <= 0 ?
              <EmptyPost />
              :
              <Posts posts={posts} />
            }
          </div>
        </div>
      </div>
    </>
  );
}
