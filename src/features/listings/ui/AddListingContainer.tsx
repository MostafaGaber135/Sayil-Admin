'use client'
import {ListingForm, useCreateListing, useLookups} from "@/features/listings";

export const AddListingContainer = () => {
    const { data: lookups } = useLookups();
    const { mutate: createListing, isPending } = useCreateListing();
    return (
        <ListingForm
            lookups={lookups}
            isPending={isPending}
            onSubmit={(data) => createListing(data)}
        />
    );
}
