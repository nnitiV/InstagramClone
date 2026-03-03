"use client"
import { useEffect, useState } from "react";
import SwitchAccountModal from "../../feature/message/components/SwitchAccountModal";
import MessageSidebar from "@/feature/message/components/MessageSidebar";
import { useParams } from "next/navigation";

export default function SearchPage({children}: {children: React.ReactNode}) {
    const params = useParams();
    const isInsideChat = !!params.id;
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        const checkWidth = () => {
            setIsMobile(window.innerWidth <= 768);
        }
        checkWidth();
        window.addEventListener("resize", checkWidth);
        return window.removeEventListener("resize", checkWidth);
    }, []);
    return (
        <>
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <MessageSidebar shouldHideSidebar={!isInsideChat && isMobile} width={isMobile ? "100vw" : "clamp(300px, 40%, 400px)"} />
                <div className={`d-flex justify-content-center align-items-center h-100 w-100  ${!isInsideChat && isMobile ? "d-none" : "d-flex"}`}>
                    {children}
                </div>
            </div>
            <SwitchAccountModal />
        </>
    );
};

