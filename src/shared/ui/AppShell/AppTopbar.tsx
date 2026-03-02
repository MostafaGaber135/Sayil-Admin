"use client";

import { useMemo, useState } from "react";
import { Menu, Bell, User, ChevronDown } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/shared/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu";
import AppSidebar from "./AppSidebar";
import LocaleSwitch from "@/shared/ui/LocaleSwitch";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "@/features/auth/hooks/auth.hooks";
import { defaultLocale } from "@/shared/lib/i18n/routing";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

function formatRoleFallback(role: unknown) {
  const r = String(role ?? "").trim();
  if (!r) return null;
  return r.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export default function AppTopbar() {
  const t = useTranslations();
  const tRoles = useTranslations("pages.roles");
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const { data: session } = useSession();

  const locale = useLocale();
  const pathname = usePathname();
  const firstSeg = pathname?.split("/")[1]?.toLowerCase();
  const isRTL = firstSeg?.startsWith("ar") || locale?.toLowerCase().startsWith("ar");
  const shownLabel = useMemo(() => {
    const rawRole = (session as any)?.user?.role; 
    const roleKey = String(rawRole ?? "").trim();
    if (roleKey) {
  if (tRoles.has(roleKey)) return tRoles(roleKey);
}
    const fallbackLabel = isRTL ? "وكيل" : "Administrator";
    return formatRoleFallback(rawRole) ?? fallbackLabel;
  }, [session, tRoles, isRTL]);

  const MenuBtn = (
    <Button variant="ghost" size="icon" className="md:hidden cursor-pointer" onClick={() => setOpen(true)}>
      <Menu className="h-5 w-5" />
    </Button>
  );

  const Brand = (
    <div className="text-2xl font-semibold tracking-tight select-none">
      Sayil
    </div>
  );

  const NotifBtn = (
    <Button variant="ghost" size="icon" className="relative cursor-pointer" aria-label={t("topbar.notifications")}>
      <Bell className="h-6 w-6" />
      <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
        2
      </span>
    </Button>
  );

  const Divider = (
    <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
  );

  const UserDropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 gap-2 rounded-full px-2 cursor-pointer">
          {isRTL ? (
            <>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
              <span className="hidden sm:inline text-sm font-medium">{shownLabel}</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
                <User className="h-5 w-5" />
              </span>
            </>
          ) : (
            <>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
                <User className="h-5 w-5" />
              </span>
              <span className="hidden sm:inline text-sm font-medium">{shownLabel}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-44 ">
        <DropdownMenuItem className="cursor-pointer">{t("topbar.profile")}</DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive cursor-pointer"
          disabled={isLoggingOut}
          onSelect={(e) => {
            e.preventDefault();
            logout(undefined, {
              onSuccess: () => {
                toast.success(t("topbar.logoutSuccess"));
                const loginPath = locale === defaultLocale ? "/login" : `/${locale}/login`;
                router.replace(loginPath);
              },
              onError: (err: any) => {
                const msg =
                  err?.response?.data?.error?.message ||
                  err?.message ||
                  t("common.somethingWentWrong");
                toast.error(msg);
              },
            });
          }}
        >
          {t("topbar.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const ControlsLTR = (
    <div className="flex items-center gap-3 ">
      <LocaleSwitch />
      {NotifBtn}
      {Divider}
      {UserDropdown}
    </div>
  );

  const ControlsRTL = (
    <div className="flex items-center gap-3">
      {UserDropdown}
      {Divider}
      {NotifBtn}
      <LocaleSwitch />
    </div>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center px-6" dir="ltr">
        {isRTL ? (
          <>
            {ControlsRTL}
            <div className="flex-1" />
            {Brand}
            <div className="ml-2">{MenuBtn}</div>
          </>
        ) : (
          <>
            {MenuBtn}
            <div className="ml-2">{Brand}</div>
            <div className="flex-1" />
            {ControlsLTR}
          </>
        )}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side={isRTL ? "right" : "left"} className="p-0 w-72">
          <SheetHeader className="px-4 py-3">
            <SheetTitle>{t("topbar.menu")}</SheetTitle>
          </SheetHeader>
          <AppSidebar onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </header>
  );
}