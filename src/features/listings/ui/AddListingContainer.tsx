"use client";
import { useRouter } from "next/navigation";
import { ListingForm } from "@/features/listings";
import { useLookups } from "@/features/listings/hooks/useLookups";
import { useAddLand } from "@/features/listings/hooks/use-listing-actions";

export const AddListingContainer = () => {
  const router = useRouter();
  const { data: lookups } = useLookups();
  const { addLand, isPending, error } = useAddLand();

  return (
    <>
      {error && <p className="text-red-500 text-sm mb-4 px-4">{error}</p>}
      <ListingForm
        lookups={lookups}
        isPending={isPending}
        onSubmit={(data) => addLand(data, () => router.push("/listings"))}
      />
    </>
  );
};
