// 基本的な形状
export const basicShapes = [
  {
    id: "circle",
    name: "円",
    tags: ["基本", "丸", "シンプル"],
    svg: `<circle cx="50" cy="50" r="50" fill="currentColor" />`,
  },
  {
    id: "square",
    name: "正方形",
    tags: ["基本", "四角", "シンプル"],
    svg: `<rect x="0" y="0" width="100" height="100" fill="currentColor" />`,
  },
  {
    id: "rounded-square",
    name: "角丸正方形",
    tags: ["基本", "四角", "丸み"],
    svg: `<rect x="0" y="0" width="100" height="100" rx="15" ry="15" fill="currentColor" />`,
  },
  {
    id: "triangle",
    name: "三角形",
    tags: ["基本", "三角", "シンプル"],
    svg: `<polygon points="50,0 100,100 0,100" fill="currentColor" />`,
  },
  {
    id: "hexagon",
    name: "六角形",
    tags: ["基本", "多角形"],
    svg: `<polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="currentColor" />`,
  },
  {
    id: "pentagon",
    name: "五角形",
    tags: ["基本", "多角形"],
    svg: `<polygon points="50,0 100,38 81,100 19,100 0,38" fill="currentColor" />`,
  },
  {
    id: "octagon",
    name: "八角形",
    tags: ["基本", "多角形"],
    svg: `<polygon points="29,0 71,0 100,29 100,71 71,100 29,100 0,71 0,29" fill="currentColor" />`,
  },
  {
    id: "diamond",
    name: "ダイヤモンド",
    tags: ["基本", "宝石"],
    svg: `<polygon points="50,0 100,50 50,100 0,50" fill="currentColor" />`,
  },
]

// 特殊な形状
export const specialShapes = [
  {
    id: "star",
    name: "星",
    tags: ["特殊", "装飾"],
    svg: `<polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="currentColor" />`,
  },
  {
    id: "heart",
    name: "ハート",
    tags: ["特殊", "装飾", "愛"],
    svg: `<path d="M50,20 C55,10 70,0 85,10 C100,20 100,40 90,55 C80,70 50,90 50,90 C50,90 20,70 10,55 C0,40 0,20 15,10 C30,0 45,10 50,20 Z" fill="currentColor" />`,
  },
  {
    id: "shield",
    name: "シールド",
    tags: ["特殊", "保護", "セキュリティ"],
    svg: `<path d="M50,0 L100,20 L100,60 C100,80 75,100 50,100 C25,100 0,80 0,60 L0,20 L50,0 Z" fill="currentColor" />`,
  },
  {
    id: "cloud",
    name: "クラウド",
    tags: ["特殊", "自然", "天気"],
    svg: `<path d="M25,60 C10,60 0,50 0,35 C0,20 15,10 30,15 C35,5 50,0 65,5 C80,10 90,25 85,40 C95,45 100,55 95,65 C90,75 75,75 65,70 C60,80 45,85 30,80 C15,75 15,65 25,60 Z" fill="currentColor" />`,
  },
]

// 抽象シェイプ
export const abstractShapes = [
  {
    id: "wave",
    name: "ウェーブ",
    tags: ["抽象", "流れ", "水"],
    svg: `<path d="M0,40 C20,20 30,60 50,40 C70,20 80,60 100,40 L100,100 L0,100 Z" fill="currentColor" />`,
  },
  {
    id: "blob1",
    name: "ブロブ 1",
    tags: ["抽象", "有機的", "流動的"],
    svg: `<path d="M50,0 C70,0 90,20 90,40 C90,60 100,80 80,90 C60,100 40,90 20,90 C0,90 0,70 0,50 C0,30 10,10 30,5 C40,0 30,0 50,0 Z" fill="currentColor" />`,
  },
  {
    id: "spiral",
    name: "スパイラル",
    tags: ["抽象", "回転", "動き"],
    svg: `<path d="M50,50 m0,-45 a45,45 0 1,1 0,90 a45,45 0 1,1 0,-90 M50,50 m0,-30 a30,30 0 1,0 0,60 a30,30 0 1,0 0,-60 M50,50 m0,-15 a15,15 0 1,1 0,30 a15,15 0 1,1 0,-30" fill="currentColor" />`,
  },
]

