import { beforeEach, describe, expect, test, vi } from "vitest";
import * as vue from "vue";
import type { DefaultSupportedTypes } from ".";
import { provideI18n } from "../../../i18n";
import { BASE_FEATURE } from "./base/base";
import { createRenderer, FALLBACK_RENDER_VALUE } from "./renderer";

// keep track of provide/inject because they need to be mocked
let provided = new Map();

vi.mock("vue", async (importOriginal) => {
  const module = await importOriginal<typeof import("vue")>();

  return {
    ...module,
    inject: vi.fn((key) => provided.get(key)) satisfies (typeof vue)["inject"],
  };
});

const app = {
  provide: vi.fn((key, value) => provided.set(key, value)) satisfies (typeof vue)["provide"],
} as unknown as vue.App;

beforeEach(() => {
  provided = new Map();
  vi.clearAllMocks();
  provideI18n(app, { locale: "en-US" });
});

describe("renderers", () => {
  test.each([
    { value: undefined, expected: FALLBACK_RENDER_VALUE },
    { value: null, expected: FALLBACK_RENDER_VALUE },
    { value: "test", expected: "test" },
    { value: 42, expected: "42" },
    { value: true, expected: "true" },
    { value: false, expected: "false" },
    { value: { foo: 42 }, expected: '{"foo":42}' },
    { value: ["foo", "bar", null, undefined, { foo: 42 }], expected: 'foo, bar, {"foo":42}' },
    {
      value: new Date(2025, 2, 6, 12, 42, 31),
      expected: "Thu Mar 06 2025 12:42:31 GMT+0000 (Coordinated Universal Time)",
    },
    { value: Symbol("test-symbol"), expected: "Symbol(test-symbol)" },
  ])("string/fallback: should render $expected for input $value", ({ value, expected }) => {
    // ACT
    const fallbackActual = getRendererCellValue(value);
    const stringActual = getRendererCellValue(value, "string");

    // ASSERT
    expect(fallbackActual).toBe(expected);
    expect(stringActual).toBe(expected);
  });

  test.each([
    { value: 42, expected: "42" },
    { value: 42.123, expected: "42.123" },
    { value: BigInt(42), expected: "42" },
    { value: NaN, expected: FALLBACK_RENDER_VALUE },
    { value: undefined, expected: FALLBACK_RENDER_VALUE },
    { value: null, expected: FALLBACK_RENDER_VALUE },
    { value: "definitely-no-number", expected: FALLBACK_RENDER_VALUE },
    { value: true, expected: FALLBACK_RENDER_VALUE },
    { value: false, expected: FALLBACK_RENDER_VALUE },
    { value: { foo: 42 }, expected: FALLBACK_RENDER_VALUE },
    { value: ["foo", "bar"], expected: FALLBACK_RENDER_VALUE },
    { value: new Date(), expected: FALLBACK_RENDER_VALUE },
    { value: Symbol("test-symbol"), expected: FALLBACK_RENDER_VALUE },
  ])("number: should render $expected for input $value", ({ value, expected }) => {
    // ACT
    const actual = getRendererCellValue(value, "number");

    // ASSERT
    expect(actual).toBe(expected);
  });

  /**
   * Test cases for date type renderers. Key = type, value = expected output.
   */
  const DATE_TEST_CASES = {
    date: "Mar 11, 2025",
    "datetime-local": "Mar 11, 2025, 9:51 AM",
    time: "9:51 AM",
    timestamp: "03/11/2025, 09:51:27 AM GMT",
  } as const satisfies Partial<Record<DefaultSupportedTypes, string>>;

  for (const type in DATE_TEST_CASES) {
    const rendererType = type as keyof typeof DATE_TEST_CASES;
    const expected = DATE_TEST_CASES[rendererType];
    const value = new Date(2025, 2, 11, 9, 51, 27);

    test.each([
      // positive cases:
      { value, expected },
      { value: value.toISOString(), expected },
      { value: value.getTime(), expected },
      { value: BigInt(value.getTime()), expected },
      // negative/invalid cases:
      { value: new Date("invalid-date"), expected: FALLBACK_RENDER_VALUE },
      { value: NaN, expected: FALLBACK_RENDER_VALUE },
      { value: undefined, expected: FALLBACK_RENDER_VALUE },
      { value: null, expected: FALLBACK_RENDER_VALUE },
      { value: "definitely-no-number", expected: FALLBACK_RENDER_VALUE },
      { value: true, expected: FALLBACK_RENDER_VALUE },
      { value: false, expected: FALLBACK_RENDER_VALUE },
      { value: { foo: 42 }, expected: FALLBACK_RENDER_VALUE },
      { value: ["foo", "bar"], expected: FALLBACK_RENDER_VALUE },
      { value: Symbol("test-symbol"), expected: FALLBACK_RENDER_VALUE },
    ])(`${rendererType}: should render $expected for input $value`, ({ value, expected }) => {
      // ACT
      const actual = getRendererCellValue(value, rendererType);

      // ASSERT
      expect(actual).toBe(expected);
    });
  }
});
const skeleton = vue.computed(() => true);
function getRendererCellValue(value: unknown, type?: DefaultSupportedTypes) {
  const renderer = createRenderer([BASE_FEATURE({ skeleton })()]);
  return renderer
    .getFor("cell", type)
    .component(
      { modelValue: value, row: { id: 1 }, key: "key" },
      { attrs: {}, slots: {}, emit: () => ({}) },
    );
}
