import { expect, test } from "vitest";
import { isPrintableCharacter } from "./keyboard";

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
