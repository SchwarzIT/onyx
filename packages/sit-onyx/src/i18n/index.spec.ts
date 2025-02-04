import { beforeEach, expect, test, vi } from "vitest";
import * as vue from "vue";
import { injectI18n, provideI18n, type ProvideI18nOptions } from ".";
import type { FlattenedKeysOf, OnyxTranslations } from "..";

// keep track of provide/inject because they need to be mocked
let provided = new Map();

vi.mock("vue", async (importOriginal) => {
  const module = await importOriginal<typeof import("vue")>();

  return {
    ...module,
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

const app = {
  provide: vi.fn((key, value) => provided.set(key, value)) satisfies (typeof vue)["provide"],
} as unknown as vue.App;

beforeEach(() => {
  provided = new Map();
});

/**
 * These two types are needed to type cast messages/keys in the tests below
 * because we will use custom test messages/keys which will not fit the type
 * of our "real" component translations
 */
type TestTranslationKey = FlattenedKeysOf<OnyxTranslations>;
type TestMessages = ProvideI18nOptions["messages"];

test("should provide/inject i18n with a string", () => {
  // ARRANGE
  provideI18n(app, { locale: "test" });

  // ACT
  const i18n = injectI18n();

  // ASSERT
  expect(i18n).toBeDefined();
  expect(i18n.locale.value).toBe("test");
});

test("should provide/inject i18n with a ref", () => {
  // ARRANGE
  // should keep locale up to date if a ref is passed as option
  const locale = vue.ref("a");
  provideI18n(app, { locale });

  // ACT
  const i18n = injectI18n();

  // ASSERT
  expect(i18n.locale.value).toBe("a");

  // ACT
  locale.value = "b";

  // ASSERT
  expect(i18n.locale.value).toBe("b");
});

test("should translate with/without placeholders", () => {
  // ARRANGE
  provideI18n(app, {
    locale: "en-US",
    messages: {
      "en-US": {
        plain: "Hello World",
        placeholder: "Hello {firstName} {lastName}",
      },
    } as TestMessages,
  });

  const { t } = injectI18n();

  // ACT #1
  let message = t.value("plain" as TestTranslationKey);
  // ASSERT #1
  expect(message).toBe("Hello World");

  // ACT #2
  message = t.value("placeholder" as TestTranslationKey, {
    firstName: "John",
    lastName: "Doe",
  });
  // ASSERT #2
  expect(message).toBe("Hello John Doe");

  // ACT #3
  // should return empty string for missing translation
  message = t.value("does.not.exist" as TestTranslationKey);
  // ASSERT #3
  expect(message).toBe("");

  // ACT #4
  // removes the original placeholders if no values were provided (same behavior as "vue-i18n")
  message = t.value("placeholder" as TestTranslationKey, {
    firstName: undefined,
    lastName: undefined,
  });
  // ASSERT #4
  expect(message).toBe("Hello");
});

test("should translate with pluralization", () => {
  // ARRANGE
  provideI18n(app, {
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

  // ACT
  let message = t.value("pluralization" as TestTranslationKey, { n: 0 });
  // ASSERT
  expect(message).toBe("Zero items");

  // ACT
  message = t.value("pluralization" as TestTranslationKey, { n: 1 });
  // ASSERT
  expect(message).toBe("1 item");

  // ACT
  message = t.value("pluralization" as TestTranslationKey, { n: 2 });
  // ASSERT
  expect(message).toBe("2 items");

  // ACT
  message = t.value("pluralization" as TestTranslationKey, { n: -1 });
  // ASSERT
  expect(message).toBe("-1 items");

  // ACT
  message = t.value("pluralization" as TestTranslationKey);
  // ASSERT
  expect(message).toBe("1 item");

  // ACT
  message = t.value("pluralizationWithoutZero" as TestTranslationKey, { n: 0 });
  // ASSERT
  expect(message).toBe("0 items");

  // ACT
  message = t.value("pluralizationWithoutZero" as TestTranslationKey, { n: 1 });
  // ASSERT
  expect(message).toBe("1 item");

  // ACT
  message = t.value("pluralizationWithoutZero" as TestTranslationKey, { n: 2 });
  // ASSERT
  expect(message).toBe("2 items");

  // ACT
  message = t.value("withoutPluralization" as TestTranslationKey, { n: 0 });
  // ASSERT
  expect(message).toBe('0 items and pipe "|" is part of the text');

  // ACT
  message = t.value("withoutPluralization" as TestTranslationKey, { n: 1 });
  // ASSERT
  expect(message).toBe('1 items and pipe "|" is part of the text');

  // ACT
  message = t.value("withoutPluralization" as TestTranslationKey, { n: 2 });
  // ASSERT
  expect(message).toBe('2 items and pipe "|" is part of the text');
});

test("should update translation when locale changes", () => {
  // ARRANGE
  const locale = vue.ref("en-US");
  provideI18n(app, {
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

  // ACT #1
  const message = vue.computed(() => t.value("helloWorld" as TestTranslationKey));
  // ASSERT #1
  expect(vue.toValue(message)).toBe("Hello World");

  // ACT #2
  locale.value = "de-DE";
  // ASSERT #2
  expect(vue.toValue(message)).toBe("Hallo Welt");
});

test("should use English fallback if translation is missing", () => {
  // ARRANGE
  provideI18n(app, {
    locale: "de-DE",
    messages: {
      "de-DE": {
        notHelloWorld: "Hallo Welt",
      },
    } as TestMessages,
  });
  const { t } = injectI18n();

  // ACT
  const message = t.value("helloWorld" as TestTranslationKey);

  // ASSERT
  // see mock of module "./locales/en-US.json" at the top of the file
  expect(message).toBe("Hello World");
});
