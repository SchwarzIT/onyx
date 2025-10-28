import type { IterationBasedMetricOptions } from "../types.js";
import { findIterationByDate } from "../utils/github.js";

/**
 * Calculates the bug fixing ratio in the given iteration (how much time is spend on bugs in relation to other stories).
 * Items without an assigned size will be ignored.
 */
export async function getBugFixingRatio(options: IterationBasedMetricOptions) {
  // fetch iterations and items in parallel to speed up the process
  const [allIterations, allItems] = await Promise.all([
    options.client.getAllIterations(),
    options.client.getAllItems(),
  ]);

  const currentIteration = findIterationByDate(allIterations, options.iteration ?? new Date());

  const items = allItems.filter(
    (item): item is typeof item & Required<Pick<typeof item, "effort">> =>
      item.iteration === currentIteration.title && item.effort != undefined,
  );

  const bugItems = items.filter((item) => item.type === "Bug");

  const totalBugSize = bugItems.reduce((total, item) => total + item.effort, 0);
  const totalSize = items.reduce((total, item) => total + item.effort, 0);

  return {
    // prevent division by zero
    ratio: totalSize ? totalBugSize / totalSize : 0,
    bugs: bugItems.length,
    items: items.length,
    iteration: currentIteration.title,
  };
}
