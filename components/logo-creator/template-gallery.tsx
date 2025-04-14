import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Save, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { LogoTemplates } from "../logo-templates";
import LogoPreview from "../logo-preview";
import { useLogo } from "./context/logo-context";

interface TemplateGalleryProps {
  onExport?: () => void;
  onSaveLoad?: () => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  onExport,
  onSaveLoad,
}) => {
  const t = useTranslations("LogoCreator");
  const { settings, updateSettings, customFonts, isPreviewPlaying } = useLogo();

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left side - Templates */}
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
                // Ensure animations are present
                const updatedSettings = {
                  ...templateSettings,
                  animation: templateSettings.animation || {
                    type: "none",
                    duration: 2,
                    delay: 0,
                    easing: "ease",
                    direction: "normal",
                    iterations: "infinite",
                  },
                  texts: templateSettings.texts.map((text) => ({
                    ...text,
                    animation: text.animation || {
                      type: "none",
                      duration: 2,
                      delay: 0,
                      easing: "ease",
                      direction: "normal",
                      iterations: "infinite",
                    },
                  })),
                };

                updateSettings(updatedSettings);
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Right side - Preview */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex justify-end w-full mb-4">
          {(onExport || onSaveLoad) && (
            <div className="flex gap-2">
              {onSaveLoad && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onSaveLoad}
                  className="flex items-center gap-2 border-gray-700 bg-gray-800/60 hover:bg-gray-700 text-gray-300"
                >
                  <Save className="h-4 w-4" />
                  {t("save_load")}
                </Button>
              )}
              {onExport && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onExport}
                  className="flex items-center gap-2 border-gray-700 bg-gray-800/60 hover:bg-gray-700 text-gray-300"
                >
                  <Download className="h-4 w-4" />
                  {t("export")}
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="w-full aspect-square flex items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden border border-white/10 shadow-xl">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background grid */}
            <div className="absolute inset-0 bg-[#111] opacity-50" />

            {/* Preview */}
            <LogoPreview
              settings={settings}
              isPlaying={isPreviewPlaying}
              customFonts={customFonts}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
