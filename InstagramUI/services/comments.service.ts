import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserToken } from "@/services/auth.service";
import { PostComment } from "@/types/feed";

const route = "/comment"

export const getPostComments = async (postId: number) => {
    const token = await getLoggedUserToken();

    const res = await fetch(`${BASE_ROUTE_URL}${route}/allComments/${postId}`, {
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
    const res = await fetch(`${BASE_ROUTE_URL}${route}`, {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "Application/Json",
        }
    });
    if (!res.ok) {
        console.error(res);
        throw new Error("Couldn't save your comment.")
    }
    return await res.json();
}