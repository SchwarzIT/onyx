//
// this file contains utilities that require Node APIs like "fs"
// because otherwise e.g. the docs build step will fail when importing
// the grouped icons by category because node APIs like "node:fs"
// are not available there
//
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { optimize } from "svgo";

/**
 * Optimizes the given SVG content and removes all fills so the color can be set via CSS.
 */
export const optimizeSvg = (svgContent: string, path: string) => {
  const { data } = optimize(svgContent, {
    path,
    multipass: true,
    plugins: [
      { name: "preset-default" },
      { name: "removeDimensions" },
      {
        name: "removeAttrs",
        params: {
          // remove all fills so we can set the color via CSS
          attrs: ["fill"],
        },
      },
    ],
  });
  return data;
};

/**
 * Checks whether the given path is a directory.
 */
export const isDirectory = async (path: string) => {
  try {
    const stat = await fs.stat(path);
    return stat.isDirectory();
  } catch {
    return false;
  }
};

/**
 * Gets a list of all available icons (full file path).
 */
export const readAllIconPaths = async () => {
  const INPUT_FOLDER = fileURLToPath(new URL("./assets", import.meta.url));
  const allIcons = await fs.readdir(INPUT_FOLDER, "utf-8");
  return allIcons
    .filter((filename) => filename.endsWith(".svg"))
    .map((filename) => path.join(INPUT_FOLDER, filename));
};
