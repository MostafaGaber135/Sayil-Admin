"use client";

import { Card } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import {
  Building2,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import type { NormalizedKpi } from "@/features/dashboard/types";

function formatInt(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatCompact(value: number) {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return formatInt(value);
}

function formatCommissionSar(value: number) {
  return `${formatCompact(value)} SAR`;
}

const ICONS = {
  totalListings: {
    Icon: Building2,
    bg: "var(--primary)",
  },
  pendingApprovals: {
    Icon: Clock,
    bg: "var(--brand-orange)",
  },
  totalUsers: {
    Icon: Users,
    bg: "var(--brand-cyan)",
  },
  propertiesSold: {
    Icon: TrendingUp,
    bg: "var(--brand-green)",
  },
  totalCommissions: {
    Icon: DollarSign,
    bg: "var(--brand-soft-blue)",
  },
} as const;

export default function StatsCards({
  items,
  isLoading,
}: {
  items: NormalizedKpi[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="p-5">
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-28 rounded bg-muted" />
              <div className="h-8 w-24 rounded bg-muted" />
              <div className="h-4 w-32 rounded bg-muted" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((kpi) => {
        const meta = ICONS[kpi.key];
        const Change = typeof kpi.changePct === "number" ? kpi.changePct : null;
        const isPositive = Change !== null ? Change >= 0 : null;
        const valueText =
          kpi.key === "totalCommissions" ? formatCommissionSar(kpi.value) : formatInt(kpi.value);

        return (
          <Card key={kpi.key} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-sm font-medium text-muted-foreground">{kpi.title}</div>
                <div className="mt-2 text-3xl font-semibold tracking-tight">{valueText}</div>

                <div className="mt-2 flex items-center gap-2 text-sm">
                  {Change !== null ? (
                    <span
                      className={cn(
                        "font-semibold",
                        isPositive
                          ? "text-[var(--brand-green)]"
                          : "text-[var(--brand-red)]"
                      )}
                    >
                      {isPositive ? "+" : ""}
                      {Math.round(Change)}%
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}

                  <span className="text-muted-foreground">{kpi.periodLabel ?? "from last month"}</span>
                </div>
              </div>

              <div
                className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white mt-8"
                style={{ backgroundColor: meta.bg }}
              >
                <meta.Icon className="h-6 w-6" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
