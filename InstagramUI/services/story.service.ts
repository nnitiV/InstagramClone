import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserToken } from "@/feature/auth/services/auth-service";
import { StoryToSave } from "@/types/story";

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