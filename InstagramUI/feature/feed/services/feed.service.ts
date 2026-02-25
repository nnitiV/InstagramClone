"use server";
// import { BASE_ROUTE_URL } from "@/constants";
// import { getLoggedUserToken } from "@/feature/auth/services/auth-service";

export const getStories = async () => {
    // const token = await getLoggedUserToken();
    // if (!token) return [];
    // const res = await fetch(`${BASE_ROUTE_URL}/story`, {
    //     method: "GET",
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json'
    //     },
    //     cache: "no-store"
    // });
    // if (!res.ok) {
    //     console.error(`Error fetching stories (${res.status})`);
    //     return [];
    // }
    // return await res.json();
    return [];
}

export const getPosts = async () => {
    // const token = await getLoggedUserToken();
    // if (!token) return [];
    // const res = await fetch(`${BASE_ROUTE_URL}/post/feed`, {
    //     method: "GET",
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json'
    //     },
    //     cache: 'no-store'
    // });
    // if (!res.ok) {
    //     console.error(res.status);
    //     return [];
    // }
    // return await res.json();
    return [];
}

export const getPostComments = async (postId: number) => {
    // const res = await fetch(`${BASE_ROUTE_URL}/comment/allComments/${postId}`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     cache: "no-store"
    // });
    // if (!res.ok) {
    //     console.error(res.status);
    //     return [];
    // }
    // return await res.json();
    return [];
}