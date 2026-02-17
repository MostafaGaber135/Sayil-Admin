import PageHeader from "@/shared/ui/PageHeader";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();
  return (
    <div>
      <PageHeader title={t("pages.listings.title")} description={t("pages.listings.desc")} />
      <div className="text-sm text-muted-foreground">{t("common.comingSoon")}</div>
    </div>
  );
}
