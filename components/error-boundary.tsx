"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="min-h-[50vh] flex items-center justify-center bg-black/50 text-white p-4 rounded-lg border border-white/10">
          <div className="max-w-md w-full bg-black/70 p-6 rounded-lg shadow-lg border border-white/10">
            <div className="flex items-center justify-center mb-6">
              <AlertTriangle className="h-12 w-12 text-yellow-500 mr-4" />
              <h2 className="text-xl font-bold">レンダリングエラーが発生しました</h2>
            </div>

            <div className="bg-black/50 p-4 rounded mb-4 overflow-auto max-h-40 border border-white/10">
              <p className="text-red-400 font-mono text-sm">{this.state.error?.toString() || "Unknown error"}</p>
            </div>

            <p className="mb-4 text-gray-300">
              申し訳ありませんが、ロゴエディターの表示中にエラーが発生しました。
              ページをリロードして再試行してください。
            </p>

            <div className="flex justify-center">
              <Button
                onClick={() => {
                  this.setState({ hasError: false, error: null })
                  window.location.reload()
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                ページをリロード
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

