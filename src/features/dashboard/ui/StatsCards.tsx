"use client";

import {
  Building2,
  Clock3,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import type { DashboardKpiKey, NormalizedKpi, StatCardProps } from "../types";

type Props = {
  items: NormalizedKpi[];
  isLoading?: boolean;
  isError?: boolean;
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function buildChangeText(changePct?: number) {
  if (typeof changePct !== "number" || !Number.isFinite(changePct)) return "—";
  const sign = changePct > 0 ? "+" : "";
  return `${sign}${Math.round(changePct)}%`;
}

function getChangeClassName(changePct?: number) {
  if (typeof changePct !== "number" || !Number.isFinite(changePct))
    return "text-slate-400";
  return changePct >= 0 ? "text-emerald-600" : "text-red-500";
}

function getKpiConfig(key: DashboardKpiKey) {
  switch (key) {
    case "totalListings":
      return {
        iconBgClassName: "bg-blue-600",
        icon: <Building2 className="w-7 h-7" />,
      };
    case "pendingApprovals":
      return {
        iconBgClassName: "bg-orange-400",
        icon: <Clock3 className="w-7 h-7" />,
      };
    case "totalUsers":
      return {
        iconBgClassName: "bg-cyan-500",
        icon: <Users className="w-7 h-7" />,
      };
    case "propertiesSold":
      return {
        iconBgClassName: "bg-emerald-500",
        icon: <TrendingUp className="w-7 h-7" />,
      };
    case "totalCommissions":
      return {
        iconBgClassName: "bg-indigo-400",
        icon: <DollarSign className="w-7 h-7" />,
      };
    default:
      return {
        iconBgClassName: "bg-blue-600",
        icon: <Building2 className="w-7 h-7" />,
      };
  }
}

function StatCard({
  title,
  value,
  changeText,
  subText,
  icon,
  iconBgClassName,
  changeClassName,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center justify-between">
      <div>
        <p className="text-slate-600 text-base font-medium">{title}</p>

        <div className="mt-2 text-4xl font-bold text-slate-900 leading-none">
          {value}
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm">
          <span
            className={`${changeClassName ?? "text-emerald-600"} font-semibold`}
          >
            {changeText}
          </span>
          <span className="text-slate-500">{subText}</span>
        </div>
      </div>

      <div
        className={`w-14 h-14 rounded-xl ${
          iconBgClassName ?? "bg-blue-600"
        } flex items-center justify-center text-white`}
      >
        {icon ?? <Building2 className="w-7 h-7" />}
      </div>
    </div>
  );
}

export default function StatsCards({ items, isLoading, isError }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-[132px] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError || !items?.length) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-slate-600">
          Failed to load dashboard KPIs.
        </div>
      </div>
    );
  }

  const cards: StatCardProps[] = items.map((kpi) => {
    const cfg = getKpiConfig(kpi.key);
    const displayValue =
      kpi.key === "totalCommissions"
        ? `${formatCompact(kpi.value)} SAR`
        : formatNumber(kpi.value);

    return {
      title: kpi.title,
      value: displayValue,
      changeText: buildChangeText(kpi.changePct),
      subText: kpi.periodLabel,
      icon: cfg.icon,
      iconBgClassName: cfg.iconBgClassName,
      changeClassName: getChangeClassName(kpi.changePct),
    };
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
      {cards.map((c) => (
        <StatCard
          key={c.title}
          title={c.title}
          value={c.value}
          changeText={c.changeText}
          subText={c.subText}
          icon={c.icon}
          iconBgClassName={c.iconBgClassName}
          changeClassName={c.changeClassName}
        />
      ))}
    </div>
  );
}