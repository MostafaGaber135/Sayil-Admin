// EditListingContainer.tsx
'use client'
import { useActionState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ListingForm, useListingById } from "@/features/listings";
import { useLookups } from "@/features/listings/hooks/useLookups";
import { mapListingToForm } from "@/shared/lib/utils";

import { ListingFormValues } from "@/features/listings/validation";
import { updateListingAction } from "../actions";


export const EditListingContainer = ({ id }: { id: number }) => {
    const router = useRouter();
    const { data: lookups } = useLookups();
    const { data: response } = useListingById(id);
    const [isPending, startTransition] = useTransition();
    const [state, dispatch] = useActionState(updateListingAction, null);
    useEffect(() => {
        if (state?.success) {
            router.push(`/listings/${id}`);
        }
    }, [state]);
    const defaultData = response?.data ? mapListingToForm(response.data) : undefined;
    const handleSubmit = (data: ListingFormValues) => {
        startTransition(() => {
            dispatch({ ...data, id }); 
        });
    };
    return (
        <>
            {state?.error && (
                <p className="text-red-500 text-sm mb-4 px-4">{state.error}</p>
            )}
            <ListingForm
                lookups={lookups}
                defaultData={defaultData}
                isPending={isPending}
                onSubmit={handleSubmit}
            />
        </>
    );
}
