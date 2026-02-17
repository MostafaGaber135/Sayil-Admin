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

  return (
    <html lang={locale} dir={dir}>
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
