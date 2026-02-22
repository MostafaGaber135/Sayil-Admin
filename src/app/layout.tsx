import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/shared/providers/Providers";
import { cookies } from "next/headers";
import { defaultLocale, locales, type Locale } from "@/shared/lib/i18n/routing";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Sayil Admin",
  description: "Sayil admin dashboard"
};

function resolveLocale(raw: string | undefined): Locale {
  return (raw && (locales as readonly string[]).includes(raw)) ? (raw as Locale) : defaultLocale;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  const cookieLocale = store.get("NEXT_LOCALE")?.value;
  const locale = resolveLocale(cookieLocale);
  const dir = locale === "ar" ? "rtl" : "ltr";
  const apiBaseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";

  return (
    <html lang={locale} dir={dir}>
      <body className={`${inter.variable} antialiased`}>
        {/*
          Runtime API base URL injection.
          This prevents client requests from accidentally hitting Next.js app routes
          (e.g. /api/admin/*) when NEXT_PUBLIC_API_BASE_URL isn't available in the bundle.
        */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `window.__API_BASE_URL__=${JSON.stringify(apiBaseUrl)};`
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
