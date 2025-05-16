import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { ParsedIcon } from "../types/figma.js";

/**
 * Writes a JSON file with metadata of the given icons (category, aliases etc.).
 *
 * @param path File path of the .json file, e.g. "./metadata.json"
 * @param icons Icons to write metadata for
 */
export const writeIconMetadata = async (path: string, icons: ParsedIcon[]) => {
  const metaDirname = dirname(path);
  await mkdir(metaDirname, { recursive: true });

  const iconMetadata = icons.reduce<Record<string, Omit<ParsedIcon, "id" | "name">>>(
    (meta, icon) => {
      const { id: _id, name, ...rest } = icon;
      meta[name] = rest;
      return meta;
    },
    {},
  );

  await writeFile(path, JSON.stringify(iconMetadata, null, 2), "utf-8");
};
