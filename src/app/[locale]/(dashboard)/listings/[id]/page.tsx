// app/listings/[id]/page.tsx


import {ListingViewPage} from "@/features/listings";
import {fetchGetLand} from "@/features/listings/api";

interface PageProps {
    params: Promise<{ id: number }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    const response = await fetchGetLand(id);

    return <ListingViewPage listing={response.data} />;
}