import { describe, expect, test } from "vitest";

describe("common.js export", () => {
  test("should work with require", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- test case
    const sitOnyx = require("sit-onyx");
    expect(sitOnyx).toBeDefined();
    expect(sitOnyx.createOnyx).toBeTypeOf("function");
  });
});
describe("esm export", () => {
  test("should work with import", async () => {
    const sitOnyx = await import("sit-onyx");
    expect(sitOnyx).toBeDefined();
    expect(sitOnyx.createOnyx).toBeTypeOf("function");
  });
});