// ビジネスシェイプ
export const businessShapes = [
  {
    id: "badge",
    name: "バッジ",
    tags: ["ビジネス", "認証", "品質"],
    svg: `<path d="M50,0 L65,15 L85,5 L85,30 L100,45 L85,60 L85,85 L65,75 L50,90 L35,75 L15,85 L15,60 L0,45 L15,30 L15,5 L35,15 L50,0 Z" fill="currentColor" />`,
  },
  {
    id: "tag",
    name: "タグ",
    tags: ["ビジネス", "ラベル", "価格"],
    svg: `<path d="M40,0 L100,0 L100,60 L40,100 L0,60 L0,0 Z M75,25 a10,10 0 1,0 0,0.1" fill="currentColor" />`,
  },
  {
    id: "document",
    name: "ドキュメント",
    tags: ["ビジネス", "書類", "情報"],
    svg: `<path d="M60,0 L100,40 L100,100 L0,100 L0,0 Z M60,0 L60,40 L100,40" fill="currentColor" />`,
  },
]

// テクノロジーシェイプ
export const techShapes = [
  {
    id: "circuit",
    name: "回路",
    tags: ["テクノロジー", "電子", "デジタル"],
    svg: `<path d="M10,10 L40,10 L40,30 L60,30 L60,10 L90,10 L90,40 L70,40 L70,60 L90,60 L90,90 L60,90 L60,70 L40,70 L40,90 L10,90 L10,60 L30,60 L30,40 L10,40 Z" fill="currentColor" />`,
  },
  {
    id: "code",
    name: "コード",
    tags: ["テクノロジー", "プログラミング", "開発"],
    svg: `<path d="M30,30 L0,50 L30,70 M70,30 L100,50 L70,70 M40,80 L60,20" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />`,
  },
]

// 自然シェイプ
export const natureShapes = [
  {
    id: "leaf",
    name: "リーフ",
    tags: ["自然", "植物", "エコ"],
    svg: `<path d="M50,0 C80,0 100,20 100,50 C100,80 80,100 50,100 C20,100 0,80 0,50 C0,20 20,0 50,0 Z M50,0 C20,30 20,70 50,100" fill="currentColor" />`,
  },
  {
    id: "mountain",
    name: "山",
    tags: ["自然", "風景", "アウトドア"],
    svg: `<polygon points="0,100 30,40 50,60 70,20 100,100" fill="currentColor" />`,
  },
  {
    id: "sun",
    name: "太陽",
    tags: ["自然", "天気", "エネルギー"],
    svg: `<circle cx="50" cy="50" r="25" fill="currentColor" /><path d="M50,0 L50,15 M50,85 L50,100 M100,50 L85,50 M15,50 L0,50 M85,15 L75,25 M25,75 L15,85 M85,85 L75,75 M25,25 L15,15" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" />`,
  },
]

// 食品シェイプ
export const foodShapes = [
  {
    id: "coffee",
    name: "コーヒー",
    tags: ["食品", "飲料", "カフェ"],
    svg: `<path d="M20,20 L80,20 L75,80 L25,80 Z M80,20 C90,20 95,30 90,40 L80,40" fill="currentColor" />`,
  },
  {
    id: "pizza",
    name: "ピザ",
    tags: ["食品", "ファストフード", "イタリアン"],
    svg: `<path d="M50,0 L100,100 L0,100 Z" fill="currentColor" />`,
  },
]

// 動物シェイプ
export const animalShapes = [
  {
    id: "paw",
    name: "肉球",
    tags: ["動物", "ペット", "犬", "猫"],
    svg: `<circle cx="35" cy="30" r="15" fill="currentColor" /><circle cx="65" cy="30" r="15" fill="currentColor" /><circle cx="20" cy="60" r="15" fill="currentColor" /><circle cx="80" cy="60" r="15" fill="currentColor" /><ellipse cx="50" cy="75" rx="25" ry="20" fill="currentColor" />`,
  },
  {
    id: "fish",
    name: "魚",
    tags: ["動物", "海", "水"],
    svg: `<path d="M20,50 C40,20 80,20 100,50 C80,80 40,80 20,50 Z M0,50 L20,30 L20,70 Z" fill="currentColor" />`,
  },
]

