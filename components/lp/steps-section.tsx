"use client";

import { motion } from "framer-motion";
import { MousePointer, Palette, Download } from "lucide-react";
import { useTranslations } from "next-intl";

interface StepsSectionProps {
  steps: {
    title: string;
    description: string;
    iconName: string; // Changed from icon to iconName
  }[];
}

const StepsSection = ({ steps }: StepsSectionProps) => {
  const t = useTranslations("Steps");

  // Function to get the icon component based on iconName
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Palette":
        return Palette;
      case "MousePointer":
        return MousePointer;
      case "Download":
        return Download;
      default:
        return Palette; // Default fallback
    }
  };

  return (
    <section className="mb-24">
      <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-12">
        {t("title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => {
          const Icon = getIcon(step.iconName);

          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-300">{step.description}</p>
              <div className="mt-4 p-4 rounded-lg bg-black/30 border border-blue-500/10">
                <Icon className="h-12 w-12 mx-auto text-blue-400" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default StepsSection;
