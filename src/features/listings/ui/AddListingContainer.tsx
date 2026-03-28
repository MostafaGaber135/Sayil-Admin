"use client";
import { ListingForm } from "@/features/listings";
import { useLookups } from "@/features/listings/hooks/useLookups";
import { useAddLand } from "../hooks/useEditListing";

export const AddListingContainer = () => {
  const { data: lookups } = useLookups();
  const { addLand, isPending, error } = useAddLand();

  return (
    <>
      {error && <p className="text-red-500 text-sm mb-4 px-4">{error}</p>}
      <ListingForm
        lookups={lookups}
        isPending={isPending}
        onSubmit={(data) => addLand(data)}
      />
    </>
  );
};