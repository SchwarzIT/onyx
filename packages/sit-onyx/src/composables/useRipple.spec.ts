import { describe, expect, test, vi } from "vitest";
import { computed, ref } from "vue";
import { useRipple, type RippleConfig } from "./useRipple";

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

  const config = computed<RippleConfig>(() => ({
    color: "red",
    container: ref({
      getBoundingClientRect: vi.fn(() => rect),
    }),
  }));

  const { ripples, startRipple, hideRipples, hideRipple } = useRipple(config);

  test("should initialize with an empty ripples map", () => {
    expect(ripples.size).toBe(0);
  });

  test("should add and remove a ripple", () => {
    const mockEvent = new MouseEvent("mousedown");
    startRipple(mockEvent);
    expect(ripples.size).toBe(1);
    const r = ripples.values().next().value;
    hideRipple({
      dataset: {
        rippleid: r.rippleId,
      },
    });
    hideRipples();
    expect(ripples.size).toBe(0);
  });
});
