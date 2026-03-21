import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserToken } from "@/services/auth.service";

const route = "/commentLike";

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