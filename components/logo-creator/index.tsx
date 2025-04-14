"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ExportDialog } from "../export-dialog";
import { SaveLoadDialog } from "../save-load-dialog";
import { AILogoGenerator } from "../ai-logo-generator";
import { LogoProvider } from "./context/logo-context";
import { ManualEditor } from "./manual-editor";
import { TemplateGallery } from "./template-gallery";
import type { LogoSettings } from "@/types";

// Define props interface
interface LogoCreatorProps {
  creationMode: "manual" | "ai" | "template";
  settings?: LogoSettings | null;
  onSelectLogo?: (settings: LogoSettings) => void;
  showSaveLoadDialog?: boolean;
  onSaveLoadDialogChange?: (open: boolean) => void;
}

export default function LogoCreator({
  creationMode = "manual",
  settings: propSettings = null,
  onSelectLogo,
  showSaveLoadDialog = false,
  onSaveLoadDialogChange,
}: LogoCreatorProps) {
  const t = useTranslations("LogoCreator");
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [internalShowSaveLoadDialog, setInternalShowSaveLoadDialog] =
    useState(false);

  // Determine which dialog state to use (internal or external)
  const isDialogOpen = onSaveLoadDialogChange
    ? showSaveLoadDialog
    : internalShowSaveLoadDialog;

  const setDialogOpen = (open: boolean) => {
    if (onSaveLoadDialogChange) {
      onSaveLoadDialogChange(open);
    } else {
      setInternalShowSaveLoadDialog(open);
    }
  };

  // Handler for save/load dialog
  const handleSavedLogoLoad = (savedSettings: LogoSettings) => {
    // Ensure animations are present
    const updatedSettings = {
      ...savedSettings,
      animation: savedSettings.animation || {
        type: "none",
        duration: 2,
        delay: 0,
        easing: "ease",
        direction: "normal",
        iterations: "infinite",
      },
      texts: savedSettings.texts.map((text) => ({
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

    // Pass to parent component if provided
    if (onSelectLogo) {
      onSelectLogo(updatedSettings);
    }
  };

  return (
    <LogoProvider initialSettings={propSettings} onSelectLogo={onSelectLogo}>
      <div className="space-y-8">
        {/* Export Dialog */}
        <ExportDialog
          open={showExportDialog}
          onOpenChange={setShowExportDialog}
          logoPreviewId="logo-preview"
          logoName={propSettings?.texts[0]?.text || "logo"}
        />

        {/* Save/Load Dialog */}
        <SaveLoadDialog
          open={isDialogOpen}
          onOpenChange={setDialogOpen}
          currentSettings={propSettings || undefined}
          onLoad={handleSavedLogoLoad}
        />

        {/* Render appropriate editor based on creationMode */}
        {creationMode === "manual" && (
          <ManualEditor
            onExport={() => setShowExportDialog(true)}
            onSaveLoad={() => setDialogOpen(true)}
          />
        )}

        {creationMode === "ai" && (
          <AILogoGenerator onSelectLogo={onSelectLogo} />
        )}

        {creationMode === "template" && (
          <TemplateGallery
            onExport={() => setShowExportDialog(true)}
            onSaveLoad={() => setDialogOpen(true)}
          />
        )}
      </div>
    </LogoProvider>
  );
}
