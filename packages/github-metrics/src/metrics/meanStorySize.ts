import type { IterationBasedMetricOptions } from "../types.js";
import { getAllItemsByIterationDate } from "../utils/client.js";

/**
 * Calculates the mean / average story size of an item in the given iteration.
 * Items without an assigned size will be ignored.
 */
export async function getMeanStorySize(options: IterationBasedMetricOptions) {
  const { items, iteration } = await getAllItemsByIterationDate(
    options.client,
    options.iteration ?? new Date(),
  );

  const storySizes = items.map((item) => item.effort).filter((size) => size != undefined);
  const totalCount = storySizes.length;

  const totalSize = storySizes.reduce((total, size) => total + size, 0);

  return {
    // prevent division by zero
    mean: totalCount > 0 ? totalSize / totalCount : 0,
    items: totalCount,
    iteration: iteration.title,
  };
}
