import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Gets a list of all available onyx component names.
 */
export const getComponents = async () => {
  const componentsPath = fileURLToPath(
    new URL("../../../../packages/sit-onyx/src/components", import.meta.url),
  );

  const components: string[] = [];

  // filter out non-directories to prevent files like ".DS_Store" on macOS to be included
  for (const componentName of await fs.readdir(componentsPath)) {
    const stat = await fs.stat(path.join(componentsPath, componentName));
    if (stat.isDirectory()) components.push(componentName);
  }

  return components;
};
