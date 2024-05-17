import { describe, expect, test } from "vitest";
import { formatTimerTime } from "./time";

describe("time", () => {
  const format = new Intl.RelativeTimeFormat("en-US", { numeric: "always", style: "long" });

  test("renders 0 seconds", () => {
    const output = formatTimerTime(0, format);
    expect(output).toBe("00:00 seconds");
  });
  test("renders 5 seconds", () => {
    const output = formatTimerTime(5000, format);
    expect(output).toBe("00:05 seconds");
  });
  test("renders minutes and seconds", () => {
    const output = formatTimerTime(70000, format);
    expect(output).toBe("01:10 minutes");
  });
  test("renders hours, minutes and seconds", () => {
    const output = formatTimerTime(60 * 82 * 1000 + 5000, format);
    expect(output).toBe("01:22:05 hours");
  });
});
