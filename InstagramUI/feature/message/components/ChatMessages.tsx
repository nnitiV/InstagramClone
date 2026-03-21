import { MessageType } from "@/types/messages";
import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

type ChatMessagesProps = {
    chat: MessageType[];
    loggedUserId: number
}

export default function ChatMessages({ chat, loggedUserId }: ChatMessagesProps) {
    const messageEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(() => {
        scrollToBottom();
    }, [chat.length]);
    return (
        <div className="d-flex flex-column h-100 overflow-y-auto">
            <div className="flex-grow-1  p-3">
                {chat.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} loggedUserId={loggedUserId} />
                )
                )}
            </div>
            <div ref={messageEndRef}></div>
        </div>
    )
}
