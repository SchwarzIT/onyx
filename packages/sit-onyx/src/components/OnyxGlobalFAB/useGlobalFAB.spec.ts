import { describe, expect, test } from "vitest";
import { createGlobalFABProvider } from "./useGlobalFAB.js";

describe("useGlobalFAB", () => {
  test("should create toast provider", () => {
    const provider = createGlobalFABProvider();

    expect(provider.items.value).toStrictEqual([]);

    provider.add({ id: 1, label: "Test 1" });
    provider.add({ id: 2, label: "Test 2" });

    expect(provider.items.value).toStrictEqual([
      {
        id: 1,
        label: "Test 1",
      },
      {
        id: 2,
        label: "Test 2",
      },
    ]);

    provider.remove(2);

    expect(provider.items.value).toStrictEqual([
      {
        id: 1,
        label: "Test 1",
      },
    ]);
  });
});
