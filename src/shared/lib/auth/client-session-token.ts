"use client";

import { getSession } from "next-auth/react";
import type { Session } from "next-auth";

let cachedToken: string | null = null;
let cachedAt = 0;

const CACHE_TTL_MS = 10_000;

export async function getClientAccessToken(): Promise<string | null> {
  const now = Date.now();

  if (cachedToken && now - cachedAt < CACHE_TTL_MS) {
    return cachedToken;
  }

  const session: Session | null = await getSession();

  const token = session?.accessToken ?? null;

  cachedToken = token;
  cachedAt = now;

  return cachedToken;
}

export function clearClientAccessTokenCache() {
  cachedToken = null;
  cachedAt = 0;
}