// スポーツシェイプ
export const sportShapes = [
  {
    id: "ball",
    name: "ボール",
    tags: ["スポーツ", "ゲーム", "サッカー"],
    svg: `<circle cx="50" cy="50" r="50" fill="currentColor" />`,
  },
  {
    id: "trophy",
    name: "トロフィー",
    tags: ["スポーツ", "勝利", "成功"],
    svg: `<path d="M30,0 L70,0 L70,10 L80,10 C90,10 95,20 90,30 C85,40 75,45 70,45 L70,70 C85,75 85,85 70,90 L30,90 C15,85 15,75 30,70 L30,45 C25,45 15,40 10,30 C5,20 10,10 20,10 L30,10 Z" fill="currentColor" />`,
  },
]

// 音楽シェイプ
export const musicShapes = [
  {
    id: "note",
    name: "音符",
    tags: ["音楽", "サウンド", "メロディー"],
    svg: `<path d="M70,10 L70,70 C70,85 50,85 50,70 C50,55 70,55 70,70 M30,30 L30,90 C30,105 10,105 10,90 C10,75 30,75 30,90 M30,30 L70,10" fill="currentColor" />`,
  },
  {
    id: "headphones",
    name: "ヘッドフォン",
    tags: ["音楽", "オーディオ", "リスニング"],
    svg: `<path d="M20,60 L20,80 L30,80 L30,60 L20,60 Z M70,60 L70,80 L80,80 L80,60 L70,60 Z" fill="currentColor" /><path d="M20,60 C20,40 30,20 50,20 C70,20 80,40 80,60" fill="none" stroke="currentColor" stroke-width="10" />`,
  },
]

// 交通シェイプ
export const transportShapes = [
  {
    id: "car",
    name: "車",
    tags: ["交通", "自動車", "移動"],
    svg: `<path d="M10,60 L10,80 L25,80 L25,70 L75,70 L75,80 L90,80 L90,60 L10,60 Z M20,40 L30,20 L70,20 L80,40 L80,60 L20,60 L20,40 Z" fill="currentColor" />`,
  },
  {
    id: "plane",
    name: "飛行機",
    tags: ["交通", "旅行", "航空"],
    svg: `<path d="M50,0 L60,30 L100,40 L60,50 L50,100 L40,50 L0,40 L40,30 Z" fill="currentColor" />`,
  },
]

// 建築シェイプ
export const architectureShapes = [
  {
    id: "house",
    name: "家",
    tags: ["建築", "住宅", "不動産"],
    svg: `<path d="M10,50 L50,10 L90,50 L90,100 L10,100 Z M40,100 L40,70 L60,70 L60,100" fill="currentColor" />`,
  },
  {
    id: "building",
    name: "ビル",
    tags: ["建築", "オフィス", "都市"],
    svg: `<path d="M10,0 L60,0 L60,100 L10,100 Z M60,30 L90,30 L90,100 L60,100 Z" fill="currentColor" />`,
  },
]

// 医療シェイプ
export const medicalShapes = [
  {
    id: "cross",
    name: "医療十字",
    tags: ["医療", "健康", "救急"],
    svg: `<path d="M35,0 L65,0 L65,35 L100,35 L100,65 L65,65 L65,100 L35,100 L35,65 L0,65 L0,35 L35,35 Z" fill="currentColor" />`,
  },
  {
    id: "heart-beat",
    name: "心拍",
    tags: ["医療", "健康", "生命"],
    svg: `<path d="M0,50 L20,50 L30,20 L40,80 L50,30 L60,70 L70,50 L100,50" fill="none" stroke="currentColor" stroke-width="10" stroke-linejoin="round" stroke-linecap="round" />`,
  },
]

// 教育シェイプ
export const educationShapes = [
  {
    id: "book",
    name: "本",
    tags: ["教育", "学習", "知識"],
    svg: `<path d="M10,10 L90,10 L90,90 L10,90 C10,70 10,30 10,10 Z M10,10 C30,10 30,30 10,30 M10,30 C30,30 30,50 10,50 M10,50 C30,50 30,70 10,70 M10,70 C30,70 30,90 10,90" fill="currentColor" />`,
  },
  {
    id: "graduation",
    name: "卒業帽",
    tags: ["教育", "学校", "大学"],
    svg: `<path d="M0,40 L50,20 L100,40 L50,60 Z M50,60 L50,80 M20,50 L20,70 C20,80 50,90 80,70 L80,50" fill="currentColor" />`,
  },
]

