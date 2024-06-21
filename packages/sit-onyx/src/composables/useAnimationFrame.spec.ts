import { beforeAll, describe, expect, test, vi } from "vitest";
import { useAnimationFrame } from "./useAnimationFrame";

vi.mock("vue", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("vue")>()),
    onMounted: vi.fn().mockImplementation((callback) => callback()),
    onBeforeUnmount: vi.fn().mockImplementation((callback) => callback()),
  };
});

beforeAll(() => {
  vi.useFakeTimers();
});

describe("useAnimationFrame", () => {
  test("should loop animation frame", () => {
    const MOCK_TIMEOUT = 100;
    const MOCK_FRAME_ID = 42;

    vi.spyOn(window, "requestAnimationFrame").mockImplementation(
      (callback: FrameRequestCallback) => {
        setTimeout(() => callback(Date.now()), MOCK_TIMEOUT);
        return MOCK_FRAME_ID;
      },
    );

    const cancelSpy = vi.spyOn(window, "cancelAnimationFrame");

    let count = 0;
    const { stop } = useAnimationFrame(() => count++);
    expect(count).toBe(0);

    vi.advanceTimersByTime(MOCK_TIMEOUT);
    expect(count).toBe(1);

    vi.advanceTimersByTime(MOCK_TIMEOUT);
    expect(count).toBe(2);

    stop();
    vi.advanceTimersByTime(MOCK_TIMEOUT);
    expect(count).toBe(3);
    expect(cancelSpy).toHaveBeenCalledWith(MOCK_FRAME_ID);
  });
});
