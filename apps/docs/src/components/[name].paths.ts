import { getComponents } from "../.vitepress/utils";

// https://vitepress.dev/guide/routing#dynamically-generating-paths
export default {
  paths() {
    return getComponents().map((name) => {
      return { params: { name } };
    });
  },
};
