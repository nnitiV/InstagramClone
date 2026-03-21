import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserToken } from "@/services/auth.service";

const route = "/storyLike";

// --- GET / READ / LOGIC ---

export const checkStoryLikeStatus = async (id?: number) => {
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${id}/status`, {
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) {
        console.error(res);
        return null;    
    }
    return await res.json();
}

// --- POST / DELETE / WRITE / ACTIONS ---

export const likeStory = async (id: number) => {
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${id}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) {
        console.error(res);
        return false;    
    }
    return true;
}

export const unlikeStory = async (id: number) => {
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${userToken}`,
        }
    });
    if (!res.ok) {
        console.error(res);
        return false;    
    }
        return true;
}