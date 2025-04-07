"use client";

import { cn } from "@/lib/utils";
import type {
  AnimationSettings,
  GradientDirection,
  LogoSettings,
} from "@/types";
import { useTranslations } from "next-intl";
import { getAdvancedShapeById } from "./advanced-shapes";
function getAnimationStyle(
  animSettings: AnimationSettings,
  className: string
): string {
  if (animSettings.type === "none") return "";

  // アニメーションのキーフレーム定義
  const keyframes: Record<string, string> = {
    rotate:
      "@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }",
    pulse:
      "@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }",
    bounce:
      "@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }",
    fade: "@keyframes fade { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }",
    slide:
      "@keyframes slide { 0% { transform: translateX(-20px); } 100% { transform: translateX(20px); } }",
    flip: "@keyframes flip { 0% { transform: perspective(400px) rotateY(0); } 100% { transform: perspective(400px) rotateY(360deg); } }",
    shake:
      "@keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 20%, 40%, 60%, 80% { transform: translateX(5px); } }",
    "spin-pulse":
      "@keyframes spin-pulse { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.2); } 100% { transform: rotate(360deg) scale(1); } }",
    float:
      "@keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-10px) rotate(-5deg); } 50% { transform: translateY(0) rotate(0deg); } 75% { transform: translateY(10px) rotate(5deg); } }",
    glitch:
      "@keyframes glitch { 0%, 100% { transform: translate(0); } 20% { transform: translate(-5px, 5px); } 40% { transform: translate(-5px, -5px); } 60% { transform: translate(5px, 5px); } 80% { transform: translate(5px, -5px); } }",
    wave: "@keyframes wave { 0%, 100% { transform: skewX(0deg); } 25% { transform: skewX(10deg); } 50% { transform: skewX(0deg); } 75% { transform: skewX(-10deg); } }",
    morph:
      "@keyframes morph { 0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } 50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; } }",
    draw: "@keyframes draw { 0% { stroke-dashoffset: 1000; } 100% { stroke-dashoffset: 0; } }",
    blur: "@keyframes blur { 0%, 100% { filter: blur(0px); } 50% { filter: blur(4px); } }",
    zoom: "@keyframes zoom { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.5); } }",
    swing:
      "@keyframes swing { 0%, 100% { transform: rotate(0deg); } 20% { transform: rotate(15deg); } 40% { transform: rotate(-10deg); } 60% { transform: rotate(5deg); } 80% { transform: rotate(-5deg); } }",
    vibrate:
      "@keyframes vibrate { 0%, 100% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(-2px, -2px); } 60% { transform: translate(2px, 2px); } 80% { transform: translate(2px, -2px); } }",
    typewriter:
      "@keyframes typewriter { from { width: 0; } to { width: 100%; } }",
    spotlight:
      "@keyframes spotlight { 0%, 100% { filter: drop-shadow(0 0 10px rgba(255,255,255,0.8)); } 50% { filter: drop-shadow(0 0 20px rgba(255,255,255,0.4)); } }",
  };

  // イージング関数のマッピング
  const easingMap: Record<string, string> = {
    linear: "linear",
    ease: "ease",
    "ease-in": "ease-in",
    "ease-out": "ease-out",
    "ease-in-out": "ease-in-out",
    elastic: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    bounce: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    back: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
  };

  // アニメーション方向のマッピング
  const directionMap: Record<string, string> = {
    normal: "normal",
    reverse: "reverse",
    alternate: "alternate",
    "alternate-reverse": "alternate-reverse",
  };

  // 特殊なアニメーションのスタイル
  let specialStyles = "";
  if (animSettings.type === "typewriter") {
    specialStyles = `
    .typewriter {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      border-right: 3px solid;
      width: 0;
      animation: typewriter ${animSettings.duration}s ${
      easingMap[animSettings.easing]
    } ${animSettings.delay}s 1 forwards,
                 blink-caret 0.75s step-end infinite;
    }
    @keyframes blink-caret {
      from, to { border-color: transparent; }
      50% { border-color: white; }
    }
  `;
  }

  // アニメーションプロパティを構築
  const iterations =
    animSettings.iterations === "infinite"
      ? "infinite"
      : animSettings.iterations;
  const animationProps = `${animSettings.type} ${animSettings.duration}s ${
    easingMap[animSettings.easing]
  } ${animSettings.delay}s ${iterations} ${
    directionMap[animSettings.direction]
  }`;

  return `
  ${keyframes[animSettings.type]}
  ${specialStyles}
  .${className}-animation {
    animation: ${animationProps};
    transform-origin: center;
  }
`;
}

