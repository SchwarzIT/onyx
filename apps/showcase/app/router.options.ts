import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  scrollBehavior: createOnyxScrollBehavior(),
};
