import { describe, expect, it, vi } from "vitest";
import { applyMapping, prepareMapping, type SingleOrderableMapping } from "./feature";

describe("prepareMapping", () => {
  const func = <T>(a: T) => a;

  it.each([
    {
      title: "should work for no features",
      features: [],
      key: "a",
      expected: [],
    },
    {
      title: "should work for irrelevant features",
      features: [{}],
      key: "a",
      expected: [],
    },
    {
      title: "should work for nullish mappings",
      features: [
        {
          a: [
            null,
            undefined,
            { func: undefined },
            { func: null },
          ] as unknown[] as SingleOrderableMapping<unknown>[],
        },
      ],
      key: "a",
      expected: [],
    },
    {
      title: "should return a single mapping",
      features: [{ a: [{ func }] }],
      key: "a",
      expected: [{ func }],
    },
    {
      title: "should apply sort for multiple definitions",
      features: [
        {
          a: [
            { func, order: 2 },
            { func, order: 1 },
          ],
        },
      ],
      key: "a",
      expected: [
        { func, order: 1 },
        { func, order: 2 },
      ],
    },
    {
      title: "should apply be able to handle all types at once",
      features: [
        {
          a: [
            { func, order: 2 },
            { func, order: 1 },
          ],
        },
        {
          a: [{ func, order: 3 }, { func }],
        },
        {},
        {
          a: [],
        },
        {
          a: [{ func }],
        },
      ],
      key: "a",
      expected: [{ func }, { func }, { func, order: 1 }, { func, order: 2 }, { func, order: 3 }],
    },
  ])("$title", ({ key, features, expected }) =>
    expect(prepareMapping(features, key)).toMatchObject(expected),
  );
});

describe("applyMapping", () => {
  it("should work for no mapping", () => {
    const input = {};
    const mappings = [] as SingleOrderableMapping<unknown, unknown, unknown>[];
    expect(applyMapping(mappings, input)).toBe(input);
  });

  it("should work for a single mapping", () => {
    const input = {};
    const func = vi.fn((a) => a);
    const mappings = [{ func }];
    expect(applyMapping(mappings, input)).toBe(input);
    expect(func).toBeCalledTimes(1);
  });

  it("should work for a multiple mappings", () => {
    const input = {};
    const func = vi.fn((a) => a);
    const mappings = [{ func }, { func }];
    expect(applyMapping(mappings, input)).toBe(input);
    expect(func).toBeCalledTimes(2);
  });
});
