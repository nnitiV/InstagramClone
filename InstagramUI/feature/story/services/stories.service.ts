import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserToken } from "@/feature/auth/services/auth-service";

export const likeStory = async (id: number) => {
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}/storyLike/${id}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) return false;
    return true;
}

export const unlikeStory = async (id: number) => {
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}/storyLike/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${userToken}`,
        }
    });
    if (!res.ok) return false;
        return true;
}

export const checkStoryLikeStatus = async (id?: number) => {
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}/storyLike/${id}/status`, {
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) return null;
    return await res.json();
}
