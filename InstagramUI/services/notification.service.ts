import { BASE_ROUTE_URL } from "@/constants";
import {  getLoggedUserToken } from "@/feature/auth/services/auth-service";


export const fetchNotifications = async () => {
    const token = await getLoggedUserToken();

    const res = await fetch(`${BASE_ROUTE_URL}/notification`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if(!res.ok) {
        console.error(res);
        return [];
    }
    return await res.json();
}