import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Layers } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLogo } from "../context/logo-context";
import { shapeGalleryItems } from "@/components/shapes/galleryItems";
import { AdvancedShapesModal } from "../modals/advanced-shapes-modal";
import { useState } from "react";
import type { LogoShape } from "@/types";

interface ShapeTabProps {
  onOpenAdvancedShapes?: () => void;
}

export const ShapeTab: React.FC<ShapeTabProps> = ({ onOpenAdvancedShapes }) => {
  const t = useTranslations("LogoCreator");
  const { settings, updateSettingsPartial } = useLogo();
  const [showAdvancedShapesModal, setShowAdvancedShapesModal] = useState(false);

  const handleOpenAdvancedShapes = () => {
    if (onOpenAdvancedShapes) {
      onOpenAdvancedShapes();
    } else {
      setShowAdvancedShapesModal(true);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-gray-300">{t("shape")}</Label>
        <RadioGroup
          value={settings.shape}
          onValueChange={(value) =>
            updateSettingsPartial("shape", value as LogoShape)
          }
          className="grid grid-cols-2 gap-2"
        >
          {shapeGalleryItems.map((shape) => (
            <div key={shape.id} className="flex items-center space-x-2">
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

      {/* Advanced Shapes Button */}
      <div className="mt-4">
        <Button
          onClick={handleOpenAdvancedShapes}
          variant="outline"
          className="w-full gap-2 border-gray-600 bg-gray-800/60 hover:bg-gray-700 hover:border-gray-500 text-gray-200 transition-colors duration-200"
        >
          <Layers className="h-4 w-4 text-blue-400" />
          {t("open_advanced_shape_gallery")}
        </Button>
      </div>

      {/* Padding Slider */}
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
          onValueChange={(value) => updateSettingsPartial("padding", value[0])}
          disabled={settings.shape === "none"}
          className="py-2"
        />
      </div>

      {/* Advanced Shapes Modal */}
      {showAdvancedShapesModal && (
        <AdvancedShapesModal
          open={showAdvancedShapesModal}
          onOpenChange={setShowAdvancedShapesModal}
        />
      )}
    </div>
  );
};
