import { describe, expect, test } from "vitest";

describe("esm export", () => {
  test("should work with import", async () => {
    const sitOnyx = await import("sit-onyx");
    expect(sitOnyx).toBeDefined();
    expect(sitOnyx.createOnyx).toBeTypeOf("function");
  });
});
