"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  PenTool,
  Wand2,
  Zap,
  Download,
  Share2,
  Monitor,
} from "lucide-react";

// Define types for the features
interface Feature {
  title: string;
  description: string;
}

// Define available icon names
type IconName = "PenTool" | "Wand2" | "Zap" | "Download" | "Share2" | "Monitor";

// Define props for the component
interface AnimatedCardProps {
  iconName: IconName;
  iconColor: string;
  borderColor: string;
  hoverBorderColor: string;
  gradientFrom: string;
  gradientTo: string;
  title: string;
  features: Feature[];
  delay?: number;
}

const AnimatedCard = ({
  iconName,
  iconColor,
  borderColor,
  hoverBorderColor,
  gradientFrom,
  gradientTo,
  title,
  features,
  delay = 0,
}: AnimatedCardProps) => {
  // Function to get the icon component based on name
  const getIcon = (name: IconName) => {
    switch (name) {
      case "PenTool":
        return PenTool;
      case "Wand2":
        return Wand2;
      case "Zap":
        return Zap;
      case "Download":
        return Download;
      case "Share2":
        return Share2;
      case "Monitor":
        return Monitor;
      default:
        return PenTool; // Default icon as a fallback
    }
  };

  // Get the icon component
  const Icon = getIcon(iconName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card
        className={`h-full border-${borderColor} bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 hover:border-${hoverBorderColor} hover:shadow-lg hover:shadow-${borderColor}/10`}
      >
        <CardContent className="p-6">
          <div
            className={`rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-${gradientFrom} to-${gradientTo} mb-4`}
          >
            <Icon className={`h-6 w-6 text-${iconColor}`} />
          </div>
          <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>

          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check
                  className={`h-5 w-5 text-${iconColor} mr-2 mt-0.5 flex-shrink-0`}
                />
                <div>
                  <span className="font-medium text-white">
                    {feature.title}
                  </span>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;
