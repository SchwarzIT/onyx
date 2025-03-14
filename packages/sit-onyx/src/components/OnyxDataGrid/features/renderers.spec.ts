import { describe, expect, test, vi } from "vitest";
import { ref, type FunctionalComponent } from "vue";
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
      // ARRANGE
      const { getFor } = createRenderer([]);

      const props = [
        { modelValue: value, row: { id: 1 } },
        { attrs: {}, slots: {}, emit: () => ({}) },
      ] satisfies Parameters<FunctionalComponent>;

      // ACT
      const fallbackActual = getFor("cell").component(...props);
      const stringActual = getFor("cell", "string").component(...props);

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
    // ARRANGE
    const { getFor } = createRenderer([]);

    // ACT
    const actual = getFor("cell", "number").component(
      { modelValue: value, row: { id: 1 } },
      { attrs: {}, slots: {}, emit: () => ({}) },
    );

    // ASSERT
    expect(actual).toBe(expected);
  });
});
