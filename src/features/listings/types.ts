export interface ListingsRequest {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  cityId?: number;
  statusId?: number;
  agentId?: number;
}

export interface ApiResponse<T> {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errors: string[];
  data: T;
}
export interface PaginatedData<T> {
  items: T[];
  meta: {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}
export type ListingsResponse = ApiResponse<PaginatedData<ListingItem>>;

// ── Lookup Types ──────────────────────────────────────────────────────────────

export interface RawLookupItem {
  value: number;
  label?: string;
  labelAr?: string;
  labelEn?: string;
  nameAr?: string;
  nameEn?: string;
}

export interface LookupItem {
  value: number;
  label: string;
}

export type ClassificationItem = {
  id: number;
  name: string;
  code?: string;
};

export type regions = {
  value: number;
  label: string;
};

export type LookupsShape<T> = {
  landTypes: T[];
  cities: T[];
  landStatus: T[];
  ownershipStatus: T[];
  deedTypes: T[];
  regions: T[];
  landFacing: T[];
  neighborTypes: T[];
  genders: T[];
  classifications: ClassificationItem[];
};

export type AllLookupsResponse = ApiResponse<LookupsShape<RawLookupItem>>;
export type ListingLookupsResponse = ApiResponse<LookupsShape<LookupItem>>;

// ── Business Entities ─────────────────────────────────────────────────────────

export interface ListingItem {
  id: number;
  title: string;
  address: string;
  city: string;
  region: string;
  area: number;
  landType: string;
  price: number;
  totalPrice: number;
  discountedPrice: number;
  statusId: number;
  statusLabel: string;
  agentName: string;
  offersCount: number;
  isFavorite: boolean;
  thumbnailUrl: string;
  pendingRequestsCount: number;
  classificationId: number;
  classificationName: string;
  discountPercent: number;
}



export interface ListingDetail {
  id: number;
  userId: number;
  agentId: number;
  title: string;
  description: string;
  area: number;
  price: number;
  discountedPrice: number;
  discountPercent: number;

  cityId: number;
  cityName: string;
  regionId: number;
  regionName: string;
  address: string;
  latitude?: number;
  longitude?: number;
  googleMapsLink?: string;

  landTypeId: number;
  landTypeName: string;
  landFacingId: number;
  landFacingName: string;
  ownershipStatusId: number;
  ownershipStatusName: string;
  deedTypeId: number;
  deedTypeName: string;
  neighborTypeId: number;
  neighborTypeName: string;
  features: string[];

  imageUrls: string[];
  explanatoryVideoUrl?: string;

  titleDeedUrl: string;
  nationalIdCopyUrl: string;
  landSurveyReportUrl: string;

  agentName: string;
  classificationId: number;
  classificationName: string;

  statusId: number;
  statusName: string;
  isVerified: boolean;
  isFavorite: boolean;
  publishDate: string | null;

  viewCount: number;
  offerCount: number;
  pendingRequestsCount: number;

  createdAt: string;
  updatedAt: string | null;
}


export interface ListingDocument {
  id: number | string;
  label: string;
  url?: string;
  isAvailable?: boolean;
  name?:string
}

export interface ApproveLandRequest {
  landId: string;
  note: string;
}

export interface RejectLandRequest {
  landId: string;
  rejectionReason: string;
}

export type PriceChangeRequestBody = {
  landId: number;
  newPrice: number;
  reason?: string;
};

export interface Offer {
  id: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  message: string;
  offerAmount: number;
  submittedAt: string;
}

export interface OffersResponse {
  items: Offer[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

// FIX: Was defined twice — removed the duplicate.
export interface PriceChangeRequest {
  requestId: number;
  landId: number;
  landTitle: string;
  city: string;
  region: string;
  area: number;
  classification: string;
  currentPrice: number;
  suggestedPrice: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected" | "Cancelled";
  requestedAt: string;
}

export interface PriceChangeResponse {
  value: PriceChangeRequest[];
}

export interface PriceChangeRequestDetails {
  id: number;
  landId: number;
  landTitle: string;
  city: string;
  area: number;
  propertyType: string;
  requestedOn: string;
  requestStatus: "Pending" | "Approved" | "Rejected" | "Cancelled";
  requestedByName: string;
  currentPrice: number;
  suggestedPrice: number;
  reductionValue: number;
  reductionPercentage: number;
  reason: string;
  canCancel: boolean;
}