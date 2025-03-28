// アニメーションタイプ
export type AnimationType =
  | "none"
  | "rotate"
  | "pulse"
  | "bounce"
  | "fade"
  | "slide"
  | "flip"
  | "shake"
  | "spin-pulse"
  | "float"
  | "glitch"
  | "wave"
  // 新しいアニメーションタイプを追加
  | "morph"
  | "draw"
  | "blur"
  | "zoom"
  | "swing"
  | "vibrate"
  | "typewriter"
  | "spotlight"

// アニメーションイージング
export type AnimationEasing = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "elastic" | "bounce" | "back"

// アニメーション方向
export type AnimationDirection = "normal" | "reverse" | "alternate" | "alternate-reverse"

// アニメーション設定
export interface AnimationSettings {
  type: AnimationType
  duration: number
  delay: number
  easing: AnimationEasing
  direction: AnimationDirection
  iterations: number | "infinite"
  // 連動アニメーション用
  sequence?: "with-previous" | "after-previous"
}

// テキストレイアウトオプション
export interface TextLayoutOptions {
  alignment: "left" | "center" | "right" | "justify"
  rotation: number
  letterSpacing: number
  lineHeight: number
}

// テキスト要素
export interface TextElement {
  id: string
  text: string
  color: string
  fontSize: number
  fontFamily: string
  offsetY: number
  animation?: AnimationSettings
  layout?: TextLayoutOptions
}

// シェイプタイプ
export type LogoShape =
  | "circle"
  | "square"
  | "rounded-square"
  | "hexagon"
  | "triangle"
  | "star"
  | "shield"
  | "custom"
  | "advanced"
  | "none"

// 設定インターフェース
export interface LogoSettings {
  texts: TextElement[]
  backgroundColor: string
  shape: LogoShape
  padding: number
  animation?: AnimationSettings
  advancedShapeId?: string
  gradient?: GradientSettings
}

// グラデーションタイプ
export type GradientType = "none" | "linear" | "radial"

// グラデーション方向
export type GradientDirection =
  | "to-right"
  | "to-left"
  | "to-bottom"
  | "to-top"
  | "to-bottom-right"
  | "to-bottom-left"
  | "to-top-right"
  | "to-top-left"

// グラデーション設定
export interface GradientSettings {
  type: GradientType
  direction: GradientDirection
  startColor: string
  endColor: string
}

// 高度なシェイプ
export interface AdvancedShape {
  id: string
  name: string
  svg: string
  category: string
  tags?: string[]
}

// テンプレート
export interface LogoTemplate {
  id: string
  name: string
  svg: string
  settings: LogoSettings
  category: string
  tags?: string[]
}

