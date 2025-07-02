import { beforeEach, describe, expect, it } from "vitest";
import { ref } from "vue";
import { useAnchorPositionPolyfill, type AnchorPosition } from "./useAnchorPositionPolyfill.js";
import type { OpenAlignment } from "./useOpenAlignment.js";

describe("useAnchorPositionPolyfill", () => {
  const positionedRef = ref<HTMLElement | null>(null);
  const targetRef = ref<HTMLElement | null>(null);
  const positionArea = ref<AnchorPosition>("top");
  const alignment = ref<OpenAlignment>("center");
  const alignsWithEdge = ref(false);
  const fitParent = ref(false);

  beforeEach(() => {
    global.IntersectionObserver = class {
      root: Element | null = null;
      rootMargin: string = "";
      thresholds: ReadonlyArray<number> = [];
      constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    };
  });

  it("should initialize positions to -1000px", () => {
    const { leftPosition, topPosition } = useAnchorPositionPolyfill({
      positionedRef,
      targetRef,
      positionArea,
      alignment,
      alignsWithEdge,
      fitParent,
    });

    expect(leftPosition.value).toBe("-1000px");
    expect(topPosition.value).toBe("-1000px");
  });

  it("should update positions correctly", () => {
    const { leftPosition, topPosition, updateAnchorPositionPolyfill } = useAnchorPositionPolyfill({
      positionedRef,
      targetRef,
      positionArea,
      alignment,
      alignsWithEdge,
      fitParent,
    });

    // Mock elements
    const positionedEl = document.createElement("div");
    positionedEl.style.width = "100px";
    positionedEl.style.height = "50px";
    document.body.appendChild(positionedEl);
    positionedRef.value = positionedEl;

    const targetEl = document.createElement("div");
    targetEl.style.width = "200px";
    targetEl.style.height = "100px";
    document.body.appendChild(targetEl);
    targetRef.value = targetEl;

    // Mock getBoundingClientRect
    targetEl.getBoundingClientRect = (): DOMRect => ({
      top: 100,
      left: 100,
      bottom: 200,
      right: 300,
      width: 200,
      height: 100,
      x: 100,
      y: 100,
      toJSON: () => ({
        top: 100,
        left: 100,
        bottom: 200,
        right: 300,
        width: 200,
        height: 100,
        x: 100,
        y: 100,
      }),
    });

    positionedEl.getBoundingClientRect = (): DOMRect => ({
      width: 100,
      height: 50,
      top: 0,
      left: 0,
      bottom: 50,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => ({
        width: 100,
        height: 50,
        top: 0,
        left: 0,
        bottom: 50,
        right: 100,
        x: 0,
        y: 0,
      }),
    });

    updateAnchorPositionPolyfill();
    expect(leftPosition.value).toBe("150px"); // (100 + 200 / 2 - 100 / 2)
    expect(topPosition.value).toBe("50px"); // (100 - 50)
  });
});
