import { describe, expect, test } from "vitest";
import { formatTime, getTimeFragments, parseTimeSeconds, timeToDurationString } from "./time.js";

test.each([
  { time: 0, output: "00:00 sec" },
  { time: 5000, output: "00:05 sec" },
  { time: 70000, output: "01:10 min" },
  { time: 60 * 82 * 1000 + 5000, output: "01:22:05 hr" },
])("formatTime should format $time as $output", ({ time, output }) => {
  const format = new Intl.RelativeTimeFormat("en-US", { numeric: "always", style: "short" });
  const actualOutput = formatTime(time, format);
  expect(actualOutput).toBe(output);
});

test("getTimeFragments should work correctly", () => {
  const { hours, minutes, seconds } = getTimeFragments(60 * 82 * 1000 + 5000);
  expect(hours).toBe(1);
  expect(minutes).toBe(22);
  expect(seconds).toBe(5);
});

test("timeToDurationString should work correctly", () => {
  const duration = timeToDurationString(60 * 82 * 1000 + 5000);
  expect(duration).toBe("PT1H22M5S");
});

describe("parseTimeSeconds", () => {
  test.each([
    { timeString: undefined, expected: null },
    { timeString: "", expected: null },
    { timeString: "foo", expected: null },
    { timeString: "12", expected: null },
    { timeString: "12:", expected: null },
    { timeString: "12:34:", expected: null },
    { timeString: "12:foo", expected: null },
    { timeString: "12:34:bar", expected: null },
    { timeString: "00:00:00", expected: 0 },
    { timeString: "00:00:01", expected: 1 },
    { timeString: "00:01:00", expected: 60 },
    { timeString: "01:00:00", expected: 3600 },
    { timeString: "01:02:03", expected: 3723 },
    { timeString: "12:34", expected: 12 * 3600 + 34 * 60 },
    { timeString: "12:34:56", expected: 12 * 3600 + 34 * 60 + 56 },
    { timeString: "12:34:56.789", expected: 12 * 3600 + 34 * 60 + 56 },
    { timeString: "23:59:59", expected: 23 * 3600 + 59 * 60 + 59 },
  ])("should parse '$timeString' to $expected seconds", ({ timeString, expected }) => {
    expect(parseTimeSeconds(timeString)).toBe(expected);
  });
});
