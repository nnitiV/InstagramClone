import { Follower, UserProfile } from '@/types/user';
import { useState } from 'react';
import { getFollowersList, getFollowingList } from '../services/profile.service';
import { BASE_URL } from '@/constants';
import ListFollowingModal from './ListFollowingModal';
import ListFollowersModal from './ListFollowersModal';

type HeaderProps = {
    isMobile: boolean;
    userProfile: UserProfile | null
    postsSize?: number;
}

export default function Header({ isMobile, userProfile, postsSize }: HeaderProps) {
    const [users, setUsers] = useState<Follower[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const getUsers = async (isFollowersSearch: boolean) => {
        if (!userProfile) return;
        setIsLoading(true);
        setUsers([]);
        let res = null;
        try {
            if (isFollowersSearch) {
                res = await getFollowersList(userProfile.id);
                setUsers(res.followers);

            } else {
                res = await getFollowingList(userProfile.id);
                setUsers(res.following);
            }
        } catch (error) {
            console.error(error);
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <div className={`profile-header d-flex align-items-center w-75 mx-auto my-3 ${isMobile && "flex-column"}`}>
                <img className={`transparent-background-hover-2 rounded-circle me-5 object-fit-cover ${isMobile && "mb-3"}`}
                    style={{ width: "156px", height: "156px" }} src={userProfile?.profilePictureUrl ?
                        BASE_URL + userProfile?.profilePictureUrl :
                        "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"} alt="" />
                <div className="user-info">
                    <p className="m-0 p-0 fs-5 fw-bold" style={{ fontSize: ".75rem" }} >{userProfile?.username}</p>
                    <p className="m-0 p-0 mt-1" style={{ fontSize: ".75rem" }} >{userProfile?.name}</p>
                    <div className="user-sub-info d-flex my-2">
                        <p className="m-0 p-0" style={{ fontSize: ".75rem" }} > <span className="fw-bold m">
                            {postsSize ? postsSize : userProfile?.postsCount}</span> posts</p>
                        <p className="m-0 p-0 mx-3" style={{ fontSize: ".75rem" }}
                            data-bs-toggle="modal" data-bs-target="#listFollowersModal" onClick={() => getUsers(true)}>
                            <span className="fw-bold m">{userProfile?.followersCount}</span> followers
                        </p>
                        <p className="m-0 p-0" style={{ fontSize: ".75rem" }}
                            data-bs-toggle="modal" data-bs-target="#listFollowingModal" onClick={() => getUsers(false)}>
                            <span className="fw-bold m">{userProfile?.followingCount}</span> following
                        </p>
                    </div>
                    <p className="m-0 p-0 w-75" style={{ fontSize: ".75rem", whiteSpace: "pre-wrap" }} >
                        {userProfile?.bio}
                    </p>
                    <p className="m-0 p-0 my-2 fw-bold" style={{ fontSize: ".75rem" }} >@{userProfile?.username}</p>
                </div>
                <ListFollowersModal isLoading={isLoading} users={users} />
                <ListFollowingModal isLoading={isLoading} users={users} />
            </div>
        </>
    )
}
