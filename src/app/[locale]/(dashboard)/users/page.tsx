import { Suspense } from "react";
import { UsersScreenSkeleton } from "@/features/users/ui/UsersScreenSkeleton";
import { UsersDataFetcher } from "@/features/users/ui/UsersDataFetcher";

type SearchParams = {
  page?: string;
  tab?: string;
  search?: string;
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <Suspense fallback={<UsersScreenSkeleton />}>
      <UsersDataFetcher params={params} />
    </Suspense>
  );
}