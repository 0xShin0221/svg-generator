"use client"
import { Card, CardContent } from "@/components/ui/card"
import type { AnimationSettings } from "@/types"
import { motion } from "framer-motion"

interface AnimationPresetProps {
  onSelect: (shapeAnimation: AnimationSettings, textAnimations: AnimationSettings[]) => void
}

// アニメーションプリセット
const animationPresets = [
  {
    id: "bounce-in",
    name: "バウンスイン",
    description: "要素が弾むように登場",
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
    name: "スピンリビール",
    description: "回転しながら表示",
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
    name: "パルスシーケンス",
    description: "順番に拡大縮小",
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
    name: "タイプライター",
    description: "テキストが打ち込まれるように表示",
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
    name: "スポットライトモーフ",
    description: "形状が変化しながら光る",
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
    name: "ドロー＆スイング",
    description: "線が描かれた後に揺れる",
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
    name: "ズームブラー",
    description: "ズームしながらぼかす",
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
    name: "バイブレートグリッチ",
    description: "振動とグリッチ効果",
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
]

export function AnimationPresets({ onSelect }: AnimationPresetProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">アニメーションプリセット</h3>
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
                <h4 className="font-medium text-white">{preset.name}</h4>
                <p className="text-xs text-gray-400">{preset.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

