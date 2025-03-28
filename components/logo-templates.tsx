"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { LogoTemplate } from "@/types";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// カテゴリー
const categories = [
  { id: "all", name: "all" },
  { id: "business", name: "business" },
  { id: "tech", name: "tech" },
  { id: "creative", name: "creative" },
  { id: "minimal", name: "minimal" },
  { id: "colorful", name: "colorful" },
  { id: "monochrome", name: "monochrome" },
  { id: "industry", name: "industry" },
  { id: "animated", name: "animated" },
];

// テンプレートデータ
const templates: LogoTemplate[] = [
  // ビジネステンプレート
  {
    id: "business-1",
    name: "professionalCircle",
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
    tags: ["business", "professional", "simple"],
  },

  // テクノロジーテンプレート
  {
    id: "tech-1",
    name: "techBlue",
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
    tags: ["technology", "IT", "digital"],
  },

  // 複数テキスト例
  {
    id: "multi-text-1",
    name: "mainAndSubtext",
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
    tags: ["multipleText", "tagline", "brand"],
  },

  // アニメーションテンプレート
  {
    id: "animated-1",
    name: "rotatingStar",
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
    tags: ["rotating", "animation", "star"],
  },
  // ... その他のテンプレートは同様に国際化IDに変換
  {
    id: "animated-2",
    name: "pulseText",
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
    tags: ["pulse", "animation", "text"],
  },
  // 残りのテンプレートも同様に変換...
];

export function LogoTemplates({
  onSelectTemplate,
}: {
  onSelectTemplate: (LogoSettings) => void;
}) {
  const t = useTranslations("LogoTemplates");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // 検索フィルター
  const filterTemplates = (templates: LogoTemplate[]) => {
    if (!searchTerm) return templates;

    const searchLower = searchTerm.toLowerCase();
    return templates.filter(
      (template) =>
        t(`templates.${template.name}`).toLowerCase().includes(searchLower) ||
        t(`categories.${template.category}`)
          .toLowerCase()
          .includes(searchLower) ||
        template.tags?.some((tag) =>
          t(`tags.${tag}`).toLowerCase().includes(searchLower)
        )
    );
  };

  // カテゴリーでフィルタリング
  const filteredTemplates =
    activeCategory === "all"
      ? templates
      : templates.filter((template) => template.category === activeCategory);

  // 検索とカテゴリーでフィルタリングされたテンプレート
  const displayTemplates = filterTemplates(filteredTemplates);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={t("searchPlaceholder")}
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
              {t(`categories.${category.name}`)}
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
                        <div
                          dangerouslySetInnerHTML={{ __html: template.svg }}
                        />
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-gray-700 bg-gray-800/80 hover:bg-blue-500/20 hover:border-blue-500/50 text-gray-300 hover:text-blue-300 transition-all"
                        onClick={() => onSelectTemplate(template.settings)}
                      >
                        {t("useTemplate", {
                          name: t(`templates.${template.name}`),
                        })}
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
  );
}
