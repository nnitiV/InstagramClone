"use client";
import { Story } from "@/types/feed";
import { UIEvent, useEffect, useMemo, useRef, useState } from "react";
import StoryItem from "./StoryItem";
import { useStoryStore } from "@/feature/story/store/useStoryStore";

type StoriesProps = {
  serverStories: Story[];
};

const getUniqueUserStories = (stories: Story[]) => {
  const seen = new Set<string>();
  return stories.filter((item) => {
    if (seen.has(item.username)) return false;
    seen.add(item.username);
    return true;
  });
};

const sortStoriesForStore = (stories: Story[]) => {
  const groupedByUsername = stories.reduce((acc, story) => {
    if (!acc[story.username]) acc[story.username] = [];
    acc[story.username].push(story);
    return acc;
  }, {} as Record<string, Story[]>);

  const userGroups = Object.values(groupedByUsername).map((userStories) => {
    userStories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return {
      stories: userStories,
      mostRecentDate: new Date(userStories[0].createdAt).getTime(),
    };
  });

  userGroups.sort((a, b) => b.mostRecentDate - a.mostRecentDate);
  return userGroups.flatMap((group) => group.stories);
};

export default function Stories({ serverStories }: StoriesProps) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const { setInitialStories } = useStoryStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const storiesIcon = useMemo(() => getUniqueUserStories(serverStories), [serverStories]);
  const finalSortedStories = useMemo(() => sortStoriesForStore(serverStories), [serverStories]);

  useEffect(() => {
    if (finalSortedStories.length > 0) {
      setInitialStories(finalSortedStories);
    }
  }, [finalSortedStories, setInitialStories]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1); 
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 200; // Scroll maior no PC
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="position-relative w-100 border-bottom">
      {showLeftArrow && (
        <button
          className="btn btn-light rounded-circle shadow position-absolute start-0 top-50 translate-middle-y ms-2 z-1 d-flex align-items-center 
          justify-content-center transition-all"
          style={{ width: "30px", height: "30px", border: "1px solid #dbdbdb" }}
          onClick={() => scroll("left")}
        >
          <i className="bi bi-chevron-left small"></i>
        </button>
      )}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="d-flex flex-row overflow-x-auto py-3 no-scrollbar align-items-center"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          whiteSpace: "nowrap",
          scrollBehavior: "smooth",
        }}
      >
        {storiesIcon.map((story) => (
          <StoryItem key={story.id} story={story} />
        ))}
      </div>
      {showRightArrow &&
        storiesIcon.length > 5 && ( 
          <button
            className="btn btn-light rounded-circle shadow position-absolute end-0 top-50 translate-middle-y me-2 z-1 d-flex align-items-center justify-content-center 
            transition-all"
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid #dbdbdb",
            }}
            onClick={() => scroll("right")}
          >
            <i className="bi bi-chevron-right small"></i>
          </button>
        )}
    </div>
  );
}
