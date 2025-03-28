"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type {
  GradientSettings,
  GradientType,
  GradientDirection,
} from "@/types";
import { useTranslations } from "next-intl";

interface GradientSettingsProps {
  gradient: GradientSettings;
  onChange: (gradient: GradientSettings) => void;
  onDisable: () => void;
}

export function GradientSettingsComponent({
  gradient,
  onChange,
  onDisable,
}: GradientSettingsProps) {
  const t = useTranslations("GradientSettings");
  const [enabled, setEnabled] = useState(gradient.type !== "none");

  // グラデーションタイプのオプション
  const gradientTypes: { value: GradientType; label: string }[] = [
    { value: "linear", label: t("types.linear") },
    { value: "radial", label: t("types.radial") },
  ];

  // グラデーション方向のオプション
  const gradientDirections: { value: GradientDirection; label: string }[] = [
    { value: "to-right", label: t("directions.toRight") },
    { value: "to-left", label: t("directions.toLeft") },
    { value: "to-bottom", label: t("directions.toBottom") },
    { value: "to-top", label: t("directions.toTop") },
    { value: "to-bottom-right", label: t("directions.toBottomRight") },
    { value: "to-bottom-left", label: t("directions.toBottomLeft") },
    { value: "to-top-right", label: t("directions.toTopRight") },
    { value: "to-top-left", label: t("directions.toTopLeft") },
  ];

  // グラデーションの有効/無効を切り替え
  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    if (checked) {
      onChange({
        ...gradient,
        type: "linear",
      });
    } else {
      onDisable();
    }
  };

  // グラデーションタイプを変更
  const handleTypeChange = (type: GradientType) => {
    onChange({
      ...gradient,
      type,
    });
  };

  // グラデーション方向を変更
  const handleDirectionChange = (direction: GradientDirection) => {
    onChange({
      ...gradient,
      direction,
    });
  };

  // 開始色を変更
  const handleStartColorChange = (color: string) => {
    onChange({
      ...gradient,
      startColor: color,
    });
  };

  // 終了色を変更
  const handleEndColorChange = (color: string) => {
    onChange({
      ...gradient,
      endColor: color,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="gradient-toggle"
          checked={enabled}
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-blue-500"
        />
        <Label htmlFor="gradient-toggle" className="text-gray-300">
          {t("enableGradient")}
        </Label>
      </div>

      {enabled && (
        <>
          <div className="space-y-2">
            <Label htmlFor="gradient-type" className="text-gray-300">
              {t("gradientType")}
            </Label>
            <Select
              value={gradient.type}
              onValueChange={(value) => handleTypeChange(value as GradientType)}
            >
              <SelectTrigger
                id="gradient-type"
                className="bg-gray-900/50 border-gray-700 text-white"
              >
                <SelectValue placeholder={t("selectGradientType")} />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {gradientTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {gradient.type === "linear" && (
            <div className="space-y-2">
              <Label htmlFor="gradient-direction" className="text-gray-300">
                {t("gradientDirection")}
              </Label>
              <Select
                value={gradient.direction}
                onValueChange={(value) =>
                  handleDirectionChange(value as GradientDirection)
                }
              >
                <SelectTrigger
                  id="gradient-direction"
                  className="bg-gray-900/50 border-gray-700 text-white"
                >
                  <SelectValue placeholder={t("selectDirection")} />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {gradientDirections.map((direction) => (
                    <SelectItem key={direction.value} value={direction.value}>
                      {direction.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-color" className="text-gray-300">
                {t("startColor")}
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="start-color"
                  type="color"
                  value={gradient.startColor}
                  onChange={(e) => handleStartColorChange(e.target.value)}
                  className="w-12 h-10 p-1 bg-transparent"
                />
                <Input
                  value={gradient.startColor}
                  onChange={(e) => handleStartColorChange(e.target.value)}
                  className="font-mono bg-gray-900/50 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-color" className="text-gray-300">
                {t("endColor")}
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="end-color"
                  type="color"
                  value={gradient.endColor}
                  onChange={(e) => handleEndColorChange(e.target.value)}
                  className="w-12 h-10 p-1 bg-transparent"
                />
                <Input
                  value={gradient.endColor}
                  onChange={(e) => handleEndColorChange(e.target.value)}
                  className="font-mono bg-gray-900/50 border-gray-700 text-white"
                />
              </div>
            </div>
          </div>

          <div className="mt-2 p-3 rounded-md bg-gray-900/50 border border-gray-700">
            <Label className="text-gray-300 block mb-2">{t("preview")}</Label>
            <div
              className="h-10 rounded-md"
              style={{
                background:
                  gradient.type === "linear"
                    ? `linear-gradient(${gradient.direction.replace(
                        "to-",
                        "to "
                      )}, ${gradient.startColor}, ${gradient.endColor})`
                    : `radial-gradient(circle, ${gradient.startColor}, ${gradient.endColor})`,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
