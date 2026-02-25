import { MessageType } from "@/types/messages";
import Link from "next/link";

type MesssageUserItemProps = {
    message: MessageType;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export default function MessageUserItem({ message, setSearchText }: MesssageUserItemProps) {
    return (
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
    )
}
