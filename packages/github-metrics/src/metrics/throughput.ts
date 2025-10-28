import type { IterationBasedMetricOptions } from "../types.js";
import { getAllItemsByIterationDate } from "../utils/client.js";

/**
 * Calculates the throughput in the given iteration (amount of items with status "finished").
 */
export async function getThroughput(options: IterationBasedMetricOptions) {
  const { items, iteration } = await getAllItemsByIterationDate(
    options.client,
    options.iteration ?? new Date(),
  );

  const finishedItems = items.filter((item) => item.status === "finished");

  return {
    throughput: finishedItems.length,
    iteration: iteration.title,
  };
}
