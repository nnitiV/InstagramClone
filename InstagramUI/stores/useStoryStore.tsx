import { getStories } from "@/services/story.service";
import { Story } from "@/types/feed";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type StoryStore = {
    stories: Story[];
    fetchStories: () => Promise<void>;
    setInitialStories: (serverStories: Story[]) => unknown;
}

export const useStoryStore = create<StoryStore>()(
    persist(set => ({
        stories: [],
        fetchStories: async () => {
            set({stories: (await getStories()).stories});
        },
        setInitialStories: (serverStories: Story[]) => set({ stories: serverStories }),
    }),
    {
        name: "instagram-stories",
        storage: createJSONStorage(() => sessionStorage),
    }
));
