"use client";
import { Post } from "@/types/feed";
import { useState } from "react";
import ReactPlayer from "react-player";
import ExploreModal from "../../feature/explore/components/ExploreModal";

const mockExplorePosts: Post[] = [
    {
        id: 3001,
        authorName: "GlassAndSteel",
        profilePictureUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        caption: "Staring up into the abyss of modern corporate life. 🏢",
        title: "Corporate Skyscraper",
        userId: 101,
        // Single Image
        contentUrls: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=500"],
        likeCount: 1420,
        commentCount: 89,
        isLiked: false,
        createdAt: new Date(2026, 1, 24).toISOString()
    },
    {
        id: 3002,
        authorName: "OceanExplorer",
        profilePictureUrl: "https://randomuser.me/api/portraits/women/44.jpg",
        caption: "Photos don't do it justice, so I added a video too. Swipe to see the waves! 🌊",
        title: "Ocean Waves",
        userId: 102,
        // MIX: Image -> Video
        contentUrls: [
            "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=500",
            "https://vjs.zencdn.net/v/oceans.mp4"
        ],
        likeCount: 3200,
        commentCount: 156,
        isLiked: true,
        createdAt: new Date(2026, 1, 23).toISOString()
    },
    {
        id: 3003,
        authorName: "AbstractArch",
        profilePictureUrl: "https://randomuser.me/api/portraits/men/85.jpg",
        caption: "Angles that break the mind. Watch the quick tour, then check the stills.",
        title: "Abstract Geometry Tour",
        userId: 103,
        // MIX: Video -> Image
        contentUrls: [
            "https://vjs.zencdn.net/v/oceans.mp4",
            "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=500"
        ],
        likeCount: 840,
        commentCount: 22,
        isLiked: false,
        createdAt: new Date(2026, 1, 22).toISOString()
    },
    {
        id: 3004,
        authorName: "NatureDocumentary",
        profilePictureUrl: "https://randomuser.me/api/portraits/women/68.jpg",
        caption: "The sheer power of the ocean in one clip.",
        title: "Ocean Currents",
        userId: 104,
        // Single Video
        contentUrls: ["https://vjs.zencdn.net/v/oceans.mp4"],
        likeCount: 4500,
        commentCount: 310,
        isLiked: false,
        createdAt: new Date(2026, 1, 21).toISOString()
    },
    {
        id: 3005,
        authorName: "GeoMinimalist",
        profilePictureUrl: "https://randomuser.me/api/portraits/men/22.jpg",
        caption: "Multiple angles of this beauty. 📐",
        title: "Abstract Details",
        userId: 105,
        // MIX: Image -> Image -> Video
        contentUrls: [
            "https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?auto=format&fit=crop&q=80&w=500",
            "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=500",
            "https://vjs.zencdn.net/v/oceans.mp4"
        ],
        likeCount: 1205,
        commentCount: 41,
        isLiked: true,
        createdAt: new Date(2026, 1, 20).toISOString()
    },
    {
        id: 3006,
        authorName: "DeepBlue",
        profilePictureUrl: "https://randomuser.me/api/portraits/women/12.jpg",
        caption: "Surfing conditions look perfect today.",
        title: "Surf Check",
        userId: 106,
        // Single Video
        contentUrls: ["https://vjs.zencdn.net/v/oceans.mp4"],
        likeCount: 890,
        commentCount: 14,
        isLiked: false,
        createdAt: new Date(2026, 1, 19).toISOString()
    },
    {
        id: 3007,
        authorName: "SkylineChaser",
        profilePictureUrl: "https://randomuser.me/api/portraits/women/90.jpg",
        caption: "Reflections of the sky.",
        title: "Mirrored Skyscraper",
        userId: 108,
        // Single Image
        contentUrls: ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=500"],
        likeCount: 2100,
        commentCount: 66,
        isLiked: true,
        createdAt: new Date(2026, 1, 17).toISOString()
    },
    {
        id: 3008,
        authorName: "UrbanPlanner",
        profilePictureUrl: "https://randomuser.me/api/portraits/women/2.jpg",
        caption: "Finding a touch of green in a sea of gray.",
        title: "Hidden Park",
        userId: 110,
        // MIX: Video -> Image -> Video
        contentUrls: [
            "https://vjs.zencdn.net/v/oceans.mp4",
            "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=500",
            "https://vjs.zencdn.net/v/oceans.mp4"
        ],
        likeCount: 980,
        commentCount: 33,
        isLiked: false,
        createdAt: new Date(2026, 1, 15).toISOString()
    }
];

export default function SearchPage() {
    const [selectedPost, setSelectedPost] = useState<Post | null>();
    const setPostForModal = (id: number) => {
        const postIndex = mockExplorePosts.findIndex(p => p.id == id);
        setSelectedPost(mockExplorePosts[postIndex]);
    }
    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="mx-auto w-75 column-gap-1 p-3" style={{
                    columns: "3",
                }}>
                    {mockExplorePosts.map((media, index) => {
                        const isVideo = media.contentUrls[0].includes(".mp4");
                        if (!isVideo) return <img key={media.id}
                            onClick={() => setPostForModal(media.id)}
                            className="transparent-background-hover-2 mw-100 d-block mb-1"
                            src={media.contentUrls[0]} alt="" />
                        return (
                            <video key={media.id}
                                onClick={() => setPostForModal(media.id)}
                                className="transparent-background-hover-2 mw-100 d-block mb-1"
                                src={`${media.contentUrls[0]}#t=1`}
                                preload="metadata"
                                muted
                                playsInline
                            />
                        );
                    })}
                </div>
            </div>

            {
                selectedPost && (
                    <ExploreModal
                        post={selectedPost}
                        onClose={() => setSelectedPost(null)}
                    />
                )
            }
        </>
    )

};