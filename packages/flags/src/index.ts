import type { FlagContinents, FlagMetadata } from "./types.js";

export {
  /**
   * Metadata for all available onyx flags.
   */
  default as FLAG_METADATA,
} from "./metadata.json";

/**
 * Groups all available flag metadata by continent.
 * Continents and flags will be sorted alphabetically.
 */
export const groupFlagsByContinent = (flagMetadata: Record<string, FlagMetadata>) => {
  const continents = Object.entries(flagMetadata).reduce<FlagContinents>(
    (continents, [code, metadata]) => {
      const flags = continents[metadata.continent] ?? [];
      flags.push({ code, metadata });
      continents[metadata.continent] = flags;
      return continents;
    },
    {},
  );

  const sortedContinents: typeof continents = {};

  Object.keys(continents)
    .sort()
    .forEach((continent) => {
      const sortedMetadata = continents[continent].slice().sort((a, b) => {
        return a.code.localeCompare(b.code);
      });
      sortedContinents[continent] = sortedMetadata;
    });

  return sortedContinents;
};
