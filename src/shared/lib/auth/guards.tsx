"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/shared/lib/rtk/hooks";
import { locales, defaultLocale } from "@/shared/lib/i18n/routing";
import { getAccessToken } from "@/shared/lib/auth/token";

function stripLocale(pathname: string) {
  const parts = pathname.split("/");
  const maybeLocale = parts[1];

  if (maybeLocale && (locales as readonly string[]).includes(maybeLocale)) {
    const rest = "/" + parts.slice(2).join("/");
    return rest === "/" ? "/" : rest;
  }

  return pathname;
}

function isProtectedPath(pathNoLocale: string) {
  const roots = ["/dashboard", "/listings", "/users", "/roles-permissions", "/settings"];
  return roots.some((r) => pathNoLocale === r || pathNoLocale.startsWith(`${r}/`));
}

function buildPath(locale: string, path: string) {
  if (locale === defaultLocale) return path;
  return `/${locale}${path}`;
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ locale?: string }>();

  const locale = params?.locale ?? defaultLocale;

  const reduxToken = useAppSelector((s) => s.auth.token);
  const [allowed, setAllowed] = useState(true);

  const isProtected = useMemo(() => {
    const pathNoLocale = stripLocale(pathname);
    return isProtectedPath(pathNoLocale);
  }, [pathname]);

  useEffect(() => {
    if (!isProtected) {
      setAllowed(true);
      return;
    }

    const token = reduxToken || getAccessToken();

    if (!token) {
      setAllowed(false);
      router.replace(buildPath(locale, "/login"));
      return;
    }

    setAllowed(true);
  }, [isProtected, reduxToken, router, locale]);

  if (!allowed && isProtected) return null;

  return <>{children}</>;
}

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ locale?: string }>();

  const locale = params?.locale ?? defaultLocale;
  const reduxToken = useAppSelector((s) => s.auth.token);
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    const token = reduxToken || getAccessToken();
    if (!token) {
      setAllowed(true);
      return;
    }

    const pathNoLocale = stripLocale(pathname);
    const isAuthPath = pathNoLocale === "/login" || pathNoLocale.startsWith("/login/");

    if (!isAuthPath) {
      setAllowed(true);
      return;
    }

    setAllowed(false);
    router.replace(buildPath(locale, "/dashboard"));
  }, [pathname, reduxToken, router, locale]);

  if (!allowed) return null;

  return <>{children}</>;
}
