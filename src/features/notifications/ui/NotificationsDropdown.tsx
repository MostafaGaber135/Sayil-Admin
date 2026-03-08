"use client";

import { useState } from "react";
import { Bell, CheckCircle2, Info, Clock } from "lucide-react";
import {
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useNotifications,
  useUnreadNotificationsCount,
} from "../hooks/notifications.hooks";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslations } from "next-intl";
import LoadingState from "@/shared/ui/LoadingState";

dayjs.extend(relativeTime);

export default function NotificationDropdown() {
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const { data: unreadCount = 0 } = useUnreadNotificationsCount();
  const [open, setOpen] = useState(false);

  const { data: notifications = [], isLoading } = useNotifications();
  const { mutate: markAll, isPending: isMarkingAll } =
    useMarkAllNotificationsAsRead();
    const t = useTranslations()
  return (
    <div className="relative">
      {/* 🔔 Bell */}

      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-gray-100"
      >
        <Bell className="w-6 h-6" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-[360px] bg-white rounded-xl shadow-xl border z-50">
          {/* HEADER */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold text-lg">{t("pages.notification.Notifications")}</h3>

            <button
              disabled={isMarkingAll}
              onClick={() => markAll()}
              className="text-blue-600 text-sm hover:underline"
            >
              {isMarkingAll ? t("pages.notification.Marking") : t("pages.notification.Mark")}
            </button>
          </div>

          {/* LIST */}
          <div className="max-h-[400px] overflow-y-auto">
            {isLoading ? (
              <LoadingState/>
            ) : notifications.length > 0 ? (
              notifications.map((n: any) => (
                <div
                  key={n.id}
                  onClick={() => {
                    if (!n.isRead) {
                      markAsRead(n.id);
                    }
                  }}
                  className="flex gap-3 p-4 hover:bg-gray-50 border-b cursor-pointer"
                >
                  {/* ICON */}
                  <div className="mt-1">
                    {n.type === "success" ? (
                      <CheckCircle2 className="text-green-500" />
                    ) : (
                      <Info className="text-blue-500" />
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{n.title}</p>

                    <p className="text-gray-500 text-sm">{n.message}</p>

                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <Clock size={14} />
                      {dayjs(n.createdAt).fromNow()}
                    </div>
                  </div>

                  {/* UNREAD DOT */}
                  {!n.isRead && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  )}
                </div>
              ))
            ) : (
              <p className="p-6 text-center text-sm text-gray-500">
                No notifications
              </p>
            )}
          </div>

          {/* FOOTER */}
          <div className="text-center p-3 border-t">
            <button className="text-blue-600 text-sm hover:underline">
              {t("pages.notification.View all")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
