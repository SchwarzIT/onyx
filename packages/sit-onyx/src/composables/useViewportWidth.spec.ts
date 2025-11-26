import { describe, expect, test, vi } from "vitest";
import { useViewportWidth } from "./useViewportWidth.js";

vi.mock("vue", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("vue")>()),
    onBeforeMount: (callback: () => void) => callback(),
    onUnmounted: vi.fn(),
  } satisfies typeof import("vue");
});

describe("useViewportWidth", () => {
  test("should return current viewport width", () => {
    // Set initial viewport width
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const width = useViewportWidth();

    expect(width.value).toBe(1024);
  });

  test("should update width on window resize", () => {
    // Set initial viewport width
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const width = useViewportWidth();

    expect(width.value).toBe(1024);

    // Simulate window resize
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 768,
    });

    // Trigger resize event
    window.dispatchEvent(new Event("resize"));

    expect(width.value).toBe(768);
  });

  test("should add and remove resize event listener", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    useViewportWidth();

    expect(addEventListenerSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    expect(removeEventListenerSpy).not.toHaveBeenCalled();

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
