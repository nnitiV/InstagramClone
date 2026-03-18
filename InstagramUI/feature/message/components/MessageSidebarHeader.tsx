import { getLoggedUserInfo } from "@/feature/auth/services/auth-service";
import { useEffect, useState } from "react";

type MessageSidebarHeaderProps = {
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    shouldHideSidebar: boolean;
}

export default function MessageSidebarHeader({searchText, setSearchText, shouldHideSidebar}: MessageSidebarHeaderProps) {
    const [username, setUsername] = useState<string>("");
    useEffect(() => {
        const fetchUsername = async () => {
            setUsername((await getLoggedUserInfo()).username);
        }
        fetchUsername()
    }, [])
    return (
        <div className={`${!shouldHideSidebar && "w-100"}`}>
            <div className="d-flex justify-content-between px-2 ">
                <p data-bs-toggle="modal" data-bs-target="#switchAccountModal">{username ?? "Username"}</p>
                <i className="bi bi-pencil-square"></i>
            </div>
            <div className="input-group mb-1 px-2">
                <span className="input-group-text rounded-start-5 border-end-0" id="basic-addon1"><i className="bi bi-search"></i></span>
                <input type="text" className="form-control border-start-0 rounded-end-5 shadow-none border" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"
                    value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            </div>
        </div>
    )
}
