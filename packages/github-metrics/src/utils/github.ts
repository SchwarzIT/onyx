import type { Iteration } from "../types.js";

/**
 * Finds the iteration where the given date is part of.
 *
 * @throws Error if no iteration was found matching the given date.
 */
export function findIterationByDate(iterations: Iteration[], date: Date) {
  const iteration = iterations.find((iteration) => {
    const start = new Date(iteration.startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + iteration.duration - 1);
    end.setHours(23, 59, 59, 999);
    return date >= start && date <= end;
  });

  if (!iteration) {
    throw new Error(`No iteration found for the given date: ${date}`);
  }

  return iteration;
}
