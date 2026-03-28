"use client";

import type { ManagedUser, UsersScreenLabels } from "../types";
import { Edit3, Trash2, UserCheck, UserX } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { DataTable, type ColumnDef } from "@/shared/components/ui/DataTable";

type UsersTableProps = {
    users: ManagedUser[];
    labels: UsersScreenLabels;
    onEdit: (user: ManagedUser) => void;
    onToggleStatus: (user: ManagedUser) => void;
    onDelete: (user: ManagedUser) => void;
};


const getInitial = (name: string): string => {
  return name.charAt(0).toUpperCase(); 
}; 
function roleBadgeClass(role: string) { /* ... */ }
function statusBadgeClass(status: string) { /* ... */ }

export default function UsersTable({
    users,
    labels,
    onEdit,
    onToggleStatus,
    onDelete,
}: UsersTableProps) {
    
    const columns: ColumnDef<ManagedUser>[] = [
        {
            header: labels.table.name,
            headerClassName: "px-7",
            cellClassName: "px-7",
            cell: (user) => (
                <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-[#8FADFA] text-[17px] font-semibold text-white">
                        {getInitial(user.name)}
                    </div>
                    <div className="font-medium">{user.name}</div>
                </div>
            ),
        },
        {
            header: labels.table.email,
            cell: (user) => user.email,
        },
        {
            header: labels.table.role,
            cell: (user) => (
                <span className={cn("inline-flex min-w-[92px] items-center justify-center rounded-full px-3 py-1.5 text-[11px] font-semibold", roleBadgeClass(user.role))}>
                    {user.role}
                </span>
            ),
        },
        {
            header: labels.table.status,
            cell: (user) => (
                <span className={cn("inline-flex min-w-[74px] items-center justify-center rounded-full px-3 py-1.5 text-[11px] font-semibold", statusBadgeClass(user.status))}>
                    {user.status === "active" ? labels.status.active : labels.status.inactive}
                </span>
            ),
        },
        {
            header: labels.table.lastActive,
            cell: (user) => user.lastActive,
        },
        {
            header: labels.table.actions,
            headerClassName: "text-center px-7",
            cellClassName: "px-7",
            cell: (user) => (
                <div className="flex items-center justify-center gap-3">
                    <button type="button" onClick={() => onEdit(user)} className="text-[#3C71FF] hover:opacity-80">
                        <Edit3 className="size-[18px]" />
                    </button>
                    <button type="button" onClick={() => onToggleStatus(user)} className={cn("hover:opacity-80", user.status === "active" ? "text-[#EF4444]" : "text-[#16A34A]")}>
                        {user.status === "active" ? <UserX className="size-[18px]" /> : <UserCheck className="size-[18px]" />}
                    </button>
                    <button type="button" onClick={() => onDelete(user)} className="text-[#EF4444] hover:opacity-80">
                        <Trash2 className="size-[18px]" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <DataTable 
            data={users} 
            columns={columns} 
            keyExtractor={(user) => user.id} 
        />
    );
}