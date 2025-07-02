import { describe, expect, test } from "vitest";
import { formatTime, getTimeFragments, timeToDurationString } from "./time.js";

describe("time", () => {
  test.each([
    { time: 0, output: "00:00 sec" },
    { time: 5000, output: "00:05 sec" },
    { time: 70000, output: "01:10 min" },
    { time: 60 * 82 * 1000 + 5000, output: "01:22:05 hr" },
  ])("should format $time as $output", ({ time, output }) => {
    const format = new Intl.RelativeTimeFormat("en-US", { numeric: "always", style: "short" });
    const actualOutput = formatTime(time, format);
    expect(actualOutput).toBe(output);
  });

  test("should get time fragments", () => {
    const { hours, minutes, seconds } = getTimeFragments(60 * 82 * 1000 + 5000);
    expect(hours).toBe(1);
    expect(minutes).toBe(22);
    expect(seconds).toBe(5);
  });

  test("should format duration string", () => {
    const duration = timeToDurationString(60 * 82 * 1000 + 5000);
    expect(duration).toBe("PT1H22M5S");
  });
});
