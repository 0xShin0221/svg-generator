"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ToolFeature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ToolCardProps {
  title: string;
  description: string;
  features: ToolFeature[];
  bgGradientFrom?: string;
  bgGradientTo?: string;
  buttonText?: string;
  buttonUrl?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  features,
  bgGradientFrom = "#6366f1",
  bgGradientTo = "#a21caf",
  buttonText,
  buttonUrl,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col h-full rounded-3xl overflow-hidden shadow-xl"
      style={{
        background: `linear-gradient(135deg, ${bgGradientFrom} 0%, ${bgGradientTo} 100%)`,
      }}
    >
      <div className="flex flex-col items-center p-8 pb-4">
        <h3 className="text-2xl font-bold text-white mb-2 text-center drop-shadow-lg">
          {title}
        </h3>
        <p className="text-base text-gray-100/90 mb-4 text-center max-w-xs">
          {description}
        </p>
      </div>
      <ul className="flex-1 px-8 mb-6 space-y-3">
        {features.map((feature) => (
          <li key={feature.title} className="flex items-start gap-3">
            {feature.icon && (
              <span className="text-indigo-200 text-xl mt-1">
                {feature.icon}
              </span>
            )}
            <div>
              <span className="font-semibold text-white text-base">
                {feature.title}
              </span>
              <p className="text-sm text-gray-200 leading-tight">
                {feature.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {buttonText && buttonUrl && (
        <div className="px-8 pb-8">
          <a
            href={buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {buttonText}
            <ArrowRight className="w-5 h-5 ml-1" />
          </a>
        </div>
      )}
    </motion.div>
  );
};

export default ToolCard;
