"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Download, Image, FileType, Check } from "lucide-react";
import { motion } from "framer-motion";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  logoPreviewId: string;
  logoName: string;
}

export function ExportDialog({
  open,
  onOpenChange,
  logoPreviewId,
  logoName,
}: ExportDialogProps) {
  const [svgElement, setSvgElement] = useState<SVGSVGElement | null>(null);
  const [format, setFormat] = useState<"svg" | "png" | "jpg">("svg");
  const [quality, setQuality] = useState(90);
  const [scale, setScale] = useState(2);
  const [background, setBackground] = useState("#ffffff");
  const [downloading, setDownloading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // SVGをデータURLに変換 (useCallbackでメモ化)
  const svgToDataURL = useCallback((svg: SVGSVGElement): string => {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    return URL.createObjectURL(svgBlob);
  }, []);

  // プレビューを生成
  useEffect(() => {
    if (!open || !svgElement) return;

    const generatePreview = async (): Promise<void> => {
      if (format === "svg") {
        setPreviewUrl(svgToDataURL(svgElement));
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const svgURL = svgToDataURL(svgElement);
      const img = new window.Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        const width = svgElement.viewBox.baseVal.width * scale;
        const height = svgElement.viewBox.baseVal.height * scale;

        canvas.width = width;
        canvas.height = height;

        // 背景色を設定
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);

        // SVGを描画
        ctx.drawImage(img, 0, 0, width, height);

        // キャンバスをデータURLに変換
        const dataURL = canvas.toDataURL(
          format === "png" ? "image/png" : "image/jpeg",
          quality / 100
        );
        setPreviewUrl(dataURL);
      };

      img.src = svgURL;
    };

    generatePreview();
  }, [open, svgElement, format, quality, scale, background]);

  // ダウンロード処理
  const handleDownload = async () => {
    if (!svgElement || !previewUrl) return;

    setDownloading(true);

    try {
      const extension = format === "svg" ? "svg" : format;
      const fileName = `${logoName
        .toLowerCase()
        .replace(/\s+/g, "-")}.${extension}`;

      if (format === "svg") {
        // SVGをダウンロード
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        const svgBlob = new Blob([svgString], {
          type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(svgBlob);

        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        // PNG/JPGをダウンロード
        const link = document.createElement("a");
        link.href = previewUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error("ダウンロードエラー:", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gray-800/90 backdrop-blur-md border border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            ロゴをエクスポート
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            ロゴを様々な形式でエクスポートできます
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <Tabs
            defaultValue="svg"
            value={format}
            onValueChange={(value) => setFormat(value as "svg" | "png" | "jpg")}
          >
            <TabsList className="grid grid-cols-3 bg-gray-900/50">
              <TabsTrigger
                value="svg"
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
              >
                <FileType className="h-4 w-4 mr-2" />
                SVG
              </TabsTrigger>
              <TabsTrigger
                value="png"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
              >
                <Image className="h-4 w-4 mr-2" />
                PNG
              </TabsTrigger>
              <TabsTrigger
                value="jpg"
                className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400"
              >
                <Image className="h-4 w-4 mr-2" />
                JPG
              </TabsTrigger>
            </TabsList>

            <TabsContent value="svg" className="space-y-4 mt-4">
              <div className="text-sm text-gray-400">
                SVG形式はベクター画像で、任意のサイズに拡大縮小しても品質が劣化しません。
                ウェブサイトやデジタルメディアに最適です。
              </div>
            </TabsContent>

            <TabsContent value="png" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="text-sm text-gray-400">
                  PNG形式は透明背景をサポートするラスター画像です。
                  ウェブやデジタルメディアに適しています。
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scale" className="text-gray-300">
                    スケール: {scale}x
                  </Label>
                  <Slider
                    id="scale"
                    min={1}
                    max={5}
                    step={0.5}
                    value={[scale]}
                    onValueChange={(value) => setScale(value[0])}
                    className="py-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background" className="text-gray-300">
                    背景色
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="background"
                      type="color"
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      className="w-12 h-10 p-1 bg-transparent"
                    />
                    <Input
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      className="font-mono bg-gray-900/50 border-gray-700 text-white"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="jpg" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="text-sm text-gray-400">
                  JPG形式は写真やグラデーションに適したラスター画像です。
                  透明背景はサポートしていません。
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quality" className="text-gray-300">
                    品質: {quality}%
                  </Label>
                  <Slider
                    id="quality"
                    min={10}
                    max={100}
                    step={5}
                    value={[quality]}
                    onValueChange={(value) => setQuality(value[0])}
                    className="py-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scale-jpg" className="text-gray-300">
                    スケール: {scale}x
                  </Label>
                  <Slider
                    id="scale-jpg"
                    min={1}
                    max={5}
                    step={0.5}
                    value={[scale]}
                    onValueChange={(value) => setScale(value[0])}
                    className="py-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background-jpg" className="text-gray-300">
                    背景色
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="background-jpg"
                      type="color"
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      className="w-12 h-10 p-1 bg-transparent"
                    />
                    <Input
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      className="font-mono bg-gray-900/50 border-gray-700 text-white"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* プレビュー */}
          <div className="border border-gray-700 rounded-md p-4 bg-gray-900/50">
            <Label className="text-gray-300 block mb-2">プレビュー</Label>
            <div className="flex items-center justify-center bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImNoZWNrZXJib2FyZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiMyMjIiLz48cmVjdCB4PSIxMCIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMzMzIi8+PHJlY3QgeD0iMCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzMzMyIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMjIyIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2NoZWNrZXJib2FyZCkiLz48L3N2Zz4=')] rounded-md overflow-hidden h-48">
              {previewUrl && (
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="プレビュー"
                  className="max-w-full max-h-full object-contain"
                  style={{
                    backgroundColor:
                      format !== "svg" ? background : "transparent",
                  }}
                />
              )}
            </div>
          </div>

          {/* 非表示のキャンバス */}
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300"
          >
            キャンセル
          </Button>
          <Button
            onClick={handleDownload}
            disabled={downloading || !previewUrl}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0"
          >
            {downloading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="h-5 w-5 border-2 border-white border-opacity-30 border-t-white rounded-full"
              />
            ) : success ? (
              <Check className="h-5 w-5" />
            ) : (
              <>
                <Download className="h-5 w-5 mr-2" />
                {format.toUpperCase()}でダウンロード
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
