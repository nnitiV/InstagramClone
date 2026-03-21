import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserToken } from "@/services/auth.service";
import { StoryToSave } from "@/types/story";

const route = "/story"

// --- GET / READ / LOGIC ---

export const getUserFirstStory = async (username: string) => {
    const token = await getLoggedUserToken();
    if (!token) return [];
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${username}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        cache: "no-store"
    });
    if (!res.ok) {
        console.error(`Error fetching stories (${res.status})`);
        return null;
    }
    return await res.json();
}

export const getStories = async () => {
    const token = await getLoggedUserToken();
    if (!token) return [];
    const res = await fetch(`${BASE_ROUTE_URL}${route}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        cache: "no-store"
    });
    if (!res.ok) {
        console.error(`Error fetching stories (${res.status})`);
        return [];
    }
    return await res.json();
}

export const checkIfStoryIsActive = async (storyId: number) => {
    const token = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}/story/${storyId}/status`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    if(!res.ok) {
        console.error(res);
        return false;
    }
    return await res.json();
}

// --- POST / WRITE / ACTIONS ---

export const createStory = async (story: StoryToSave) => {
    const token = await getLoggedUserToken();
    const formData = new FormData();
    formData.append("File", story.file);
    const res = await fetch(`${BASE_ROUTE_URL}${route}`, {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    if(!res.ok) return null;
    return await res.json();
}