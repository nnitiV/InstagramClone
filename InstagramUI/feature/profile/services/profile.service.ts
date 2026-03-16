import { BASE_ROUTE_URL } from "@/constants"
import { getLoggedUserToken } from "@/feature/auth/services/auth-service";

export const getUserByUsername = async (username: string) => {
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}/user/${username}`, {
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) return null;
    return await res.json();
}

export const getUserById = async (id: number) => {
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}/user/${id}`, {
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) return null;
    return await res.json();
}

export const followUser = async (id: number) => {
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}/followers/${id}`, {
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
    const res = await fetch(`${BASE_ROUTE_URL}/followers/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${userToken}`,
        }
    });
    if (!res.ok) return false;
        return true;
}

export const checkFollowStatus = async (id: number) => {
    console.log("Id is: ", id);
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}/followers/${id}/status`, {
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
    const res = await fetch(`${BASE_ROUTE_URL}/followers/${userId}/followers`, {
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json",
        }
    })
    if(!res.ok) return [];
    return await res.json();
};

export const getFollowingList = async (userId: number) => {
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}/followers/${userId}/following`, {
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json",
        }
    })
    if(!res.ok) return [];
    return await res.json();
};

export const getUserPosts = async (userId: number) => {
    const token = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}/post/user/${userId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
    if(!res.ok) return [];
    return await res.json();
}