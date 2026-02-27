import { USER_PROFILE_MOCK } from '../constants/data'

type HeaderProps = { isMobile: boolean; }

export default function Header({isMobile}: HeaderProps) {
    
    return (
        <div className={`profile-header d-flex align-items-center w-75 mx-auto my-3 ${isMobile && "flex-column"}`}>
            <img className={`transparent-background-hover-2 rounded-circle me-5 ${isMobile && "mb-3"}`} style={{ width: "156px", height: "156px" }} src={USER_PROFILE_MOCK.avatarUrl ? USER_PROFILE_MOCK.avatarUrl : "https://images.unsplash.com/photo-1463453091185-61582044d556?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbSUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"} alt="" />
            <div className="user-info">
                <p className="m-0 p-0 fs-5 fw-bold" style={{ fontSize: ".75rem" }} >{USER_PROFILE_MOCK.username}</p>
                <p className="m-0 p-0 mt-1" style={{ fontSize: ".75rem" }} >{USER_PROFILE_MOCK.name}</p>
                <div className="user-sub-info d-flex my-2">
                    <p className="m-0 p-0" style={{ fontSize: ".75rem" }} > <span className="fw-bold m">{USER_PROFILE_MOCK.stats.posts}</span> posts</p>
                    <p className="m-0 p-0 mx-3" style={{ fontSize: ".75rem" }} > <span className="fw-bold m">{USER_PROFILE_MOCK.stats.followers}</span> followers</p>
                    <p className="m-0 p-0" style={{ fontSize: ".75rem" }} > <span className="fw-bold m">{USER_PROFILE_MOCK.stats.following}</span> following</p>
                </div>
                <p className="m-0 p-0 w-75" style={{ fontSize: ".75rem" }} >
                    {USER_PROFILE_MOCK.bio}
                </p>
                <p className="m-0 p-0 my-2 fw-bold" style={{ fontSize: ".75rem" }} >@{USER_PROFILE_MOCK.username}</p>
            </div>
        </div>
    )
}
