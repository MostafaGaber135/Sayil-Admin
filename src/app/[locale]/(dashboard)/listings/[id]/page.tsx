// app/listings/[id]/page.tsx


import {ListingViewPage} from "@/features/listings";
import {fetchGetLand} from "@/features/listings/api";
import { GetAllPriceChangeRequestAction } from "@/server-actions/listings/actions";
import { authOptions } from "@/shared/lib/auth/nextauth.options";
import { getQueryClient } from "@/shared/lib/react-query/server";
import axios from "axios";
import { getServerSession } from "next-auth";

interface PageProps {
    params: Promise<{ id: number }>;
}

export default async function Page({ params }: PageProps) {
    // const response = await fetchGetLand(id);
    const { id } = await params;
    const queryClient = getQueryClient();
    
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    const serverApi = axios.create({
        baseURL: process.env.API_BASE_URL,
        headers: { Authorization: `Bearer ${token}` }
    });

    await queryClient.prefetchQuery({
            queryKey: ['getLand', String(id)],
            queryFn: async () => {
                const { data } = await serverApi.get(`/api/admin/land/${id}`);
                return data;
            },
        })
        const req = await GetAllPriceChangeRequestAction(id)
        console.log(req);
        
        const response = queryClient.getQueryData<any>(['getLand', id]);

    console.log(response);
    return <ListingViewPage listing={response.data} />;
}