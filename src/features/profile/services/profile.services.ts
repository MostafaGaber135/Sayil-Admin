
import { api } from "@/shared/lib/axios/axios.instance";

export const getProfile = (token: string) => {
return api.get("/api/admin/account/profile", {
headers: {
Authorization: `Bearer ${token}`,
},
});
};

export const changePassword = (data: any, token: string) => {
return api.post("/api/admin/account/change-password", data, {
headers: {
    Authorization: `Bearer ${token}`,
},
});
};

export const updateProfile = (data: { fullName: string; phoneNumber: string }, token: string) => {
    return api.put("/api/admin/account/profile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  };