import Register from "@/feature/auth/components/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SignUp • Instagram Clone",
    description: "Register to start sharing your content to your friends!",
};


export default function RegisterPage() {
    return (
        <main className="d-flex justify-content-center align-items-center bg-body-tertiary"
        style={{minHeight: "100dvh"}}>
            <Register />
        </main>
    )
};
