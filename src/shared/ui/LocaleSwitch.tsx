"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { Globe } from "lucide-react";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { defaultLocale, isLocale, type Locale } from "@/shared/lib/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

type Props = {
  className?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
};

export default function LocaleSwitch({ className, variant = "ghost", size = "default" }: Props) {
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
      variant={variant}
      size={size}
      className={`gap-2 px-2 ${currentLocale === "ar" ? "flex-row-reverse" : ""
        } cursor-pointer
rounded-lg border border-transparent
transition-colors duration-200 ease-out
hover:rounded-none hover:border-primary/25 hover:bg-primary/10 hover:text-primary
${className ?? ""}`}

      onClick={() => navigateTo(nextLocale)}
      aria-label="Language"
    >
      <Globe className="h-5 w-5" />
      <span className="text-sm font-medium">{label}</span>
    </Button>

  );
}
