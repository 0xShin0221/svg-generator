"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

interface PricingSectionProps {
  freePlanFeatures: string[]; // Now contains translation keys
  proPlanFeatures1: string[]; // Now contains translation keys
  proPlanFeatures2: string[]; // Now contains translation keys
}

const PricingSection = ({
  freePlanFeatures,
  proPlanFeatures1,
  proPlanFeatures2,
}: PricingSectionProps) => {
  const t = useTranslations("Pricing");

  return (
    <section className="mb-24">
      <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
        {t("title")}
      </h2>
      <p className="text-center text-blue-100 max-w-3xl mx-auto mb-12">
        {t("subtitle")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <Card className="h-full border-2 border-blue-400 bg-blue-950 shadow-lg shadow-blue-900/20">
            <CardContent className="p-6">
              <div className="bg-blue-400/20 rounded-full px-4 py-1 text-blue-200 text-sm font-medium inline-block mb-4">
                {t("freePlan.badge")}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {t("freePlan.name")}
              </h3>
              <div className="text-4xl font-bold text-white mb-6">
                {t("freePlan.price")}{" "}
                <span className="text-lg text-blue-200 font-normal">
                  {t("freePlan.period")}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {freePlanFeatures.map((featureKey) => (
                  <li key={featureKey} className="flex items-start">
                    <Check className="h-5 w-5 text-blue-300 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">{t(featureKey)}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-blue-400 hover:bg-blue-300 text-blue-950 font-semibold border-0 transition-all duration-300">
                {t("freePlan.ctaButton")}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="h-full border-2 border-purple-400 bg-gradient-to-br from-blue-950 to-purple-950 shadow-xl shadow-purple-900/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-bl from-purple-400 to-blue-400 text-blue-950 font-bold px-4 py-1 text-sm">
              {t("proPlan.comingSoon")}
            </div>
            <CardContent className="p-6">
              <div className="bg-purple-400/20 rounded-full px-4 py-1 text-purple-200 text-sm font-medium inline-block mb-4">
                {t("proPlan.badge")}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {t("proPlan.name")}
              </h3>
              <div className="text-4xl font-bold text-white mb-6">
                {t("proPlan.price")}{" "}
                <span className="text-lg text-purple-200 font-normal">
                  {t("proPlan.period")}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                  <h4 className="text-white font-medium border-b border-purple-400/30 pb-1 mb-3">
                    {t("proPlan.featuresTitle1")}
                  </h4>
                  <ul className="space-y-3">
                    {proPlanFeatures1.map((featureKey) => (
                      <li key={featureKey} className="flex items-start">
                        <Check className="h-5 w-5 text-purple-300 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-purple-100">{t(featureKey)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium border-b border-purple-400/30 pb-1 mb-3">
                    {t("proPlan.featuresTitle2")}
                  </h4>
                  <ul className="space-y-3">
                    {proPlanFeatures2.map((featureKey) => (
                      <li key={featureKey} className="flex items-start">
                        <Check className="h-5 w-5 text-purple-300 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-purple-100">{t(featureKey)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-2 border-purple-400 bg-purple-400/10 text-purple-200 hover:bg-purple-400/20 hover:text-white font-medium transition-all duration-300"
              >
                {t("proPlan.ctaButton")}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
