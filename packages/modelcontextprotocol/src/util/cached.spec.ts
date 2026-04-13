import { describe, expect, test, vi } from "vitest";
import { cached } from "./cached.js";

describe("cached", () => {
  test("should cache result after first call", async () => {
    // ARRANGE
    const spy = vi.fn(async (...args: unknown[]) =>
      args.reduce<number>((acc, cur) => acc + (cur as number), 0),
    );
    const cachedSpy = cached(spy);

    // ACT
    const result = await cachedSpy(1, 2, 3);

    // ASSERT
    expect(result).toBe(6);
    expect(spy).toHaveBeenCalledExactlyOnceWith(1, 2, 3);

    // ACT
    const result2 = await cachedSpy(1, 2, 3);

    // ASSERT
    expect(result2).toBe(6);
    expect(spy).toHaveBeenCalledExactlyOnceWith(1, 2, 3);

    // ACT
    const result3 = await cachedSpy(1);

    // ASSERT
    expect(result3).toBe(1);
    expect(spy).toHaveBeenNthCalledWith(2, 1);
  });

  test("should use separated caches result", async () => {
    // ARRANGE
    let i = 0;
    const spy = vi.fn(async () => ++i);
    const firstCached = cached(spy);
    const secondCached = cached(spy);

    // ACT
    const result1 = await firstCached();

    // ASSERT
    expect(result1).toBe(1);
    expect(spy).toHaveBeenCalledExactlyOnceWith();

    // ACT
    const result2 = await secondCached();

    // ASSERT
    expect(result2).toBe(2);
    expect(spy).toHaveBeenCalledTimes(2);

    // ACT
    const result3 = await firstCached();

    // ASSERT
    expect(result3).toBe(1);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
