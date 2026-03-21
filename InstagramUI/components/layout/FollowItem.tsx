import { BASE_URL } from "@/constants";
import { checkFollowStatus, followUser, unfollowUser } from "@/services/follower.service";
import { NotificationType } from "@/types/notification";
import { formatShortDate } from "@/utils/date";
import Link from "next/link";
import { useEffect, useState } from "react";

type FollowItemProps = {
  follow: NotificationType;
};

export default function FollowItem({ follow }: FollowItemProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  useEffect(() => {
    let isMounted = true; 
    
    const checkStatus = async () => {
      try {
        const following = await checkFollowStatus(follow.triggerById);
        if (isMounted) setIsFollowing(following ? following.isFollowing : false);
      } catch (error) {
        if (isMounted) setIsFollowing(false);
      }
    };
    checkStatus();

    return () => { isMounted = false; };
  }, [follow.triggerById]);
  const triggerFollow = () => {
    if (isFollowing === null || isLoading) return;
    setIsLoading(true);
    const doFollow = async () => {
      if (!isFollowing) {
        setIsFollowing(true);
        await followUser(follow.triggerById);
      } else {
        setIsFollowing(false);
        await unfollowUser(follow.triggerById);
      }
    };
    doFollow();
    setIsLoading(false);
  };
  return (
    <div
      key={follow.id}
      className="transparent-background-hover cursor-pointer rounded w-100 d-flex justify-content-between align-items-center px-2"
    >
      <Link
        href={`/profile/${follow.triggerByUsername}`}
        className="text-decoration-none text-body"
      >
        <div
          className="d-flex mb-1 p-0 py-2"
          data-bs-dismiss="offcanvas"
          data-mdb-ripple-init
          data-mdb-ripple-color="light"
        >
          <div className="p-1 rounded-circle position-relative me-2">
            <img
              src={
                follow.triggerByPhoto
                  ? BASE_URL + follow.triggerByPhoto
                  : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
              }
              alt="Story"
              className="rounded-circle"
              style={{
                width: "46px",
                height: "46px",
                objectFit: "cover",
              }}
            />
          </div>
          <div
            className="d-flex flex-column justify-content-center"
            style={{ fontSize: ".85rem" }}
          >
            <p className="m-0 p-0">
              {follow.message}
              <span style={{ color: "rgba(25,25,25,0.4)" }}>
                {" "}
                {formatShortDate(follow.createdAt)} 
              </span>
            </p>
          </div>
        </div>
      </Link>
      {isFollowing != null ? isFollowing ? (
        <button
          type="button"
          className="btn border ms-3"
          style={{ height: "fit-content", fontSize: ".75em" }}
          disabled={isLoading}
          onClick={triggerFollow}
        >
          Unfollow
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-primary ms-1"
          style={{ height: "fit-content", fontSize: ".75em" }}
          disabled={isLoading}
          onClick={triggerFollow}
        >
          Follow back
        </button>
      ) : <></>}
    </div>
  );
}
