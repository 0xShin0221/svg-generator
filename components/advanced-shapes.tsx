"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight, Check } from "lucide-react"
import type { AdvancedShape } from "@/types"
import { motion } from "framer-motion"

// カテゴリー
const categories = [
  { id: "all", name: "すべて", icon: "🔍" },
  { id: "abstract", name: "抽象", icon: "🎨" },
  { id: "nature", name: "自然", icon: "🌿" },
  { id: "geometric", name: "幾何学", icon: "📐" },
  { id: "decorative", name: "装飾", icon: "✨" },
  { id: "brand", name: "ブランド", icon: "🏷️" },
  { id: "tech", name: "テクノロジー", icon: "💻" },
  { id: "artistic", name: "アート", icon: "🖌️" },
  { id: "animals", name: "動物", icon: "🐾" },
  { id: "food", name: "食べ物", icon: "🍔" },
  { id: "travel", name: "旅行", icon: "✈️" },
  { id: "sports", name: "スポーツ", icon: "🏀" },
]

// 高度なシェイプデータ
export const advancedShapes: AdvancedShape[] = [
  // 抽象シェイプ
  {
    id: "abstract-wave",
    name: "ウェーブ",
    svg: `<path d="M0,50 C25,25 50,75 75,25 C100,0 100,100 100,100 L0,100 Z" fill="currentColor" />`,
    category: "abstract",
    tags: ["波", "流れ", "抽象"],
  },
  {
    id: "abstract-blob",
    name: "ブロブ",
    svg: `<path d="M50,0 C60,40 100,50 70,80 C90,100 60,100 50,80 C40,100 10,100 30,80 C0,50 40,40 50,0 Z" fill="currentColor" />`,
    category: "abstract",
    tags: ["有機的", "流動的", "抽象"],
  },
  {
    id: "abstract-splash",
    name: "スプラッシュ",
    svg: `<path d="M50,0 C70,10 90,30 80,50 C100,70 70,90 50,80 C30,90 0,70 20,50 C10,30 30,10 50,0 Z" fill="currentColor" />`,
    category: "abstract",
    tags: ["飛沫", "水", "抽象"],
  },
  {
    id: "abstract-swirl",
    name: "スワール",
    svg: `<path d="M50,0 C80,20 90,50 70,70 C90,90 50,100 30,80 C10,100 0,60 20,40 C0,20 20,0 50,0 Z" fill="currentColor" />`,
    category: "abstract",
    tags: ["渦巻き", "回転", "抽象"],
  },
  {
    id: "abstract-liquid",
    name: "リキッド",
    svg: `<path d="M0,50 C0,30 20,0 50,0 C80,0 100,30 100,50 C100,70 80,100 50,100 C20,100 0,70 0,50 Z M30,30 C40,20 60,20 70,30 C80,40 80,60 70,70 C60,80 40,80 30,70 C20,60 20,40 30,30 Z" fill="currentColor" />`,
    category: "abstract",
    tags: ["液体", "流動的", "抽象"],
  },
  {
    id: "abstract-nebula",
    name: "ネビュラ",
    svg: `<path d="M50,0 C70,10 90,20 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,20 30,10 50,0 Z M30,30 C20,40 20,60 30,70 C40,80 60,80 70,70 C80,60 80,40 70,30 C60,20 40,20 30,30 Z M50,40 C45,45 45,55 50,60 C55,65 65,65 70,60 C75,55 75,45 70,40 C65,35 55,35 50,40 Z" fill="currentColor" />`,
    category: "abstract",
    tags: ["宇宙", "星雲", "抽象"],
  },
  {
    id: "abstract-flame",
    name: "フレイム",
    svg: `<path d="M50,0 C60,30 80,40 80,60 C80,80 60,100 50,100 C40,100 20,80 20,60 C20,40 40,30 50,0 Z" fill="currentColor" />`,
    category: "abstract",
    tags: ["炎", "火", "抽象"],
  },
  {
    id: "abstract-smoke",
    name: "スモーク",
    svg: `<path d="M50,100 C20,80 0,60 0,40 C0,20 20,0 40,20 C50,0 70,0 80,20 C100,0 100,40 80,60 C100,80 80,100 50,100 Z" fill="currentColor" />`,
    category: "abstract",
    tags: ["煙", "霧", "抽象"],
  },

  // 自然シェイプ
  {
    id: "nature-leaf",
    name: "リーフ",
    svg: `<path d="M50,0 C80,0 100,20 100,50 C100,80 80,100 50,100 C20,100 0,80 0,50 C0,20 20,0 50,0 Z M50,0 C20,30 20,70 50,100" fill="currentColor" />`,
    category: "nature",
    tags: ["葉", "植物", "自然"],
  },
  {
    id: "nature-flower",
    name: "フラワー",
    svg: `<path d="M50,30 C60,10 80,10 90,30 C110,20 110,40 90,50 C110,60 110,80 90,70 C80,90 60,90 50,70 C40,90 20,90 10,70 C-10,80 -10,60 10,50 C-10,40 -10,20 10,30 C20,10 40,10 50,30 Z M50,30 C50,40 50,60 50,70 M30,50 L70,50" fill="currentColor" />`,
    category: "nature",
    tags: ["花", "植物", "自然"],
  },
  {
    id: "nature-tree",
    name: "ツリー",
    svg: `<path d="M50,100 L50,60 M30,60 C10,40 20,10 50,20 C80,10 90,40 70,60 C70,60 30,60 30,60 Z" fill="currentColor" />`,
    category: "nature",
    tags: ["木", "植物", "自然"],
  },
  {
    id: "nature-mountain",
    name: "マウンテン",
    svg: `<path d="M0,100 L30,30 L50,50 L70,20 L100,100 Z" fill="currentColor" />`,
    category: "nature",
    tags: ["山", "風景", "自然"],
  },
  {
    id: "nature-wave-detailed",
    name: "ウェーブ（詳細）",
    svg: `<path d="M0,60 C10,50 20,70 30,60 C40,50 50,70 60,60 C70,50 80,70 90,60 C100,50 100,100 100,100 L0,100 Z" fill="currentColor" />`,
    category: "nature",
    tags: ["波", "海", "自然"],
  },
  {
    id: "nature-sun-rays",
    name: "サンレイ",
    svg: `<circle cx="50" cy="50" r="25" fill="currentColor" />
        <path d="M50,0 L50,15 M50,85 L50,100 M100,50 L85,50 M15,50 L0,50 M85,15 L75,25 M25,75 L15,85 M85,85 L75,75 M25,25 L15,15" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />`,
    category: "nature",
    tags: ["太陽", "光線", "自然"],
  },
  {
    id: "nature-cloud-detailed",
    name: "クラウド（詳細）",
    svg: `<path d="M25,60 C10,60 0,50 0,35 C0,20 15,10 30,15 C35,5 50,0 65,5 C80,10 90,25 85,40 C95,45 100,55 95,65 C90,75 75,75 65,70 C60,80 45,85 30,80 C15,75 15,65 25,60 Z" fill="currentColor" />`,
    category: "nature",
    tags: ["雲", "空", "自然"],
  },
  {
    id: "nature-water-drop",
    name: "ウォータードロップ",
    svg: `<path d="M50,0 C60,30 100,50 100,75 C100,90 75,100 50,100 C25,100 0,90 0,75 C0,50 40,30 50,0 Z" fill="currentColor" />`,
    category: "nature",
    tags: ["水滴", "液体", "自然"],
  },
  {
    id: "nature-grass",
    name: "グラス",
    svg: `<path d="M10,100 C10,70 30,50 30,30 C30,50 40,60 40,100 M50,100 C50,60 60,40 60,20 C60,40 70,60 70,100 M80,100 C80,70 90,50 90,30 C90,50 95,70 95,100" fill="currentColor" />`,
    category: "nature",
    tags: ["草", "植物", "自然"],
  },

  // 幾何学シェイプ
  {
    id: "geometric-spiral",
    name: "スパイラル",
    svg: `<path d="M50,50 m0,-45 a45,45 0 1,1 0,90 a45,45 0 1,1 0,-90 M50,50 m0,-30 a30,30 0 1,0 0,60 a30,30 0 1,0 0,-60 M50,50 m0,-15 a15,15 0 1,1 0,30 a15,15 0 1,1 0,-30" fill="currentColor" />`,
    category: "geometric",
    tags: ["螺旋", "幾何学", "パターン"],
  },
  {
    id: "geometric-maze",
    name: "メイズ",
    svg: `<path d="M20,20 L80,20 L80,40 L40,40 L40,60 L80,60 L80,80 L20,80 L20,60 L60,60 L60,40 L20,40 Z" fill="currentColor" />`,
    category: "geometric",
    tags: ["迷路", "幾何学", "パターン"],
  },
  {
    id: "geometric-diamond-pattern",
    name: "ダイヤモンドパターン",
    svg: `<path d="M50,0 L100,50 L50,100 L0,50 Z M25,50 L50,25 L75,50 L50,75 Z" fill="currentColor" />`,
    category: "geometric",
    tags: ["ダイヤモンド", "幾何学", "パターン"],
  },
  {
    id: "geometric-circles",
    name: "サークルパターン",
    svg: `<circle cx="50" cy="50" r="50" fill="currentColor" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="50" cy="50" r="10" fill="none" stroke="white" strokeWidth="2" />`,
    category: "geometric",
    tags: ["円", "同心円", "幾何学"],
  },
  {
    id: "geometric-triangles",
    name: "トライアングルパターン",
    svg: `<path d="M50,0 L100,100 L0,100 Z" fill="currentColor" />
        <path d="M50,20 L80,80 L20,80 Z" fill="none" stroke="white" strokeWidth="2" />
        <path d="M50,40 L70,70 L30,70 Z" fill="none" stroke="white" strokeWidth="2" />`,
    category: "geometric",
    tags: ["三角形", "幾何学", "パターン"],
  },
  {
    id: "geometric-hexagon-pattern",
    name: "ヘキサゴンパターン",
    svg: `<path d="M50,0 L100,25 L100,75 L50,100 L0,75 L0,25 Z" fill="currentColor" />
        <path d="M50,20 L80,35 L80,65 L50,80 L20,65 L20,35 Z" fill="none" stroke="white" strokeWidth="2" />
        <path d="M50,40 L65,50 L65,70 L50,80 L35,70 L35,50 Z" fill="none" stroke="white" strokeWidth="2" />`,
    category: "geometric",
    tags: ["六角形", "幾何学", "パターン"],
  },
  {
    id: "geometric-grid",
    name: "グリッドパターン",
    svg: `<rect x="0" y="0" width="100" height="100" fill="currentColor" />
        <path d="M25,0 L25,100 M50,0 L50,100 M75,0 L75,100 M0,25 L100,25 M0,50 L100,50 M0,75 L100,75" stroke="white" strokeWidth="2" />`,
    category: "geometric",
    tags: ["グリッド", "幾何学", "パターン"],
  },
  {
    id: "geometric-cube",
    name: "キューブ",
    svg: `<path d="M20,30 L80,30 L80,90 L20,90 Z M20,30 L35,15 L95,15 L80,30 M80,90 L95,75 L95,15 M95,75 L35,75 L20,90 M35,75 L35,15" fill="none" stroke="currentColor" strokeWidth="4" />`,
    category: "geometric",
    tags: ["立方体", "3D", "幾何学"],
  },
  {
    id: "geometric-pyramid",
    name: "ピラミッド",
    svg: `<path d="M50,10 L90,90 L10,90 Z M50,10 L50,90 M50,10 L10,90 M50,10 L90,90" fill="none" stroke="currentColor" strokeWidth="4" />`,
    category: "geometric",
    tags: ["ピラミッド", "3D", "幾何学"],
  },

  // 装飾シェイプ
  {
    id: "decorative-frame",
    name: "フレーム",
    svg: `<path d="M10,10 L90,10 L90,90 L10,90 Z M20,20 L80,20 L80,80 L20,80 Z" fill="currentColor" />
        <path d="M10,10 L20,20 M90,10 L80,20 M10,90 L20,80 M90,90 L80,80" stroke="currentColor" strokeWidth="2" />`,
    category: "decorative",
    tags: ["フレーム", "枠", "装飾"],
  },
  {
    id: "decorative-ornament",
    name: "オーナメント",
    svg: `<path d="M50,0 L60,40 L100,40 L70,60 L80,100 L50,80 L20,100 L30,60 L0,40 L40,40 Z" fill="currentColor" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="white" strokeWidth="2" />`,
    category: "decorative",
    tags: ["オーナメント", "装飾", "星"],
  },
  {
    id: "decorative-ribbon",
    name: "リボン",
    svg: `<path d="M0,40 C20,30 40,50 60,30 C80,10 100,30 100,50 C100,70 80,90 60,70 C40,50 20,70 0,60 Z" fill="currentColor" />`,
    category: "decorative",
    tags: ["リボン", "装飾", "曲線"],
  },
  {
    id: "decorative-crown",
    name: "クラウン",
    svg: `<path d="M10,70 L30,30 L50,50 L70,30 L90,70 L10,70 L10,80 L90,80 L90,70 Z" fill="currentColor" />`,
    category: "decorative",
    tags: ["王冠", "装飾", "ロイヤル"],
  },
  {
    id: "decorative-floral",
    name: "フローラル",
    svg: `<path d="M50,20 C60,10 70,10 80,20 C90,30 90,40 80,50 C90,60 90,70 80,80 C70,90 60,90 50,80 C40,90 30,90 20,80 C10,70 10,60 20,50 C10,40 10,30 20,20 C30,10 40,10 50,20 Z" fill="currentColor" />
        <circle cx="50" cy="50" r="10" fill="white" />`,
    category: "decorative",
    tags: ["花", "装飾", "植物"],
  },
  {
    id: "decorative-vintage-frame",
    name: "ビンテージフレーム",
    svg: `<path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M5,5 L25,5 L25,25 M5,5 L5,25 M95,5 L75,5 L75,25 M95,5 L95,25 M5,95 L25,95 L25,75 M5,95 L5,75 M95,95 L75,95 L75,75 M95,95 L95,75" stroke="currentColor" strokeWidth="2" />`,
    category: "decorative",
    tags: ["ビンテージ", "フレーム", "装飾"],
  },
  {
    id: "decorative-scroll",
    name: "スクロール",
    svg: `<path d="M20,20 C40,0 60,0 80,20 C100,40 100,60 80,80 C60,100 40,100 20,80 C0,60 0,40 20,20 Z M30,30 C40,20 60,20 70,30 C80,40 80,60 70,70 C60,80 40,80 30,70 C20,60 20,40 30,30 Z" fill="currentColor" />
        <path d="M20,50 L30,50 M70,50 L80,50 M50,20 L50,30 M50,70 L50,80" stroke="white" strokeWidth="2" />`,
    category: "decorative",
    tags: ["スクロール", "装飾", "古典"],
  },
  {
    id: "decorative-laurel",
    name: "ローレル",
    svg: `<path d="M50,10 L50,90 M30,20 C10,30 10,50 30,60 M70,20 C90,30 90,50 70,60 M25,30 C15,40 15,50 25,55 M75,30 C85,40 85,50 75,55 M35,25 C25,30 25,40 35,45 M65,25 C75,30 75,40 65,45" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />`,
    category: "decorative",
    tags: ["月桂樹", "勝利", "装飾"],
  },
  {
    id: "decorative-swirl-pattern",
    name: "スワールパターン",
    svg: `<path d="M20,20 C40,0 60,40 40,60 C20,80 60,100 80,80 M80,20 C60,0 40,40 60,60 C80,80 40,100 20,80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />`,
    category: "decorative",
    tags: ["渦巻き", "パターン", "装飾"],
  },

  // ブランドシェイプ
  {
    id: "brand-badge",
    name: "バッジ",
    svg: `<path d="M50,0 L65,15 L85,5 L85,30 L100,45 L85,60 L85,85 L65,75 L50,90 L35,75 L15,85 L15,60 L0,45 L15,30 L15,5 L35,15 Z" fill="currentColor" />`,
    category: "brand",
    tags: ["バッジ", "エンブレム", "ブランド"],
  },
  {
    id: "brand-shield",
    name: "シールド（詳細）",
    svg: `<path d="M50,0 L100,20 L100,60 C100,80 75,100 50,100 C25,100 0,80 0,60 L0,20 Z" fill="currentColor" />
        <path d="M50,10 L85,25 L85,55 C85,70 65,85 50,85 C35,85 15,70 15,55 L15,25 Z" fill="none" stroke="white" strokeWidth="2" />`,
    category: "brand",
    tags: ["シールド", "保護", "ブランド"],
  },
  {
    id: "brand-tag",
    name: "タグ",
    svg: `<path d="M40,0 L100,0 L100,60 L40,100 L0,60 L0,0 Z M75,25 a10,10 0 1,0 0,0.1" fill="currentColor" />`,
    category: "brand",
    tags: ["タグ", "ラベル", "ブランド"],
  },
  {
    id: "brand-stamp",
    name: "スタンプ",
    svg: `<path d="M50,0 C60,0 70,5 75,15 L95,5 L85,25 C95,30 100,40 100,50 C100,60 95,70 85,75 L95,95 L75,85 C70,95 60,100 50,100 C40,100 30,95 25,85 L5,95 L15,75 C5,70 0,60 0,50 C0,40 5,30 15,25 L5,5 L25,15 C30,5 40,0 50,0 Z" fill="currentColor" />`,
    category: "brand",
    tags: ["スタンプ", "シール", "ブランド"],
  },
  {
    id: "brand-diamond-badge",
    name: "ダイヤモンドバッジ",
    svg: `<path d="M50,0 L100,50 L50,100 L0,50 Z" fill="currentColor" />
        <path d="M50,10 L90,50 L50,90 L10,50 Z" fill="none" stroke="white" strokeWidth="2" />`,
    category: "brand",
    tags: ["ダイヤモンド", "バッジ", "ブランド"],
  },
  {
    id: "brand-hexagon-badge",
    name: "ヘキサゴンバッジ",
    svg: `<path d="M50,0 L100,25 L100,75 L50,100 L0,75 L0,25 Z" fill="currentColor" />
        <path d="M50,20 L80,35 L80,65 L50,80 L20,65 L20,35 Z" fill="none" stroke="white" strokeWidth="2" />`,
    category: "brand",
    tags: ["六角形", "バッジ", "ブランド"],
  },
  {
    id: "brand-circle-badge",
    name: "サークルバッジ",
    svg: `<circle cx="50" cy="50" r="50" fill="currentColor" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="2" />`,
    category: "brand",
    tags: ["円", "バッジ", "ブランド"],
  },
  {
    id: "brand-ribbon-badge",
    name: "リボンバッジ",
    svg: `<path d="M10,10 L90,10 L90,70 L50,90 L10,70 Z" fill="currentColor" />
        <path d="M30,30 L70,30 L70,60 L50,70 L30,60 Z" fill="none" stroke="white" strokeWidth="2" />`,
    category: "brand",
    tags: ["リボン", "バッジ", "ブランド"],
  },

  // テクノロジーシェイプ
  {
    id: "tech-circuit",
    name: "サーキット",
    svg: `<path d="M10,10 L40,10 L40,30 L60,30 L60,10 L90,10 L90,40 L70,40 L70,60 L90,60 L90,90 L60,90 L60,70 L40,70 L40,90 L10,90 L10,60 L30,60 L30,40 L10,40 Z" fill="currentColor" />`,
    category: "tech",
    tags: ["回路", "テクノロジー", "電子"],
  },
  {
    id: "tech-code",
    name: "コード",
    svg: `<path d="M30,30 L0,50 L30,70 M70,30 L100,50 L70,70 M40,80 L60,20" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />`,
    category: "tech",
    tags: ["コード", "プログラミング", "テクノロジー"],
  },
  {
    id: "tech-network",
    name: "ネットワーク",
    svg: `<circle cx="20" cy="20" r="10" fill="currentColor" />
        <circle cx="80" cy="20" r="10" fill="currentColor" />
        <circle cx="20" cy="80" r="10" fill="currentColor" />
        <circle cx="80" cy="80" r="10" fill="currentColor" />
        <circle cx="50" cy="50" r="15" fill="  />
        <circle cx="80" cy="80" r="10" fill="currentColor" />
        <circle cx="50" cy="50" r="15" fill="currentColor" />
        <path d="M20,20 L50,50 L80,20 M20,80 L50,50 L80,80" fill="none" stroke="currentColor" strokeWidth="3" />`,
    category: "tech",
    tags: ["ネットワーク", "接続", "テクノロジー"],
  },
  {
    id: "tech-gear",
    name: "ギア",
    svg: `<path d="M50,15 L55,15 L57,30 C62,31 67,33 71,36 L84,28 L87,32 L79,45 C82,49 84,54 85,59 L100,61 L100,66 L85,68 C84,73 82,78 79,82 L87,95 L84,98 L71,90 C67,93 62,95 57,96 L55,111 L50,111 L48,96 C43,95 38,93 34,90 L21,98 L18,95 L26,82 C23,78 21,73 20,68 L5,66 L5,61 L20,59 C21,54 23,49 26,45 L18,32 L21,28 L34,36 C38,33 43,31 48,30 L50,15 Z" fill="currentColor" />
        <circle cx="50" cy="63" r="20" fill="none" stroke="white" strokeWidth="3" />`,
    category: "tech",
    tags: ["歯車", "機械", "テクノロジー"],
  },
  {
    id: "tech-chip",
    name: "チップ",
    svg: `<rect x="20" y="20" width="60" height="60" fill="currentColor" />
        <rect x="30" y="30" width="40" height="40" fill="none" stroke="white" strokeWidth="2" />
        <path d="M10,30 L20,30 M10,50 L20,50 M10,70 L20,70 M30,10 L30,20 M50,10 L50,20 M70,10 L70,20 M80,30 L90,30 M80,50 L90,50 M80,70 L90,70 M30,80 L30,90 M50,80 L50,90 M70,80 L70,90" stroke="currentColor" strokeWidth="4" />`,
    category: "tech",
    tags: ["チップ", "プロセッサ", "テクノロジー"],
  },
  {
    id: "tech-binary",
    name: "バイナリ",
    svg: `<rect x="0" y="0" width="100" height="100" fill="currentColor" />
        <text x="25" y="30" fontFamily="monospace" fontSize="15" fill="white">10</text>
        <text x="55" y="30" fontFamily="monospace" fontSize="15" fill="white">01</text>
        <text x="25" y="50" fontFamily="monospace" fontSize="15" fill="white">01</text>
        <text x="55" y="50" fontFamily="monospace" fontSize="15" fill="white">10</text>
        <text x="25" y="70" fontFamily="monospace" fontSize="15" fill="white">11</text>
        <text x="55" y="70" fontFamily="monospace" fontSize="15" fill="white">00</text>`,
    category: "tech",
    tags: ["バイナリ", "コード", "テクノロジー"],
  },
  {
    id: "tech-wifi",
    name: "WiFi",
    svg: `<path d="M0,70 C30,40 70,40 100,70 M15,85 C30,70 70,70 85,85 M35,95 C40,90 60,90 65,95" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />`,
    category: "tech",
    tags: ["WiFi", "ワイヤレス", "テクノロジー"],
  },
  {
    id: "tech-power",
    name: "パワー",
    svg: `<path d="M50,0 L50,40 M30,20 C10,40 10,70 30,85 C40,95 60,95 70,85 C90,70 90,40 70,20" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />`,
    category: "tech",
    tags: ["電源", "エネルギー", "テクノロジー"],
  },

  // アートシェイプ
  {
    id: "artistic-brush",
    name: "ブラシストローク",
    svg: `<path d="M10,50 C30,20 50,80 70,30 C90,10 90,90 30,90 C10,70 30,40 10,50 Z" fill="currentColor" />`,
    category: "artistic",
    tags: ["ブラシ", "アート", "ペイント"],
  },
  {
    id: "artistic-palette",
    name: "パレット",
    svg: `<path d="M80,10 C100,30 100,70 80,90 C60,100 40,100 20,90 C0,70 0,30 20,10 C40,0 60,0 80,10 Z" fill="currentColor" />
        <circle cx="30" cy="30" r="8" fill="white" />
        <circle cx="70" cy="30" r="8" fill="white" />
        <circle cx="30" cy="70" r="8" fill="white" />
        <circle cx="70" cy="70" r="8" fill="white" />
        <circle cx="50" cy="50" r="10" fill="white" />`,
    category: "artistic",
    tags: ["パレット", "アート", "絵画"],
  },
  {
    id: "artistic-abstract",
    name: "アブストラクト",
    svg: `<path d="M20,20 C40,0 60,40 80,20 C100,0 100,40 80,60 C100,80 80,100 60,80 C40,100 20,80 0,60 C0,40 0,40 20,20 Z" fill="currentColor" />`,
    category: "artistic",
    tags: ["抽象", "アート", "モダン"],
  },
  {
    id: "artistic-cubism",
    name: "キュビズム",
    svg: `<path d="M0,0 L40,0 L30,30 L0,40 Z M60,0 L100,0 L100,40 L70,30 Z M0,60 L30,70 L40,100 L0,100 Z M70,70 L100,60 L100,100 L60,100 Z M30,30 L70,30 L70,70 L30,70 Z" fill="currentColor" />`,
    category: "artistic",
    tags: ["キュビズム", "アート", "幾何学"],
  },
  {
    id: "artistic-graffiti",
    name: "グラフィティ",
    svg: `<path d="M10,50 C20,20 40,20 50,40 C60,20 80,20 90,50 C80,80 60,80 50,60 C40,80 20,80 10,50 Z M30,40 C20,50 20,60 30,70 C40,60 40,50 30,40 Z M70,40 C60,50 60,60 70,70 C80,60 80,50 70,40 Z" fill="currentColor" />`,
    category: "artistic",
    tags: ["グラフィティ", "アート", "ストリート"],
  },
  {
    id: "artistic-origami",
    name: "オリガミ",
    svg: `<path d="M10,10 L90,10 L90,90 L10,90 Z M10,10 L50,50 L10,90 M90,10 L50,50 L90,90 M10,10 L90,10 L50,50 M10,90 L90,90 L50,50" fill="none" stroke="currentColor" strokeWidth="3" />`,
    category: "artistic",
    tags: ["折り紙", "アート", "日本"],
  },
  {
    id: "artistic-minimalist",
    name: "ミニマリスト",
    svg: `<rect x="20" y="20" width="60" height="60" fill="currentColor" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="3" />`,
    category: "artistic",
    tags: ["ミニマル", "アート", "シンプル"],
  },
  {
    id: "artistic-ink",
    name: "インク",
    svg: `<path d="M30,10 C50,30 70,10 70,30 C70,50 30,50 30,70 C30,90 50,90 70,70" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />`,
    category: "artistic",
    tags: ["インク", "書道", "アート"],
  },
  {
    id: "artistic-sketch",
    name: "スケッチ",
    svg: `<path d="M20,20 C30,10 70,10 80,20 C90,30 90,70 80,80 C70,90 30,90 20,80 C10,70 10,30 20,20 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="5,5" />`,
    category: "artistic",
    tags: ["スケッチ", "ドローイング", "アート"],
  },

  // 動物シェイプ
  {
    id: "animal-paw",
    name: "肉球",
    svg: `<circle cx="35" cy="30" r="15" fill="currentColor" /><circle cx="65" cy="30" r="15" fill="currentColor" /><circle cx="20" cy="60" r="15" fill="currentColor" /><circle cx="80" cy="60" r="15" fill="currentColor" /><ellipse cx="50" cy="75" rx="25" ry="20" fill="currentColor" />`,
    category: "animals",
    tags: ["肉球", "動物", "ペット"],
  },
  {
    id: "animal-fish",
    name: "魚",
    svg: `<path d="M20,50 C40,20 80,20 100,50 C80,80 40,80 20,50 Z M0,50 L20,30 L20,70 Z" fill="currentColor" />`,
    category: "animals",
    tags: ["魚", "海", "動物"],
  },
  {
    id: "animal-bird",
    name: "鳥",
    svg: `<path d="M30,30 C50,10 70,30 70,50 C70,70 50,90 30,70 C10,50 10,50 30,30 Z M70,50 L90,30 M70,50 L90,70" fill="currentColor" />`,
    category: "animals",
    tags: ["鳥", "飛行", "動物"],
  },
  {
    id: "animal-butterfly",
    name: "バタフライ",
    svg: `<path d="M50,20 C30,0 0,20 20,50 C0,80 30,100 50,80 M50,20 C70,0 100,20 80,50 C100,80 70,100 50,80 M50,20 L50,80" fill="currentColor" />`,
    category: "animals",
    tags: ["蝶", "昆虫", "動物"],
  },
  {
    id: "animal-cat",
    name: "猫",
    svg: `<path d="M30,30 L10,10 L10,30 M70,30 L90,10 L90,30 M50,40 L50,60 M30,70 C40,80 60,80 70,70 M20,50 C20,70 30,90 50,90 C70,90 80,70 80,50 C80,30 70,20 50,20 C30,20 20,30 20,50 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />`,
    category: "animals",
    tags: ["猫", "ペット", "動物"],
  },
  {
    id: "animal-dog",
    name: "犬",
    svg: `<path d="M20,40 L10,20 L20,10 L40,20 M80,40 L90,20 L80,10 L60,20 M50,40 L50,60 M30,70 C40,80 60,80 70,70 M20,40 C20,70 30,90 50,90 C70,90 80,70 80,40 L70,20 L50,10 L30,20 L20,40 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />`,
    category: "animals",
    tags: ["犬", "ペット", "動物"],
  },
  {
    id: "animal-owl",
    name: "フクロウ",
    svg: `<circle cx="50" cy="50" r="40" fill="currentColor" />
        <circle cx="35" cy="40" r="10" fill="white" />
        <circle cx="65" cy="40" r="10" fill="white" />
        <circle cx="35" cy="40" r="5" fill="black" />
        <circle cx="65" cy="40" r="5" fill="black" />
        <path d="M40,60 C45,65 55,65 60,60" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />`,
    category: "animals",
    tags: ["フクロウ", "鳥", "動物"],
  },
  {
    id: "animal-elephant",
    name: "ゾウ",
    svg: `<path d="M70,40 C80,30 90,40 90,50 C90,60 80,70 70,60 M30,40 C20,30 10,40 10,50 C10,60 20,70 30,60 M20,80 L80,80 C90,60 90,40 80,20 L20,20 C10,40 10,60 20,80 Z" fill="currentColor" />`,
    category: "animals",
    tags: ["ゾウ", "動物", "サファリ"],
  },

  // 食べ物シェイプ
  {
    id: "food-pizza",
    name: "ピザ",
    svg: `<path d="M10,90 L50,10 L90,90 Z" fill="currentColor" />
        <circle cx="40" cy="50" r="5" fill="white" />
        <circle cx="60" cy="50" r="5" fill="white" />
        <circle cx="50" cy="70" r="5" fill="white" />`,
    category: "food",
    tags: ["ピザ", "食べ物", "イタリアン"],
  },
  {
    id: "food-burger",
    name: "ハンバーガー",
    svg: `<path d="M20,40 L80,40 C90,40 90,30 80,30 L20,30 C10,30 10,40 20,40 Z M20,70 L80,70 C90,70 90,60 80,60 L20,60 C10,60 10,70 20,70 Z M10,40 L90,40 L90,60 L10,60 Z" fill="currentColor" />`,
    category: "food",
    tags: ["ハンバーガー", "食べ物", "ファストフード"],
  },
  {
    id: "food-coffee",
    name: "コーヒー",
    svg: `<path d="M20,30 L80,30 L75,80 L25,80 Z M80,30 C90,30 95,40 90,50 L80,50" fill="currentColor" />`,
    category: "food",
    tags: ["コーヒー", "飲み物", "カフェ"],
  },
  {
    id: "food-ice-cream",
    name: "アイスクリーム",
    svg: `<path d="M40,40 C40,20 60,20 60,40 C60,60 50,60 50,90 C50,60 40,60 40,40 Z" fill="currentColor" />`,
    category: "food",
    tags: ["アイスクリーム", "デザート", "食べ物"],
  },
  {
    id: "food-cake",
    name: "ケーキ",
    svg: `<path d="M20,40 L80,40 L80,80 L20,80 Z M20,60 L80,60 M30,30 C30,20 40,20 40,30 M50,30 C50,15 60,15 60,30 M70,30 C70,20 80,20 80,30 M20,40 C10,40 10,50 20,50 M80,40 C90,40 90,50 80,50" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />`,
    category: "food",
    tags: ["ケーキ", "デザート", "食べ物"],
  },
  {
    id: "food-sushi",
    name: "寿司",
    svg: `<path d="M20,40 L80,40 L80,60 L20,60 Z M20,40 C20,30 30,30 40,30 C50,30 60,30 70,30 C80,30 80,40 80,40 M20,60 C20,70 30,70 40,70 C50,70 60,70 70,70 C80,70 80,60 80,60" fill="currentColor" />`,
    category: "food",
    tags: ["寿司", "日本食", "食べ物"],
  },
  {
    id: "food-wine",
    name: "ワイン",
    svg: `<path d="M40,20 L60,20 L65,50 C65,60 60,70 50,70 C40,70 35,60 35,50 Z M50,70 L50,90 M30,90 L70,90" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />`,
    category: "food",
    tags: ["ワイン", "飲み物", "食べ物"],
  },

  // 旅行シェイプ
  {
    id: "travel-plane",
    name: "飛行機",
    svg: `<path d="M50,10 L60,40 L90,50 L60,60 L50,90 L40,60 L10,50 L40,40 Z" fill="currentColor" />`,
    category: "travel",
    tags: ["飛行機", "旅行", "交通"],
  },
  {
    id: "travel-suitcase",
    name: "スーツケース",
    svg: `<path d="M30,30 L70,30 L70,20 C70,10 60,10 60,10 L40,10 C40,10 30,10 30,20 Z M20,30 L80,30 L80,90 L20,90 Z M40,50 L40,70 M60,50 L60,70" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />`,
    category: "travel",
    tags: ["スーツケース", "旅行", "荷物"],
  },
  {
    id: "travel-compass",
    name: "コンパス",
    svg: `<circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="5" />
        <path d="M50,20 L50,30 M50,70 L50,80 M20,50 L30,50 M70,50 L80,50 M40,40 L60,60 M40,60 L60,40" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />`,
    category: "travel",
    tags: ["コンパス", "旅行", "ナビゲーション"],
  },
  {
    id: "travel-map",
    name: "マップ",
    svg: `<path d="M20,20 L40,30 L60,20 L80,30 L80,80 L60,70 L40,80 L20,70 Z M40,30 L40,80 M60,20 L60,70" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />`,
    category: "travel",
    tags: ["マップ", "旅行", "ナビゲーション"],
  },
  {
    id: "travel-mountain-landscape",
    name: "山の風景",
    svg: `<path d="M10,80 L30,40 L50,60 L70,30 L90,80 Z M15,80 L85,80" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />`,
    category: "travel",
    tags: ["山", "風景", "旅行"],
  },
  {
    id: "travel-beach",
    name: "ビーチ",
    svg: `<path d="M10,60 C30,40 70,40 90,60 L90,90 L10,90 Z M70,40 C70,20 60,10 50,10 C40,10 30,20 30,30" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />`,
    category: "travel",
    tags: ["ビーチ", "海", "旅行"],
  },

  // スポーツシェイプ
  {
    id: "sports-ball",
    name: "ボール",
    svg: `<circle cx="50" cy="50" r="40" fill="currentColor" />
        <path d="M20,50 L80,50 M50,20 L50,80 M30,30 C40,40 60,40 70,30 M30,70 C40,60 60,60 70,70" fill="none" stroke="white" strokeWidth="3" />`,
    category: "sports",
    tags: ["ボール", "スポーツ", "サッカー"],
  },
  {
    id: "sports-trophy",
    name: "トロフィー",
    svg: `<path d="M30,20 L70,20 L70,30 L80,30 C90,30 90,40 90,50 C90,60 80,70 70,70 L70,80 C80,85 80,90 70,90 L30,90 C20,90 20,85 30,80 L30,70 C20,70 10,60 10,50 C10,40 10,30 20,30 L30,30 Z" fill="currentColor" />`,
    category: "sports",
    tags: ["トロフィー", "勝利", "スポーツ"],
  },
  {
    id: "sports-medal",
    name: "メダル",
    svg: `<circle cx="50" cy="60" r="30" fill="currentColor" />
        <path d="M35,30 L65,30 M40,10 L60,10 M40,10 L35,30 M60,10 L65,30" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />`,
    category: "sports",
    tags: ["メダル", "勝利", "スポーツ"],
  },
  {
    id: "sports-tennis",
    name: "テニス",
    svg: `<circle cx="50" cy="50" r="40" fill="currentColor" />
        <path d="M20,20 C40,40 40,60 20,80 M80,20 C60,40 60,60 80,80" fill="none" stroke="white" strokeWidth="3" />`,
    category: "sports",
    tags: ["テニス", "ボール", "スポーツ"],
  },
  {
    id: "sports-basketball",
    name: "バスケットボール",
    svg: `<circle cx="50" cy="50" r="40" fill="currentColor" />
        <path d="M20,20 L80,80 M80,20 L20,80 M10,50 L90,50 M50,10 L50,90" fill="none" stroke="white" strokeWidth="3" />`,
    category: "sports",
    tags: ["バスケットボール", "ボール", "スポーツ"],
  },
  {
    id: "sports-baseball",
    name: "野球",
    svg: `<circle cx="50" cy="50" r="40" fill="currentColor" />
        <path d="M25,25 C35,35 35,65 25,75 M75,25 C65,35 65,65 75,75" fill="none" stroke="white" strokeWidth="3" />`,
    category: "sports",
    tags: ["野球", "ボール", "スポーツ"],
  },
]

