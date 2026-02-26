import { Story } from "@/types/feed";
import { useMemo } from "react";

// Funções utilitárias puras (fora do Hook)
export const getSecondPreviousStory = (
    startIndex: number, 
    firstPrev: Story | null, 
    stories: Story[]
): Story | null => {
    if (!firstPrev || startIndex - 2 < 0) return null;
    
    let pos = startIndex - 2;
    while (pos >= 0) {
        if (stories[pos].username.toLowerCase() !== firstPrev.username.toLowerCase()) {
            return stories[pos];
        }
        pos--;
    }
    return null;
};

export const getSecondAfterStory = (
    lastIndex: number, 
    firstAfter: Story | null, 
    stories: Story[]
): Story | null => {
    if (!firstAfter || lastIndex + 2 >= stories.length) return null;

    let pos = lastIndex + 2;
    while (pos < stories.length) {
        if (stories[pos].username.toLowerCase() !== firstAfter.username.toLowerCase()) {
            return stories[pos];
        }
        pos++;
    }
    return null;
};

// Hook Orquestrador
export const useStoryNavigation = (stories: Story[], storyId: number) => {
    return useMemo(() => {
        const activeStoryIndex = stories.findIndex(s => s.id == storyId);
        const activeStory = stories[activeStoryIndex];
        
        if (!activeStory) return null;

        const storiesFiltered = stories.filter(
            s => s.username.toLowerCase() === activeStory.username.toLowerCase()
        );

        const activeStoryPosition = storiesFiltered.findIndex(s => s.id === activeStory.id);
        
        // Índices globais para navegação
        const firstActiveStoryIndex = stories.findIndex(s => s.id === storiesFiltered[0].id);
        const lastActiveUserStoryIndex = stories.findIndex(s => s.id === storiesFiltered[storiesFiltered.length - 1].id);

        const firstPrev = firstActiveStoryIndex > 0 ? stories[firstActiveStoryIndex - 1] : null;
        const firstAfter = lastActiveUserStoryIndex + 1 < stories.length ? stories[lastActiveUserStoryIndex + 1] : null;

        return {
            activeStory,
            activeStoryIndex,
            storiesFiltered,
            activeStoryPosition,
            firstPrev,
            firstAfter,
            firstActiveStoryIndex,
            lastActiveUserStoryIndex
        };
    }, [stories, storyId]);
};
