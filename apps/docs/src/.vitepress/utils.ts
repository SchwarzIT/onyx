import fs from "node:fs";
import { fileURLToPath } from "node:url";

/**
 * Gets a list of all available Onyx component names.
 */
export const getComponents = () => {
  const path = fileURLToPath(
    new URL("../../../../packages/components/src/components", import.meta.url),
  );
  return fs.readdirSync(path);
};
