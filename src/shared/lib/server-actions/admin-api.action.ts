"use server";

import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { authOptions } from "@/shared/lib/auth/nextauth.options";

function normalizeApiBaseUrl(value: string) {
  let base = value.trim();
  while (base.endsWith("/")) base = base.slice(0, -1);
  if (base.toLowerCase().endsWith("/api")) base = base.slice(0, -4);
  return base;
}

function resolveServerApiBaseUrl() {
  const raw = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!raw) {
    throw new Error(
      "API_BASE_URL is not set. Add API_BASE_URL (or NEXT_PUBLIC_API_BASE_URL) to your .env(.local)."
    );
  }
  return normalizeApiBaseUrl(raw);
}

export async function adminApiFetch(path: string, init: RequestInit = {}) {
  const session: Session | null = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  const base = resolveServerApiBaseUrl();
  const url = path.startsWith("http")
    ? path
    : `${base}${path.startsWith("/") ? "" : "/"}${path}`;

  const headers = new Headers(init.headers);
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  if (!headers.has("Accept")) headers.set("Accept", "application/json, text/plain");

  return fetch(url, {
    ...init,
    headers,
    cache: init.cache ?? "no-store"
  });
}