// app/listings/new/page.tsx
import { getQueryClient } from "@/shared/lib/react-query/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getListingLookupsService } from "@/features/listings/services";
import {AddListingContainer} from "@/features/listings/ui/AddListingContainer";


export default async function AddListingPage() {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['listings-lookups'],
        queryFn: getListingLookupsService,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AddListingContainer />
        </HydrationBoundary>
    );
}