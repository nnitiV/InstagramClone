import { create } from "zustand";
import { persist } from "zustand/middleware";


type ThemeStoreType = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStoreType>()(
    persist(
        (set) => ({
            theme: "light",
            toggleTheme: () => set((state) => ({
                theme: state.theme.toLocaleLowerCase() == "light" ? "dark" : "light"
            })),
        }),
        { name: "theme-storage" },
    )
);