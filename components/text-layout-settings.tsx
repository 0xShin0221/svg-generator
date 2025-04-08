"use client";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  RotateCcw,
} from "lucide-react";
import type { TextElement, TextLayoutOptions } from "@/types";
import { useTranslations } from "next-intl";

interface TextLayoutSettingsProps {
  activeText: TextElement;
  onLayoutChange: (options: Partial<TextLayoutOptions>) => void;
}

export function TextLayoutSettings({
  activeText,
  onLayoutChange,
}: TextLayoutSettingsProps) {
  const t = useTranslations("LogoCreator");

  // Get current layout settings
  const layout = activeText.layout || {
    alignment: "center",
    rotation: 0,
    letterSpacing: 0,
    lineHeight: 1.2,
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-gray-300">{t("alignment")}</Label>
        <RadioGroup
          value={layout.alignment}
          onValueChange={(value) =>
            onLayoutChange({
              alignment: value as "left" | "center" | "right" | "justify",
            })
          }
          className="flex items-center space-x-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="left"
              id="align-left"
              className="border-gray-600 text-blue-400"
            />
            <Label
              htmlFor="align-left"
              className="cursor-pointer　text-gray-300"
            >
              <AlignLeft className="h-5 w-5" />
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="center"
              id="align-center"
              className="border-gray-600 text-blue-400"
            />
            <Label
              htmlFor="align-center"
              className="cursor-pointer　text-gray-300"
            >
              <AlignCenter className="h-5 w-5" />
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="right"
              id="align-right"
              className="border-gray-600 text-blue-400"
            />
            <Label
              htmlFor="align-right"
              className="cursor-pointer　text-gray-300"
            >
              <AlignRight className="h-5 w-5" />
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="justify"
              id="align-justify"
              className="border-gray-600 text-blue-400"
            />
            <Label
              htmlFor="align-justify"
              className="cursor-pointer　text-gray-300"
            >
              <AlignJustify className="h-5 w-5" />
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="text-rotation" className="text-gray-300">
            {t("rotation")}: {layout.rotation}°
          </Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLayoutChange({ rotation: 0 })}
            className="h-6 w-6 p-0 text-gray-400"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        <Slider
          id="text-rotation"
          min={-180}
          max={180}
          step={5}
          value={[layout.rotation]}
          onValueChange={(value) => onLayoutChange({ rotation: value[0] })}
          className="py-2"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="letter-spacing" className="text-gray-300">
          {t("letter_spacing")}: {layout.letterSpacing}px
        </Label>
        <Slider
          id="letter-spacing"
          min={-5}
          max={20}
          step={0.5}
          value={[layout.letterSpacing]}
          onValueChange={(value) => onLayoutChange({ letterSpacing: value[0] })}
          className="py-2"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="line-height" className="text-gray-300">
          {t("line_height")}: {layout.lineHeight}
        </Label>
        <Slider
          id="line-height"
          min={0.8}
          max={2}
          step={0.1}
          value={[layout.lineHeight]}
          onValueChange={(value) => onLayoutChange({ lineHeight: value[0] })}
          className="py-2"
        />
      </div>
    </div>
  );
}
