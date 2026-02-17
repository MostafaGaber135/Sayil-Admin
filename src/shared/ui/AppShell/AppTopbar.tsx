"use client";

import { useState } from "react";
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
import { usePathname } from "next/navigation";

export default function AppTopbar() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const locale = useLocale();
  const pathname = usePathname();
  const firstSeg = pathname?.split("/")[1]?.toLowerCase();
  const isRTL = firstSeg?.startsWith("ar") || locale?.toLowerCase().startsWith("ar");

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
      <Bell className="h-5 w-5" />
      <span
        className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full text-[11px] font-semibold text-white"
        style={{ backgroundColor: "#ef4444" }}
      >
        2
      </span>
    </Button>
  );

  const Divider = (
    <div className="h-6 w-px bg-border/60" />
  );

  const UserDropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 gap-2 rounded-full px-2 cursor-pointer">
          {isRTL ? (
            <>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
              <span className="hidden sm:inline text-sm font-medium">وكيل</span>
              <span
                className="grid h-9 w-9 place-items-center rounded-full text-white"
                style={{ backgroundColor: "#3c71ff" }}
              >
                <User className="h-5 w-5" />
              </span>
            </>
          ) : (
            <>
              <span
                className="grid h-9 w-9 place-items-center rounded-full text-white"
                style={{ backgroundColor: "#3c71ff" }}
              >
                <User className="h-5 w-5" />
              </span>
              <span className="hidden sm:inline text-sm font-medium">Administrator</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-44 ">
        <DropdownMenuItem className="cursor-pointer">{t("topbar.profile")}</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive cursor-pointer">{t("topbar.logout")}</DropdownMenuItem>
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
