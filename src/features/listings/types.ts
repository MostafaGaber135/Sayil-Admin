
//Generic API Wrappers


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
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
}


//Lookup Types
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
}
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
  fications: ClassificationItem[];
};

export type AllLookupsResponse = ApiResponse<
    LookupsShape<RawLookupItem>
>;

export type ListingLookupsResponse = ApiResponse<
    LookupsShape<LookupItem>
>;


// Business Entity


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

export type ListingsResponse =
    ApiResponse<PaginatedData<ListingItem>>;


// Requests
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

  // Location
  cityId: number;
  cityName: string;
  regionId: number;
  regionName: string;
  address: string;
  latitude?: number;
  longitude?: number;
  googleMapsLink?: string;

  // Property Details
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

  // Media
  imageUrls: string[];
  explanatoryVideoUrl?: string;

  // Documents
  titleDeedUrl: string;
  nationalIdCopyUrl: string;
  landSurveyReportUrl: string;

  // Admin
  agentName: string;
  classificationId: number;
  classificationName: string;

  // Status
  statusId: number;
  statusName: string;
  isVerified: boolean;
  isFavorite: boolean;
  publishDate: string | null;

  // Stats
  viewCount: number;
  offerCount: number;
  pendingRequestsCount: number;

  // Timestamps
  createdAt: string;
  updatedAt: string | null;
}
export interface ListingDocument {
  id: number | string;
  name?: string;    
  label: string;      
  url?: string;
  isAvailable?: boolean; 
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

export type PriceChangeRequest = {
  id: number;
  landId: number;
  newPrice: number;
  reason?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};