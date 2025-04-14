"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Layers,
  Save,
  Sparkles,
  Wand2,
  Download,
  Copy,
  Check,
} from "lucide-react";
import LogoCreator from "@/components/logo-creator/index";
import ErrorBoundary from "@/components/error-boundary";
import { useTranslations } from "next-intl";
import type { LogoSettings } from "@/types";
import { SaveLoadDialog } from "@/components/save-load-dialog";
import { ExportDialog } from "@/components/export-dialog";

// デフォルトのロゴ設定
const defaultLogoSettings: LogoSettings = {
  texts: [
    {
      id: "main",
      text: "LOGO",
      color: "#ffffff",
      fontSize: 48,
      fontFamily: "Arial",
      offsetY: 0,
      animation: {
        type: "none",
        duration: 2,
        delay: 0,
        easing: "ease",
        direction: "normal",
        iterations: "infinite",
      },
      layout: {
        alignment: "center",
        rotation: 0,
        letterSpacing: 0,
        lineHeight: 1.2,
      },
    },
  ],
  backgroundColor: "#3b82f6",
  shape: "circle",
  padding: 20,
  animation: {
    type: "none",
    duration: 2,
    delay: 0,
    easing: "ease",
    direction: "normal",
    iterations: "infinite",
  },
  gradient: {
    type: "none",
    direction: "to-right",
    startColor: "#3b82f6",
    endColor: "#8b5cf6",
  },
};

export default function EditorHero() {
  const t = useTranslations("EditorHero");

  const [creationMode, setCreationMode] = useState<
    "manual" | "ai" | "template"
  >("manual");
  const [settings, setSettings] = useState<LogoSettings>(defaultLogoSettings);
  const [showSaveLoadDialog, setShowSaveLoadDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  // テンプレート選択ハンドラー
  const selectTemplate = (templateSettings: LogoSettings) => {
    setSettings(templateSettings);
    setCreationMode("manual");
  };

  // 保存/読み込みダイアログを開く
  const openSaveLoadDialog = () => {
    console.log("Opening save/load dialog");
    setShowSaveLoadDialog(true);
  };

  // エクスポートダイアログを開く
  const openExportDialog = () => {
    console.log("Opening export dialog");
    setShowExportDialog(true);
  };

  // SVGコードをクリップボードにコピー
  const copySvgCode = () => {
    console.log("Copying SVG code");
    const svgElement = document.querySelector("svg#logo-preview");
    if (!svgElement) {
      console.error("SVG element not found");
      return;
    }

    try {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      navigator.clipboard.writeText(svgData).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch (error) {
      console.error("Error copying SVG:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
      {/* モード選択タブ */}
      <div className="w-full max-w-3xl mx-auto mb-8">
        <div className="flex gap-2 p-1 bg-slate-800/80 border border-slate-600 rounded-md">
          <Button
            variant={creationMode === "manual" ? "default" : "ghost"}
            className={`flex-1 ${
              creationMode === "manual"
                ? "bg-gradient-to-r from-blue-500/20 to-blue-500/10 text-blue-300"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setCreationMode("manual")}
          >
            <Layers className="h-4 w-4 mr-2" />
            {t("modes.manual")}
          </Button>
          <Button
            variant={creationMode === "ai" ? "default" : "ghost"}
            className={`flex-1 ${
              creationMode === "ai"
                ? "bg-gradient-to-r from-purple-500/20 to-purple-500/10 text-purple-300"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setCreationMode("ai")}
          >
            <Wand2 className="h-4 w-4 mr-2" />
            {t("modes.ai")}
          </Button>
          <Button
            variant={creationMode === "template" ? "default" : "ghost"}
            className={`flex-1 ${
              creationMode === "template"
                ? "bg-gradient-to-r from-pink-500/20 to-pink-500/10 text-pink-300"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setCreationMode("template")}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {t("modes.template")}
          </Button>
        </div>
      </div>

      {/* エディタコンテナ */}
      <div className="relative rounded-lg overflow-hidden border border-slate-600 shadow-xl shadow-blue-500/5 mb-8">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5" />
        <ErrorBoundary>
          <LogoCreator
            creationMode={creationMode}
            settings={settings}
            onSelectLogo={setSettings}
            showSaveLoadDialog={showSaveLoadDialog}
            onSaveLoadDialogChange={setShowSaveLoadDialog}
          />
        </ErrorBoundary>
      </div>

      {/* メインアクションボタン - 下部に目立つように配置 */}
      <div className="w-full max-w-3xl mx-auto px-4 mt-6">
        <div className="flex gap-4 w-full mb-2">
          {/* エクスポートボタン - メインCTA */}
          <Button
            onClick={openExportDialog}
            className="flex-1 gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
            size="lg"
          >
            <Download className="h-5 w-5" />
            {t("actions.export")}
          </Button>

          {/* SVGコピーボタン */}
          <Button
            onClick={copySvgCode}
            variant="outline"
            className="flex-1 gap-2 border-white/10 bg-black/40 hover:bg-white/5 text-gray-300"
            size="lg"
          >
            {copied ? (
              <Check className="h-5 w-5" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
            {copied ? t("actions.copyComplete") : t("actions.copySvg")}
          </Button>
        </div>

        {/* 保存/読み込みボタン - 下部に配置 */}
        <Button
          onClick={openSaveLoadDialog}
          variant="ghost"
          className="w-full gap-2 text-slate-300 hover:bg-white/5 border-white/10"
          size="default"
        >
          <Save className="h-4 w-4" />
          {t("actions.saveLoad")}
        </Button>
      </div>

      {/* エクスポートダイアログ */}
      <ExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        logoPreviewId="logo-preview"
        logoName={settings.texts[0]?.text || "logo"}
      />

      {/* SaveLoadDialog コンポーネント */}
      <SaveLoadDialog
        open={showSaveLoadDialog}
        onOpenChange={setShowSaveLoadDialog}
        currentSettings={settings}
        onLoad={(savedSettings) => setSettings(savedSettings)}
      />
    </div>
  );
}
