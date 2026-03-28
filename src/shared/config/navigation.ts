import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Building2 , Users, Shield , Settings } from "lucide-react";

export type NavItem = {
  key: string;
  href: string;
  icon: LucideIcon;
  labelKey?: string;
  label?: string;
};

export const NAV_ITEMS: NavItem[] = [
  { key: "dashboard", labelKey: "nav.dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "listings", labelKey: "nav.listings", href: "/listings", icon: Building2 },
  { key: "users", labelKey: "nav.users", href: "/users", icon: Users },
  { key: "roles", labelKey: "nav.rolesPermissions", href: "/roles-permissions", icon: Shield },
  { key: "settings", labelKey: "nav.settings", href: "/settings", icon: Settings }
];
