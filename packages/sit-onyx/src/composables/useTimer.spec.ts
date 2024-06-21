import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { nextTick, ref } from "vue";
import * as useAnimationFrame from "./useAnimationFrame";
import { useTimer } from "./useTimer";

vi.mock("vue", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("vue")>()),
    onMounted: vi.fn().mockImplementation((callback) => callback()),
    onBeforeUnmount: vi.fn(),
  };
});

describe("useTimer.ts", () => {
  const MOCK_NOW = new Date(2024, 0, 1, 12);

  const endTime = new Date(MOCK_NOW);
  endTime.setTime(endTime.getTime() + 5 * 1000);

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(MOCK_NOW);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should calculate timer correctly", () => {
    // ARRANGE
    const { timeLeft, isEnded } = useTimer({ endTime: ref(endTime) });

    // ASSERT
    expect(timeLeft.value).toBe(5000);
    expect(isEnded.value).toBe(false);

    // ACT
    vi.advanceTimersByTime(1000);

    // ASSERT
    expect(timeLeft.value).toBe(4000);
    expect(isEnded.value).toBe(false);

    // ACT
    vi.advanceTimersByTime(4000);

    // ASSERT
    expect(timeLeft.value).toBe(0);
    expect(isEnded.value).toBe(true);
  });

  test("should use animation frames", async () => {
    const MOCK_TIMEOUT = 100;

    // mock "requestAnimationFrame()"
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(
      (callback: FrameRequestCallback) => {
        setTimeout(() => callback(Date.now()), MOCK_TIMEOUT);
        return 42;
      },
    );

    const originalAnimationFrame = useAnimationFrame.useAnimationFrame;
    const stopSpy = vi.fn();

    const frameSpy = vi
      .spyOn(useAnimationFrame, "useAnimationFrame")
      .mockImplementation((callback) => {
        const { stop: originalStop } = originalAnimationFrame(callback);
        return {
          stop: () => {
            stopSpy();
            originalStop();
          },
        };
      });

    // ARRANGE
    const { timeLeft } = useTimer({ endTime: ref(endTime), useAnimationFrame: true });
    await nextTick();

    // ASSERT
    expect(frameSpy).toHaveBeenCalledOnce();

    // ACT
    vi.advanceTimersByTime(MOCK_TIMEOUT);

    // ASSERT
    expect(timeLeft.value).toBe(4900);

    // ACT
    vi.advanceTimersByTime(MOCK_TIMEOUT);

    // ASSERT
    expect(timeLeft.value).toBe(4800);
    expect(stopSpy).not.toHaveBeenCalled();

    // ACT
    vi.advanceTimersByTime(4800);

    // ASSERT
    expect(timeLeft.value).toBe(0);
    expect(stopSpy).toHaveBeenCalled();
  });
});
