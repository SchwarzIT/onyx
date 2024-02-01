import { getComponents } from "../.vitepress/utils";

// https://vitepress.dev/guide/routing#dynamically-generating-paths
export default {
  async paths() {
    const components = await getComponents();
    return components.map((name) => ({ params: { name } }));
  },
};
