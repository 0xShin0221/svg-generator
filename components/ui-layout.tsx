"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface UILayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
  className?: string
}

export function UILayout({ children, title, subtitle, className }: UILayoutProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* ヘッダー */}
      <header className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-3xl"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

          {/* 装飾的な背景要素 */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
            <div className="absolute -top-[40%] -left-[10%] w-[50%] h-[80%] rounded-full bg-blue-500/10 blur-3xl"></div>
            <div className="absolute -top-[40%] -right-[10%] w-[50%] h-[80%] rounded-full bg-purple-500/10 blur-3xl"></div>
          </div>
        </div>

        <div className="container mx-auto py-6 px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm md:text-base text-gray-400 max-w-2xl mx-auto text-center">{subtitle}</p>
            )}
          </motion.div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className={cn("container mx-auto py-6 px-4 relative z-10", className)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </main>

      {/* フッター */}
      <footer className="mt-20 border-t border-white/5 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} SVG Logo Creator. All rights reserved.</p>
        </div>
      </footer>

      {/* 装飾要素 */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl"></div>
      </div>
    </div>
  )
}

