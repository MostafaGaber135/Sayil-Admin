import PageHeader from "@/shared/ui/PageHeader";
import { useTranslations } from "next-intl";
import {ListingsPage} from "@/features/listings";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import {getQueryClient} from "@/shared/lib/react-query/server";
import {getListingLookupsService} from "@/features/listings/services";
import {fetchAllListing} from "@/features/listings/api";

export default async function Page() {
  // const t = useTranslations();
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['listings'],
        queryFn: fetchAllListing,
    });

    return (
    <div>
      {/*<PageHeader title={t("pages.listings.title")} description={t("pages.listings.desc")} />*/}
      <div className="text-sm text-muted-foreground">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ListingsPage/>
          </HydrationBoundary>
      </div>
    </div>
  );
}
