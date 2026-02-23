import PageHeader from "@/shared/ui/PageHeader";
import { useTranslations } from "next-intl";
import {ListingForm, ListingsPage} from "@/features/listings";
import Link from "next/link";

export default function Page() {
  const t = useTranslations();
  return (
    <div>
      <PageHeader title={t("pages.listings.title")} description={t("pages.listings.desc")} />
      <div className="text-sm text-muted-foreground">
          <ListingsPage/>
      </div>
    </div>
  );
}
