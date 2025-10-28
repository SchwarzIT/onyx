import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { createTestClient } from "../utils/client.spec.js";
import { getThroughput } from "./throughput.js";

describe("throughput.ts", () => {
  const mockClient = createTestClient();

  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });

  test("should calculate the throughput for the current sprint", async () => {
    // ARRANGE
    const mockDate = new Date(2025, 7, 20);
    vi.setSystemTime(mockDate);

    vi.spyOn(mockClient, "getAllIterations").mockResolvedValue([
      { title: "#1", duration: 14, startDate: "2025-08-13" },
      { title: "#2", duration: 14, startDate: "2025-08-27" },
    ]);
    vi.spyOn(mockClient, "getAllItems").mockResolvedValue([
      { status: "finished", iteration: "#1" },
      { status: "finished", iteration: "#1" },
      { status: undefined, iteration: "#1" },
      { status: "finished", iteration: "#2" },
    ]);

    // ACT
    const data = await getThroughput({ client: mockClient });

    // ASSERT
    expect(data).toStrictEqual({
      throughput: 2,
      iteration: "#1",
    });
  });

  test("should calculate the throughput for a specific sprint", async () => {
    // ARRANGE
    const mockDate = new Date(2025, 7, 20);
    vi.setSystemTime(mockDate);

    vi.spyOn(mockClient, "getAllIterations").mockResolvedValue([
      { title: "#1", duration: 14, startDate: "2025-08-13" },
      { title: "#2", duration: 14, startDate: "2025-08-27" },
    ]);
    vi.spyOn(mockClient, "getAllItems").mockResolvedValue([
      { status: "finished", iteration: "#1" },
      { status: "finished", iteration: "#1" },
      { status: undefined, iteration: "#1" },
      { status: "finished", iteration: "#2" },
    ]);

    // ACT
    const data = await getThroughput({ client: mockClient, iteration: new Date(2025, 7, 27) });

    // ASSERT
    expect(data).toStrictEqual({
      throughput: 1,
      iteration: "#2",
    });
  });

  test("should throw error if iteration is not found", async () => {
    // ARRANGE
    const mockDate = new Date(2025, 7, 10);
    vi.setSystemTime(mockDate);

    vi.spyOn(mockClient, "getAllIterations").mockResolvedValue([
      { title: "#1", duration: 14, startDate: "2025-08-13" },
    ]);
    vi.spyOn(mockClient, "getAllItems").mockResolvedValue([]);

    // ACT
    const promise = getThroughput({ client: mockClient });

    // ASSERT
    await expect(promise).rejects.toThrowError();
  });
});
