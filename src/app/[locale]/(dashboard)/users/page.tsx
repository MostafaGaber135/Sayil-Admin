import { useTranslations } from "next-intl";
import UsersScreen from "@/features/users/ui/UsersScreen";

export default function Page() {
  const t = useTranslations("pages.users");

  return (
    <UsersScreen
      title={t("title")}
      description={t("desc")}
      labels={{
        addUser: t("actions.addUser"),
        internalUsers: t("tabs.internal"),
        externalUsers: t("tabs.external"),
        searchPlaceholder: t("searchPlaceholder"),
        table: {
          name: t("table.name"),
          email: t("table.email"),
          role: t("table.role"),
          status: t("table.status"),
          lastActive: t("table.lastActive"),
          actions: t("table.actions"),
        },
        status: {
          active: t("status.active"),
          inactive: t("status.inactive"),
          deactivate: t("status.deactivate"),
          activate: t("status.activate"),
        },
        form: {
          addTitle: t("form.addTitle"),
          editTitle: t("form.editTitle"),
          personalInformation: t("form.personalInformation"),
          fullName: t("form.fullName"),
          email: t("form.email"),
          phone: t("form.phone"),
          role: t("form.role"),
          department: t("form.department"),
          location: t("form.location"),
          initialPassword: t("form.initialPassword"),
          passwordHint: t("form.passwordHint"),
          placeholders: {
            fullName: t("form.placeholders.fullName"),
            email: t("form.placeholders.email"),
            phone: t("form.placeholders.phone"),
            department: t("form.placeholders.department"),
            location: t("form.placeholders.location"),
            password: t("form.placeholders.password"),
          },
          cancel: t("form.cancel"),
          save: t("form.save"),
        },
        deleteDialog: {
          title: t("deleteDialog.title"),
          description: t("deleteDialog.description"),
          cancel: t("deleteDialog.cancel"),
          confirm: t("deleteDialog.confirm"),
        },
        deactivateDialog: {
          deactivateTitle: t("deactivateDialog.deactivateTitle"),
          deactivateDescription: t("deactivateDialog.deactivateDescription"),
          activateTitle: t("deactivateDialog.activateTitle"),
          activateDescription: t("deactivateDialog.activateDescription"),
          cancel: t("deactivateDialog.cancel"),
          confirmDeactivate: t("deactivateDialog.confirmDeactivate"),
          confirmActivate: t("deactivateDialog.confirmActivate"),
        },
      }}
    />
  );
}
