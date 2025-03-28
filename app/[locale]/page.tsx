import { UILayout } from "@/components/ui-layout";
import LogoCreator from "@/components/logo-creator";
import ErrorBoundary from "@/components/error-boundary";
import { setRequestLocale } from "next-intl/server";
import { texts } from "@/i18n/texts";
import { Footer } from "@/components/footer";

export default async function Home({ params }: { params: { locale: string } }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as keyof typeof texts;
  setRequestLocale(locale);

  const homeMessages = texts[locale].Home;

  return (
    <>
      <UILayout
        title={homeMessages.title}
        subtitle={homeMessages.subtitle}
        className="max-w-[1400px]"
      >
        <ErrorBoundary>
          <LogoCreator />
        </ErrorBoundary>
      </UILayout>
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(texts).map((locale) => ({ locale }));
}
