import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserToken } from "@/feature/auth/services/auth-service";
import { SendMessage } from "@/types/messages";

export const fetchUserLastMessages = async () => {
    const token = await getLoggedUserToken();   
    const res = await fetch(`${BASE_ROUTE_URL}/messages/lastMessages`, {
        headers : {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    if(!res.ok) {
        console.error(res.status);
        return [];
    }
    return await res.json();
}

export const getChatHistory = async (chatId: number) => {
    const token = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}/messages/${chatId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if(!res.ok) {
        console.error(res.status);
        return []
    }
    return await res.json();
}

export const sendMessage = async (message: SendMessage) => {
    const token = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}/messages`, {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
            "Content-Type": "Application/Json",
            "Authorization": `Bearer ${token}`
        }
    });
    if(!res.ok) {
        console.error(res.status);
        return null;
    }

    return await res.json();
}