// ロゴ向けシェイプ
export const logoShapes = [
  {
    id: "circle-frame",
    name: "サークルフレーム",
    tags: ["ロゴ", "フレーム", "円"],
    svg: `<circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" stroke-width="4" />`,
  },
  {
    id: "double-circle",
    name: "二重円",
    tags: ["ロゴ", "フレーム", "円"],
    svg: `<circle cx="50" cy="50" r="50" fill="currentColor" /><circle cx="50" cy="50" r="40" fill="none" stroke="white" stroke-width="2" />`,
  },
  {
    id: "dotted-circle",
    name: "点線円",
    tags: ["ロゴ", "フレーム", "円"],
    svg: `<circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="8,4" />`,
  },
  {
    id: "square-frame",
    name: "スクエアフレーム",
    tags: ["ロゴ", "フレーム", "四角"],
    svg: `<rect x="2" y="2" width="96" height="96" fill="none" stroke="currentColor" stroke-width="4" />`,
  },
  {
    id: "rounded-square-frame",
    name: "角丸スクエアフレーム",
    tags: ["ロゴ", "フレーム", "四角"],
    svg: `<rect x="2" y="2" width="96" height="96" rx="15" ry="15" fill="none" stroke="currentColor" stroke-width="4" />`,
  },
  {
    id: "horizontal-line",
    name: "水平線",
    tags: ["ロゴ", "ライン", "シンプル"],
    svg: `<line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="4" stroke-linecap="round" />`,
  },
  {
    id: "underline",
    name: "アンダーライン",
    tags: ["ロゴ", "ライン", "シンプル"],
    svg: `<line x1="25" y1="70" x2="75" y2="70" stroke="currentColor" stroke-width="4" stroke-linecap="round" />`,
  },
  {
    id: "bracket-frame",
    name: "ブラケットフレーム",
    tags: ["ロゴ", "フレーム", "シンプル"],
    svg: `<path d="M30,10 L10,10 L10,90 L30,90 M70,10 L90,10 L90,90 L70,90" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />`,
  },
  {
    id: "handwritten-circle",
    name: "手書き円",
    tags: ["ロゴ", "手書き", "円"],
    svg: `<path d="M50,10 C70,10 85,20 90,40 C95,60 90,80 70,90 C50,100 30,95 15,80 C5,65 5,40 15,25 C25,10 40,10 50,10 Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" />`,
  },
  {
    id: "brush-stroke",
    name: "ブラシストローク",
    tags: ["ロゴ", "手書き", "アート"],
    svg: `<path d="M20,60 C30,40 70,30 80,50 C90,70 60,80 40,70 C20,60 30,40 50,40" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />`,
  },
]

// 装飾的なシェイプ
export const decorativeShapes = [
  {
    id: "laurel-wreath",
    name: "月桂樹",
    tags: ["装飾", "植物", "フレーム"],
    svg: `<path d="M30,20 C10,30 10,50 30,60 M70,20 C90,30 90,50 70,60 M25,30 C15,40 15,50 25,55 M75,30 C85,40 85,50 75,55 M35,25 C25,30 25,40 35,45 M65,25 C75,30 75,40 65,45" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />`,
  },
  {
    id: "floral-frame",
    name: "フローラルフレーム",
    tags: ["装飾", "植物", "フレーム"],
    svg: `<path d="M50,10 C60,20 70,10 70,20 C70,30 60,40 50,30 C40,40 30,30 30,20 C30,10 40,20 50,10 Z M50,90 C60,80 70,90 70,80 C70,70 60,60 50,70 C40,60 30,70 30,80 C30,90 40,80 50,90 Z M10,50 C20,60 10,70 20,70 C30,70 40,60 30,50 C40,40 30,30 20,30 C10,30 20,40 10,50 Z M90,50 C80,60 90,70 80,70 C70,70 60,60 70,50 C60,40 70,30 80,30 C90,30 80,40 90,50 Z" fill="none" stroke="currentColor" stroke-width="2" />`,
  },
  {
    id: "vintage-ornament",
    name: "ビンテージ装飾",
    tags: ["装飾", "ビンテージ", "フレーム"],
    svg: `<path d="M20,20 L30,10 L70,10 L80,20 M20,80 L30,90 L70,90 L80,80 M20,20 L10,30 L10,70 L20,80 M80,20 L90,30 L90,70 L80,80" fill="none" stroke="currentColor" stroke-width="2" />
  <path d="M40,40 C50,30 60,40 60,50 C60,60 50,70 40,60 C30,50 30,50 40,40 Z" fill="none" stroke="currentColor" stroke-width="2" />`,
  },
  {
    id: "swirl",
    name: "スワール",
    tags: ["装飾", "曲線", "エレガント"],
    svg: `<path d="M30,70 C20,60 20,40 30,30 C40,20 60,20 70,30 C80,40 80,60 70,70 C60,80 40,80 30,70 Z M30,70 C40,60 50,60 60,70" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />`,
  },
  {
    id: "ribbon",
    name: "リボン",
    tags: ["装飾", "祝い", "エレガント"],
    svg: `<path d="M20,30 C30,20 70,20 80,30 C90,40 80,50 70,45 C60,40 40,40 30,45 C20,50 10,40 20,30 Z" fill="currentColor" />`,
  },
]