// 高度なシェイプを取得する関数
export function getAdvancedShapeById(id: string): AdvancedShape | undefined {
  const shape = advancedShapes.find((shape) => shape.id === id)
  if (!shape) {
    console.warn(`Advanced shape with id "${id}" not found`)
  }
  return shape
}

export function AdvancedShapes({ onSelectShape }: { onSelectShape: (shapeId: string) => void }) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedShape, setSelectedShape] = useState<string | null>(null)
  const [hoveredShape, setHoveredShape] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  // 検索フィルター
  const filterShapes = (shapes: AdvancedShape[]) => {
    if (!searchTerm) return shapes
    return shapes.filter(
      (shape) =>
        shape.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shape.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shape.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }

  // カテゴリーでフィルタリング
  const filteredShapes =
    activeCategory === "all" ? advancedShapes : advancedShapes.filter((shape) => shape.category === activeCategory)

  // 検索とカテゴリーでフィルタリングされたシェイプ
  const displayShapes = filterShapes(filteredShapes)

  // スクロール検出
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setIsScrolled(containerRef.current.scrollTop > 10)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // シェイプを選択して親コンポーネントに通知
  const handleSelectShape = (shapeId: string) => {
    setSelectedShape(shapeId)
    onSelectShape(shapeId)
  }

  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      <div
        className={`sticky top-0 z-10 bg-black/80 backdrop-blur-md p-4 ${isScrolled ? "shadow-md shadow-black/50" : ""}`}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="シェイプを検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-white/10 text-white focus:border-blue-500/50"
            />
          </div>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <div className="relative">
            <TabsList className="flex overflow-x-auto pb-2 bg-transparent justify-start w-full">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-blue-500/10 data-[state=active]:text-blue-400 rounded-md min-w-max px-3 py-1.5"
                >
                  <span className="mr-1.5">{category.icon}</span>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-black/80 to-transparent pointer-events-none" />
          </div>
        </Tabs>
      </div>

      <div
        ref={containerRef}
        className="overflow-y-auto flex-1 p-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        {displayShapes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <p>検索結果がありません</p>
            <p className="text-sm mt-2">別のキーワードで検索してください</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {displayShapes.map((shape, index) => (
              <motion.div
                key={shape.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="relative group"
              >
                <Card
                  className={`overflow-hidden border ${selectedShape === shape.id ? "border-blue-500 ring-2 ring-blue-500/30" : "border-white/10"} ${hoveredShape === shape.id ? "border-white/30" : ""} bg-black/40 hover:bg-black/60 transition-all duration-300`}
                  onMouseEnter={() => setHoveredShape(shape.id)}
                  onMouseLeave={() => setHoveredShape(null)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gradient-to-br from-gray-900 to-black rounded-md mb-3 p-4 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <div
                        className="w-full h-full text-blue-400 group-hover:text-blue-300 transition-colors"
                        dangerouslySetInnerHTML={{
                          __html: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${shape.svg}</svg>`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-white font-medium truncate">{shape.name}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSelectShape(shape.id)}
                        className="h-8 w-8 p-0 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                      >
                        {selectedShape === shape.id ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <ArrowRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {shape.tags?.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs px-1.5 py-0.5 bg-blue-500/10 text-blue-300 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

