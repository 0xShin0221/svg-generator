"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { LogoTemplates } from "./logo-templates";
import { AdvancedShapes, getAdvancedShapeById } from "./advanced-shapes";
import type {
  LogoShape,
  LogoSettings,
  TextElement,
  AnimationSettings,
} from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { ExportDialog } from "./export-dialog";
import { SaveLoadDialog } from "./save-load-dialog";
import { GradientSettingsComponent } from "./gradient-settings";
import { AnimationSettingsComponent } from "./animation-settings";
import type { GradientSettings, GradientDirection } from "@/types";
// HistoryManagerコンポーネントをインポート
import { HistoryManager } from "./history-manager";
import { AnimationPresets } from "./animation-presets";
// テキストレイアウト設定をインポート
import { TextLayoutSettings } from "./text-layout-settings";
import type { TextLayoutOptions } from "@/types";
// TextEffects コンポーネントをインポート
import { TextEffects } from "./text-effects";
// 既存のimport文の後に追加
import { FontUploader } from "./font-uploader";
// 既存のimportに追加
import { AILogoGenerator } from "./ai-logo-generator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  Wand2,
  Layers,
  Save,
  Download,
  Copy,
  Check,
  Plus,
  Trash2,
} from "lucide-react";

// シェイプギャラリーのアイテム
const shapeGalleryItems = [
  {
    id: "circle",
    name: "円",
    svg: `<circle cx="50" cy="50" r="50" fill="currentColor" />`,
  },
  {
    id: "square",
    name: "正方形",
    svg: `<rect x="0" y="0" width="100" height="100" fill="currentColor" />`,
  },
  {
    id: "rounded-square",
    name: "角丸正方形",
    svg: `<rect x="0" y="0" width="100" height="100" rx="15" ry="15" fill="currentColor" />`,
  },
  {
    id: "hexagon",
    name: "六角形",
    svg: `<polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="currentColor" />`,
  },
  {
    id: "triangle",
    name: "三角形",
    svg: `<polygon points="50,0 100,100 0,100" fill="currentColor" />`,
  },
  {
    id: "star",
    name: "星",
    svg: `<polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="currentColor" />`,
  },
  {
    id: "shield",
    name: "シールド",
    svg: `<path d="M50,0 L100,20 L100,60 C100,80 75,100 50,100 C25,100 0,80 0,60 L0,20 L50,0 Z" fill="currentColor" />`,
  },
  {
    id: "advanced",
    name: "高度なシェイプ",
    svg: `<path d="M50,0 C60,40 100,50 70,80 C90,100 60,100 50,80 C40,100 10,100 30,80 C0,50 40,40 50,0 Z" fill="currentColor" />`,
  },
];

// デフォルトのアニメーション設定
const defaultAnimationSettings: AnimationSettings = {
  type: "none",
  duration: 2,
  delay: 0,
  easing: "ease",
  direction: "normal",
  iterations: "infinite",
};

