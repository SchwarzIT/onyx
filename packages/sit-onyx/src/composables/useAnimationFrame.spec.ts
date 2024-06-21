import { beforeAll, describe, expect, test, vi } from "vitest";
import { useAnimationFrame } from "./useAnimationFrame";

beforeAll(() => {
  vi.useFakeTimers();
});

describe("useAnimationFrame", () => {
  test("should loop animation frame", () => {
    const MOCK_TIMEOUT = 100;
    const MOCK_FRAME_ID = 42;

    vi.spyOn(window, "requestAnimationFrame").mockImplementation(
      (callback: FrameRequestCallback) => {
        setTimeout(() => callback(Date.now()), 100);
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
