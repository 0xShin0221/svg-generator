import type React from "react";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import type {
  LogoSettings,
  TextElement,
  AnimationSettings,
  GradientSettings,
  TextLayoutOptions,
  LogoShape,
} from "@/types";

// Define context type
type LogoContextType = {
  settings: LogoSettings;
  updateSettings: (settings: LogoSettings) => void;
  updateSettingsPartial: <K extends keyof LogoSettings>(
    key: K,
    value: LogoSettings[K]
  ) => void;
  activeTextId: string;
  setActiveTextId: (id: string) => void;
  activeText: TextElement;
  updateTextElement: (id: string, updates: Partial<TextElement>) => void;
  addTextElement: () => void;
  removeTextElement: (id: string) => void;
  customFonts: { name: string; url: string }[];
  addCustomFont: (name: string, url: string) => void;
  isPreviewPlaying: boolean;
  togglePreview: () => void;
  handleTextLayoutChange: (layoutOptions: Partial<TextLayoutOptions>) => void;
  handleTextAnimationChange: (animation: AnimationSettings) => void;
  handleAnimationChange: (animation: AnimationSettings) => void;
  applyColorPreset: (bg: string, text: string) => void;
  selectAdvancedShape: (shapeId: string) => void;
};

// Default animation settings
const defaultAnimationSettings: AnimationSettings = {
  type: "none",
  duration: 2,
  delay: 0,
  easing: "ease",
  direction: "normal",
  iterations: "infinite",
};

// Create context with default values
const LogoContext = createContext<LogoContextType | undefined>(undefined);

