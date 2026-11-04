import { addImportsDir, addServerScanDir, createResolver, defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "@sit-onyx/nuxt-internal",
    configKey: "onyxInternal",
  },
  moduleDependencies: {
    "nuxt-auth-utils": {},
  },
  defaults: {},
  setup() {
    const resolver = createResolver(import.meta.url);

    addImportsDir(resolver.resolve("./runtime/composables"));

    addServerScanDir(resolver.resolve("./runtime/server"));
  },
});
