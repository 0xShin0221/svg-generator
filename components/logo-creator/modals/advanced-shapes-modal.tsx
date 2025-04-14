import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layers } from "lucide-react";
import { useTranslations } from "next-intl";
import { AdvancedShapes } from "@/components/advanced-shapes";
import { useLogo } from "../context/logo-context";

interface AdvancedShapesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AdvancedShapesModal: React.FC<AdvancedShapesModalProps> = ({
  open,
  onOpenChange,
}) => {
  const t = useTranslations("LogoCreator");
  const { selectAdvancedShape } = useLogo();

  if (!open) return null;

  return (
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
              onClick={() => onOpenChange(false)}
              className="text-gray-300 hover:text-white"
            >
              {t("close")}
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            <AdvancedShapes
              onSelectShape={(shapeId) => {
                selectAdvancedShape(shapeId);
                onOpenChange(false);
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