export default function LogoCreator() {
  // LogoCreator関数内の先頭に追加
  const [creationMode, setCreationMode] = useState<
    "manual" | "ai" | "template"
  >("manual");
  // LogoCreator関数内で、creationModeステートの後に追加
  const [showAdvancedShapesModal, setShowAdvancedShapesModal] = useState(false);
  // フォントオプション
  const fontOptions = [
    "Arial",
    "Verdana",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Georgia",
    "Trebuchet MS",
    "Impact",
  ];

  // LogoCreator関数内で、fontOptionsの後に追加
  const [customFonts, setCustomFonts] = useState<
    { name: string; url: string }[]
  >([]);

  // fontOptionsを更新して、カスタムフォントを含める
  const allFontOptions = [
    ...fontOptions,
    ...customFonts.map((font) => font.name),
  ];

  // カラープリセット
  const colorPresets = [
    { bg: "#3b82f6", text: "#ffffff", name: "Blue" },
    { bg: "#10b981", text: "#ffffff", name: "Green" },
    { bg: "#ef4444", text: "#ffffff", name: "Red" },
    { bg: "#8b5cf6", text: "#ffffff", name: "Purple" },
    { bg: "#f59e0b", text: "#ffffff", name: "Orange" },
    { bg: "#000000", text: "#ffffff", name: "Black" },
    { bg: "#ffffff", text: "#000000", name: "White" },
    { bg: "#6366f1", text: "#ffffff", name: "Indigo" },
  ];

  // 状態管理
  const [settings, setSettings] = useState<LogoSettings>({
    texts: [
      {
        id: "main",
        text: "LOGO",
        color: "#ffffff",
        fontSize: 48,
        fontFamily: "Arial",
        offsetY: 0,
        animation: { ...defaultAnimationSettings },
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
    animation: { ...defaultAnimationSettings },
    advancedShapeId: undefined,
    gradient: {
      type: "none",
      direction: "to-right",
      startColor: "#3b82f6",
      endColor: "#8b5cf6",
    },
  });

  const [copied, setCopied] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAdvancedShapes, setShowAdvancedShapes] = useState(false);
  const [activeTextId, setActiveTextId] = useState("main");
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showSaveLoadDialog, setShowSaveLoadDialog] = useState(false);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const previewTimerRef = useRef<NodeJS.Timeout | null>(null);

  // アクティブなテキスト要素
  const activeText =
    settings.texts.find((t) => t.id === activeTextId) || settings.texts[0];

  // プレビューの開始/停止
  const togglePreview = () => {
    setIsPreviewPlaying(!isPreviewPlaying);

    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }

    if (!isPreviewPlaying) {
      // プレビューが終了したら自動的に停止する
      const maxDuration =
        Math.max(
          settings.animation?.duration || 0,
          ...settings.texts.map((t) => t.animation?.duration || 0)
        ) *
        1000 *
        2; // 最大持続時間の2倍の時間後に停止

      previewTimerRef.current = setTimeout(() => {
        setIsPreviewPlaying(false);
      }, maxDuration + 1000); // 少し余裕を持たせる
    }
  };

  // コンポーネントのアンマウント時にタイマーをクリア
  useEffect(() => {
    return () => {
      if (previewTimerRef.current) {
        clearTimeout(previewTimerRef.current);
      }
    };
  }, []);

  // テンプレート選択ハンドラー
  const selectTemplate = (templateSettings: LogoSettings) => {
    // アニメーション設定がない場合はデフォルト設定を追加
    const updatedSettings = {
      ...templateSettings,
      animation: templateSettings.animation || { ...defaultAnimationSettings },
      texts: templateSettings.texts.map((text) => ({
        ...text,
        animation: text.animation || { ...defaultAnimationSettings },
      })),
    };

    setSettings(updatedSettings);
    setShowTemplates(false);
    // 最初のテキスト要素をアクティブに
    if (updatedSettings.texts.length > 0) {
      setActiveTextId(updatedSettings.texts[0].id);
    }
  };

  // 高度なシェイプ選択ハンドラー
  const selectAdvancedShape = (shapeId: string) => {
    // 高度なシェイプのデータを取得
    const selectedShape = getAdvancedShapeById(shapeId);

    if (selectedShape) {
      // ディープコピーを作成して確実に状態を更新
      const updatedSettings = {
        ...settings,
        shape: "advanced",
        advancedShapeId: shapeId,
      };

      setSettings(updatedSettings);
      console.log("Advanced shape selected:", shapeId, selectedShape.name);
    } else {
      console.error("Advanced shape not found:", shapeId);
    }

    setShowAdvancedShapesModal(false);
  };

  // カラープリセットを適用
  const applyColorPreset = (bg: string, text: string) => {
    setSettings((prev) => {
      // アクティブなテキスト要素の色を更新
      const updatedTexts = prev.texts.map((t) =>
        t.id === activeTextId ? { ...t, color: text } : t
      );

      return {
        ...prev,
        backgroundColor: bg,
        texts: updatedTexts,
      };
    });
  };

  // テキスト設定変更ハンドラー
  const handleTextChange = (
    key: keyof TextElement,
    value: string | number | AnimationSettings
  ) => {
    setSettings((prev) => {
      const updatedTexts = prev.texts.map((t) =>
        t.id === activeTextId ? { ...t, [key]: value } : t
      );

      return {
        ...prev,
        texts: updatedTexts,
      };
    });
  };

  // アニメーション設定変更ハンドラー
  const handleAnimationChange = (animation: AnimationSettings) => {
    setSettings((prev) => ({
      ...prev,
      animation,
    }));
  };

  // テキストアニメーション設定変更ハンドラー
  const handleTextAnimationChange = (animation: AnimationSettings) => {
    handleTextChange("animation", animation);
  };

  // 設定変更ハンドラーを修正
  const handleChange = <K extends keyof LogoSettings>(
    key: K,
    value: LogoSettings[K]
  ) => {
    setSettings((prev) => {
      // シェイプが変更され、新しいシェイプが「advanced」でない場合は、advancedShapeIdをリセット
      if (key === "shape" && value !== "advanced") {
        return { ...prev, [key]: value, advancedShapeId: undefined };
      }
      return { ...prev, [key]: value };
    });
  };

  // テキスト要素を追加
  const addTextElement = () => {
    const newId = `text-${Date.now()}`;
    const newText: TextElement = {
      id: newId,
      text: "サブテキスト",
      color: "#ffffff",
      fontSize: 24,
      fontFamily: "Arial",
      offsetY: 60,
      animation: { ...defaultAnimationSettings },
    };

    setSettings((prev) => ({
      ...prev,
      texts: [...prev.texts, newText],
    }));

    setActiveTextId(newId);
  };

  // テキスト要素を追加

  // テキスト要素を削除
  const removeTextElement = (id: string) => {
    if (settings.texts.length <= 1) return; // 最低1つは残す

    setSettings((prev) => {
      const updatedTexts = prev.texts.filter((t) => t.id !== id);
      // 削除後、最初のテキスト要素をアクティブに
      if (activeTextId === id && updatedTexts.length > 0) {
        setActiveTextId(updatedTexts[0].id);
      }

      return {
        ...prev,
        texts: updatedTexts,
      };
    });
  };

  // SVGダウンロード
  const downloadSvg = () => {
    const svgElement = document.getElementById("logo-preview");
    if (!svgElement) return;

    try {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${settings.texts[0].text
        .toLowerCase()
        .replace(/\s+/g, "-")}-logo.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("SVGダウンロードエラー:", error);
    }
  };

  // SVGコードをクリップボードにコピー
  const copySvgCode = () => {
    const svgElement = document.getElementById("logo-preview");
    if (!svgElement) return;

    try {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      navigator.clipboard.writeText(svgData).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch (error) {
      console.error("SVGコピーエラー:", error);
    }
  };

  // エクスポートダイアログを開く
  const openExportDialog = () => {
    setShowExportDialog(true);
  };

  // 保存/読み込みダイアログを開く
  const openSaveLoadDialog = () => {
    setShowSaveLoadDialog(true);
  };

  // 保存されたロゴを読み込む
  const loadSavedLogo = (savedSettings: LogoSettings) => {
    // アニメーション設定がない場合はデフォルト設定を追加
    const updatedSettings = {
      ...savedSettings,
      animation: savedSettings.animation || { ...defaultAnimationSettings },
      texts: savedSettings.texts.map((text) => ({
        ...text,
        animation: text.animation || { ...defaultAnimationSettings },
      })),
    };

    setSettings(updatedSettings);
    // 最初のテキスト要素をアクティブに
    if (updatedSettings.texts.length > 0) {
      setActiveTextId(updatedSettings.texts[0].id);
    }
  };

  // テキストレイアウト設定変更ハンドラー
  const handleTextLayoutChange = (
    layoutOptions: Partial<TextLayoutOptions>
  ) => {
    setSettings((prev) => {
      const updatedTexts = prev.texts.map((t) => {
        if (t.id === activeTextId) {
          return {
            ...t,
            layout: {
              ...(t.layout || {
                alignment: "center",
                rotation: 0,
                letterSpacing: 0,
                lineHeight: 1.2,
              }),
              ...layoutOptions,
            },
          };
        }
        return t;
      });

      return {
        ...prev,
        texts: updatedTexts,
      };
    });
  };

  // カスタムフォントのアップロードハンドラー
  const handleFontUpload = (fontFamily: string, fontUrl: string) => {
    // 同じ名前のフォントが既に存在する場合は上書き
    setCustomFonts((prev) => {
      const exists = prev.some((font) => font.name === fontFamily);
      if (exists) {
        return prev.map((font) =>
          font.name === fontFamily ? { name: fontFamily, url: fontUrl } : font
        );
      } else {
        return [...prev, { name: fontFamily, url: fontUrl }];
      }
    });
  };

  // LogoCreator関数のreturn部分を更新
  return (
    <div className="space-y-8">
      {/* モード選択タブ */}
      <Tabs
        value={creationMode}
        onValueChange={(value) =>
          setCreationMode(value as "manual" | "ai" | "template")
        }
        className="w-full max-w-3xl mx-auto"
      >
        <TabsList className="grid grid-cols-3 bg-black/50 border border-white/10 p-1">
          <TabsTrigger
            value="manual"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-blue-500/10 data-[state=active]:text-blue-400 rounded-sm"
          >
            <Layers className="h-4 w-4 mr-2" />
            手動作成
          </TabsTrigger>
          <TabsTrigger
            value="ai"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-purple-500/10 data-[state=active]:text-purple-400 rounded-sm"
          >
            <Wand2 className="h-4 w-4 mr-2" />
            AI生成
          </TabsTrigger>
          <TabsTrigger
            value="template"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/20 data-[state=active]:to-pink-500/10 data-[state=active]:text-pink-400 rounded-sm"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            テンプレート
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="mt-6">
          <AILogoGenerator
            onSelectLogo={(logoSettings) => {
              setSettings(logoSettings);
              setCreationMode("manual");
            }}
          />
        </TabsContent>

        <TabsContent value="template" className="mt-6">
          <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-pink-400" />
                  <h2 className="text-xl font-semibold text-white">
                    テンプレートギャラリー
                  </h2>
                </div>
                <LogoTemplates
                  onSelectTemplate={(templateSettings) => {
                    selectTemplate(templateSettings);
                    setCreationMode("manual");
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 既存のダイアログ */}
      <AnimatePresence>
        {showTemplates && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl max-h-[90vh]"
            >
              <Card className="border border-white/10 bg-black/80 backdrop-blur-md overflow-auto">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                      テンプレートギャラリー
                    </h2>
                    <Button
                      variant="ghost"
                      onClick={() => setShowTemplates(false)}
                      className="text-gray-300 hover:text-white"
                    >
                      閉じる
                    </Button>
                  </div>
                  <LogoTemplates onSelectTemplate={selectTemplate} />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAdvancedShapes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl max-h-[90vh]"
            >
              <Card className="border border-white/10 bg-black/80 backdrop-blur-md overflow-auto">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                      高度なシェイプギャラリー
                    </h2>
                    <Button
                      variant="ghost"
                      onClick={() => setShowAdvancedShapes(false)}
                      className="text-gray-300 hover:text-white"
                    >
                      閉じる
                    </Button>
                  </div>
                  <AdvancedShapes onSelectShape={selectAdvancedShape} />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAdvancedShapesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-lg border border-white/10 bg-black/90"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Layers className="h-5 w-5 text-blue-400" />
                    高度なシェイプギャラリー
                  </h2>
                  <Button
                    variant="ghost"
                    onClick={() => setShowAdvancedShapesModal(false)}
                    className="text-gray-300 hover:text-white"
                  >
                    閉じる
                  </Button>
                </div>
                <div className="flex-1 overflow-hidden">
                  <AdvancedShapes onSelectShape={selectAdvancedShape} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* エクスポートダイアログ */}
      <ExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        logoPreviewId="logo-preview"
        logoName={settings.texts[0]?.text || "logo"}
      />

      {/* 保存/読み込みダイアログ */}
      <SaveLoadDialog
        open={showSaveLoadDialog}
        onOpenChange={setShowSaveLoadDialog}
        currentSettings={settings}
        onLoad={loadSavedLogo}
      />

      {/* クイックアクションボタン - 手動モードの場合のみ表示 */}
      {creationMode === "manual" && (
        <div className="flex justify-center gap-4 my-4">
          <Button
            onClick={() => setCreationMode("template")}
            variant="outline"
            className="gap-2 bg-gray-800/60 hover:bg-pink-900/40 text-gray-300 hover:text-pink-200 border-gray-700 hover:border-pink-800/50"
            size="lg"
          >
            <Sparkles className="h-5 w-5" />
            テンプレートから選ぶ
          </Button>
          <Button
            onClick={() => setCreationMode("ai")}
            variant="outline"
            className="gap-2 bg-gray-800/60 hover:bg-purple-900/40 text-gray-300 hover:text-purple-200 border-gray-700 hover:border-purple-800/50"
            size="lg"
          >
            <Wand2 className="h-5 w-5" />
            AIで生成
          </Button>
          <Button
            onClick={openSaveLoadDialog}
            variant="outline"
            className="gap-2 bg-gray-800/60 hover:bg-blue-900/40 text-gray-300 hover:text-blue-200 border-gray-700 hover:border-blue-800/50"
            size="lg"
          >
            <Save className="h-5 w-5" />
            保存/読み込み
          </Button>
        </div>
      )}
      {/* メインエディタ - 手動モードの場合のみ表示 */}
      {creationMode === "manual" && (
        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-6">
                <Tabs defaultValue="text" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6 bg-black/50 border border-white/10">
                    <TabsTrigger
                      value="text"
                      className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
                    >
                      テキスト
                    </TabsTrigger>
                    <TabsTrigger
                      value="colors"
                      className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
                    >
                      カラー
                    </TabsTrigger>
                    <TabsTrigger
                      value="shape"
                      className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400"
                    >
                      シェイプ
                    </TabsTrigger>
                    <TabsTrigger
                      value="animation"
                      className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                    >
                      アニメーション
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="text" className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-gray-300">テキスト要素</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addTextElement}
                        disabled={settings.texts.length >= 3}
                        className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300"
                      >
                        <Plus className="h-4 w-4 mr-1" /> テキスト追加
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {settings.texts.map((textItem) => (
                        <div key={textItem.id} className="flex items-center">
                          <Button
                            variant={
                              activeTextId === textItem.id
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            className={cn(
                              "mr-1",
                              activeTextId === textItem.id
                                ? "bg-blue-500/20 text-blue-300 border-blue-500/50"
                                : "border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300"
                            )}
                            onClick={() => setActiveTextId(textItem.id)}
                          >
                            {textItem.text.substring(0, 10)}
                            {textItem.text.length > 10 ? "..." : ""}
                          </Button>
                          {settings.texts.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTextElement(textItem.id)}
                              className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="logo-text" className="text-gray-300">
                        テキスト
                      </Label>
                      <Input
                        id="logo-text"
                        value={activeText.text}
                        onChange={(e) =>
                          handleTextChange("text", e.target.value)
                        }
                        placeholder="テキストを入力"
                        className="bg-gray-900/50 border-gray-700 text-white"
                      />
                    </div>

                    {/* テキスト設定用の内部タブを追加 */}
                    <Tabs defaultValue="basic" className="mt-4">
                      <TabsList className="bg-gray-900/70 w-full">
                        <TabsTrigger value="basic" className="flex-1">
                          基本設定
                        </TabsTrigger>
                        <TabsTrigger value="layout" className="flex-1">
                          レイアウト
                        </TabsTrigger>
                        <TabsTrigger value="font" className="flex-1">
                          フォント
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="basic" className="space-y-4 mt-4">
                        {/* TabsContent value="text" 内の基本設定タブの中のフォント選択部分を更新 */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="font-family"
                            className="text-gray-300"
                          >
                            フォント
                          </Label>
                          <select
                            id="font-family"
                            value={activeText.fontFamily}
                            onChange={(e) =>
                              handleTextChange("fontFamily", e.target.value)
                            }
                            className="w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-white"
                          >
                            <optgroup label="標準フォント">
                              {fontOptions.map((font) => (
                                <option key={font} value={font}>
                                  {font}
                                </option>
                              ))}
                            </optgroup>
                            {customFonts.length > 0 && (
                              <optgroup label="カスタムフォント">
                                {customFonts.map((font) => (
                                  <option key={font.name} value={font.name}>
                                    {font.name}
                                  </option>
                                ))}
                              </optgroup>
                            )}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="font-size" className="text-gray-300">
                            フォントサイズ: {activeText.fontSize}px
                          </Label>
                          <Slider
                            id="font-size"
                            min={12}
                            max={120}
                            step={1}
                            value={[activeText.fontSize]}
                            onValueChange={(value) =>
                              handleTextChange("fontSize", value[0])
                            }
                            className="py-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="text-offset"
                            className="text-gray-300"
                          >
                            垂直位置: {activeText.offsetY}px
                          </Label>
                          <Slider
                            id="text-offset"
                            min={-100}
                            max={100}
                            step={1}
                            value={[activeText.offsetY]}
                            onValueChange={(value) =>
                              handleTextChange("offsetY", value[0])
                            }
                            className="py-2"
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="layout" className="space-y-4 mt-4">
                        <TextLayoutSettings
                          activeText={activeText}
                          onLayoutChange={(layoutOptions) =>
                            handleTextLayoutChange(layoutOptions)
                          }
                        />

                        <div className="mt-6 border-t border-gray-700 pt-4">
                          <TextEffects
                            onApply={(layoutOptions) =>
                              handleTextLayoutChange(layoutOptions)
                            }
                          />
                        </div>
                      </TabsContent>
                      <TabsContent value="font" className="space-y-4 mt-4">
                        {/* カスタムフォントアップローダーを追加 */}
                        <div className="mt-6 border-t border-gray-700 pt-4">
                          <h3 className="text-sm font-medium text-gray-300 mb-3">
                            カスタムフォントをアップロード
                          </h3>
                          <FontUploader onFontUpload={handleFontUpload} />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </TabsContent>

                  <TabsContent value="colors" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="text-color" className="text-gray-300">
                        テキストカラー
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="text-color"
                          type="color"
                          value={activeText.color}
                          onChange={(e) =>
                            handleTextChange("color", e.target.value)
                          }
                          className="w-12 h-10 p-1 bg-transparent"
                        />
                        <Input
                          value={activeText.color}
                          onChange={(e) =>
                            handleTextChange("color", e.target.value)
                          }
                          className="font-mono bg-gray-900/50 border-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="background-color"
                        className="text-gray-300"
                      >
                        背景カラー
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="background-color"
                          type="color"
                          value={settings.backgroundColor}
                          onChange={(e) =>
                            handleChange("backgroundColor", e.target.value)
                          }
                          className="w-12 h-10 p-1 bg-transparent"
                        />
                        <Input
                          value={settings.backgroundColor}
                          onChange={(e) =>
                            handleChange("backgroundColor", e.target.value)
                          }
                          className="font-mono bg-gray-900/50 border-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label className="text-gray-300">グラデーション</Label>
                      <GradientSettingsComponent
                        gradient={
                          settings.gradient || {
                            type: "none",
                            direction: "to-right",
                            startColor: settings.backgroundColor,
                            endColor: "#8b5cf6",
                          }
                        }
                        onChange={(gradient) =>
                          handleChange("gradient", gradient)
                        }
                        onDisable={() => {
                          setSettings((prev) => ({
                            ...prev,
                            gradient: {
                              ...prev.gradient!,
                              type: "none",
                            },
                          }));
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">カラープリセット</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {colorPresets.map((preset, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="h-10 p-1 w-full border-gray-700 hover:border-gray-500"
                            onClick={() =>
                              applyColorPreset(preset.bg, preset.text)
                            }
                            style={{
                              backgroundColor: preset.bg,
                              color: preset.text,
                              border:
                                preset.bg === "#ffffff"
                                  ? "1px solid #374151"
                                  : "",
                            }}
                          >
                            {preset.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="shape" className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">シェイプ</Label>
                      <RadioGroup
                        value={settings.shape}
                        onValueChange={(value) =>
                          handleChange("shape", value as LogoShape)
                        }
                        className="grid grid-cols-2 gap-2"
                      >
                        {shapeGalleryItems.map((shape) => (
                          <div
                            key={shape.id}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={shape.id as LogoShape}
                              id={`shape-${shape.id}`}
                              className="border-gray-600 text-blue-400"
                            />
                            <Label
                              htmlFor={`shape-${shape.id}`}
                              className="flex items-center gap-2 text-gray-300 cursor-pointer"
                            >
                              <div
                                className="w-6 h-6 text-blue-400"
                                dangerouslySetInnerHTML={{
                                  __html: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${shape.svg}</svg>`,
                                }}
                              />
                              {shape.name}
                            </Label>
                          </div>
                        ))}
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="none"
                            id="shape-none"
                            className="border-gray-600 text-blue-400"
                          />
                          <Label
                            htmlFor="shape-none"
                            className="text-gray-300 cursor-pointer"
                          >
                            シェイプなし
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    {/* TabsContent value="shape"内のRadioGroupの後に追加 */}
                    <div className="mt-4">
                      <Button
                        onClick={() => setShowAdvancedShapesModal(true)}
                        variant="outline"
                        className="w-full gap-2 border-gray-600 bg-gray-800/60 hover:bg-gray-700 hover:border-gray-500 text-gray-200 transition-colors duration-200"
                      >
                        <Layers className="h-4 w-4 text-blue-400" />
                        高度なシェイプギャラリーを開く
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="padding" className="text-gray-300">
                        パディング: {settings.padding}px
                      </Label>
                      <Slider
                        id="padding"
                        min={0}
                        max={50}
                        step={1}
                        value={[settings.padding]}
                        onValueChange={(value) =>
                          handleChange("padding", value[0])
                        }
                        disabled={settings.shape === "none"}
                        className="py-2"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="animation" className="space-y-6">
                    {/* アニメーションプリセット */}
                    <AnimationPresets
                      onSelect={(shapeAnimation, textAnimations) => {
                        // シェイプアニメーションを適用
                        handleAnimationChange(shapeAnimation);

                        // テキストアニメーションを適用（テキスト数に合わせて）
                        settings.texts.forEach((text, index) => {
                          if (index < textAnimations.length) {
                            setSettings((prev) => {
                              const updatedTexts = [...prev.texts];
                              updatedTexts[index] = {
                                ...updatedTexts[index],
                                animation: textAnimations[index],
                              };
                              return {
                                ...prev,
                                texts: updatedTexts,
                              };
                            });
                          }
                        });

                        // プレビューを開始
                        setIsPreviewPlaying(true);

                        if (previewTimerRef.current) {
                          clearTimeout(previewTimerRef.current);
                        }

                        // 最大持続時間の2倍の時間後に停止
                        const maxDuration =
                          Math.max(
                            shapeAnimation.duration,
                            ...textAnimations.map((a) => a.duration)
                          ) *
                          1000 *
                          2;

                        previewTimerRef.current = setTimeout(() => {
                          setIsPreviewPlaying(false);
                        }, maxDuration + 1000);
                      }}
                    />

                    <div className="border-t border-gray-700 my-4"></div>

                    {/* シェイプアニメーション設定 */}
                    <AnimationSettingsComponent
                      animation={settings.animation || defaultAnimationSettings}
                      onChange={handleAnimationChange}
                      onPreview={() => {}}
                      isPreviewPlaying={isPreviewPlaying}
                      togglePreview={togglePreview}
                      elementType="shape"
                    />

                    <div className="border-t border-gray-700 my-4"></div>

                    {/* テキストアニメーション設定 */}
                    {settings.texts.map((textItem, index) => (
                      <div
                        key={textItem.id}
                        className={activeTextId === textItem.id ? "" : "hidden"}
                      >
                        <AnimationSettingsComponent
                          animation={
                            textItem.animation || defaultAnimationSettings
                          }
                          onChange={handleTextAnimationChange}
                          onPreview={() => {}}
                          isPreviewPlaying={isPreviewPlaying}
                          togglePreview={togglePreview}
                          elementType="text"
                          elementIndex={index}
                          totalElements={settings.texts.length}
                        />
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex justify-end mb-4">
              <HistoryManager
                currentSettings={settings}
                onApplySettings={setSettings}
              />
            </div>
            <div className="w-full aspect-square flex items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden border border-white/10 shadow-xl">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* 背景グリッド */}
                <div className="absolute inset-0 bg-[#111] opacity-50"></div>

                {/* プレビュー */}
                <LogoPreview
                  settings={settings}
                  isPlaying={isPreviewPlaying}
                  customFonts={customFonts}
                />
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <Button
                onClick={openExportDialog}
                className="flex-1 gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                size="lg"
              >
                <Download className="h-5 w-5" />
                エクスポート
              </Button>
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
                {copied ? "コピー完了" : "SVGコードをコピー"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// LogoPreview コンポーネント
function LogoPreview({
  settings,
  isPlaying,
  customFonts = [],
}: {
  settings: LogoSettings;
  isPlaying: boolean;
  customFonts?: { name: string; url: string }[];
}) {
  const {
    texts,
    backgroundColor,
    shape,
    padding,
    animation,
    advancedShapeId,
    gradient,
  } = settings;

  // サイズ計算
  const mainText = texts[0] || { text: "", fontSize: 48 };
  const baseSize = Math.max(
    200,
    mainText.fontSize * 1.5 * Math.max(1, mainText.text.length / 2)
  );
  const size = baseSize + (shape !== "none" ? padding * 2 : 0);

  // アニメーションスタイルを生成
  let animationStyles = "";

  // シェイプアニメーション
  if (animation && animation.type !== "none" && isPlaying) {
    animationStyles += getAnimationStyle(animation, "shape");
  }

  // テキストアニメーション
  texts.forEach((text, index) => {
    if (text.animation && text.animation.type !== "none" && isPlaying) {
      animationStyles += getAnimationStyle(text.animation, `text-${index}`);
    }
  });

  // シェイプ要素を生成
  let shapeElement = null;

  if (shape === "circle") {
    shapeElement = (
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
        fill={
          gradient && gradient.type !== "none"
            ? "url(#gradient)"
            : backgroundColor
        }
        className={
          animation && animation.type !== "none" && isPlaying
            ? "shape-animation"
            : ""
        }
      />
    );
  } else if (shape === "square") {
    shapeElement = (
      <rect
        x="0"
        y="0"
        width={size}
        height={size}
        fill={
          gradient && gradient.type !== "none"
            ? "url(#gradient)"
            : backgroundColor
        }
        className={
          animation && animation.type !== "none" && isPlaying
            ? "shape-animation"
            : ""
        }
      />
    );
  } else if (shape === "rounded-square") {
    shapeElement = (
      <rect
        x="0"
        y="0"
        width={size}
        height={size}
        rx={size / 10}
        ry={size / 10}
        fill={
          gradient && gradient.type !== "none"
            ? "url(#gradient)"
            : backgroundColor
        }
        className={
          animation && animation.type !== "none" && isPlaying
            ? "shape-animation"
            : ""
        }
      />
    );
  } else if (shape === "hexagon") {
    const points = `${size / 2},0 ${size},${size / 4} ${size},${
      (3 * size) / 4
    } ${size / 2},${size} 0,${(3 * size) / 4} 0,${size / 4}`;
    shapeElement = (
      <polygon
        points={points}
        fill={
          gradient && gradient.type !== "none"
            ? "url(#gradient)"
            : backgroundColor
        }
        className={
          animation && animation.type !== "none" && isPlaying
            ? "shape-animation"
            : ""
        }
      />
    );
  } else if (shape === "triangle") {
    shapeElement = (
      <polygon
        points={`${size / 2},0 ${size},${size} 0,${size}`}
        fill={
          gradient && gradient.type !== "none"
            ? "url(#gradient)"
            : backgroundColor
        }
        className={
          animation && animation.type !== "none" && isPlaying
            ? "shape-animation"
            : ""
        }
      />
    );
  } else if (shape === "star") {
    // 星形の頂点を計算
    const center = size / 2;
    const outerRadius = size / 2;
    const innerRadius = size / 4;
    let points = "";

    for (let i = 0; i < 10; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = ((i * 36 - 90) * Math.PI) / 180;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      points += `${x},${y} `;
    }

    shapeElement = (
      <polygon
        points={points.trim()}
        fill={
          gradient && gradient.type !== "none"
            ? "url(#gradient)"
            : backgroundColor
        }
        className={
          animation && animation.type !== "none" && isPlaying
            ? "shape-animation"
            : ""
        }
      />
    );
  } else if (shape === "shield") {
    shapeElement = (
      <path
        d={`M${size / 2},0 L${size},${size / 5} L${size},${
          (3 * size) / 5
        } C${size},${(4 * size) / 5} ${(3 * size) / 4},${size} ${
          size / 2
        },${size} C${size / 4},${size} 0,${(4 * size) / 5} 0,${
          (3 * size) / 5
        } L0,${size / 5} Z`}
        fill={
          gradient && gradient.type !== "none"
            ? "url(#gradient)"
            : backgroundColor
        }
        className={
          animation && animation.type !== "none" && isPlaying
            ? "shape-animation"
            : ""
        }
      />
    );
  } else if (shape === "advanced" && advancedShapeId) {
    // 高度なシェイプの場合は、AdvancedShapesコンポーネントから対応するSVGを取得
    const advancedShape = getAdvancedShapeById(advancedShapeId);
    if (advancedShape) {
      // 実際のSVGパスを使用
      shapeElement = (
        <g
          dangerouslySetInnerHTML={{
            __html: advancedShape.svg.replace(
              /currentColor/g,
              gradient && gradient.type !== "none"
                ? "url(#gradient)"
                : backgroundColor
            ),
          }}
          className={
            animation && animation.type !== "none" && isPlaying
              ? "shape-animation"
              : ""
          }
        />
      );
    }
  }

  // グラデーション方向を角度に変換
  const getGradientRotation = (direction: GradientDirection): number => {
    switch (direction) {
      case "to-right":
        return 90;
      case "to-left":
        return 270;
      case "to-bottom":
        return 180;
      case "to-top":
        return 0;
      case "to-bottom-right":
        return 135;
      case "to-bottom-left":
        return 225;
      case "to-top-right":
        return 45;
      case "to-top-left":
        return 315;
      default:
        return 90;
    }
  };

  // SVG内にスタイルタグを追加してカスタムフォントを定義
  const fontFaceStyles = customFonts
    .map(
      (font) => `
    @font-face {
      font-family: "${font.name}";
      src: url("${font.url}") format("woff2");
      font-weight: normal;
      font-style: normal;
    }
  `
    )
    .join("\n");

  return (
    <svg
      id="logo-preview"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "max-w-full max-h-full drop-shadow-lg",
        shape === "none" && "border border-dashed border-gray-600"
      )}
    >
      {/* グラデーション定義 */}
      {gradient && gradient.type !== "none" && (
        <defs>
          {gradient.type === "linear" ? (
            <linearGradient
              id="gradient"
              gradientTransform={`rotate(${getGradientRotation(
                gradient.direction
              )})`}
            >
              <stop offset="0%" stopColor={gradient.startColor} />
              <stop offset="100%" stopColor={gradient.endColor} />
            </linearGradient>
          ) : (
            <radialGradient id="gradient">
              <stop offset="0%" stopColor={gradient.startColor} />
              <stop offset="100%" stopColor={gradient.endColor} />
            </radialGradient>
          )}
        </defs>
      )}
      <style>
        {fontFaceStyles}
        {animationStyles}
      </style>

      {shape !== "none" && shapeElement}

      {texts.map((textItem, index) => {
        // テキストのレイアウト設定を取得
        const layout = textItem.layout || {
          alignment: "center",
          rotation: 0,
          letterSpacing: 0,
          lineHeight: 1.2,
        };

        // テキストアンカーの設定
        let textAnchor = "middle";
        if (layout.alignment === "left") textAnchor = "start";
        if (layout.alignment === "right") textAnchor = "end";

        return (
          <text
            key={textItem.id}
            x={
              layout.alignment === "left"
                ? "10%"
                : layout.alignment === "right"
                ? "90%"
                : "50%"
            }
            y={`${50 + textItem.offsetY}%`}
            dominantBaseline="middle"
            textAnchor={textAnchor}
            fill={textItem.color}
            fontFamily={`${textItem.fontFamily}, sans-serif`}
            fontWeight="bold"
            fontSize={textItem.fontSize}
            style={{
              letterSpacing: `${layout.letterSpacing}px`,
              lineHeight: layout.lineHeight,
              transform: layout.rotation
                ? `rotate(${layout.rotation}deg)`
                : undefined,
              transformOrigin: "center",
            }}
            className={
              textItem.animation &&
              textItem.animation.type !== "none" &&
              isPlaying
                ? `text-${index}-animation`
                : ""
            }
          >
            {textItem.animation?.type === "typewriter" && isPlaying ? (
              <tspan className="typewriter">{textItem.text}</tspan>
            ) : (
              textItem.text
            )}
          </text>
        );
      })}
    </svg>
  );
}

// アニメーションスタイルを生成する関数
function getAnimationStyle(
  animSettings: AnimationSettings,
  className: string
): string {
  if (animSettings.type === "none") return "";

  // アニメーションのキーフレーム定義
  const keyframes: Record<string, string> = {
    rotate:
      "@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }",
    pulse:
      "@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }",
    bounce:
      "@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }",
    fade: "@keyframes fade { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }",
    slide:
      "@keyframes slide { 0% { transform: translateX(-20px); } 100% { transform: translateX(20px); } }",
    flip: "@keyframes flip { 0% { transform: perspective(400px) rotateY(0); } 100% { transform: perspective(400px) rotateY(360deg); } }",
    shake:
      "@keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 20%, 40%, 60%, 80% { transform: translateX(5px); } }",
    "spin-pulse":
      "@keyframes spin-pulse { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.2); } 100% { transform: rotate(360deg) scale(1); } }",
    float:
      "@keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-10px) rotate(-5deg); } 50% { transform: translateY(0) rotate(0deg); } 75% { transform: translateY(10px) rotate(5deg); } }",
    glitch:
      "@keyframes glitch { 0%, 100% { transform: translate(0); } 20% { transform: translate(-5px, 5px); } 40% { transform: translate(-5px, -5px); } 60% { transform: translate(5px, 5px); } 80% { transform: translate(5px, -5px); } }",
    wave: "@keyframes wave { 0%, 100% { transform: skewX(0deg); } 25% { transform: skewX(10deg); } 50% { transform: skewX(0deg); } 75% { transform: skewX(-10deg); } }",
    morph:
      "@keyframes morph { 0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } 50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; } }",
    draw: "@keyframes draw { 0% { stroke-dashoffset: 1000; } 100% { stroke-dashoffset: 0; } }",
    blur: "@keyframes blur { 0%, 100% { filter: blur(0px); } 50% { filter: blur(4px); } }",
    zoom: "@keyframes zoom { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.5); } }",
    swing:
      "@keyframes swing { 0%, 100% { transform: rotate(0deg); } 20% { transform: rotate(15deg); } 40% { transform: rotate(-10deg); } 60% { transform: rotate(5deg); } 80% { transform: rotate(-5deg); } }",
    vibrate:
      "@keyframes vibrate { 0%, 100% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(-2px, -2px); } 60% { transform: translate(2px, 2px); } 80% { transform: translate(2px, -2px); } }",
    typewriter:
      "@keyframes typewriter { from { width: 0; } to { width: 100%; } }",
    spotlight:
      "@keyframes spotlight { 0%, 100% { filter: drop-shadow(0 0 10px rgba(255,255,255,0.8)); } 50% { filter: drop-shadow(0 0 20px rgba(255,255,255,0.4)); } }",
  };

  // イージング関数のマッピング
  const easingMap: Record<string, string> = {
    linear: "linear",
    ease: "ease",
    "ease-in": "ease-in",
    "ease-out": "ease-out",
    "ease-in-out": "ease-in-out",
    elastic: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    bounce: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    back: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
  };

  // アニメーション方向のマッピング
  const directionMap: Record<string, string> = {
    normal: "normal",
    reverse: "reverse",
    alternate: "alternate",
    "alternate-reverse": "alternate-reverse",
  };

  // 特殊なアニメーションのスタイル
  let specialStyles = "";
  if (animSettings.type === "typewriter") {
    specialStyles = `
    .typewriter {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      border-right: 3px solid;
      width: 0;
      animation: typewriter ${animSettings.duration}s ${
      easingMap[animSettings.easing]
    } ${animSettings.delay}s 1 forwards,
                 blink-caret 0.75s step-end infinite;
    }
    @keyframes blink-caret {
      from, to { border-color: transparent; }
      50% { border-color: white; }
    }
  `;
  }

  // アニメーションプロパティを構築
  const iterations =
    animSettings.iterations === "infinite"
      ? "infinite"
      : animSettings.iterations;
  const animationProps = `${animSettings.type} ${animSettings.duration}s ${
    easingMap[animSettings.easing]
  } ${animSettings.delay}s ${iterations} ${
    directionMap[animSettings.direction]
  }`;

  return `
  ${keyframes[animSettings.type]}
  ${specialStyles}
  .${className}-animation {
    animation: ${animationProps};
    transform-origin: center;
  }
`;
}
