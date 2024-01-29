import { getOnyxNpmPackages } from "../../../.vitepress/utils";

// https://vitepress.dev/guide/routing#dynamically-generating-paths
export default {
  paths() {
    return getOnyxNpmPackages().map((name) => {
      return { params: { name } };
    });
  },
};
