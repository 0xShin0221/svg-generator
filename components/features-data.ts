// features-data.ts - Internationalized features data

export interface FeatureData {
  iconName: "PenTool" | "Wand2" | "Zap" | "Download" | "Share2" | "Monitor";
  iconColor: string;
  borderColor: string;
  hoverBorderColor: string;
  gradientFrom: string;
  gradientTo: string;
  titleKey: string; // Changed to use translation key
  featureKeys: string[]; // Changed to use translation keys
  delay: number;
}

// Export the features data with typings and translation keys
export const getFeaturesData = (): FeatureData[] => [
  {
    iconName: "PenTool",
    iconColor: "blue-400",
    borderColor: "blue-500/20",
    hoverBorderColor: "blue-500/40",
    gradientFrom: "blue-500/20",
    gradientTo: "purple-500/20",
    titleKey: "design_features",
    featureKeys: [
      "design_templates",
      "design_customization",
      "design_custom_fonts",
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
    titleKey: "ai_features",
    featureKeys: [
      "ai_logo_generation",
      "ai_style_suggestions",
      "ai_color_palette",
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
    titleKey: "animation_features",
    featureKeys: [
      "animation_effects",
      "animation_customization",
      "animation_multiple_elements",
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
    titleKey: "export_features",
    featureKeys: [
      "export_formats",
      "export_high_resolution",
      "export_transparent_background",
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
    titleKey: "sharing_features",
    featureKeys: [
      "sharing_save_projects",
      "sharing_team_sharing",
      "sharing_version_history",
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
    titleKey: "usability_features",
    featureKeys: [
      "usability_interface",
      "usability_languages",
      "usability_free",
    ],
    delay: 0.5,
  },
];

// Other data converted to use translation keys
export const getSteps = () => [
  {
    titleKey: "step_select_template",
    descriptionKey: "step_select_template_desc",
    iconName: "Palette",
  },
  {
    titleKey: "step_customize",
    descriptionKey: "step_customize_desc",
    iconName: "MousePointer",
  },
  {
    titleKey: "step_download",
    descriptionKey: "step_download_desc",
    iconName: "Download",
  },
];

// Free plan features now use translation keys
export const getFreePlanFeatures = () => [
  "free_feature_templates",
  "free_feature_text",
  "free_feature_colors",
  "free_feature_svg",
  "free_feature_transparent",
  "free_feature_commercial",
];

// Pro plan features now use translation keys
export const getProPlanFeatures1 = () => [
  "pro_feature_templates",
  "pro_feature_customization",
  "pro_feature_fonts",
  "pro_feature_projects",
];

export const getProPlanFeatures2 = () => [
  "pro_feature_ai",
  "pro_feature_animation",
  "pro_feature_team",
  "pro_feature_support",
];

// Testimonials now use translation keys
export const getTestimonials = () => [
  {
    nameKey: "testimonial_1_name",
    initials: "TK",
    titleKey: "testimonial_1_title",
    rating: 5,
    textKey: "testimonial_1_text",
  },
  {
    nameKey: "testimonial_2_name",
    initials: "SM",
    titleKey: "testimonial_2_title",
    rating: 5,
    textKey: "testimonial_2_text",
  },
  {
    nameKey: "testimonial_3_name",
    initials: "ST",
    titleKey: "testimonial_3_title",
    rating: 4,
    textKey: "testimonial_3_text",
  },
];

// FAQs now use translation keys
export const getFaqs = () => [
  {
    questionKey: "faq_1_question",
    answerKey: "faq_1_answer",
  },
  {
    questionKey: "faq_2_question",
    answerKey: "faq_2_answer",
  },
  {
    questionKey: "faq_3_question",
    answerKey: "faq_3_answer",
  },
  {
    questionKey: "faq_4_question",
    answerKey: "faq_4_answer",
  },
];
