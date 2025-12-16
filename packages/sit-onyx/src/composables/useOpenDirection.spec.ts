import { beforeEach, describe, expect, test, vi } from "vitest";
import { shallowRef } from "vue";
import { useOpenDirection } from "./useOpenDirection.js";

describe("useOpenDirection", () => {
  beforeEach(() => {
    // Reset viewport mock before each test
    Object.defineProperty(window, "visualViewport", {
      value: { height: 1000 },
      writable: true,
      configurable: true,
    });
  });

  test("should open bottom when there is more space below (without overflow parent)", () => {
    // ARRANGE - Create element with more space below
    const element = document.createElement("div");
    Object.defineProperty(element, "getBoundingClientRect", {
      value: () => ({
        top: 100,
        bottom: 150,
        left: 0,
        right: 0,
        width: 100,
        height: 50,
      }),
    });

    // Mock getComputedStyle to return no overflow hidden
    vi.spyOn(global, "getComputedStyle").mockReturnValue({
      overflow: "visible",
    } as CSSStyleDeclaration);

    const elementRef = shallowRef(element);
    const { openDirection, updateOpenDirection } = useOpenDirection(elementRef);

    // ACT
    updateOpenDirection();

    // ASSERT
    // Free space below: 1000 - 150 = 850
    // Free space above: 100 - 0 = 100
    // Should open bottom since 850 > 100
    expect(openDirection.value).toBe("bottom");
  });

  test("should open top when there is more space above (without overflow parent)", () => {
    // ARRANGE - Create element with more space above
    const element = document.createElement("div");
    // Mock visualViewport.pageTop to ensure that implementation is not relying on it
    Object.defineProperty(window, "visualViewport", {
      value: { height: 1000, pageTop: 10000 },
      configurable: true,
    });
    Object.defineProperty(element, "getBoundingClientRect", {
      value: () => ({
        top: 800,
        bottom: 850,
        left: 0,
        right: 0,
        width: 100,
        height: 50,
      }),
    });

    // Mock getComputedStyle to return no overflow hidden
    vi.spyOn(global, "getComputedStyle").mockReturnValue({
      overflow: "visible",
    } as CSSStyleDeclaration);

    const elementRef = shallowRef(element);
    const { openDirection, updateOpenDirection } = useOpenDirection(elementRef);

    // ACT
    updateOpenDirection();

    // ASSERT
    // Free space below: 1000 - 850 = 150
    // Free space above: 800 - 0 = 800
    // Should open top since 800 > 150
    expect(openDirection.value).toBe("top");
  });

  test("should open bottom when there is more space below (with overflow parent)", () => {
    // ARRANGE - Create overflow parent
    const parent = document.createElement("div");
    Object.defineProperty(parent, "getBoundingClientRect", {
      value: () => ({
        top: 50,
        bottom: 500,
        left: 0,
        right: 0,
        width: 300,
        height: 450,
      }),
    });

    // Create element inside overflow parent
    const element = document.createElement("div");
    Object.defineProperty(element, "getBoundingClientRect", {
      value: () => ({
        top: 150,
        bottom: 200,
        left: 0,
        right: 0,
        width: 100,
        height: 50,
      }),
    });
    Object.defineProperty(element, "parentElement", {
      value: parent,
      configurable: true,
    });

    // Mock getComputedStyle to return overflow hidden for parent
    vi.spyOn(global, "getComputedStyle").mockImplementation((el) => {
      if (el === parent) {
        return { overflow: "hidden" } as CSSStyleDeclaration;
      }
      return { overflow: "visible" } as CSSStyleDeclaration;
    });

    const elementRef = shallowRef(element);
    const { openDirection, updateOpenDirection } = useOpenDirection(elementRef);

    // ACT
    updateOpenDirection();

    // ASSERT
    // Free space below (within parent): 500 - 200 = 300
    // Free space above (within parent): 150 - 50 = 100
    // Should open bottom since 300 > 100
    expect(openDirection.value).toBe("bottom");
  });

  test("should open top when there is more space above (with overflow parent)", () => {
    // ARRANGE - Create overflow parent
    const parent = document.createElement("div");
    Object.defineProperty(parent, "getBoundingClientRect", {
      value: () => ({
        top: 50,
        bottom: 500,
        left: 0,
        right: 0,
        width: 300,
        height: 450,
      }),
    });

    // Create element near bottom of overflow parent
    const element = document.createElement("div");
    Object.defineProperty(element, "getBoundingClientRect", {
      value: () => ({
        top: 400,
        bottom: 450,
        left: 0,
        right: 0,
        width: 100,
        height: 50,
      }),
    });
    Object.defineProperty(element, "parentElement", {
      value: parent,
      configurable: true,
    });

    // Mock getComputedStyle to return overflow hidden for parent
    vi.spyOn(window, "getComputedStyle").mockImplementation((el) => {
      if (el === parent) {
        return { overflow: "hidden" } as CSSStyleDeclaration;
      }
      return { overflow: "visible" } as CSSStyleDeclaration;
    });

    const elementRef = shallowRef(element);
    const { openDirection, updateOpenDirection } = useOpenDirection(elementRef);

    // ACT
    updateOpenDirection();

    // ASSERT
    // Free space below (within parent): 500 - 450 = 50
    // Free space above (within parent): 400 - 50 = 350
    // Should open top since 350 > 50
    expect(openDirection.value).toBe("top");
  });

  test("should use default direction when element is null", () => {
    // ARRANGE
    const elementRef = shallowRef<Element | null>(null);
    const { openDirection, updateOpenDirection } = useOpenDirection(elementRef, "top");

    // ACT
    updateOpenDirection();

    // ASSERT
    expect(openDirection.value).toBe("top");
  });

  test("should update direction when called multiple times", () => {
    // ARRANGE
    const element = document.createElement("div");

    // Mock getComputedStyle
    vi.spyOn(global, "getComputedStyle").mockReturnValue({
      overflow: "visible",
    } as CSSStyleDeclaration);

    const elementRef = shallowRef(element);
    const { openDirection, updateOpenDirection } = useOpenDirection(elementRef);

    // First position - more space below
    Object.defineProperty(element, "getBoundingClientRect", {
      value: () => ({
        top: 100,
        bottom: 150,
        left: 0,
        right: 0,
        width: 100,
        height: 50,
      }),
      configurable: true,
    });

    updateOpenDirection();
    expect(openDirection.value).toBe("bottom");

    // Update position - more space above
    Object.defineProperty(element, "getBoundingClientRect", {
      value: () => ({
        top: 800,
        bottom: 850,
        left: 0,
        right: 0,
        width: 100,
        height: 50,
      }),
      configurable: true,
    });

    // ACT
    updateOpenDirection();

    // ASSERT
    expect(openDirection.value).toBe("top");
  });
});
