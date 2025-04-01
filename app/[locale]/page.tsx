"use client";
import { UILayout } from "@/components/ui-layout";
import { useTranslations } from "next-intl";
import AnimatedCard from "@/components/animated-card";
import EditorHero from "@/components/editor-hero";
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

export default function Home() {
  // Use useTranslations hook instead of directly accessing texts
  const t = useTranslations("Home");

  return (
    <>
      <UILayout
        title={t("title")}
        subtitle={t("subtitle")}
        className="max-w-[1400px]"
      >
        <section className="mb-24">
          <EditorHero />
        </section>

        <section className="mb-12">
          <AdBanner />
        </section>

        {/* 特徴セクション */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-12">
            主な機能
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Render feature cards using the client component */}
            {featuresData.map((feature) => (
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
