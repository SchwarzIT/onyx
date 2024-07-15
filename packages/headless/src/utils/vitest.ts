import { vi, type Awaitable } from "vitest";

type Callback = () => Awaitable<void>;

/**
 * Mocks the following vue lifecycle functions:
 * - onBeforeMount
 * - onMounted
 * - onBeforeUnmount
 * - onUnmounted
 *
 * `onBeforeMount` and `onMounted` callbacks are executed immediately.
 * `onBeforeUnmount` and `onUnmounted` are executed when the returned callback is run.
 * @returns a callback to trigger the run of `onBeforeUnmount` and `onUnmounted`
 */
export const mockVueLifecycle = () => {
  const { callbacks } = vi.hoisted(() => ({
    callbacks: {
      onBeforeUnmountedCb: null as Callback | null,
      onUnmountedCb: null as Callback | null,
    },
  }));

  vi.mock("vue", async (original) => ({
    ...((await original()) as typeof import("vue")),
    onBeforeMount: vi.fn((cb: Callback) => cb()),
    onMounted: vi.fn((cb: Callback) => cb()),
    onBeforeUnmount: vi.fn((cb: Callback) => (callbacks.onBeforeUnmountedCb = cb)),
    onUnmounted: vi.fn((cb: Callback) => (callbacks.onUnmountedCb = cb)),
  }));

  return async () => {
    await callbacks.onBeforeUnmountedCb?.();
    await callbacks.onUnmountedCb?.();
  };
};
