import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  getUnreadNotificationsCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../services/notifications.services";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await getNotifications({
        pageNumber: 1,
        pageSize: 20,
        onlyUnread: false,
      });

      return res.data.data.items;
    },
  });
};

export const useUnreadNotificationsCount = () => {
  return useQuery({
    queryKey: ["notifications-unread-count"],
    queryFn: async () => {
      const res = await getUnreadNotificationsCount();
      return res.data.data.value;
    },
  });
};




