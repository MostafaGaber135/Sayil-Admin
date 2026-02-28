"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { defaultLocale, type Locale } from "@/shared/lib/i18n/routing";
import { stripLocale, withLocale } from "@/shared/lib/i18n/pathname";

type NavItemModel = {
  key: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  labelKey?: string;
  label?: string;
};

export default function NavItem({
  item,
  onNavigate
}: {
  item: NavItemModel;
  onNavigate?: () => void;
}) {
  const t = useTranslations();
  const pathname = usePathname();

  const locale = ((useLocale() || defaultLocale) as Locale);
  const isRTL = locale === "ar";

  const raw = item.href?.startsWith("/") ? item.href : `/${item.href || ""}`;
  const href = withLocale(raw, locale);

  const currentNoLocale = stripLocale(pathname);
  const targetNoLocale = stripLocale(href);

  const isActive =
    currentNoLocale === targetNoLocale ||
    currentNoLocale.startsWith(`${targetNoLocale}/`);

  const Icon = item.icon;

  return (
    <Link
      href={href}
      onClick={() => onNavigate?.()}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group w-full flex items-center gap-3 rounded-xl px-8 py-3 text-sm font-medium transition-colors",
        isRTL ? "justify-end" : "",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-nav-hover hover:text-foreground"
      )}
    >
      {isRTL ? (
        <>
          <span className="min-w-0 truncate text-start">
            {item.labelKey ? t(item.labelKey) : item.label ?? item.key}
          </span>

          {Icon ? (
            <Icon
              className={cn(
                "h-5 w-5 shrink-0 transition-colors",
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground group-hover:text-nav-icon-hover"
              )}
            />
          ) : null}
        </>
      ) : (
        <>
          {Icon ? (
            <Icon
              className={cn(
                "h-5 w-5 shrink-0 transition-colors",
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground group-hover:text-nav-icon-hover"
              )}
            />
          ) : null}

          <span className="min-w-0 truncate text-start">
            {item.labelKey ? t(item.labelKey) : item.label ?? item.key}
          </span>
        </>
      )}
    </Link>
  );
}
