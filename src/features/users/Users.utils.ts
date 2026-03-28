import { ApiUser, ManagedUser, UserRoleName, UserSegment, UserStatus, UserType } from ".";


export function segmentToUserType(segment: "internal" | "external"): UserType {
  return segment === "internal" ? UserType.Internal : UserType.External;
}

export function mapApiUserToManaged(user: ApiUser, segment: UserSegment): ManagedUser {

  const primaryRoleName = user.rolesNames?.[0] as UserRoleName | undefined;

  return {
    id: user.id,
    type: segment,
    name: user.fullName,
    email: user.email,
    phone: user.phoneNumber ?? undefined,
    role: primaryRoleName ?? "User",
    status: user.isActive ? "active" : ("inactive" as UserStatus),
    lastActive:
      user.joinedDate && !user.joinedDate.startsWith("0001")
        ? new Date(user.joinedDate).toLocaleDateString("en-GB") 
        : "—",
    nationalId: user.nationalId ?? undefined,
    roles: user.roles ?? [],
    roleNames: user.rolesNames ?? [],
    dateOfBirth: user.dateOfBirth ?? undefined,
    genderId: user.genderId ?? undefined,
  };
}

export function handleAxiosError(error: unknown): never {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: { data?: unknown } }).response?.data === "object"
  ) {
    const data = (error as { response: { data: { message?: string } } }).response.data;
    throw new Error(data?.message ?? "Request failed");
  }
  throw new Error("Unexpected error occurred");
}