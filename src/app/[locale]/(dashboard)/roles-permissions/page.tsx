import { useTranslations } from "next-intl";
import RolesPermissionsClient from "@/features/roles-permissions/ui/RolesPermissionsClient";

export default function Page() {
  const t = useTranslations();
  return (
    <RolesPermissionsClient
      title={t("pages.roles.title")}
      description={t("pages.roles.desc")}
    />
  );
}
