import type { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string | null;
    user?: DefaultSession["user"] & {
      id?: number;
      email?: string;
      fullName?: string;
      phoneNumber?: string;
      nationalId?: string;
      role?: string;
      permissions?: string[];
      joinedDate?: string;
      isActive?: boolean;
    };
  }

  interface User {
    accessToken: string;
    refreshToken?: string | null;
    isFirstTimeLogin?: boolean;
    user?: Session["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string | null;
    user?: unknown;
  }
}
