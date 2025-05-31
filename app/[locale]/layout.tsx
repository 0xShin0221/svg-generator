import { NextIntlClientProvider, hasLocale } from "next-intl";
import type { Metadata } from "next";
import "./globals.css";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { metadata } from "@/i18n/seo";
import AmplitudeProvider from "@/analytics/amplitude";
import { GoogleAnalytics } from "@next/third-parties/google";
import FeedbackModal from "@/components/feedback-modal";
import Script from "next/script";

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
      <head>
        <meta name="monetag" content="1c06e6b2b860d4cc68c684cbf126c869" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('vemtoutcheeg.com',9269689,document.createElement('script'))`,
          }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5763552958838701"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body suppressHydrationWarning>
        <AmplitudeProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </AmplitudeProvider>
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_ID} />
        )}
        <FeedbackModal />
      </body>
    </html>
  );
}
