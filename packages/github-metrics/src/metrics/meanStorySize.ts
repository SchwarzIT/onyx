import type { Client } from "../types.js";
import { findIterationByDate } from "../utils/github.js";

export type GetMeanStorySizeOptions = {
  client: Client;
  /**
   * Only items that are assigned to this iteration will be considered.
   * Any date can be passed, the matching iteration will be determined automatically.
   *
   * @default `new Date()`
   */
  iteration?: Date;
};

/**
 * Calculates the mean / average story size of an item in the given iteration.
 * Items without an assigned size will be ignored.
 */
export async function getMeanStorySize(options: GetMeanStorySizeOptions) {
  const allIterations = await options.client.getAllIterations();
  const currentIteration = findIterationByDate(allIterations, options.iteration ?? new Date());

  const items = await options.client
    .getAllItems()
    .then((items) => items.filter((item) => item.iteration === currentIteration.title));

  const storySizes = items.map((item) => item.effort).filter((size) => size != undefined);
  const totalCount = storySizes.length;

  const totalSize = storySizes.reduce((total, size) => total + size, 0);

  return {
    // prevent division by zero
    mean: totalCount > 0 ? totalSize / totalCount : 0,
    items: totalCount,
    iteration: currentIteration.title,
  };
}
