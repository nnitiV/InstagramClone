"use client";
import { checkFollowStatus } from "@/feature/profile/services/profile.service";
import { fetchNotifications } from "@/services/notification.service";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { NotificationType } from "@/types/notification";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import FollowItem from "./FollowItem";
export interface Notification {
  id: number;
  username: string;
  profilePictureUrl: string; // Adicionei pois você precisará para o <img>
  timestamp: string; // ISO String do C# (ex: "2026-02-24T18:00:00Z")
  followedUserId: number | null; // ID do usuário se você já o segue, senão null
}

export default function NotificationsOffcanvas() {
  const notifications = useNotificationStore((state) => state.notifications);
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications,
  );
  useEffect(() => {
    const getNotifications = async () => {
      const fetchedNotifications = await fetchNotifications();
      setNotifications(fetchedNotifications.notifications);
    };
    getNotifications();
  }, [setNotifications]);

  const todayFollows = useMemo(() => {
    const today = new Date().toDateString();
    return notifications.filter(
      (n) => new Date(n.createdAt).toDateString() === today,
    );
  }, [notifications]);
  const earlier = useMemo(() => {
    const today = new Date().toDateString();
    return notifications.filter(
      (n) => new Date(n.createdAt).toDateString() !== today,
    );
  }, [notifications]);

  const checkFollow = (followId: number) => {
    return checkFollowStatus(followId).then((result) => {
      return result;
    });
  };

  
  return (
    <div
      className="offcanvas offcanvas-start px-lg-3 p-3 col col-12 col-md-6"
      tabIndex={-1}
      id="notificationsOffset"
      aria-labelledby="notificationsOffsetLabel"
    >
      <div className="d-flex flex-column overflow-y-auto">
        <div className="d-flex align-items-center justify-content-between w-100 my-lg-4 px-lg-2">
          <h5 className="offcanvas-title" id="notificationsOffsetLabel">
            Notifications
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        {notifications.length <= 0 ? (
          <div className="mt-5 h-100 w-100 d-flex justify-content-center align-items-center">
            <p>Everything quiet for now...</p>
          </div>
        ) : (
          <>
            {todayFollows.length > 0 && (
              <>
                <h1 className="mt-4 fw-bold fs-5 p-0 w-100">Today</h1>
                {todayFollows.map((todayFollow) => (
                   <FollowItem key={todayFollow.id} follow={todayFollow} />
                ))}
              </>
            )}
            {earlier.length > 0 && (
              <>
                <h1 className="mt-4 fw-bold fs-5 p-0 w-100">Earlier</h1>
                {earlier.map((earlier) => (
                  <FollowItem key={earlier.id} follow={earlier} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
