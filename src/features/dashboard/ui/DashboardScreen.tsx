"use client";

import { useLocale, useTranslations } from "next-intl";
import StatsCards from "@/features/dashboard/ui/StatsCards";
import ListingsByLocationChart from "@/features/dashboard/ui/ListingsByLocationChart";
import StatusDistributionChart from "@/features/dashboard/ui/StatusDistributionChart";
import CommissionByLocationChart from "@/features/dashboard/ui/CommissionByLocationChart";
import {
  useCommissionByLocation,
  useDashboardKpis,
  useListingsByLocation,
  useStatusDistribution,
} from "@/features/dashboard/hooks/dashboard.hooks";
import { cn } from "@/shared/lib/utils";

export default function DashboardScreen() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale?.toLowerCase().startsWith("ar");

  const kpis = useDashboardKpis();
  const listingsByLocation = useListingsByLocation();
  const statusDist = useStatusDistribution();
  const commissionByLocation = useCommissionByLocation();

  return (
    <div className={cn("space-y-4", isRTL ? "text-right" : "text-left")}>
      <div className="px-1">
        <div className="text-2xl font-semibold tracking-tight">{t("pages.dashboard.title")}</div>
        <div className="mt-1 text-sm text-muted-foreground">{t("pages.dashboard.desc")}</div>
      </div>

      <StatsCards items={kpis.data ?? []} isLoading={kpis.isLoading} />

      <div className="grid gap-4 lg:grid-cols-2">
        <ListingsByLocationChart
          title="Listings by Location"
          data={listingsByLocation.data ?? []}
          isLoading={listingsByLocation.isLoading}
        />

        <StatusDistributionChart
          title="Listing Status Distribution"
          data={statusDist.data ?? []}
          isLoading={statusDist.isLoading}
        />
      </div>

      <CommissionByLocationChart
        title="Commission Earned by Location"
        data={commissionByLocation.data ?? []}
        isLoading={commissionByLocation.isLoading}
      />
    </div>
  );
}
