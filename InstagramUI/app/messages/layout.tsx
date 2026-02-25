"use client"
import SwitchAccountModal from "../../feature/message/components/SwitchAccountModal";
import MessageSidebar from "@/feature/message/components/MessageSidebar";

export default function SearchPage({children}: {children: React.ReactNode}) {
    
    return (
        <>
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <MessageSidebar />
                <div className="d-flex justify-content-center align-items-center h-100" style={{ width: "80vw" }}>
                    {children}
                </div>
            </div>
            <SwitchAccountModal />
        </>
    )
};

