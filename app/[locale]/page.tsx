"use client";
import { UILayout } from "@/components/ui-layout";
import EditorHero from "@/components/editor-hero";
import {
  getFeaturesData,
  getSteps,
  getFreePlanFeatures,
  getProPlanFeatures1,
  getProPlanFeatures2,
  getTestimonials,
  getFaqs,
} from "@/components/features-data";
import StepsSection from "@/components/lp/steps-section";
import PricingSection from "@/components/lp/pricing-section";
import TestimonialsSection from "@/components/lp/testimonials-section";
import FAQSection from "@/components/lp/faq-section";
import CTASection from "@/components/lp/cta-section";
import AdBanner from "@/components/google-adsense";
import FeaturesSection from "@/components/lp/feature-section";

export default function Home() {
  // Get data with translation keys
  const featuresData = getFeaturesData();
  const steps = getSteps();
  const freePlanFeatures = getFreePlanFeatures();
  const proPlanFeatures1 = getProPlanFeatures1();
  const proPlanFeatures2 = getProPlanFeatures2();
  const testimonials = getTestimonials();
  const faqs = getFaqs();

  return (
    <>
      <UILayout>
        <section id="start" className="mb-24">
          <EditorHero />
        </section>

        <section className="mb-12">
          <AdBanner />
        </section>

        {/* Features section */}
        <section id="features" className="mb-24">
          <FeaturesSection featuresData={featuresData} />
        </section>

        {/* Steps section */}
        <section id="steps">
          <StepsSection steps={steps} />
        </section>

        {/* Pricing section */}
        <section id="pricing">
          <PricingSection
            freePlanFeatures={freePlanFeatures}
            proPlanFeatures1={proPlanFeatures1}
            proPlanFeatures2={proPlanFeatures2}
          />
        </section>

        {/* Testimonials section */}
        <section id="testimonials">
          <TestimonialsSection testimonials={testimonials} />
        </section>

        {/* FAQ section */}
        <section id="faq">
          <FAQSection faqs={faqs} />
        </section>

        {/* CTA section */}
        <section id="cta">
          <CTASection />
        </section>
      </UILayout>
    </>
  );
}
