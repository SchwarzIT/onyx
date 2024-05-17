import { describe, expect, test, vi, beforeAll } from "vitest";
import { useTimer } from "./useTimer";
import { ref } from "vue";

describe("useTimer.ts", () => {
  const endTime = new Date();
  endTime.setTime(Date.now() + 5 * 1000);

  beforeAll(() => {
    vi.mock("vue", async (importOriginal) => {
      return {
        ...(await importOriginal<typeof import("vue")>()),
        onBeforeUnmount: vi.fn(),
      };
    });
  });

  test("timer ends after 5000 milliseconds", () => {
    vi.useFakeTimers();
    const { timeLeft, endTimer } = useTimer({
      endTime: ref(endTime.toISOString()),
    });
    expect(timeLeft.value).toBeGreaterThan(4900);
    vi.advanceTimersByTime(5050);
    expect(timeLeft.value).toBe(0);
    endTimer();
    vi.useRealTimers();
  });

  test("throws error when endTime is invalid", () => {
    let error = false;
    try {
      const { timeLeft: _timeLeft } = useTimer({
        endTime: ref("so wrong"),
      });
    } catch (e: unknown) {
      error = true;
    }
    expect(error).toBeTruthy();
  });
});
