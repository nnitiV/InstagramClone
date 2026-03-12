"use client";
import { useChatStore } from "@/stores/useChatStore";
import { useEffect } from "react";

export default function ChatProvider() {
  const connect = useChatStore((state) => state.connect);
  const disconnect = useChatStore((state) => state.disconnect);

  useEffect(() => {
    connect();
    return () => {
        disconnect();
    };
  }, [connect, disconnect]);
  return null;
}
