import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserToken } from "@/services/auth.service";
import { getLoggedUserInfo } from "./user.service";

const route = "/followers";

export const followUser = async (id: number) => {
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${id}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) return false;
    return true;
}

export const unfollowUser = async (id: number) => {
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${userToken}`,
        }
    });
    if (!res.ok) return false;
        return true;
}

export const checkFollowStatus = async (id: number) => {
    const userToken = await getLoggedUserToken();
    if((await getLoggedUserInfo()).id == id) return;
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${id}/status`, {
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) return null;
    return await res.json();
}

export const getFollowersList = async (userId: number) => {
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${userId}${route}`, {
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json",
        }
    })
    if(!res.ok) {
        console.error(res);
        throw new Error("Couldn't fetch followers list");
    };
    return await res.json();
};

export const getFollowingList = async (userId: number) => {
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${userId}/following`, {
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json",
        }
    })
    if(!res.ok) {
        console.error(res);
        throw new Error("Couldn't fetch following list");
    };
    return await res.json();
};