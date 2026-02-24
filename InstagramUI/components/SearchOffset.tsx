import { getUserInfo } from "@/feature/auth/services/auth-service";
import Link from "next/link";
export interface Notification {
    id: number;
    username: string;
    profilePictureUrl: string; // Adicionei pois você precisará para o <img>
    timestamp: string; // ISO String do C# (ex: "2026-02-24T18:00:00Z")
    followedUserId: number | null; // ID do usuário se você já o segue, senão null
}
const MOCK_NOTIFICATIONS_API: Notification[] = [
    {
        id: 1,
        username: "user_alpha",
        profilePictureUrl: "https://i.pravatar.cc/150?u=1",
        timestamp: new Date().toISOString(),
        followedUserId: null
    },
    {
        id: 2,
        username: "urban_design_99",
        profilePictureUrl: "https://i.pravatar.cc/150?u=2",
        timestamp: "2026-02-08T10:00:00Z",
        followedUserId: 102
    },
    {
        id: 3,
        username: "minimalist_architect",
        profilePictureUrl: "https://i.pravatar.cc/150?u=3",
        timestamp: "2026-01-27T15:30:00Z",
        followedUserId: 103
    },
    {
        id: 4,
        username: "city_chaser",
        profilePictureUrl: "https://i.pravatar.cc/150?u=4",
        timestamp: "2026-01-27T12:00:00Z",
        followedUserId: null
    },
    {
        id: 5,
        username: "brutalism_fan",
        profilePictureUrl: "https://i.pravatar.cc/150?u=5",
        timestamp: "2026-01-10T09:00:00Z",
        followedUserId: 105
    }
];
export default function SearchOffset() {
    return (
        <div className="offcanvas offcanvas-start px-3 w-50" tabIndex={-1} id="notificationsOffset" aria-labelledby="notificationsOffsetLabel">
            <div className="d-flex flex-column overflow-y-auto">
                <div className="d-flex align-items-center justify-content-between w-100 my-4 px-2">
                    <h5 className="offcanvas-title" id="notificationsOffsetLabel">Notifications</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <h1 className="mt-4 fw-bold fs-5 p-0 w-100">Today</h1>
                {MOCK_NOTIFICATIONS_API.map(user => (
                <div className="transparent-background-hover cursor-pointer rounded w-100 d-flex justify-content-between align-items-center px-2">
                    <Link href={`#`} className="text-decoration-none text-body">
                        <div className="d-flex mb-1 p-0 py-2" data-bs-dismiss="offcanvas"
                            data-mdb-ripple-init
                            data-mdb-ripple-color="light">
                            <div className="p-1 rounded-circle position-relative me-2">
                                <img
                                    src={user.profilePictureUrl ? user.profilePictureUrl : "https://www.shutterstock.com/shutterstock/photos/2286554497/display_1500/stock-photo-random-pictures-cute-and-funny-2286554497.jpg"}
                                    alt="Story"
                                    className="rounded-circle"
                                    style={{ width: "46px", height: "46px", objectFit: "cover", }}
                                />
                            </div>
                            <div className="d-flex flex-column justify-content-center w-75" style={{ fontSize: ".85rem" }}>
                                <p className="m-0 p-0">{user.username} started following you <span>jan, 12</span> - {user.followedUserId}</p>
                            </div>
                        </div>
                    </Link>
                    {user.followedUserId != null
                        ?
                        <button type="button" className="btn btn- ms-3" style={{height: "fit-content", fontSize: ".75em"}}>Unfollow</button>
                        :
                        <button type="button" className="btn btn-primary ms-1" style={{height: "fit-content", fontSize: ".75em"}}>Follow back</button>
                    }
                </div>
                ))}
            </div >
        </div >
    )
}