// LogoPreview コンポーネント
function LogoPreview({
  settings,
  isPlaying,
  customFonts = [],
}: {
  settings: LogoSettings;
  isPlaying: boolean;
  customFonts?: { name: string; url: string }[];
}) {
  // i18nフックを使用
  const t = useTranslations();

  const {
    texts,
    backgroundColor,
    shape,
    padding,
    animation,
    advancedShapeId,
    gradient,
  } = settings;

  // サイズ計算
  const mainText = texts[0] || { text: "", fontSize: 48 };
  const baseSize = Math.max(
    200,
    mainText.fontSize * 1.5 * Math.max(1, mainText.text.length / 2)
  );
  const size = baseSize + (shape !== "none" ? padding * 2 : 0);

  // アニメーションスタイルを生成
  let animationStyles = "";

  // シェイプアニメーション
  if (animation && animation.type !== "none" && isPlaying) {
    animationStyles += getAnimationStyle(animation, "shape");
  }

  // テキストアニメーション
  texts.forEach((text, index) => {
    if (text.animation && text.animation.type !== "none" && isPlaying) {
      animationStyles += getAnimationStyle(text.animation, `text-${index}`);
    }
  });

  // シェイプ要素を生成
  let shapeElement = null;

  if (shape === "circle") {
    shapeElement = (
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
        fill={
          gradient && gradient.type !== "none"
            ? "url(#gradient)"
            : backgroundColor
        }
        className={
          animation && animation.type !== "none" && isPlaying
            ? "shape-animation"
            : ""
        }
      />
    );
  } else if (shape === "square") {
    shapeElement = (
      <rect
        x="0"
        y="0"
        width={size}
        height={size}
        fill={
          gradient && gradient.type !== "none"
            ? "url(#gradient)"
            : backgroundColor
        }
        className={
          animation && animation.type !== "none" && isPlaying
            ? "shape-animation"
            : ""
        }
      />
    );
  } else if (shape === "rounded-square") {
    shapeElement = (
      <rect
        x="0"
        y="0"
        width={size}
        height={size}
        rx={size / 10}
        ry={size / 10}
        fill={
          gradient && gradient.type !== "none"
            ? "url(#gradient)"
            : backgroundColor
        }
        className={
          animation && animation.type !== "none" && isPlaying
            ? "shape-animation"
            : ""
        }
      />
    );
  } else if (shape === "hexagon") {
    const points = `${size / 2},0 ${size},${size / 4} ${size},${
      (3 * size) / 4
    } ${size / 2},${size} 0,${(3 * size) / 4} 0,${size / 4}`;
    shapeElement = (
      <polygon
        points={points}
        fill={
          gradient && gradient.type !== "none"
            ? "url(#gradient)"
            : backgroundColor
        }
        className={
          animation && animation.type !== "none" && isPlaying
            ? "shape-animation"
            : ""
        }
      />
    );
  } else if (shape === "triangle") {
    shapeElement = (
      <polygon
        points={`${size / 2},0 ${size},${size} 0,${size}`}
        fill={
          gradient && gradient.type !== "none"
            ? "url(#gradient)"
            : backgroundColor
        }
        className={
          animation && animation.type !== "none" && isPlaying
            ? "shape-animation"
            : ""
        }
      />
    );
  } else if (shape === "star") {
    // 星形の頂点を計算
    const center = size / 2;
    const outerRadius = size / 2;
    const innerRadius = size / 4;
    let points = "";

    for (let i = 0; i < 10; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = ((i * 36 - 90) * Math.PI) / 180;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      points += `${x},${y} `;
    }

    shapeElement = (
      <polygon
        points={points.trim()}
        fill={
          gradient && gradient.type !== "none"
            ? "url(#gradient)"
            : backgroundColor
        }
        className={
          animation && animation.type !== "none" && isPlaying
            ? "shape-animation"
            : ""
        }
      />
    );
  } else if (shape === "shield") {
    shapeElement = (
      <path
        d={`M${size / 2},0 L${size},${size / 5} L${size},${
          (3 * size) / 5
        } C${size},${(4 * size) / 5} ${(3 * size) / 4},${size} ${
          size / 2
        },${size} C${size / 4},${size} 0,${(4 * size) / 5} 0,${
          (3 * size) / 5
        } L0,${size / 5} Z`}
        fill={
          gradient && gradient.type !== "none"
            ? "url(#gradient)"
            : backgroundColor
        }
        className={
          animation && animation.type !== "none" && isPlaying
            ? "shape-animation"
            : ""
        }
      />
    );
  } else if (shape === "advanced" && advancedShapeId) {
    // 高度なシェイプの場合は、AdvancedShapesコンポーネントから対応するSVGを取得
    const advancedShape = getAdvancedShapeById(advancedShapeId);
    if (advancedShape) {
      // 実際のSVGパスを使用
      shapeElement = (
        <g
          dangerouslySetInnerHTML={{
            __html: advancedShape.svg.replace(
              /currentColor/g,
              gradient && gradient.type !== "none"
                ? "url(#gradient)"
                : backgroundColor
            ),
          }}
          className={
            animation && animation.type !== "none" && isPlaying
              ? "shape-animation"
              : ""
          }
        />
      );
    }
  }

  // グラデーション方向を角度に変換
  const getGradientRotation = (direction: GradientDirection): number => {
    switch (direction) {
      case "to-right":
        return 90;
      case "to-left":
        return 270;
      case "to-bottom":
        return 180;
      case "to-top":
        return 0;
      case "to-bottom-right":
        return 135;
      case "to-bottom-left":
        return 225;
      case "to-top-right":
        return 45;
      case "to-top-left":
        return 315;
      default:
        return 90;
    }
  };

  // SVG内にスタイルタグを追加してカスタムフォントを定義
  const fontFaceStyles = customFonts
    .map(
      (font) => `
    @font-face {
      font-family: "${font.name}";
      src: url("${font.url}") format("woff2");
      font-weight: normal;
      font-style: normal;
    }
  `
    )
    .join("\n");

  return (
    <svg
      id="logo-preview"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "max-w-full max-h-full drop-shadow-lg",
        shape === "none" && "border border-dashed border-gray-600"
      )}
    >
      {/* グラデーション定義 */}
      {gradient && gradient.type !== "none" && (
        <defs>
          {gradient.type === "linear" ? (
            <linearGradient
              id="gradient"
              gradientTransform={`rotate(${getGradientRotation(
                gradient.direction
              )})`}
            >
              <stop offset="0%" stopColor={gradient.startColor} />
              <stop offset="100%" stopColor={gradient.endColor} />
            </linearGradient>
          ) : (
            <radialGradient id="gradient">
              <stop offset="0%" stopColor={gradient.startColor} />
              <stop offset="100%" stopColor={gradient.endColor} />
            </radialGradient>
          )}
        </defs>
      )}
      <style>
        {fontFaceStyles}
        {animationStyles}
      </style>

      {shape !== "none" && shapeElement}

      {texts.map((textItem, index) => {
        // テキストのレイアウト設定を取得
        const layout = textItem.layout || {
          alignment: "center",
          rotation: 0,
          letterSpacing: 0,
          lineHeight: 1.2,
        };

        // テキストアンカーの設定
        let textAnchor = "middle";
        if (layout.alignment === "left") textAnchor = "start";
        if (layout.alignment === "right") textAnchor = "end";

        return (
          <text
            key={textItem.id}
            x={
              layout.alignment === "left"
                ? "10%"
                : layout.alignment === "right"
                ? "90%"
                : "50%"
            }
            y={`${50 + textItem.offsetY}%`}
            dominantBaseline="middle"
            textAnchor={textAnchor}
            fill={textItem.color}
            fontFamily={`${textItem.fontFamily}, sans-serif`}
            fontWeight="bold"
            fontSize={textItem.fontSize}
            style={{
              letterSpacing: `${layout.letterSpacing}px`,
              lineHeight: layout.lineHeight,
              transform: layout.rotation
                ? `rotate(${layout.rotation}deg)`
                : undefined,
              transformOrigin: "center",
            }}
            className={
              textItem.animation &&
              textItem.animation.type !== "none" &&
              isPlaying
                ? `text-${index}-animation`
                : ""
            }
          >
            <title>{textItem.text}</title>
            {textItem.animation?.type === "typewriter" && isPlaying ? (
              <tspan className="typewriter">{textItem.text}</tspan>
            ) : (
              textItem.text
            )}
          </text>
        );
      })}
    </svg>
  );
}

export default LogoPreview;
