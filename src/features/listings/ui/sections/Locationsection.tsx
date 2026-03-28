"use client";

import { useFormContext } from "react-hook-form";
import { MapPin, Map as RegionIcon, Navigation, Link as LinkIcon } from "lucide-react";
import { ListingLookupsResponse, LookupItem } from "../../types";
import { useRegion } from "@/features/listings/hooks/useLookups";
import { ListingFormValues } from "@/features/listings/validation";
import { ControlledInput, ControlledSelect } from "@/shared/components/ui/ControlledInput";

interface Props {
  lookups?: ListingLookupsResponse;
}

export const LocationSection = ({ lookups }: Props) => {
  const { control, watch } = useFormContext<ListingFormValues>();
  
  // Using watch instead of inline onChange to trigger the region fetch smoothly
  const cityId = watch("cityId");
  const { data: regionData } = useRegion(Number(cityId));

  const cityOptions = lookups?.data?.cities?.map((c) => ({
    label: c.label,
    value: String(c.value),
  })) ?? [
    { label: "Riyadh", value: "1" },
    { label: "Jeddah", value: "2" },
    { label: "Mecca", value: "3" },
    { label: "Medina", value: "4" },
    { label: "Dammam", value: "5" },
  ];

  const regionOptions = regionData?.map((r: LookupItem) => ({
    label: r.label,
    value: String(r.value),
  })) ?? [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ControlledSelect
        control={control}
        name="cityId"
        label="City *"
        icon={MapPin}
        options={cityOptions}
      />

      <ControlledSelect
        control={control}
        name="regionId"
        label="Region *"
        icon={RegionIcon}
        options={regionOptions}
      />

      <ControlledInput
        control={control}
        name="address"
        label="Street"
        icon={Navigation}
        placeholder="e.g. King Fahd Road"
      />

      <ControlledInput
        control={control}
        name="googleMapsLink"
        label="Google Maps Link"
        icon={LinkIcon}
        placeholder="https://maps.google.com/..."
      />
    </div>
  );
};