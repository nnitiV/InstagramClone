"use client"
import ChatHeader from "@/feature/message/components/ChatHeader";
import ChatMessages from "@/feature/message/components/ChatMessages";
import { MOCK_CHAT_HISTORY } from "@/feature/message/constants/data";
import { MessageType } from "@/types/messages";
import { use, useState } from "react";

type ChatPageProps = {
    params: Promise<{ id: number }>;
}
export default function MessageContentPage({ params }: ChatPageProps) {
    const { id } = use(params);
    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<MessageType[]>(MOCK_CHAT_HISTORY[id]);
    
    const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            if (message.length > 0) {
                setMessage("");
                // { id: 103, senderId: 1, text: "That facade design is incredible!", timestamp: "11:00 AM" }    
                setChat(prev => [...prev, {
                    id: chat[chat.length - 1].id + 1,
                    senderId: "me",
                    text: message,
                    timestamp: Date.now.toString(),
                    isOnline: false,
                    isUnread: false,
                    lastMessage: "",
                    profilePicture: "",
                    username: ""
                }])
            }
        }
    }
    return (
        <div className="w-100 h-100 d-flex flex-column">
            <ChatHeader />
            <ChatMessages chat={chat} />
            <div className="p-3 border-top">
                <input type="text" className="form-control rounded-pill" placeholder="Message..."
                    value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleSendMessage} />
            </div>
        </div>
    )
}
