"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/lib/react-query/queryKeys";
import {
  fetchCommissionByLocation,
  fetchDashboardKpis,
  fetchListingsByLocation,
  fetchStatusDistribution,
} from "@/features/dashboard/services/dashboard.services";
import type {
  LocationSeriesItem,
  NormalizedKpi,
  StatusSeriesItem,
} from "@/features/dashboard/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value.replace(/,/g, "").trim());
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

function pickNumber(obj: Record<string, unknown>, keys: string[]): number | undefined {
  for (const k of keys) {
    if (!(k in obj)) continue;
    const n = toNumber(obj[k]);
    if (typeof n === "number") return n;
  }
  return undefined;
}

function normalizeChangePct(raw: unknown): number | undefined {
  const n = toNumber(raw);
  if (typeof n !== "number") return undefined;
  if (Math.abs(n) <= 1 && Math.abs(n) > 0) return n * 100;
  return n;
}

export function normalizeKpis(payload: unknown): NormalizedKpi[] {
  const obj: Record<string, unknown> | null = isRecord(payload)
    ? (payload as Record<string, unknown>)
    : null;
  const looksLikeBackendKpis =
    obj &&
    ["totalListings", "pendingApprovals", "totalUsers", "propertiesSold", "totalCommissions"].some(
      (k) => isRecord(obj[k]) && (obj[k] as any).value !== undefined
    );

  if (looksLikeBackendKpis && obj) {
    const read = (key: NormalizedKpi["key"], title: string) => {
      const raw = obj[key];
      const rec = isRecord(raw) ? (raw as Record<string, unknown>) : null;
      const value = rec ? toNumber(rec.value) ?? 0 : 0;
      const mom = rec ? normalizeChangePct(rec.monthOverMonthPercent) : undefined;
      const isUp = rec ? (rec.isUp as unknown) : undefined;
      const signedPct =
        typeof mom === "number"
          ? typeof isUp === "boolean"
            ? isUp
              ? Math.abs(mom)
              : -Math.abs(mom)
            : mom
          : undefined;

      return {
        key,
        title,
        value,
        changePct: signedPct,
        periodLabel: "from last month",
      } satisfies NormalizedKpi;
    };

    return [
      read("totalListings", "Total Listings"),
      read("pendingApprovals", "Pending Approvals"),
      read("totalUsers", "Total Users"),
      read("propertiesSold", "Properties Sold"),
      read("totalCommissions", "Total Commissions"),
    ];
  }

  const kpi = (
    key: NormalizedKpi["key"],
    title: string,
    valueKeys: string[],
    changeKeys: string[]
  ) => {
    const value = obj ? pickNumber(obj, valueKeys) : undefined;
    const changePct = obj
      ? normalizeChangePct(pickNumber(obj, changeKeys) ?? obj[changeKeys[0] ?? ""])
      : undefined;

    return {
      key,
      title,
      value: value ?? 0,
      changePct,
      periodLabel: "from last month",
    } satisfies NormalizedKpi;
  };

  if (Array.isArray(payload)) {
    const arr = payload
      .map((it) => {
        if (!isRecord(it)) return null;
        const key = String(it.key ?? it.name ?? "");
        const value = toNumber(it.value ?? it.count ?? it.amount) ?? 0;
        const changePct = normalizeChangePct(it.changePct ?? it.change ?? it.delta);
        return { key, value, changePct, title: String(it.title ?? it.label ?? key) };
      })
      .filter(Boolean) as Array<{ key: string; value: number; changePct?: number; title: string }>;

    const map = new Map(arr.map((x) => [x.key, x]));
    return [
      {
        key: "totalListings",
        title: map.get("totalListings")?.title ?? "Total Listings",
        value: map.get("totalListings")?.value ?? 0,
        changePct: map.get("totalListings")?.changePct,
        periodLabel: "from last month",
      },
      {
        key: "pendingApprovals",
        title: map.get("pendingApprovals")?.title ?? "Pending Approvals",
        value: map.get("pendingApprovals")?.value ?? 0,
        changePct: map.get("pendingApprovals")?.changePct,
        periodLabel: "from last month",
      },
      {
        key: "totalUsers",
        title: map.get("totalUsers")?.title ?? "Total Users",
        value: map.get("totalUsers")?.value ?? 0,
        changePct: map.get("totalUsers")?.changePct,
        periodLabel: "from last month",
      },
      {
        key: "propertiesSold",
        title: map.get("propertiesSold")?.title ?? "Properties Sold",
        value: map.get("propertiesSold")?.value ?? 0,
        changePct: map.get("propertiesSold")?.changePct,
        periodLabel: "from last month",
      },
      {
        key: "totalCommissions",
        title: map.get("totalCommissions")?.title ?? "Total Commissions",
        value: map.get("totalCommissions")?.value ?? 0,
        changePct: map.get("totalCommissions")?.changePct,
        periodLabel: "from last month",
      },
    ];
  }

  return [
    kpi(
      "totalListings",
      "Total Listings",
      ["totalListings", "listings", "total_listings", "totalListingCount"],
      [
        "totalListingsChangePct",
        "totalListingsChangePercentage",
        "totalListingsChange",
        "listingsChangePct",
        "listingsChange",
      ]
    ),
    kpi(
      "pendingApprovals",
      "Pending Approvals",
      ["pendingApprovals", "pending", "pending_approvals", "pendingApprovalCount"],
      ["pendingApprovalsChangePct", "pendingApprovalsChange", "pendingChangePct", "pendingChange"]
    ),
    kpi(
      "totalUsers",
      "Total Users",
      ["totalUsers", "users", "total_users", "userCount"],
      ["totalUsersChangePct", "totalUsersChange", "usersChangePct", "usersChange"]
    ),
    kpi(
      "propertiesSold",
      "Properties Sold",
      ["propertiesSold", "sold", "properties_sold", "soldCount"],
      ["propertiesSoldChangePct", "propertiesSoldChange", "soldChangePct", "soldChange"]
    ),
    kpi(
      "totalCommissions",
      "Total Commissions",
      ["totalCommissions", "commissions", "total_commissions", "commissionTotal"],
      ["totalCommissionsChangePct", "totalCommissionsChange", "commissionsChangePct", "commissionsChange"]
    ),
  ];
}

