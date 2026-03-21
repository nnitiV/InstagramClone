import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserToken } from "@/services/auth.service"
import { PostToSave  } from "@/types/post";

const route = "/post";


export const getPostByid = async (postId: number) => {
    const token = await getLoggedUserToken();
    if(!token) return null;
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${postId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    if(!res.ok) {
        console.error(res);
        return null;
    }
    return await res.json();
}

export const getPostsFeed = async () => {
    const token = await getLoggedUserToken();
    if (!token) return [];
    const res = await fetch(`${BASE_ROUTE_URL}/post/feed`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        cache: 'no-store'
    });
    if (!res.ok) {
        console.error(res.status);
        return [];
    }
    return await res.json();
}


export const createPost = async (post: PostToSave) => {
    const token = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}${route}`, {
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
    const res = await fetch(`${BASE_ROUTE_URL}${route}/${postId}`, {
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
    const res = await fetch(`${BASE_ROUTE_URL}${route}`, {
        method: "PUT",
        body: JSON.stringify(postToUpdate),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    if(!res.ok) {
        console.error(res);
        throw new Error("Couldn't update post.");
    }
    return await res.json();
}

export const getUserPosts = async (userId: number) => {
    const token = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}${route}/user/${userId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
    if(!res.ok) return [];
    return await res.json();
}