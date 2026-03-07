import { BASE_ROUTE_URL } from "@/constants"
import { getLoggedUserInfo, getLoggedUserToken, getLoggedUserTokenInfo, updateUserProfile } from "@/feature/auth/services/auth-service";
import { EditUserProfile } from "@/types/user";

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
    const userToken = await getLoggedUserToken();
    console.log(`Is user with id ${(await getLoggedUserTokenInfo())?.sub} following user with id ${id}?`);
    const res = await fetch(`${BASE_ROUTE_URL}/followers/${id}/status`, {
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) return null;
    return await res.json();
}