import { MessageType } from "@/types/messages";

type ChatMessagesProps = {
    chat: MessageType[];
}

export default function ChatMessages({chat}: ChatMessagesProps) {
    return (
        <div className="d-flex flex-column h-100">
            <div className="flex-grow-1 overflow-auto p-3">
                {chat.map(msg => (
                    <div key={msg.id} className={`d-flex mb-2 ${msg.senderId === 'me' ? 'justify-content-end' : 'justify-content-start'}`}>
                        <div className={`p-2 rounded-3 ${msg.senderId === 'me' ? 'bg-primary text-white' : 'bg-light border'}`} style={{ maxWidth: '70%' }}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
