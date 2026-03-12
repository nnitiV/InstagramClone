import { MessageType } from "@/types/messages";
import { useEffect, useRef } from "react";

type ChatMessagesProps = {
    chat: MessageType[];
    loggedUserId: number
}

export default function ChatMessages({chat, loggedUserId}: ChatMessagesProps) {
    const messageEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({behavior: "smooth"});
    }
    useEffect(() => {
        scrollToBottom();
    }, [chat.length]);
    return (
        <div className="d-flex flex-column h-100 overflow-y-auto">
            <div className="flex-grow-1  p-3">
                {chat.map(msg => (
                    <div key={msg.id} className={`d-flex mb-2 ${msg.senderId === loggedUserId ? 'justify-content-end' : 'justify-content-start'}`}>
                        <div className={`p-2 rounded-3 ${msg.senderId === loggedUserId ? 'bg-primary text-white' 
                            : 'bg-light border'}`} style={{ maxWidth: '70%' }}>
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>
            <div ref={messageEndRef}></div>
        </div>
    )
}
