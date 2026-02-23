'use client'
// app/listings/[id]/edit/page.tsx
import { use } from "react";
import {ListingForm, useListingById} from "@/features/listings";
import {useLookups} from "@/features/listings/hooks/useLookups";
import {mapListingToForm} from "@/lib/utils";

export default function EditListingPage({
                                            params,
                                        }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const { data: lookups, isLoading: lookupsLoading } = useLookups();
    const { data: response, isLoading: listingLoading } = useListingById(id);
    // const { mutate: updateListing, isPending } = useUpdateListing();
    const defaultData = response?.data ? mapListingToForm(response.data) : undefined;
    if (lookupsLoading || listingLoading) return <h1>Loading</h1>;
    return (
        <ListingForm
            lookups={lookups}
            defaultData={defaultData}
            // isPending={isPending}
            // onSubmit={(data) => updateListing({ id: params.id, data })}
        />
    );
}