"use client";
import { useFormContext } from "react-hook-form";
import { User, UserCheck, Map, Activity } from "lucide-react";
import { ListingFormValues } from "../../validation";
import { ListingLookupsResponse } from "../..";
import { useLandClassifications } from "@/features/settings/hooks/settings.hooks";
import { useListingAgents, useListingOwners } from "@/features/users/hooks/use-listing-users";
import { ControlledSelect } from "@/shared/components/ui/ControlledInput";

interface Props {
  lookups?: ListingLookupsResponse;
}

export const AdminSection = ({ lookups }: Props) => {
  const { control, watch } = useFormContext<ListingFormValues>();
  const statusId = watch("statusId");

  const { data: classifications } = useLandClassifications();
  const { data: ownersData } = useListingOwners();
  const { data: agentsData } = useListingAgents();

  const owners = ownersData?.items ?? [];
  const agents = agentsData?.items ?? [];

  const statusConfig: Record<number, { label: string; color: string; bg: string }> = {
    1: { label: "Property is pending approval", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200" },
    2: { label: "Property has been rejected", color: "text-red-700", bg: "bg-red-50 border-red-200" },
    3: { label: "Property is active and visible", color: "text-green-700", bg: "bg-green-50 border-green-200" },
    4: { label: "Property has been sold", color: "text-gray-700", bg: "bg-gray-50 border-gray-200" },
  };

  const currentStatus = statusConfig[Number(statusId)];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ControlledSelect
          control={control}
          name="userId"
          label="Owner"
          icon={User}
          options={owners.map((u) => ({
            label: `${u.fullName} (${u.email})`,
            value: String(u.id),
          }))}
        />

        <ControlledSelect
          control={control}
          name="agentId"
          label="Assigned Agent"
          icon={UserCheck}
          options={agents.map((a) => ({
            label: `${a.fullName} (${a.email})`,
            value: String(a.id),
          }))}
        />

        <ControlledSelect
          control={control}
          name="classificationId"
          label="Land Classification"
          icon={Map}
          options={(classifications ?? []).map((c: any) => ({
            label: c.name,
            value: String(c.id),
          }))}
        />

        <ControlledSelect
          control={control}
          name="statusId"
          label="Status"
          icon={Activity}
          options={[
            { label: "Pending", value: "1" },
            { label: "Rejected", value: "2" },
            { label: "Active", value: "3" },
            { label: "Sold", value: "4" },
          ]}
        />
      </div>

      {currentStatus && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm ${currentStatus.bg} ${currentStatus.color}`}>
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          {currentStatus.label}
        </div>
      )}
    </div>
  );
};