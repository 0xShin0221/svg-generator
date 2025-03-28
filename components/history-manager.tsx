"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Undo2, Redo2 } from "lucide-react"
import type { LogoSettings } from "@/types"

interface HistoryManagerProps {
  currentSettings: LogoSettings
  onApplySettings: (settings: LogoSettings) => void
}

export function HistoryManager({ currentSettings, onApplySettings }: HistoryManagerProps) {
  // 履歴の状態管理
  const [history, setHistory] = useState<LogoSettings[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [isInitialized, setIsInitialized] = useState(false)

  // 最後に記録した設定を保持するためのref
  const lastRecordedSettingsRef = useRef<string>("")

  // 初期化時に現在の設定を履歴に追加
  useEffect(() => {
    if (!isInitialized && currentSettings) {
      setHistory([currentSettings])
      setCurrentIndex(0)
      setIsInitialized(true)
      lastRecordedSettingsRef.current = JSON.stringify(currentSettings)
    }
  }, [currentSettings, isInitialized])

  // 設定が変更されたときに履歴に追加
  useEffect(() => {
    if (!isInitialized) return

    // Deep comparison to avoid unnecessary updates
    const currentSettingsStr = JSON.stringify(currentSettings)

    // 現在の設定と最後に記録した設定が同じ場合は追加しない
    if (lastRecordedSettingsRef.current === currentSettingsStr) {
      return
    }

    // 現在位置より後の履歴を削除し、新しい設定を追加
    const newHistory = [...history.slice(0, currentIndex + 1), { ...currentSettings }]

    // 履歴の最大数を制限（例：50）
    const maxHistoryLength = 50
    const trimmedHistory = newHistory.slice(-maxHistoryLength)

    setHistory(trimmedHistory)
    setCurrentIndex(trimmedHistory.length - 1)

    // 最後に記録した設定を更新
    lastRecordedSettingsRef.current = currentSettingsStr
  }, [currentSettings, isInitialized, currentIndex, history])

  // 元に戻す
  const undo = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      onApplySettings({ ...history[newIndex] })
      // 適用した設定を最後に記録した設定として更新
      lastRecordedSettingsRef.current = JSON.stringify(history[newIndex])
    }
  }, [currentIndex, history, onApplySettings])

  // やり直す
  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      onApplySettings({ ...history[newIndex] })
      // 適用した設定を最後に記録した設定として更新
      lastRecordedSettingsRef.current = JSON.stringify(history[newIndex])
    }
  }, [currentIndex, history, onApplySettings])

  // キーボードショートカットの設定
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Z または Command+Z (Mac) で元に戻す
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault()
        undo()
      }

      // Ctrl+Y または Command+Shift+Z (Mac) でやり直す
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault()
        redo()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [undo, redo])

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={undo}
        disabled={currentIndex <= 0}
        title="元に戻す (Ctrl+Z)"
        className="h-9 w-9 border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 disabled:opacity-40"
      >
        <Undo2 className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={redo}
        disabled={currentIndex >= history.length - 1}
        title="やり直す (Ctrl+Y)"
        className="h-9 w-9 border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 disabled:opacity-40"
      >
        <Redo2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

