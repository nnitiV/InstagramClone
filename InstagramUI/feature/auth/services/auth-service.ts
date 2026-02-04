"use server";
import { tokenName } from "@/constants";
import { cookies } from "next/headers"

export const handleLogin = async (login: string, password: string, rememberMe: boolean) => {
    const cookieStore = await cookies();
    console.log("Loggin in with:", login, password, rememberMe);
}

export const handleRegister = async () => {
}

export const isAuthenticated = async () => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(tokenName);
    const token = cookie?.value;
    return !!token;
}