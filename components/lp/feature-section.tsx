"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import AnimatedCard from "@/components/animated-card";
import type { FeatureData } from "@/components/features-data";

interface FeaturesSectionProps {
  featuresData: FeatureData[];
}

const FeaturesSection = ({ featuresData }: FeaturesSectionProps) => {
  const t = useTranslations("Features");

  return (
    <>
      <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-12">
        {t("title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <motion.div
            key={feature.titleKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <AnimatedCard
              key={feature.titleKey}
              iconName={feature.iconName}
              iconColor={feature.iconColor}
              borderColor={feature.borderColor}
              hoverBorderColor={feature.hoverBorderColor}
              gradientFrom={feature.gradientFrom}
              gradientTo={feature.gradientTo}
              title={t(feature.titleKey)}
              features={feature.featureKeys.map((key: string) => ({
                title: t(`${key}_title`),
                description: t(`${key}_desc`),
              }))}
              delay={feature.delay}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default FeaturesSection;
