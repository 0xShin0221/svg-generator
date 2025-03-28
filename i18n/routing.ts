import { defineRouting } from "next-intl/routing";

export const LANGUAGES = ["ja", "en", "de", "zh", "zh-TW", "es", "fr", "hi"];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LANGUAGES,

  // Used when no locale matches
  defaultLocale: "ja",

  localeDetection: true,
});
