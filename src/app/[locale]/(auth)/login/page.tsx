import { Card } from "@/shared/components/ui/card";
import PageHeader from "@/shared/ui/PageHeader";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations();

  return (
    <div className="w-full">
      <PageHeader title={t("pages.login.title")} description={t("pages.login.desc")} />
      <Card className="p-4">
        <div className="text-sm text-muted-foreground">{t("common.comingSoon")}</div>
      </Card>
    </div>
  );
}