// モノグラムシェイプ
export const monogramShapes = [
  {
    id: "circle-monogram",
    name: "サークルモノグラム",
    tags: ["モノグラム", "円", "イニシャル"],
    svg: `<circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="3" />
  <text x="50" y="65" font-family="serif" font-size="50" text-anchor="middle" fill="currentColor">A</text>`,
  },
  {
    id: "square-monogram",
    name: "スクエアモノグラム",
    tags: ["モノグラム", "四角", "イニシャル"],
    svg: `<rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" stroke-width="3" />
  <text x="50" y="65" font-family="serif" font-size="50" text-anchor="middle" fill="currentColor">B</text>`,
  },
  {
    id: "diamond-monogram",
    name: "ダイヤモンドモノグラム",
    tags: ["モノグラム", "ダイヤモンド", "イニシャル"],
    svg: `<polygon points="50,10 90,50 50,90 10,50" fill="none" stroke="currentColor" stroke-width="3" />
  <text x="50" y="65" font-family="serif" font-size="40" text-anchor="middle" fill="currentColor">C</text>`,
  },
]

// カテゴリー情報
export const categories = [
  { id: "all", name: "すべて" },
  { id: "basic", name: "基本", shapes: basicShapes },
  { id: "special", name: "特殊", shapes: specialShapes },
  { id: "abstract", name: "抽象", shapes: abstractShapes },
  { id: "business", name: "ビジネス", shapes: businessShapes },
  { id: "tech", name: "テクノロジー", shapes: techShapes },
  { id: "nature", name: "自然", shapes: natureShapes },
  { id: "food", name: "食品", shapes: foodShapes },
  { id: "animal", name: "動物", shapes: animalShapes },
  { id: "sport", name: "スポーツ", shapes: sportShapes },
  { id: "music", name: "音楽", shapes: musicShapes },
  { id: "transport", name: "交通", shapes: transportShapes },
  { id: "architecture", name: "建築", shapes: architectureShapes },
  { id: "medical", name: "医療", shapes: medicalShapes },
  { id: "education", name: "教育", shapes: educationShapes },
  // 新しいカテゴリーを追加
  { id: "logo", name: "ロゴ", shapes: logoShapes },
  { id: "decorative", name: "装飾", shapes: decorativeShapes },
  { id: "monogram", name: "モノグラム", shapes: monogramShapes },
]

// すべてのシェイプを結合
export const getAllShapes = () => {
  return [
    ...basicShapes,
    ...specialShapes,
    ...abstractShapes,
    ...businessShapes,
    ...techShapes,
    ...natureShapes,
    ...foodShapes,
    ...animalShapes,
    ...sportShapes,
    ...musicShapes,
    ...transportShapes,
    ...architectureShapes,
    ...medicalShapes,
    ...educationShapes,
    // 新しいシェイプカテゴリーを追加
    ...logoShapes,
    ...decorativeShapes,
    ...monogramShapes,
  ]
}

// カテゴリーIDからシェイプを取得
export const getShapesByCategory = (categoryId: string) => {
  if (categoryId === "all") {
    return getAllShapes()
  }

  const category = categories.find((c) => c.id === categoryId)
  return category?.shapes || []
}

