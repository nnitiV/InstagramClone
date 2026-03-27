import EmptyPost from "@/feature/feed/components/post/EmptyPost";
import EmptyStory from "@/feature/feed/components/story/EmptyStory";
import Posts from "@/feature/feed/components/post/Posts";
import Stories from "@/feature/feed/components/story/Stories";
import { getStories } from "@/services/story.service";
import { getPostsFeed } from "@/services/post.service";

export default async function Home() {
  const [stories, posts] = await Promise.all([getStories(), getPostsFeed()]);
  console.log("Posts:", posts);
  return (
    <div className="container-fluid pt-3"> 
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8" style={{ maxWidth: "730px" }}>
          {stories.stories.length > 0 ? (
            <Stories serverStories={stories.stories} />
          ) : (
            <EmptyStory />
          )}
          {posts.length <= 0 ? <EmptyPost /> : <Posts posts={posts} />}
        </div>
      </div>
    </div>
  );
}
