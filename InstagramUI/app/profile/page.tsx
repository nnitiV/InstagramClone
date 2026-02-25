"use client";
import { Post } from "@/types/feed";
import { useState } from "react";
import ExploreModal from "../explore/ExploreModal";

export default function SearchPage() {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const userProfile = {
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
        // Posts reais tipados como Post[] para seu componente
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
    return (
        <>
            <div className="vh-100 py-5">
                <div className="profile-header d-flex align-items-center w-75 mx-auto my-3">
                    <img className="transparent-background-hover-2 rounded-circle me-5" style={{ width: "156px", height: "156px" }} src={userProfile.avatarUrl ? userProfile.avatarUrl : "https://images.unsplash.com/photo-1463453091185-61582044d556?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbSUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"} alt="" />
                    <div className="user-info">
                        <p className="m-0 p-0 fs-5 fw-bold" style={{ fontSize: ".75rem" }} >{userProfile.username}</p>
                        <p className="m-0 p-0 mt-1" style={{ fontSize: ".75rem" }} >{userProfile.name}</p>
                        <div className="user-sub-info d-flex my-2">
                            <p className="m-0 p-0" style={{ fontSize: ".75rem" }} > <span className="fw-bold m">{userProfile.stats.posts}</span> posts</p>
                            <p className="m-0 p-0 mx-3" style={{ fontSize: ".75rem" }} > <span className="fw-bold m">{userProfile.stats.followers}</span> followers</p>
                            <p className="m-0 p-0" style={{ fontSize: ".75rem" }} > <span className="fw-bold m">{userProfile.stats.following}</span> following</p>
                        </div>
                        <p className="m-0 p-0 w-75" style={{ fontSize: ".75rem" }} >
                            {userProfile.bio}
                        </p>
                        <p className="m-0 p-0 my-2 fw-bold" style={{ fontSize: ".75rem" }} >@{userProfile.username}</p>
                    </div>
                </div>
                <div className="user-buttons w-75 mx-auto">
                    <button type="button" className="btn btn-primary w-25 me-3">Follow</button>
                    <button type="button" className="btn btn-light border border-2 btn-custom w-25">Message</button>
                </div>
                <div className="profile-highlights mt-5 w-75 mx-auto d-flex">
                    {userProfile.highlights.map((highlight, _) => (
                        <div className="transparent-background-hover-2 d-flex flex-column text-center me-3 cursor-pointer" style={{ width: "fit-content" }}>
                            <img className="rounded-circle border border-5" style={{ width: "96px", height: "96px" }} src={highlight.cover ? highlight.cover : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"} alt="" />
                            <p className="p-0 m-0">{highlight.name}</p>
                        </div>
                    ))}
                </div>
                <div className="user-posts my-5 pb-3 w-75 mx-auto row row-cols-3 gap-3">
                    {userProfile.posts.map((post, _) => (
                        <div onClick={() => setSelectedPost(post)} className="bg-secondary transparent-background-hover-2 p-0 m-0" style={{ width: "250px", height: "350px" }}>
                            {post.contentUrls[0].includes("mp4") ?
                                <video className="w-100 h-100" loop muted src={`${post.contentUrls[0]}#t=0`}></video>
                                :
                                <img className="w-100 h-100" src={post.contentUrls[0]} alt="" />
                            }
                        </div>
                    ))}
                </div>
            </div>
            {selectedPost && 
                <ExploreModal post={selectedPost} onClose={() => setSelectedPost(null)} />
            }
        </>
    )
};

