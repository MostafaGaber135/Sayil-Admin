import CommissionOfferTab from "@/features/settings/ui/CommissionOfferTab";
import CommunicationsTab from "@/features/settings/ui/CommunicationsTab";
import FaqManagementTab from "@/features/settings/ui/FaqManagementTab";
import LandClassificationsTab from "@/features/settings/ui/LandClassificationsTab";
import { Card } from "@/shared/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();
  return (
    <>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-sayil-dark-blue">
          {t("pages.settings.title")}
        </h1>

        <h2 className="text-gray-600">{t("pages.settings.desc")}</h2>

        <Card className="p-2">
          <Tabs defaultValue="land" className="">
            <div className="  border-b border-border p-2">
              <TabsList className=" bg-transparent" variant="line">
                <TabsTrigger
                  className="data-[state=active]:text-primary
    data-[state=active]:after:absolute
    data-[state=active]:after:left-0
    data-[state=active]:after:bottom-[-8px]
    data-[state=active]:after:h-[2px]
    data-[state=active]:after:w-full
    data-[state=active]:after:bg-primary cursor-pointer"
                  value="land"
                >
                  {t("pages.settings.Land")}
                </TabsTrigger>

                <TabsTrigger
                  className="data-[state=active]:text-primary
data-[state=active]:after:absolute
data-[state=active]:after:left-0
data-[state=active]:after:bottom-[-8px]
data-[state=active]:after:h-[2px]
data-[state=active]:after:w-full
data-[state=active]:after:bg-primary cursor-pointer"
                  value="commission"
                >
                  {t("pages.settings.Commission")}
                </TabsTrigger>

                <TabsTrigger
                  className="data-[state=active]:text-primary data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:bottom-[-8px] data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-primary cursor-pointer"
                  value="communications"
                >
                  {t("pages.settings.Communications")}
                </TabsTrigger>

                <TabsTrigger
                  className="data-[state=active]:text-primary data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:bottom-[-8px] data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-primary cursor-pointer"
                  value="faq"
                >
                  {t("pages.settings.FAQ")}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="land">
              <LandClassificationsTab />
            </TabsContent>

            <TabsContent value="commission">
              <CommissionOfferTab />
            </TabsContent>

            <TabsContent value="communications">
              <CommunicationsTab />
            </TabsContent>

            <TabsContent value="faq">
              <FaqManagementTab />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </>
  );
}
