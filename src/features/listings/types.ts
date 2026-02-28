
//Generic API Wrappers


export interface ListingsRequest {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
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
  classifications: T[];
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
  title: string;
  description: string;
  area: number;
  price: number;
  discountedPrice: number;
  discountPercent: number;

  // Property Details
  landType: string;
  facingDirection: string;
  ownershipType: string;
  deedType: string;
  neighborType: string;
  features: string[];

  // Location
  city: string;
  region: string;
  street: string;
  latitude?: number;
  longitude?: number;

  // Documents
  documents: ListingDocument[];

  // Media
  images: string[];

  // Admin
  ownerName: string;
  agentName: string;
  classificationName: string;

  // Status
  statusId: number;
  statusLabel: string;
}

export interface ListingDocument {
  id: number;
  name: string;
  isAvailable: boolean;
  url?: string;
}

export interface ApproveLandRequest {
  landId: string;
  note: string;
}

export interface RejectLandRequest {
  landId: string;
  rejectionReason: string;
}