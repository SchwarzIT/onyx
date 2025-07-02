import { describe, expect, test, vi } from "vitest";
import { nextTick, ref } from "vue";
import { useScrollEnd } from "./scrollEnd.js";

describe("scrollEnd.ts", () => {
  test("should calculate isScrollEnd", async () => {
    const loading = ref(false);
    const enabled = ref(true);

    const { isScrollEnd, vScrollEnd } = useScrollEnd({ loading, enabled });

    const mockElement = document.createElement("div");
    Object.defineProperty(mockElement, "scrollHeight", { value: 100 });
    mockElement.scrollTop = 0;

    const addEventListenerSpy = vi.spyOn(mockElement, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(mockElement, "removeEventListener");

    vScrollEnd.mounted(mockElement);

    expect(addEventListenerSpy, "should add scroll listener").toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );
    expect(removeEventListenerSpy).not.toHaveBeenCalled();
    expect(isScrollEnd.value).toBe(false);

    mockElement.scrollTop = 50;
    mockElement.dispatchEvent(new Event("scroll"));
    await nextTick();
    expect(
      isScrollEnd.value,
      "should not be scroll end if not scrolled all the way to the end",
    ).toBe(false);

    mockElement.scrollTop = 99.5;
    mockElement.dispatchEvent(new Event("scroll"));
    await nextTick();
    expect(isScrollEnd.value, "should be scroll end if scrolled all the way to the end").toBe(true);

    loading.value = true;
    await nextTick();
    expect(removeEventListenerSpy, "should remove event listener if loading").toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );
    loading.value = false;

    removeEventListenerSpy.mockClear();
    expect(removeEventListenerSpy).not.toHaveBeenCalled();

    enabled.value = false;
    await nextTick();
    expect(removeEventListenerSpy, "should remove event listener if disabled").toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );
    enabled.value = true;
  });

  test("should consider offset", async () => {
    const { isScrollEnd, vScrollEnd } = useScrollEnd({
      loading: ref(false),
      offset: 20,
    });

    const mockElement = document.createElement("div");
    Object.defineProperty(mockElement, "scrollHeight", { value: 100 });
    mockElement.scrollTop = 0;

    vScrollEnd.mounted(mockElement);

    mockElement.scrollTop = 50;
    mockElement.dispatchEvent(new Event("scroll"));
    await nextTick();
    expect(
      isScrollEnd.value,
      "should not be scroll end if not scrolled all the way to the end",
    ).toBe(false);

    mockElement.scrollTop = 79.5;
    mockElement.dispatchEvent(new Event("scroll"));
    await nextTick();
    expect(isScrollEnd.value, "should be scroll end if scrolled all the way to the end").toBe(true);
  });
});
