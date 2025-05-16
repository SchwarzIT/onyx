import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { ParsedFlag } from "../types/figma.js";

/**
 * Writes a JSON file with metadata of the given flags (code, name etc.).
 *
 * @param path File path of the .json file, e.g. "./metadata.json"
 * @param flags Flags to write metadata for
 */
export const writeFlagMetadata = async (path: string, flags: ParsedFlag[]) => {
  const metaDirname = dirname(path);
  await mkdir(metaDirname, { recursive: true });

  const flagMetadata = flags.reduce<Record<string, Omit<ParsedFlag, "id" | "code">>>(
    (meta, flag) => {
      const { id: _id, code, ...rest } = flag;
      meta[code] = rest;
      return meta;
    },
    {},
  );

  await writeFile(path, JSON.stringify(flagMetadata, null, 2), "utf-8");
};
