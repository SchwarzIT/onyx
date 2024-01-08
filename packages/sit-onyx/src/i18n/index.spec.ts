import { expect, test, vi } from "vitest";
import * as vue from "vue";
import { provideI18n, useI18n } from ".";

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

test("should provide/inject i18n", () => {
  provideI18n({ locale: "test" });
  let i18n = useI18n();

  expect(i18n).toBeDefined();
  expect(i18n.locale.value).toBe("test");

  // should keep locale up to date if a ref is passed as option
  const locale = vue.ref("a");
  provideI18n({ locale });
  i18n = useI18n();

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
    },
  });

  const { t } = useI18n();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  let message = t.value("plain" as any);
  expect(message).toBe("Hello World");

  message = t.value("placeholder" as any, { firstName: "John", lastName: "Doe" });
  expect(message).toBe("Hello John Doe");

  // should return empty string for missing translation
  message = t.value("does.not.exist" as any);
  expect(message).toBe("");
  /* eslint-enable @typescript-eslint/no-explicit-any */
});

test("should translate with pluralization", () => {
  provideI18n({
    locale: "en-US",
    messages: {
      "en-US": {
        pluralization: "Zero items | 1 item | {n} items",
        pluralizationWithoutZero: "1 item | {n} items",
        withoutPluralization: "{n} items",
      },
    },
  });

  const { t } = useI18n();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  let message = t.value("pluralization" as any, { n: 0 });
  expect(message).toBe("Zero items");

  message = t.value("pluralization" as any, { n: 1 });
  expect(message).toBe("1 item");

  message = t.value("pluralization" as any, { n: 2 });
  expect(message).toBe("2 items");

  message = t.value("pluralization" as any, { n: -1 });
  expect(message).toBe("-1 items");

  message = t.value("pluralization" as any);
  expect(message).toBe("1 item");

  message = t.value("pluralizationWithoutZero" as any, { n: 0 });
  expect(message).toBe("0 items");

  message = t.value("pluralizationWithoutZero" as any, { n: 1 });
  expect(message).toBe("1 item");

  message = t.value("pluralizationWithoutZero" as any, { n: 2 });
  expect(message).toBe("2 items");

  message = t.value("withoutPluralization" as any, { n: 0 });
  expect(message).toBe("0 items");

  message = t.value("withoutPluralization" as any, { n: 1 });
  expect(message).toBe("1 items");

  message = t.value("withoutPluralization" as any, { n: 2 });
  expect(message).toBe("2 items");
  /* eslint-enable @typescript-eslint/no-explicit-any */
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
    },
  });
  const { t } = useI18n();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  let message = t.value("helloWorld" as any);
  expect(message).toBe("Hello World");

  locale.value = "de-DE";

  message = t.value("helloWorld" as any);
  expect(message).toBe("Hallo Welt");
  /* eslint-enable @typescript-eslint/no-explicit-any */
});
