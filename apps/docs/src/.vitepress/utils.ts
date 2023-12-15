import fs from "node:fs";
import { fileURLToPath } from "node:url";

/**
 * Gets a list of all available NUI component names.
 */
export const getComponents = () => {
  const path = fileURLToPath(new URL("../../../../packages/nui/src/components", import.meta.url));
  return fs.readdirSync(path);
};
