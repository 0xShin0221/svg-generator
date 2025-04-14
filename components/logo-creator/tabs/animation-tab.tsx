import { AnimationSettingsComponent } from "@/components/animation-settings";
import { AnimationPresets } from "@/components/animation-presets";
import { useTranslations } from "next-intl";
import { useLogo } from "../context/logo-context";

interface AnimationTabProps {
  isPreviewPlaying?: boolean;
  togglePreview?: () => void;
}

export const AnimationTab: React.FC<AnimationTabProps> = ({
  isPreviewPlaying: externalIsPreviewPlaying,
  togglePreview: externalTogglePreview,
}) => {
  const t = useTranslations("LogoCreator");
  const {
    settings,
    activeTextId,
    isPreviewPlaying: contextIsPreviewPlaying,
    togglePreview: contextTogglePreview,
    handleAnimationChange,
    handleTextAnimationChange,
    updateSettings,
  } = useLogo();

  // Use props if provided, otherwise use context
  const isPreviewPlaying =
    externalIsPreviewPlaying !== undefined
      ? externalIsPreviewPlaying
      : contextIsPreviewPlaying;

  const togglePreview = externalTogglePreview || contextTogglePreview;

  // Find active text element
  const activeText =
    settings.texts.find((t) => t.id === activeTextId) || settings.texts[0];

  return (
    <div className="space-y-6">
      {/* Animation Presets */}
      <AnimationPresets
        onSelect={(shapeAnimation, textAnimations) => {
          // Create updated settings with new animations
          const updatedSettings = { ...settings };

          // Apply shape animation
          updatedSettings.animation = shapeAnimation;

          // Apply text animations (only for existing texts)
          updatedSettings.texts = updatedSettings.texts.map((text, index) => {
            if (index < textAnimations.length) {
              return {
                ...text,
                animation: textAnimations[index],
              };
            }
            return text;
          });

          // Update settings
          updateSettings(updatedSettings);

          // Start preview
          togglePreview();
        }}
      />

      <div className="border-t border-gray-700 my-4" />

      {/* Shape Animation Settings */}
      <AnimationSettingsComponent
        animation={settings.animation}
        onChange={handleAnimationChange}
        onPreview={() => {}}
        isPreviewPlaying={isPreviewPlaying}
        togglePreview={togglePreview}
        elementType="shape"
      />

      <div className="border-t border-gray-700 my-4" />

      {/* Text Animation Settings */}
      {settings.texts.map((textItem, index) => (
        <div
          key={textItem.id}
          className={activeTextId === textItem.id ? "" : "hidden"}
        >
          <AnimationSettingsComponent
            animation={textItem.animation}
            onChange={handleTextAnimationChange}
            onPreview={() => {}}
            isPreviewPlaying={isPreviewPlaying}
            togglePreview={togglePreview}
            elementType="text"
            elementIndex={index}
            totalElements={settings.texts.length}
          />
        </div>
      ))}
    </div>
  );
};
