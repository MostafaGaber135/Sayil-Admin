"use client";

import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Separator } from "@/shared/components/ui/separator";
import NavItem from "./NavItem";
import { NAV_ITEMS } from "@/shared/config/navigation";
import { useTranslations } from "next-intl";

export default function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const t = useTranslations();

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="px-6 py-5 md:hidden">
        <div className="text-[28px] font-semibold leading-none tracking-tight">
          {t("app.name")}
        </div>
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <nav className="grid gap-2 px-4 py-4">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.key} item={item} onNavigate={onNavigate} />
          ))}
        </nav>
      </ScrollArea>
      <Separator />
      <div className="px-6 py-4 text-center text-sm text-muted-foreground">
        © 2025 {t("app.name")} Platform
      </div>
    </div>
  );
}
