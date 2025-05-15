"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ToolFeature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ToolSectionProps {
  title: string;
  description: string;
  features: ToolFeature[];
  imageSrc?: string;
  imageAlt?: string;
  bgGradientFrom?: string;
  bgGradientTo?: string;
  buttonText?: string;
  buttonUrl?: string;
}

const ToolSection: React.FC<ToolSectionProps> = ({
  title,
  description,
  features,
  imageSrc,
  imageAlt,
  bgGradientFrom = "#6366f1", // indigo-500
  bgGradientTo = "#a21caf", // purple-700
  buttonText,
  buttonUrl,
}) => {
  return (
    <section
      className="relative rounded-3xl overflow-hidden py-16 px-6 md:px-16 mb-24 shadow-xl"
      style={{
        background: `linear-gradient(135deg, ${bgGradientFrom} 0%, ${bgGradientTo} 100%)`,
      }}
    >
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Image/Logo */}
        {imageSrc && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0 mb-8 md:mb-0"
          >
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              width={160}
              height={160}
              className="rounded-2xl shadow-lg bg-white/10"
            />
          </motion.div>
        )}
        {/* Content */}
        <div className="flex-1 text-white">
          <h2 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
            {title}
          </h2>
          <p className="text-lg mb-8 text-gray-100/90 max-w-2xl">
            {description}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {features.map((feature) => (
              <motion.li
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 rounded-xl p-6 shadow-md hover:bg-white/20 transition"
              >
                {feature.icon && (
                  <div className="mb-3 text-2xl text-indigo-200 flex items-center">
                    {feature.icon}
                  </div>
                )}
                <h3 className="font-semibold text-xl mb-1 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-200 text-sm">{feature.description}</p>
              </motion.li>
            ))}
          </ul>
          {buttonText && buttonUrl && (
            <a
              href={buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {buttonText}
              <ArrowRight className="w-5 h-5 ml-1" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default ToolSection;
