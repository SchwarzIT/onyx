//
// Optimizes all SVG assets in order to
// - reduce file size
// - remove "fill" so the icon color can be set via CSS
//
import fs from "node:fs/promises";
import { optimizeSvg, readAllIconPaths } from "./utils.js";

/** List of all available icons paths. */
const ALL_ICON_PATHS = await readAllIconPaths();

console.log(`Optimizing ${ALL_ICON_PATHS.length} icons...`);

for (const iconPath of ALL_ICON_PATHS) {
  const iconContent = await fs.readFile(iconPath, "utf-8");
  const optimizedIconContent = optimizeSvg(iconContent);
  await fs.writeFile(iconPath, optimizedIconContent);
}

console.log("Done.");
