import { describe, expect, test, vi } from "vitest";
import { useTimer } from "./useTimer";
import { ref } from "vue";

describe("useTimer.ts", () => {
  const endTime = new Date();
  endTime.setTime(Date.now() + 5 * 1000);

  test("timer counts down to 0", () => {
    vi.useFakeTimers();
    const { startTimer, timeLeft, endTimer } = useTimer({
      endTime: ref(endTime.toISOString()),
    });
    startTimer();
    expect(timeLeft.value).toBeGreaterThan(4900);
    vi.advanceTimersByTime(5500);
    expect(timeLeft.value).toBe(0);
    endTimer();
    vi.useRealTimers();
  });

  test("timer is paused and does not count down", () => {
    vi.useFakeTimers();
    const { startTimer, timeLeft, endTimer } = useTimer({
      endTime: ref(endTime.toISOString()),
      isPaused: ref(true),
    });
    startTimer();
    vi.advanceTimersByTime(5000);
    expect(timeLeft.value).toBeGreaterThan(4900);
    endTimer();
  });
});
