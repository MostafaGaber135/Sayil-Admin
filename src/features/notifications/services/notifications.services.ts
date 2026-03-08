import { api } from "@/shared/lib/axios/axios.instance";

//Get All
export const getNotifications = (params: {
  pageNumber?: number;
  pageSize?: number;
  onlyUnread?: boolean;
}) => {
  return api.get("/api/admin/notifications/list", {
    params,
  });
};

//Get count
export const getUnreadNotificationsCount = () => {
  return api.get("/api/admin/notifications/unread-count");
};

//Mark Read
export const markNotificationAsRead = (id: number) => {
  return api.post(`/api/admin/notifications/mark-read/${id}`);
};

//Mark All Read
export const markAllNotificationsAsRead = () => {
  return api.post("/api/admin/notifications/mark-all-read");
};