"use client";
import { use, useMemo } from "react";
import { useStoryStore } from "@/stores/useStoryStore";
import ActiveStory from "@/feature/story/components/ActiveStory";
import StoryPreview from "@/feature/story/components/StoryPreview";
import InstagramLogo from "@/components/ui/InstagramLogo";
import { getSecondAfterStory, getSecondPreviousStory, useStoryNavigation } from "@/hooks/useStoryNavigation";
import { useRouter } from "next/navigation";

type StoriesPageProps = {
    params: Promise<{ username: string, storyId: number }>;
}

export default function StoriesPage({ params }: StoriesPageProps) {
    const { storyId } = use(params);
    const router = useRouter();
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
      <div
        className="position-relative text-center d-flex justify-content-center align-items-center vh-100 text-primary"
        style={{ background: "rgba(25,25,25)" }}
      >
        <InstagramLogo isIcon={false} />
        <button 
            className="p-3 position-absolute bg-transparent border-0 z-3 bg-danger" 
            onClick={() => router.back()} 
            style={{ top: 25, right: 50 }}
            aria-label="Close story"
        >
          <i className="bi bi-x-lg fs-3 text-white fw-bold"></i>
        </button>

        <ActiveStory
          key={activeStory.id}
          activeStory={activeStory}
          activeStoryPosition={activeStoryPosition}
          amountOfActiveStory={storiesFiltered.length}
          thereBefore={activeStoryIndex > 0}
          thereAfter={activeStoryIndex + 1 < stories.length}
          firstPreviousStory={
            activeStoryIndex > 0
              ? {
                  id: stories[activeStoryIndex - 1].id,
                  username: stories[activeStoryIndex - 1].username,
                }
              : { id: -1, username: "" }
          }
          firstAfterStory={
            activeStoryIndex + 1 < stories.length
              ? {
                  id: stories[activeStoryIndex + 1].id,
                  username: stories[activeStoryIndex + 1].username,
                }
              : { id: -1, username: "" }
          }
        />

        {secondPreviousStory && (
          <StoryPreview story={secondPreviousStory} storyPosition={-2} />
        )}
        {firstPrev && <StoryPreview story={firstPrev} storyPosition={-1} />}
        {firstAfter && <StoryPreview story={firstAfter} storyPosition={1} />}
        {secondAfterStory && (
          <StoryPreview story={secondAfterStory} storyPosition={2} />
        )}
      </div>
    );
}