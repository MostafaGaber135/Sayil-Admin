"use client";

import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";
import type { UserSegment } from "../types";
import { Plus, Search } from "lucide-react";

type UsersToolbarProps = {
    title: string;
    description: string;
    addUserLabel: string;
    internalUsersLabel: string;
    externalUsersLabel: string;
    searchPlaceholder: string;
    activeTab: UserSegment;
    search: string;
    onTabChange: (tab: UserSegment) => void;
    onSearchChange: (value: string) => void;
    onAddUser: () => void;
};

export default function UsersToolbar({
    title,
    description,
    addUserLabel,
    internalUsersLabel,
    externalUsersLabel,
    searchPlaceholder,
    activeTab,
    search,
    onTabChange,
    onSearchChange,
    onAddUser,
}: UsersToolbarProps) {
    const tabs: { key: UserSegment; label: string }[] = [
        { key: "internal", label: internalUsersLabel },
        { key: "external", label: externalUsersLabel },
    ];

    return (
        <>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#22315D]">
                        {title}
                    </h1>
                    <p className="mt-1 text-[13px] text-[#51607E]">{description}</p>
                </div>

                <Button
                    onClick={onAddUser}
                    className="h-11 rounded-[14px] bg-[#3C71FF] px-5 text-[12px] font-medium shadow-none hover:bg-[#3364E6] cursor-pointer"
                >
                    <Plus className="size-4" />
                    {addUserLabel}
                </Button>
            </div>

            <Card className="overflow-hidden rounded-[24px] border border-[#D8E0ED] p-0 shadow-none">
                <div className="border-b border-[#D8E0ED] px-8 pt-5">
                    <div className="flex items-center gap-10">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.key;

                            return (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => onTabChange(tab.key)}
                                    className={cn(
                                        "cursor-pointer relative border-none bg-transparent pb-5 text-[13px] font-medium outline-none transition-colors",
                                        isActive
                                            ? "text-[#3C71FF]"
                                            : "text-[#5E6B85] hover:text-[#3C71FF]"
                                    )}
                                >
                                    {tab.label}
                                    <span
                                        className={cn(
                                            "absolute bottom-0 inset-s-0 h-[2px] rounded-full bg-[#3C71FF] transition-all",
                                            isActive ? "w-full opacity-100" : "w-0 opacity-0"
                                        )}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="border-b border-[#D8E0ED] px-5 py-4">
                    <div className="relative">
                        <Search className="pointer-events-none absolute inset-s-4 top-1/2 size-5 -translate-y-1/2 text-[#98A2B3]" />
                        <Input
                            value={search}
                            onChange={(event) => onSearchChange(event.target.value)}
                            placeholder={searchPlaceholder}
                            className="h-12 rounded-[16px] border-[#CBD5E1] bg-white ps-12 pe-4 text-[12px] text-[#22315D] placeholder:text-[#98A2B3] focus-visible:ring-0"
                        />
                    </div>
                </div>
            </Card>
        </>
    );
}