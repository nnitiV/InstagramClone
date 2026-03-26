import { BASE_URL } from "@/constants";
import { getFollowingList } from "@/services/follower.service";
import { getLoggedUserInfo } from "@/services/user.service";
import { Follower } from "@/types/user";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number) {
    const [debounceValue, setDebounceValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debounceValue;
}

export default function SendMessageModal() {
    const [following, setFollowing] = useState<Follower[]>([]);
    const [filteredFollowing, setFilteredFollowing] = useState<Follower[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const debounceSearch = useDebounce(searchText, 500);

    useEffect(() => {
        const getUsersIFollow = async () => {
            const userInfo = await getLoggedUserInfo();
            if(userInfo.id) {
                const res = await getFollowingList(userInfo.id);
                setFollowing(res.following);
                setFilteredFollowing(res.following);
            } else {
                setFollowing([]);
                setFilteredFollowing([]);
            }
        }
        getUsersIFollow();
    }, []);
    useEffect(() => {
        setIsSearching(true);
        const fetchUserList = async () => {
            if (debounceSearch) {
                const usersRes = following.filter(f => f.name.toLowerCase().includes(debounceSearch.toLowerCase()));
                setFilteredFollowing(usersRes);
                setIsSearching(false);
            }
        }
        fetchUserList();
    }, [debounceSearch]);

    const goToChat = (userId: number) => {
        document.getElementById("closeButton")?.click();
        redirect(`/messages/${userId}`)
    }
    return (
        <div className="modal fade" id="sendMessageModal" tabIndex={-1} aria-labelledby="sendMessageModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="sendMessageModalLabel">Search User</h1>
                        <button type="button" id="closeButton" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-1">
                            <span className="input-group-text rounded-start-5 bg-transparent border-end-0" id="basic-addon1"><i className="bi bi-search"></i></span>
                            <input type="text" className="form-control border-start-0 rounded-end-5 shadow-none border" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"
                                value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        </div>
                        {searchText.length <= 0 ?
                            following.map(following => (
                                <div onClick={() => goToChat(following.userId)} key={following.userId} className="d-flex mb-1 cursor-pointer transparent-background-hover rounded px-2 py-2" data-bs-dismiss="offcanvas"
                                    data-mdb-ripple-init
                                    data-mdb-ripple-color="light">
                                    <div className="p-1 rounded-circle position-relative me-2">
                                        <img
                                            src={!following.profilePictureUrl ? "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" : BASE_URL + following.profilePictureUrl}
                                            alt="Story"
                                            className="rounded-circle"
                                            style={{ width: "46px", height: "46px", objectFit: "cover", }}
                                        />
                                    </div>
                                    <div className="d-flex flex-column justify-content-center" style={{ fontSize: "14px" }}>
                                        <p className="m-0 p-0">{following.name}</p>
                                        <p className="m-0 p-0" style={{ color: "rgba(75,75,75,0.75)" }}>{following.name}</p>
                                    </div>
                                </div>
                            ))
                            :
                            isSearching ?
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                :
                                filteredFollowing.length > 0 ?
                                    filteredFollowing.map(following => (
                                        <Link href={`/messages/${following.userId}`} key={following.userId} className="text-decoration-none text-body" onClick={() => setSearchText("")}>
                                            <div className="d-flex mb-1 cursor-pointer transparent-background-hover rounded px-2 py-2" data-bs-dismiss="offcanvas"
                                                data-mdb-ripple-init
                                                data-mdb-ripple-color="light">
                                                <div className="p-1 rounded-circle position-relative me-2">
                                                    <img
                                                        src={!following.profilePictureUrl ? "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" : BASE_URL + following.profilePictureUrl}
                                                        alt="Story"
                                                        className="rounded-circle"
                                                        style={{ width: "46px", height: "46px", objectFit: "cover", }}
                                                    />
                                                </div>
                                                <div className="d-flex flex-column justify-content-center" style={{ fontSize: "14px" }}>
                                                    <p className="m-0 p-0">{following.name}</p>
                                                    <p className="m-0 p-0" style={{ color: "rgba(75,75,75,0.75)" }}>{following.name}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                    :
                                    <p>No user</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
