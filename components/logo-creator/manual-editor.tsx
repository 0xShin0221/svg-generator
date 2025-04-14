import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HistoryManager } from "../history-manager";
import LogoPreview from "../logo-preview";
import { useTranslations } from "next-intl";
import { useLogo } from "./context/logo-context";
import { TextTab } from "./tabs/text-tab";
import { ColorsTab } from "./tabs/colors-tab";
import { ShapeTab } from "./tabs/shape-tab";
import { AnimationTab } from "./tabs/animation-tab";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Save } from "lucide-react";

interface ManualEditorProps {
  onExport: () => void;
  onSaveLoad: () => void;
}

export const ManualEditor: React.FC<ManualEditorProps> = ({
  onExport,
  onSaveLoad,
}) => {
  const t = useTranslations("LogoCreator");
  const { settings, customFonts, isPreviewPlaying, togglePreview } = useLogo();
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [showAdvancedShapesModal, setShowAdvancedShapesModal] = useState(false);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left side - Editor Panel */}
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

              <TabsContent value="text">
                <TextTab />
              </TabsContent>

              <TabsContent value="colors">
                <ColorsTab />
              </TabsContent>

              <TabsContent value="shape">
                <ShapeTab
                  onOpenAdvancedShapes={() => setShowAdvancedShapesModal(true)}
                />
              </TabsContent>

              <TabsContent value="animation">
                <AnimationTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Right side - Preview Panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex justify-between w-full mb-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onSaveLoad}
              className="flex items-center gap-2 border-gray-700 bg-gray-800/60 hover:bg-gray-700 text-gray-300"
            >
              <Save className="h-4 w-4" />
              {t("save_load")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="flex items-center gap-2 border-gray-700 bg-gray-800/60 hover:bg-gray-700 text-gray-300"
            >
              <Download className="h-4 w-4" />
              {t("export")}
            </Button>
          </div>

          <HistoryManager
            currentSettings={settings}
            onApplySettings={(newSettings) => {
              // This will be handled by the context
            }}
          />
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

      {/* Modals will be rendered by the context provider */}
    </div>
  );
};
