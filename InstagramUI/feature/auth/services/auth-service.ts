"use server";
import { BASE_ROUTE_URL, tokenName } from "@/constants";
import { cookies } from "next/headers"
import { RegisterUser, TokenPayload } from "../../../types/auth";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { EditUserProfile } from "@/types/user";

const route = "/auth"

export const handleLogin = async (login: string, password: string, rememberMe: boolean) => {
    const cookieStore = await cookies();
    const res = await fetch(`${BASE_ROUTE_URL}${route}/login`, {
        method: "POST",
        body: JSON.stringify({ login, password, rememberMe }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) {
        let errorMessage = "Login failed";
        const text = await res.text();
        const error = JSON.parse(text);
        throw new Error(error.Message + " " + errorMessage);
    }
    const data = await res.json();

    if (rememberMe) {
        const decode = jwtDecode<TokenPayload>(data.token);
        console.log("Decode:", decode);
        const expireDate = new Date(decode.exp * 1000);
        cookieStore.set({
            name: tokenName,
            httpOnly: true,
            value: data.token,
            expires: expireDate
        });
    } else {
        cookieStore.set({
            name: tokenName,
            value: data.token,
            httpOnly: true,
            secure: true,
        });
    }
}

export const handleRegister = async (registerInfo: RegisterUser) => {
    console.log(registerInfo);
    const res = await fetch(`${BASE_ROUTE_URL}${route}/register`, {
        method: "POST",
        body: JSON.stringify(registerInfo),
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (!res.ok) {
        const text = await res.text();
        const json = JSON.parse(text);
        throw new Error(json.Message);
    }
}

export const handleLogout = async () => {
    const cookieStore = await cookies();
    cookieStore.delete(tokenName);
    redirect("/login");
}

export const isAuthenticated = async () => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(tokenName);
    const token = cookie?.value;
    return !!token;
}

export const getLoggedUserToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get(tokenName)?.value;
    return token || null;
}

export const getLoggedUserTokenInfo = async () => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(tokenName);
    const token = cookie?.value;
    if (token == null) {
        // throw new Error("Not logged in!!");
        return null;
    }
    const decode = jwtDecode<TokenPayload>(token);
    return decode;
}

export const getLoggedUserInfo = async () => {
    const userId = (await getLoggedUserTokenInfo())?.sub;

    const res = await fetch(`${BASE_ROUTE_URL}/user/${userId}`, {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        }
    })
    if (!res.ok) {
        console.log("Not ok.");
        return;
    }

    const data = await res.json();
    return data;
}

export const updateUserProfile = async (editUser: EditUserProfile) => {
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${BASE_ROUTE_URL}/user`,
        {
            method: "PUT",
            body: JSON.stringify(editUser),
            headers: {
                'authorization': `Bearer ${userToken}`,
                'content-type': 'application/json',
            }
        });
    if (!res.ok) {
        return false;
    }

    return true;
}

export const uploadFile = async (selectedFile: File) => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    const res = await fetch(`${BASE_ROUTE_URL}/files/upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${await getLoggedUserToken()}`
        },
        body: formData
    });
    if(!res.ok) return "";
    const data = await res.json();
    console.log("Data:", data);
    return data.url;
}