"use client";
import { use, useMemo } from "react";
import Link from "next/link";
import { useStoryStore } from "@/feature/story/store/useStoryStore";
import ActiveStory from "@/feature/story/components/ActiveStory";
import StoryPreview from "@/feature/story/components/StoryPreview";
import { STORIES_MOCK } from "@/feature/story/constants/data";
import InstagramLogo from "@/components/ui/InstagramLogo";
import { getSecondAfterStory, getSecondPreviousStory, useStoryNavigation } from "@/feature/story/hooks/useStoryNavigation";

type StoriesPageProps = {
    params: Promise<{ username: string, storyId: number }>;
}

export default function StoriesPage({ params }: StoriesPageProps) {
    const { storyId } = use(params);
    const stories = useStoryStore(state => state.stories);

    const nav = useStoryNavigation(stories, storyId);

    const secondPreviousStory = useMemo(() => {
        if (!nav) return null;
        return getSecondPreviousStory(nav.firstActiveStoryIndex, nav.firstPrev, stories);
    }, [nav, stories]);

    const secondAfterStory = useMemo(() => {
        if (!nav) return null;
        return getSecondAfterStory(nav.lastActiveUserStoryIndex, nav.firstAfter, stories);
    }, [nav, stories]);

    if (!nav) return null;

    const { 
        activeStory, 
        activeStoryIndex, 
        activeStoryPosition, 
        storiesFiltered, 
        firstPrev, 
        firstAfter
    } = nav;

    return (
        <div className="position-relative text-center d-flex justify-content-center align-items-center vh-100 text-primary"
            style={{ background: "rgba(25,25,25)" }}
        >
            <InstagramLogo />
            <Link href="/"><i className="bi bi-x-lg position-absolute fs-3 text-white fw-bold" style={{ top: 25, right: 50 }}></i></Link>
            
            <ActiveStory 
                activeStory={activeStory} 
                activeStoryPosition={activeStoryPosition} 
                amountOfActiveStory={storiesFiltered.length} 
                thereBefore={activeStoryIndex > 0} 
                thereAfter={activeStoryIndex + 1 < stories.length}
                firstPreviousStory={activeStoryIndex > 0 ? { id: stories[activeStoryIndex - 1].id, username: stories[activeStoryIndex - 1].username } : { id: -1, username: "" }}
                firstAfterStory={activeStoryIndex + 1 < stories.length ? { id: stories[activeStoryIndex + 1].id, username: stories[activeStoryIndex + 1].username } : { id: -1, username: "" }} 
            />

            {secondPreviousStory && <StoryPreview story={secondPreviousStory} storyPosition={-2} />}
            {firstPrev && <StoryPreview story={firstPrev} storyPosition={-1} />}
            {firstAfter && <StoryPreview story={firstAfter} storyPosition={1} />}
            {secondAfterStory && <StoryPreview story={secondAfterStory} storyPosition={2} />}
        </div>
    )
}