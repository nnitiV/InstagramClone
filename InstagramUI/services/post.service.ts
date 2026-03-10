import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserToken } from "@/feature/auth/services/auth-service"
import { PostToSave } from "@/types/post";

export const createPost = async (post: PostToSave) => {
    const token = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}/post`, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    if(!res.ok) return null;
    return await res.json();
}