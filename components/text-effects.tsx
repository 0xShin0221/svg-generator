"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { TextLayoutOptions } from "@/types"
import { motion } from "framer-motion"

interface TextEffectsProps {
  onApply: (layoutOptions: TextLayoutOptions) => void
}

// テキスト効果プリセット
const textEffects = [
  {
    id: "normal",
    name: "ノーマル",
    description: "標準テキスト",
    layout: {
      alignment: "center" as const,
      rotation: 0,
      letterSpacing: 0,
      lineHeight: 1.2,
    },
  },
  {
    id: "stretched",
    name: "ストレッチ",
    description: "文字間隔を広げる",
    layout: {
      alignment: "center" as const,
      rotation: 0,
      letterSpacing: 8,
      lineHeight: 1.2,
    },
  },
  {
    id: "rotated",
    name: "回転",
    description: "テキストを回転",
    layout: {
      alignment: "center" as const,
      rotation: 15,
      letterSpacing: 0,
      lineHeight: 1.2,
    },
  },
  {
    id: "diagonal",
    name: "斜め",
    description: "斜めに配置",
    layout: {
      alignment: "center" as const,
      rotation: -20,
      letterSpacing: 2,
      lineHeight: 1.2,
    },
  },
  {
    id: "compact",
    name: "コンパクト",
    description: "文字間隔を狭める",
    layout: {
      alignment: "center" as const,
      rotation: 0,
      letterSpacing: -2,
      lineHeight: 1.2,
    },
  },
  {
    id: "left-aligned",
    name: "左揃え",
    description: "テキストを左揃え",
    layout: {
      alignment: "left" as const,
      rotation: 0,
      letterSpacing: 1,
      lineHeight: 1.2,
    },
  },
  {
    id: "right-aligned",
    name: "右揃え",
    description: "テキストを右揃え",
    layout: {
      alignment: "right" as const,
      rotation: 0,
      letterSpacing: 1,
      lineHeight: 1.2,
    },
  },
  {
    id: "stylish",
    name: "スタイリッシュ",
    description: "モダンなスタイル",
    layout: {
      alignment: "center" as const,
      rotation: 0,
      letterSpacing: 5,
      lineHeight: 1.5,
    },
  },
]

export function TextEffects({ onApply }: TextEffectsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">テキスト効果</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {textEffects.map((effect, index) => (
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
                <h4 className="font-medium text-white">{effect.name}</h4>
                <p className="text-xs text-gray-400">{effect.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

