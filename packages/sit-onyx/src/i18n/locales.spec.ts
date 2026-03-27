import { expect, test, vi } from "vitest";
import { createI18n as createVueI18n } from "vue-i18n";
import type { TranslationValue } from "../types/i18n.js";
import type { OnyxTranslations } from "./index.js";

/**
 * Gets all nested keys of the given translation entry as a flattened array.
 *
 * @example ["key", "key.nested.child"]
 */
function getFlattenedTranslationKeys(key: string, value: TranslationValue): string[] {
  if (typeof value === "string") return [key];
  return Object.entries(value).flatMap(([nestedKey, nestedValue]) =>
    getFlattenedTranslationKeys(`${key}.${nestedKey}`, nestedValue),
  );
}

test.describe("should be able to compile all messages with vue-i18n", () => {
  const LOCALES = import.meta.glob<true, string, OnyxTranslations>("./locales/*.json", {
    eager: true,
  });

  test.each(Object.entries(LOCALES))("for $0", async (locale, localeMessages) => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    const warnErrorSpy = vi.spyOn(console, "warn");

    const localeName = locale.replace(/^\.\/locales\//, "").replace(/\.json$/, "");

    const vueI18n = createVueI18n({
      legacy: false,
      locale: localeName,
      messages: { [localeName]: localeMessages },
    });

    const keys = Object.entries(localeMessages).flatMap(([key, value]) =>
      getFlattenedTranslationKeys(key, value),
    );

    for (const key of keys) {
      expect(() => vueI18n.global.t(key)).not.toThrow();
    }

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(warnErrorSpy).not.toHaveBeenCalled();
  });
});
