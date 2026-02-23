"use client";

import { useEffect, useMemo } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { defaultLocale, locales } from "@/shared/lib/i18n/routing";

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
  const { status } = useSession();

  const locale = params?.locale ?? defaultLocale;

  const pathNoLocale = useMemo(() => stripLocale(pathname), [pathname]);
  const isProtected = useMemo(() => isProtectedPath(pathNoLocale), [pathNoLocale]);

  const shouldBlockRender = useMemo(() => {
    if (!isProtected) return false;
    if (status === "loading") return true;
    if (status !== "authenticated") return true;
    return false;
  }, [isProtected, status]);

  useEffect(() => {
    if (!isProtected) return;
    if (status === "loading") return;

    if (status !== "authenticated") {
      router.replace(buildPath(locale, "/login"));
    }
  }, [isProtected, status, router, locale]);

  if (shouldBlockRender) return null;

  return <>{children}</>;
}

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ locale?: string }>();
  const { status } = useSession();

  const locale = params?.locale ?? defaultLocale;

  const pathNoLocale = useMemo(() => stripLocale(pathname), [pathname]);
  const isAuthPath = useMemo(
    () => pathNoLocale === "/login" || pathNoLocale.startsWith("/login/"),
    [pathNoLocale]
  );

  const shouldBlockRender = useMemo(() => {
    if (status === "loading") return true;
    if (status === "authenticated" && isAuthPath) return true;
    return false;
  }, [status, isAuthPath]);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated" && isAuthPath) {
      router.replace(buildPath(locale, "/dashboard"));
    }
  }, [status, isAuthPath, router, locale]);

  if (shouldBlockRender) return null;

  return <>{children}</>;
}