"use client";
import { Story } from "@/types/feed";
import Link from "next/link";
import { useRef } from "react";

type StoriesProps = {
    stories: Story[];
    userPhoto?: string; // Optional: Pass the logged-in user's photo
}

export default function Stories({ stories, userPhoto }: StoriesProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 200;
            current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="position-relative w-100 border-bottom">
            <button
                className="btn btn-light rounded-circle shadow-sm position-absolute start-0 top-50 translate-middle-y ms-2 z-1 d-none d-md-flex align-items-center justify-content-center"
                style={{ width: "30px", height: "30px", border: "1px solid #dbdbdb" }}
                onClick={() => scroll("left")}
            >
                <i className="bi bi-chevron-left small"></i>
            </button>
            <div
                ref={scrollRef}
                className="d-flex flex-row overflow-x-auto py-3 no-scrollbar align-items-center"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", whiteSpace: "nowrap", scrollBehavior: "smooth" }}
            >
                <Link href="#" className="text-decoration-none text-body">
                        <div
                            className="d-flex flex-column align-items-center px-2 cursor-pointer"
                            style={{ minWidth: "85px" }}
                        >
                            <div className="p-1 rounded-circle border border-2 border-danger position-relative">
                                <img
                                    src={userPhoto}
                                    alt="Story"
                                    className="rounded-circle"
                                    style={{ width: "62px", height: "62px", objectFit: "cover", border: "2px solid white" }}
                                />
                            </div>
                            <p className="text-truncate small mt-1 mb-0 text-center" style={{ maxWidth: "70px", fontSize: "11px" }}>
                                Your story
                            </p>
                        </div>
                    </Link>

                {stories.map((story, index) => (
                    <Link href={`/stories/${story.username}`} className="text-decoration-none text-body">
                        <div
                            key={index}
                            className="d-flex flex-column align-items-center px-2 cursor-pointer"
                            style={{ minWidth: "85px" }}
                        >
                            <div className="p-1 rounded-circle border border-2 border-danger position-relative">
                                <img
                                    src={story.profilePictureUrl == null ? "https://cdn-icons-png.flaticon.com/512/6522/6522516.png" : story.profilePictureUrl}
                                    alt="Story"
                                    className="rounded-circle"
                                    style={{ width: "62px", height: "62px", objectFit: "cover", border: "2px solid white" }}
                                />
                            </div>
                            <p className="text-truncate small mt-1 mb-0 text-center" style={{ maxWidth: "70px", fontSize: "11px" }}>
                                {story.username}
                                {/* {storyIndex} */}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            <button
                className="btn btn-light rounded-circle shadow-sm position-absolute end-0 top-50 translate-middle-y me-2 z-1 d-none d-md-flex align-items-center justify-content-center"
                style={{ width: "30px", height: "30px", border: "1px solid #dbdbdb" }}
                onClick={() => scroll("right")}
            >
                <i className="bi bi-chevron-right small"></i>
            </button>
        </div>
    )
};