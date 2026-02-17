import PageHeader from "@/shared/ui/PageHeader";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();
  return (
    <div>
      <PageHeader title={t("pages.settings.title")} description={t("pages.settings.desc")} />
      <div className="text-sm text-muted-foreground">{t("common.comingSoon")}</div>
    </div>
  );
}
