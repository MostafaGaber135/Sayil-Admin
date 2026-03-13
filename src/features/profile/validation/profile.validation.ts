import z from "zod";

export const passwordSchema = z
.object({
    currentPassword: z
      .string()
      .min(8, "Current password must be at least 8 characters"),

    newPassword: z
     .string()
      .min(8, "Current password must be at least 8 characters"),

    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });