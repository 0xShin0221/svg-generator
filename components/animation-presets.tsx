"use client";
import { Card, CardContent } from "@/components/ui/card";
import type { AnimationSettings } from "@/types";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface AnimationPresetProps {
  onSelect: (
    shapeAnimation: AnimationSettings,
    textAnimations: AnimationSettings[]
  ) => void;
}

export function AnimationPresets({ onSelect }: AnimationPresetProps) {
  const t = useTranslations("LogoCreator");

  // Animation presets
  const animationPresets = [
    {
      id: "bounce-in",
      nameKey: "preset_bounce_in",
      descriptionKey: "preset_bounce_in_desc",
      shape: {
        type: "bounce" as const,
        duration: 2,
        delay: 0,
        easing: "elastic" as const,
        direction: "normal" as const,
        iterations: 1,
      },
      texts: [
        {
          type: "fade" as const,
          duration: 1.5,
          delay: 0.5,
          easing: "ease-out" as const,
          direction: "normal" as const,
          iterations: 1,
        },
      ],
    },
    {
      id: "spin-reveal",
      nameKey: "preset_spin_reveal",
      descriptionKey: "preset_spin_reveal_desc",
      shape: {
        type: "rotate" as const,
        duration: 2,
        delay: 0,
        easing: "ease-out" as const,
        direction: "normal" as const,
        iterations: 1,
      },
      texts: [
        {
          type: "fade" as const,
          duration: 1,
          delay: 0.8,
          easing: "ease-in" as const,
          direction: "normal" as const,
          iterations: 1,
        },
      ],
    },
    {
      id: "pulse-sequence",
      nameKey: "preset_pulse_sequence",
      descriptionKey: "preset_pulse_sequence_desc",
      shape: {
        type: "pulse" as const,
        duration: 2,
        delay: 0,
        easing: "ease-in-out" as const,
        direction: "alternate" as const,
        iterations: "infinite",
      },
      texts: [
        {
          type: "pulse" as const,
          duration: 2,
          delay: 0.5,
          easing: "ease-in-out" as const,
          direction: "alternate" as const,
          iterations: "infinite",
        },
        {
          type: "pulse" as const,
          duration: 2,
          delay: 1,
          easing: "ease-in-out" as const,
          direction: "alternate" as const,
          iterations: "infinite",
          sequence: "after-previous" as const,
        },
      ],
    },
    {
      id: "typewriter-effect",
      nameKey: "preset_typewriter",
      descriptionKey: "preset_typewriter_desc",
      shape: {
        type: "fade" as const,
        duration: 1,
        delay: 0,
        easing: "ease" as const,
        direction: "normal" as const,
        iterations: 1,
      },
      texts: [
        {
          type: "typewriter" as const,
          duration: 2,
          delay: 0.5,
          easing: "linear" as const,
          direction: "normal" as const,
          iterations: 1,
        },
        {
          type: "typewriter" as const,
          duration: 1.5,
          delay: 2.5,
          easing: "linear" as const,
          direction: "normal" as const,
          iterations: 1,
          sequence: "after-previous" as const,
        },
      ],
    },
    {
      id: "spotlight-morph",
      nameKey: "preset_spotlight_morph",
      descriptionKey: "preset_spotlight_morph_desc",
      shape: {
        type: "morph" as const,
        duration: 3,
        delay: 0,
        easing: "ease-in-out" as const,
        direction: "alternate" as const,
        iterations: "infinite",
      },
      texts: [
        {
          type: "spotlight" as const,
          duration: 2,
          delay: 0,
          easing: "ease-in-out" as const,
          direction: "alternate" as const,
          iterations: "infinite",
        },
      ],
    },
    {
      id: "draw-and-swing",
      nameKey: "preset_draw_and_swing",
      descriptionKey: "preset_draw_and_swing_desc",
      shape: {
        type: "draw" as const,
        duration: 2,
        delay: 0,
        easing: "ease-out" as const,
        direction: "normal" as const,
        iterations: 1,
      },
      texts: [
        {
          type: "swing" as const,
          duration: 1.5,
          delay: 2,
          easing: "ease-in-out" as const,
          direction: "alternate" as const,
          iterations: 3,
          sequence: "after-previous" as const,
        },
      ],
    },
    {
      id: "zoom-blur",
      nameKey: "preset_zoom_blur",
      descriptionKey: "preset_zoom_blur_desc",
      shape: {
        type: "zoom" as const,
        duration: 3,
        delay: 0,
        easing: "ease-in-out" as const,
        direction: "alternate" as const,
        iterations: "infinite",
      },
      texts: [
        {
          type: "blur" as const,
          duration: 3,
          delay: 0,
          easing: "ease-in-out" as const,
          direction: "alternate" as const,
          iterations: "infinite",
        },
      ],
    },
    {
      id: "vibrate-glitch",
      nameKey: "preset_vibrate_glitch",
      descriptionKey: "preset_vibrate_glitch_desc",
      shape: {
        type: "vibrate" as const,
        duration: 0.5,
        delay: 0,
        easing: "linear" as const,
        direction: "normal" as const,
        iterations: "infinite",
      },
      texts: [
        {
          type: "glitch" as const,
          duration: 1,
          delay: 0,
          easing: "linear" as const,
          direction: "normal" as const,
          iterations: "infinite",
        },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">
        {t("animation_presets")}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {animationPresets.map((preset) => (
          <Card
            key={preset.id}
            className="overflow-hidden border border-gray-700 bg-gray-800/50 hover:bg-gray-800/80 transition-all hover:shadow-lg hover:shadow-blue-500/10 group cursor-pointer"
            onClick={() => onSelect(preset.shape, preset.texts)}
          >
            <CardContent className="p-4">
              <div className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 rounded-md mb-3 p-4 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <motion.div
                  className="w-12 h-12 bg-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: preset.id === "spin-reveal" ? [0, 360] : [0, 0],
                    opacity: preset.id === "bounce-in" ? [0, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />
              </div>
              <div className="text-center">
                <h4 className="font-medium text-white">{t(preset.nameKey)}</h4>
                <p className="text-xs text-gray-400">
                  {t(preset.descriptionKey)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