export function normalizeLocationSeries(payload: unknown): LocationSeriesItem[] {
  if (isRecord(payload)) {
    const rec = payload as Record<string, unknown>;
    const items = (rec.value as unknown[]) ?? (rec.items as unknown[]) ?? (rec.data as unknown[]);
    if (Array.isArray(items)) payload = items;
  }

  if (isRecord(payload) && !Array.isArray(payload)) {
    const rec = payload as Record<string, unknown>;
    const pairs: LocationSeriesItem[] = Object.entries(rec)
      .map(([label, v]) => {
        const n = toNumber(v);
        if (!label || typeof n !== "number") return null;
        return { label, value: n } as LocationSeriesItem;
      })
      .filter(Boolean) as LocationSeriesItem[];
    if (pairs.length) return pairs;
  }

  const list: unknown[] = Array.isArray(payload) ? payload : [];

  return list
    .map((row) => {
      if (!isRecord(row)) return null;
      const label = String(
        row.cityName ?? row.location ?? row.city ?? row.name ?? row.label ?? ""
      ).trim();
      const value =
        toNumber(row.count ?? row.totalCommission ?? row.value ?? row.total ?? row.amount) ?? 0;
      if (!label) return null;
      return { label, value } satisfies LocationSeriesItem;
    })
    .filter(Boolean) as LocationSeriesItem[];
}

export function normalizeStatusSeries(payload: unknown): StatusSeriesItem[] {
  if (isRecord(payload)) {
    const rec = payload as Record<string, unknown>;
    const items = (rec.value as unknown[]) ?? (rec.items as unknown[]) ?? (rec.data as unknown[]);
    if (Array.isArray(items)) payload = items;
  }

  if (isRecord(payload) && !Array.isArray(payload)) {
    const rec = payload as Record<string, unknown>;
    const pairs: StatusSeriesItem[] = Object.entries(rec)
      .map(([status, v]) => {
        const n = toNumber(v);
        if (!status || typeof n !== "number") return null;
        return { status, value: n } as StatusSeriesItem;
      })
      .filter(Boolean) as StatusSeriesItem[];
    if (pairs.length) return pairs;
  }

  const list: unknown[] = Array.isArray(payload) ? payload : [];

  return list
    .map((row) => {
      if (!isRecord(row)) return null;
      const status = String(
        row.statusName ?? row.status ?? row.key ?? row.name ?? row.label ?? ""
      ).trim();
      const value = toNumber(row.count ?? row.value ?? row.total) ?? 0;
      if (!status) return null;
      return { status, value, label: undefined } satisfies StatusSeriesItem;
    })
    .filter(Boolean) as StatusSeriesItem[];
}

export function useDashboardKpis() {
  return useQuery({
    queryKey: [...queryKeys.dashboard, "kpis"],
    queryFn: async () => {
      const res = await fetchDashboardKpis();
      const payload = (res as any)?.data ?? res;
      return normalizeKpis(payload);
    },
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
  });
}

export function useListingsByLocation() {
  return useQuery({
    queryKey: [...queryKeys.dashboard, "listings-by-location"],
    queryFn: async () => {
      const res = await fetchListingsByLocation();
      const payload = (res as any)?.data ?? res;
      return normalizeLocationSeries(payload);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });
}

export function useStatusDistribution() {
  return useQuery({
    queryKey: [...queryKeys.dashboard, "status-distribution"],
    queryFn: async () => {
      const res = await fetchStatusDistribution();
      const payload = (res as any)?.data ?? res;
      return normalizeStatusSeries(payload);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });
}

export function useCommissionByLocation() {
  return useQuery({
    queryKey: [...queryKeys.dashboard, "commission-by-location"],
    queryFn: async () => {
      const res = await fetchCommissionByLocation();
      const payload = (res as any)?.data ?? res;
      return normalizeLocationSeries(payload);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });
}