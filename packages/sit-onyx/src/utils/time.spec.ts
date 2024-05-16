import { describe, expect, test } from "vitest";
import { formatTimerTime } from "./time";
import { injectI18n } from "../i18n";
import { ref } from "vue";

describe("time", () => {
  test("renders 0 seconds", () => {
    const t = ref((p: string) => p) as unknown as ReturnType<typeof injectI18n>["t"];
    const output = formatTimerTime(0, t);
    expect(output).toBe("00:00 time.seconds");
  });
  test("renders 5 seconds", () => {
    const t = ref((p: string) => p) as unknown as ReturnType<typeof injectI18n>["t"];
    const output = formatTimerTime(5000, t);
    expect(output).toBe("00:05 time.seconds");
  });
  test("renders minutes and seconds", () => {
    const t = ref((p: string) => p) as unknown as ReturnType<typeof injectI18n>["t"];
    const output = formatTimerTime(70000, t);
    expect(output).toBe("01:10 time.minutes");
  });
  test("renders hours, minutes and seconds", () => {
    const t = ref((p: string) => p) as unknown as ReturnType<typeof injectI18n>["t"];
    const output = formatTimerTime(60 * 82 * 1000 + 5000, t);
    expect(output).toBe("01:22:05 time.hours");
  });
});
