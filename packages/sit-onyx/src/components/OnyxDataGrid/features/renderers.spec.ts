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
  ])(
    "should format cell value $value to $expected with string and fallback renderer",
    ({ value, expected }) => {
      // ACT
      const fallbackActual = getRendererCellValue(value);
      const stringActual = getRendererCellValue(value, "string");

      // ASSERT
      expect(fallbackActual).toBe(expected);
      expect(stringActual).toBe(expected);
    },
  );

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
  ])("should format cell value $value to $expected with number renderer", ({ value, expected }) => {
    // ACT
    const actual = getRendererCellValue(value, "number");

    // ASSERT
    expect(actual).toBe(expected);
  });

  const DATE_INVALID_TEST_CASES = [
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
  ];

  test.each([
    { value: new Date(2025, 3, 11), expected: "Apr 11, 2025" },
    { value: new Date(2025, 3, 11).toISOString(), expected: "Apr 11, 2025" },
    { value: new Date(2025, 3, 11).getTime(), expected: "Apr 11, 2025" },
    { value: BigInt(new Date(2025, 3, 11).getTime()), expected: "Apr 11, 2025" },
    ...DATE_INVALID_TEST_CASES,
  ])("should format cell value $value to $expected with date renderer", ({ value, expected }) => {
    // ACT
    const actual = getRendererCellValue(value, "date");

    // ASSERT
    expect(actual).toBe(expected);
  });

  test.each([
    { value: new Date(2025, 3, 11, 15, 42), expected: "Apr 11, 2025, 3:42 PM" },
    { value: new Date(2025, 3, 11, 15, 42).toISOString(), expected: "Apr 11, 2025, 3:42 PM" },
    { value: new Date(2025, 3, 11, 15, 42).getTime(), expected: "Apr 11, 2025, 3:42 PM" },
    { value: BigInt(new Date(2025, 3, 11, 15, 42).getTime()), expected: "Apr 11, 2025, 3:42 PM" },
    ...DATE_INVALID_TEST_CASES,
  ])(
    "should format cell value $value to $expected with datetime renderer",
    ({ value, expected }) => {
      // ACT
      const actual = getRendererCellValue(value, "datetime");

      // ASSERT
      expect(actual).toBe(expected);
    },
  );

  test.each([
    { value: new Date(2025, 3, 11, 15, 42), expected: "3:42 PM" },
    { value: new Date(2025, 3, 11, 15, 42).toISOString(), expected: "3:42 PM" },
    { value: new Date(2025, 3, 11, 15, 42).getTime(), expected: "3:42 PM" },
    { value: BigInt(new Date(2025, 3, 11, 15, 42).getTime()), expected: "3:42 PM" },
    ...DATE_INVALID_TEST_CASES,
  ])("should format cell value $value to $expected with time renderer", ({ value, expected }) => {
    // ACT
    const actual = getRendererCellValue(value, "time");

    // ASSERT
    expect(actual).toBe(expected);
  });

  test.each([
    { value: new Date(2025, 3, 11, 15, 42, 27), expected: "04/11/2025, 03:42:27 PM GMT" },
    {
      value: new Date(2025, 3, 11, 15, 42, 27).toISOString(),
      expected: "04/11/2025, 03:42:27 PM GMT",
    },
    { value: new Date(2025, 3, 11, 15, 42, 27).getTime(), expected: "04/11/2025, 03:42:27 PM GMT" },
    {
      value: BigInt(new Date(2025, 3, 11, 15, 42, 27).getTime()),
      expected: "04/11/2025, 03:42:27 PM GMT",
    },
    ...DATE_INVALID_TEST_CASES,
  ])(
    "should format cell value $value to $expected with timestamp renderer",
    ({ value, expected }) => {
      // ACT
      const actual = getRendererCellValue(value, "timestamp");

      // ASSERT
      expect(actual).toBe(expected);
    },
  );
});

function getRendererCellValue(value: unknown, type?: DefaultSupportedTypes) {
  const renderer = createRenderer([]);
  return renderer
    .getFor("cell", type)
    .component({ modelValue: value, row: { id: 1 } }, { attrs: {}, slots: {}, emit: () => ({}) });
}
