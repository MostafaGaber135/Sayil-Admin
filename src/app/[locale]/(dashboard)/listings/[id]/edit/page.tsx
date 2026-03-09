// app/[locale]/(dashboard)/listings/[id]/edit/page.tsx
import { getQueryClient } from "@/shared/lib/react-query/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getListingLookupsService } from "@/features/listings/services";
import { serverFetchGetLand } from "@/features/listings/api";
import { EditListingContainer } from "@/features/listings";

interface PageProps {
    params: Promise<{ id: number }>;
}

export default async function EditListingPage({ params }: PageProps) {
    const { id } = await params;
    const queryClient = getQueryClient();

    const [landData, lookupsData] = await Promise.all([
        serverFetchGetLand(Number(id)),
        getListingLookupsService(),
    ]);

    queryClient.setQueryData(['getLand', Number(id)], landData);
    queryClient.setQueryData(['listings-lookups'], lookupsData);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <EditListingContainer id={Number(id)} />
        </HydrationBoundary>
    );
}