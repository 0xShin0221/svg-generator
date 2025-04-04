import { UILayout } from "@/components/ui-layout";

import { useTranslations } from "next-intl";

export default function TermsPage({ params }: { params: { locale: string } }) {
  const t = useTranslations("Terms");

  return (
    <>
      <UILayout>
        <div className="prose prose-invert max-w-none">
          <h2>{t("sections.scope.title")}</h2>
          <p>{t("sections.scope.content")}</p>

          <h2>{t("sections.registration.title")}</h2>
          <p>{t("sections.registration.content")}</p>

          <h2>{t("sections.prohibitedActions.title")}</h2>
          <ul>
            {(t.raw("sections.prohibitedActions.items") as string[]).map(
              (item) => (
                <li key={item}>{item}</li>
              )
            )}
          </ul>

          <h2>{t("sections.termination.title")}</h2>
          <p>{t("sections.termination.content")}</p>

          <h2>{t("sections.disclaimer.title")}</h2>
          <p>{t("sections.disclaimer.content")}</p>

          <h2>{t("sections.changes.title")}</h2>
          <p>{t("sections.changes.content")}</p>

          <p className="text-sm text-gray-400 mt-8">
            {t("lastUpdated")}: {t("lastUpdatedDate")}
          </p>
        </div>
      </UILayout>
    </>
  );
}
