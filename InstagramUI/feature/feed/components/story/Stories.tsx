"use client";
import { Story } from "@/types/feed";
import Link from "next/link";
import { useEffect, useRef } from "react";
import StoryItem from "./StoryItem";
import { useStoryStore } from "@/feature/story/store/useStoryStore";

type StoriesProps = {
    serverStories: Story[];
    userPhoto?: string; // Optional: Pass the logged-in user's photo
}

export default function Stories({ serverStories, userPhoto }: StoriesProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const { stories, setInitialStories } = useStoryStore();
    useEffect(() => {
        setInitialStories(serverStories);
    }, [serverStories, setInitialStories]);

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
                className="btn btn-light rounded-circle shadow-sm position-absolute start-0 top-50 translate-middle-y ms-2 z-1 d-flex align-items-center justify-content-center"
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

                {stories.map((story, index) => (
                    <StoryItem key={story.id} story={story} />
                ))}
            </div>
            <button
                className="btn btn-light rounded-circle shadow-sm position-absolute end-0 top-50 translate-middle-y me-2 z-1 d-flex align-items-center justify-content-center"
                style={{ width: "30px", height: "30px", border: "1px solid #dbdbdb" }}
                onClick={() => scroll("right")}
            >
                <i className="bi bi-chevron-right small"></i>
            </button>
        </div>
    )
};