"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { Globe } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { defaultLocale, isLocale, type Locale } from "@/shared/lib/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";


export default function LocaleSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ locale?: string }>();

  const currentLocale: Locale = useMemo(() => {
    const raw = params?.locale;
    return raw && isLocale(raw) ? raw : defaultLocale;
  }, [params]);

  const navigateTo = (nextLocale: Locale) => {
    router.replace(pathname, { locale: nextLocale });
  };

  const nextLocale: Locale = currentLocale === "en" ? "ar" : "en";
  const label = nextLocale === "ar" ? "العربية" : "English";

  return (
    <Button
      variant="ghost"
      className={`gap-2 px-2 ${currentLocale === "ar" ? "flex-row-reverse" : ""} cursor-pointer`}
      onClick={() => navigateTo(nextLocale)}
      aria-label="Language"
    >
      <Globe className="h-5 w-5" />
      <span className="text-sm font-medium">{label}</span>
    </Button>
  );
}
