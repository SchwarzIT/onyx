import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { createTestClient } from "../utils/client.spec.js";
import { getMeanStorySize } from "./meanStorySize.js";

describe("meanStorySize.ts", () => {
  const mockClient = createTestClient();

  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });

  test("should calculate the mean story size for the current sprint", async () => {
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
      { effort: 5, iteration: "#2" },
    ]);

    // ACT
    const data = await getMeanStorySize({ client: mockClient });

    // ASSERT
    expect(data).toStrictEqual({
      mean: 1.5,
      items: 2,
      iteration: "#1",
    });
  });

  test("should calculate the mean story size for the specific sprint", async () => {
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
      { effort: 5, iteration: "#2" },
    ]);

    // ACT
    const data = await getMeanStorySize({ client: mockClient, iteration: new Date(2025, 7, 27) });

    // ASSERT
    expect(data).toStrictEqual({
      mean: 5,
      items: 1,
      iteration: "#2",
    });
  });

  test("should calculate the mean story size when the data is empty", async () => {
    // ARRANGE
    const mockDate = new Date(2025, 7, 20);
    vi.setSystemTime(mockDate);

    vi.spyOn(mockClient, "getAllIterations").mockResolvedValue([
      { title: "#1", duration: 14, startDate: "2025-08-13" },
    ]);
    vi.spyOn(mockClient, "getAllItems").mockResolvedValue([{ effort: undefined, iteration: "#1" }]);

    // ACT
    const data = await getMeanStorySize({ client: mockClient });

    // ASSERT
    expect(data).toStrictEqual({
      mean: 0,
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
    const promise = getMeanStorySize({ client: mockClient });

    // ASSERT
    await expect(promise).rejects.toThrowError();
  });
});
