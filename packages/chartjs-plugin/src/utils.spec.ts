import { describe, expect, test } from "vitest";
import { hexToRgb } from "./utils.js";

describe("utils.ts", () => {
  test("should convert hex to rgb", () => {
    const rgb = hexToRgb("#0c2238");
    expect(rgb).toBe("12, 34, 56");
  });
});
