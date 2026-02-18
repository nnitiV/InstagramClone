import { getUserInfo } from "@/feature/auth/services/auth-service";
import EmptyPost from "@/feature/feed/components/feed-post/EmptyPost";
import EmptyStory from "@/feature/feed/components/feed-story/EmptyStory";
import Posts from "@/feature/feed/components/feed-post/posts";
import { getPosts, getStories } from "@/feature/feed/services/feed-service";
import { Post, Story } from "@/types/feed";
import Stories from "@/feature/feed/components/feed-story/Stories";

export default async function Home() {
  const [token, stories, posts] = await Promise.all([
    getUserInfo(),
    getStories(),
    getPosts()
  ]);

  const mockPosts: Post[] = posts.length > 0 ? posts : [{
    id: 999,
    authorName: "TestingUser",
    profilePictureUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
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
  },
  {
    id: 999,
    authorName: "TestingUser",
    profilePictureUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
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
  const MOCK_STORIES: Story[] = [
    {
      id: 1,
      username: "ArchLover",
      mediaurl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      username: "CityExplorer",
      mediaurl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      username: "TechGuru",
      mediaurl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/85.jpg"
    },
    {
      id: 4,
      username: "UrbanPlanner",
      mediaurl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      id: 5,
      username: "SkylineChaser",
      mediaurl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      id: 6,
      username: "PixelPioneer",
      mediaurl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    {
      id: 7,
      username: "BrutalismGuy",
      mediaurl: "https://images.unsplash.com/photo-1518005020481-4b8817a212e9?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/41.jpg"
    },
    {
      id: 8,
      username: "NeonNights",
      mediaurl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/90.jpg"
    },
    {
      id: 9,
      username: "ConcreteJungle",
      mediaurl: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 10,
      username: "MinimalVibes",
      mediaurl: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 11,
      username: "GlassAndSteel",
      mediaurl: "https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/55.jpg"
    },
    {
      id: 12,
      username: "Metropolis",
      mediaurl: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/55.jpg"
    },
    {
      id: 13,
      username: "ThePenthouse",
      mediaurl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/10.jpg"
    },
    {
      id: 14,
      username: "StructureDaily",
      mediaurl: "https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/10.jpg"
    },
    {
      id: 15,
      username: "Modernist",
      mediaurl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/33.jpg"
    }
  ];

  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-6">
            {MOCK_STORIES.length > 0 ? (
              <Stories stories={MOCK_STORIES} userPhoto={token?.picture} />
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
