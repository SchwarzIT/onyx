import { describe, expect, test, vi } from "vitest";
import { useTimer } from "./useTimer";
import { ref } from "vue";

describe("useTimer.ts", () => {
  const endTime = new Date();
  endTime.setTime(Date.now() + 5 * 1000);

  test("timer ends after 5000 milliseconds", () => {
    vi.useFakeTimers();
    const { startTimer, timeLeft, endTimer } = useTimer({
      endTime: ref(endTime.toISOString()),
    });
    startTimer();
    expect(timeLeft.value).toBeGreaterThan(4900);
    vi.advanceTimersByTime(5050);
    expect(timeLeft.value).toBe(0);
    endTimer();
    vi.useRealTimers();
  });

  test("throws error when endTime is invalid", () => {
    let error = false;
    try {
      const { startTimer } = useTimer({
        endTime: ref("so wrong"),
      });
      startTimer();
    } catch (e: unknown) {
      error = true;
    }
    expect(error).toBeTruthy();
  });
});
