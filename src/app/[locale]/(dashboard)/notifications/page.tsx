"use client";

import {
  useTransition,
  useActionState,
  useEffect,
  useState,
  useMemo,
} from "react";
import { CheckCircle2, Info, Clock, Search } from "lucide-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import LoadingState from "@/shared/ui/LoadingState";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import {
  markAllNotificationsAsReadAction,
  markNotificationAsReadAction,
  deleteAllNotificationsAction,
} from "@/features/notifications/actions/notification.actions";

import {
  useNotifications,
  useUnreadNotificationsCount,
} from "@/features/notifications/hooks/notifications.hooks";

dayjs.extend(relativeTime);

export default function Notifications() {
  const t = useTranslations("pages.notification");
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useNotifications();
  const { data: unreadCount = 0 } = useUnreadNotificationsCount();

  const [search, setSearch] = useState("");

  const [isPending, startTransition] = useTransition();
  const [isPendingAll, startTransitionAll] = useTransition();
  const [isPendingDelete, startTransitionDelete] = useTransition();

  const initialState = { success: false, message: "" };

  const [state, formAction] = useActionState(
    markNotificationAsReadAction,
    initialState,
  );

  const [stateAll, formActionAll] = useActionState(
    markAllNotificationsAsReadAction,
    initialState,
  );

  const [deleteState, deleteAction] = useActionState(
    deleteAllNotificationsAction,
    initialState,
  );

  /* ================= FILTER NOTIFICATIONS ================= */

  const filteredNotifications = useMemo(() => {
    if (!search) return notifications;

    return notifications.filter(
      (n: any) =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.message.toLowerCase().includes(search.toLowerCase()),
    );
  }, [notifications, search]);

  /* ================= ACTION RESPONSES ================= */

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);

      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["notifications-unread-count"],
      });
    }
  }, [state]);

  useEffect(() => {
    if (stateAll?.success) {
      toast.success(stateAll.message);

      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["notifications-unread-count"],
      });
    }
  }, [stateAll]);

  useEffect(() => {
    if (deleteState?.success) {
      toast.success(deleteState.message);

      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["notifications-unread-count"],
      });
    }
  }, [deleteState]);

  /* ================= ACTIONS ================= */

  const handleMarkAsRead = (id: number) => {
    const formData = new FormData();
    formData.set("id", String(id));

    startTransition(() => {
      formAction(formData);
    });
  };

  const handleMarkAll = () => {
    startTransitionAll(() => {
      formActionAll();
    });
  };

  const handleDeleteAll = () => {
    startTransitionDelete(() => {
      deleteAction();
    });
  };

  /* ================= UI ================= */

  return (
    <div className="w-full p-6 space-y-6">
      {/* HEADER */}
      <div className="flex gap-4 flex-wrap items-center">
        <Button variant="outline">{t("Unread Notifications")} ({unreadCount})</Button>

        <Button
          className=" cursor-pointer"
          disabled={isPendingAll}
          onClick={handleMarkAll}
        >
          {isPendingAll ? t("Loading") : t("Mark")}
        </Button>

        <Button
          className=" cursor-pointer"
          variant="destructive"
          disabled={isPendingDelete}
          onClick={handleDeleteAll}
        >
          {isPendingDelete ? t("Deleting") : t("Delete All")}
        </Button>
      </div>

      {/* SEARCH */}
      <div className="relative w-full">
        <Input
          placeholder={t("Search notifications")}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LIST */}
      <div className="w-full border rounded-lg overflow-hidden">
        {isLoading ? (
          <LoadingState />
        ) : filteredNotifications.length > 0 ? (
          <div className="max-h-150 overflow-y-auto">
            {filteredNotifications.map((n: any) => (
              <div
                key={n.id}
                onClick={() => {
                  if (!n.isRead) handleMarkAsRead(n.id);
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
            ))}
          </div>
        ) : (
          <p className="p-6 text-center text-sm text-gray-500">
            {t("No notifications")}
          </p>
        )}
      </div>
    </div>
  );
}
