"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Save, FolderOpen, Trash2, Check, AlertCircle } from "lucide-react"
import type { LogoSettings } from "@/types"
import { motion } from "framer-motion"

interface SaveLoadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentSettings: LogoSettings
  onLoad: (settings: LogoSettings) => void
}

interface SavedLogo {
  id: string
  name: string
  date: string
  settings: LogoSettings
  thumbnail: string
}

export function SaveLoadDialog({ open, onOpenChange, currentSettings, onLoad }: SaveLoadDialogProps) {
  const [activeTab, setActiveTab] = useState<"save" | "load">("save")
  const [logoName, setLogoName] = useState("")
  const [savedLogos, setSavedLogos] = useState<SavedLogo[]>([])
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ロゴ名を初期化
  useEffect(() => {
    if (open && currentSettings.texts.length > 0) {
      setLogoName(currentSettings.texts[0].text || "My Logo")
    }
  }, [open, currentSettings])

  // 保存されたロゴを読み込む
  useEffect(() => {
    if (open) {
      loadSavedLogos()
    }
  }, [open])

  // 保存されたロゴを読み込む関数
  const loadSavedLogos = () => {
    try {
      const savedLogosStr = localStorage.getItem("savedLogos")
      if (savedLogosStr) {
        const logos = JSON.parse(savedLogosStr) as SavedLogo[]
        setSavedLogos(logos)
      }
    } catch (err) {
      console.error("保存されたロゴの読み込みエラー:", err)
      setError("保存されたロゴの読み込みに失敗しました")
    }
  }

  // サムネイルを生成
  const generateThumbnail = async (): Promise<string> => {
    return new Promise((resolve) => {
      const svgElement = document.getElementById("logo-preview") as SVGSVGElement
      if (!svgElement) {
        resolve("")
        return
      }

      try {
        // SVGをデータURLに変換
        const serializer = new XMLSerializer()
        const svgString = serializer.serializeToString(svgElement)
        const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" })
        const url = URL.createObjectURL(svgBlob)

        // 画像に変換
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          const canvas = document.createElement("canvas")
          canvas.width = 200
          canvas.height = 200
          const ctx = canvas.getContext("2d")
          if (ctx) {
            ctx.fillStyle = "#1f2937"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            const thumbnail = canvas.toDataURL("image/png", 0.7)
            URL.revokeObjectURL(url)
            resolve(thumbnail)
          } else {
            resolve("")
          }
        }
        img.onerror = () => {
          URL.revokeObjectURL(url)
          resolve("")
        }
        img.src = url
      } catch (err) {
        console.error("サムネイル生成エラー:", err)
        resolve("")
      }
    })
  }

  // ロゴを保存
  const saveCurrentLogo = async () => {
    if (!logoName.trim()) {
      setError("ロゴ名を入力してください")
      return
    }

    setSaving(true)
    setError(null)

    try {
      const thumbnail = await generateThumbnail()
      const newLogo: SavedLogo = {
        id: Date.now().toString(),
        name: logoName.trim(),
        date: new Date().toLocaleString(),
        settings: { ...currentSettings },
        thumbnail,
      }

      // 既存のロゴを読み込む
      const savedLogosStr = localStorage.getItem("savedLogos")
      let logos: SavedLogo[] = []
      if (savedLogosStr) {
        logos = JSON.parse(savedLogosStr)
      }

      // 新しいロゴを追加
      logos.unshift(newLogo)

      // 保存（最大20個まで）
      localStorage.setItem("savedLogos", JSON.stringify(logos.slice(0, 20)))
      setSavedLogos(logos)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    } catch (err) {
      console.error("ロゴ保存エラー:", err)
      setError("ロゴの保存に失敗しました")
    } finally {
      setSaving(false)
    }
  }

  // ロゴを読み込む
  const loadLogo = (logo: SavedLogo) => {
    try {
      onLoad(logo.settings)
      onOpenChange(false)
    } catch (err) {
      console.error("ロゴ読み込みエラー:", err)
      setError("ロゴの読み込みに失敗しました")
    }
  }

  // ロゴを削除
  const deleteLogo = (id: string) => {
    try {
      const updatedLogos = savedLogos.filter((logo) => logo.id !== id)
      localStorage.setItem("savedLogos", JSON.stringify(updatedLogos))
      setSavedLogos(updatedLogos)
    } catch (err) {
      console.error("ロゴ削除エラー:", err)
      setError("ロゴの削除に失敗しました")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-gray-800/90 backdrop-blur-md border border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">ロゴの保存と読み込み</DialogTitle>
          <DialogDescription className="text-gray-400">
            作成したロゴを保存したり、以前に保存したロゴを読み込んだりできます
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="save" value={activeTab} onValueChange={(value) => setActiveTab(value as "save" | "load")}>
          <TabsList className="grid grid-cols-2 bg-gray-900/50">
            <TabsTrigger value="save" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              <Save className="h-4 w-4 mr-2" />
              保存
            </TabsTrigger>
            <TabsTrigger
              value="load"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <FolderOpen className="h-4 w-4 mr-2" />
              読み込み
            </TabsTrigger>
          </TabsList>

          <TabsContent value="save" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo-name" className="text-gray-300">
                  ロゴ名
                </Label>
                <Input
                  id="logo-name"
                  value={logoName}
                  onChange={(e) => setLogoName(e.target.value)}
                  placeholder="ロゴの名前を入力"
                  className="bg-gray-900/50 border-gray-700 text-white"
                />
              </div>

              {error && activeTab === "save" && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-md p-3 text-red-300 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  {error}
                </div>
              )}

              <Button
                onClick={saveCurrentLogo}
                disabled={saving || !logoName.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0"
              >
                {saving ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="h-5 w-5 border-2 border-white border-opacity-30 border-t-white rounded-full"
                  />
                ) : success ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    保存しました
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    現在のロゴを保存
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="load" className="space-y-4 mt-4">
            {error && activeTab === "load" && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-md p-3 text-red-300 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                {error}
              </div>
            )}

            {savedLogos.length === 0 ? (
              <div className="text-center py-8 text-gray-400">保存されたロゴはありません</div>
            ) : (
              <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                {savedLogos.map((logo) => (
                  <Card
                    key={logo.id}
                    className="overflow-hidden border border-gray-700 bg-gray-800/50 hover:bg-gray-800/80 transition-all group"
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 rounded-md mb-3 p-2 flex items-center justify-center overflow-hidden">
                        {logo.thumbnail ? (
                          <img
                            src={logo.thumbnail || "/placeholder.svg"}
                            alt={logo.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <div className="text-gray-500 text-sm">プレビューなし</div>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-white truncate">{logo.name}</h3>
                          <p className="text-xs text-gray-400">{logo.date}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteLogo(logo.id)}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => loadLogo(logo)}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                          >
                            <FolderOpen className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300"
          >
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

