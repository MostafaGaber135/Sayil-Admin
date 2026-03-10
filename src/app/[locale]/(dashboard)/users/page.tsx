// app/[locale]/(dashboard)/users/page.tsx — Server Component

import { mapApiUserToManaged, segmentToUserType } from "@/features/users/Users.utils";
import { getUsersPaginated } from "@/features/users/actions";
import { usersScreenLabels } from "@/features/users/data/users.constants";
import UsersScreen from "@/features/users/ui/UsersScreen";


const PAGE_SIZE = 5;

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

  const tab = (params.tab === "external" ? "external" : "internal") as "internal" | "external";
  const page = Math.max(1, Number(params.page ?? 1));
  const search = params.search?.trim() ?? "";

  const result = await getUsersPaginated({
    userType: segmentToUserType(tab),
    pageNumber: page,
    pageSize: PAGE_SIZE,
    searchTerm: search || undefined,
  });

  const users = result.items.map((u) => mapApiUserToManaged(u, tab));

  return (
    <UsersScreen
      title="Users Management"
      description="Manage internal and external platform users"
      labels={usersScreenLabels}
      initialUsers={users}
      pagination={result.meta}
      currentTab={tab}
      currentPage={page}
      currentSearch={search}
    />
  );
}