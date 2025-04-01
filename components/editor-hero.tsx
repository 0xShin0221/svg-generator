"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layers, Save, Sparkles, Wand2 } from "lucide-react";
import { LogoTemplates } from "@/components/logo-templates";
import { AILogoGenerator } from "@/components/ai-logo-generator";
import LogoCreator from "@/components/logo-creator";
import ErrorBoundary from "@/components/error-boundary";
import type { LogoSettings } from "@/types";

export default function EditorHero() {
  const [creationMode, setCreationMode] = useState<
    "manual" | "ai" | "template"
  >("manual");
  const [settings, setSettings] = useState<LogoSettings | null>(null);

  // テンプレート選択ハンドラー
  const selectTemplate = (templateSettings: LogoSettings) => {
    setSettings(templateSettings);
    setCreationMode("manual");
  };

  // 保存/読み込みダイアログを開く
  const openSaveLoadDialog = () => {
    console.log("Open save/load dialog");
    // 実際の実装では、LogoCreatorコンポーネントへの参照または
    // グローバル状態管理を使用して制御
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
      <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-8">
        プロフェッショナルなロゴエディタ
      </h2>
      <p className="text-center text-gray-300 max-w-3xl mx-auto mb-8">
        直感的なインターフェースで、デザインの知識がなくても美しいロゴを作成できます。
        シェイプ、テキスト、色、アニメーションなど、あらゆる要素をカスタマイズ可能です。
      </p>

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
            手動作成
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
            AI生成
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
            テンプレート
          </Button>
        </div>
      </div>

      {/* 保存/読み込みボタン - 常に表示 */}
      <div className="w-full max-w-3xl mx-auto flex justify-end mt-4 mb-8">
        <Button
          onClick={openSaveLoadDialog}
          variant="secondary"
          className="gap-2 bg-slate-700 hover:bg-slate-600 text-white border-slate-500"
        >
          <Save className="h-4 w-4" />
          保存/読み込み
        </Button>
      </div>

      {/* エディタコンテナ */}
      <div className="relative rounded-lg overflow-hidden border border-slate-600 shadow-xl shadow-blue-500/5">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5" />
        <ErrorBoundary>
          <LogoCreator
            creationMode={creationMode}
            settings={settings}
            onSelectLogo={setSettings}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}
