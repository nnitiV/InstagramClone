import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserToken } from "@/feature/auth/services/auth-service"
import { PostToSave, StoryToSave } from "@/types/post";

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
    console.log(res);
    if(!res.ok) {
        console.error(res);
        return null;
    }
    return await res.json();
}

export const createStory = async (story: StoryToSave) => {
    const token = await getLoggedUserToken();
    const formData = new FormData();
    formData.append("File", story.file);
    const res = await fetch(`${BASE_ROUTE_URL}/story`, {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    if(!res.ok) return null;
    return await res.json();
}