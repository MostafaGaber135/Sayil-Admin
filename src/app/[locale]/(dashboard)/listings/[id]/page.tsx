import PageHeader from "@/shared/ui/PageHeader";
import { useTranslations } from "next-intl";

export default function ListingDetailsPage() {
  const t = useTranslations();

  return (
    <div>
      <PageHeader
        title={t("pages.listingDetails.title")}
        description={t("pages.listingDetails.desc")}
      />
      <div className="text-sm text-muted-foreground">{t("common.comingSoon")}</div>
    </div>
  );
}
