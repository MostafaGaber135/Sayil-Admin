import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/lib/utils";
import { Pencil, Shield, Trash2, Users } from "lucide-react";
import type { Permission, Role } from "../types";

function permissionPillClass(permissionId: string) {
  const isView = permissionId.endsWith(".view");
  return isView
    ? "bg-blue-50 text-blue-700 border-blue-100"
    : "bg-amber-50 text-amber-800 border-amber-100";
}

export default function RoleCard({
  role,
  permissions,
  onEdit,
  onDelete,
}: {
  role: Role;
  permissions: Permission[];
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}) {
  const displayed = role.permissionIds.slice(0, 3);
  const remaining = Math.max(0, role.permissionIds.length - displayed.length);

  const idToPermission = new Map(permissions.map((p) => [p.id, p] as const));

  return (
    <Card className="pt-0 gap-0 h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="size-12 shrink-0 rounded-xl bg-blue-600 flex items-center justify-center">
              <Shield className="size-6 text-white" />
            </div>

            <div>
              <div className="text-base font-semibold text-foreground">{role.name}</div>
              <div className="mt-1 text-sm text-muted-foreground">{role.description}</div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={() => onEdit(role)}
              aria-label="Edit role"
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-destructive cursor-pointer"
              onClick={() => onDelete(role)}
              aria-label="Delete role"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="size-4" />
            <span>
              <span className="text-foreground font-medium">{role.usersCount}</span> Users
            </span>
          </div>

          {role.isActive ? (
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Active</Badge>
          ) : (
            <Badge variant="secondary">Inactive</Badge>
          )}
        </div>

        <div className="mt-4">
          <div className="text-sm font-semibold">Permissions</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {displayed.map((id) => {
              const p = idToPermission.get(id);
              if (!p) return null;
              return (
                <span
                  key={id}
                  className={cn(
                    "inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium",
                    permissionPillClass(id)
                  )}
                >
                  {p.label}
                </span>
              );
            })}

            {remaining > 0 ? (
              <span className="inline-flex items-center rounded-md border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                +{remaining} more
              </span>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
