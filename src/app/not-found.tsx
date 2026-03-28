import { Button } from "@/shared/components/ui/button";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">{t("pages.notFound.title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("pages.notFound.desc")}</p>

      <Button asChild className="mt-4">
        <Link href="/">{t("common.goHome")}</Link>
      </Button>
    </div>
  );
}
