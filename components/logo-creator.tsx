"use client";
import { useTranslations } from "next-intl";
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
import LogoPreview from "./logo-preview";
import { shapeGalleryItems } from "./shapes/galleryItems";

// デフォルトのアニメーション設定
const defaultAnimationSettings: AnimationSettings = {
  type: "none",
  duration: 2,
  delay: 0,
  easing: "ease",
  direction: "normal",
  iterations: "infinite",
};

// props型定義を追加
interface LogoCreatorProps {
  creationMode: "manual" | "ai" | "template";
  settings?: LogoSettings | null;
  onSelectLogo?: (settings: LogoSettings) => void;
}

export default function LogoCreator({
  creationMode = "manual",
  settings: propSettings = null,
  onSelectLogo,
}: LogoCreatorProps) {
  // LogoCreator関数内で、showAdvancedShapesModalステートの定義
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

  const t = useTranslations("LogoCreator");
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

  // 状態管理 - propsから初期値を設定
  const [settings, setSettings] = useState<LogoSettings>(
    propSettings || {
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
    }
  );

  // propSettingsが変更されたら内部のstateを更新
  useEffect(() => {
    if (propSettings) {
      setSettings(propSettings);
    }
  }, [propSettings]);

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

    // 親コンポーネントに選択されたロゴ設定を通知
    if (onSelectLogo) {
      onSelectLogo(updatedSettings);
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

      // 親コンポーネントに更新を通知
      if (onSelectLogo) {
        onSelectLogo(updatedSettings);
      }
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

      const updatedSettings = {
        ...prev,
        backgroundColor: bg,
        texts: updatedTexts,
      };

      // 親コンポーネントに更新を通知
      if (onSelectLogo) {
        onSelectLogo(updatedSettings);
      }

      return updatedSettings;
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

      const updatedSettings = {
        ...prev,
        texts: updatedTexts,
      };

      // 親コンポーネントに更新を通知
      if (onSelectLogo) {
        onSelectLogo(updatedSettings);
      }

      return updatedSettings;
    });
  };

  // アニメーション設定変更ハンドラー
  const handleAnimationChange = (animation: AnimationSettings) => {
    setSettings((prev) => {
      const updatedSettings = {
        ...prev,
        animation,
      };

      // 親コンポーネントに更新を通知
      if (onSelectLogo) {
        onSelectLogo(updatedSettings);
      }

      return updatedSettings;
    });
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
      let updatedSettings: LogoSettings;

      // シェイプが変更され、新しいシェイプが「advanced」でない場合は、advancedShapeIdをリセット
      if (key === "shape" && value !== "advanced") {
        updatedSettings = { ...prev, [key]: value, advancedShapeId: undefined };
      } else {
        updatedSettings = { ...prev, [key]: value };
      }

      // 親コンポーネントに更新を通知
      if (onSelectLogo) {
        onSelectLogo(updatedSettings);
      }

      return updatedSettings;
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

    setSettings((prev) => {
      const updatedSettings = {
        ...prev,
        texts: [...prev.texts, newText],
      };

      // 親コンポーネントに更新を通知
      if (onSelectLogo) {
        onSelectLogo(updatedSettings);
      }

      return updatedSettings;
    });

    setActiveTextId(newId);
  };

  // テキスト要素を削除
  const removeTextElement = (id: string) => {
    if (settings.texts.length <= 1) return; // 最低1つは残す

    setSettings((prev) => {
      const updatedTexts = prev.texts.filter((t) => t.id !== id);
      // 削除後、最初のテキスト要素をアクティブに
      if (activeTextId === id && updatedTexts.length > 0) {
        setActiveTextId(updatedTexts[0].id);
      }

      const updatedSettings = {
        ...prev,
        texts: updatedTexts,
      };

      // 親コンポーネントに更新を通知
      if (onSelectLogo) {
        onSelectLogo(updatedSettings);
      }

      return updatedSettings;
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

    // 親コンポーネントに更新を通知
    if (onSelectLogo) {
      onSelectLogo(updatedSettings);
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

      const updatedSettings = {
        ...prev,
        texts: updatedTexts,
      };

      // 親コンポーネントに更新を通知
      if (onSelectLogo) {
        onSelectLogo(updatedSettings);
      }

      return updatedSettings;
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
      }
      return [...prev, { name: fontFamily, url: fontUrl }];
    });
  };

  // LogoCreator関数のreturn部分を更新
  return (
    <div className="space-y-8">
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
                      {t("template_gallery")}
                    </h2>
                    <Button
                      variant="ghost"
                      onClick={() => setShowTemplates(false)}
                      className="text-gray-300 hover:text-white"
                    >
                      {t("close")}
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
                      {t("advanced_shape_gallery")}
                    </h2>
                    <Button
                      variant="ghost"
                      onClick={() => setShowAdvancedShapes(false)}
                      className="text-gray-300 hover:text-white"
                    >
                      {t("close")}
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
                    {t("advanced_shape_gallery")}
                  </h2>
                  <Button
                    variant="ghost"
                    onClick={() => setShowAdvancedShapesModal(false)}
                    className="text-gray-300 hover:text-white"
                  >
                    {t("close")}
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
                      {t("text")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="colors"
                      className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
                    >
                      {t("colors")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="shape"
                      className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400"
                    >
                      {t("shape")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="animation"
                      className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                    >
                      {t("animation")}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="text" className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-gray-300">
                        {t("text_elements")}
                      </Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addTextElement}
                        disabled={settings.texts.length >= 3}
                        className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300"
                      >
                        <Plus className="h-4 w-4 mr-1" /> {t("add_text")}
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
                        {t("text")}
                      </Label>
                      <Input
                        id="logo-text"
                        value={activeText.text}
                        onChange={(e) =>
                          handleTextChange("text", e.target.value)
                        }
                        placeholder={t("enter_text")}
                        className="bg-gray-900/50 border-gray-700 text-white"
                      />
                    </div>

                    {/* テキスト設定用の内部タブを追加 */}
                    <Tabs defaultValue="basic" className="mt-4">
                      <TabsList className="bg-gray-900/70 w-full">
                        <TabsTrigger value="basic" className="flex-1">
                          {t("basic_settings")}
                        </TabsTrigger>
                        <TabsTrigger value="layout" className="flex-1">
                          {t("layout")}
                        </TabsTrigger>
                        <TabsTrigger value="font" className="flex-1">
                          {t("font")}
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="basic" className="space-y-4 mt-4">
                        {/* TabsContent value="text" 内の基本設定タブの中のフォント選択部分を更新 */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="font-family"
                            className="text-gray-300"
                          >
                            {t("font")}
                          </Label>
                          <select
                            id="font-family"
                            value={activeText.fontFamily}
                            onChange={(e) =>
                              handleTextChange("fontFamily", e.target.value)
                            }
                            className="w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-white"
                          >
                            <optgroup label={t("standard_fonts")}>
                              {fontOptions.map((font) => (
                                <option key={font} value={font}>
                                  {font}
                                </option>
                              ))}
                            </optgroup>
                            {customFonts.length > 0 && (
                              <optgroup label={t("custom_fonts")}>
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
                            {t("font_size")}: {activeText.fontSize}px
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
                            {t("vertical_position")}: {activeText.offsetY}px
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
                            {t("upload_custom_font")}
                          </h3>
                          <FontUploader onFontUpload={handleFontUpload} />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </TabsContent>

                  <TabsContent value="colors" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="text-color" className="text-gray-300">
                        {t("text_color")}
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
                        {t("background_color")}
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
                      <Label className="text-gray-300">{t("gradient")}</Label>
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
                      <Label className="text-gray-300">
                        {t("color_presets")}
                      </Label>
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
                            {t(preset.name.toLowerCase())}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="shape" className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">{t("shape")}</Label>
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
                              {t(shape.name)}
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
                            {t("no_shape")}
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
                        {t("open_advanced_shape_gallery")}
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="padding" className="text-gray-300">
                        {t("padding")}: {settings.padding}px
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

                    <div className="border-t border-gray-700 my-4" />

                    {/* シェイプアニメーション設定 */}
                    <AnimationSettingsComponent
                      animation={settings.animation || defaultAnimationSettings}
                      onChange={handleAnimationChange}
                      onPreview={() => {}}
                      isPreviewPlaying={isPreviewPlaying}
                      togglePreview={togglePreview}
                      elementType="shape"
                    />

                    <div className="border-t border-gray-700 my-4" />

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
                onApplySettings={(newSettings) => {
                  setSettings(newSettings);
                  if (onSelectLogo) {
                    onSelectLogo(newSettings);
                  }
                }}
              />
            </div>
            <div className="w-full aspect-square flex items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden border border-white/10 shadow-xl">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* 背景グリッド */}
                <div className="absolute inset-0 bg-[#111] opacity-50" />

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
                {t("export")}
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
                {copied ? t("copy_completed") : t("copy_svg_code")}
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* AIモードの場合はAILogoGeneratorを表示 */}
      {creationMode === "ai" && (
        <AILogoGenerator
          onSelectLogo={(logoSettings) => {
            if (onSelectLogo) {
              onSelectLogo(logoSettings);
            }
          }}
        />
      )}

      {/* テンプレートモードの場合はLogoTemplatesを表示 */}
      {creationMode === "template" && (
        <Card className="border border-white/10 bg-black/40 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-pink-400" />
                <h2 className="text-xl font-semibold text-white">
                  {t("template_gallery")}
                </h2>
              </div>
              <LogoTemplates
                onSelectTemplate={(templateSettings) => {
                  selectTemplate(templateSettings);
                }}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
