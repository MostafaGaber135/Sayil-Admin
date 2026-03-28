export type ApiResponse<T> = {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errors: string[] | null;
  data: T;
};

export type DashboardKpiKey =
  | "totalListings"
  | "pendingApprovals"
  | "totalUsers"
  | "propertiesSold"
  | "totalCommissions";

export type NormalizedKpi = {
  key: DashboardKpiKey;
  title: string;
  value: number;
  changePct?: number;
  periodLabel: string;
};

export type LocationSeriesItem = {
  label: string;
  value: number;
};

export type StatusSeriesItem = {
  label: any;
  status: string;
  value: number;
};
