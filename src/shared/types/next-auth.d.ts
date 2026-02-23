import type { DefaultSession, DefaultUser } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";
import type { AdminLoginResponse } from "@/features/auth/types/auth.types";

type AdminUser = AdminLoginResponse["data"]["user"];

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    refreshToken: string | null;
    isFirstTimeLogin: boolean;
    user: AdminUser;
  }

  interface User extends DefaultUser {
    accessToken: string;
    refreshToken: string | null;
    isFirstTimeLogin: boolean;
    user: AdminUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string;
    refreshToken: string | null;
    isFirstTimeLogin: boolean;
    user: AdminUser | null;
  }
}