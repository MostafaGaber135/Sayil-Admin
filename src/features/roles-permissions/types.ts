export type ApiResponse<T> = {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errors: string[] | null;
  data: T;
};
export type Permission = {
  id: string;
  label: string;
  group: string;
  claimId?: number;
};

export type Role = {
  id: string;
  name: string;
  description: string;
  usersCount: number;
  isActive: boolean;
  permissionIds: string[];
  claimIds?: number[];
};

export type RolesPaginatedBody = {
  searchTerm: string;
  sortColumn: string;
  sortOrder: "asc" | "desc";
  pageNumber: number;
  pageSize: number;
};

export type AddRoleBody = {
  roleName: string;
  description: string;
  claimIds: number[];
  isActive: boolean;
};

export type UpdateRoleBody = {
  roleId: number;
  roleName: string;
  description: string;
  claimIds: number[];
  isActive: boolean;
};

export function groupPermissions(
  perms: Permission[]
): Record<string, Permission[]> {
  return perms.reduce<Record<string, Permission[]>>((acc, p) => {
    acc[p.group] = acc[p.group] ? [...acc[p.group], p] : [p];
    return acc;
  }, {});
}