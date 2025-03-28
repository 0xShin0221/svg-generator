"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Loader2, ArrowRight, Wand2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { LogoSettings } from "@/types"

// モックのAIロゴ生成結果
const mockGeneratedLogos = [
  {
    id: "ai-1",
    preview: "/placeholder.svg?height=200&width=200",
    settings: {
      texts: [
        {
          id: "main",
          text: "NOVA",
          color: "#ffffff",
          fontSize: 48,
          fontFamily: "Arial",
          offsetY: 0,
        },
      ],
      backgroundColor: "#3b82f6",
      shape: "circle",
      padding: 20,
    } as LogoSettings,
  },
  {
    id: "ai-2",
    preview: "/placeholder.svg?height=200&width=200",
    settings: {
      texts: [
        {
          id: "main",
          text: "NOVA",
          color: "#ffffff",
          fontSize: 48,
          fontFamily: "Georgia",
          offsetY: 0,
        },
      ],
      backgroundColor: "#8b5cf6",
      shape: "hexagon",
      padding: 20,
    } as LogoSettings,
  },
  {
    id: "ai-3",
    preview: "/placeholder.svg?height=200&width=200",
    settings: {
      texts: [
        {
          id: "main",
          text: "NOVA",
          color: "#ffffff",
          fontSize: 48,
          fontFamily: "Impact",
          offsetY: 0,
        },
      ],
      backgroundColor: "#ec4899",
      shape: "shield",
      padding: 20,
    } as LogoSettings,
  },
  {
    id: "ai-4",
    preview: "/placeholder.svg?height=200&width=200",
    settings: {
      texts: [
        {
          id: "main",
          text: "NOVA",
          color: "#ffffff",
          fontSize: 48,
          fontFamily: "Trebuchet MS",
          offsetY: 0,
        },
      ],
      backgroundColor: "#10b981",
      shape: "rounded-square",
      padding: 20,
    } as LogoSettings,
  },
]

interface AILogoGeneratorProps {
  onSelectLogo: (settings: LogoSettings) => void
}

export function AILogoGenerator({ onSelectLogo }: AILogoGeneratorProps) {
  const [prompt, setPrompt] = useState("")
  const [brandName, setBrandName] = useState("")
  const [industry, setIndustry] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedLogos, setGeneratedLogos] = useState<typeof mockGeneratedLogos>([])
  const [activeTab, setActiveTab] = useState<"simple" | "advanced">("simple")

  // ロゴ生成をシミュレート
  const generateLogos = () => {
    setIsGenerating(true)

    // 実際のAPIコールの代わりにタイマーでモックデータを返す
    setTimeout(() => {
      // ブランド名をモックデータに反映
      const customizedLogos = mockGeneratedLogos.map((logo) => {
        const newSettings = { ...logo.settings }
        newSettings.texts = newSettings.texts.map((text) => ({
          ...text,
          text: brandName || "NOVA",
        }))
        return {
          ...logo,
          settings: newSettings,
        }
      })

      setGeneratedLogos(customizedLogos)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">AIロゴジェネレーター</h2>
          </div>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "simple" | "advanced")}>
            <TabsList className="grid grid-cols-2 bg-black/50 border border-white/10">
              <TabsTrigger
                value="simple"
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
              >
                シンプルモード
              </TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
              >
                詳細モード
              </TabsTrigger>
            </TabsList>

            <TabsContent value="simple" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brand-name" className="text-gray-300">
                  ブランド名
                </Label>
                <Input
                  id="brand-name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="例: Nova"
                  className="bg-black/50 border-white/10 text-white focus:border-blue-500/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry" className="text-gray-300">
                  業種
                </Label>
                <Input
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="例: テクノロジー、飲食、ファッション"
                  className="bg-black/50 border-white/10 text-white focus:border-blue-500/50"
                />
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-gray-300">
                  詳細プロンプト
                </Label>
                <div className="relative">
                  <Input
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="例: モダンでミニマルなテクノロジー企業のロゴ、青と紫のグラデーション..."
                    className="bg-black/50 border-white/10 text-white focus:border-blue-500/50 pr-10"
                  />
                  <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400 opacity-70" />
                </div>
                <p className="text-xs text-gray-500 mt-1">ロゴのスタイル、色、形状などの詳細を記述してください</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand-name-advanced" className="text-gray-300">
                    ブランド名
                  </Label>
                  <Input
                    id="brand-name-advanced"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="例: Nova"
                    className="bg-black/50 border-white/10 text-white focus:border-blue-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry-advanced" className="text-gray-300">
                    業種
                  </Label>
                  <Input
                    id="industry-advanced"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="例: テクノロジー"
                    className="bg-black/50 border-white/10 text-white focus:border-blue-500/50"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Button
            onClick={generateLogos}
            disabled={isGenerating || (!brandName && !prompt)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                AIでロゴを生成
              </>
            )}
          </Button>

          <AnimatePresence>
            {generatedLogos.length > 0 && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">生成されたロゴ</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGeneratedLogos([])}
                    className="text-gray-400 border-white/10 hover:bg-white/5"
                  >
                    クリア
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {generatedLogos.map((logo) => (
                    <motion.div
                      key={logo.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="relative group"
                    >
                      <div className="aspect-square bg-black/30 rounded-lg p-4 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-all">
                        <img
                          src={logo.preview || "/placeholder.svg"}
                          alt="Generated logo"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <Button
                        onClick={() => onSelectLogo(logo.settings)}
                        className="absolute bottom-2 right-2 h-8 w-8 rounded-full p-0 bg-blue-500/80 hover:bg-blue-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}

