import { UILayout } from "@/components/ui-layout";
import { Footer } from "@/components/footer";
import { useTranslations } from "next-intl";

export default function LegalNoticePage({
  params,
}: {
  params: { locale: string };
}) {
  const t = useTranslations("LegalNotice");

  return (
    <>
      <UILayout>
        <div className="prose prose-invert max-w-none">
          <section>
            <h2>{t("sections.businessOperator.title")}</h2>
            <table className="w-full border-collapse">
              <tbody>
                {Object.entries(t.raw("sections.businessOperator.items")).map(
                  ([key, value]) => (
                    <tr key={key} className="border-b border-gray-700">
                      <th className="text-left p-3 bg-gray-800/50 w-1/3">
                        {key}
                      </th>
                      <td className="p-3">{value as string}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </section>

          <p className="text-sm text-gray-400 mt-8">
            {t("lastUpdated")}: {t("lastUpdatedDate")}
          </p>
        </div>
      </UILayout>
    </>
  );
}
