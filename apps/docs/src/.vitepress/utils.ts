import fs from "node:fs";
import { fileURLToPath } from "node:url";

/**
 * Gets a list of all available onyx component names.
 */
export const getComponents = () => {
  const path = fileURLToPath(
    new URL("../../../../packages/sit-onyx/src/components", import.meta.url),
  );
  return fs.readdirSync(path);
};
