import { useDebounce } from "@/components/layout/SearchOffset";
import { Follower, UserProfile } from "@/types/user";
import { useEffect, useState } from "react";
import { getFollowersList, getFollowingList } from "../services/profile.service";
import Link from "next/link";
import { BASE_URL } from "@/constants";

type ListFollowersModalProps = {
    users: Follower[];
    userId: number | undefined
}

export default function ListFollowersModal({ users, userId }: ListFollowersModalProps) {
    const [searchText, setSearchText] = useState<string>("");
    const [usersList, setUsersList] = useState<Follower[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<Follower[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const debounceSearch = useDebounce(searchText, 250);
    useEffect(() => {
        setUsersList(users);
        setFilteredUsers(users);
    }, [users]);

    useEffect(() => {
        setIsSearching(true);
        const searchUsers = async () => {
            if (debounceSearch.length > 0) {
                setFilteredUsers(usersList.filter(u => u.username.toLocaleLowerCase().includes(debounceSearch.toLocaleLowerCase())))
            } else {
                setFilteredUsers(usersList);
            }
        }
        searchUsers();
        setIsSearching(false);
    }, [debounceSearch])
    const closeModalManually = () => {
        const modalEl = document.getElementById('myModal');
        if (modalEl != null) {
            modalEl.classList.remove('show');

            modalEl.style.display = 'none';
        }

        const backdropEl = document.querySelector('.modal-backdrop');
        if (backdropEl) {
            backdropEl.remove();
        }

        document.body.classList.remove('modal-open');

        document.body.style.padding = '0';
    }

    return (
        <div className="modal fade" id="listFollowersModal" tabIndex={-1} aria-labelledby="listFollowersModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="listFollowersModalLabel">List of followers</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {filteredUsers.length <= 0
                            ?
                            <p>No users yet.</p>
                            :
                            <>
                                <input type="text" className="mb-3 form-control border-start-0 rounded-end-5 shadow-none border" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"
                                    value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                                {filteredUsers.map(user => (
                                    <Link key={user.userId} href={`/profile/${user.username}`} className="text-decoration-none text-body"
                                        onClick={() => {
                                            setSearchText("");
                                            closeModalManually();
                                        }}>
                                        <div className="d-flex mb-1 cursor-pointer transparent-background-hover rounded px-2 py-2" data-bs-dismiss="offcanvas"
                                            data-mdb-ripple-init
                                            data-mdb-ripple-color="light">
                                            <div className="p-1 rounded-circle position-relative me-2">
                                                <img
                                                    src={!user.profilePictureUrl ? "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" : BASE_URL + user.profilePictureUrl}
                                                    alt="Story"
                                                    className="rounded-circle"
                                                    style={{ width: "46px", height: "46px", objectFit: "cover", }}
                                                />
                                            </div>
                                            <div className="d-flex flex-column justify-content-center" style={{ fontSize: "14px" }}>
                                                <p className="m-0 p-0">{user.username}</p>
                                                <p className="m-0 p-0" style={{ color: "rgba(75,75,75,0.75)" }}>{user.name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}