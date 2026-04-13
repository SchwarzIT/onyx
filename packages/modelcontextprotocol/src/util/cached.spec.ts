import { describe, expect, test, vi } from "vitest";
import { cached } from "./cached.js";

describe("cached", () => {
  test("should cache result after first call", async () => {
    const spy = vi.fn(async (...args: unknown[]) =>
      args.reduce<number>((acc, cur) => acc + (cur as number), 0),
    );
    const result = await cached(spy)(1, 2, 3);

    expect(result).toBe(6);
    expect(spy).toHaveBeenCalledExactlyOnceWith(1, 2, 3);

    const result2 = await cached(spy)(1, 2, 3);
    expect(result2).toBe(6);
    expect(spy).toHaveBeenCalledExactlyOnceWith(1, 2, 3);

    const result3 = await cached(spy)(1);
    expect(result3).toBe(1);
    expect(spy).toHaveBeenNthCalledWith(2, 1);
  });
});
