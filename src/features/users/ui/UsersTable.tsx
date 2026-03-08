"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";
import { Card } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import type { ManagedUser, UsersScreenLabels } from "../types";
import { Edit3, Trash2, UserCheck, UserX } from "lucide-react";

type UsersTableProps = {
    users: ManagedUser[];
    labels: UsersScreenLabels;
    onEdit: (user: ManagedUser) => void;
    onToggleStatus: (user: ManagedUser) => void;
    onDelete: (user: ManagedUser) => void;
};

function getInitial(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
}

function roleBadgeClass(role: ManagedUser["role"]) {
    if (role === "Administrator") return "bg-[#EFF4FF] text-[#175CD3]";
    if (role === "Agent") return "bg-[#ECFDF3] text-[#027A48]";
    if (role === "Landowner") return "bg-[#FFF7ED] text-[#C4320A]";

    return "bg-[#F4F3FF] text-[#5925DC]";
}

function statusBadgeClass(status: ManagedUser["status"]) {
    return status === "active"
        ? "bg-[#ECFDF3] text-[#027A48]"
        : "bg-[#FEF3F2] text-[#B42318]";
}

export default function UsersTable({
    users,
    labels,
    onEdit,
    onToggleStatus,
    onDelete,
}: UsersTableProps) {
    return (
        <Card className="overflow-hidden rounded-[24px] border border-[#D8E0ED] p-0 shadow-none">
            <Table>
                <TableHeader className="bg-[#F8FAFC]">
                    <TableRow className="border-[#D8E0ED] hover:bg-transparent">
                        <TableHead className="h-[50px] px-7 text-start text-[11px] font-medium uppercase tracking-[0.08em] text-[#63738F]">
                            {labels.table.name}
                        </TableHead>
                        <TableHead className="h-[50px] px-3 text-start text-[11px] font-medium uppercase tracking-[0.08em] text-[#63738F]">
                            {labels.table.email}
                        </TableHead>
                        <TableHead className="h-[50px] px-3 text-start text-[11px] font-medium uppercase tracking-[0.08em] text-[#63738F]">
                            {labels.table.role}
                        </TableHead>
                        <TableHead className="h-[50px] px-3 text-start text-[11px] font-medium uppercase tracking-[0.08em] text-[#63738F]">
                            {labels.table.status}
                        </TableHead>
                        <TableHead className="h-[50px] px-3 text-start text-[11px] font-medium uppercase tracking-[0.08em] text-[#63738F]">
                            {labels.table.lastActive}
                        </TableHead>
                        <TableHead className="h-[50px] px-7 text-center text-[11px] font-medium uppercase tracking-[0.08em] text-[#63738F]">
                            {labels.table.actions}
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.id}
                            className="border-[#D8E0ED] hover:bg-transparent"
                        >
                            <TableCell className="px-7 py-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex size-12 items-center justify-center rounded-full bg-[#8FADFA] text-[17px] font-semibold text-white">
                                        {getInitial(user.name)}
                                    </div>
                                    <div className="text-[13px] font-medium text-[#0F172A]">
                                        {user.name}
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell className="px-3 py-5 text-[13px] text-[#0F172A]">
                                {user.email}
                            </TableCell>

                            <TableCell className="px-3 py-5">
                                <span
                                    className={cn(
                                        "inline-flex min-w-[92px] items-center justify-center rounded-full px-3 py-1.5 text-[11px] font-semibold",
                                        roleBadgeClass(user.role)
                                    )}
                                >
                                    {user.role}
                                </span>
                            </TableCell>

                            <TableCell className="px-3 py-5">
                                <span
                                    className={cn(
                                        "inline-flex min-w-[74px] items-center justify-center rounded-full px-3 py-1.5 text-[11px] font-semibold",
                                        statusBadgeClass(user.status)
                                    )}
                                >
                                    {user.status === "active"
                                        ? labels.status.active
                                        : labels.status.inactive}
                                </span>
                            </TableCell>

                            <TableCell className="px-3 py-5 text-[13px] text-[#0F172A]">
                                {user.lastActive}
                            </TableCell>

                            <TableCell className="px-7 py-5">
                                <div className="flex items-center justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => onEdit(user)}
                                        className="cursor-pointer text-[#3C71FF] transition-opacity hover:opacity-80"
                                    >
                                        <Edit3 className="size-[18px]" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onToggleStatus(user)}
                                        className={cn(
                                            "cursor-pointer transition-opacity hover:opacity-80",
                                            user.status === "active"
                                                ? "text-[#EF4444]"
                                                : "text-[#16A34A]"
                                        )}
                                    >
                                        {user.status === "active" ? (
                                            <UserX className="size-[18px]" />
                                        ) : (
                                            <UserCheck className="size-[18px]" />
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onDelete(user)}
                                        className="cursor-pointer text-[#EF4444] transition-opacity hover:opacity-80"
                                    >
                                        <Trash2 className="size-[18px]" />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}