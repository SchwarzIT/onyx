import { vi, type Awaitable } from "vitest";

type Callback = () => Awaitable<void>;

export const mockVueLifecycle = () => {
  const { callbacks } = vi.hoisted(() => ({
    callbacks: {
      onBeforeUnmountedCb: null as Callback | null,
      onUnmountedCb: null as Callback | null,
    },
  }));

  vi.mock("vue", async (original) => ({
    ...((await original()) as object),
    onBeforeMount: (cb: Callback) => cb(),
    onMounted: (cb: Callback) => cb(),
    onBeforeUnmount: (cb: Callback) => (callbacks.onBeforeUnmountedCb = cb),
    onUnmounted: (cb: Callback) => (callbacks.onUnmountedCb = cb),
  }));

  return async () => {
    await callbacks.onBeforeUnmountedCb?.();
    await callbacks.onUnmountedCb?.();
  };
};
