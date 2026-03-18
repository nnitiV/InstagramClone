import { BASE_URL } from '@/constants';
import { UserProfile } from '@/types/user';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type ChatHeaderProps = {
    user: UserProfile | undefined
}

export default function ChatHeader({user}: ChatHeaderProps) {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        const checkWidth = () => {
            setIsMobile(window.innerWidth <= 368);
        }
        checkWidth();
        window.addEventListener("resize", checkWidth);
        return window.removeEventListener("resize", checkWidth);
    }, [])

    return (
        <div className={`border-bottom p-3 d-flex justify-content-between align-items-center ${isMobile && "flex-column"}`}>
            <div className="d-flex cursor-pointer transparent-background-hover rounded px-2" data-bs-dismiss="offcanvas"
                data-mdb-ripple-init
                data-mdb-ripple-color="light" onClick={() => redirect(`/profile/${user?.username}`)}>
                <div className="p-1 rounded-circle position-relative me-2">
                    <img
                        src={user?.profilePictureUrl ? BASE_URL + user?.profilePictureUrl : "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"}
                        alt="Story"
                        className="rounded-circle"
                        style={{ width: "46px", height: "46px", objectFit: "cover", }}
                    />
                </div>
                <div className="d-flex flex-column justify-content-center" style={{ fontSize: "14px" }}>
                    <p className="m-0 p-0">{user?.name}</p>
                    <p className="m-0 p-0" style={{ color: "rgba(198, 198, 198, 0.75)" }}>{user?.username}</p>
                </div>
            </div>
            <div className="d-flex justify-content-between px-3 fs-3">
                <i className="bi bi-telephone"></i>
                <i className="bi bi-camera px-3"></i>
                <i className="bi bi-info-circle"></i>
            </div>
        </div>
    )
}
