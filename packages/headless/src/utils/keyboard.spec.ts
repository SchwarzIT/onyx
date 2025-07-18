import { expect, test } from "vitest";
import { isPrintableCharacter, wasKeyPressed } from "./keyboard.js";

test.each([
  // ARRANGE
  { input: [{ key: "m", code: "KeyM" }, "m"], expected: true },
  { input: [{ key: "m", code: "KeyM" }, "m"], expected: true },
  { input: [{ key: "m", code: "KeyM" }, { key: "m" }], expected: true },
  { input: [{ key: "m", code: "KeyM" }, { code: "KeyM" }], expected: true },
  {
    input: [{ key: "m", code: "KeyM", altKey: false }, { code: "KeyM" }],
    expected: true,
  },
  {
    input: [
      { key: "m", code: "KeyM" },
      { code: "KeyM", altKey: true },
    ],
    expected: false,
  },
  {
    input: [
      { key: "m", code: "KeyM", shiftKey: true },
      { code: "KeyM", shiftKey: false },
    ],
    expected: false,
  },
] as { input: Parameters<typeof wasKeyPressed>; expected: boolean }[])(
  "should return $expected for event $input.0 and pressed key $input.1",
  ({ input: [event, wasPressed], expected }) => {
    // ACT
    const result = wasKeyPressed(new KeyboardEvent("keydown", event), wasPressed);

    // ASSERT
    expect(result).toBe(expected);
  },
);

test.each([
  // ARRANGE
  { key: "a", expected: true },
  { key: "🎉", expected: true },
  { key: "あ", expected: true },
  { key: " ", expected: true },
  { key: "Meta", expected: false },
  { key: "Fn", expected: false },
])("should return $expected for key $key", ({ key, expected }) => {
  // ACT
  const result = isPrintableCharacter(key);

  // ASSERT
  expect(result).toBe(expected);
});
