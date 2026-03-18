"use client";
import { BASE_URL } from "@/constants";
import { searchUsers } from "@/services/search.service";
import { UserProfile } from "@/types/user";
import Link from "next/link";
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

export default function SearchOffcanvas() {
    const [searchText, setSearchText] = useState<string>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [users, setUsers] = useState<UserProfile[]>([]);
    const debounceSearch = useDebounce(searchText, 500);

    useEffect(() => {
        setIsSearching(true);
        const fetchUserList = async () => {
            if (debounceSearch) {
                const usersRes = await searchUsers(debounceSearch);
                setUsers(usersRes.result);
                setIsSearching(false);
            }
        }
        fetchUserList();
    }, [debounceSearch]);

    return (
        <div className="offcanvas offcanvas-start" tabIndex={-1} id="searchOffcanvas" aria-labelledby="searchOffcanvasLabel">
            <div className="offcanvas-header d-flex flex-column">
                <div className="d-flex align-items-center justify-content-between w-100 my-4 px-lg-2">
                    <h5 className="offcanvas-title" id="searchOffcanvasLabel">Search</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="input-group mb-1">
                    <span className="input-group-text rounded-start-5 bg-transparent border-end-0" id="basic-addon1"><i className="bi bi-search"></i></span>
                    <input type="text" className="form-control border-start-0 rounded-end-5 shadow-none border" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"
                        value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                </div>
            </div>
            <div className="offcanvas-body d-flex flex-column">
                {searchText.length <= 0 ?
                    <p>No user yet</p>
                    :
                    isSearching ?
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        users.length > 0 ?
                            users.map(user => (
                                <Link href={`/profile/${user.username}`} key={user.id} className="text-decoration-none text-body" onClick={() => setSearchText("")}>
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
                                            <p className="m-0 p-0" style={{ color: "rgba(75,75,75,0.75)" }}>{user.name} - {user.followersCount}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                            :
                            <p>No user yet</p>
                }
            </div >
        </div >
    )
}
