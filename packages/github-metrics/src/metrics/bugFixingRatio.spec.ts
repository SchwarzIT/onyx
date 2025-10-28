import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { createTestClient } from "../utils/client.spec.js";
import { getBugFixingRatio } from "./bugFixingRatio.js";

describe("bugFixingRatio.ts", () => {
  const mockClient = createTestClient();

  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });

  test("should calculate the bug fixing ratio for the current sprint", async () => {
    // ARRANGE
    const mockDate = new Date(2025, 7, 20);
    vi.setSystemTime(mockDate);

    vi.spyOn(mockClient, "getAllIterations").mockResolvedValue([
      { title: "#1", duration: 14, startDate: "2025-08-13" },
      { title: "#2", duration: 14, startDate: "2025-08-27" },
    ]);
    vi.spyOn(mockClient, "getAllItems").mockResolvedValue([
      { effort: undefined, iteration: "#1" },
      { effort: 1, iteration: "#1" },
      { effort: 2, iteration: "#1", type: "Bug" },
      { effort: 5, iteration: "#1" },
      { effort: 5, iteration: "#2" },
    ]);

    // ACT
    const data = await getBugFixingRatio({ client: mockClient });

    // ASSERT
    expect(data).toStrictEqual({
      ratio: 0.25,
      bugs: 1,
      items: 3,
      iteration: "#1",
    });
  });

  test("should calculate the bug fixing ratio for a specific sprint", async () => {
    // ARRANGE
    const mockDate = new Date(2025, 7, 20);
    vi.setSystemTime(mockDate);

    vi.spyOn(mockClient, "getAllIterations").mockResolvedValue([
      { title: "#1", duration: 14, startDate: "2025-08-13" },
      { title: "#2", duration: 14, startDate: "2025-08-27" },
    ]);
    vi.spyOn(mockClient, "getAllItems").mockResolvedValue([
      { effort: undefined, iteration: "#1" },
      { effort: 1, iteration: "#1" },
      { effort: 2, iteration: "#1" },
      { effort: 4, iteration: "#2" },
      { effort: 4, iteration: "#2", type: "Bug" },
    ]);

    // ACT
    const data = await getBugFixingRatio({ client: mockClient, iteration: new Date(2025, 7, 27) });

    // ASSERT
    expect(data).toStrictEqual({
      ratio: 0.5,
      bugs: 1,
      items: 2,
      iteration: "#2",
    });
  });

  test("should calculate the bug fixing ratio when the data is empty", async () => {
    // ARRANGE
    const mockDate = new Date(2025, 7, 20);
    vi.setSystemTime(mockDate);

    vi.spyOn(mockClient, "getAllIterations").mockResolvedValue([
      { title: "#1", duration: 14, startDate: "2025-08-13" },
    ]);
    vi.spyOn(mockClient, "getAllItems").mockResolvedValue([{ effort: undefined, iteration: "#1" }]);

    // ACT
    const data = await getBugFixingRatio({ client: mockClient });

    // ASSERT
    expect(data).toStrictEqual({
      ratio: 0,
      bugs: 0,
      items: 0,
      iteration: "#1",
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
    const promise = getBugFixingRatio({ client: mockClient });

    // ASSERT
    await expect(promise).rejects.toThrowError();
  });
});
