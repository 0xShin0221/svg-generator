"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Loader2, ArrowRight, Wand2, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { LogoSettings } from "@/types";
import { useTranslations } from "next-intl";

// Mock AI logo generation results
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
];

interface AILogoGeneratorProps {
  onSelectLogo: (settings: LogoSettings) => void;
}

export function AILogoGenerator({ onSelectLogo }: AILogoGeneratorProps) {
  const t = useTranslations("LogoCreator");

  // Show Coming Soon message instead of the actual functionality
  return (
    <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">
              {t("ai_generator")}
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">{t("coming_soon")}</h3>
            <p className="text-gray-400 max-w-md">
              {t("ai_generator_coming_soon_message")}
            </p>

            {/* <Button
              variant="outline"
              className="mt-4 border-white/10 bg-white/5 hover:bg-white/10 text-blue-400"
            >
              {t("notify_on_release")}
            </Button> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
