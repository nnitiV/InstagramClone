"use client";
import { fetchNotifications } from "@/services/notification.service";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useEffect, useMemo } from "react";
import FollowItem from "./FollowItem";
import { NotificationType } from "@/types/notification";

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

  const { today, earlier } = useMemo(() => {
    const todayDateStr = new Date().toDateString();
    
    const grouped = {
      today: [] as NotificationType[],
      earlier: [] as NotificationType[],
    };

    // Percorremos o array apenas UMA vez
    notifications.forEach((n) => {
      if (new Date(n.createdAt).toDateString() === todayDateStr) {
        grouped.today.push(n);
      } else {
        grouped.earlier.push(n);
      }
    });

    return grouped;
  }, [notifications]);
  
  return (
    <div
      className="offcanvas offcanvas-start px-lg-3 p-3 col col-12 col-md-6"
      style={{ borderRadius: "0 20px 20px 0" }}
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
            {today.length > 0 && (
              <>
                <h1 className="mt-4 fw-bold fs-5 p-0 w-100">Today</h1>
                {today.map((todayFollow) => (
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
