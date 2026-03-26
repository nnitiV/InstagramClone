import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserToken } from "@/services/auth.service";
import { PostComment } from "@/types/feed";

const route = "/commentLike";

// --- GET / READ / LOGIC ---

export const checkCommentLikeStatus = async (commentId: number) => {
    const token = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${commentId}/status`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if(!res.ok) {
        console.error(res);
        return null;
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
        return [];
    }
    return await res.json();
}

// --- POST / DELETE / WRITE / ACTIONS ---

export const addPostComment = async (newComment: PostComment) => {
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

export const likeComment = async (commentId: number) => {
    const token = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${commentId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if(!res.ok) {
        console.error(res);
        return null;
    }
    return await res.json();
}

export const unlikeComment = async (commentId: number) => {
    const token = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${commentId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if(!res.ok) {
        console.error(res);
        return null;
    }
    return await res.json();
}