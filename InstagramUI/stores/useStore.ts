import { SearchResult } from "@/types/general";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SearchStore = {
    searchResults: SearchResult[];
    fetchSearchResults: () => Promise<void>;
}

export const useSearchStore = create<SearchStore>()(
    persist(set => ({
        searchResults: [],
        fetchSearchResults: async () => {
            // set({searchResults: await getSearchResults()});
            set({searchResults: []});
        },
    }),
    {
        name: "search-results",
        storage: createJSONStorage(() => sessionStorage),
    }
));
