// app/listings/[id]/edit/page.tsx
import { getQueryClient } from "@/shared/lib/react-query/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {getListingLookupsService} from "@/features/listings/services";
import { getServerSession } from "next-auth";
import axios from "axios";
import { authOptions } from "@/shared/lib/auth/nextauth.options";
import { EditListingContainer } from "@/features/listings";

interface PageProps {
    params: Promise<{ 
        id: number;  
    }>;
}

export default async function EditListingPage({ params }: PageProps) {
    const { id } = await params;
    const queryClient = getQueryClient();
    
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    const serverApi = axios.create({
        baseURL: process.env.API_BASE_URL,
        headers: { Authorization: `Bearer ${token}` }
    });

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['listings-lookups'],
            queryFn: getListingLookupsService,
        }),
        queryClient.prefetchQuery({
            queryKey: ['getLand', String(id)],
            queryFn: async () => {
                const { data } = await serverApi.get(`/api/admin/land/${id}`);
                return data;
            },
        }),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <EditListingContainer id={id} />
        </HydrationBoundary>
    );
}