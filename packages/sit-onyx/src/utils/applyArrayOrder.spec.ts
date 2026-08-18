import { describe, expect, test } from "vitest";
import { applyArrayOrder } from "./applyArrayOrder.js";

describe("applyArrayOrder", () => {
  const items = [
    { id: "a", name: "Alpha" },
    { id: "b", name: "Beta" },
    { id: "c", name: "Gamma" },
    { id: "d", name: "Delta" },
  ];

  test.for([
    {
      title: "should return items in original order when order map is empty",
      order: new Map<PropertyKey, number>(),
      expected: ["a", "b", "c", "d"],
    },
    {
      title: "should reorder items according to 1-based index map",
      order: new Map<PropertyKey, number>([
        ["a", 4],
        ["b", 2],
        ["c", 1],
        ["d", 3],
      ]),
      expected: ["c", "b", "d", "a"],
    },
    {
      title: "should fill unplaced items into remaining slots in original relative order",
      order: new Map<PropertyKey, number>([
        ["c", 1],
        ["a", 3],
      ]),
      expected: ["c", "b", "a", "d"],
    },
    {
      title: "should let later items win when two items claim the same position",
      order: new Map<PropertyKey, number>([
        ["a", 1],
        ["b", 1],
      ]),
      expected: ["b", "a", "c", "d"],
    },
    {
      title: "should ignore order keys that do not match any item",
      order: new Map<PropertyKey, number>([
        ["nonexistent", 1],
        ["b", 2],
      ]),
      expected: ["a", "b", "c", "d"],
    },
  ])("$title", ({ order, expected }) => {
    const result = applyArrayOrder(items, order, (item) => item.id);
    expect(result.map((item) => item.id)).toEqual(expected);
  });

  test("should return a new array reference even when order map is empty", () => {
    const result = applyArrayOrder(items, new Map(), (item) => item.id);
    expect(result).toEqual(items);
    expect(result).not.toBe(items);
  });
});
