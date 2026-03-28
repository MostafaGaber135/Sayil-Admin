'use client'
import { ListingForm } from ".";
import { useEditListing } from "../hooks/useEditListing";

export const EditListingContainer = ({ id }: { id: number }) => {
  const { lookups, defaultData, isPending, error, handleSubmit } =
    useEditListing(id);

  return (
    <>
      {error && <p className="text-red-500 text-sm mb-4 px-4">{error}</p>}
      <ListingForm
        lookups={lookups}
        defaultData={defaultData}
        isPending={isPending}
        onSubmit={handleSubmit}
      />
    </>
  );
};
