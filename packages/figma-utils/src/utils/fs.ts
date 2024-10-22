import { PathLike } from "node:fs";
import { stat } from "node:fs/promises";

/**
 * Checks whether the given path is a directory.
 *
 * @returns `true` if path exists and is a directory, `false` otherwise.
 */
export const isDirectory = async (path: PathLike): Promise<boolean> => {
  try {
    const stats = await stat(path);
    return stats.isDirectory();
  } catch (_) {
    return false;
  }
};
