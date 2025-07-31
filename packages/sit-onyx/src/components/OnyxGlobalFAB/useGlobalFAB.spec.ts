import { describe, expect, test } from "vitest";
import { unref } from "vue";
import { createGlobalFABProvider } from "./useGlobalFAB.js";

describe("useGlobalFAB", () => {
  test("should create fab provider and handle items correctly", () => {
    const provider = createGlobalFABProvider();

    expect(provider.items.value).toStrictEqual([]);

    provider.add({ id: 1, label: "Test 1" });
    provider.add({ id: 2, label: "Test 2" });

    const currentItems = provider.items.value.map((itemRef) => unref(itemRef));
    expect(currentItems).toStrictEqual([
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

    const itemsAfterRemoval = provider.items.value.map((itemRef) => unref(itemRef));
    expect(itemsAfterRemoval).toStrictEqual([
      {
        id: 1,
        label: "Test 1",
      },
    ]);
  });
});
