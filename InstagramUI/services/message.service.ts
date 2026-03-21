import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserToken } from "@/services/auth.service";
import { SendMessage } from "@/types/messages";

const route = "/messages"

export const fetchUserLastMessages = async () => {
    const token = await getLoggedUserToken();   
    const res = await fetch(`${BASE_ROUTE_URL}${route}/lastMessages`, {
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
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${chatId}`, {
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

export const sendMessageService = async (message: SendMessage) => {
    const token = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}${route}`, {
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
