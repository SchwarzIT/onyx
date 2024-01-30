import { getOnyxNpmPackages } from "../../../.vitepress/utils";

// https://vitepress.dev/guide/routing#dynamically-generating-paths
export default {
  async paths() {
    const npmPackages = await getOnyxNpmPackages();
    return npmPackages.map((name) => ({ params: { name } }));
  },
};
