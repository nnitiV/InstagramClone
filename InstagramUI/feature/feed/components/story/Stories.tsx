"use client";
import { Story } from "@/types/feed";
import { useEffect, useRef, useState } from "react";
import StoryItem from "./StoryItem";
import { useStoryStore } from "@/feature/story/store/useStoryStore";

type StoriesProps = {
  serverStories: Story[];
};

export default function Stories({ serverStories }: StoriesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [storiesIcon, setStoriesIcons] = useState<Story[]>([]);
  const { setInitialStories } = useStoryStore();
  useEffect(() => {
    let seen = new Set();
    let filteredStories = serverStories.filter((item) => {
      const value = item.username;
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      console.log(seen);
      return true;
    });
    setStoriesIcons(filteredStories);

    const stories = [...serverStories];

    const groupedByUsername = stories.reduce(
      (acc, story) => {
        if (!acc[story.username]) {
          acc[story.username] = [];
        }
        acc[story.username].push(story);
        return acc;
      },
      {} as Record<string, typeof stories>,
    );

    const userGroups = Object.values(groupedByUsername).map((userStories) => {
      userStories.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      const mostRecentDate = new Date(
        userStories[0].createdAt,
      ).getTime();

      return {
        stories: userStories,
        mostRecentDate,
      };
    });

    userGroups.sort((a, b) => b.mostRecentDate - a.mostRecentDate);
    const finalSortedStories = userGroups.flatMap((group) => group.stories);

    setInitialStories(finalSortedStories);
  }, [serverStories, setInitialStories]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 200;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="position-relative w-100 border-bottom">
      <button
        className="btn btn-light rounded-circle shadow-sm position-absolute start-0 top-50 translate-middle-y ms-2 z-1 d-flex 
        align-items-center justify-content-center"
        style={{ width: "30px", height: "30px", border: "1px solid #dbdbdb" }}
        onClick={() => scroll("left")}
      >
        <i className="bi bi-chevron-left small"></i>
      </button>
      <div
        ref={scrollRef}
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
      <button
        className="btn btn-light rounded-circle shadow-sm position-absolute end-0 top-50 translate-middle-y
                me-2 z-1 d-flex align-items-center justify-content-center"
        style={{ width: "30px", height: "30px", border: "1px solid #dbdbdb" }}
        onClick={() => scroll("right")}
      >
        <i className="bi bi-chevron-right small"></i>
      </button>
    </div>
  );
}
