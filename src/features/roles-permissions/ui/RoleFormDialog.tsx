"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Shield, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Permission, Role } from "../types";
import { groupPermissions } from "../types";
import PermissionsPicker from "./PermissionsPicker";

type FormState = {
  name: string;
  description: string;
  permissionIds: string[];
};

export default function RoleFormDialog({
  open,
  mode,
  role,
  permissions,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  mode: "create" | "edit";
  role?: Role | null;
  permissions: Permission[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: { name: string; description: string; permissionIds: string[] }) => void;
}) {
  const grouped = useMemo(() => groupPermissions(permissions), [permissions]);

  const [state, setState] = useState<FormState>({
    name: "",
    description: "",
    permissionIds: [],
  });
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTouched(false);
    if (mode === "edit" && role) {
      setState({
        name: role.name,
        description: role.description,
        permissionIds: role.permissionIds,
      });
    } else {
      setState({ name: "", description: "", permissionIds: [] });
    }
  }, [open, mode, role]);

  const nameError = touched && state.name.trim().length === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] p-0 gap-0 border sm:max-w-3xl",
          "**:data-[slot=dialog-close]:hidden"
        )}
      >
        <DialogHeader className="px-4 py-4 border-b sm:px-6 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <Shield className="size-5 text-white" />
              </div>
              <DialogTitle className="text-lg font-semibold">
                {mode === "edit" ? "Edit Role" : "Add New Role"}
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground cursor-pointer"
              onClick={() => onOpenChange(false)}
              aria-label="Close"
            >
              <X className="size-4" />
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="px-4 py-5 sm:px-6 sm:py-6">
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium">Role Name *</label>
                <Input
                  value={state.name}
                  onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
                  placeholder="Enter role name"
                  className={cn(
                    "mt-2",
                    "border-slate-200 focus-visible:ring-blue-600/20 focus-visible:ring-offset-0",
                    "focus-visible:border-blue-600",
                    nameError ? "border-destructive focus-visible:border-destructive" : ""
                  )}
                />
                {nameError ? (
                  <div className="mt-1 text-xs text-destructive">Role name is required</div>
                ) : null}
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={state.description}
                  onChange={(e) => setState((s) => ({ ...s, description: e.target.value }))}
                  placeholder="Enter role description"
                  className={cn(
                    "mt-2 w-full min-h-[110px] rounded-md border border-input bg-background px-3 py-2 text-sm",
                    "border-slate-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/20",
                    "focus-visible:border-blue-600"
                  )}
                />
              </div>
            </div>

            <div className="mt-8">
              <div className="text-base font-semibold">Permissions</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Select the permissions for this role
              </div>

              <div className="mt-4">
                <PermissionsPicker
                  permissions={permissions}
                  grouped={grouped}
                  selectedIds={state.permissionIds}
                  onChange={(next) => setState((s) => ({ ...s, permissionIds: next }))}
                />
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="px-4 py-4 border-t flex flex-col gap-3 bg-muted/20 sm:px-6 sm:flex-row sm:items-center sm:justify-end">
          <Button
            variant="secondary"
            className={cn(
              "h-11 w-full rounded-xl px-6 sm:w-auto",
              "bg-[#e5e7eb] text-foreground hover:bg-[#e5e7eb]/80 cursor-pointer",
            )}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="h-11 w-full rounded-xl bg-blue-600 px-6 hover:bg-blue-700 cursor-pointer sm:w-auto"
            onClick={() => {
              setTouched(true);
              if (state.name.trim().length === 0) return;
              onSubmit({
                name: state.name.trim(),
                description: state.description.trim(),
                permissionIds: state.permissionIds,
              });
              onOpenChange(false);
            }}
          >
            Save Role
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
