import { Suspense } from "react";
import { getQueryClient } from "@/shared/lib/react-query/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getListingLookupsService } from "@/features/listings/services";
import { AddListingContainer } from "@/features/listings/ui/AddListingContainer";
import { UserType } from "@/features/users";
import { getUsersPaginated } from "@/features/users/actions";
import { FormSkeleton } from "@/shared/ui/FormSkeleton";


// ── Data Fetcher ──────────────────────────────────────────────────────────────

async function AddListingFetcher() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["listings-lookups"],
      queryFn: getListingLookupsService,
    }),
    queryClient.prefetchQuery({
      queryKey: ["users", UserType.Internal],
      queryFn: () => getUsersPaginated({ userType: UserType.Internal, pageSize: 100 }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["users", UserType.External],
      queryFn: () => getUsersPaginated({ userType: UserType.External, pageSize: 100 }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AddListingContainer />
    </HydrationBoundary>
  );
}
// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AddListingPage() {
  return (
    <Suspense fallback={<FormSkeleton rows={6} />}>
      <AddListingFetcher />
    </Suspense>
  );
}