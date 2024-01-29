import fs from "node:fs";
import path from "node:path";
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

/**
 * Gets a list of public onyx npm packages names.
 */
export const getOnyxNpmPackages = () => {
  const packagePath = fileURLToPath(new URL("../../../../packages", import.meta.url));

  const packageFolders = fs.readdirSync(packagePath).filter((packageName) => {
    try {
      const packageJsonPath = path.join(packagePath, packageName, "package.json");
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
      return !packageJson.private;
    } catch {
      // folder is invalid npm package because it does not contain a valid package.json file
      return false;
    }
  });

  return packageFolders;
};
