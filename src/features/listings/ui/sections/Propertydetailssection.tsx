"use client";

import { useFormContext } from "react-hook-form";
import { Home, Compass, User, FileText, Users } from "lucide-react";
import { ListingFormValues } from "../../validation";
import { ListingLookupsResponse } from "../..";
import { ControlledSelect } from "@/shared/components/ui/ControlledInput";

interface Props {
  lookups?: ListingLookupsResponse;
}

export const PropertyDetailsSection = ({ lookups }: Props) => {
  const { control } = useFormContext<ListingFormValues>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ControlledSelect
        control={control}
        name="landTypeId"
        label="Property Type"
        icon={Home}
        options={lookups?.data?.landTypes?.map((i) => ({ label: i.label, value: String(i.value) })) ?? [
          { label: "Residential", value: "1" },
          { label: "Commercial", value: "2" },
          { label: "Industrial", value: "3" },
          { label: "Agricultural", value: "4" },
        ]}
      />

      <ControlledSelect
        control={control}
        name="landFacingId"
        label="Facing Direction"
        icon={Compass}
        options={lookups?.data?.landFacing?.map((i) => ({ label: i.label, value: String(i.value) })) ?? [
          { label: "North", value: "1" },
          { label: "South", value: "2" },
          { label: "East", value: "3" },
          { label: "West", value: "4" },
        ]}
      />

      <ControlledSelect
        control={control}
        name="ownershipStatusId"
        label="Ownership Type"
        icon={User}
        options={lookups?.data?.ownershipStatus?.map((i) => ({ label: i.label, value: String(i.value) })) ?? [
          { label: "Individual", value: "1" },
          { label: "Company", value: "2" },
          { label: "Heirs", value: "3" },
        ]}
      />

      <ControlledSelect
        control={control}
        name="deedTypeId"
        label="Deed Type"
        icon={FileText}
        options={lookups?.data?.deedTypes?.map((i) => ({ label: i.label, value: String(i.value) })) ?? [
          { label: "Electronic", value: "1" },
          { label: "Manual", value: "2" },
          { label: "Shared", value: "3" },
        ]}
      />

      <ControlledSelect
        control={control}
        name="neighborTypeId"
        label="Neighbor Type"
        icon={Users}
        options={[
          { label: "Mixed", value: "1" },
          { label: "Residential Only", value: "2" },
          { label: "Commercial Only", value: "3" },
        ]}
      />
    </div>
  );
};