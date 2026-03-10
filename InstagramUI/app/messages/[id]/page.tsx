"use client"
import { getLoggedUserInfo } from "@/feature/auth/services/auth-service";
import ChatHeader from "@/feature/message/components/ChatHeader";
import ChatMessages from "@/feature/message/components/ChatMessages";
import { getChatHistory, sendMessage } from "@/feature/message/services/profile.service";
import { getUserById } from "@/feature/profile/services/profile.service";
import { MessageType, SendMessage } from "@/types/messages";
import { UserProfile } from "@/types/user";
import { use, useEffect, useState } from "react";

type ChatPageProps = {
    params: Promise<{ id: number }>;
}
export default function MessageContentPage({ params }: ChatPageProps) {
    const { id } = use(params);
    const [user, setUser] = useState<UserProfile>();
    const [loggedUserId, setLoggedUserId] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<MessageType[]>([]);
    console.log(id);
    useEffect(() => {
        const getInfo = async () => {
            const loggedUserId = (await getLoggedUserInfo()).id;
            setLoggedUserId(loggedUserId);
            const user = await getUserById(id);
            setUser(user);
            const chatHistory = await getChatHistory(id);
            setChat(chatHistory.messages);
        }
        getInfo();
    }, [])

    const handleSendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            if (message.length > 0) {
                const messageToSend: SendMessage = {
                    receiverId: id,
                    content: message
                };
                const res = await sendMessage(messageToSend);
                if (res) {
                    setMessage("");
                    setChat(prev => [...prev, {
                        id: chat[chat.length - 1].id + 1,
                        senderId: loggedUserId,
                        content: message,
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
    }
    return (
        <div className="w-100 h-100 d-flex flex-column">
            <ChatHeader user={user} />
            <ChatMessages chat={chat} loggedUserId={loggedUserId} />
            <div className="p-3 border-top">
                <input type="text" className="form-control rounded-pill" placeholder="Message..."
                    value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleSendMessage} />
            </div>
        </div>
    )
}
