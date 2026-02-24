"use client";
import CommentModal from "@/feature/feed/components/feed-comment/CommentModal";
import { Post } from "@/types/feed";
import { useState } from "react";
import ReactPlayer from "react-player";

export const mockExplorePosts: Post[] = [
    {
        id: 3001,
        authorName: "GlassAndSteel",
        profilePictureUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        caption: "Staring up into the abyss of modern corporate life. 🏢",
        title: "Corporate Skyscraper",
        userId: 101,
        // Image: Tall building
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
        caption: "Nothing beats the sound of the waves. Take a minute to relax. 🌊",
        title: "Ocean Waves",
        userId: 102,
        // Video: Oceans
        contentUrls: ["https://vjs.zencdn.net/v/oceans.mp4"],
        likeCount: 3200,
        commentCount: 156,
        isLiked: true,
        createdAt: new Date(2026, 1, 23).toISOString()
    },
    {
        id: 3003,
        authorName: "ConcreteJungle",
        profilePictureUrl: "https://randomuser.me/api/portraits/men/85.jpg",
        caption: "Forest architecture meeting urban spread.",
        title: "Urban Forest",
        userId: 103,
        // Image: Forest/Urban
        contentUrls: ["https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=500"],
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
        // Video: Oceans
        contentUrls: ["https://vjs.zencdn.net/v/oceans.mp4"],
        likeCount: 4500,
        commentCount: 310,
        isLiked: false,
        createdAt: new Date(2026, 1, 21).toISOString()
    },
    {
        id: 3005,
        authorName: "AbstractArch",
        profilePictureUrl: "https://randomuser.me/api/portraits/men/22.jpg",
        caption: "Angles that break the mind. 📐",
        title: "Abstract Geometry",
        userId: 105,
        // Image: Abstract building
        contentUrls: ["https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=500"],
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
        // Video: Oceans
        contentUrls: ["https://vjs.zencdn.net/v/oceans.mp4"],
        likeCount: 890,
        commentCount: 14,
        isLiked: false,
        createdAt: new Date(2026, 1, 19).toISOString()
    },
    {
        id: 3007,
        authorName: "GeoMinimalist",
        profilePictureUrl: "https://randomuser.me/api/portraits/men/41.jpg",
        caption: "Another view of the abstract center. Can't get enough of this building.",
        title: "Abstract Details",
        userId: 107,
        // Image: Abstract building
        contentUrls: ["https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=500"],
        likeCount: 760,
        commentCount: 9,
        isLiked: false,
        createdAt: new Date(2026, 1, 18).toISOString()
    },
    {
        id: 3008,
        authorName: "SkylineChaser",
        profilePictureUrl: "https://randomuser.me/api/portraits/women/90.jpg",
        caption: "Reflections of the sky.",
        title: "Mirrored Skyscraper",
        userId: 108,
        // Image: Tall building
        contentUrls: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=500"],
        likeCount: 2100,
        commentCount: 66,
        isLiked: true,
        createdAt: new Date(2026, 1, 17).toISOString()
    },
    {
        id: 3009,
        authorName: "SeaLife",
        profilePictureUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        caption: "A quick reel of the coastline from this morning.",
        title: "Morning Coast",
        userId: 109,
        // Video: Oceans
        contentUrls: ["https://vjs.zencdn.net/v/oceans.mp4"],
        likeCount: 345,
        commentCount: 5,
        isLiked: false,
        createdAt: new Date(2026, 1, 16).toISOString()
    },
    {
        id: 3010,
        authorName: "UrbanPlanner",
        profilePictureUrl: "https://randomuser.me/api/portraits/women/2.jpg",
        caption: "Finding a touch of green in a sea of gray.",
        title: "Hidden Park",
        userId: 110,
        // Image: Forest/Urban
        contentUrls: ["https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=500"],
        likeCount: 980,
        commentCount: 33,
        isLiked: false,
        createdAt: new Date(2026, 1, 15).toISOString()
    },
    {
        id: 3011,
        authorName: "MarineBio",
        profilePictureUrl: "https://randomuser.me/api/portraits/men/55.jpg",
        caption: "Tracking the tide changes.",
        title: "Tide Watch",
        userId: 111,
        // Video: Oceans
        contentUrls: ["https://vjs.zencdn.net/v/oceans.mp4"],
        likeCount: 4200,
        commentCount: 112,
        isLiked: true,
        createdAt: new Date(2026, 1, 14).toISOString()
    },
    {
        id: 3012,
        authorName: "FutureCity",
        profilePictureUrl: "https://randomuser.me/api/portraits/women/55.jpg",
        caption: "Feels like a spaceship landed in the city.",
        title: "Spaceship Architecture",
        userId: 112,
        // Image: Abstract building
        contentUrls: ["https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=500"],
        likeCount: 1890,
        commentCount: 54,
        isLiked: false,
        createdAt: new Date(2026, 1, 13).toISOString()
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
                    <CommentModal
                        post={selectedPost}
                        onClose={() => setSelectedPost(null)}
                    />
                )
            }
        </>
    )

};