"use client";

import type React from "react";
import { motion } from "framer-motion";
import { PenTool, Zap, Wand2, Download, Share2, Monitor } from "lucide-react";

interface Feature {
  title: string;
  description: string;
}

interface AnimatedCardProps {
  iconName: "PenTool" | "Wand2" | "Zap" | "Download" | "Share2" | "Monitor";
  iconColor: string;
  borderColor: string;
  hoverBorderColor: string;
  gradientFrom: string;
  gradientTo: string;
  title: string;
  features: Feature[];
  delay: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  iconName,
  iconColor,
  borderColor,
  hoverBorderColor,
  gradientFrom,
  gradientTo,
  title,
  features,
  delay,
}) => {
  // Map icon name to component
  const IconComponent = {
    PenTool,
    Wand2,
    Zap,
    Download,
    Share2,
    Monitor,
  }[iconName];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`p-6 rounded-xl border border-${borderColor} hover:border-${hoverBorderColor} bg-gradient-to-br from-${gradientFrom}/5 to-${gradientTo}/5 hover:from-${gradientFrom}/10 hover:to-${gradientTo}/10 transition-all duration-300 h-full`}
    >
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-lg bg-${gradientFrom} mr-3`}>
          <IconComponent className={`h-5 w-5 text-${iconColor}`} />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.1 * (index + 1) }}
            className="flex items-start"
          >
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              <div className={`w-1.5 h-1.5 rounded-full bg-${iconColor}`}></div>
            </div>
            <div>
              <p className="font-medium text-white">{feature.title}</p>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default AnimatedCard;
