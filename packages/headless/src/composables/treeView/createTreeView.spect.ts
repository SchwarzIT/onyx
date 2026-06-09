import { describe, expect, test } from "vitest";
import { ref } from "vue";
import { createTreeView } from "./createTreeView.js";

describe("createTreeView", () => {
  test("should return correct ARIA attributes and role for the root tree", () => {
    // ARRANGE
    const label = ref("My Directory");
    const {
      elements: { tree },
    } = createTreeView({
      label,
    });

    // ASSERT
    expect(tree.value).toEqual({
      role: "tree",
      "aria-label": "My Directory",
    });

    // ACT
    label.value = "Updated Directory Name";

    // ASSERT
    expect(tree.value["aria-label"]).toBe("Updated Directory Name");
  });
});
