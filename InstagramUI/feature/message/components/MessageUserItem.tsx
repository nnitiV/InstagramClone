import { BASE_URL } from "@/constants";
import { getLoggedUserInfo } from "@/feature/auth/services/auth-service";
import { LastMessageDto } from "@/types/messages";
import { formatShortDate } from "@/utils/date";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { useEffect, useState } from "react";

type MesssageUserItemProps = {
    message: LastMessageDto;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export default function MessageUserItem({ message, setSearchText }: MesssageUserItemProps) {
    const [id, setId] = useState<number>(0);
    useEffect(() => {
        const getUserId = async () => {
            const userId = (await getLoggedUserInfo()).id;
            setId(userId);
        }
        getUserId();
    }, [])

    return (
        <Link href={`/messages/${message.senderId != id ? message.senderId : message.receiverId}`} key={message.id} className="text-decoration-none text-body w-75"
            onClick={() => setSearchText("")}>
            <div className="d-flex mb-1 cursor-pointer transparent-background-hover w-100 rounded px-2 py-2" data-bs-dismiss="offcanvas"
                data-mdb-ripple-init
                data-mdb-ripple-color="light">
                <div className="p-1 rounded-circle position-relative me-2">
                    <img
                        src={message.pictureUrl ? BASE_URL+ message.pictureUrl 
                            : "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"}
                        alt="Story"
                        className="rounded-circle"
                        style={{ width: "46px", height: "46px", objectFit: "cover", }}
                    />
                </div>
                <div className="d-flex flex-column justify-content-center" style={{ fontSize: "14px" }}>
                    <p className="m-0 p-0">{message.name}</p>
                    <p className="m-0 p-0">
                        {message.senderId == id && "You: "}
                        {message.lastMessage} - {formatShortDate(message.lastMessageAt)}
                    </p>
                </div>
            </div>
        </Link>
    )
}
