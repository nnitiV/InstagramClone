"use client";
import { useRef } from "react";

type StoriesProps = {
    stories: number[];
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
                {/* 1. THE "EMPTY STORY" (ADD NEW) BUBBLE */}
                <div className="d-flex flex-column align-items-center px-2 cursor-pointer position-relative" style={{ minWidth: "85px" }}>
                    <div className="position-relative">
                        {/* User Profile Pic (No red border) */}
                        <img
                            src={userPhoto || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            alt="Add Story"
                            className="rounded-circle border"
                            style={{ width: "62px", height: "62px", objectFit: "cover" }}
                        />

                        {/* The Blue Plus Badge */}
                        <div
                            className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center border border-2 border-white"
                            style={{ width: "22px", height: "22px", right: "2px", bottom: "2px" }}
                        >
                            <i className="bi bi-plus fw-bold" style={{ fontSize: "18px" }}></i>
                        </div>
                    </div>
                    <p className="text-truncate small mt-1 mb-0 text-center text-muted" style={{ maxWidth: "70px", fontSize: "11px" }}>
                        Your story
                    </p>
                </div>

                {/* 2. THE REST OF THE STORIES */}
                {stories.map((storyIndex) => (
                    <div
                        key={storyIndex}
                        className="d-flex flex-column align-items-center px-2 cursor-pointer"
                        style={{ minWidth: "85px" }}
                    >
                        <div className="p-1 rounded-circle border border-2 border-danger position-relative">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
                                alt="Story"
                                className="rounded-circle"
                                style={{ width: "62px", height: "62px", objectFit: "cover", border: "2px solid white" }}
                            />
                        </div>
                        <p className="text-truncate small mt-1 mb-0 text-center" style={{ maxWidth: "70px", fontSize: "11px" }}>
                            User {storyIndex}
                        </p>
                    </div>
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