// app/[locale]/(dashboard)/listings/[id]/page.tsx
import { ListingViewPage } from "@/features/listings";
import { serverFetchGetLand } from "@/features/listings/api";
import { getQueryClient } from "@/shared/lib/react-query/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: number }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const queryClient = getQueryClient();

    const response = await serverFetchGetLand(Number(id));
    
    if (!response?.data) notFound();

    queryClient.setQueryData(['getLand', Number(id)], response);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ListingViewPage listing={response.data} />
        </HydrationBoundary>
    );
}