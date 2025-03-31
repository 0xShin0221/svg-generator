import { MousePointer, Palette, Download } from "lucide-react";

// Feature Data Types
interface Feature {
  title: string;
  description: string;
}

interface FeatureData {
  iconName: "PenTool" | "Wand2" | "Zap" | "Download" | "Share2" | "Monitor";
  iconColor: string;
  borderColor: string;
  hoverBorderColor: string;
  gradientFrom: string;
  gradientTo: string;
  title: string;
  features: Feature[];
  delay: number;
}

// Export the features data with typings
export const featuresData: FeatureData[] = [
  {
    iconName: "PenTool",
    iconColor: "blue-400",
    borderColor: "blue-500/20",
    hoverBorderColor: "blue-500/40",
    gradientFrom: "blue-500/20",
    gradientTo: "purple-500/20",
    title: "デザイン機能",
    features: [
      {
        title: "豊富なテンプレート",
        description: "業種別、スタイル別に分類された数百種類のテンプレート",
      },
      {
        title: "高度なカスタマイズ",
        description: "テキスト、シェイプ、色、グラデーションを自由に調整",
      },
      {
        title: "カスタムフォント",
        description: "独自のフォントをアップロードして使用可能",
      },
    ],
    delay: 0,
  },
  {
    iconName: "Wand2",
    iconColor: "purple-400",
    borderColor: "purple-500/20",
    hoverBorderColor: "purple-500/40",
    gradientFrom: "purple-500/20",
    gradientTo: "pink-500/20",
    title: "AI機能",
    features: [
      {
        title: "AIロゴ生成",
        description: "ブランドに合ったロゴを数秒で自動生成",
      },
      {
        title: "スタイル提案",
        description: "業種に最適なデザインスタイルを自動提案",
      },
      {
        title: "カラーパレット生成",
        description: "ブランドイメージに合った配色を自動提案",
      },
    ],
    delay: 0.1,
  },
  {
    iconName: "Zap",
    iconColor: "blue-400",
    borderColor: "blue-500/20",
    hoverBorderColor: "blue-500/40",
    gradientFrom: "blue-500/20",
    gradientTo: "purple-500/20",
    title: "アニメーション機能",
    features: [
      {
        title: "20種類以上のエフェクト",
        description: "回転、フェード、バウンスなど多彩なアニメーション",
      },
      {
        title: "カスタマイズ可能",
        description: "速度、遅延、繰り返し回数などを自由に調整",
      },
      {
        title: "複数要素のアニメーション",
        description: "テキストとシェイプに個別のアニメーションを適用可能",
      },
    ],
    delay: 0.2,
  },
  {
    iconName: "Download",
    iconColor: "blue-400",
    borderColor: "blue-500/20",
    hoverBorderColor: "blue-500/40",
    gradientFrom: "blue-500/20",
    gradientTo: "purple-500/20",
    title: "エクスポート機能",
    features: [
      {
        title: "複数形式に対応",
        description: "SVG、PNG、JPG形式でエクスポート可能",
      },
      {
        title: "高解像度出力",
        description: "印刷やデジタルメディアに最適な高品質出力",
      },
      {
        title: "透過背景対応",
        description: "背景透過のPNGやSVGでエクスポート可能",
      },
    ],
    delay: 0.3,
  },
  {
    iconName: "Share2",
    iconColor: "purple-400",
    borderColor: "purple-500/20",
    hoverBorderColor: "purple-500/40",
    gradientFrom: "purple-500/20",
    gradientTo: "pink-500/20",
    title: "共有・保存機能",
    features: [
      {
        title: "プロジェクト保存",
        description: "作成したロゴを保存して後で編集可能",
      },
      {
        title: "チーム共有",
        description: "同僚やクライアントとプロジェクトを共有",
      },
      {
        title: "バージョン履歴",
        description: "過去のバージョンを保存・復元可能",
      },
    ],
    delay: 0.4,
  },
  {
    iconName: "Monitor",
    iconColor: "blue-400",
    borderColor: "blue-500/20",
    hoverBorderColor: "blue-500/40",
    gradientFrom: "blue-500/20",
    gradientTo: "purple-500/20",
    title: "使いやすさ",
    features: [
      {
        title: "直感的なインターフェース",
        description: "デザイン知識がなくても簡単に操作可能",
      },
      {
        title: "多言語対応",
        description: "20以上の言語に対応し、世界中で利用可能",
      },
      {
        title: "無料で使える",
        description: "登録不要で基本機能をすべて利用可能",
      },
    ],
    delay: 0.5,
  },
];

