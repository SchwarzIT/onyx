import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { ref } from "vue";
import { useCopy } from "./useCopy.js";

const writeTextMock = vi.fn();

// Stub the global navigator object with a mocked clipboard API
vi.stubGlobal("navigator", {
  clipboard: {
    writeText: writeTextMock,
  },
});

describe("useCopy", () => {
  beforeEach(() => {
    writeTextMock.mockReset();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("should copy static text and set success status", async () => {
    // ARRANGE
    writeTextMock.mockResolvedValue(undefined);
    const { copyStatus, copy } = useCopy({ source: "Test copy content" });

    // ACT
    await copy();

    // ASSERT
    expect(writeTextMock).toHaveBeenCalledExactlyOnceWith("Test copy content");
    expect(copyStatus.value).toBe("success");
  });

  test("should copy reactive ref value and resolve dynamically", async () => {
    // ARRANGE
    writeTextMock.mockResolvedValue(undefined);
    const source = ref("Initial text");
    const { copyStatus, copy } = useCopy({ source });

    // ACT
    source.value = "Updated text";
    await copy();

    // ASSERT
    expect(writeTextMock).toHaveBeenCalledExactlyOnceWith("Updated text");
    expect(copyStatus.value).toBe("success");
  });

  test("should not attempt copy if text is empty", async () => {
    // ARRANGE
    const { copyStatus, copy } = useCopy({ source: "" });

    // ACT
    await copy();

    // ASSERT
    expect(writeTextMock).not.toHaveBeenCalled();
    expect(copyStatus.value).toBeUndefined();
  });

  test("should set error status if writeText rejects", async () => {
    // ARRANGE
    writeTextMock.mockRejectedValue(new Error("Permission denied"));
    const { copyStatus, copy } = useCopy({ source: "Copy me" });

    // ACT
    await copy();

    // ASSERT
    expect(writeTextMock).toHaveBeenCalledExactlyOnceWith("Copy me");
    expect(copyStatus.value).toBe("error");
  });

  test("should clear success status after default timeout of 3000ms", async () => {
    // ARRANGE
    writeTextMock.mockResolvedValue(undefined);
    const { copyStatus, copy } = useCopy({ source: "Timeout test" });

    // ACT
    await copy();
    expect(copyStatus.value).toBe("success");

    // Fast-forward time
    vi.advanceTimersByTime(3000);

    // ASSERT
    expect(copyStatus.value).toBeUndefined();
  });

  test("should clear success status after a custom timeout duration", async () => {
    // ARRANGE
    writeTextMock.mockResolvedValue(undefined);
    const { copyStatus, copy } = useCopy({ source: "Custom timeout", timeout: 1000 });

    // ACT
    await copy();
    expect(copyStatus.value).toBe("success");

    // Fast-forward custom time
    vi.advanceTimersByTime(1000);

    // ASSERT
    expect(copyStatus.value).toBeUndefined();
  });

  test("should clear previous timeout when copy is called multiple times", async () => {
    // ARRANGE
    writeTextMock.mockResolvedValue(undefined);
    const { copyStatus, copy } = useCopy({ source: "Multi-click test", timeout: 2000 });

    // ACT & ASSERT
    await copy();
    expect(copyStatus.value).toBe("success");

    // Advance half-way (1000ms)
    vi.advanceTimersByTime(1000);

    // Trigger second copy, which should clear the previous timeout and create a new 2000ms window
    await copy();

    // Advance another 1500ms (total elapsed time 2500ms since the first call)
    vi.advanceTimersByTime(1500);

    // It should still be "success" because the second timeout timer has 500ms left
    expect(copyStatus.value).toBe("success");

    // Advance the remaining 500ms
    vi.advanceTimersByTime(500);
    expect(copyStatus.value).toBeUndefined();
  });
});
