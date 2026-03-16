import { Post } from "@/types/feed";
import { create } from "zustand";

type PostStore = {
    posts: Post[];
    setPosts: (posts: Post[]) => void;
    addPost: (post: Post) => void;
}

export const usePostStore = create<PostStore>((set) => ({
    posts: [],
    setPosts: (posts) => set({ posts }),
    addPost: (post) => set((state) => ({ 
        posts: [post, ...state.posts] // Adiciona no topo
    })),
}));