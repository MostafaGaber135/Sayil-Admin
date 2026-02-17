export function hasPermission(userPermissions: string[] | undefined, required?: string) {
    if (!required) return true;
    if (!userPermissions) return false;
    return userPermissions.includes(required);
}
