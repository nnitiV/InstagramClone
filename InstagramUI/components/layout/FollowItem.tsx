import {
  checkFollowStatus,
  followUser,
  unfollowUser,
} from "@/feature/profile/services/profile.service";
import { NotificationType } from "@/types/notification";
import { formatDistanceToNow, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { useEffect, useState } from "react";

type FollowItemProps = {
  follow: NotificationType;
};

export default function FollowItem({ follow }: FollowItemProps) {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(false);
  useEffect(() => {
    const checkStatus = async () => {
      const following = await checkFollowStatus(follow.triggerById);
      setIsFollowing(following ? following.isFollowing : null);
    };
    checkStatus();
  }, []);
  const formatShortDate = (date: string | Date) => {
    const d = new Date(date);

    if (!date || !isValid(d)) return "agora";

    let distance = formatDistanceToNow(d, { locale: ptBR });

    return distance
      .replace("aproximadamente ", "")
      .replace("cerca de ", "")
      .replace("menos de um minuto", "agora")
      .replace("há ", "")
      .replace(/ minutos?/g, "min") 
      .replace(/ horas?/g, "h")
      .replace(/ dias?/g, "d")
      .replace(/ meses?/g, "mes")
      .replace(/ anos?/g, "an");
  };
  const triggerFollow = () => {
    const doFollow = async () => {
      if (!isFollowing) {
        await followUser(follow.triggerById);
        setIsFollowing(true);
      } else {
        await unfollowUser(follow.triggerById);
        setIsFollowing(false);
      }
    };
    doFollow();
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
                  ? "http://localhost:5000/" + follow.triggerByPhoto
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
          className="btn btn- ms-3"
          style={{ height: "fit-content", fontSize: ".75em" }}
          onClick={triggerFollow}
        >
          Unfollow
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-primary ms-1"
          style={{ height: "fit-content", fontSize: ".75em" }}
          onClick={triggerFollow}
        >
          Follow back
        </button>
      ) : <></>}
    </div>
  );
}
