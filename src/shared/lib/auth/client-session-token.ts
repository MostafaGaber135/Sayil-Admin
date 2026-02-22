"use client";

import { getSession } from "next-auth/react";

let cachedToken: string | null = null;
let cachedAt = 0;

const CACHE_TTL_MS = 10_000;

export async function getClientAccessToken() {
  const now = Date.now();

  if (cachedToken && now - cachedAt < CACHE_TTL_MS) return cachedToken;

  const session = await getSession();
  const token = (session as any)?.accessToken as string | undefined;

  cachedToken = token ?? null;
  cachedAt = now;

  return cachedToken;
}

export function clearClientAccessTokenCache() {
  cachedToken = null;
  cachedAt = 0;
}
