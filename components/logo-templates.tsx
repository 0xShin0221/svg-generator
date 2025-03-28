"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type { LogoTemplate } from "@/types"
import { motion } from "framer-motion"

// カテゴリー
const categories = [
  { id: "all", name: "すべて" },
  { id: "business", name: "ビジネス" },
  { id: "tech", name: "テクノロジー" },
  { id: "creative", name: "クリエイティブ" },
  { id: "minimal", name: "ミニマル" },
  { id: "colorful", name: "カラフル" },
  { id: "monochrome", name: "モノクローム" },
  { id: "industry", name: "業種別" },
  { id: "animated", name: "アニメーション" },
]

// テンプレートデータ
const templates: LogoTemplate[] = [
  // ビジネステンプレート
  {
    id: "business-1",
    name: "プロフェッショナルサークル",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="100" fill="#0f172a"/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="48">CORP</text>
    </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "CORP",
          color: "#ffffff",
          fontSize: 48,
          fontFamily: "Arial",
          offsetY: 0,
          animation: "none",
        },
      ],
      backgroundColor: "#0f172a",
      shape: "circle",
      padding: 20,
      animation: "none",
      animationDuration: 2,
    },
    category: "business",
    tags: ["企業", "プロフェッショナル", "シンプル"],
  },

  // テクノロジーテンプレート
  {
    id: "tech-1",
    name: "テックブルー",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="200" fill="#0c4a6e"/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#38bdf8" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="44">TECH</text>
    </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "TECH",
          color: "#38bdf8",
          fontSize: 44,
          fontFamily: "Arial",
          offsetY: 0,
          animation: "none",
        },
      ],
      backgroundColor: "#0c4a6e",
      shape: "square",
      padding: 20,
      animation: "none",
      animationDuration: 2,
    },
    category: "tech",
    tags: ["テクノロジー", "IT", "デジタル"],
  },

  // 複数テキスト例
  {
    id: "multi-text-1",
    name: "メイン＆サブテキスト",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="100" fill="#0891b2"/>
      <text x="50%" y="40%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="48">BRAND</text>
      <text x="50%" y="70%" dominantBaseline="middle" textAnchor="middle" fill="#e0f2fe" fontFamily="Georgia, serif" fontSize="20">TAGLINE</text>
    </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "BRAND",
          color: "#ffffff",
          fontSize: 48,
          fontFamily: "Arial",
          offsetY: -20,
          animation: "none",
        },
        {
          id: "sub",
          text: "TAGLINE",
          color: "#e0f2fe",
          fontSize: 20,
          fontFamily: "Georgia",
          offsetY: 30,
          animation: "none",
        },
      ],
      backgroundColor: "#0891b2",
      shape: "circle",
      padding: 20,
      animation: "none",
      animationDuration: 2,
    },
    category: "business",
    tags: ["複数テキスト", "タグライン", "ブランド"],
  },

  // アニメーションテンプレート
  {
    id: "animated-1",
    name: "回転スター",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,0 125,70 200,70 140,115 160,190 100,150 40,190 60,115 0,70 75,70" fill="#f59e0b"/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontFamily="Impact, sans-serif" fontWeight="bold" fontSize="32">STAR</text>
    </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "STAR",
          color: "#ffffff",
          fontSize: 32,
          fontFamily: "Impact",
          offsetY: 0,
          animation: "none",
        },
      ],
      backgroundColor: "#f59e0b",
      shape: "star",
      padding: 20,
      animation: "rotate",
      animationDuration: 5,
    },
    category: "animated",
    tags: ["回転", "アニメーション", "星"],
  },
  {
    id: "animated-2",
    name: "パルステキスト",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="200" rx="20" ry="20" fill="#8b5cf6"/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="42">PULSE</text>
    </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "PULSE",
          color: "#ffffff",
          fontSize: 42,
          fontFamily: "Arial",
          offsetY: 0,
          animation: "pulse",
          animationDuration: 2,
        },
      ],
      backgroundColor: "#8b5cf6",
      shape: "rounded-square",
      padding: 20,
      animation: "none",
      animationDuration: 2,
    },
    category: "animated",
    tags: ["パルス", "アニメーション", "テキスト"],
  },
  {
    id: "animated-3",
    name: "バウンスロゴ",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="100" fill="#059669"/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="42">BOUNCE</text>
    </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "BOUNCE",
          color: "#ffffff",
          fontSize: 42,
          fontFamily: "Arial",
          offsetY: 0,
          animation: "bounce",
          animationDuration: 1.5,
        },
      ],
      backgroundColor: "#059669",
      shape: "circle",
      padding: 20,
      animation: "none",
      animationDuration: 2,
    },
    category: "animated",
    tags: ["バウンス", "アニメーション", "動き"],
  },

  // 複数テキスト＆アニメーション
  {
    id: "animated-4",
    name: "フェード＆スライド",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="200" fill="#0f172a"/>
      <text x="50%" y="40%" dominantBaseline="middle" textAnchor="middle" fill="#38bdf8" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="36">FADE</text>
      <text x="50%" y="70%" dominantBaseline="middle" textAnchor="middle" fill="#e0f2fe" fontFamily="Georgia, serif" fontSize="24">SLIDE</text>
    </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "FADE",
          color: "#38bdf8",
          fontSize: 36,
          fontFamily: "Arial",
          offsetY: -20,
          animation: "fade",
          animationDuration: 3,
        },
        {
          id: "sub",
          text: "SLIDE",
          color: "#e0f2fe",
          fontSize: 24,
          fontFamily: "Georgia",
          offsetY: 30,
          animation: "slide",
          animationDuration: 2,
        },
      ],
      backgroundColor: "#0f172a",
      shape: "square",
      padding: 20,
      animation: "none",
      animationDuration: 2,
    },
    category: "animated",
    tags: ["フェード", "スライド", "複数アニメーション"],
  },

  // 高度なシェイプテンプレート
  {
    id: "advanced-1",
    name: "抽象ブロブ",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M50,0 C60,40 100,50 70,80 C90,100 60,100 50,80 C40,100 10,100 30,80 C0,50 40,40 50,0 Z" fill="#be185d"/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="32">BLOB</text>
    </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "BLOB",
          color: "#ffffff",
          fontSize: 32,
          fontFamily: "Arial",
          offsetY: 0,
          animation: "none",
        },
      ],
      backgroundColor: "#be185d",
      shape: "advanced",
      padding: 20,
      animation: "none",
      animationDuration: 2,
      advancedShapeId: "abstract-blob",
    },
    category: "creative",
    tags: ["抽象", "有機的", "ブロブ"],
  },
  {
    id: "advanced-2",
    name: "ネットワークテック",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g fill="#0c4a6e">
        <circle cx="40" cy="40" r="20" />
        <circle cx="160" cy="40" r="20" />
        <circle cx="40" cy="160" r="20" />
        <circle cx="160" cy="160" r="20" />
        <circle cx="100" cy="100" r="30" />
        <path d="M40,40 L100,100 L160,40 M40,160 L100,100 L160,160" fill="none" stroke="#0c4a6e" strokeWidth="6" />
      </g>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="24">NETWORK</text>
    </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "NETWORK",
          color: "#ffffff",
          fontSize: 24,
          fontFamily: "Arial",
          offsetY: 0,
          animation: "none",
        },
      ],
      backgroundColor: "#0c4a6e",
      shape: "advanced",
      padding: 20,
      animation: "none",
      animationDuration: 2,
      advancedShapeId: "tech-network",
    },
    category: "tech",
    tags: ["ネットワーク", "テクノロジー", "接続"],
  },

  // 新しいアニメーションテンプレート
  {
    id: "animated-flip",
    name: "フリップロゴ",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="200" rx="20" ry="20" fill="#0f766e"/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="42">FLIP</text>
    </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "FLIP",
          color: "#ffffff",
          fontSize: 42,
          fontFamily: "Arial",
          offsetY: 0,
          animation: "none",
        },
      ],
      backgroundColor: "#0f766e",
      shape: "rounded-square",
      padding: 20,
      animation: "flip",
      animationDuration: 3,
    },
    category: "animated",
    tags: ["フリップ", "アニメーション", "3D"],
  },
  {
    id: "animated-shake",
    name: "シェイクロゴ",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,0 125,70 200,70 140,115 160,190 100,150 40,190 60,115 0,70 75,70" fill="#d946ef"/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontFamily="Impact, sans-serif" fontWeight="bold" fontSize="32">SHAKE</text>
    </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "SHAKE",
          color: "#ffffff",
          fontSize: 32,
          fontFamily: "Impact",
          offsetY: 0,
          animation: "none",
        },
      ],
      backgroundColor: "#d946ef",
      shape: "star",
      padding: 20,
      animation: "shake",
      animationDuration: 1,
    },
    category: "animated",
    tags: ["シェイク", "アニメーション", "振動"],
  },
  {
    id: "animated-float",
    name: "フロートロゴ",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M50,0 C60,40 100,50 70,80 C90,100 60,100 50,80 C40,100 10,100 30,80 C0,50 40,40 50,0 Z" fill="#3b82f6"/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontFamily="Georgia, serif" fontWeight="bold" fontSize="32">FLOAT</text>
    </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "FLOAT",
          color: "#ffffff",
          fontSize: 32,
          fontFamily: "Georgia",
          offsetY: 0,
          animation: "none",
        },
      ],
      backgroundColor: "#3b82f6",
      shape: "advanced",
      padding: 20,
      animation: "float",
      animationDuration: 4,
      advancedShapeId: "abstract-blob",
    },
    category: "animated",
    tags: ["フロート", "アニメーション", "浮遊"],
  },

  // 高度なシェイプテンプレート
  {
    id: "advanced-tech-circuit",
    name: "テックサーキット",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M20,20 L80,20 L80,40 L40,40 L40,60 L80,60 L80,80 L20,80 L20,60 L60,60 L60,40 L20,40 Z" fill="#0f172a"/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#38bdf8" fontFamily="Courier New, monospace" fontWeight="bold" fontSize="24">TECH</text>
    </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "TECH",
          color: "#38bdf8",
          fontSize: 24,
          fontFamily: "Courier New",
          offsetY: 0,
          animation: "none",
        },
      ],
      backgroundColor: "#0f172a",
      shape: "advanced",
      padding: 20,
      animation: "none",
      animationDuration: 2,
      advancedShapeId: "tech-circuit",
    },
    category: "tech",
    tags: ["回路", "テクノロジー", "デジタル"],
  },
  {
    id: "advanced-nature-flower",
    name: "フラワーロゴ",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M50,30 C60,10 80,10 90,30 C110,20 110,40 90,50 C110,60 110,80 90,70 C80,90 60,90 50,70 C40,90 20,90 10,70 C-10,80 -10,60 10,50 C-10,40 -10,20 10,30 C20,10 40,10 50,30 Z" fill="#16a34a"/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontFamily="Georgia, serif" fontWeight="bold" fontSize="28">BLOOM</text>
    </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "BLOOM",
          color: "#ffffff",
          fontSize: 28,
          fontFamily: "Georgia",
          offsetY: 0,
          animation: "none",
        },
      ],
      backgroundColor: "#16a34a",
      shape: "advanced",
      padding: 20,
      animation: "none",
      animationDuration: 2,
      advancedShapeId: "nature-flower",
    },
    category: "nature",
    tags: ["花", "自然", "成長"],
  },
  {
    id: "advanced-artistic-brush",
    name: "アートブラシ",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,50 C30,20 50,80 70,30 C90,10 90,90 30,90 C10,70 30,40 10,50 Z" fill="#be185d"/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontFamily="Georgia, serif" fontWeight="bold" fontSize="28">ART</text>
    </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "ART",
          color: "#ffffff",
          fontSize: 28,
          fontFamily: "Georgia",
          offsetY: 0,
          animation: "none",
        },
      ],
      backgroundColor: "#be185d",
      shape: "advanced",
      padding: 20,
      animation: "none",
      animationDuration: 2,
      advancedShapeId: "artistic-brush",
    },
    category: "creative",
    tags: ["ブラシ", "アート", "クリエイティブ"],
  },

  // 複数テキスト＆高度なシェイプ＆アニメーション
  {
    id: "advanced-combo",
    name: "クリエイティブコンボ",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M50,0 C80,0 100,20 100,50 C100,80 80,100 50,100 C20,100 0,80 0,50 C0,20 20,0 50,0 Z M50,0 C20,30 20,70 50,100" fill="#8b5cf6"/>
      <text x="50%" y="40%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="32">DESIGN</text>
      <text x="50%" y="70%" dominantBaseline="middle" textAnchor="middle" fill="#e0f2fe" fontFamily="Georgia, serif" fontSize="18">CREATIVE</text>
    </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "DESIGN",
          color: "#ffffff",
          fontSize: 32,
          fontFamily: "Arial",
          offsetY: -20,
          animation: "fade",
        },
        {
          id: "sub",
          text: "CREATIVE",
          color: "#e0f2fe",
          fontSize: 18,
          fontFamily: "Georgia",
          offsetY: 30,
          animation: "slide",
        },
      ],
      backgroundColor: "#8b5cf6",
      shape: "advanced",
      padding: 20,
      animation: "pulse",
      animationDuration: 3,
      advancedShapeId: "nature-leaf",
    },
    category: "creative",
    tags: ["複合", "アニメーション", "クリエイティブ"],
  },
  // テンプレートデータに新しいプロフェッショナルなテンプレートを追加
  {
    id: "professional-1",
    name: "モダンミニマル",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="200" height="200" rx="10" ry="10" fill="#1e293b"/>
    <text x="50%" y="40%" dominantBaseline="middle" textAnchor="middle" fill="#f8fafc" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="36">BRAND</text>
    <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="#94a3b8" fontFamily="Arial, sans-serif" fontSize="18">STUDIO</text>
  </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "BRAND",
          color: "#f8fafc",
          fontSize: 36,
          fontFamily: "Arial",
          offsetY: -20,
          animation: { type: "none", duration: 2, delay: 0, easing: "ease", direction: "normal", iterations: 1 },
          layout: { alignment: "center", rotation: 0, letterSpacing: 2, lineHeight: 1.2 },
        },
        {
          id: "sub",
          text: "STUDIO",
          color: "#94a3b8",
          fontSize: 18,
          fontFamily: "Arial",
          offsetY: 20,
          animation: { type: "none", duration: 2, delay: 0, easing: "ease", direction: "normal", iterations: 1 },
          layout: { alignment: "center", rotation: 0, letterSpacing: 4, lineHeight: 1.2 },
        },
      ],
      backgroundColor: "#1e293b",
      shape: "rounded-square",
      padding: 20,
      animation: { type: "none", duration: 2, delay: 0, easing: "ease", direction: "normal", iterations: 1 },
      gradient: {
        type: "none",
        direction: "to-right",
        startColor: "#1e293b",
        endColor: "#1e293b",
      },
    },
    category: "minimal",
    tags: ["モダン", "ミニマル", "プロフェッショナル"],
  },
  {
    id: "professional-2",
    name: "クリエイティブエージェンシー",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="200" height="200" fill="#0f172a"/>
    <path d="M40,60 L160,60 L160,140 L40,140 Z" fill="none" stroke="#60a5fa" strokeWidth="4"/>
    <text x="50%" y="45%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="32">CREATIVE</text>
    <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fill="#60a5fa" fontFamily="Arial, sans-serif" fontSize="16">AGENCY</text>
  </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "CREATIVE",
          color: "#ffffff",
          fontSize: 32,
          fontFamily: "Arial",
          offsetY: -15,
          animation: { type: "none", duration: 2, delay: 0, easing: "ease", direction: "normal", iterations: 1 },
          layout: { alignment: "center", rotation: 0, letterSpacing: 2, lineHeight: 1.2 },
        },
        {
          id: "sub",
          text: "AGENCY",
          color: "#60a5fa",
          fontSize: 16,
          fontFamily: "Arial",
          offsetY: 15,
          animation: { type: "none", duration: 2, delay: 0, easing: "ease", direction: "normal", iterations: 1 },
          layout: { alignment: "center", rotation: 0, letterSpacing: 4, lineHeight: 1.2 },
        },
      ],
      backgroundColor: "#0f172a",
      shape: "advanced",
      padding: 20,
      animation: { type: "none", duration: 2, delay: 0, easing: "ease", direction: "normal", iterations: 1 },
      advancedShapeId: "brand-frame",
      gradient: {
        type: "none",
        direction: "to-right",
        startColor: "#0f172a",
        endColor: "#0f172a",
      },
    },
    category: "creative",
    tags: ["エージェンシー", "クリエイティブ", "洗練"],
  },
  {
    id: "professional-3",
    name: "グラデーションテック",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="200" height="200" fill="url(#grad)"/>
    <text x="50%" y="40%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="36">TECH</text>
    <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="16" letterSpacing="4">SOLUTIONS</text>
  </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "TECH",
          color: "#ffffff",
          fontSize: 36,
          fontFamily: "Arial",
          offsetY: -20,
          animation: { type: "none", duration: 2, delay: 0, easing: "ease", direction: "normal", iterations: 1 },
          layout: { alignment: "center", rotation: 0, letterSpacing: 0, lineHeight: 1.2 },
        },
        {
          id: "sub",
          text: "SOLUTIONS",
          color: "#ffffff",
          fontSize: 16,
          fontFamily: "Arial",
          offsetY: 20,
          animation: { type: "none", duration: 2, delay: 0, easing: "ease", direction: "normal", iterations: 1 },
          layout: { alignment: "center", rotation: 0, letterSpacing: 4, lineHeight: 1.2 },
        },
      ],
      backgroundColor: "#3b82f6",
      shape: "square",
      padding: 20,
      animation: { type: "none", duration: 2, delay: 0, easing: "ease", direction: "normal", iterations: 1 },
      gradient: {
        type: "linear",
        direction: "to-bottom-right",
        startColor: "#3b82f6",
        endColor: "#8b5cf6",
      },
    },
    category: "tech",
    tags: ["テクノロジー", "グラデーション", "モダン"],
  },
  {
    id: "professional-4",
    name: "デザインスタジオ",
    svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="100" fill="#18181b"/>
    <text x="50%" y="45%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontFamily="Georgia, serif" fontWeight="bold" fontSize="32">design</text>
    <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fill="#d4d4d8" fontFamily="Georgia, serif" fontSize="18">studio</text>
    <circle cx="100" cy="100" r="70" fill="none" stroke="#d4d4d8" strokeWidth="1" />
  </svg>`,
    settings: {
      texts: [
        {
          id: "main",
          text: "design",
          color: "#ffffff",
          fontSize: 32,
          fontFamily: "Georgia",
          offsetY: -15,
          animation: { type: "none", duration: 2, delay: 0, easing: "ease", direction: "normal", iterations: 1 },
          layout: { alignment: "center", rotation: 0, letterSpacing: 1, lineHeight: 1.2 },
        },
        {
          id: "sub",
          text: "studio",
          color: "#d4d4d8",
          fontSize: 18,
          fontFamily: "Georgia",
          offsetY: 15,
          animation: { type: "none", duration: 2, delay: 0, easing: "ease", direction: "normal", iterations: 1 },
          layout: { alignment: "center", rotation: 0, letterSpacing: 3, lineHeight: 1.2 },
        },
      ],
      backgroundColor: "#18181b",
      shape: "circle",
      padding: 20,
      animation: { type: "none", duration: 2, delay: 0, easing: "ease", direction: "normal", iterations: 1 },
      advancedShapeId: "decorative-frame",
      gradient: {
        type: "none",
        direction: "to-right",
        startColor: "#18181b",
        endColor: "#18181b",
      },
    },
    category: "creative",
    tags: ["デザイン", "スタジオ", "エレガント"],
  },
]

export function LogoTemplates({ onSelectTemplate }: { onSelectTemplate: (LogoSettings) => void }) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // 検索フィルター
  const filterTemplates = (templates: LogoTemplate[]) => {
    if (!searchTerm) return templates
    return templates.filter(
      (template) =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }

  // カテゴリーでフィルタリング
  const filteredTemplates =
    activeCategory === "all" ? templates : templates.filter((template) => template.category === activeCategory)

  // 検索とカテゴリーでフィルタリングされたテンプレート
  const displayTemplates = filterTemplates(filteredTemplates)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="テンプレートを検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 bg-gray-900/50 border-gray-700 text-white"
          />
        </div>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="flex flex-wrap h-auto bg-gray-900/50">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {displayTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden border border-gray-700 bg-gray-800/50 hover:bg-gray-800/80 transition-all hover:shadow-lg hover:shadow-blue-500/10 group">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 rounded-md mb-3 p-4 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        <div dangerouslySetInnerHTML={{ __html: template.svg }} />
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-gray-700 bg-gray-800/80 hover:bg-blue-500/20 hover:border-blue-500/50 text-gray-300 hover:text-blue-300 transition-all"
                        onClick={() => onSelectTemplate(template.settings)}
                      >
                        {template.name}を使用
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

