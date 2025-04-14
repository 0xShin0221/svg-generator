import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextLayoutSettings } from "@/components/text-layout-settings";
import { TextEffects } from "@/components/text-effects";
import { FontUploader } from "@/components/font-uploader";
import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLogo } from "../context/logo-context";

export const TextTab: React.FC = () => {
  const t = useTranslations("LogoCreator");
  const {
    settings,
    activeTextId,
    setActiveTextId,
    activeText,
    updateTextElement,
    addTextElement,
    removeTextElement,
    addCustomFont,
    customFonts,
    handleTextLayoutChange,
  } = useLogo();

  // Standard font options
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

  // Combined font options (standard + custom)
  const allFontOptions = [
    ...fontOptions,
    ...customFonts.map((font) => font.name),
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <Label className="text-gray-300">{t("text_elements")}</Label>
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

      {/* Text Elements Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {settings.texts.map((textItem) => (
          <div key={textItem.id} className="flex items-center">
            <Button
              variant={activeTextId === textItem.id ? "default" : "outline"}
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

      {/* Text Content Input */}
      <div className="space-y-2">
        <Label htmlFor="logo-text" className="text-gray-300">
          {t("text")}
        </Label>
        <Input
          id="logo-text"
          value={activeText.text}
          onChange={(e) =>
            updateTextElement(activeTextId, { text: e.target.value })
          }
          placeholder={t("enter_text")}
          className="bg-gray-900/50 border-gray-700 text-white"
        />
      </div>

      {/* Text Settings Tabs */}
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

        {/* Basic Settings Tab */}
        <TabsContent value="basic" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="font-family" className="text-gray-300">
              {t("font")}
            </Label>
            <select
              id="font-family"
              value={activeText.fontFamily}
              onChange={(e) =>
                updateTextElement(activeTextId, { fontFamily: e.target.value })
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
                updateTextElement(activeTextId, { fontSize: value[0] })
              }
              className="py-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="text-offset" className="text-gray-300">
              {t("vertical_position")}: {activeText.offsetY}px
            </Label>
            <Slider
              id="text-offset"
              min={-100}
              max={100}
              step={1}
              value={[activeText.offsetY]}
              onValueChange={(value) =>
                updateTextElement(activeTextId, { offsetY: value[0] })
              }
              className="py-2"
            />
          </div>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout" className="space-y-4 mt-4">
          <TextLayoutSettings
            activeText={activeText}
            onLayoutChange={(layoutOptions) =>
              handleTextLayoutChange(layoutOptions)
            }
          />

          <div className="mt-6 border-t border-gray-700 pt-4">
            <TextEffects
              onApply={(layoutOptions) => handleTextLayoutChange(layoutOptions)}
            />
          </div>
        </TabsContent>

        {/* Font Tab */}
        <TabsContent value="font" className="space-y-4 mt-4">
          <div className="mt-6 border-t border-gray-700 pt-4">
            <h3 className="text-sm font-medium text-gray-300 mb-3">
              {t("upload_custom_font")}
            </h3>
            <FontUploader
              onFontUpload={(fontFamily, fontUrl) => {
                addCustomFont(fontFamily, fontUrl);
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
