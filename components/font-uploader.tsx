"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, AlertCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface FontUploaderProps {
  onFontUpload: (fontFamily: string, fontUrl: string) => void;
}

export function FontUploader({ onFontUpload }: FontUploaderProps) {
  const t = useTranslations("LogoCreator");

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fontName, setFontName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Font file validation
  const validateFontFile = (file: File): boolean => {
    // File type validation
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const isValidExtension = ["ttf", "otf", "woff", "woff2"].includes(
      fileExtension || ""
    );

    if (!isValidExtension) {
      setError(t("font_format_error"));
      return false;
    }

    // File size validation (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError(t("font_size_error"));
      return false;
    }

    return true;
  };

  // Font file processing
  const handleFontUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setSuccess(false);

    try {
      // File validation
      if (!validateFontFile(file)) {
        setIsUploading(false);
        return;
      }

      // Generate font name from file name if not provided
      const fontFamilyName =
        fontName.trim() ||
        file.name.split(".")[0].replace(/[^a-zA-Z0-9]/g, "-");

      // Convert file to data URL using FileReader
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;

        try {
          // Register font using FontFace API
          const fontFace = new FontFace(fontFamilyName, `url(${dataUrl})`);
          await fontFace.load();
          document.fonts.add(fontFace);

          // Pass font info to parent component
          onFontUpload(fontFamilyName, dataUrl);

          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
          console.error("Font registration error:", err);
          setError(t("font_load_error"));
        }
      };

      reader.onerror = () => {
        setError(t("file_read_error"));
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Font upload error:", err);
      setError(t("font_upload_error"));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="font-name" className="text-gray-300">
          {t("font_name_optional")}
        </Label>
        <Input
          id="font-name"
          value={fontName}
          onChange={(e) => setFontName(e.target.value)}
          placeholder="MyCustomFont"
          className="bg-black/50 border-white/10 text-white focus:border-blue-500/50"
        />
        <p className="text-xs text-gray-500">{t("font_name_empty_notice")}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="font-file" className="text-gray-300">
          {t("font_file")}
        </Label>
        <div className="flex items-center gap-2">
          <Input
            ref={fileInputRef}
            id="font-file"
            type="file"
            accept=".ttf,.otf,.woff,.woff2"
            onChange={handleFontUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className={cn(
              "w-full border-dashed border-2 py-6 flex flex-col items-center justify-center gap-2 bg-black/30 border-white/10",
              isUploading
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-blue-500/50 hover:bg-blue-500/10"
            )}
            disabled={isUploading}
          >
            <Upload className="h-6 w-6 text-gray-400" />
            <span className="text-gray-300">
              {isUploading ? t("uploading") : t("click_to_upload_font")}
            </span>
            <span className="text-xs text-gray-400">
              {t("supported_font_formats")}
            </span>
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-md p-3 text-red-300 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-500/20 border border-green-500/50 rounded-md p-3 text-green-300 flex items-center gap-2">
          <Check className="h-5 w-5 flex-shrink-0" />
          <span>{t("font_upload_success")}</span>
        </div>
      )}
    </div>
  );
}
