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
import MonetagInPagePush from "@/components/MonetagInPagePush";
import FeaturesSection from "@/components/lp/feature-section";
import ToolGridSection from "@/components/lp/tool-grid-section";
import {
  Zap,
  Wand2,
  Monitor,
  Square,
  Type,
  Sliders,
  Code,
  Globe,
} from "lucide-react";

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

        {/* SVG Tools Grid Section */}
        <ToolGridSection
          tools={[
            {
              title: "PNG to SVG Converter",
              description:
                "Convert PNG images to scalable SVG vector graphics with AI-powered precision. Free online tool for high-quality vector conversion.",
              bgGradientFrom: "#6366f1",
              bgGradientTo: "#a21caf",
              features: [
                {
                  title: "AI-Powered",
                  description: "Advanced algorithms for precise vector tracing",
                  icon: <Wand2 className="w-6 h-6" />,
                },
                {
                  title: "Fast Processing",
                  description: "Server-side conversion for optimal performance",
                  icon: <Zap className="w-6 h-6" />,
                },
                {
                  title: "SVG Download",
                  description: "Get clean, scalable SVG output instantly",
                  icon: <Monitor className="w-6 h-6" />,
                },
              ],
              buttonText: "Go to PNG to SVG",
              buttonUrl: "https://png.svg-gen.com",
            },
            {
              title: "SVG Editor",
              description:
                "Create and edit SVG vector graphics with this free online editor. Features include shape creation, text editing, property customization, and SVG code editing.",
              bgGradientFrom: "#06b6d4",
              bgGradientTo: "#6366f1",
              features: [
                {
                  title: "Shape Creation",
                  description:
                    "Draw and edit rectangles, circles, polygons, and more",
                  icon: <Square className="w-6 h-6" />,
                },
                {
                  title: "Text Editing",
                  description: "Add and style text elements with full control",
                  icon: <Type className="w-6 h-6" />,
                },
                {
                  title: "Property Customization",
                  description: "Adjust colors, gradients, strokes, and more",
                  icon: <Sliders className="w-6 h-6" />,
                },
                {
                  title: "SVG Code Editor",
                  description: "Edit SVG source code directly in the browser",
                  icon: <Code className="w-6 h-6" />,
                },
                {
                  title: "Export & Share",
                  description: "Download or share your SVG creations easily",
                  icon: <Globe className="w-6 h-6" />,
                },
              ],
              buttonText: "Go to SVG Editor",
              buttonUrl: "https://editor.svg-gen.com",
            },
          ]}
        />

        <section className="mb-12">
          <MonetagInPagePush />
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
