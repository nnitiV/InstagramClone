"use client"
import Link from "next/link";
import SwitchAccountModal from "../../feature/message/content/SwitchAccountModal";
import { useState } from "react";

export default function SearchPage({children}: {children: React.ReactNode}) {
    const [searchText, setSearchText] = useState<string>("");
    const mock_messages = [
        { "id": 1, "username": "ArchLover", "profilePicture": "https://randomuser.me/api/portraits/men/32.jpg", "lastMessage": "That facade design is incredible!", "timestamp": "11h", "isUnread": false, "isOnline": true },
        { "id": 2, "username": "UrbanPlanner", "profilePicture": "https://randomuser.me/api/portraits/women/68.jpg", "lastMessage": "Did you see the new zoning laws?", "timestamp": "2h", "isUnread": true, "isOnline": false },
        { "id": 3, "username": "MinimalVibes", "profilePicture": "https://randomuser.me/api/portraits/women/2.jpg", "lastMessage": "Sent a photo", "timestamp": "45m", "isUnread": true, "isOnline": true },
        { "id": 4, "username": "BrutalismGuy", "profilePicture": "https://randomuser.me/api/portraits/men/41.jpg", "lastMessage": "Concrete is life.", "timestamp": "1d", "isUnread": false, "isOnline": false },
        { "id": 5, "username": "SkylineChaser", "profilePicture": "https://randomuser.me/api/portraits/men/22.jpg", "lastMessage": "Check out this rooftop view!", "timestamp": "5h", "isUnread": false, "isOnline": true },
        { "id": 6, "username": "PixelPioneer", "profilePicture": "https://randomuser.me/api/portraits/women/12.jpg", "lastMessage": "The render finished early.", "timestamp": "12h", "isUnread": false, "isOnline": false },
        { "id": 7, "username": "NeonNights", "profilePicture": "https://randomuser.me/api/portraits/women/90.jpg", "lastMessage": "Meet at the gallery?", "timestamp": "15m", "isUnread": true, "isOnline": true },
        { "id": 8, "username": "ConcreteJungle", "profilePicture": "https://randomuser.me/api/portraits/men/1.jpg", "lastMessage": "I prefer the raw finish.", "timestamp": "3h", "isUnread": false, "isOnline": false },
        { "id": 9, "username": "GlassAndSteel", "profilePicture": "https://randomuser.me/api/portraits/men/55.jpg", "lastMessage": "Structure is solid.", "timestamp": "2d", "isUnread": false, "isOnline": false },
        { "id": 10, "username": "Metropolis", "profilePicture": "https://randomuser.me/api/portraits/women/55.jpg", "lastMessage": "Traffic is a nightmare.", "timestamp": "6h", "isUnread": true, "isOnline": true },
        { "id": 11, "username": "ThePenthouse", "profilePicture": "https://randomuser.me/api/portraits/men/10.jpg", "lastMessage": "Reserved the space.", "timestamp": "8h", "isUnread": false, "isOnline": true },
        { "id": 12, "username": "Modernist", "profilePicture": "https://randomuser.me/api/portraits/men/33.jpg", "lastMessage": "Less is definitely more.", "timestamp": "1w", "isUnread": false, "isOnline": false },
        { "id": 13, "username": "BauhausBabe", "profilePicture": "https://randomuser.me/api/portraits/women/11.jpg", "lastMessage": "Form follows function!", "timestamp": "1h", "isUnread": true, "isOnline": true },
        { "id": 14, "username": "Draftsman", "profilePicture": "https://randomuser.me/api/portraits/men/20.jpg", "lastMessage": "Fixed the blueprint.", "timestamp": "10h", "isUnread": false, "isOnline": false },
        { "id": 15, "username": "CivicDesigner", "profilePicture": "https://randomuser.me/api/portraits/women/30.jpg", "lastMessage": "The park project is live.", "timestamp": "4h", "isUnread": false, "isOnline": true },
        { "id": 16, "username": "RetroRefit", "profilePicture": "https://randomuser.me/api/portraits/men/15.jpg", "lastMessage": "Check these tiles.", "timestamp": "30m", "isUnread": true, "isOnline": true },
        { "id": 17, "username": "ZahaFan", "profilePicture": "https://randomuser.me/api/portraits/women/40.jpg", "lastMessage": "Curves over corners.", "timestamp": "14h", "isUnread": false, "isOnline": false },
        { "id": 18, "username": "BluePrintKing", "profilePicture": "https://randomuser.me/api/portraits/men/5.jpg", "lastMessage": "Scaling looks off.", "timestamp": "5m", "isUnread": true, "isOnline": true },
        { "id": 19, "username": "SteelFrame", "profilePicture": "https://randomuser.me/api/portraits/women/50.jpg", "lastMessage": "Delivery at 9 AM.", "timestamp": "16h", "isUnread": false, "isOnline": false },
        { "id": 20, "username": "AdobeQueen", "profilePicture": "https://randomuser.me/api/portraits/women/60.jpg", "lastMessage": "Exporting the assets.", "timestamp": "22h", "isUnread": false, "isOnline": true },
        { "id": 21, "username": "GreenRoof", "profilePicture": "https://randomuser.me/api/portraits/men/70.jpg", "lastMessage": "Eco-friendly materials?", "timestamp": "7h", "isUnread": true, "isOnline": false },
        { "id": 22, "username": "MarbleMaven", "profilePicture": "https://randomuser.me/api/portraits/women/25.jpg", "lastMessage": "The kitchen looks elite.", "timestamp": "19h", "isUnread": false, "isOnline": false },
        { "id": 23, "username": "PillarOfSociety", "profilePicture": "https://randomuser.me/api/portraits/men/45.jpg", "lastMessage": "Meeting at noon.", "timestamp": "20m", "isUnread": true, "isOnline": true },
        { "id": 24, "username": "ShadowGrapher", "profilePicture": "https://randomuser.me/api/portraits/men/80.jpg", "lastMessage": "Lighting is everything.", "timestamp": "18h", "isUnread": false, "isOnline": false },
        { "id": 25, "username": "InteriorEye", "profilePicture": "https://randomuser.me/api/portraits/women/5.jpg", "lastMessage": "Found the perfect sofa.", "timestamp": "9h", "isUnread": false, "isOnline": true }
    ];
    return (
        <>
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="left-side py-5 pb-1 d-flex flex-column align-items-center h-100 border-end" style={{ width: "20vw" }}>
                    <div className="header" style={{ width: "90%" }}>
                        <div className="d-flex justify-content-between px-2 pe-0">
                            <p data-bs-toggle="modal" data-bs-target="#switchAccountModal">Username</p>
                            <i className="bi bi-pencil-square"></i>
                        </div>
                        <div className="input-group mb-1">
                            <span className="input-group-text rounded-start-5 border-end-0" id="basic-addon1"><i className="bi bi-search"></i></span>
                            <input type="text" className="form-control border-start-0 rounded-end-5 shadow-none border" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"
                                value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        </div>
                    </div>
                    <hr className="w-100 mb-1" />
                    <div className="d-flex justify-content-between align-items-center w-100 px-4 pt-3 pb-1">
                        <p className="m-0 p-0">Messages</p>
                        <p className="m-0 p-0">Requests</p>
                    </div>
                    <div className="scrollbox w-100">
                        <div className="users scrollbox-content px-2">
                            {mock_messages.map((message, index) => (
                                <Link href={`/messages/${message.id}`} key={message.id} className="text-decoration-none text-body w-100" onClick={() => setSearchText("")}>
                                    <div className="d-flex mb-1 cursor-pointer transparent-background-hover w-100 rounded px-2 py-2" data-bs-dismiss="offcanvas"
                                        data-mdb-ripple-init
                                        data-mdb-ripple-color="light">
                                        <div className="p-1 rounded-circle position-relative me-2">
                                            <img
                                                src={message.profilePicture ? message.profilePicture : "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"}
                                                alt="Story"
                                                className="rounded-circle"
                                                style={{ width: "46px", height: "46px", objectFit: "cover", }}
                                            />
                                        </div>
                                        <div className="d-flex flex-column justify-content-center" style={{ fontSize: "14px" }}>
                                            <p className="m-0 p-0">{message.username}</p>
                                            <p className="m-0 p-0" style={{ color: "rgba(75,75,75,0.75)" }}>{message.lastMessage} - {message.timestamp}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center h-100" style={{ width: "80vw" }}>
                    {children}
                </div>
            </div>
            <SwitchAccountModal />
        </>
    )
};

