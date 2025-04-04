import { UILayout } from "@/components/ui-layout";

import { useTranslations } from "next-intl";

export default function PrivacyPage({
  params,
}: {
  params: { locale: string };
}) {
  const t = useTranslations("Privacy");

  return (
    <>
      <UILayout>
        <div className="prose prose-invert max-w-none">
          <h2>{t("sections.collection.title")}</h2>
          <p>{t("sections.collection.content")}</p>

          <h2>{t("sections.usage.title")}</h2>
          <p>{t("sections.usage.content")}</p>

          <h2>{t("sections.sharing.title")}</h2>
          <p>{t("sections.sharing.content")}</p>

          <h2>{t("sections.cookies.title")}</h2>
          <p>{t("sections.cookies.content")}</p>

          <h2>{t("sections.security.title")}</h2>
          <p>{t("sections.security.content")}</p>

          <h2>{t("sections.rights.title")}</h2>
          <p>{t("sections.rights.content")}</p>

          <h2>{t("sections.changes.title")}</h2>
          <p>{t("sections.changes.content")}</p>

          <h2>{t("sections.contact.title")}</h2>
          <p>{t("sections.contact.content")}</p>

          <p className="text-sm text-gray-400 mt-8">
            {t("lastUpdated")}: {t("lastUpdatedDate")}
          </p>
        </div>
      </UILayout>
    </>
  );
}
