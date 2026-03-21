"use client";
import MessageSidebar from "@/feature/message/components/MessageSidebar";
import SendMessageModal from "@/feature/message/components/SendMessageModal";
import { useChatStore } from "@/stores/useChatStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SwitchAccountModal from "../../feature/message/components/SwitchAccountModal";
import { fetchUserLastMessages } from "@/services/message.service";

export default function SearchPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const isInsideChat = !!params.id;
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const sideBarChats = useChatStore((state) => state.sideBarChats);
  const setSideBarChats = useChatStore((state) => state.setSideBarChats);
  useEffect(() => {
    const getAllUserLastMessages = async () => {
      const res = await fetchUserLastMessages();
      setSideBarChats(res.messages);
    };
    getAllUserLastMessages();

    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);
  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <MessageSidebar
          lastMessages={sideBarChats}
          shouldHideSidebar={!isInsideChat && isMobile}
          width={isMobile ? "100vw" : "clamp(300px, 40%, 400px)"}
        />
        <div
          className={`d-flex justify-content-center align-items-center h-100 w-100  
            ${!isInsideChat && isMobile ? "d-none" : "d-flex"}`
          }
        >
          {children}
        </div>
      </div>
      <SwitchAccountModal />
      <SendMessageModal />
    </>
  );
}
