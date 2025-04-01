export const shapeGalleryItems = [
  {
    id: "circle",
    name: "円",
    svg: `<circle cx="50" cy="50" r="50" fill="currentColor" />`,
  },
  {
    id: "square",
    name: "正方形",
    svg: `<rect x="0" y="0" width="100" height="100" fill="currentColor" />`,
  },
  {
    id: "rounded-square",
    name: "角丸正方形",
    svg: `<rect x="0" y="0" width="100" height="100" rx="15" ry="15" fill="currentColor" />`,
  },
  {
    id: "hexagon",
    name: "六角形",
    svg: `<polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="currentColor" />`,
  },
  {
    id: "triangle",
    name: "三角形",
    svg: `<polygon points="50,0 100,100 0,100" fill="currentColor" />`,
  },
  {
    id: "star",
    name: "星",
    svg: `<polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="currentColor" />`,
  },
  {
    id: "shield",
    name: "シールド",
    svg: `<path d="M50,0 L100,20 L100,60 C100,80 75,100 50,100 C25,100 0,80 0,60 L0,20 L50,0 Z" fill="currentColor" />`,
  },
  {
    id: "advanced",
    name: "高度なシェイプ",
    svg: `<path d="M50,0 C60,40 100,50 70,80 C90,100 60,100 50,80 C40,100 10,100 30,80 C0,50 40,40 50,0 Z" fill="currentColor" />`,
  },
];
