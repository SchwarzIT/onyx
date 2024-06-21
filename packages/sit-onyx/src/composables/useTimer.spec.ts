import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { ref } from "vue";
import { useAnimationFrame } from "./useAnimationFrame";
import { useTimer } from "./useTimer";

vi.mock("vue", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("vue")>()),
    onBeforeUnmount: vi.fn(),
  };
});

vi.mock("./useAnimationFrame.ts");

describe("useTimer.ts", () => {
  const MOCK_NOW = new Date(2024, 0, 1, 12);

  const endTime = new Date(MOCK_NOW);
  endTime.setTime(endTime.getTime() + 5 * 1000);

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(MOCK_NOW);
  });

  afterEach(() => {
    vi.restoreAllMocks();
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

    expect(useAnimationFrame).not.toHaveBeenCalled();
  });

  test("should use animation frames", () => {
    // ARRANGE
    useTimer({ endTime: ref(endTime), useAnimationFrame: true });

    // ASSERT
    expect(useAnimationFrame).toHaveBeenCalledOnce();
  });
});
