"use client"

import { useState, useCallback, memo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import { categories, getShapesByCategory } from "./shape-data"

interface ShapeGalleryProps {
  onSelectShape: (shapeId: string, shapeSvg: string) => void
  onAddLayeredShape: (shapeSvg: string) => void
}

export const ShapeGallery = memo(function ShapeGallery({ onSelectShape, onAddLayeredShape }: ShapeGalleryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("basic")

  // 検索フィルター
  const filterShapes = useCallback(
    (shapes: any[]) => {
      if (!searchTerm) return shapes
      return shapes.filter(
        (shape) =>
          shape.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shape.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    },
    [searchTerm],
  )

  // 現在のカテゴリーのシェイプを取得
  const currentShapes = getShapesByCategory(activeCategory)

  // 表示するシェイプ
  const displayShapes = filterShapes(currentShapes)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="シェイプを検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="flex flex-wrap h-auto">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {displayShapes.map((shape) => (
                <ShapeCard key={shape.id} shape={shape} onSelect={onSelectShape} onAddLayer={onAddLayeredShape} />
              ))}
              {category.id === "basic" && (
                <Card
                  className="overflow-hidden cursor-pointer hover:border-primary transition-colors"
                  onClick={() => onSelectShape("none", "")}
                >
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md mb-2 p-4 flex items-center justify-center border-2 border-dashed border-gray-300">
                      <p className="text-center text-sm text-gray-500">テキストのみ</p>
                    </div>
                    <p className="text-center text-sm">シェイプなし</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
})

// シェイプカードコンポーネント
const ShapeCard = memo(function ShapeCard({
  shape,
  onSelect,
  onAddLayer,
}: {
  shape: { id: string; name: string; svg: string; tags?: string[] }
  onSelect: (shapeId: string, shapeSvg: string) => void
  onAddLayer: (shapeSvg: string) => void
}) {
  return (
    <Card className="overflow-hidden cursor-pointer hover:border-primary transition-colors">
      <CardContent className="p-4">
        <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md mb-2 p-4 flex items-center justify-center">
          <div
            className="w-16 h-16 text-primary"
            dangerouslySetInnerHTML={{
              __html: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${shape.svg}</svg>`,
            }}
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">{shape.name}</p>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation()
                onAddLayer(shape.svg)
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onSelect(shape.id, shape.svg)}>
              使用
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

