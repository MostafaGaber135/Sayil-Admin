import { getTranslations } from "next-intl/server";
import RolesPermissionsClient from "@/features/roles-permissions/ui/RolesPermissionsClient";

export default async function Page() {
  const t = await getTranslations();

  return (
    <RolesPermissionsClient
      title={t("pages.roles.title")}
      description={t("pages.roles.desc")}
    />
  );
}
