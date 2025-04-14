import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GradientSettingsComponent } from "@/components/gradient-settings";
import { useTranslations } from "next-intl";
import { useLogo } from "../context/logo-context";

export const ColorsTab: React.FC = () => {
  const t = useTranslations("LogoCreator");
  const {
    settings,
    activeTextId,
    updateTextElement,
    updateSettingsPartial,
    applyColorPreset,
  } = useLogo();

  // Color presets
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

  // Find active text element
  const activeText =
    settings.texts.find((t) => t.id === activeTextId) || settings.texts[0];

  return (
    <div className="space-y-4">
      {/* Text Color */}
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
              updateTextElement(activeTextId, { color: e.target.value })
            }
            className="w-12 h-10 p-1 bg-transparent"
          />
          <Input
            value={activeText.color}
            onChange={(e) =>
              updateTextElement(activeTextId, { color: e.target.value })
            }
            className="font-mono bg-gray-900/50 border-gray-700 text-white"
          />
        </div>
      </div>

      {/* Background Color */}
      <div className="space-y-2">
        <Label htmlFor="background-color" className="text-gray-300">
          {t("background_color")}
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="background-color"
            type="color"
            value={settings.backgroundColor}
            onChange={(e) =>
              updateSettingsPartial("backgroundColor", e.target.value)
            }
            className="w-12 h-10 p-1 bg-transparent"
          />
          <Input
            value={settings.backgroundColor}
            onChange={(e) =>
              updateSettingsPartial("backgroundColor", e.target.value)
            }
            className="font-mono bg-gray-900/50 border-gray-700 text-white"
          />
        </div>
      </div>

      {/* Gradient Settings */}
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
          onChange={(gradient) => updateSettingsPartial("gradient", gradient)}
          onDisable={() => {
            updateSettingsPartial("gradient", {
              ...settings.gradient!,
              type: "none",
            });
          }}
        />
      </div>

      {/* Color Presets */}
      <div className="space-y-2">
        <Label className="text-gray-300">{t("color_presets")}</Label>
        <div className="grid grid-cols-4 gap-2">
          {colorPresets.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-10 p-1 w-full border-gray-700 hover:border-gray-500"
              onClick={() => applyColorPreset(preset.bg, preset.text)}
              style={{
                backgroundColor: preset.bg,
                color: preset.text,
                border: preset.bg === "#ffffff" ? "1px solid #374151" : "",
              }}
            >
              {t(preset.name.toLowerCase())}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
