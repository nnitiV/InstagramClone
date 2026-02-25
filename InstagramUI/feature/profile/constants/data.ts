import { Post } from "@/types/feed";

export const USER_PROFILE_MOCK = {
    username: "urban_architect",
    name: "Alex Silva",
    bio: "Exploring concrete jungles. 🏙️ Architecture lover. 📸 Shooting on Sony A7III.",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&auto=format&fit=crop&q=80",
    stats: { posts: 12, followers: 305, following: 240 },
    highlights: [
        { id: 1, name: "NYC 🍎", cover: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=150" },
        { id: 2, name: "Tokyo 🗼", cover: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=150" },
        { id: 3, name: "Gear 📷", cover: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=150" }
    ],
    posts: [
        {
            id: 5001,
            authorName: "urban_architect",
            profilePictureUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150",
            caption: "The verticality of New York is something else. 🏙️",
            title: "Glass Giants",
            userId: 101,
            contentUrls: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600"],
            likeCount: 450,
            commentCount: 12,
            isLiked: false,
            createdAt: new Date(2026, 1, 24).toISOString()
        },
        {
            id: 5002,
            authorName: "urban_architect",
            profilePictureUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150",
            caption: "Motion in the ocean. A quick break from the city. 🌊",
            title: "Tidal Waves",
            userId: 101,
            contentUrls: ["https://vjs.zencdn.net/v/oceans.mp4"], // MIX: Video
            likeCount: 890,
            commentCount: 45,
            isLiked: true,
            createdAt: new Date(2026, 1, 22).toISOString()
        },
        {
            id: 5003,
            authorName: "urban_architect",
            profilePictureUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150",
            caption: "Minimalist interiors and natural light.",
            title: "Clean Spaces",
            userId: 101,
            contentUrls: [
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600"
            ], // MIX: Carrossel de imagens
            likeCount: 320,
            commentCount: 8,
            isLiked: false,
            createdAt: new Date(2026, 1, 20).toISOString()
        },
        {
            id: 5004,
            authorName: "urban_architect",
            profilePictureUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150",
            caption: "Geometry that speaks. #Architecture",
            title: "Angular Design",
            userId: 101,
            contentUrls: ["https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=600"],
            likeCount: 1200,
            commentCount: 56,
            isLiked: true,
            createdAt: new Date(2026, 1, 18).toISOString()
        }
    ] as Post[]
};