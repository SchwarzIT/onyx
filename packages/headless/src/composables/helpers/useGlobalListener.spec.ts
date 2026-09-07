import { beforeEach, describe, expect, test, vi } from "vitest";
import { ref, type Ref } from "vue";
import { useGlobalEventListener } from "./useGlobalListener.js";

type Callback = () => void | (() => Promise<void>);

const callbacks = {
  onBeforeUnmountedCb: null as Callback | null,
  onUnmountedCb: null as Callback | null,
};

vi.mock("vue", async (original) => ({
  ...((await original()) as typeof import("vue")),
  onBeforeMount: vi.fn((cb: Callback) => cb()),
  onBeforeUnmount: vi.fn((cb: Callback) => (callbacks.onBeforeUnmountedCb = cb)),
}));

const unmount = async () => {
  await callbacks.onBeforeUnmountedCb?.();
  await callbacks.onUnmountedCb?.();
};

describe("useGlobalEventListener", () => {
  let target: Ref<HTMLButtonElement>;

  beforeEach(() => {
    vi.clearAllMocks();
    target = ref(document.createElement("button"));
    document.body.appendChild(target.value);
  });

  test("should be defined", () => {
    expect(useGlobalEventListener).toBeDefined();
  });

  test("should listen to global events", () => {
    // ARRANGE
    const listener = vi.fn();
    useGlobalEventListener({ type: "click", listener });
    // ACT
    const event = new MouseEvent("click", { bubbles: true });
    target.value.dispatchEvent(event);
    // ASSERT
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toBeCalledWith(event);
  });

  test("should stop to listen to global events after unmount", async () => {
    // ARRANGE
    const listener = vi.fn();
    useGlobalEventListener({ type: "click", listener });
    // ACT
    await unmount();
    expect(listener).toHaveBeenCalledTimes(0);
    target.value.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    // ASSERT
    expect(listener).toHaveBeenCalledTimes(0);
  });

  test("should allow for multiple of the same listener types", async () => {
    // ARRANGE
    vi.useFakeTimers();
    const listener = vi.fn();
    const disabled = ref(false);
    const listener2 = vi.fn();
    useGlobalEventListener({ type: "click", listener, disabled });
    useGlobalEventListener({ type: "click", listener: listener2 });
    // ACT
    target.value.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    // ASSERT
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);
    // ACT
    disabled.value = true;
    await vi.runAllTimersAsync();
    // ACT
    target.value.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    // ASSERT
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(2);
  });

  test("should not listen to events when disabled", async () => {
    // ARRANGE
    vi.useFakeTimers();
    const disabled = ref(false);
    const listener = vi.fn();
    useGlobalEventListener({ type: "click", listener, disabled });
    // ACT
    await vi.runAllTimersAsync();
    target.value.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    // ASSERT
    expect(listener).toHaveBeenCalledTimes(1);
    // ACT
    disabled.value = true;
    await vi.runAllTimersAsync();
    target.value.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    // ASSERT
    expect(listener).toHaveBeenCalledTimes(1);
    // ACT
    disabled.value = false;
    await vi.runAllTimersAsync();
    target.value.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    // ASSERT
    expect(listener).toHaveBeenCalledTimes(2);
  });
});
