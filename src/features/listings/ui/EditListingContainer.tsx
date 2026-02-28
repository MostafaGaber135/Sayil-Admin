'use client'
import {ListingForm, useListingById, useUpdateListing} from "@/features/listings";
import { useLookups } from "@/features/listings/hooks/useLookups";
import { mapListingToForm } from "@/shared/lib/utils";

export const EditListingContainer = ({ id }: { id: number }) => {

    const { data: lookups } = useLookups();
    const { data: response } = useListingById(id);
    // const { data: response } = useListingById(id);

    const { mutate: updateListing, isPending } = useUpdateListing();

    const defaultData = response?.data ? mapListingToForm(response.data) : undefined;

    return (
        <ListingForm
            lookups={lookups}
            defaultData={defaultData}
            isPending={isPending}
            onSubmit={(data) => updateListing({ ...data, id })}
        />
    );
}