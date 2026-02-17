import PageHeader from "@/shared/ui/PageHeader";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();
  return (
    <div>
      <PageHeader title={t("pages.roles.title")} description={t("pages.roles.desc")} />
      <div className="text-sm text-muted-foreground">{t("common.comingSoon")}</div>
    </div>
  );
}
