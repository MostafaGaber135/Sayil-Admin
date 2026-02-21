import CommissionOfferTab from "@/features/settings/ui/CommissionOfferTab";
import CommunicationsTab from "@/features/settings/ui/CommunicationsTab";
import FaqManagementTab from "@/features/settings/ui/FaqManagementTab";
import LandClassificationsTab from "@/features/settings/ui/LandClassificationsTab";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { TableCell, TableRow } from "@/shared/components/ui/table";
import PageHeader from "@/shared/ui/PageHeader";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();
  return (
    <>
      <div>
        {/* <PageHeader title={t("pages.settings.title")} description={t("pages.settings.desc")} />
      <div className="text-sm text-muted-foreground">{t("common.comingSoon")}</div> */}
        <h1 className=" text-2xl font-bold text-sayil-dark-blue">
          {t("pages.settings.title")}
        </h1>
        <h2 className=" text-gray-600 mt-1">{t("pages.settings.desc")}</h2>
      </div>
      {/* <LandClassificationsTab /> */}
      {/* <CommissionOfferTab/> */}
      {/* <CommunicationsTab/> */}
      <FaqManagementTab/>
      
    </>
  );
}
