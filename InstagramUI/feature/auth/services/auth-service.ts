import { cookies } from "next/headers"

export const isAuthenticated = async () => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("token");
    const token = cookie?.value;
    return !!token;
}