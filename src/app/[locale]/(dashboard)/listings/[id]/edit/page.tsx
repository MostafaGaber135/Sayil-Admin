// app/listings/[id]/edit/page.tsx
import { getQueryClient } from "@/shared/lib/react-query/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {getListingLookupsService} from "@/features/listings/services";
import {EditListingContainer} from "@/features/listings/ui/EditListingContainer";
import {fetchGetLand, fetchRegions} from "@/features/listings/api";


export default async function EditListingPage({params,}: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const queryClient = getQueryClient();
    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['listings-lookups'],
            queryFn: getListingLookupsService,
        }),
        queryClient.prefetchQuery({
            queryKey: ['getLand', id],
            queryFn: () => fetchGetLand(id),
        }),
        // queryClient.prefetchQuery({
        //     queryKey: ['listings-regions'],
        //     queryFn: () => fetchRegions(id),
        // }),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <EditListingContainer id={id} />
        </HydrationBoundary>
    );
}