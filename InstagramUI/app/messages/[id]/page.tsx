"use client"
import { use, useState } from "react";

type ChatPageProps = {
    params: Promise<{ id: number }>;
}
export default function MessageContentPage({ params }: ChatPageProps) {
    const [message, setMessage] = useState<string>("");
    const { id } = use(params);
    const mock_chat_history: Record<number, any[]> = {
        1: [
            { id: 101, senderId: 1, text: "Hey! Did you finish those blueprints?", timestamp: "10:30 AM" },
            { id: 102, senderId: "me", text: "Almost, just working on the facade details now.", timestamp: "10:32 AM" },
            { id: 103, senderId: 1, text: "That facade design is incredible!", timestamp: "11:00 AM" }
        ],
        2: [
            { id: 201, senderId: 2, text: "The city council meeting is tomorrow.", timestamp: "Yesterday" },
            { id: 202, senderId: 2, text: "Did you see the new zoning laws?", timestamp: "2:00 PM" }
        ],
        3: [
            { id: 301, senderId: "me", text: "How does the living room look?", timestamp: "12:15 PM" },
            { id: 302, senderId: 3, text: "Sent a photo", type: "image", imageUrl: "https://picsum.photos/400/500", timestamp: "12:45 PM" }
        ],
        4: [
            { id: 401, senderId: 4, text: "Concrete is life.", timestamp: "Monday" }
        ],
        5: [
            { id: 501, senderId: 5, text: "Check out this rooftop view!", timestamp: "5:30 PM" }
        ],
        6: [
            { id: 601, senderId: "me", text: "Is the render done?", timestamp: "9:00 AM" },
            { id: 602, senderId: 6, text: "The render finished early.", timestamp: "9:15 AM" }
        ],
        7: [
            { id: 701, senderId: 7, text: "Meet at the gallery?", timestamp: "11:00 AM" }
        ],
        8: [
            { id: 801, senderId: 8, text: "I prefer the raw finish.", timestamp: "3:45 PM" }
        ],
        9: [
            { id: 901, senderId: 9, text: "Structure is solid.", timestamp: "Tuesday" }
        ],
        10: [
            { id: 1001, senderId: 10, text: "Traffic is a nightmare.", timestamp: "8:10 AM" }
        ],
        11: [
            { id: 1101, senderId: 11, text: "Reserved the space.", timestamp: "10:00 AM" }
        ],
        12: [
            { id: 1201, senderId: 12, text: "Less is definitely more.", timestamp: "Jan 15" }
        ],
        13: [
            { id: 1301, senderId: 13, text: "Form follows function!", timestamp: "1:20 PM" }
        ],
        14: [
            { id: 1401, senderId: 14, text: "Fixed the blueprint.", timestamp: "4:00 PM" }
        ],
        15: [
            { id: 1501, senderId: 15, text: "The park project is live.", timestamp: "6:30 PM" }
        ],
        16: [
            { id: 1601, senderId: 16, text: "Check these tiles.", timestamp: "11:45 AM" }
        ],
        17: [
            { id: 1701, senderId: 17, text: "Curves over corners.", timestamp: "9:00 PM" }
        ],
        18: [
            { id: 1801, senderId: 18, text: "Scaling looks off.", timestamp: "10:25 AM" }
        ],
        19: [
            { id: 1901, senderId: 19, text: "Delivery at 9 AM.", timestamp: "Yesterday" }
        ],
        20: [
            { id: 2001, senderId: 20, text: "Exporting the assets.", timestamp: "3:15 PM" }
        ],
        21: [
            { id: 2101, senderId: 21, text: "Eco-friendly materials?", timestamp: "11:50 AM" }
        ],
        22: [
            { id: 2201, senderId: 22, text: "The kitchen looks elite.", timestamp: "2:10 PM" }
        ],
        23: [
            { id: 2301, senderId: 23, text: "Meeting at noon.", timestamp: "11:40 AM" }
        ],
        24: [
            { id: 2401, senderId: 24, text: "Lighting is everything.", timestamp: "5:00 PM" }
        ],
        25: [
            { id: 2501, senderId: 25, text: "Found the perfect sofa.", timestamp: "8:30 AM" }
        ]
    };
    const [chat, setChat] = useState<{ id: number, senderId: number | string, text: string, timestamp: string }[]>(mock_chat_history[id]);
    const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key == "Enter") {
            if(message.length > 0) {
                setMessage("");
                // { id: 103, senderId: 1, text: "That facade design is incredible!", timestamp: "11:00 AM" }    
                setChat(prev => [...prev, {
                    id: chat[chat.length - 1].id + 1,
                    senderId: "me",
                    text: message,
                    timestamp: Date.now.toString()
                }])
            }
        }
    } 
    return (
        <div className="w-100 h-100 d-flex flex-column">
            {/* Top Chat Header */}
            <div className="border-bottom p-3 d-flex justify-content-between align-items-center">
                <div className="d-flex cursor-pointer transparent-background-hover rounded px-2" data-bs-dismiss="offcanvas"
                    data-mdb-ripple-init
                    data-mdb-ripple-color="light">
                    <div className="p-1 rounded-circle position-relative me-2">
                        <img
                            src={"https://cdn-icons-png.flaticon.com/512/6522/6522516.png"}
                            alt="Story"
                            className="rounded-circle"
                            style={{ width: "46px", height: "46px", objectFit: "cover", }}
                        />
                    </div>
                    <div className="d-flex flex-column justify-content-center" style={{ fontSize: "14px" }}>
                        <p className="m-0 p-0">"Full name"</p>
                        <p className="m-0 p-0" style={{ color: "rgba(75,75,75,0.75)" }}>"Usernmame"</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between px-3 fs-3">
                    <i className="bi bi-telephone"></i>
                    <i className="bi bi-camera px-3"></i>
                    <i className="bi bi-info-circle"></i>
                </div>
            </div>

            {/* Chat Messages Area */}
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

            {/* Message Input Box */}
            <div className="p-3 border-top">
                <input type="text" className="form-control rounded-pill" placeholder="Message..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleSendMessage} />
            </div>
        </div>
    )
}
