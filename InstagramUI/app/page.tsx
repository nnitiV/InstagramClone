import { getLoggedUserTokenInfo } from "@/feature/auth/services/auth-service";
import EmptyPost from "@/feature/feed/components/post/EmptyPost";
import EmptyStory from "@/feature/feed/components/story/EmptyStory";
import Posts from "@/feature/feed/components/post/Posts";
import Stories from "@/feature/feed/components/story/Stories";
import { getPostsFeed, getStories } from "@/feature/feed/services/feed.service";

export default async function Home() {
  const [token, stories, posts] = await Promise.all([
    getLoggedUserTokenInfo(),
    getStories(),
    getPostsFeed()
  ]);
  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            {stories.stories.length > 0 ? (
              <Stories serverStories={stories.stories} />
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
