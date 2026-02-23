
'use client'
import PageHeader from "@/shared/ui/PageHeader";
import { useTranslations } from "next-intl";
import {ListingForm, useCreateListing} from "@/features/listings";
import {useLookups} from "@/features/listings/hooks/useLookups";

// app/listings/new/page.tsx
export default function AddListingPage() {
    const { data: lookups, isLoading, isError } = useLookups();
    const { mutate: createListing, isPending } = useCreateListing();

    if (isLoading) return <h1>isLoading</h1>;
    if (isError) return <h1>Error</h1>;

    return (
        <ListingForm
            lookups={lookups}
            isPending={isPending}
            onSubmit={(data) => createListing(data)}
        />
    );
}