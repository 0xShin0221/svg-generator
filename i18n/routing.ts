import { defineRouting } from "next-intl/routing";

export const LANGUAGES = ["ja", "en", "de"];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LANGUAGES,

  // Used when no locale matches
  defaultLocale: "ja",

  localeDetection: true,
});
