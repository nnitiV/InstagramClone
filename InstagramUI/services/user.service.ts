import { BASE_ROUTE_URL } from "@/constants"
import { getLoggedUserToken, getLoggedUserTokenInfo } from "@/services/auth.service";
import { EditUserProfile } from "@/types/user";

const route = "/user";

export const getUserByUsername = async (username: string) => {
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${username}`, {
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) return null;
    return await res.json();
}

export const getLoggedUserInfo = async () => {
    const userId = (await getLoggedUserTokenInfo())?.sub;

    const res = await fetch(`${BASE_ROUTE_URL}${route}/${userId}`, {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        }
    })
    if (!res.ok) {
        return;
    }

    const data = await res.json();
    return data;
}

export const updateUserProfile = async (editUser: EditUserProfile) => {
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}${route}`,
        {
            method: "PUT",
            body: JSON.stringify(editUser),
            headers: {
                'authorization': `Bearer ${userToken}`,
                'content-type': 'application/json',
            }
        });
    if (!res.ok) {
        throw new Error("Couldn't update your profile.");
    }

    return true;
}

export const getUserById = async (id: number) => {
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${id}`, {
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) return null;
    return await res.json();
}

