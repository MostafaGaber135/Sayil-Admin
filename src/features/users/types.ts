// ─── UI Types ─────────────────────────────────────────────────────────────────

export type UserSegment = "internal" | "external";
export type UserStatus = "active" | "inactive";
export type UserFormMode = "add" | "edit";

export type UserRoleName =
  | "Administrator"
  | "Agent"
  | "Landowner"
  | "Investor"
  | "User"
  | (string & {}); // allow any dynamic role name from API

export type ManagedUser = {
  id: number;
  type: UserSegment;
  name: string;
  email: string;
  role: string;         // primary role (first in list)
  roleNames: string[];  // all roles from API rolesNames[]
  status: UserStatus;
  lastActive: string;
  phone?: string;
  department?: string;
  location?: string;
  nationalId?: string;
  roles?: number[];     // role IDs
  dateOfBirth?: string;
  genderId?: number;
};

export type UsersScreenLabels = {
  addUser: string;
  internalUsers: string;
  externalUsers: string;
  searchPlaceholder: string;
  table: {
    name: string;
    email: string;
    role: string;
    status: string;
    lastActive: string;
    actions: string;
  };
  status: {
    active: string;
    inactive: string;
    deactivate: string;
    activate: string;
  };
  form: {
    addTitle: string;
    editTitle: string;
    personalInformation: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
    department: string;
    location: string;
    nationalId: string;
    dateOfBirth: string;
    initialPassword: string;
    passwordHint: string;
    placeholders: {
      fullName: string;
      email: string;
      phone: string;
      department: string;
      location: string;
      password: string;
      nationalId: string;
      // dateOfBirth: string;
    };
    cancel: string;
    save: string;
  };
  deleteDialog: {
    title: string;
    description: string;
    cancel: string;
    confirm: string;
  };
  deactivateDialog: {
    deactivateTitle: string;
    deactivateDescription: string;
    activateTitle: string;
    activateDescription: string;
    cancel: string;
    confirmDeactivate: string;
    confirmActivate: string;
  };
};

// ─── API Enums ────────────────────────────────────────────────────────────────

export enum UserType {
  Internal = 2,
  External = 1,
}

export enum UserRoleId {
  User = 1,
  Agent = 2,
  Administrator = 3,
}

// ─── Role Mapping Helpers ─────────────────────────────────────────────────────

export const ROLE_NAME_TO_ID: Record<string, number> = {
  User: UserRoleId.User,
  Agent: UserRoleId.Agent,
  Administrator: UserRoleId.Administrator,
  Landowner: UserRoleId.User,
  Investor: UserRoleId.User,
};

// ─── API Generic Response ─────────────────────────────────────────────────────

export type ApiResponse<T> = {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errors: string[] | null;
  data: T;
};

export type PaginatedMeta = {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export type PaginatedResult<T> = {
  items: T[];
  meta: PaginatedMeta;
};

// ─── User DTOs (API Shape) ────────────────────────────────────────────────────

export type ApiUser = {
  id: number;
  email: string;
  fullName: string;
  phoneNumber: string | null;
  nationalId: string | null;
  dateOfBirth: string | null;
  genderId: number | null;
  rolesNames: string[] | null;
  roles: number[] | null;
  joinedDate: string;
  isActive: boolean;
};

export type GetUsersPaginatedResponse = ApiResponse<PaginatedResult<ApiUser>>;

// ─── Request Params ───────────────────────────────────────────────────────────

export type GetUsersPaginatedParams = {
  userType: UserType;
  searchTerm?: string;
  pageNumber?: number;
  pageSize?: number;
};

// ─── Mutation Payloads ────────────────────────────────────────────────────────

export type AddAdminPayload = {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  nationalId: string;
  roles: number[];
};

export type AddExternalPayload = {
  phoneNumber: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  genderId: number;
  nationalId: string;
  password: string;
};

export type UpdateAdminPayload = {
  id: number;
  email: string;
  name: string;
  phone: string;
  nationalId: string;
  roles: number[];
  resetPassword: boolean;
  password: string;
};

export type UpdateExternalPayload = {
  id: number;
  phoneNumber: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  genderId: number;
  nationalId: string;
  password: string;
};