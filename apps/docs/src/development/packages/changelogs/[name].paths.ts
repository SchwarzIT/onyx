import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { defineRoutes, type RouteModule } from "vitepress";

// https://vitepress.dev/guide/routing#dynamically-generating-paths
export default defineRoutes({
  watch: ["../../../../../../packages/*/CHANGELOG.md"],
  async paths(watchedFiles) {
    const routes: RouteModule["paths"] = [];
    for (const path of watchedFiles) {
      const packageJsonPath = resolve(path, "..", "package.json");
      const packageJson = await readFile(packageJsonPath, "utf-8").then((d) => JSON.parse(d));
      const name = packageJson.name.replace("@sit-onyx/", "");
      const content = await readFile(path, "utf-8");
      routes.push({ params: { name }, content });
    }
    return routes;
  },
});
