import { UILayout } from "@/components/ui-layout"
import LogoCreator from "@/components/logo-creator"
import ErrorBoundary from "@/components/error-boundary"

export default function Home() {
  return (
    <UILayout
      title="Professional Logo Creator"
      subtitle="プロフェッショナルなロゴを簡単に作成。AIによる生成、テンプレート、カスタマイズなど、あらゆる機能を備えたオールインワンのロゴデザインツール。"
      className="max-w-[1400px]"
    >
      <ErrorBoundary>
        <LogoCreator />
      </ErrorBoundary>
    </UILayout>
  )
}

