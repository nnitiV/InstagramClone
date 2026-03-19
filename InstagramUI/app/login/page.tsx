import Login from "@/feature/auth/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login • Instagram Clone",
    description: "Signup to see your friends' photos and videos",
};

export default function LoginPage() {
    return (
        <main className="d-flex justify-content-center align-items-center bg-body-tertiary" style={{minHeight: "100dvh"}}>
            <Login />
        </main>
    )
};