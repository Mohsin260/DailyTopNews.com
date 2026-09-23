"use client";

import { DEFAULT_LOCALE, LOCALES_ENABLED } from "@/lib/i18n";
import { useLocale } from "./useLocale";

type Messages = Record<string, any>;

let cachedMessages: Record<string, Messages> = {};

function getMessages(locale: string): Messages {
  // Locale packs are disabled for now — always load English.
  const key = LOCALES_ENABLED ? locale : DEFAULT_LOCALE;
  if (cachedMessages[key]) return cachedMessages[key];

  try {
    const mod = require(`@/messages/${key}.json`);
    cachedMessages[key] = mod.default || mod;
  } catch {
    cachedMessages[key] = {};
  }

  return cachedMessages[key];
}

function resolveKey(obj: any, path: string): string | undefined {
  const val = path.split(".").reduce((acc, key) => acc?.[key], obj);
  return typeof val === "string" ? val : undefined;
}

export function useTranslations(namespace?: string) {
  const locale = useLocale();
  const messages = getMessages(locale);

  return (key: string): string => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return resolveKey(messages, fullKey) || resolveKey(messages, key) || key;
  };
}