// ステップデータ - 修正: iconをiconNameに変更
export const steps = [
  {
    title: "テンプレートを選択",
    description: "業種や用途に合わせた豊富なテンプレートから開始できます。",
    iconName: "Palette", // 文字列に変更
  },
  {
    title: "カスタマイズ",
    description: "テキスト、色、フォント、配置などを自由に編集できます。",
    iconName: "MousePointer", // 文字列に変更
  },
  {
    title: "ダウンロード",
    description: "SVG、PNG、JPG形式で高品質なロゴをエクスポートできます。",
    iconName: "Download", // 文字列に変更
  },
];

// 料金プランの機能リスト
export const freePlanFeatures = [
  "基本テンプレート（50種類以上）",
  "カスタムテキスト編集",
  "カラーパレット変更",
  "SVG形式でエクスポート",
  "透過背景対応",
  "商用利用可能",
];

export const proPlanFeatures1 = [
  "プレミアムテンプレート（200種以上）",
  "高度なカスタマイズオプション",
  "カスタムフォントのアップロード",
  "プロジェクト保存（無制限）",
];

export const proPlanFeatures2 = [
  "AIロゴ生成",
  "アニメーションSVG作成",
  "チーム共有機能",
  "優先サポート",
];

// ユーザーの声
export const testimonials = [
  {
    name: "田中 健太",
    initials: "TK",
    title: "スタートアップ創業者",
    rating: 5,
    text: "わずか10分で、私たちのブランドにぴったりのロゴが完成しました。デザイナーに依頼するよりも早く、コストも抑えられて大満足です。",
  },
  {
    name: "佐藤 美咲",
    initials: "SM",
    title: "マーケティングディレクター",
    rating: 5,
    text: "シンプルなのに洗練されたデザインが作れます。様々なプロジェクトで使用していますが、クライアントからの評判も良好です。",
  },
  {
    name: "鈴木 拓也",
    initials: "ST",
    title: "フリーランスデザイナー",
    rating: 4,
    text: "クイックモックアップやプロトタイプ作成に最適です。基本的な機能は無料で使えるのが嬉しいですね。もう少しテンプレートが増えると完璧です。",
  },
];

// よくある質問
export const faqs = [
  {
    question: "登録なしで利用できますか？",
    answer:
      "はい、登録やアカウント作成なしで基本機能をすべて利用できます。プロジェクトの保存や高度な機能を利用する場合のみ、アカウント登録が必要です。",
  },
  {
    question: "作成したロゴは商用利用できますか？",
    answer:
      "はい、無料プランで作成したロゴも含め、すべての作成物は商用利用可能です。著作権はロゴの作成者であるあなたに帰属します。",
  },
  {
    question: "どの形式でダウンロードできますか？",
    answer:
      "SVG（ベクター）形式が基本ですが、PNG、JPGなどのラスター形式でもエクスポート可能です。無料プランではSVGとPNG（低解像度）に対応しています。",
  },
  {
    question: "プロジェクトを後で編集できますか？",
    answer:
      "無料プランではブラウザのローカルストレージに一時保存されますが、プロプランでは無制限にプロジェクトを保存し、いつでも編集することができます。",
  },
];