// Provider component
export const LogoProvider: React.FC<{
  children: React.ReactNode;
  initialSettings?: LogoSettings | null;
  onSelectLogo?: (settings: LogoSettings) => void;
}> = ({ children, initialSettings, onSelectLogo }) => {
  // Initialize state with default values or passed initialSettings
  const [settings, setSettings] = useState<LogoSettings>(
    initialSettings || {
      texts: [
        {
          id: "main",
          text: "LOGO",
          color: "#ffffff",
          fontSize: 48,
          fontFamily: "Arial",
          offsetY: 0,
          animation: { ...defaultAnimationSettings },
          layout: {
            alignment: "center",
            rotation: 0,
            letterSpacing: 0,
            lineHeight: 1.2,
          },
        },
      ],
      backgroundColor: "#3b82f6",
      shape: "circle",
      padding: 20,
      animation: { ...defaultAnimationSettings },
      advancedShapeId: undefined,
      gradient: {
        type: "none",
        direction: "to-right",
        startColor: "#3b82f6",
        endColor: "#8b5cf6",
      },
    }
  );

  const [activeTextId, setActiveTextId] = useState(
    settings.texts[0]?.id || "main"
  );
  const [customFonts, setCustomFonts] = useState<
    { name: string; url: string }[]
  >([]);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  const previewTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Compute active text element
  const activeText =
    settings.texts.find((t) => t.id === activeTextId) || settings.texts[0];

  // Update settings with a new complete settings object
  const updateSettings = (newSettings: LogoSettings) => {
    setSettings(newSettings);
    if (onSelectLogo) {
      onSelectLogo(newSettings);
    }
  };

  // Update a specific setting key
  const updateSettingsPartial = <K extends keyof LogoSettings>(
    key: K,
    value: LogoSettings[K]
  ) => {
    setSettings((prev) => {
      // Special handling for shape changes
      if (key === "shape" && value !== "advanced") {
        const newSettings = {
          ...prev,
          [key]: value,
          advancedShapeId: undefined,
        };
        if (onSelectLogo) {
          onSelectLogo(newSettings);
        }
        return newSettings;
      }

      const newSettings = { ...prev, [key]: value };
      if (onSelectLogo) {
        onSelectLogo(newSettings);
      }
      return newSettings;
    });
  };

  // Update a text element
  const updateTextElement = (id: string, updates: Partial<TextElement>) => {
    setSettings((prev) => {
      const updatedTexts = prev.texts.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      );

      const newSettings = { ...prev, texts: updatedTexts };
      if (onSelectLogo) {
        onSelectLogo(newSettings);
      }
      return newSettings;
    });
  };

  // Add a new text element
  const addTextElement = () => {
    const newId = `text-${Date.now()}`;
    const newText: TextElement = {
      id: newId,
      text: "サブテキスト",
      color: "#ffffff",
      fontSize: 24,
      fontFamily: "Arial",
      offsetY: 20,
      animation: { ...defaultAnimationSettings },
    };

    setSettings((prev) => {
      const newSettings = {
        ...prev,
        texts: [...prev.texts, newText],
      };
      if (onSelectLogo) {
        onSelectLogo(newSettings);
      }
      return newSettings;
    });

    setActiveTextId(newId);
  };

  // Remove a text element
  const removeTextElement = (id: string) => {
    if (settings.texts.length <= 1) return; // Keep at least one text element

    setSettings((prev) => {
      const updatedTexts = prev.texts.filter((t) => t.id !== id);

      // If removing active text, set first remaining text as active
      if (activeTextId === id && updatedTexts.length > 0) {
        setActiveTextId(updatedTexts[0].id);
      }

      const newSettings = { ...prev, texts: updatedTexts };
      if (onSelectLogo) {
        onSelectLogo(newSettings);
      }
      return newSettings;
    });
  };

  // Add a custom font
  const addCustomFont = (name: string, url: string) => {
    setCustomFonts((prev) => {
      const exists = prev.some((font) => font.name === name);
      if (exists) {
        return prev.map((font) => (font.name === name ? { name, url } : font));
      }
      return [...prev, { name, url }];
    });
  };

  // Toggle preview animation
  const togglePreview = () => {
    // Clear any existing timer
    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }

    // Toggle the preview state
    const newState = !isPreviewPlaying;
    setIsPreviewPlaying(newState);

    // If turning on, set a timer to turn it off after the animations complete
    if (newState) {
      const maxDuration =
        Math.max(
          settings.animation?.duration || 0,
          ...settings.texts.map((t) => t.animation?.duration || 0)
        ) *
        1000 *
        2; // Max duration * 2 seconds

      previewTimerRef.current = setTimeout(() => {
        setIsPreviewPlaying(false);
      }, maxDuration + 1000); // Add a little extra time
    }
  };

  // Handle text layout changes
  const handleTextLayoutChange = (
    layoutOptions: Partial<TextLayoutOptions>
  ) => {
    setSettings((prev) => {
      const updatedTexts = prev.texts.map((t) => {
        if (t.id === activeTextId) {
          return {
            ...t,
            layout: {
              ...(t.layout || {
                alignment: "center",
                rotation: 0,
                letterSpacing: 0,
                lineHeight: 1.2,
              }),
              ...layoutOptions,
            },
          };
        }
        return t;
      });

      const newSettings = {
        ...prev,
        texts: updatedTexts,
      };

      if (onSelectLogo) {
        onSelectLogo(newSettings);
      }

      return newSettings;
    });
  };

  // Handle text animation changes
  const handleTextAnimationChange = (animation: AnimationSettings) => {
    updateTextElement(activeTextId, { animation });
  };

  // Handle logo animation changes
  const handleAnimationChange = (animation: AnimationSettings) => {
    updateSettingsPartial("animation", animation);
  };

  // Apply color preset
  const applyColorPreset = (bg: string, text: string) => {
    setSettings((prev) => {
      // Update active text element color
      const updatedTexts = prev.texts.map((t) =>
        t.id === activeTextId ? { ...t, color: text } : t
      );

      const newSettings = {
        ...prev,
        backgroundColor: bg,
        texts: updatedTexts,
      };

      if (onSelectLogo) {
        onSelectLogo(newSettings);
      }

      return newSettings;
    });
  };

  // Select advanced shape
  const selectAdvancedShape = (shapeId: string) => {
    setSettings((prev) => {
      const newSettings = {
        ...prev,
        shape: "advanced" as LogoShape,
        advancedShapeId: shapeId,
      };

      if (onSelectLogo) {
        onSelectLogo(newSettings);
      }

      return newSettings;
    });
  };

  // Effect to update settings when initialSettings changes
  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  // Clean up timers when component unmounts
  useEffect(() => {
    return () => {
      if (previewTimerRef.current) {
        clearTimeout(previewTimerRef.current);
      }
    };
  }, []);

  // Provide context value
  const contextValue: LogoContextType = {
    settings,
    updateSettings,
    updateSettingsPartial,
    activeTextId,
    setActiveTextId,
    activeText,
    updateTextElement,
    addTextElement,
    removeTextElement,
    customFonts,
    addCustomFont,
    isPreviewPlaying,
    togglePreview,
    handleTextLayoutChange,
    handleTextAnimationChange,
    handleAnimationChange,
    applyColorPreset,
    selectAdvancedShape,
  };

  return (
    <LogoContext.Provider value={contextValue}>{children}</LogoContext.Provider>
  );
};

// Custom hook for using the logo context
export const useLogo = () => {
  const context = useContext(LogoContext);
  if (context === undefined) {
    throw new Error("useLogo must be used within a LogoProvider");
  }
  return context;
};
