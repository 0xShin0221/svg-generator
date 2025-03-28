"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, AlertCircle, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface FontUploaderProps {
  onFontUpload: (fontFamily: string, fontUrl: string) => void
}

export function FontUploader({ onFontUpload }: FontUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [fontName, setFontName] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // フォントファイルの検証
  const validateFontFile = (file: File): boolean => {
    // ファイルタイプの検証
    const validTypes = [
      "font/ttf",
      "font/otf",
      "font/woff",
      "font/woff2",
      "application/x-font-ttf",
      "application/x-font-otf",
      "application/font-woff",
      "application/font-woff2",
    ]
    const fileExtension = file.name.split(".").pop()?.toLowerCase()
    const isValidExtension = ["ttf", "otf", "woff", "woff2"].includes(fileExtension || "")

    if (!isValidExtension) {
      setError("サポートされているフォント形式は .ttf, .otf, .woff, .woff2 のみです")
      return false
    }

    // ファイルサイズの検証 (5MB以下)
    if (file.size > 5 * 1024 * 1024) {
      setError("フォントファイルは5MB以下である必要があります")
      return false
    }

    return true
  }

  // フォントファイルの処理
  const handleFontUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)
    setSuccess(false)

    try {
      // ファイルの検証
      if (!validateFontFile(file)) {
        setIsUploading(false)
        return
      }

      // フォント名が入力されていない場合はファイル名から生成
      const fontFamilyName = fontName.trim() || file.name.split(".")[0].replace(/[^a-zA-Z0-9]/g, "-")

      // FileReaderを使用してファイルをデータURLに変換
      const reader = new FileReader()
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string

        try {
          // FontFace APIを使用してフォントを登録
          const fontFace = new FontFace(fontFamilyName, `url(${dataUrl})`)
          await fontFace.load()
          document.fonts.add(fontFace)

          // 親コンポーネントにフォント情報を渡す
          onFontUpload(fontFamilyName, dataUrl)

          setSuccess(true)
          setTimeout(() => setSuccess(false), 3000)
        } catch (err) {
          console.error("フォント登録エラー:", err)
          setError("フォントの読み込みに失敗しました。有効なフォントファイルか確認してください。")
        }
      }

      reader.onerror = () => {
        setError("ファイルの読み込み中にエラーが発生しました")
      }

      reader.readAsDataURL(file)
    } catch (err) {
      console.error("フォントアップロードエラー:", err)
      setError("フォントのアップロード中にエラーが発生しました")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="font-name" className="text-gray-300">
          フォント名（任意）
        </Label>
        <Input
          id="font-name"
          value={fontName}
          onChange={(e) => setFontName(e.target.value)}
          placeholder="MyCustomFont"
          className="bg-black/50 border-white/10 text-white focus:border-blue-500/50"
        />
        <p className="text-xs text-gray-500">空白の場合はファイル名が使用されます</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="font-file" className="text-gray-300">
          フォントファイル
        </Label>
        <div className="flex items-center gap-2">
          <Input
            ref={fileInputRef}
            id="font-file"
            type="file"
            accept=".ttf,.otf,.woff,.woff2"
            onChange={handleFontUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className={cn(
              "w-full border-dashed border-2 py-6 flex flex-col items-center justify-center gap-2 bg-black/30 border-white/10",
              isUploading ? "opacity-50 cursor-not-allowed" : "hover:border-blue-500/50 hover:bg-blue-500/10",
            )}
            disabled={isUploading}
          >
            <Upload className="h-6 w-6 text-gray-400" />
            <span className="text-gray-300">
              {isUploading ? "アップロード中..." : "クリックしてフォントをアップロード"}
            </span>
            <span className="text-xs text-gray-400">.ttf, .otf, .woff, .woff2 形式をサポート (最大5MB)</span>
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-md p-3 text-red-300 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-500/20 border border-green-500/50 rounded-md p-3 text-green-300 flex items-center gap-2">
          <Check className="h-5 w-5 flex-shrink-0" />
          <span>フォントが正常にアップロードされました</span>
        </div>
      )}
    </div>
  )
}

