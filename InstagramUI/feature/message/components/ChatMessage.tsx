import { checkIfStoryIsActive } from "@/services/story.service";
import { MessageType } from "@/types/messages"
import Link from "next/link";
import { useEffect, useState } from "react";

type ChatMessageProps = {
    message: MessageType;
    loggedUserId: number;
}

export default function ChatMessage({ message, loggedUserId }: ChatMessageProps) {
    const [isActive, setIsActive] = useState<boolean>(false);
    useEffect(() => {
        const checkActive = async () => {
            if(message.storyId) setIsActive(await checkIfStoryIsActive(message.storyId ))
            else setIsActive(false);
        }
        checkActive();
    },[])
    return (
        <div key={message.id} className={`d-flex mb-2 ${message.senderId === loggedUserId ? 'justify-content-end' : 'justify-content-start'}`}>
            <div className={`p-2 rounded-3 ${message.senderId === loggedUserId ? 'bg-primary text-white'
                : 'bg-light border text-dark'}`} style={{ maxWidth: '70%' }}>
                {message.storyId ?
                    <Link className="text-decoration-none text-dark"
                        href={(isActive ? `/stories/${message.receiverName}/${message.storyId}` : "#")}>
                        <span style={{ color: "rgba(35,35,35,0.8" }}>{message.content.substring(0, message.content.indexOf(":") + 1)}</span>
                        {" "}
                        {message.content.substring(message.content.indexOf(":"))}
                    </Link>
                    : message.content}
            </div>
        </div>
    )
}
