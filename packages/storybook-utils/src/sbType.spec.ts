import type { SBType } from "storybook/internal/types";
import { describe, expect, test, vi } from "vitest";
import { walkTree } from "./sbType.js";

describe("walkTree", () => {
  test.each<{ input: SBType; expected: SBType["name"][] }>([
    { input: { name: "array", value: { name: "number" } }, expected: ["array", "number"] },
    { input: { name: "object", value: { a: { name: "number" } } }, expected: ["object", "number"] },
    { input: { name: "enum", value: ["a"] }, expected: ["enum"] },
    {
      input: { name: "intersection", value: [{ name: "number" }] },
      expected: ["intersection", "number"],
    },
    { input: { name: "union", value: [{ name: "number" }] }, expected: ["union", "number"] },
    { input: { name: "other", value: "a" }, expected: ["other"] },
  ])("should execute cb for $input.name correctly", ({ input, expected }) => {
    const spy = vi.fn<(p: SBType) => void>();
    const result = walkTree(input, spy);

    expect(result).toBeUndefined();
    expect(spy).toHaveBeenCalledTimes(expected.length);
    const nameCalls = spy.mock.calls.map(([{ name }]) => name);
    expect(nameCalls).toMatchObject(expected);
  });

  test("should return value if there is any returned", () => {
    const target: SBType = { name: "number", raw: "here" };
    const overshoot: SBType = { name: "boolean", raw: "here" };
    const parent: SBType = { name: "intersection", value: [target, overshoot] };
    const returned = 42;
    const spy = vi.fn((p: SBType) => (p.raw === "here" ? returned : undefined));
    const result = walkTree({ name: "union", value: [parent] }, spy);

    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenLastCalledWith(target, parent);
    expect(result).toBe(returned);
  });
});
