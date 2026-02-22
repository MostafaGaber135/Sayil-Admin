import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AdminLoginResponse } from "@/features/auth/types/auth.types";

function normalizeApiBaseUrl(value: string) {
  let base = value.trim();
  while (base.endsWith("/")) base = base.slice(0, -1);
  if (base.toLowerCase().endsWith("/api")) base = base.slice(0, -4);
  return base;
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phoneNumber: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(raw) {
        const phoneNumber = String(raw?.phoneNumber ?? "").trim();
        const password = String(raw?.password ?? "");

        if (!phoneNumber || !password) return null;

        const rawBase = process.env.API_BASE_URL;
        if (!rawBase) return null;

        const API_BASE_URL = normalizeApiBaseUrl(rawBase);

        const res = await fetch(`${API_BASE_URL}/api/admin/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain"
          },
          body: JSON.stringify({ phoneNumber, password }),
          cache: "no-store"
        });
        if (!res.ok) return null;
        const data = (await res.json()) as AdminLoginResponse;
        if (!data?.succeeded || !data?.data?.token) return null;

        const adminUser = data.data.user;
        const user: User & {
          accessToken: string;
          refreshToken: string | null;
          isFirstTimeLogin: boolean;
          user: typeof adminUser;
        } = {
          id: String((adminUser as any)?.id ?? (adminUser as any)?._id ?? phoneNumber),
          name:
            String(
              (adminUser as any)?.name ??
              (adminUser as any)?.fullName ??
              (adminUser as any)?.username ??
              ""
            ) || undefined,
          email: (adminUser as any)?.email ?? undefined,

          accessToken: data.data.token,
          refreshToken: data.data.refreshToken ?? null,
          isFirstTimeLogin: Boolean(data.data.isFirstTimeLogin),
          user: adminUser
        };

        return user;
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken ?? null;
        token.user = (user as any).user ?? null;
        token.isFirstTimeLogin = (user as any).isFirstTimeLogin ?? false;
        token.sub = (user as any).id ?? token.sub;
        token.name = (user as any).name ?? token.name;
        token.email = (user as any).email ?? token.email;
      }

      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = (token as any).accessToken;
      (session as any).refreshToken = (token as any).refreshToken ?? null;
      session.user = (token as any).user as any;
      (session as any).isFirstTimeLogin = (token as any).isFirstTimeLogin ?? false;

      return session;
    }
  },

  pages: {
    signIn: "/login"
  },

  secret: process.env.NEXTAUTH_SECRET
};