/**
 * Given a list of items and the current `order` map, returns a new array with
 * items sorted by their assigned 1-based index. Items missing from the map keep
 * their original relative position and fill the remaining slots.
 *
 * @param items - The array of items to reorder.
 * @param order - Map of item keys to their target 1-based position.
 * @param getKey - Function to extract the unique key from an item.
 */
export const applyArrayOrder = <T>(
  items: readonly T[],
  order: ReadonlyMap<PropertyKey, number>,
  getKey: (item: T) => PropertyKey,
): T[] => {
  if (order.size === 0) return [...items];

  const placed = new Map<number, T>();
  const unplaced: T[] = [];

  // Separate items into those with an assigned position and those without.
  // Later insertions win if two items claim the same position (mirrors the
  // previous sequential behavior for that edge case).
  for (const item of items) {
    const key = getKey(item);
    const assigned = order.get(key);
    if (assigned === undefined) {
      unplaced.push(item);
    } else {
      const existing = placed.get(assigned);
      if (existing) unplaced.push(existing);
      placed.set(assigned, item);
    }
  }

  // Build the final list by placing assigned items at their 1-based index
  // and filling the remaining slots with unplaced items in original order.
  const result: T[] = new Array(items.length);
  for (let i = 0; i < result.length; i++) {
    const item = placed.get(i + 1);
    if (item) result[i] = item;
  }
  for (let i = 0; i < result.length; i++) {
    if (result[i] === undefined) {
      result[i] = unplaced.shift()!;
    }
  }

  return result;
};
