import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserToken } from "@/feature/auth/services/auth-service"
import { PostToSave  } from "@/types/post";

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

export const deletePost = async (postId: number) => {
    const token = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}/post/${postId}`, {
        method:"DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if(!res.ok) {
        console.error(res);
        return null;
    }
    return await res.json();
}

export const updatePost = async (postToUpdate: PostToSave) => {
    const token = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}/post`, {
        method: "PUT",
        body: JSON.stringify(postToUpdate),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    if(!res.ok) {
        console.error(res);
        return null;
    }
    return await res.json();
}