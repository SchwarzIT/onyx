import { describe, expect, test, vi } from "vitest";
import { ref } from "vue";
import type { DefaultSupportedTypes } from ".";
import { createRenderer, FALLBACK_RENDER_VALUE } from "./renderer";

vi.mock("../../../i18n", () => ({
  injectI18n: () => ({
    locale: ref("en-US"),
  }),
}));

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
    date: "Apr 11, 2025",
    datetime: "Apr 11, 2025, 3:42 PM",
    time: "3:42 PM",
    timestamp: "04/11/2025, 03:42:27 PM GMT",
  } as const satisfies Partial<Record<DefaultSupportedTypes, string>>;

  for (const type in DATE_TEST_CASES) {
    const rendererType = type as keyof typeof DATE_TEST_CASES;
    const expected = DATE_TEST_CASES[rendererType];
    const value = new Date(2025, 3, 11, 15, 42, 27);

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

function getRendererCellValue(value: unknown, type?: DefaultSupportedTypes) {
  const renderer = createRenderer([]);
  return renderer
    .getFor("cell", type)
    .component({ modelValue: value, row: { id: 1 } }, { attrs: {}, slots: {}, emit: () => ({}) });
}
