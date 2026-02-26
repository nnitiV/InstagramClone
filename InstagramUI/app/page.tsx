import { getUserInfo } from "@/feature/auth/services/auth-service";
import EmptyPost from "@/feature/feed/components/post/EmptyPost";
import EmptyStory from "@/feature/feed/components/story/EmptyStory";
import Posts from "@/feature/feed/components/post/Posts";
import { getPosts, getStories } from "@/feature/feed/services/feed.service";
import { Post, Story } from "@/types/feed";
import Stories from "@/feature/feed/components/story/Stories";

export default async function Home() {
  const [token, stories, posts] = await Promise.all([
    getUserInfo(),
    getStories(),
    getPosts()
  ]);

  const mockPosts: Post[] = posts.length > 0 ? posts : [
    {
      id: 1001,
      authorName: "UrbanExplorer",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      caption: "The concrete jungle never sleeps. 🏙️",
      title: "City Lights",
      userId: 101,
      contentUrls: ["https://picsum.photos/600/800", "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"],
      likeCount: 1240,
      commentCount: 42,
      isLiked: false,
      createdAt: new Date(2026, 1, 20).toISOString()
    },
    {
      id: 1002,
      authorName: "MinimalArch",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      caption: "Less is definitely more. #Architecture #Minimalism",
      title: "White Walls",
      userId: 102,
      contentUrls: ["https://picsum.photos/602/602"],
      likeCount: 890,
      commentCount: 12,
      isLiked: true,
      createdAt: new Date(2026, 1, 19).toISOString()
    },
    {
      id: 1003,
      authorName: "SkylineChaser",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/85.jpg",
      caption: "Chasing the golden hour on the 54th floor.",
      title: "Rooftop Views",
      userId: 103,
      contentUrls: ["https://www.w3schools.com/html/mov_bbb.mp4"],
      likeCount: 2560,
      commentCount: 105,
      isLiked: false,
      createdAt: new Date(2026, 1, 18).toISOString()
    },
    {
      id: 1008,
      authorName: "ZahaFan",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/40.jpg",
      caption: "Fluidity in motion. Inspired by the best.",
      title: "Curves",
      userId: 108,
      contentUrls: ["https://vjs.zencdn.net/v/oceans.mp4"],
      likeCount: 760,
      commentCount: 15,
      isLiked: false,
      createdAt: new Date(2026, 1, 13).toISOString()
    },
    {
      id: 1010,
      authorName: "NeonVibes",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/90.jpg",
      caption: "Cyberpunk aesthetics in the heart of Tokyo.",
      title: "Neon Nights",
      userId: 110,
      contentUrls: ["https://picsum.photos/610/610", "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"],
      likeCount: 4800,
      commentCount: 130,
      isLiked: true,
      createdAt: new Date(2026, 1, 11).toISOString()
    },
    {
      id: 1016,
      authorName: "PenthouseLiving",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/25.jpg",
      caption: "Waking up to this view is a dream.",
      title: "Luxury Suite",
      userId: 116,
      contentUrls: ["https://media.w3.org/2010/05/bunny/movie.mp4"],
      likeCount: 9200,
      commentCount: 410,
      isLiked: false,
      createdAt: new Date(2026, 1, 5).toISOString()
    }
  ];
  const MOCK_STORIES: Story[] = [
    {
      id: 1,
      username: "ArchLover",
      mediaurl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      createdAt: new Date("2026-02-26T06:30:00")
    },
    {
      id: 2,
      username: "CityExplorer",
      mediaurl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      createdAt: new Date("2026-02-26T05:45:00")
    },
    {
      id: 3,
      username: "TechGuru",
      mediaurl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/85.jpg",
      createdAt: new Date("2026-02-26T04:20:00")
    },
    {
      id: 4,
      username: "UrbanPlanner",
      mediaurl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/68.jpg",
      createdAt: new Date("2026-02-26T03:15:00")
    },
    {
      id: 5,
      username: "SkylineChaser",
      mediaurl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/22.jpg",
      createdAt: new Date("2026-02-26T01:10:00")
    },
    {
      id: 6,
      username: "PixelPioneer",
      mediaurl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/12.jpg",
      createdAt: new Date("2026-02-25T23:50:00")
    },
    {
      id: 7,
      username: "BrutalismGuy",
      mediaurl: "https://images.unsplash.com/photo-1518005020481-4b8817a212e9?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/41.jpg",
      createdAt: new Date("2026-02-25T22:30:00")
    },
    {
      id: 8,
      username: "NeonNights",
      mediaurl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/90.jpg",
      createdAt: new Date("2026-02-25T21:15:00")
    },
    {
      id: 9,
      username: "ConcreteJungle",
      mediaurl: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      createdAt: new Date("2026-02-25T20:00:00")
    },
    {
      id: 10,
      username: "MinimalVibes",
      mediaurl: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      createdAt: new Date("2026-02-25T19:45:00")
    },
    {
      id: 11,
      username: "GlassAndSteel",
      mediaurl: "https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/55.jpg",
      createdAt: new Date("2026-02-25T18:30:00")
    },
    {
      id: 12,
      username: "Metropolis",
      mediaurl: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/55.jpg",
      createdAt: new Date("2026-02-25T17:10:00")
    },
    {
      id: 13,
      username: "ThePenthouse",
      mediaurl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/10.jpg",
      createdAt: new Date("2026-02-25T16:00:00")
    },
    {
      id: 14,
      username: "StructureDaily",
      mediaurl: "https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/10.jpg",
      createdAt: new Date("2026-02-25T15:20:00")
    },
    {
      id: 15,
      username: "Modernist",
      mediaurl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/33.jpg",
      createdAt: new Date("2026-02-25T14:00:00")
    }
  ];

  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
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
