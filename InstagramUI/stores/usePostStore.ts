import { Post } from "@/types/feed";
import { create } from "zustand";

type PostStore = {
    posts: Post[];
    setPosts: (posts: Post[]) => void;
    addPost: (post: Post) => void;
    updatePost: (post: Post) => void;
    deletePost: (postId: number) => void;
}

export const usePostStore = create<PostStore>((set) => ({
    posts: [],
    setPosts: (posts) => set({ posts }),
    addPost: (post) => set((state) => ({ 
            posts: [post, ...state.posts] // Adiciona no topo
    })),
    updatePost: (updatedPost) => set((state) => ({
        posts: state.posts.map((p) => 
            p.id === updatedPost.id ? { ...p, ...updatedPost } : p
        )
    })),
    deletePost: (postId) => set((state) => ({
        posts: state.posts.filter(p => p.id != postId)
    })),
}));