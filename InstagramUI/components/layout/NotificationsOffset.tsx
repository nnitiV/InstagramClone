import Link from "next/link";
import { useState } from "react";

export default function NotificationsOffset() {
    const [searchText, setSearchText] = useState<string>("");
    const mockSearchUser = [
        {
            "id": 101,
            "username": "urban_explorer",
            "fullName": "Lucas Silva",
            "profilePictureUrl": "https://randomuser.me/api/portraits/men/32.jpg",
            "followersCount": 12500,
            "isFollowing": true
        },
        {
            "id": 102,
            "username": "art_by_clara",
            "fullName": "Clara Mendes",
            "profilePictureUrl": "https://randomuser.me/api/portraits/women/44.jpg",
            "followersCount": 8900,
            "isFollowing": false
        },
        {
            "id": 103,
            "username": "tech_minimalist",
            "fullName": "Gabriel Santos",
            "profilePictureUrl": "https://randomuser.me/api/portraits/men/85.jpg",
            "followersCount": 45600,
            "isFollowing": false
        },
        {
            "id": 104,
            "username": "nature.photography",
            "fullName": "Beatriz Oliveira",
            "profilePictureUrl": "https://randomuser.me/api/portraits/women/68.jpg",
            "followersCount": 102000,
            "isFollowing": true
        },
        {
            "id": 105,
            "username": "chef_vitor",
            "fullName": "Vitor Souza",
            "profilePictureUrl": "https://randomuser.me/api/portraits/men/22.jpg",
            "followersCount": 3200,
            "isFollowing": false
        }
    ];
    return (
        <div className="offcanvas offcanvas-start px-3" tabIndex={-1} id="searchOffcanvas" aria-labelledby="searchOffcanvasLabel">
            <div className="offcanvas-header d-flex flex-column">
                <div className="d-flex align-items-center justify-content-between w-100 my-4 px-2">
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
                    <>
                        <p style={{ color: "rgba(75,75,75,0.75)" }}>Recent</p>
                        <div className="d-flex justify-content-center align-items-center flex-grow-1" style={{ color: "rgba(75,75,75,0.75)" }}>
                            <p>No recent searchs.</p>
                        </div>
                    </>
                    :
                    mockSearchUser.map(user => (
                        <Link href={`/profile/${user.username}`} key={user.id} className="text-decoration-none text-body" onClick={() => setSearchText("")}>
                            <div className="d-flex mb-1 cursor-pointer transparent-background-hover rounded px-2 py-2" data-bs-dismiss="offcanvas" 
                                data-mdb-ripple-init
                                data-mdb-ripple-color="light">
                                <div className="p-1 rounded-circle position-relative me-2">
                                    <img
                                        src={user.profilePictureUrl}
                                        alt="Story"
                                        className="rounded-circle"
                                        style={{ width: "46px", height: "46px", objectFit: "cover", }}
                                    />
                                </div>
                                <div className="d-flex flex-column justify-content-center" style={{ fontSize: "14px" }}>
                                    <p className="m-0 p-0">{user.username}</p>
                                    <p className="m-0 p-0" style={{ color: "rgba(75,75,75,0.75)" }}>{user.fullName} - {user.followersCount}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div >
        </div >
    )
}
