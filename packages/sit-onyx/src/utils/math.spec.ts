import { describe, expect, test, vi } from "vitest";
import { distanceToFurthestCorner } from "./math";

describe("math utils", () => {
  const rect = {
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    right: 40,
    bottom: 40,
    width: 40,
    height: 40,
    toJSON: vi.fn(),
  };

  test("should calculate the distance to the furthest corner", () => {
    const x = 20;
    const y = 17;
    const distance = distanceToFurthestCorner(x, y, rect as DOMRect);
    expect(distance).toBeCloseTo(30.47, 1);
  });
});
