import { describe, expect, test } from "vitest";
import { Iteration } from "../types.js";
import { findIterationByDate } from "./github.js";

describe("findIterationByDate", () => {
  test.each<{
    date: Date;
    expected: Iteration["title"];
  }>([
    { date: new Date(2025, 7, 13, 0, 0, 0, 0), expected: "#1" },
    { date: new Date(2025, 7, 20, 0, 0, 0, 0), expected: "#1" },
    { date: new Date(2025, 7, 26, 23, 59, 59, 999), expected: "#1" },
    { date: new Date(2025, 7, 27, 0, 0, 0, 0), expected: "#2" },
    { date: new Date(2025, 8, 9, 23, 59, 59, 999), expected: "#2" },
  ])("should find the iteration $expected for date $date", ({ date, expected }) => {
    // ACT
    const iteration = findIterationByDate(
      [
        { title: "#1", duration: 14, startDate: "2025-08-13" },
        { title: "#2", duration: 14, startDate: "2025-08-27" },
      ],
      date,
    );

    // ASSERT
    expect(iteration.title).toBe(expected);
  });

  test("should throw error if no iteration is found", () => {
    // ASSERT
    expect(() =>
      findIterationByDate(
        [{ title: "#1", duration: 14, startDate: "2025-08-13" }],
        new Date(2025, 7, 12, 23, 59, 59, 999),
      ),
    ).toThrowError();
  });
});
