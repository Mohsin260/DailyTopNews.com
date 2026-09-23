export const LOCALES = ["en", "es", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const RTL_LOCALES: Locale[] = ["ar"];
export const DEFAULT_LOCALE: Locale = "en";

// Locale switching is disabled for now — English only.
// Re-enable NEXT_PUBLIC_LOCALE (and translate src/messages/*.json) later.
export const LOCALES_ENABLED = false as const;

export const DEPLOYMENT_LOCALE: Locale = DEFAULT_LOCALE;

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

export const LOCALE_HTML_LANG: Record<Locale, string> = {
  en: "en",
  es: "es",
  ar: "ar",
};

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  ar: "العربية",
};
