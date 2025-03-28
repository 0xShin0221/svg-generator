"use client"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Info, Play, Pause } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { AnimationSettings, AnimationType, AnimationEasing, AnimationDirection } from "@/types"

interface AnimationSettingsProps {
  animation: AnimationSettings
  onChange: (animation: AnimationSettings) => void
  onPreview: () => void
  isPreviewPlaying: boolean
  togglePreview: () => void
  elementType: "shape" | "text"
  elementIndex?: number
  totalElements?: number
}

export function AnimationSettingsComponent({
  animation,
  onChange,
  onPreview,
  isPreviewPlaying,
  togglePreview,
  elementType,
  elementIndex = 0,
  totalElements = 1,
}: AnimationSettingsProps) {
  // アニメーションタイプのオプション
  const animationTypes: { value: AnimationType; label: string; description: string }[] = [
    { value: "none", label: "なし", description: "アニメーションなし" },
    { value: "rotate", label: "回転", description: "要素を中心点を軸に回転させます" },
    { value: "pulse", label: "拡大縮小", description: "要素を拡大・縮小させます" },
    { value: "bounce", label: "バウンス", description: "要素を上下に弾ませます" },
    { value: "fade", label: "フェード", description: "要素の透明度を変化させます" },
    { value: "slide", label: "スライド", description: "要素を左右に移動させます" },
    { value: "flip", label: "フリップ", description: "要素を3D空間で回転させます" },
    { value: "shake", label: "シェイク", description: "要素を左右に揺らします" },
    { value: "spin-pulse", label: "スピン＆パルス", description: "回転と拡大縮小を組み合わせます" },
    { value: "float", label: "フロート", description: "要素をふわふわと浮かせます" },
    { value: "glitch", label: "グリッチ", description: "デジタルノイズのような効果を与えます" },
    { value: "wave", label: "ウェーブ", description: "波のような動きを与えます" },
    { value: "morph", label: "モーフィング", description: "形状を変形させます" },
    { value: "draw", label: "ドロー", description: "線が描かれるような効果を与えます" },
    { value: "blur", label: "ブラー", description: "ぼかし効果を与えます" },
    { value: "zoom", label: "ズーム", description: "ズームイン・アウトします" },
    { value: "swing", label: "スイング", description: "振り子のように揺れます" },
    { value: "vibrate", label: "バイブレーション", description: "細かく振動します" },
    { value: "typewriter", label: "タイプライター", description: "テキストが1文字ずつ表示されます" },
    { value: "spotlight", label: "スポットライト", description: "光が当たるような効果を与えます" },
  ]

  // イージングのオプション
  const easingOptions: { value: AnimationEasing; label: string }[] = [
    { value: "linear", label: "リニア (一定)" },
    { value: "ease", label: "イーズ (緩急あり)" },
    { value: "ease-in", label: "イーズイン (徐々に加速)" },
    { value: "ease-out", label: "イーズアウト (徐々に減速)" },
    { value: "ease-in-out", label: "イーズインアウト (加速後減速)" },
    { value: "elastic", label: "エラスティック (弾力的)" },
    { value: "bounce", label: "バウンス (跳ね返り)" },
    { value: "back", label: "バック (行き過ぎて戻る)" },
  ]

  // 方向のオプション
  const directionOptions: { value: AnimationDirection; label: string }[] = [
    { value: "normal", label: "通常" },
    { value: "reverse", label: "逆方向" },
    { value: "alternate", label: "交互" },
    { value: "alternate-reverse", label: "交互（逆から）" },
  ]

  // 繰り返しのオプション
  const iterationOptions = [
    { value: "1", label: "1回" },
    { value: "2", label: "2回" },
    { value: "3", label: "3回" },
    { value: "5", label: "5回" },
    { value: "10", label: "10回" },
    { value: "infinite", label: "無限" },
  ]

  // シーケンスのオプション
  const sequenceOptions = [
    { value: "with-previous", label: "前の要素と同時" },
    { value: "after-previous", label: "前の要素の後" },
  ]

  // アニメーションタイプを変更
  const handleTypeChange = (type: AnimationType) => {
    onChange({
      ...animation,
      type,
    })
  }

  // 持続時間を変更
  const handleDurationChange = (duration: number) => {
    onChange({
      ...animation,
      duration,
    })
  }

  // 遅延を変更
  const handleDelayChange = (delay: number) => {
    onChange({
      ...animation,
      delay,
    })
  }

  // イージングを変更
  const handleEasingChange = (easing: AnimationEasing) => {
    onChange({
      ...animation,
      easing,
    })
  }

  // 方向を変更
  const handleDirectionChange = (direction: AnimationDirection) => {
    onChange({
      ...animation,
      direction,
    })
  }

  // iterationsのチェックを強化し、undefinedの場合のエラーを防止
  const handleIterationsChange = (iterations: string) => {
    onChange({
      ...animation,
      iterations: iterations === "infinite" ? "infinite" : Number.parseInt(iterations),
    })
  }

  // シーケンスを変更
  const handleSequenceChange = (sequence: "with-previous" | "after-previous" | undefined) => {
    onChange({
      ...animation,
      sequence,
    })
  }

  // 注意: ここはイテレーションを文字列で比較する部分を修正
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Label className="text-gray-300">
            {elementType === "shape" ? "シェイプアニメーション" : `テキストアニメーション ${elementIndex + 1}`}
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                <p>アニメーションの種類と動作を設定します</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={togglePreview}
          className="border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 h-9"
        >
          {isPreviewPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
          {isPreviewPlaying ? "停止" : "プレビュー"}
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="animation-type" className="text-gray-300">
          アニメーションタイプ
        </Label>
        <Select value={animation.type} onValueChange={(value) => handleTypeChange(value as AnimationType)}>
          <SelectTrigger id="animation-type" className="bg-gray-900/50 border-gray-700 text-white h-10">
            <SelectValue placeholder="アニメーションタイプを選択" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white max-h-[300px] overflow-y-auto">
            <div className="grid grid-cols-1 gap-1">
              {animationTypes.map((type) => (
                <SelectItem
                  key={type.value}
                  value={type.value}
                  className="flex flex-col items-start py-2 px-2 cursor-pointer hover:bg-gray-700 focus:bg-gray-700"
                >
                  <span className="font-medium">{type.label}</span>
                  <span className="text-xs text-gray-400">{type.description}</span>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>

      {animation.type !== "none" && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="animation-duration" className="text-gray-300">
                持続時間: {animation.duration}秒
              </Label>
              <Slider
                id="animation-duration"
                min={0.1}
                max={10}
                step={0.1}
                value={[animation.duration]}
                onValueChange={(value) => handleDurationChange(value[0])}
                className="py-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="animation-delay" className="text-gray-300">
                遅延: {animation.delay}秒
              </Label>
              <Slider
                id="animation-delay"
                min={0}
                max={5}
                step={0.1}
                value={[animation.delay]}
                onValueChange={(value) => handleDelayChange(value[0])}
                className="py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="animation-easing" className="text-gray-300">
                イージング
              </Label>
              <Select value={animation.easing} onValueChange={(value) => handleEasingChange(value as AnimationEasing)}>
                <SelectTrigger id="animation-easing" className="bg-gray-900/50 border-gray-700 text-white">
                  <SelectValue placeholder="イージングを選択" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {easingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="animation-direction" className="text-gray-300">
                方向
              </Label>
              <Select
                value={animation.direction}
                onValueChange={(value) => handleDirectionChange(value as AnimationDirection)}
              >
                <SelectTrigger id="animation-direction" className="bg-gray-900/50 border-gray-700 text-white">
                  <SelectValue placeholder="方向を選択" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {directionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="animation-iterations" className="text-gray-300">
              繰り返し回数
            </Label>
            <Select
              value={typeof animation.iterations === "string" ? animation.iterations : animation.iterations.toString()}
              onValueChange={handleIterationsChange}
            >
              <SelectTrigger id="animation-iterations" className="bg-gray-900/50 border-gray-700 text-white">
                <SelectValue placeholder="繰り返し回数を選択" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {iterationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {elementType === "text" && elementIndex > 0 && totalElements > 1 && (
            <div className="space-y-2">
              <Label htmlFor="animation-sequence" className="text-gray-300">
                アニメーションシーケンス
              </Label>
              <Select
                value={animation.sequence || "with-previous"}
                onValueChange={(value) => handleSequenceChange(value as "with-previous" | "after-previous")}
              >
                <SelectTrigger id="animation-sequence" className="bg-gray-900/50 border-gray-700 text-white">
                  <SelectValue placeholder="シーケンスを選択" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {sequenceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </>
      )}
    </div>
  )
}

