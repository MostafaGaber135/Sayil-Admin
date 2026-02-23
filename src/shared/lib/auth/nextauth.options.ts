import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AdminLoginResponse } from "@/features/auth/types/auth.types";

function normalizeApiBaseUrl(value: string) {
  let base = value.trim();
  while (base.endsWith("/")) base = base.slice(0, -1);
  if (base.toLowerCase().endsWith("/api")) base = base.slice(0, -4);
  return base;
}

function pickId(adminUser: AdminLoginResponse["data"]["user"], fallback: string) {
  const candidate =
    (typeof (adminUser as Record<string, unknown>).id === "string" ||
      typeof (adminUser as Record<string, unknown>).id === "number"
      ? (adminUser as Record<string, unknown>).id
      : undefined) ??
    (typeof (adminUser as Record<string, unknown>)._id === "string" ||
      typeof (adminUser as Record<string, unknown>)._id === "number"
      ? (adminUser as Record<string, unknown>)._id
      : undefined);

  return String(candidate ?? fallback);
}

function pickName(adminUser: AdminLoginResponse["data"]["user"]) {
  const r = adminUser as Record<string, unknown>;
  const name =
    (typeof r.name === "string" ? r.name : undefined) ??
    (typeof r.fullName === "string" ? r.fullName : undefined) ??
    (typeof r.username === "string" ? r.username : undefined) ??
    "";

  const trimmed = name.trim();
  return trimmed ? trimmed : undefined;
}

function pickEmail(adminUser: AdminLoginResponse["data"]["user"]) {
  const r = adminUser as Record<string, unknown>;
  return typeof r.email === "string" ? r.email : undefined;
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

        return {
          id: pickId(adminUser, phoneNumber),
          name: pickName(adminUser),
          email: pickEmail(adminUser),

          accessToken: data.data.token,
          refreshToken: data.data.refreshToken ?? null,
          isFirstTimeLogin: Boolean(data.data.isFirstTimeLogin),
          user: adminUser
        };
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken ?? null;
        token.user = user.user ?? null;
        token.isFirstTimeLogin = user.isFirstTimeLogin ?? false;

        token.sub = user.id ?? token.sub;
        token.name = user.name ?? token.name;
        token.email = user.email ?? token.email;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken ?? null;
      session.isFirstTimeLogin = token.isFirstTimeLogin ?? false;

      if (token.user) {
        session.user = token.user;
      }

      return session;
    }
  },

  pages: {
    signIn: "/login"
  },

  secret: process.env.NEXTAUTH_SECRET
};