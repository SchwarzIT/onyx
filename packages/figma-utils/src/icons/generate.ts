import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { ParsedIcon } from "../types/figma.js";
import { isDirectory } from "../utils/fs.js";

/**
 * Writes a JSON file with metadata of the given icons (category, aliases etc.).
 *
 * @param path File path of the .json file, e.g. "./metadata.json"
 * @param icons Icons to write metadata for
 */
export const writeIconMetadata = async (path: string, icons: ParsedIcon[]) => {
  const metaDirname = dirname(path);
  if (!(await isDirectory(metaDirname))) {
    await mkdir(metaDirname, { recursive: true });
  }

  const iconMetadata = icons.reduce<Record<string, Pick<ParsedIcon, "category" | "aliases">>>(
    (meta, icon) => {
      meta[icon.name] = {
        category: icon.category,
        aliases: icon.aliases,
      };
      return meta;
    },
    {},
  );

  await writeFile(path, JSON.stringify(iconMetadata, null, 2), "utf-8");
};
