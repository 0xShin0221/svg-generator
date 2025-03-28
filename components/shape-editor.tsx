"use client"

import { useState, useRef, useEffect, memo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Square, Circle, Triangle, Star, Heart, Save } from "lucide-react"

interface ShapeEditorProps {
  initialSvg?: string
  onSave: (svgString: string) => void
}

export const ShapeEditor = memo(function ShapeEditor({ initialSvg, onSave }: ShapeEditorProps) {
  const [fillColor, setFillColor] = useState("#3b82f6")
  const [strokeColor, setStrokeColor] = useState("#000000")
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [selectedShape, setSelectedShape] = useState<string | null>(null)

  const svgRef = useRef<SVGSVGElement>(null)
  const canvasSize = 400

  // 初期SVGがある場合は読み込む
  useEffect(() => {
    if (initialSvg && svgRef.current) {
      try {
        const parser = new DOMParser()
        const svgDoc = parser.parseFromString(initialSvg, "image/svg+xml")
        const svgElement = svgDoc.documentElement

        // 既存のSVG内容をクリア
        while (svgRef.current.firstChild) {
          svgRef.current.removeChild(svgRef.current.firstChild)
        }

        // 新しいSVG内容を追加
        Array.from(svgElement.childNodes).forEach((node) => {
          svgRef.current?.appendChild(svgRef.current.ownerDocument.importNode(node, true))
        })
      } catch (error) {
        console.error("SVG解析エラー:", error)
      }
    }
  }, [initialSvg])

  // シェイプを追加
  const addShape = (shapeType: string) => {
    if (!svgRef.current) return

    let shapeElement: SVGElement | null = null

    switch (shapeType) {
      case "rect":
        shapeElement = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        shapeElement.setAttribute("x", "100")
        shapeElement.setAttribute("y", "100")
        shapeElement.setAttribute("width", "200")
        shapeElement.setAttribute("height", "200")
        break
      case "circle":
        shapeElement = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        shapeElement.setAttribute("cx", "200")
        shapeElement.setAttribute("cy", "200")
        shapeElement.setAttribute("r", "100")
        break
      case "triangle":
        shapeElement = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
        shapeElement.setAttribute("points", "200,50 50,350 350,350")
        break
      case "star":
        shapeElement = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
        const points = calculateStarPoints(200, 200, 100, 50, 5)
        shapeElement.setAttribute("points", points)
        break
      case "heart":
        shapeElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
        shapeElement.setAttribute(
          "d",
          "M200,100 C150,60 50,90 100,200 C150,300 200,350 200,350 C200,350 250,300 300,200 C350,90 250,60 200,100 Z",
        )
        break
      default:
        return
    }

    if (shapeElement) {
      shapeElement.setAttribute("fill", fillColor)
      shapeElement.setAttribute("stroke", strokeColor)
      shapeElement.setAttribute("stroke-width", strokeWidth.toString())

      svgRef.current.appendChild(shapeElement)
      setSelectedShape(shapeType)
    }
  }

  // 星形の頂点を計算
  function calculateStarPoints(
    centerX: number,
    centerY: number,
    outerRadius: number,
    innerRadius: number,
    points: number,
  ) {
    let result = ""

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (i * Math.PI) / points - Math.PI / 2
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      result += `${x},${y} `
    }

    return result.trim()
  }

  // SVGを保存
  const saveSvg = () => {
    if (!svgRef.current) return

    const svgContent = svgRef.current.innerHTML
    const svgString = `<svg viewBox="0 0 ${canvasSize} ${canvasSize}" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`

    onSave(svgString)
  }

  // SVGをクリア
  const clearSvg = () => {
    if (!svgRef.current) return

    while (svgRef.current.firstChild) {
      svgRef.current.removeChild(svgRef.current.firstChild)
    }

    setSelectedShape(null)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div
                className="bg-gray-100 dark:bg-gray-800 relative"
                style={{ width: "100%", height: 0, paddingBottom: "100%" }}
              >
                <svg
                  ref={svgRef}
                  viewBox={`0 0 ${canvasSize} ${canvasSize}`}
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={selectedShape === "rect" ? "default" : "outline"}
                    className="h-12 p-0"
                    onClick={() => addShape("rect")}
                  >
                    <Square className="h-6 w-6" />
                  </Button>
                  <Button
                    variant={selectedShape === "circle" ? "default" : "outline"}
                    className="h-12 p-0"
                    onClick={() => addShape("circle")}
                  >
                    <Circle className="h-6 w-6" />
                  </Button>
                  <Button
                    variant={selectedShape === "triangle" ? "default" : "outline"}
                    className="h-12 p-0"
                    onClick={() => addShape("triangle")}
                  >
                    <Triangle className="h-6 w-6" />
                  </Button>
                  <Button
                    variant={selectedShape === "star" ? "default" : "outline"}
                    className="h-12 p-0"
                    onClick={() => addShape("star")}
                  >
                    <Star className="h-6 w-6" />
                  </Button>
                  <Button
                    variant={selectedShape === "heart" ? "default" : "outline"}
                    className="h-12 p-0"
                    onClick={() => addShape("heart")}
                  >
                    <Heart className="h-6 w-6" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fill-color">塗りつぶし色</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="fill-color"
                      type="color"
                      value={fillColor}
                      onChange={(e) => setFillColor(e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input value={fillColor} onChange={(e) => setFillColor(e.target.value)} className="font-mono" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stroke-color">線の色</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="stroke-color"
                      type="color"
                      value={strokeColor}
                      onChange={(e) => setStrokeColor(e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} className="font-mono" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stroke-width">線の太さ: {strokeWidth}px</Label>
                  <Slider
                    id="stroke-width"
                    min={0}
                    max={20}
                    step={1}
                    value={[strokeWidth]}
                    onValueChange={(value) => setStrokeWidth(value[0])}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" onClick={clearSvg} className="flex-1">
                    クリア
                  </Button>
                  <Button onClick={saveSvg} className="flex-1 gap-2">
                    <Save className="h-4 w-4" />
                    保存
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
})

