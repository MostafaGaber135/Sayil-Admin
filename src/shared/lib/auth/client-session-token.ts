"use client";

import { getSession } from "next-auth/react";
import { getServerSession, type Session } from "next-auth";
import { authOptions } from "./nextauth.options";
import axios from "axios";

let cachedToken: string | null = null;
let cachedAt = 0;
let tokenPromise: Promise<string | null> | null = null;

const CACHE_TTL_MS = 10_000;

export async function getClientAccessToken(): Promise<string | null> {
  const now = Date.now();
  if (cachedToken && now - cachedAt < CACHE_TTL_MS) {
    return cachedToken;
  }

  if (tokenPromise) return tokenPromise;

  tokenPromise = getSession().then((session: Session | null) => {
    cachedToken = session?.accessToken ?? null;
    cachedAt = Date.now();
    tokenPromise = null;
    return cachedToken;
  });

  return tokenPromise;
}

export function clearClientAccessTokenCache() {
  cachedToken = null;
  cachedAt = 0;
  tokenPromise = null;
}