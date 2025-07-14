import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Gets a list of public onyx npm packages names.
 */
export const getOnyxNpmPackages = async () => {
  const packagePath = fileURLToPath(new URL("../../../../packages", import.meta.url));

  const packageFolders: string[] = [];

  for (const packageName of await readdir(packagePath)) {
    try {
      const packageJsonPath = join(packagePath, packageName, "package.json");
      const packageJson = JSON.parse(await readFile(packageJsonPath, "utf-8"));
      if (!packageJson.private) packageFolders.push(packageName);
    } catch {
      // folder is invalid npm package because it does not contain a valid package.json file
      // noop
    }
  }

  return packageFolders;
};
