import { NextIntlClientProvider, hasLocale } from "next-intl";
import type { Metadata } from "next";
import "./globals.css";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { metadata } from "@/i18n/seo";
import AmplitudeProvider from "@/analytics/amplitude";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const defaultLocale = "ja";
  const meta =
    metadata[locale as keyof typeof metadata] || metadata[defaultLocale];

  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AmplitudeProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </AmplitudeProvider>
      </body>
    </html>
  );
}
