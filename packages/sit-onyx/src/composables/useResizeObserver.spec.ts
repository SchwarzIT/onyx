import { describe, expect, test, vi } from "vitest";
import { ref, toValue } from "vue";
import { useResizeObserver } from "./useResizeObserver";

vi.mock("vue", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("vue")>()),
    // this will only affect "foo" outside of the original module
    onMounted: (callback) => callback(),
    onBeforeUnmount: vi.fn(),
  } satisfies typeof import("vue");
});

describe("useResizeObserver", () => {
  test("should get component size", () => {
    let callback: ((entries: Partial<ResizeObserverEntry>[]) => void) | undefined;

    const spy = {
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    } satisfies InstanceType<typeof ResizeObserver>;

    global.ResizeObserver = vi.fn().mockImplementation((_callback) => {
      callback = _callback;
      return spy;
    });

    const component = ref(document.createElement("div"));
    const { height, width } = useResizeObserver(component);

    expect(ResizeObserver).toHaveBeenCalledOnce();
    expect(spy.observe).toHaveBeenCalledWith(toValue(component), { box: "content-box" });
    expect(callback).toBeDefined();

    callback!([{ contentBoxSize: [{ blockSize: 42, inlineSize: 100 }] }]);
    expect(height.value).toBe(42);
    expect(width.value).toBe(100);
  });
});
