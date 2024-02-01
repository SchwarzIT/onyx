import fs from "node:fs/promises";
import { exit } from "node:process";
import { optimizeSvg, readAllIconPaths } from "./utils.js";

/** List of all available icons paths. */
const ALL_ICON_PATHS = await readAllIconPaths();

console.log(`Checking ${ALL_ICON_PATHS.length} icons for optimization...`);

const iconsToOptimize: string[] = [];

for (const iconPath of ALL_ICON_PATHS) {
  const iconContent = await fs.readFile(iconPath, "utf-8");
  const optimizedIconContent = optimizeSvg(iconContent, iconPath);
  if (iconContent !== optimizedIconContent) iconsToOptimize.push(iconContent);
}

if (iconsToOptimize.length > 0) {
  console.log(
    `${iconsToOptimize.length} icons need optimization. Please run "pnpm optimize" to optimize all icons.`,
  );
  exit(1);
} else {
  console.log("All icons are already optimized.");
}
