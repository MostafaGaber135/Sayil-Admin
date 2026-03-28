// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const protectedPaths = [
  "/dashboard",
  "/profile",
  "/listings",
  "/settings",
];
const routePermissions: Record<string, string> = {
  "/roles-permissions": "systemadministration.managesettings",
  "/users": "usersmanagement.view",
};

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const locale = pathname.match(/^\/(en|ar)/)?.[1] ?? "ar";
  const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "") || "/";

  if (pathWithoutLocale.startsWith("/login") && token) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
  }

  const isProtected =
    [...protectedPaths, ...Object.keys(routePermissions)].some(
      (p) => pathWithoutLocale === p || pathWithoutLocale.startsWith(`${p}/`)
    );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }
  // if (token) {
  //   const claims = (token.claims as string[]) ?? [];

  //   const requiredClaim = Object.entries(routePermissions).find(
  //     ([path]) =>
  //       pathWithoutLocale === path || pathWithoutLocale.startsWith(`${path}/`)
  //   )?.[1];

  //   if (requiredClaim && !claims.includes(requiredClaim)) {
  //     return NextResponse.redirect(new URL(`/${locale}/unauthorized`, req.url));
  //   }
  // }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};