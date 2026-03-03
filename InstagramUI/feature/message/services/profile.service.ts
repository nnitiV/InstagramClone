import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserToken } from "@/feature/auth/services/auth-service";

export const fetchUserLastMessages = async () => {
    const token = await getLoggedUserToken();   
    const res = await fetch(`${BASE_ROUTE_URL}/messages/lastMessages`, {
        headers : {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    if(!res.ok) {
        return [];
    }
    return await res.json();
}