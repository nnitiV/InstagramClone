"use server";

import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserInfo, getLoggedUserToken } from "@/feature/auth/services/auth-service";
import { PostComment } from "@/types/feed";

export const getStories = async () => {
    const token = await getLoggedUserToken();
    if (!token) return [];
    const res = await fetch(`${BASE_ROUTE_URL}/story`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        cache: "no-store"
    });
    if (!res.ok) {
        console.error(`Error fetching stories (${res.status})`);
        return [];
    }
    return await res.json();
}

export const getPosts = async () => {
    const token = await getLoggedUserToken();
    if (!token) return [];
    const res = await fetch(`${BASE_ROUTE_URL}/post/feed`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        cache: 'no-store'
    });
    if (!res.ok) {
        console.error(res.status);
        return [];
    }
    return await res.json();
}

export const getPostComments = async (postId: number) => {
    const token = await getLoggedUserToken();

    const res = await fetch(`${BASE_ROUTE_URL}/comment/allComments/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        cache: "no-store"
    });
    if (!res.ok) {
        console.error(res.status);
        return [];
    }
    return await res.json();
}

export const addPostComments = async (newComment: PostComment) => {
    const token = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}/comment`, {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "Application/Json",
        }
    });
    if (!res.ok) {
        console.error(res);
        return null;
    }
    return await res.json();
}