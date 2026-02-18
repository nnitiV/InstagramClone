"use server";
import { BASE_ROUTE_URL, tokenName } from "@/constants";
import { cookies } from "next/headers"
import { RegisterUser, TokenPayload } from "../../../types/auth";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";

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

export const getUserInfo = async () => {
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