"use client";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Info, Play, Pause } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type {
  AnimationSettings,
  AnimationType,
  AnimationEasing,
  AnimationDirection,
} from "@/types";
import { useTranslations } from "next-intl";

interface AnimationSettingsProps {
  animation: AnimationSettings;
  onChange: (animation: AnimationSettings) => void;
  onPreview: () => void;
  isPreviewPlaying: boolean;
  togglePreview: () => void;
  elementType: "shape" | "text";
  elementIndex?: number;
  totalElements?: number;
}

export function AnimationSettingsComponent({
  animation,
  onChange,
  onPreview,
  isPreviewPlaying,
  togglePreview,
  elementType,
  elementIndex = 0,
  totalElements = 1,
}: AnimationSettingsProps) {
  const t = useTranslations("LogoCreator");

  // Animation type options
  const animationTypes: {
    value: AnimationType;
    label: string;
    description: string;
  }[] = [
    { value: "none", label: t("none"), description: t("anim_none_desc") },
    { value: "rotate", label: t("rotate"), description: t("anim_rotate_desc") },
    { value: "pulse", label: t("pulse"), description: t("anim_pulse_desc") },
    { value: "bounce", label: t("bounce"), description: t("anim_bounce_desc") },
    { value: "fade", label: t("fade"), description: t("anim_fade_desc") },
    { value: "slide", label: t("slide"), description: t("anim_slide_desc") },
    { value: "flip", label: t("flip"), description: t("anim_flip_desc") },
    { value: "shake", label: t("shake"), description: t("anim_shake_desc") },
    {
      value: "spin-pulse",
      label: t("spin_pulse"),
      description: t("anim_spin_pulse_desc"),
    },
    { value: "float", label: t("float"), description: t("anim_float_desc") },
    { value: "glitch", label: t("glitch"), description: t("anim_glitch_desc") },
    { value: "wave", label: t("wave"), description: t("anim_wave_desc") },
    { value: "morph", label: t("morph"), description: t("anim_morph_desc") },
    { value: "draw", label: t("draw"), description: t("anim_draw_desc") },
    { value: "blur", label: t("blur"), description: t("anim_blur_desc") },
    { value: "zoom", label: t("zoom"), description: t("anim_zoom_desc") },
    { value: "swing", label: t("swing"), description: t("anim_swing_desc") },
    {
      value: "vibrate",
      label: t("vibrate"),
      description: t("anim_vibrate_desc"),
    },
    {
      value: "typewriter",
      label: t("typewriter"),
      description: t("anim_typewriter_desc"),
    },
    {
      value: "spotlight",
      label: t("spotlight"),
      description: t("anim_spotlight_desc"),
    },
  ];

  // Easing options
  const easingOptions: { value: AnimationEasing; label: string }[] = [
    { value: "linear", label: t("linear") },
    { value: "ease", label: t("ease") },
    { value: "ease-in", label: t("ease_in") },
    { value: "ease-out", label: t("ease_out") },
    { value: "ease-in-out", label: t("ease_in_out") },
    { value: "elastic", label: t("elastic") },
    { value: "bounce", label: t("bounce_easing") },
    { value: "back", label: t("back") },
  ];

  // Direction options
  const directionOptions: { value: AnimationDirection; label: string }[] = [
    { value: "normal", label: t("normal") },
    { value: "reverse", label: t("reverse") },
    { value: "alternate", label: t("alternate") },
    { value: "alternate-reverse", label: t("alternate_reverse") },
  ];

  // Iteration options
  const iterationOptions = [
    { value: "1", label: t("once") },
    { value: "2", label: t("twice") },
    { value: "3", label: t("thrice") },
    { value: "5", label: t("iterations_5") },
    { value: "10", label: t("iterations_10") },
    { value: "infinite", label: t("infinite") },
  ];

  // Sequence options
  const sequenceOptions = [
    { value: "with-previous", label: t("with_previous") },
    { value: "after-previous", label: t("after_previous") },
  ];

  // Change animation type
  const handleTypeChange = (type: AnimationType) => {
    onChange({
      ...animation,
      type,
    });
  };

  // Change duration
  const handleDurationChange = (duration: number) => {
    onChange({
      ...animation,
      duration,
    });
  };

  // Change delay
  const handleDelayChange = (delay: number) => {
    onChange({
      ...animation,
      delay,
    });
  };

  // Change easing
  const handleEasingChange = (easing: AnimationEasing) => {
    onChange({
      ...animation,
      easing,
    });
  };

  // Change direction
  const handleDirectionChange = (direction: AnimationDirection) => {
    onChange({
      ...animation,
      direction,
    });
  };

  // Change iterations with enhanced check to prevent undefined errors
  const handleIterationsChange = (iterations: string) => {
    onChange({
      ...animation,
      iterations:
        iterations === "infinite" ? "infinite" : Number.parseInt(iterations),
    });
  };

  // Change sequence
  const handleSequenceChange = (
    sequence: "with-previous" | "after-previous" | undefined
  ) => {
    onChange({
      ...animation,
      sequence,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Label className="text-gray-300">
            {elementType === "shape"
              ? t("shape_animation")
              : `${t("text_animation")} ${elementIndex + 1}`}
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-400"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                <p>{t("animation_tooltip")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={togglePreview}
          className="border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 h-9"
        >
          {isPreviewPlaying ? (
            <Pause className="h-4 w-4 mr-1" />
          ) : (
            <Play className="h-4 w-4 mr-1" />
          )}
          {isPreviewPlaying ? t("stop_preview") : t("preview_animation")}
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="animation-type" className="text-gray-300">
          {t("animation_type")}
        </Label>
        <Select
          value={animation.type}
          onValueChange={(value) => handleTypeChange(value as AnimationType)}
        >
          <SelectTrigger
            id="animation-type"
            className="bg-gray-900/50 border-gray-700 text-white h-10"
          >
            <SelectValue placeholder={t("select_animation_type")} />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white max-h-[300px] overflow-y-auto">
            <div className="grid grid-cols-1 gap-1">
              {animationTypes.map((type) => (
                <SelectItem
                  key={type.value}
                  value={type.value}
                  className="flex flex-col items-start py-2 px-2 cursor-pointer hover:bg-gray-700 focus:bg-gray-700"
                >
                  <span className="font-medium">{type.label}</span>
                  <span className="text-xs text-gray-400">
                    {type.description}
                  </span>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>

      {animation.type !== "none" && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="animation-duration" className="text-gray-300">
                {t("duration")}: {animation.duration}
                {t("seconds")}
              </Label>
              <Slider
                id="animation-duration"
                min={0.1}
                max={10}
                step={0.1}
                value={[animation.duration]}
                onValueChange={(value) => handleDurationChange(value[0])}
                className="py-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="animation-delay" className="text-gray-300">
                {t("delay")}: {animation.delay}
                {t("seconds")}
              </Label>
              <Slider
                id="animation-delay"
                min={0}
                max={5}
                step={0.1}
                value={[animation.delay]}
                onValueChange={(value) => handleDelayChange(value[0])}
                className="py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="animation-easing" className="text-gray-300">
                {t("easing")}
              </Label>
              <Select
                value={animation.easing}
                onValueChange={(value) =>
                  handleEasingChange(value as AnimationEasing)
                }
              >
                <SelectTrigger
                  id="animation-easing"
                  className="bg-gray-900/50 border-gray-700 text-white"
                >
                  <SelectValue placeholder={t("select_easing")} />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {easingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="animation-direction" className="text-gray-300">
                {t("direction")}
              </Label>
              <Select
                value={animation.direction}
                onValueChange={(value) =>
                  handleDirectionChange(value as AnimationDirection)
                }
              >
                <SelectTrigger
                  id="animation-direction"
                  className="bg-gray-900/50 border-gray-700 text-white"
                >
                  <SelectValue placeholder={t("select_direction")} />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {directionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="animation-iterations" className="text-gray-300">
              {t("iterations")}
            </Label>
            <Select
              value={
                typeof animation.iterations === "string"
                  ? animation.iterations
                  : animation.iterations.toString()
              }
              onValueChange={handleIterationsChange}
            >
              <SelectTrigger
                id="animation-iterations"
                className="bg-gray-900/50 border-gray-700 text-white"
              >
                <SelectValue placeholder={t("select_iterations")} />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {iterationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {elementType === "text" && elementIndex > 0 && totalElements > 1 && (
            <div className="space-y-2">
              <Label htmlFor="animation-sequence" className="text-gray-300">
                {t("animation_sequence")}
              </Label>
              <Select
                value={animation.sequence || "with-previous"}
                onValueChange={(value) =>
                  handleSequenceChange(
                    value as "with-previous" | "after-previous"
                  )
                }
              >
                <SelectTrigger
                  id="animation-sequence"
                  className="bg-gray-900/50 border-gray-700 text-white"
                >
                  <SelectValue placeholder={t("select_sequence")} />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {sequenceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </>
      )}
    </div>
  );
}
