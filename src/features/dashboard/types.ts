export type ApiResponse<T> = {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errors: string[] | null;
  data: T;
};

export type KpiKey =
  | "totalListings"
  | "pendingApprovals"
  | "totalUsers"
  | "propertiesSold"
  | "totalCommissions";

export type NormalizedKpi = {
  key: KpiKey;
  title: string;
  value: number;
  changePct?: number;
  periodLabel?: string;
};

export type LocationSeriesItem = {
  label: string;
  value: number;
};

export type StatusKey = "Pending" | "Active" | "Sold" | "Rejected" | string;

export type StatusSeriesItem = {
  status: StatusKey;
  value: number;
};
