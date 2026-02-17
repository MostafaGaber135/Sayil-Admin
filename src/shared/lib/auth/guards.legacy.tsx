// "use client";

// import { useEffect } from "react";
// import { usePathname, useParams, useRouter } from "next/navigation";
// import { useAppSelector } from "@/shared/lib/rtk/hooks";
// import { locales, defaultLocale } from "@/shared/lib/i18n/routing";
// import { getAccessToken } from "@/shared/lib/auth/token";

// function stripLocale(pathname: string) {
//     const parts = pathname.split("/");
//     const maybeLocale = parts[1];

//     if (maybeLocale && (locales as readonly string[]).includes(maybeLocale)) {
//         const rest = "/" + parts.slice(2).join("/");
//         return rest === "/" ? "/" : rest;
//     }

//     return pathname;
// }

// function isProtectedPath(pathNoLocale: string) {
//     const roots = ["/dashboard", "/listings", "/users", "/roles-permissions", "/settings"];
//     return roots.some((r) => pathNoLocale === r || pathNoLocale.startsWith(`${r}/`));
// }

// export function AuthGuard({ children }: { children: React.ReactNode }) {
//     const router = useRouter();
//     const pathname = usePathname();
//     const params = useParams<{ locale?: string }>();

//     const locale = params?.locale ?? defaultLocale;

//     const reduxToken = useAppSelector((s) => s.auth.token);

//     useEffect(() => {
//         const pathNoLocale = stripLocale(pathname);

//         if (!isProtectedPath(pathNoLocale)) return;

//         const token = reduxToken || getAccessToken();

//         if (!token) {
//             const loginPath = locale === defaultLocale ? "/login" : `/${locale}/login`;
//             router.replace(loginPath);
//         }
//     }, [pathname, reduxToken, router, locale]);

//     return <>{children}</>;
// }
