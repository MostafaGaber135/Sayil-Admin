
"use server";

import { getServerSession } from "next-auth";

import { revalidatePath } from "next/cache";
import { changePassword, getProfile } from './../services/profile.services';
import { authOptions } from "@/shared/lib/auth/nextauth.options";

export async function getProfileAction() {
try {
const session = await getServerSession(authOptions);

const res = await getProfile(session?.accessToken as string);

return {
  success: true,
  data: res.data.data,
};

} catch (error: any) {
console.log("GET PROFILE ERROR:", error?.response?.data || error);

return {
  success: false,
  message: error?.response?.data?.message || "Failed to fetch profile",
};

}
}

export async function updateProfileAction(
_prevState: any,
formData: FormData
) {
try {
const session = await getServerSession(authOptions);


const payload = {
  fullName: String(formData.get("fullName")),
  phoneNumber: String(formData.get("phoneNumber")),
};

await updateProfileAction(payload, session?.accessToken as string);

revalidatePath("/profile");

return {
  success: true,
  message: "Profile updated successfully",
};

} catch (error: any) {
console.log("UPDATE PROFILE ERROR:", error?.response?.data || error);

return {
  success: false,
  message: error?.response?.data?.message || "Something went wrong",
};

}
}



export async function changePasswordAction(
_prevState: any,
formData: FormData
) {
try {
const session = await getServerSession(authOptions);

const payload = {
  currentPassword: String(formData.get("currentPassword")),
  newPassword: String(formData.get("newPassword")),
  confirmNewPassword: String(formData.get("confirmNewPassword")),
};

await changePassword(payload, session?.accessToken as string);

return {
  success: true,
  message: "Password changed successfully",
};

} catch (error: any) {
console.log("CHANGE PASSWORD ERROR:", error?.response?.data || error);

return {
  success: false,
  message:
    error?.response?.data?.message ||
    "Failed to change password",
};

}
}