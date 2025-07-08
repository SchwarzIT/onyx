import { describe, expect, test, vi } from "vitest";
import { ref } from "vue";
import { useRipple } from "./useRipple.js";

vi.mock("vue", async (original) => ({
  ...((await original()) as typeof import("vue")),
  onBeforeMount: vi.fn((callback) => callback()),
}));

describe("useRipple", () => {
  const rect = {
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    right: 300,
    bottom: 300,
    width: 300,
    height: 300,
    toJSON: vi.fn(),
  };

  const container = ref({
    getBoundingClientRect: vi.fn(() => rect),
  });

  const { ripples, startRipple, hideRipples, hideRipple } = useRipple(container);

  test("should initialize with an empty ripples map", () => {
    // ASSERT
    expect(ripples.size).toBe(0);
  });

  test("should add and remove a ripple", () => {
    // ACT
    const mockEvent = new MouseEvent("mousedown");
    const rippleId = startRipple(mockEvent);

    // ASSERT
    expect(ripples.size).toBe(1);

    // ACT
    hideRipple({
      dataset: {
        rippleid: rippleId,
      },
    });
    hideRipples();

    // ASSERT
    expect(ripples.size).toBe(0);
  });
});
