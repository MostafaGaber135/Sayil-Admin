import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  getUnreadNotificationsCount,
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

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => markNotificationAsRead(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications-unread-count"],
      });
    },
  });
};
