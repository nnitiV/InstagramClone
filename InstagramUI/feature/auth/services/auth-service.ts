"use server";
import { BASE_ROUTE_URL, tokenName } from "@/constants";
import { cookies } from "next/headers"
import { RegisterUser, TokenPayload } from "../../../types/auth";
import { jwtDecode } from "jwt-decode";

const route = "/auth"

export const handleLogin = async (login: string, password: string, rememberMe: boolean) => {
    const cookieStore = await cookies();
    const res = await fetch(`${BASE_ROUTE_URL}${route}/login`, {
        method: "POST",
        body: JSON.stringify({ login, password }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) {
        let errorMessage = "Login failed";
        const text = await res.text();
        const error = JSON.parse(text);
        throw new Error(error.Message);
    }
    const data = await res.json();

    console.log("Token:", data.token);
    const decode = jwtDecode<TokenPayload>(data.token);
    console.log("Decode:", decode);

    // if (rememberMe) {
    //     const expireDate = new Date(decode.exp * 1000);
    //     cookieStore.set({
    //         name: "ig_token",
    //         httpOnly: false,
    //         value: data.token,
    //         expires: expireDate
    //     });
    // } else {
    //     cookieStore.set({
    //         name: "ig_token",
    //         value: data.token,
    //     });
    // }
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

export const isAuthenticated = async () => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(tokenName);
    const token = cookie?.value;
    return !!token;
}