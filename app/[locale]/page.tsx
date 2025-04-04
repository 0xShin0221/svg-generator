"use client";
import { UILayout } from "@/components/ui-layout";
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
import FeaturesSection from "@/components/lp/feature-section";

export default function Home() {
  return (
    <>
      <UILayout>
        <section id="start" className="mb-24">
          <EditorHero />
        </section>

        <section className="mb-12">
          <AdBanner />
        </section>

        {/* 特徴セクション */}
        <section id="features" className="mb-24">
          <FeaturesSection featuresData={featuresData} />
        </section>

        {/* 使い方ステップ */}
        <section id="steps">
          <StepsSection steps={steps} />
        </section>

        {/* 料金プラン */}
        <section id="pricing">
          <PricingSection
            freePlanFeatures={freePlanFeatures}
            proPlanFeatures1={proPlanFeatures1}
            proPlanFeatures2={proPlanFeatures2}
          />
        </section>

        {/* ユーザーの声 */}
        <section id="testimonials">
          <TestimonialsSection testimonials={testimonials} />
        </section>

        {/* よくある質問 */}
        <section id="faq">
          <FAQSection faqs={faqs} />
        </section>

        {/* CTA */}
        <section id="cta">
          <CTASection />
        </section>
      </UILayout>
    </>
  );
}
