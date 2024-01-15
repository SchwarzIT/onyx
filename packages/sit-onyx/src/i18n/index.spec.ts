import { expect, test, vi } from "vitest";
import * as vue from "vue";
import { injectI18n, provideI18n } from ".";
import type { ObjectToDottedStrings, OnyxTranslations, ProvideI18nOptions } from "..";

vi.mock("vue", async (importOriginal) => {
  const module: typeof vue = await importOriginal();

  // keep track of provide/inject because they need to be mocked
  const provided = new Map();

  return {
    ...module,
    provide: vi.fn((key, value) => provided.set(key, value)) satisfies (typeof vue)["provide"],
    inject: vi.fn((key) => provided.get(key)) satisfies (typeof vue)["inject"],
  };
});

vi.mock("./locales/en-US.json", () => {
  return {
    default: {
      helloWorld: "Hello World",
    },
  };
});

/**
 * These two types are needed to type cast messages/keys in the tests below
 * because we will use custom test messages/keys which will not fit the type
 * of our "real" component translations
 */
type TestTranslationKey = ObjectToDottedStrings<OnyxTranslations>;
type TestMessages = ProvideI18nOptions["messages"];

test("should provide/inject i18n", () => {
  provideI18n({ locale: "test" });
  let i18n = injectI18n();

  expect(i18n).toBeDefined();
  expect(i18n.locale.value).toBe("test");

  // should keep locale up to date if a ref is passed as option
  const locale = vue.ref("a");
  provideI18n({ locale });
  i18n = injectI18n();

  expect(i18n.locale.value).toBe("a");
  locale.value = "b";
  expect(i18n.locale.value).toBe("b");
});

test("should translate with/without placeholders", () => {
  provideI18n({
    locale: "en-US",
    messages: {
      "en-US": {
        plain: "Hello World",
        placeholder: "Hello {firstName} {lastName}",
      },
    } as TestMessages,
  });

  const { t } = injectI18n();

  let message = t.value("plain" as TestTranslationKey);
  expect(message).toBe("Hello World");

  message = t.value("placeholder" as TestTranslationKey, {
    firstName: "John",
    lastName: "Doe",
  });
  expect(message).toBe("Hello John Doe");

  // should return empty string for missing translation
  message = t.value("does.not.exist" as TestTranslationKey);
  expect(message).toBe("");

  // removes the original placeholders if no values were provided (same behavior as "vue-i18n")
  message = t.value("placeholder" as TestTranslationKey, {
    firstName: undefined,
    lastName: undefined,
  });
  expect(message).toBe("Hello");
});

test("should translate with pluralization", () => {
  provideI18n({
    locale: "en-US",
    messages: {
      "en-US": {
        pluralization: "Zero items | 1 item | {n} items",
        pluralizationWithoutZero: "1 item | {n} items",
        withoutPluralization: '{n} items and pipe "|" is part of the text',
      },
    } as TestMessages,
  });

  const { t } = injectI18n();

  let message = t.value("pluralization" as TestTranslationKey, { n: 0 });
  expect(message).toBe("Zero items");

  message = t.value("pluralization" as TestTranslationKey, { n: 1 });
  expect(message).toBe("1 item");

  message = t.value("pluralization" as TestTranslationKey, { n: 2 });
  expect(message).toBe("2 items");

  message = t.value("pluralization" as TestTranslationKey, { n: -1 });
  expect(message).toBe("-1 items");

  message = t.value("pluralization" as TestTranslationKey);
  expect(message).toBe("1 item");

  message = t.value("pluralizationWithoutZero" as TestTranslationKey, { n: 0 });
  expect(message).toBe("0 items");

  message = t.value("pluralizationWithoutZero" as TestTranslationKey, { n: 1 });
  expect(message).toBe("1 item");

  message = t.value("pluralizationWithoutZero" as TestTranslationKey, { n: 2 });
  expect(message).toBe("2 items");

  message = t.value("withoutPluralization" as TestTranslationKey, { n: 0 });
  expect(message).toBe('0 items and pipe "|" is part of the text');

  message = t.value("withoutPluralization" as TestTranslationKey, { n: 1 });
  expect(message).toBe('1 items and pipe "|" is part of the text');

  message = t.value("withoutPluralization" as TestTranslationKey, { n: 2 });
  expect(message).toBe('2 items and pipe "|" is part of the text');
});

test("should update translation when locale changes", () => {
  const locale = vue.ref("en-US");
  provideI18n({
    locale,
    messages: {
      "en-US": {
        helloWorld: "Hello World",
      },
      "de-DE": {
        helloWorld: "Hallo Welt",
      },
    } as TestMessages,
  });
  const { t } = injectI18n();

  const message = vue.computed(() => t.value("helloWorld" as TestTranslationKey));
  expect(message.value).toBe("Hello World");

  locale.value = "de-DE";

  expect(message.value).toBe("Hallo Welt");
});

test("should use English fallback if translation is missing", () => {
  provideI18n({
    locale: "de-DE",
    messages: {
      "de-DE": {
        notHelloWorld: "Hallo Welt",
      },
    } as TestMessages,
  });
  const { t } = injectI18n();

  const message = t.value("helloWorld" as TestTranslationKey);

  // see mock of module "./locales/en-US.json" at the top of the file
  expect(message).toBe("Hello World");
});
