import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserToken } from "@/feature/auth/services/auth-service"

export const searchUsers = async (searchTerm: string) => {
    const token = await getLoggedUserToken();
    const response = await fetch(`${BASE_ROUTE_URL}/search?searchTerm=${searchTerm}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type" : "application/json",
        }
    });
    if(!response.ok) {
        return [];
    }
    return await response.json();
}