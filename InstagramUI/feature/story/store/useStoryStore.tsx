import { getStories } from "@/feature/feed/services/feed.service";
import { Story } from "@/types/feed";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type StoryStore = {
    stories: Story[],
    fetchStories: () => Promise<void>
}

export const useStoryStore = create<StoryStore>()(
    persist(set => ({
        stories: [],
        fetchStories: async () => {
            set({stories: await getStories()});
        },
    }),
    {
        name: "instagram-stories",
        storage: createJSONStorage(() => sessionStorage),
    }
));
