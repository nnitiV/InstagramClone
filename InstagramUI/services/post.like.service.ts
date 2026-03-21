import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserToken } from "@/services/auth.service";

const route = "/postLike"

// --- GET / READ / LOGIC ---

export const getPostLikeCount = async (postId: number) => {
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${postId}/count`);
    if(!res.ok) {
        console.error(res.status);
        return 0;
    }
    return await res.json();
}

// --- POST / DELETE / WRITE / ACTIONS ---

export const likePost = async (postId: number) => {
    const token = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "Application/Json",
            "Authorization": `Bearer ${token}`
        }
    });
    if(!res.ok) {
        console.error(res.status);
        throw new Error("Couldn't like the post.");
    }
    return await res.json();
}

export const unlikePost = async (postId: number) => {
    const token = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "Application/Json",
            "Authorization": `Bearer ${token}`
        }
    });
    if(!res.ok) {
        console.error(res.status);
        throw new Error("Couldn't unlike the post.");
    }
    return await res.json();
}