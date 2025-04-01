import { UILayout } from "@/components/ui-layout";
import LogoCreator from "@/components/logo-creator";
import ErrorBoundary from "@/components/error-boundary";
import { setRequestLocale } from "next-intl/server";
import { texts } from "@/i18n/texts";

import AnimatedCard from "@/components/animated-card";
import {
  featuresData,
  steps,
  freePlanFeatures,
  proPlanFeatures1,
  proPlanFeatures2,
  testimonials,
  faqs,
} from "@/components/lp/ja/data";
import StepsSection from "@/components/lp/steps-section";
import PricingSection from "@/components/lp/pricing-section";
import TestimonialsSection from "@/components/lp/testimonials-section";
import FAQSection from "@/components/lp/faq-section";
import CTASection from "@/components/lp/cta-section";
import AdBanner from "@/components/google-adsense";

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
        {/* ロゴエディタ */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-500/20">
            <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-8">
              プロフェッショナルなロゴエディタ
            </h2>
            <p className="text-center text-gray-300 max-w-3xl mx-auto mb-8">
              直感的なインターフェースで、デザインの知識がなくても美しいロゴを作成できます。
              シェイプ、テキスト、色、アニメーションなど、あらゆる要素をカスタマイズ可能です。
            </p>
            <div className="relative rounded-lg overflow-hidden border border-blue-500/30 shadow-xl shadow-blue-500/5">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10" />
              <ErrorBoundary>
                <LogoCreator />
              </ErrorBoundary>
            </div>
          </div>
        </section>
        <section className="mb-12">
          <AdBanner />
        </section>

        {/* ヒーローセクション */}
        {/* 特徴セクション */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-12">
            主な機能
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Render feature cards using the client component */}
            {featuresData.map((feature, index) => (
              <AnimatedCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>

        {/* 使い方ステップ */}
        <StepsSection steps={steps} />

        {/* 料金プラン */}
        <PricingSection
          freePlanFeatures={freePlanFeatures}
          proPlanFeatures1={proPlanFeatures1}
          proPlanFeatures2={proPlanFeatures2}
        />

        {/* ユーザーの声 */}
        <TestimonialsSection testimonials={testimonials} />

        {/* よくある質問 */}
        <FAQSection faqs={faqs} />

        {/* CTA */}
        <CTASection />
      </UILayout>
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(texts).map((locale) => ({ locale }));
}
