import { describe, expect, test, vi } from "vitest";
import { ref } from "vue";
import { useIntersectionObserver } from "./useIntersectionObserver.js";

vi.mock("vue", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("vue")>()),
    onMounted: (callback) => callback(),
    onBeforeUnmount: vi.fn(),
  } satisfies typeof import("vue");
});

describe("useIntersectionObserver", () => {
  test("should update isIntersecting when component intersects", () => {
    let callback: ((entries: Partial<IntersectionObserverEntry>[]) => void) | undefined;

    const spy = {
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
      root: null,
      rootMargin: "0px",
      thresholds: [0],
      takeRecords: vi.fn(),
    } satisfies InstanceType<typeof IntersectionObserver>;

    global.IntersectionObserver = vi.fn().mockImplementation((_callback) => {
      callback = _callback;
      return spy;
    });

    const component = ref(document.createElement("div"));
    const { isIntersecting } = useIntersectionObserver(component);

    expect(isIntersecting.value).toBe(false);

    callback?.([{ isIntersecting: true }]);

    expect(isIntersecting.value).toBe(true);

    callback?.([{ isIntersecting: false }]);

    expect(isIntersecting.value).toBe(false);

    expect(spy.observe).toHaveBeenCalledWith(component.value);
  });
});
