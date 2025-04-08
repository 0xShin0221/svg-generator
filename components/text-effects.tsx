"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { TextLayoutOptions } from "@/types";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface TextEffectsProps {
  onApply: (layoutOptions: TextLayoutOptions) => void;
}

export function TextEffects({ onApply }: TextEffectsProps) {
  const t = useTranslations("LogoCreator");

  // Text effect presets
  const textEffects = [
    {
      id: "normal",
      nameKey: "effect_normal",
      descriptionKey: "effect_normal_desc",
      layout: {
        alignment: "center" as const,
        rotation: 0,
        letterSpacing: 0,
        lineHeight: 1.2,
      },
    },
    {
      id: "stretched",
      nameKey: "effect_stretched",
      descriptionKey: "effect_stretched_desc",
      layout: {
        alignment: "center" as const,
        rotation: 0,
        letterSpacing: 8,
        lineHeight: 1.2,
      },
    },
    {
      id: "rotated",
      nameKey: "effect_rotated",
      descriptionKey: "effect_rotated_desc",
      layout: {
        alignment: "center" as const,
        rotation: 15,
        letterSpacing: 0,
        lineHeight: 1.2,
      },
    },
    {
      id: "diagonal",
      nameKey: "effect_diagonal",
      descriptionKey: "effect_diagonal_desc",
      layout: {
        alignment: "center" as const,
        rotation: -20,
        letterSpacing: 2,
        lineHeight: 1.2,
      },
    },
    {
      id: "compact",
      nameKey: "effect_compact",
      descriptionKey: "effect_compact_desc",
      layout: {
        alignment: "center" as const,
        rotation: 0,
        letterSpacing: -2,
        lineHeight: 1.2,
      },
    },
    {
      id: "left-aligned",
      nameKey: "effect_left_aligned",
      descriptionKey: "effect_left_aligned_desc",
      layout: {
        alignment: "left" as const,
        rotation: 0,
        letterSpacing: 1,
        lineHeight: 1.2,
      },
    },
    {
      id: "right-aligned",
      nameKey: "effect_right_aligned",
      descriptionKey: "effect_right_aligned_desc",
      layout: {
        alignment: "right" as const,
        rotation: 0,
        letterSpacing: 1,
        lineHeight: 1.2,
      },
    },
    {
      id: "stylish",
      nameKey: "effect_stylish",
      descriptionKey: "effect_stylish_desc",
      layout: {
        alignment: "center" as const,
        rotation: 0,
        letterSpacing: 5,
        lineHeight: 1.5,
      },
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">{t("text_effects")}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {textEffects.map((effect) => (
          <Card
            key={effect.id}
            className="overflow-hidden border border-gray-700 bg-gray-800/50 hover:bg-gray-800/80 transition-all hover:shadow-lg hover:shadow-blue-500/10 group cursor-pointer"
            onClick={() => onApply(effect.layout)}
          >
            <CardContent className="p-4">
              <div className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 rounded-md mb-3 p-4 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <motion.div
                  className="text-white font-bold"
                  style={{
                    letterSpacing: `${effect.layout.letterSpacing}px`,
                    lineHeight: effect.layout.lineHeight,
                    rotate: effect.layout.rotation,
                    textAlign: effect.layout.alignment,
                    width: "100%",
                  }}
                >
                  TEXT
                </motion.div>
              </div>
              <div className="text-center">
                <h4 className="font-medium text-white">{t(effect.nameKey)}</h4>
                <p className="text-xs text-gray-400">
                  {t(effect.descriptionKey)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
