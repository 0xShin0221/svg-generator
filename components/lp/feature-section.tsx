"use client";

import { motion } from "framer-motion";
import AnimatedCard from "@/components/animated-card";
import { useTranslations } from "next-intl";
import type { FeatureData } from "@/components/lp/ja/data";

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
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <AnimatedCard key={feature.title} {...feature} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default FeaturesSection;
