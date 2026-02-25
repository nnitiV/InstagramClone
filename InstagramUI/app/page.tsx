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
      contentUrls: ["https://picsum.photos/600/800", "https://picsum.photos/600/801"],
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
      contentUrls: ["https://picsum.photos/603/603", "https://picsum.photos/603/604", "https://picsum.photos/603/605"],
      likeCount: 2560,
      commentCount: 105,
      isLiked: false,
      createdAt: new Date(2026, 1, 18).toISOString()
    },
    {
      id: 1004,
      authorName: "PixelPioneer",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/12.jpg",
      caption: "Testing out the new wide-angle lens. What do you think?",
      title: "Lens Test",
      userId: 104,
      contentUrls: ["https://picsum.photos/604/450"],
      likeCount: 450,
      commentCount: 8,
      isLiked: false,
      createdAt: new Date(2026, 1, 17).toISOString()
    },
    {
      id: 1005,
      authorName: "BrutalismGuy",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/41.jpg",
      caption: "Raw concrete and geometric shapes. Perfection.",
      title: "Brutal Beauty",
      userId: 105,
      contentUrls: ["https://picsum.photos/605/605"],
      likeCount: 110,
      commentCount: 4,
      isLiked: false,
      createdAt: new Date(2026, 1, 16).toISOString()
    },
    {
      id: 1006,
      authorName: "GreenBuild",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/68.jpg",
      caption: "Integrating nature into the workspace. 🌿",
      title: "Biophilic Design",
      userId: 106,
      contentUrls: ["https://picsum.photos/606/606"],
      likeCount: 3400,
      commentCount: 88,
      isLiked: true,
      createdAt: new Date(2026, 1, 15).toISOString()
    },
    {
      id: 1007,
      authorName: "DraftingDreams",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/20.jpg",
      caption: "Late night blueprinting sessions. ✍️",
      title: "Office Life",
      userId: 107,
      contentUrls: ["https://picsum.photos/607/800"],
      likeCount: 150,
      commentCount: 2,
      isLiked: false,
      createdAt: new Date(2026, 1, 14).toISOString()
    },
    {
      id: 1008,
      authorName: "ZahaFan",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/40.jpg",
      caption: "Fluidity in motion. Inspired by the best.",
      title: "Curves",
      userId: 108,
      contentUrls: ["https://picsum.photos/608/608"],
      likeCount: 760,
      commentCount: 15,
      isLiked: false,
      createdAt: new Date(2026, 1, 13).toISOString()
    },
    {
      id: 1009,
      authorName: "StructurePro",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/55.jpg",
      caption: "The skeleton of a masterpiece.",
      title: "Under Construction",
      userId: 109,
      contentUrls: ["https://picsum.photos/609/609"],
      likeCount: 520,
      commentCount: 21,
      isLiked: false,
      createdAt: new Date(2026, 1, 12).toISOString()
    },
    {
      id: 1010,
      authorName: "NeonVibes",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/90.jpg",
      caption: "Cyberpunk aesthetics in the heart of Tokyo.",
      title: "Neon Nights",
      userId: 110,
      contentUrls: ["https://picsum.photos/610/610", "https://picsum.photos/610/611"],
      likeCount: 4800,
      commentCount: 130,
      isLiked: true,
      createdAt: new Date(2026, 1, 11).toISOString()
    },
    {
      id: 1011,
      authorName: "FacadeFix",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      caption: "That reflection though... 💎",
      title: "Glass and Steel",
      userId: 111,
      contentUrls: ["https://picsum.photos/611/611"],
      likeCount: 310,
      commentCount: 6,
      isLiked: false,
      createdAt: new Date(2026, 1, 10).toISOString()
    },
    {
      id: 1012,
      authorName: "ModernistBabe",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/11.jpg",
      caption: "Form follows function, always.",
      title: "Mid-Century",
      userId: 112,
      contentUrls: ["https://picsum.photos/612/612"],
      likeCount: 1100,
      commentCount: 30,
      isLiked: false,
      createdAt: new Date(2026, 1, 9).toISOString()
    },
    {
      id: 1013,
      authorName: "MetroLines",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/10.jpg",
      caption: "The symmetry of the underground.",
      title: "Subway Art",
      userId: 113,
      contentUrls: ["https://picsum.photos/613/400"],
      likeCount: 220,
      commentCount: 9,
      isLiked: false,
      createdAt: new Date(2026, 1, 8).toISOString()
    },
    {
      id: 1014,
      authorName: "SustainableDev",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/55.jpg",
      caption: "Building for a better tomorrow. 🌍",
      title: "Eco-Home",
      userId: 114,
      contentUrls: ["https://picsum.photos/614/614"],
      likeCount: 1800,
      commentCount: 56,
      isLiked: true,
      createdAt: new Date(2026, 1, 7).toISOString()
    },
    {
      id: 1015,
      authorName: "SteelShadows",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/33.jpg",
      caption: "High contrast, high stakes.",
      title: "B&W City",
      userId: 115,
      contentUrls: ["https://picsum.photos/615/800"],
      likeCount: 670,
      commentCount: 14,
      isLiked: false,
      createdAt: new Date(2026, 1, 6).toISOString()
    },
    {
      id: 1016,
      authorName: "PenthouseLiving",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/25.jpg",
      caption: "Waking up to this view is a dream.",
      title: "Luxury Suite",
      userId: 116,
      contentUrls: ["https://picsum.photos/616/616"],
      likeCount: 9200,
      commentCount: 410,
      isLiked: false,
      createdAt: new Date(2026, 1, 5).toISOString()
    },
    {
      id: 1017,
      authorName: "BrutalBlogger",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/45.jpg",
      caption: "Socialist Modernism in Belgrade.",
      title: "Tower Block",
      userId: 117,
      contentUrls: ["https://picsum.photos/617/617"],
      likeCount: 430,
      commentCount: 18,
      isLiked: false,
      createdAt: new Date(2026, 1, 4).toISOString()
    },
    {
      id: 1018,
      authorName: "CurveCollector",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/30.jpg",
      caption: "Architecture is the learned game, correct and magnificent, of forms assembled in the light.",
      title: "Corbusier Quote",
      userId: 118,
      contentUrls: ["https://picsum.photos/618/618"],
      likeCount: 1300,
      commentCount: 22,
      isLiked: true,
      createdAt: new Date(2026, 1, 3).toISOString()
    },
    {
      id: 1019,
      authorName: "LightAndVoid",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/80.jpg",
      caption: "Playing with shadows today.",
      title: "Void",
      userId: 119,
      contentUrls: ["https://picsum.photos/619/619"],
      likeCount: 290,
      commentCount: 5,
      isLiked: false,
      createdAt: new Date(2026, 1, 2).toISOString()
    },
    {
      id: 1020,
      authorName: "ConcreteJungle",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      caption: "Sometimes the back alleys are the most beautiful.",
      title: "Alleyway",
      userId: 120,
      contentUrls: ["https://picsum.photos/620/620"],
      likeCount: 510,
      commentCount: 13,
      isLiked: false,
      createdAt: new Date(2026, 1, 1).toISOString()
    },
    {
      id: 1021,
      authorName: "MarbleMaster",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/15.jpg",
      caption: "Nothing beats a clean marble finish.",
      title: "Kitchen Inspo",
      userId: 121,
      contentUrls: ["https://picsum.photos/621/621"],
      likeCount: 1540,
      commentCount: 45,
      isLiked: false,
      createdAt: new Date(2026, 0, 31).toISOString()
    },
    {
      id: 1022,
      authorName: "Draftsman",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/5.jpg",
      caption: "Checking the scales one last time.",
      title: "Scale Model",
      userId: 122,
      contentUrls: ["https://picsum.photos/622/400"],
      likeCount: 190,
      commentCount: 3,
      isLiked: false,
      createdAt: new Date(2026, 0, 30).toISOString()
    },
    {
      id: 1023,
      authorName: "GothicGlory",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/50.jpg",
      caption: "Flying buttresses are the original engineering marvel.",
      title: "Cathedral",
      userId: 123,
      contentUrls: ["https://picsum.photos/623/800"],
      likeCount: 2200,
      commentCount: 67,
      isLiked: true,
      createdAt: new Date(2026, 0, 29).toISOString()
    },
    {
      id: 1024,
      authorName: "ParametricArt",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/60.jpg",
      caption: "Coded structures. #Rhino #Grasshopper",
      title: "Parametric",
      userId: 124,
      contentUrls: ["https://picsum.photos/624/624"],
      likeCount: 3100,
      commentCount: 92,
      isLiked: false,
      createdAt: new Date(2026, 0, 28).toISOString()
    },
    {
      id: 1025,
      authorName: "ZenSpaces",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/70.jpg",
      caption: "Finding peace in spatial design.",
      title: "Zen Garden",
      userId: 125,
      contentUrls: ["https://picsum.photos/625/625"],
      likeCount: 1450,
      commentCount: 38,
      isLiked: false,
      createdAt: new Date(2026, 0, 27).toISOString()
    }
  ];
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
