import { Follower } from "@/types/user";
import { useMemo, useState } from "react";
import Link from "next/link";
import { BASE_URL } from "@/constants";
import { useDebounce } from "@/hooks/useDebounce";

type ListFollowersModalProps = {
    isLoading: boolean;
    users: Follower[];
}

export default function ListFollowingModal({ isLoading, users }: ListFollowersModalProps) {
    const [searchText, setSearchText] = useState<string>("");
    const debounceSearch = useDebounce(searchText, 250);
    const isSearching = debounceSearch !== searchText;
    const filteredUsers = useMemo(() => {
        if(!debounceSearch) return users;
        const lowercaseSearch = debounceSearch.toLocaleLowerCase();
        return users.filter(u => u.username.includes(lowercaseSearch));
    }, [users, debounceSearch])

    
    const closeModalManually = () => {
        const modalEl = document.getElementById('listFollowingModal');
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
        <div className="modal fade" id="listFollowingModal" tabIndex={-1} aria-labelledby="listFollowingModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="listFollowingModalLabel">List of following</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {isLoading || isSearching ?
                            <div className=" w-100 d-flex justify-content-center align-items-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            :
                            filteredUsers.length <= 0 ?
                                <p>No user yet</p>
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